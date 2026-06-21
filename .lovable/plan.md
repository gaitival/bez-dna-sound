## Что сделаю

Внедрю рекомендации Google PageSpeed и доукомплектую `<head>`. Все правки — в `src/routes/__root.tsx` (общие теги) и `src/routes/index.tsx` (для главной).

### 1. Производительность (главная боль из скриншотов)

**Шрифты Google перестанут блокировать рендер (экономия ~1350 мс)**
- Заменю `<link rel="stylesheet" href="...fonts.googleapis.com...">` на не-блокирующую загрузку:
  - `<link rel="preconnect" href="https://fonts.googleapis.com">`
  - `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`
  - `<link rel="preload" as="style" href="...">`
  - `<link rel="stylesheet" media="print" onload="this.media='all'" href="...">`
  - `<noscript><link rel="stylesheet" href="..."></noscript>` (фолбэк)
- Это уберёт красный пункт *«Запросы, блокирующие отрисовку страницы»*.

**LCP-задержка 2500 мс**
- Добавлю `<link rel="preload" as="image" fetchpriority="high">` для главной фоновой/hero-картинки на `/` (LCP-элемент — заголовок «ЛАБОРАТОРИЯ ГЛУБИННОЙ НАСТРОЙКИ» с фоном).
- Уберу `opacity:0 → 1` анимацию у самого H1 LCP (framer-motion задерживает отрисовку): для главного заголовка стартовое `opacity` сделаю `1`, чтобы он отрисовался сразу.

**Сторонний код (Google Analytics)**
- Уже грузится `async` — оставлю. Кеш `gpteng.co` и его шрифт `CameraPla` — это лоадер песочницы превью, на проде его не будет, фиксить нечего.

### 2. Head-теги (что вы перечислили)

В `src/routes/__root.tsx`:
- ✅ `viewport` — уже есть, оставлю.
- ➕ **Favicon**: добавлю `<link rel="icon" href="/favicon.ico">` (файл уже лежит в `public/favicon.ico`).
- 🔧 `<html lang="en">` → `<html lang="ru">` (сайт на русском).
- ✅ Дефолтные OG-теги (`og:type`, `og:site_name`, `og:image`, twitter:*) — уже есть.

В `src/routes/index.tsx` (главная):
- 🔧 **Title** ≤ 60 симв.: уже 51 симв. («Аптека состояний — Лаборатория глубинной настройки») — оставлю.
- 🔧 **Description** ≤ 160 симв.: текущая 148 — оставлю.
- ➕ Добавлю на главную **og:image** + **og:type=website** + **twitter:card/title/description/image** (сейчас они только в root — перенесу/продублирую с самоссылкой), и сделаю `canonical`/`og:url` абсолютными (`https://bez-dna-sound.lovable.app/`), как требует чек-лист.

### 3. Что НЕ трогаю

- Не меняю механизм sitemap/robots — он уже настроен.
- Не делаю «удалить неиспользуемый JS на 138 KiB» — это рекомендация по tree-shaking бандла Vite, требует крупного рефакторинга lib (framer-motion, radix). Скажу про это в финальном сообщении как опциональный шаг.
- Не подключаю свои self-hosted шрифты вместо Google Fonts — это отдельная большая задача (можно сделать следующим шагом, даст ещё ~700 мс).

### Файлы

- `src/routes/__root.tsx` — fonts non-blocking, favicon, `lang="ru"`.
- `src/routes/index.tsx` — preload LCP, абсолютные canonical/og:url, og:image на главной, мгновенная отрисовка H1.
