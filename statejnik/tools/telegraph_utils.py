#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
telegraph_utils.py - Утилита для работы с Telegraph API (создание страниц с Instant View).
"""
import json
import os
import re
import urllib.request
import urllib.parse

TELEGRAPH_API_URL = "https://api.telegra.ph"


def get_or_create_telegraph_token(env_path=".env", short_name="BezDna", author_name="Без-Дна", author_url="https://bez-dna-sound.lovable.app"):
    """
    Получает существующий токен Telegraph из .env или регистрирует новый аккаунт.
    """
    token = None
    if os.path.exists(env_path):
        with open(env_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line.startswith("TELEGRAPH_ACCESS_TOKEN="):
                    token = line.split("=", 1)[1].strip().strip("\"'")
                    break

    if token:
        return token

    # Регистрация нового аккаунта Telegraph
    url = f"{TELEGRAPH_API_URL}/createAccount"
    data = {
        "short_name": short_name,
        "author_name": author_name,
        "author_url": author_url,
    }
    req = urllib.request.Request(
        url,
        data=urllib.parse.urlencode(data).encode("utf-8"),
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    with urllib.request.urlopen(req) as resp:
        res = json.loads(resp.read().decode("utf-8"))
        if res.get("ok"):
            token = res["result"]["access_token"]
            # Дописываем токен в .env
            with open(env_path, "a", encoding="utf-8") as f:
                f.write(f"\nTELEGRAPH_ACCESS_TOKEN=\"{token}\"\n")
            return token
        else:
            raise RuntimeError(f"Ошибка создания Telegraph аккаунта: {res}")


def markdown_to_telegraph_nodes(body_text):
    """
    Преобразует текст статьи из Markdown в дерево DOM-узлов для Telegraph API.
    Поддерживает: ## (h3), ### (h4), **жирный**, *курсив*, [ссылки](url), списки, цитаты.
    """
    nodes = []

    def parse_inlines(text):
        """Парсинг инлайновых элементов: ссылки, bold, italic"""
        parts = []
        # Регулярка для ссылок, bold, italic
        pattern = re.compile(r'(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*)')
        last_idx = 0
        for m in pattern.finditer(text):
            start, end = m.span()
            if start > last_idx:
                parts.append(text[last_idx:start])
            
            full = m.group(0)
            if full.startswith("["):
                # Link
                label = m.group(2)
                href = m.group(3)
                if href.startswith("/"):
                    href = f"https://bez-dna-sound.lovable.app{href}"
                parts.append({"tag": "a", "attrs": {"href": href}, "children": [label]})
            elif full.startswith("**"):
                # Bold
                inner = m.group(4)
                parts.append({"tag": "b", "children": [inner]})
            elif full.startswith("*"):
                # Italic
                inner = m.group(5)
                parts.append({"tag": "i", "children": [inner]})
            
            last_idx = end

        if last_idx < len(text):
            parts.append(text[last_idx:])

        return parts

    lines = body_text.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        i += 1

        if not line or line == "---":
            continue

        if line.startswith("## "):
            nodes.append({"tag": "h3", "children": parse_inlines(line[3:].strip())})
        elif line.startswith("### "):
            nodes.append({"tag": "h4", "children": parse_inlines(line[4:].strip())})
        elif line.startswith("> "):
            nodes.append({"tag": "blockquote", "children": parse_inlines(line[2:].strip())})
        elif line.startswith("- ") or line.startswith("* "):
            nodes.append({"tag": "p", "children": ["• "] + parse_inlines(line[2:].strip())})
        elif re.match(r'^\d+\.\s+', line):
            nodes.append({"tag": "p", "children": parse_inlines(line)})
        else:
            nodes.append({"tag": "p", "children": parse_inlines(line)})

    return nodes


def publish_to_telegraph(title, body_text, author_name="Без-Дна", author_url="https://bez-dna-sound.lovable.app", env_path=".env"):
    """
    Создает страницу в Telegraph и возвращает полный URL статьи (с Instant View).
    """
    token = get_or_create_telegraph_token(env_path=env_path, author_name=author_name, author_url=author_url)
    nodes = markdown_to_telegraph_nodes(body_text)

    url = f"{TELEGRAPH_API_URL}/createPage"
    payload = {
        "access_token": token,
        "title": title[:250],
        "author_name": author_name,
        "author_url": author_url,
        "content": json.dumps(nodes, ensure_ascii=False),
        "return_content": False
    }

    req = urllib.request.Request(
        url,
        data=urllib.parse.urlencode(payload).encode("utf-8"),
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    with urllib.request.urlopen(req) as resp:
        res = json.loads(resp.read().decode("utf-8"))
        if res.get("ok"):
            page_path = res["result"]["path"]
            return f"https://telegra.ph/{page_path}"
        else:
            raise RuntimeError(f"Ошибка публикации в Telegraph: {res}")
