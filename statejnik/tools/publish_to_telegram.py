#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
publish_to_telegram.py - публикация анонса статьи в Telegram-канал проекта.

Как работает:
  1. Читает .env (TELEGRAM_BOT_TOKEN, TELEGRAM_CHANNEL_ID).
  2. Загружает markdown-статью из content/blog/<slug>.md.
  3. Форматирует стильный пост для канала (картинка, цепляющий хук, 3 тезиса,
     кнопка/ссылка на чтение полной статьи на сайте и ссылка на бота).
  4. Отправляет через официальный Telegram Bot API (без внешних зависимостей, чисто urllib).

Использование:
  python statejnik/tools/publish_to_telegram.py --slug kak-ostanovit-mysli-v-golove-i-emocionalnyj-shum
"""
import argparse
import json
import os
import re
import sys
import urllib.request
import urllib.parse

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
        # Multipart form data for local photo
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
    parser = argparse.ArgumentParser(description="Публикация анонса статьи в Telegram-канал")
    parser.add_argument("--slug", required=True, help="Slug статьи из content/blog/")
    parser.add_argument("--channel", help="ID канала или @username (перебивает .env)")
    parser.add_argument("--token", help="Токен бота (перебивает .env)")
    args = parser.parse_args()

    env = load_env()
    token = args.token or env.get("TELEGRAM_BOT_TOKEN")
    channel = args.channel or env.get("TELEGRAM_CHANNEL_ID")

    if not token or not channel:
        print("Ошибка: укажите TELEGRAM_BOT_TOKEN и TELEGRAM_CHANNEL_ID в файле .env или флагами --token и --channel.")
        print("Пример в .env:")
        print('  TELEGRAM_BOT_TOKEN="123456789:ABCdefGHIjklMNOpqrSTUvwxYZ"')
        print('  TELEGRAM_CHANNEL_ID="@your_channel_name"')
        sys.exit(1)

    md_path = f"content/blog/{args.slug}.md"
    if not os.path.exists(md_path):
        print(f"Ошибка: файл {md_path} не найден.")
        sys.exit(1)

    meta, body = parse_frontmatter(md_path)
    title = meta.get("title", "Статья")
    protocol = meta.get("protocol", "Протокол")
    description = meta.get("description", "")
    image_rel = meta.get("image", "").lstrip("/")

    image_path = os.path.join("public", image_rel)
    if not os.path.exists(image_path):
        image_jpg = os.path.splitext(image_path)[0] + ".jpg"
        if os.path.exists(image_jpg):
            image_path = image_jpg

    base_site_url = "https://bez-dna-sound.lovable.app"
    article_url = f"{base_site_url}/{args.slug}"
    bot_url = "https://t.me/dna_sound_bot"

    caption = (
        f"<b>{title}</b>\n\n"
        f"🧬 <b>Разбор: {protocol}</b>\n\n"
        f"{description}\n\n"
        f"<i>15 минут звука, визуального ключа и инструкции, которые переводят нервную систему в другое состояние.</i>\n\n"
        f"📖 <a href=\"{article_url}\">Читать полную статью на сайте</a>\n"
        f"⚡ <a href=\"{bot_url}\">Запустить протокол в Telegram</a>"
    )

    reply_markup = {
        "inline_keyboard": [
            [
                {"text": "📖 Читать статью на сайте", "url": article_url},
                {"text": "🧬 Выбрать протокол в боте", "url": bot_url}
            ]
        ]
    }

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
