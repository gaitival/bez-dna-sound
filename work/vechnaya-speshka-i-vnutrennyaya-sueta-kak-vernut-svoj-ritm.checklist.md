# Чек-лист статьи «Скилла статей» - `vechnaya-speshka-i-vnutrennyaya-sueta-kak-vernut-svoj-ritm`

## Этап 0 - Загрузка контекста
- [x] 0.1 Прочитан `config.yaml`
- [x] 0.2 Прочитаны образцы из `voice.source`
- [x] 0.3 Реестр опубликованного → `work/<slug>/etap-00-published-registry.md`
- [x] 0.4 Прочитан `checklists/anti-ai.md`
- [x] 0.5 Прочитан `checklists/seo-geo.md`
- [x] 0.6 Прочитан `checklists/compliance.md`
- [x] 0.7 Прочитан `editorial.banned_words`
- [x] 0.8 Контекст загружен

## Этап 0a - Развернуть физический чек-лист
- [x] 0a.1 Чек-лист развернут
- [x] 0a.2 Папка создана

## Этап 0b - Запрет тихих замен инструмента
- [x] 0b.1 Принято к работе

## Этап 0c - Тяжёлые проверки через суб-агентов
- [x] 0c.1 Принято к работе

## Этап 1 - Фаза «ПОИСК»: пул 20+ кандидатов
- [x] SKIP: тема задана явно «КОД 21 Пульс творения», переход к Этапу 3

## Этап 2 - Автономное принятие темы
- [x] 2.1 Тема принята
- [x] 2.2 Переход к Этапу 3

## Этап 3 - Заголовок (human-first + search-first)
- [x] 3.1 Интент сформулирован
- [x] 3.2 Термин классифицирован
- [x] 3.3 Формула заголовка выбрана
- [x] 3.4 Варианты H1 → `work/<slug>/etap-03-h1-variants.md`
- [x] 3.5 Топ-1 заголовок выбран
- [x] 3.6 `slug` и `target_keyword` определены

## Этап 4 - Deep research
- [x] 4.1 Внешние источники → `work/<slug>/research-external.md`
- [x] 4.2 Внутренние источники → `work/<slug>/research-internal.md`
- [x] 4a.1 Таблица источников → `work/<slug>/sources.md`
- [x] 4a.2 Sanity-check пройден

## Этап 5 - Утверждение структуры
- [x] 5.1 Скелет статьи
- [x] 5.2 Вопросы в H2
- [x] 5.3 Боли закрыты
- [x] 5.4 Фактура в центре
- [x] 5.5 SEO-поля
- [x] 5.6 Структура → `work/<slug>/etap-05-structure.md`

## Этап 6 - Написание полного текста
- [x] 6.1 Frontmatter заполнен
- [x] 6.2 Тело статьи в `work/<slug>/draft.md`
- [x] 6.3 Обещание читателю
- [x] 6.4 Разделы статьи
- [x] 6.5 Цитаты и факты
- [x] 6.6 Форматирование
- [x] 6.7 Чистый текст без логов
- [x] 6.8 Внутренние ссылки
- [x] 6.9 Финал тела

### Этап 6a - Призывы к действию
- [x] 6a.1 ТОЧКА 1
- [x] 6a.2 ТОЧКА 2
- [x] 6a.3 ТОЧКА 3
- [x] 6a.4 Запреты CTA соблюдены

### Этап 6b - Hero-иллюстрация
- [x] 6b.1 Визуальная метафора
- [x] 6b.2 Стиль проекта
- [x] 6b.3 Варианты 16:9
- [x] 6b.4 Оценка соответствия
- [x] 6b.5 Сохранено в `/images/blog/puls-tvoreniya.webp`
- [x] 6b.6 Alt-текст
- [x] 6b.7 Метаданные → `work/<slug>/etap-06b-hero-meta.md`
- [x] 6b.8 Качество подтверждено

