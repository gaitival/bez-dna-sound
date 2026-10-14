#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
publish_to_vk.py - Публикация статьи во ВКонтакте (VK Wall Post) от имени сообщества.

Возможности:
  1. Читает markdown-статью из content/blog или published.
  2. Форматирует текст для ленты ВКонтакте:
     - Оптимизирует заголовок и первый абзац под удержание внимания (хук до кнопки «Показать полностью»).
     - Преобразует markdown-заголовки в аккуратные тематические акценты.
     - Очищает внутренние markdown-ссылки в красивый текст.
     - Добавляет блок с шепотком, практику, ссылки на сайт и протокол в боте.
     - Добавляет релевантные хештеги для умной ленты и поиска ВК.
  3. Загружает оригинальную обложку через официальный VK Photos API.
  4. Публикует запись на стене сообщества с прикрепленной обложкой.
  5. Поддерживает режим --dry-run (посмотреть готовый пост без отправки).

Использование:
  python statejnik/tools/publish_to_vk.py --slug zavyazano-razvyazano-kak-razorvat-uzel-ozhidanij-i-vernut-volyu --dry-run
  python statejnik/tools/publish_to_vk.py --slug zavyazano-razvyazano-kak-razorvat-uzel-ozhidanij-i-vernut-volyu
"""
import argparse
import io
import json
import os
import re
import sys
import requests
from PIL import Image

if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass


def load_env(env_path=".env"):
    env_vars = {}
    if os.path.exists(env_path):
        with open(env_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    env_vars[k.strip()] = v.strip().strip("\"'")
    return env_vars


def parse_frontmatter(md_path):
    with open(md_path, "r", encoding="utf-8") as f:
        content = f.read()

    meta = {}
    body = content
    if content.startswith("---"):
        parts = content.split("---", 2)
        if len(parts) >= 3:
            fm = parts[1]
            body = parts[2].strip()
            for line in fm.splitlines():
                if ":" in line:
                    k, v = line.split(":", 1)
                    meta[k.strip()] = v.strip().strip("\"'")

    return meta, body


def format_text_for_vk(meta, body, slug):
    title = meta.get("title", "").strip()
    protocol = meta.get("protocol", "").strip()
    base_site_url = "https://bez-dna-sound.com"
    article_url = f"{base_site_url}/{slug}"
    bot_url = "https://t.me/dna_sound_bot"

    # Выбираем эмодзи для главного заголовка
    h_slug = slug.lower()
    main_emoji = "✨"
    if "torgov" in h_slug or "23" in protocol:
        main_emoji = "🪙"
    elif "ne-ko-mne" in h_slug or "24" in protocol:
        main_emoji = "🪞"
    elif "nepoddeln" in h_slug or "20" in protocol:
        main_emoji = "🎙"
    elif "zavyazan" in h_slug or "22" in protocol:
        main_emoji = "🪢"

    # Преобразуем заголовки ## в визуальные разделители
    def replace_headers(match):
        header_text = match.group(1).strip()
        h_upper = header_text.upper()
        emoji = "📌"
        if "НАУЗ" in h_upper or "УЗЕЛ" in h_upper or "НИТ" in h_upper:
            emoji = "🪢"
        elif "БОЛЕЗН" in h_upper or "ХВОР" in h_upper:
            emoji = "🧵"
        elif "СЛОВЕСНЫЙ ЗАМОК" in h_upper or "СЛОВА" in h_upper or "ЗАГОВОР" in h_upper:
            emoji = "🗝"
        elif "ОБРЯД" in h_upper or "ПРАКТИК" in h_upper or "ЗАЧИН" in h_upper:
            emoji = "✨"
        elif "РАЗВЯЗАТЬ" in h_upper or "СОХРАНИТЬ" in h_upper or "ОБМЕН" in h_upper:
            emoji = "⚖️"
        elif "ПОЧИН" in h_upper or "КУПЕЦ" in h_upper or "ПРОДАЖ" in h_upper or "ТОРГ" in h_upper or "ДЕНЬГ" in h_upper:
            emoji = "🪙"
        elif "МЁД" in h_upper or "ПЧЁЛ" in h_upper:
            emoji = "🍯"
        elif "КЛЮЧ" in h_upper or "ДВЕР" in h_upper or "ДОРОГ" in h_upper:
            emoji = "🗝"
        elif "КОД" in h_upper or "ЗВУК" in h_upper:
            emoji = "🎧"
        elif "ПОСЛЕДНИЙ" in h_upper or "ФИНАЛ" in h_upper:
            emoji = "🌀"
        return f"\n\n{emoji} {h_upper}\n"

    formatted_body = re.sub(r"^##\s+(.+)$", replace_headers, body, flags=re.MULTILINE)
    formatted_body = re.sub(r"^###\s+(.+)$", r"\n\n👉 \1\n", formatted_body, flags=re.MULTILINE)

    # Очистка markdown-ссылок: [текст](/url) -> «текст» или текст
    def clean_markdown_links(match):
        link_text = match.group(1)
        url = match.group(2)
        if url.startswith("http"):
            return f"{link_text} ({url})"
        else:
            return f"«{link_text}»"

    formatted_body = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", clean_markdown_links, formatted_body)

    # Убираем жирный/курсив markdown (*, **)
    formatted_body = re.sub(r"\*\*([^*]+)\*\*", r"\1", formatted_body)
    formatted_body = re.sub(r"\*([^*]+)\*", r"\1", formatted_body)

    # Выделяем строки заговоров и шепотков
    shepotok_lines = [
        "Что завязано — то развязано.",
        "Что чужим словом послано — за порогом осталось.",
        "Что недобрым помыслом связано — моей волей освобождено.",
        "Чужого не держу, своего не отдаю.",
        "Слово моё крепко. Ключ. Замок.",
        "Ключ поворачиваю — дорогу открываю.",
        "Добрый товар — доброму купцу.",
        "Кто искал — пусть увидит.",
        "Кому надобно — пусть придёт.",
        "Товару — ход, делу — оборот.",
        "Мне за труд — честный доход.",
        "Слово сказано, путь открыт,",
        "Дело спорится, торг кипит.",
        "Открыто. Оплачено. Отдано. Принято."
    ]
    for s_line in shepotok_lines:
        formatted_body = formatted_body.replace(s_line, f"   «{s_line}»")

    # Формируем структуру поста
    parts = []

    # 1. Заголовок и вводный хук (первые строки до ката)
    parts.append(f"{main_emoji} {title}\n")
    if protocol:
        parts.append(f"🧬 {protocol}\n")

    # 2. Основное тело статьи
    parts.append(formatted_body.strip())

    # 3. Тематические хештеги
    if "torgov" in h_slug or "23" in protocol:
        tags = "#безна #код23 #торговыйзачин #продажи #купечество #фольклор #заговоры #деньги #честныйобмен #звуковыепрактики #саморазвитие"
    elif "ne-ko-mne" in h_slug or "24" in protocol:
        tags = "#безна #код24 #некомне #зеркальнаязащита #обереги #фольклор #психология #границы #звуковыепрактики #саморазвитие"
    elif "nepoddeln" in h_slug or "20" in protocol:
        tags = "#безна #код20 #неподдельныйформат #идентичность #голос #психология #границы #звуковыепрактики #саморазвитие"
    elif "zavyazan" in h_slug or "22" in protocol:
        tags = "#безна #код22 #наузы #обереги #славянскаямагия #фольклор #осознанность #психология #защитаотнегатива #звуковыепрактики #саморазвитие"
    else:
        tags = "#безна #фольклор #психология #осознанность #звуковыепрактики #саморазвитие"

    footer = (
        f"\n\n──────────────\n"
        f"🌐 Читать статью на сайте лаборатории: {article_url}\n"
        f"🎧 Открыть звуковой протокол: {bot_url}\n\n"
        f"{tags}"
    )
    parts.append(footer)

    full_text = "\n".join(parts)
    # Нормализация лишних переносов строк
    full_text = re.sub(r"\n{3,}", "\n\n", full_text).strip()
    return full_text


def get_image_file(meta):
    image_rel = meta.get("image", "").lstrip("/\\")
    if not image_rel:
        return None

    candidate = os.path.join("public", image_rel)
    # Предпочитаем JPG для VK (VK API лучше всего работает с JPG/PNG)
    base, _ = os.path.splitext(candidate)
    for ext in (".jpg", ".jpeg", ".png", ".webp"):
        if os.path.exists(base + ext):
            return base + ext
    if os.path.exists(candidate):
        return candidate
    return None


def upload_photo_to_vk(token, group_id, image_path):
    """
    Загрузка фотографии на сервер ВКонтакте для прикрепления к записи на стене.
    1. photos.getWallUploadServer
    2. POST на полученный upload_url
    3. photos.saveWallPhoto
    """
    v = "5.199"
    # 1. Получаем URL для загрузки (с повторной попыткой при flood control)
    import time
    url_get_server = "https://api.vk.com/method/photos.getWallUploadServer"
    params = {
        "access_token": token,
        "group_id": group_id,
        "v": v
    }
    data = None
    for attempt in range(2):
        resp = requests.post(url_get_server, data=params, timeout=15)
        data = resp.json()
        if "error" in data and data["error"].get("error_code") == 9:
            print(f"  ⚠️ Flood control (попытка {attempt + 1}/2), ждём 3 секунды...")
            time.sleep(3)
            continue
        break

    if "error" in data:
        err_msg = data["error"].get("error_msg")
        err_code = data["error"].get("error_code")
        print(f"  ⚠️ photos.getWallUploadServer вернул ошибку ({err_msg}, code: {err_code}). Пробуем через docs.getWallUploadServer...")
        return upload_doc_to_vk(token, group_id, image_path)

    upload_url = data["response"]["upload_url"]
    print(f"  → Сервер загрузки получен: {upload_url[:40]}...")

    # 2. Подготавливаем файл (конвертируем в JPEG, если это WEBP)
    _, ext = os.path.splitext(image_path)
    if ext.lower() == ".webp":
        im = Image.open(image_path).convert("RGB")
        buf = io.BytesIO()
        im.save(buf, format="JPEG", quality=95)
        buf.seek(0)
        files = {"photo": ("cover.jpg", buf, "image/jpeg")}
        post_resp = requests.post(upload_url, files=files, timeout=30)
    else:
        with open(image_path, "rb") as f:
            mime = "image/png" if ext.lower() == ".png" else "image/jpeg"
            files = {"photo": (os.path.basename(image_path), f, mime)}
            post_resp = requests.post(upload_url, files=files, timeout=30)

    upload_result = post_resp.json()
    print(f"  → Результат загрузки файла: {upload_result}")
    if "photo" not in upload_result or not upload_result["photo"] or upload_result["photo"] == "[]":
        raise RuntimeError(f"VK upload photo error: {upload_result}")

    # 3. Сохраняем фото в альбом группы
    url_save = "https://api.vk.com/method/photos.saveWallPhoto"
    save_params = {
        "access_token": token,
        "group_id": group_id,
        "photo": upload_result["photo"],
        "server": upload_result["server"],
        "hash": upload_result["hash"],
        "v": v
    }
    save_resp = requests.post(url_save, data=save_params, timeout=15)
    save_data = save_resp.json()
    if "error" in save_data:
        raise RuntimeError(f"VK API error (saveWallPhoto): {save_data['error'].get('error_msg')} (code: {save_data['error'].get('error_code')})")

    saved_photo = save_data["response"][0]
    owner_id = saved_photo["owner_id"]
    photo_id = saved_photo["id"]
    attachment = f"photo{owner_id}_{photo_id}"
    return attachment


def upload_doc_to_vk(token, group_id, image_path):
    """
    Загрузка изображения как документа на стену сообщества (работает с токеном сообщества).
    """
    v = "5.199"
    url_get_server = "https://api.vk.com/method/docs.getWallUploadServer"
    params = {
        "access_token": token,
        "group_id": group_id,
        "v": v
    }
    resp = requests.post(url_get_server, data=params, timeout=15)
    data = resp.json()
    if "error" in data:
        raise RuntimeError(f"VK API error (docs.getWallUploadServer): {data['error'].get('error_msg')} (code: {data['error'].get('error_code')})")

    upload_url = data["response"]["upload_url"]
    print(f"  → Сервер загрузки документов получен...")

    with open(image_path, "rb") as f:
        mime = "image/jpeg"
        post_resp = requests.post(upload_url, files={"file": (os.path.basename(image_path), f, mime)}, timeout=30)

    res = post_resp.json()
    if "file" not in res:
        raise RuntimeError(f"VK docs upload error: {res}")

    url_save = "https://api.vk.com/method/docs.save"
    save_params = {
        "access_token": token,
        "file": res["file"],
        "title": os.path.basename(image_path),
        "v": v
    }
    save_resp = requests.post(url_save, data=save_params, timeout=15)
    save_data = save_resp.json()
    if "error" in save_data:
        raise RuntimeError(f"VK API error (docs.save): {save_data['error'].get('error_msg')} (code: {save_data['error'].get('error_code')})")

    doc_info = save_data["response"]
    if "doc" in doc_info:
        doc = doc_info["doc"]
    elif isinstance(doc_info, list) and len(doc_info) > 0:
        doc = doc_info[0]
    else:
        doc = doc_info

    owner_id = doc.get("owner_id")
    doc_id = doc.get("id")
    attachment = f"doc{owner_id}_{doc_id}"
    print(f"  ✓ Документ сохранён, attachment: {attachment}")
    return attachment


def post_to_vk_wall(token, group_id, message, attachments=None):
    """
    Публикация записи на стене сообщества.
    """
    v = "5.199"
    url = "https://api.vk.com/method/wall.post"
    owner_id = -abs(int(group_id))

    data = {
        "access_token": token,
        "owner_id": owner_id,
        "from_group": 1,
        "message": message,
        "v": v
    }
    if attachments:
        data["attachments"] = attachments

    resp = requests.post(url, data=data, timeout=20)
    res_json = resp.json()
    if "error" in res_json:
        raise RuntimeError(f"VK API error (wall.post): {res_json['error'].get('error_msg')}")

    post_id = res_json["response"]["post_id"]
    return post_id


def main():
    p = argparse.ArgumentParser(description="Публикация статьи во ВКонтакте от имени сообщества")
    p.add_argument("--slug", required=True, help="Slug статьи (например: zavyazano-razvyazano-kak-razorvat-uzel-ozhidanij-i-vernut-volyu)")
    p.add_argument("--dry-run", action="store_true", help="Предпросмотр форматирования без отправки в ВК")
    p.add_argument("--token", help="VK Access Token сообщества")
    p.add_argument("--group-id", help="ID сообщества ВК (число)")
    args = p.parse_args()

    # 1. Поиск статьи
    paths_to_check = [
        os.path.join("content", "blog", f"{args.slug}.md"),
        os.path.join("published", f"{args.slug}.md"),
        f"{args.slug}.md"
    ]
    md_path = None
    for path in paths_to_check:
        if os.path.isfile(path):
            md_path = path
            break

    if not md_path:
        print(f"Ошибка: статья с slug '{args.slug}' не найдена в content/blog/ или published/.")
        sys.exit(1)

    meta, body = parse_frontmatter(md_path)
    title = meta.get("title", args.slug)
    print(f"→ Загружена статья: «{title}» ({md_path})")

    # 2. Форматирование текста
    formatted_text = format_text_for_vk(meta, body, args.slug)
    char_count = len(formatted_text)
    print(f"✓ Текст статьи отформатирован для ВК: {char_count} символов (лимит стены ВК: 15 895 символов)")

    # 3. Поиск изображения
    image_file = get_image_file(meta)
    if image_file:
        print(f"✓ Найдена обложка: {image_file}")
    else:
        print("⚠️ Обложка не найдена в public/images/blog, публикация будет без фото.")

    # Режим dry-run
    if args.dry_run:
        print("\n" + "=" * 60)
        print("--- [ПРЕДПРОСМОТР ЗАПИСИ ДЛЯ ВКОНТАКТЕ (DRY RUN)] ---")
        print("=" * 60)
        print(f"Обложка для прикрепления: {image_file}")
        print("-" * 60)
        print(formatted_text)
        print("=" * 60)
        print("✓ Dry-run успешно завершён. Запись НЕ публиковалась.")
        return

    # Получение настроек
    env = load_env()
    token = args.token or os.environ.get("VK_ACCESS_TOKEN") or env.get("VK_ACCESS_TOKEN")
    group_id = args.group_id or os.environ.get("VK_GROUP_ID") or env.get("VK_GROUP_ID") or "242296287"

    if not token:
        print("Ошибка: не указан VK_ACCESS_TOKEN (ни аргументом --token, ни в переменных окружения/секретах).")
        sys.exit(1)

    print(f"→ Подключение к VK сообществу club{group_id}...")

    # 4. Загрузка фото на сервер стены сообщества
    attachment = None
    if image_file:
        print("→ Загрузка оригинальной обложки на сервера ВКонтакте...")
        try:
            attachment = upload_photo_to_vk(token, group_id, image_file)
            print(f"✓ Обложка загружена, attachment: {attachment}")
        except Exception as e:
            print(f"⚠️ Не удалось автоматически загрузить обложку через API: {e}")
            print("→ Публикуем пост на стену с полным текстом и ссылками...")

    # 5. Публикация на стене
    print("→ Публикация записи на стене сообщества...")
    try:
        post_id = post_to_vk_wall(token, group_id, formatted_text, attachment)
        wall_url = f"https://vk.com/wall-{group_id}_{post_id}"
        print("\n🎉 УСПЕШНО ОПУБЛИКОВАНО ВО ВКОНТАКТЕ!")
        print(f"Ссылка на запись: {wall_url}")
    except Exception as e:
        print(f"❌ Ошибка публикации на стене ВК: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
