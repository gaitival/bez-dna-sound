#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
publish_to_telegram.py - Публикация статьи в Telegraph (Instant View) и анонса в Telegram-канал.

Возможности:
  1. Автоматически создает статью в Telegra.ph с нативной поддержкой Instant View («Быстрый просмотр»).
  2. Форматирует пост для Telegram-канала с обложкой, описанием, кнопкой «Быстрый просмотр» и ссылкой на бота.
  3. Поддерживает режим предпросмотра --dry-run (без отправки в канал).
  4. Поддерживает создание только страницы в Telegraph (--telegraph-only).

Использование:
  # Проверить форматирование и Telegraph без отправки в канал:
  python statejnik/tools/publish_to_telegram.py --slug sindrom-emocionalnoj-gubki-kak-zashchitit-sebya-ot-chuzhogo-negativa --dry-run

  # Опубликовать в Telegraph и отправить в Telegram-канал:
  python statejnik/tools/publish_to_telegram.py --slug sindrom-emocionalnoj-gubki-kak-zashchitit-sebya-ot-chuzhogo-negativa
"""
import argparse
import json
import os
import re
import sys
import urllib.request
import urllib.parse

try:
    from telegraph_utils import publish_to_telegraph
except ImportError:
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    from telegraph_utils import publish_to_telegraph

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


def send_photo_telegram(bot_token, chat_id, photo_path, caption, reply_markup=None):
    url = f"https://api.telegram.org/bot{bot_token}/sendPhoto"

    # Check if photo is local file or URL
    if photo_path.startswith("http"):
        data = {
            "chat_id": chat_id,
            "photo": photo_path,
            "caption": caption,
            "parse_mode": "HTML"
        }
        if reply_markup:
            data["reply_markup"] = json.dumps(reply_markup)

        req = urllib.request.Request(
            url,
            data=urllib.parse.urlencode(data).encode("utf-8"),
            headers={"Content-Type": "application/x-www-form-urlencoded"}
        )
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read().decode("utf-8"))
    else:
        import mimetypes
        boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW"
        body_bytes = bytearray()

        def add_field(name, val):
            body_bytes.extend(f"--{boundary}\r\n".encode("utf-8"))
            body_bytes.extend(f'Content-Disposition: form-data; name="{name}"\r\n\r\n'.encode("utf-8"))
            body_bytes.extend(f"{val}\r\n".encode("utf-8"))

        add_field("chat_id", chat_id)
        add_field("caption", caption)
        add_field("parse_mode", "HTML")
        if reply_markup:
            add_field("reply_markup", json.dumps(reply_markup))

        if os.path.exists(photo_path):
            fname = os.path.basename(photo_path)
            mime = mimetypes.guess_type(photo_path)[0] or "application/octet-stream"
            body_bytes.extend(f"--{boundary}\r\n".encode("utf-8"))
            body_bytes.extend(f'Content-Disposition: form-data; name="photo"; filename="{fname}"\r\n'.encode("utf-8"))
            body_bytes.extend(f"Content-Type: {mime}\r\n\r\n".encode("utf-8"))
            with open(photo_path, "rb") as pf:
                body_bytes.extend(pf.read())
            body_bytes.extend(b"\r\n")

        body_bytes.extend(f"--{boundary}--\r\n".encode("utf-8"))

        req = urllib.request.Request(
            url,
            data=body_bytes,
            headers={"Content-Type": f"multipart/form-data; boundary={boundary}"}
        )
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read().decode("utf-8"))


def main():
    parser = argparse.ArgumentParser(description="Публикация статьи в Telegraph (Instant View) и Telegram-канал")
    parser.add_argument("--slug", required=True, help="Slug статьи из content/blog/")
    parser.add_argument("--channel", help="ID канала или @username (перебивает .env)")
    parser.add_argument("--token", help="Токен бота (перебивает .env)")
    parser.add_argument("--dry-run", action="store_true", help="Режим предпросмотра: не отправлять в Telegram-канал")
    parser.add_argument("--telegraph-only", action="store_true", help="Только создать страницу в Telegraph")
    parser.add_argument("--no-telegraph", action="store_true", help="Не создавать Telegraph страницу (ссылка только на сайт)")
    args = parser.parse_args()

    md_path = f"content/blog/{args.slug}.md"
    if not os.path.exists(md_path):
        print(f"Ошибка: файл {md_path} не найден.")
        sys.exit(1)

    meta, body = parse_frontmatter(md_path)
    title = meta.get("title", "Статья")
    protocol = meta.get("protocol", "Протокол")
    description = meta.get("description", "")
    image_rel = meta.get("image", "").lstrip("/")

    # Путь к изображению
    image_path = os.path.join("public", image_rel)
    if not os.path.exists(image_path):
        image_jpg = os.path.splitext(image_path)[0] + ".jpg"
        if os.path.exists(image_jpg):
            image_path = image_jpg

    base_site_url = "https://bez-dna-sound.lovable.app"
    article_url = f"{base_site_url}/{args.slug}"
    bot_url = "https://t.me/dna_sound_bot"

    # 1. Создание страницы в Telegra.ph для Instant View
    telegraph_url = None
    if not args.no_telegraph:
        try:
            print(f"→ Создание страницы в Telegra.ph: «{title}»...")
            telegraph_url = publish_to_telegraph(
                title=title,
                body_text=body,
                author_name="Без-Дна",
                author_url=base_site_url
            )
            print(f"✓ Telegraph страница создана: {telegraph_url}")
        except Exception as e:
            print(f"⚠️ Предупреждение: не удалось создать страницу в Telegraph ({e}). Используем прямую ссылку на сайт.")

    if args.telegraph_only:
        print("Готово (--telegraph-only).")
        return

    # 2. Форматирование текста анонса для Telegram
    caption_lines = [
        f"<b>{title}</b>",
        "",
        f"🧬 <b>Разбор: {protocol}</b>",
        "",
        f"{description}",
        "",
        "<i>15 минут звука, визуального ключа и инструкции, которые переводят нервную систему в другое состояние.</i>",
        ""
    ]

    if telegraph_url:
        caption_lines.append(f"⚡ <a href=\"{telegraph_url}\">Быстрый просмотр статьи (Instant View)</a>")
    else:
        caption_lines.append(f"📖 <a href=\"{article_url}\">Читать полную статью на сайте</a>")

    caption_lines.append(f"🤖 <a href=\"{bot_url}\">Запустить протокол в Telegram</a>")

    caption = "\n".join(caption_lines)

    # 3. Инлайн-кнопки
    buttons = []
    if telegraph_url:
        buttons.append([
            {"text": "📖 Читать", "url": telegraph_url}
        ])
        buttons.append([
            {"text": "🌐 На сайт", "url": article_url},
            {"text": "🧬 Открыть протокол", "url": bot_url}
        ])
    else:
        buttons.append([
            {"text": "🌐 На сайт", "url": article_url},
            {"text": "🧬 Открыть протокол", "url": bot_url}
        ])

    reply_markup = {"inline_keyboard": buttons}

    if args.dry_run:
        print("\n--- [ПРЕДПРОСМОТР ПОСТА ДЛЯ КАНАЛА (DRY RUN)] ---")
        print(f"Обложка: {image_path}")
        print(f"Текст:\n{caption}")
        print(f"Кнопки: {json.dumps(reply_markup, ensure_ascii=False, indent=2)}")
        print("--- [КОНЕЦ ПРЕДПРОСМОТРА (Пост НЕ отправлялся в канал)] ---\n")
        return

    # 4. Отправка в канал
    env = load_env()
    token = args.token or env.get("TELEGRAM_BOT_TOKEN")
    channel = args.channel or env.get("TELEGRAM_CHANNEL_ID")

    if not token or not channel:
        print("Ошибка: укажите TELEGRAM_BOT_TOKEN и TELEGRAM_CHANNEL_ID в .env или параметрами --token и --channel.")
        sys.exit(1)

    try:
        res = send_photo_telegram(token, channel, image_path, caption, reply_markup)
        if res.get("ok"):
            print(f"Успешно опубликовано в {channel}! (Message ID: {res['result']['message_id']})")
        else:
            print(f"Ошибка Telegram API: {res}")
    except Exception as e:
        print(f"Ошибка отправки в Telegram: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