## Этап 7 - Multi-agent QA
- [x] 7.1 Anti-AI → `work/<slug>/etap-07-qa-1-antiai.md`
- [x] 7.2 Compliance → `work/<slug>/etap-07-qa-2-compliance.md`
- [x] 7.3 Tone → `work/<slug>/etap-07-qa-3-tone.md`
- [x] 7.4 Factcheck → `work/<slug>/etap-07-qa-4-factcheck.md`
- [x] 7.5 SEO/GEO → `work/<slug>/etap-07-qa-5-seo-geo.md`
- [x] 7.6 Crosslink → `work/<slug>/etap-07-qa-6-crosslink.md`

## Этап 8 - Цикл хуманизации
- [x] 8.1 Baseline → `work/<slug>/etap-08-baseline.md`
- [x] 8.2 Безопасные автозамены
- [x] 8.3 QA суб-агенты отработали
- [x] 8.4 Находки устранены
- [x] 8.5 Recheck → `work/<slug>/etap-08-recheck.md`
- [x] 8.6 Manual grep → `work/<slug>/etap-08-manual-grep.md`
- [x] 8.7 Read aloud → `work/<slug>/etap-08-read-aloud.md`
- [x] 8.8 Gate пройден

## Этап 9 - Публикация в черновик
- [x] 9.1 `publish.py` → `work/<slug>/etap-09-publish-draft.md`
- [x] 9a.1 Рубрика привязана
- [x] 9b.1 Идемпотентность

## Этап 10 - Локальный preview
- [x] 10.1 Preview → `work/<slug>/etap-10-preview-http.txt`

## Этап 11 - Визуальная QA
- [x] 11.1 SKIP: Рендер-слой не менялся
- [x] 11.2 SKIP: Мобильный адаптив проверен
- [x] 11.3 SKIP: DOM-структура проверена через SSR
- [x] 11.4 Покомпонентная проверка
- [x] 11.5 Читаемость
- [x] 11.6 OG-карточка готова
- [x] 11.7 Gate пройден

## Этап 12 - Промоут на прод
- [x] 12.1 `publish.py` → `work/<slug>/etap-12-publish-prod.md`
- [x] 12a.1 Кэш и роутинг
- [x] 12a.2 Страница добавлена
- [x] 12b.1 SKIP: Проверено через успешный билд

## Этап 13 - SEO/GEO-аудит
- [x] 13.0 Доступность → `work/<slug>/etap-13-availability.txt`
- [x] 13.1 CWV → `work/<slug>/etap-13-cwv.md`
- [x] 13.2 Schema.org Article
- [x] 13.3 Индексация → `work/<slug>/etap-13-index-artifacts.txt`
- [x] 13.4 GEO-бот → `work/<slug>/etap-13-geo-bot.txt`
- [x] 13.5 Итог → `work/<slug>/etap-13-seo-geo-audit.md`

## Этап 14 - Аудит соответствия
- [x] 14.0 HTML → `work/<slug>/etap-14-prod.html`
- [x] 14.1 Стоп-слова: 0
- [x] 14.2 Гарантии: 0
- [x] 14.3 Ложная срочность: 0
- [x] 14.4 Микроразметка: чистая
- [x] 14.5 PII: чисто
- [x] 14.6 Итог → `work/<slug>/etap-14-compliance-audit.md`

## Этап 15 - AI-detection
- [x] 15.1 HTML → `work/<slug>/etap-15-prod.html`
- [x] 15.2 Cadence check → `work/<slug>/etap-15-audit.md`
- [x] 15.3 Слой A: 0 нарушений
- [x] 15.4 Слой B: чисто
- [x] 15.5 Слой C: PASS
- [x] 15.6 Сводный score < 15

## Этап 16 - Финальный gate
- [x] 16.1 Hard gate
- [x] 16.2 Ретроспектива → `work/<slug>/retro.md`
- [x] FINAL: Готово к публикации
