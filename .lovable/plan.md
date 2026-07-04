## Анализ скриншота PageSpeed Insights (мобильная версия)

На отчёте видны 4 круговых показателя: Performance ~63, а Accessibility / Best Practices / SEO — зелёные (близки к 100). То есть **SEO-балл у PSI уже высокий**, проседает именно Performance, и это тоже влияет на мобильный поиск Google (Core Web Vitals — фактор ранжирования).

Текущее состояние в коде уже хорошее:
- `<title>`, `description`, `og:*`, `twitter:*`, `canonical` заданы на главной
- JSON-LD Organization + FAQPage
- `viewport`, `theme-color`, `lang="ru"` в root
- шрифты preconnect + preload

## Что реально можно улучшить для мобильного SEO

### 1. Core Web Vitals (главное — влияет и на PSI, и на ранжирование)
- **LCP**: сейчас героический символ + Orbitron грузится через runtime `<script>`-инжект стилей → задерживает первый рендер. Заменить инжект на обычный `<link rel="stylesheet">` в `head().links` и добавить `font-display: swap` через параметр Google Fonts (уже есть `&display=swap`, но подключение отложено JS-ом — убрать это).
- Добавить `rel="preload"` для LCP-элемента (если это картинка/символ) на главной.
- Отложить Google Analytics (`gtag`) через `defer` вместо `async` и/или подгружать после `load`, чтобы не блокировать основной поток на мобильных.
- `framer-motion` тяжёлый — на первом экране заменить на CSS-анимации или lazy-import для секций ниже сгиба.

### 2. Мобильный контент и разметка
- Убедиться, что **один `<h1>`** на странице (сейчас — да, в hero) и заголовки секций — `<h2>`. Проверить `SectionTitle`.
- Добавить `alt` ко всем декоративным/значимым изображениям (SacredSymbol — `role="img"` + `aria-label`).
- Кнопки-ссылки Telegram — использовать `<a rel="noopener">` + понятный текст (уже ок).

### 3. Расширенная schema.org для мобильной выдачи
- Добавить `WebSite` + `SearchAction` (sitelinks searchbox) в root.
- Дополнить `Organization` полями `logo`, `sameAs` (соцсети), контакты.
- Для секции «Аптека состояний» / «Примеры треков» — `ItemList` или `Product` разметка, чтобы получать rich results в мобильном Google.

### 4. Мобильный UX-сигнал (Page Experience)
- Проверить, что `StickyMobileCTA` не перекрывает контент и не вызывает CLS.
- Тап-таргеты ≥ 48px (кнопки CTA — да, `h-[52px]`).
- Горизонтальный скролл: проверить, что нет overflow на 360px ширине.

### 5. Индексация
- `robots.txt` + `sitemap.xml` уже есть — проверить, что sitemap отдаёт только `/` и `/tree` с корректным `lastmod`.
- Добавить `hreflang="ru"` на главной.

## Что делаю по плану

1. Убираю runtime-инъекцию Google Fonts, заменяю на обычный `<link rel="stylesheet">` в root.
2. `gtag` → `defer` + инициализация после `DOMContentLoaded`.
3. Добавляю `WebSite` JSON-LD с `SearchAction` и расширяю `Organization` (logo, sameAs).
4. Добавляю `hreflang="ru"` и `<link rel="alternate">`.
5. Проверяю иерархию заголовков и `alt`/`aria-label` на `SacredSymbol`.
6. Лениво импортирую тяжёлые секции ниже первого экрана (framer-motion блоки) через `React.lazy`, чтобы уменьшить JS первого экрана.

Пункт про framer-motion lazy-load — самый рискованный (может поменять поведение анимаций). Скажи, включать его или ограничиться пунктами 1–5, которые безопасны и уже дадут заметный прирост Performance/SEO на мобильном.