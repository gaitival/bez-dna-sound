import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { SacredSymbol } from "@/components/SacredSymbol";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { TREE_NODES, TELEGRAM_URL } from "@/data/tree";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Без-Дна — Лаборатория глубинной настройки" },
      {
        name: "description",
        content:
          "Telegram-проект резонансных протоколов и точечных аудио-инструментов для состояний, где нужно собраться. 21 узел Древа. Аптека состояний.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Без-Дна — Лаборатория глубинной настройки" },
      {
        property: "og:description",
        content:
          "Резонансные протоколы и аудио-инструменты под конкретное состояние. Вход — в Telegram.",
      },
      { property: "og:url", content: "https://bez-dna-sound.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Без-Дна — Лаборатория глубинной настройки" },
      {
        name: "twitter:description",
        content:
          "Резонансные протоколы и аудио-инструменты под конкретное состояние. Вход — в Telegram.",
      },
    ],
    links: [{ rel: "canonical", href: "https://bez-dna-sound.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Проект Без-Дна",
          description:
            "Telegram-проект резонансных протоколов, мантр-манифестов и аудио-инструментов под конкретные состояния.",
          url: "https://bez-dna-sound.lovable.app/",
          sameAs: [TELEGRAM_URL],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((it) => ({
            "@type": "Question",
            name: it.q,
            acceptedAnswer: { "@type": "Answer", text: it.a },
          })),
        }),
      },
    ],
  }),
  component: Landing,
});

const FAQ_ITEMS = [
  {
    q: "Что это вообще такое",
    a: "Это Telegram-проект резонансных протоколов, мантр-манифестов и точечных аудио-инструментов под конкретные состояния. Здесь ты не просто слушаешь звук, а получаешь рабочий пакет: аудио, визуал и инструкцию под нужную точку входа.",
  },
  {
    q: "Чем протокол отличается от обычной музыки",
    a: "Обычную музыку чаще включают «под настроение». Протокол собирается под конкретный внутренний сбой: шум, страх, потерю опоры, истощение, размытые границы, провал ритма или потерю вектора. Это не фон, а точечный инструмент.",
  },
  {
    q: "Что входит в покупку",
    a: "Внутри каждого протокола — WAV, MP3, визуал и инструкция. То есть ты получаешь не один файл, а целый пакет для входа в состояние и дальнейшей работы с ним.",
  },
  {
    q: "Нужны ли наушники",
    a: "Лучше — да. Так звук воспринимается точнее, а внимание меньше рассеивается. Но если наушников нет, начать всё равно можно.",
  },
  {
    q: "Как я получу подарок «Код личности»",
    a: "После покупки первого платного протокола бонус открывается автоматически внутри Telegram. Дополнительно писать или отдельно запрашивать его не нужно.",
  },
  {
    q: "Почему 21 день",
    a: "21 день — это не марафон ради цифры, а логика цикла. За это время система успевает не только отреагировать на новый инструмент, но и пройти путь от первичной диагностики к более устойчивой внутренней сборке.",
  },
  {
    q: "Как происходит оплата",
    a: "Оплата проходит внутри Telegram через Stars — официальную внутреннюю валюту мессенджера. Всё происходит прямо в приложении, без лишних переходов и без ручной переписки.",
  },
  {
    q: "Это эзотерика",
    a: "Нет в бытовом смысле этого слова. Проект работает не через «магические обещания», а через внимание, ритм, слово, внутреннее состояние и собранную архитектуру смысла. Здесь важен не антураж, а результат: меньше шума, больше опоры, ясности и управляемости.",
  },
  {
    q: "Обязательно ли идти в Telegram",
    a: "Да. Лендинг — это точка входа. Вся логика проекта, покупка, выдача материалов, дерево, бонусы и работа с модулями происходят внутри Telegram-приложения.",
  },
  {
    q: "С чего лучше начать",
    a: "Если ты заходишь впервые — с входа в Telegram и базового просмотра системы. Если хочется сначала почувствовать логику проекта — посмотри карту пути и модули, а потом переходи в приложение.",
  },
];

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`mx-auto w-full max-w-6xl px-4 py-16 md:py-24 ${className}`}
    >
      {children}
    </motion.section>
  );
}

function SectionTitle({ kicker, title, lead }: { kicker?: string; title: string; lead?: string }) {
  return (
    <div className="mb-10 text-center">
      {kicker && (
        <div className="font-mono text-[11px] uppercase tracking-[0.35em] text-primary/80">
          {kicker}
        </div>
      )}
      <h2 className="mt-3 font-display text-2xl uppercase text-primary text-glow-gold md:text-4xl">
        {title}
      </h2>
      <div className="sacred-line mx-auto mt-6 w-40" />
      {lead && (
        <p className="mx-auto mt-5 max-w-2xl font-mono text-xs leading-relaxed text-muted-foreground md:text-sm">
          {lead}
        </p>
      )}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-10 md:pt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[58%_42%]">
        {/* Left column */}
        <div className="text-center md:text-left">
          <div className="font-mono text-[11px] uppercase tracking-[0.4em] text-primary/80" style={{ animation: "var(--animate-breathe)" }}>
            ✦ Система · Online
          </div>

          <h1 className="mt-5 font-display text-[34px] uppercase leading-[1.05] text-primary text-glow-gold md:text-6xl">
            Лаборатория<br />глубинной настройки
          </h1>

          <p className="mt-5 font-mono text-sm leading-relaxed text-foreground/85 md:text-base">
            Telegram-проект резонансных протоколов и точечных аудио-инструментов для состояний, где нужно не отвлекаться, а собраться.
          </p>

          <div className="sacred-line mx-auto mt-7 w-40 md:mx-0" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="oracle-card mt-7 w-full px-6 py-6 text-left"
          >
            <p className="text-[15px] leading-relaxed text-foreground/90">
              Иногда человек не «сломался» — он просто слишком долго живёт в шуме, перегрузе, чужом давлении, усталости или внутреннем раздвоении.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground/90">
              «Без-Дна» — это система звуковых протоколов, мантр-манифестов, аудио-резонансов и точных инструкций, собранных под конкретные состояния: когда нужно вернуть ясность, энергию, границы, внутреннюю опору, ритм или право на своё.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground/90">
              Это не плейлист «для фона» и не абстрактная эзотерика. Это Telegram-приложение, где ты заходишь в систему, выбираешь точку входа и получаешь инструмент под свой текущий сбой.
            </p>
          </motion.div>

          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-primary/80">
            Внутри: 21 узел Древа · Аптека состояний · Код личности · бонус первого платного протокола
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold btn-gold-hover inline-flex min-h-[54px] items-center justify-center px-7 py-4 text-sm md:text-base"
              style={{ animation: "var(--animate-pulse-glow)" }}
            >
              Открыть в Telegram
            </a>
            <Link
              to="/tree"
              className="btn-ghost-gold btn-ghost-gold-hover inline-flex min-h-[52px] items-center justify-center px-6 py-3 text-xs md:text-sm"
            >
              Смотреть карту пути →
            </Link>
          </div>

          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.25em] text-warning">
            ⚠ Цикл перенастройки: 21 день
          </p>
        </div>

        {/* Right column */}
        <div className="relative flex items-center justify-center">
          <div className="text-primary" style={{ animation: "var(--animate-float)" }}>
            <SacredSymbol className="size-56 md:size-80" />
          </div>
          <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(circle at center, hsl(45 90% 55% / 0.18), transparent 65%)" }} />
        </div>
      </div>

      <div aria-hidden className="pointer-events-none absolute -left-20 top-20 size-72 rounded-full" style={{ background: "radial-gradient(circle, hsl(45 90% 55% / 0.12), transparent 70%)" }} />
      <div aria-hidden className="pointer-events-none absolute -right-20 top-40 size-72 rounded-full" style={{ background: "radial-gradient(circle, hsl(185 80% 45% / 0.10), transparent 70%)" }} />
    </section>
  );
}

function HowItWorks() {
  const cards = [
    {
      n: "01",
      t: "Точка входа",
      d: "Определяешь, что происходит сейчас: внутренний шум, истощение, внешнее давление, потеря вектора, размытые границы, страх или провал ресурса.",
    },
    {
      n: "02",
      t: "Подбор инструмента",
      d: "Система показывает подходящие треки и модули. Один и тот же протокол может работать сразу в нескольких пользовательских блоках — по состоянию, а не по жёсткой формальной категории.",
    },
    {
      n: "03",
      t: "Пакет материалов",
      d: "Каждый протокол открывается в Telegram и включает не только аудио, но и визуал, и инструкцию — чтобы состояние не просто «заиграло», а реально собрало тебя точнее.",
    },
    {
      n: "04",
      t: "Перенастройка",
      d: "Ты не просто слушаешь трек, а проходишь цикл сборки: меньше шума, больше опоры, ясности, ритма и управляемости собственного состояния.",
    },
  ];
  return (
    <Section>
      <div id="how" />
      <SectionTitle
        kicker="Протокол входа"
        title="Как это работает"
        lead="Коротко: как устроен вход в систему и что происходит после перехода в Telegram."
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="oracle-card oracle-card-hover flex h-full flex-col p-6"
          >
            <div className="font-display text-4xl text-primary/80 text-glow-gold">{s.n}</div>
            <div className="sacred-line my-4 w-12" />
            <h3 className="font-display text-base uppercase text-foreground">{s.t}</h3>
            <p className="mt-3 font-mono text-xs leading-relaxed text-muted-foreground">{s.d}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function WhatInside() {
  const cards = [
    { t: "Аудио", d: "WAV + MP3 — полная версия протокола в двух форматах." },
    { t: "Визуал", d: "JPG / PNG — визуальный материал состояния: образ, графика или мандала, в зависимости от конкретного трека." },
    { t: "Инструкция", d: "DOC — архитектура смыслов, манифест намерения и точка входа в прослушивание." },
    { t: "Доступ в Telegram", d: "Покупка, открытие, выдача материалов и дальнейшая работа происходят внутри Telegram-приложения." },
  ];
  return (
    <Section>
      <SectionTitle
        kicker="Состав"
        title="Что входит в каждый протокол"
        lead="Внутри не один аудиофайл, а целый рабочий пакет."
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => (
          <motion.div
            key={c.t}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            className="oracle-card oracle-card-hover flex h-full flex-col p-6"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/70">
              ✦ {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="mt-3 font-display text-lg uppercase text-foreground text-glow-gold">{c.t}</h3>
            <p className="mt-3 font-mono text-xs leading-relaxed text-muted-foreground">{c.d}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function TrackExamples() {
  const cards = [
    {
      t: "Код деактивации",
      ann: "Очищает ментальный шум, навязчивые связи и чужое влияние.",
      state: "Когда в голове липкость, перегруз и ощущение чужого поля.",
    },
    {
      t: "Право на своё",
      ann: "Возвращает границы, ресурс и спокойное право не отдавать себя лишнему.",
      state: "Когда слишком долго живёшь в режиме спасателя, донора и вечного «ну ладно».",
    },
    {
      t: "Исток рода",
      ann: "Помогает снять внутреннюю тяжесть старых сценариев и вернуть себе опору.",
      state: "Когда внутри слишком много не твоего, а жить приходится на этом фундаменте.",
    },
    {
      t: "Победоносец",
      ann: "Собирает волю, подавляет страх и возвращает ощущение: решаешь снова ты.",
      state: "Когда тревога пытается сесть за руль, а двигаться всё равно нужно.",
    },
  ];
  return (
    <Section>
      <SectionTitle
        kicker="Примеры треков"
        title="Несколько входных точек"
        lead="Это не весь каталог, а несколько входных точек, по которым проще сразу понять, как устроена логика проекта."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {cards.map((c, i) => (
          <motion.div
            key={c.t}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.55 }}
            className="oracle-card oracle-card-hover flex h-full flex-col overflow-hidden"
          >
            <div
              className="relative flex h-40 items-center justify-center"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 30%, hsl(45 90% 55% / 0.22), transparent 60%), radial-gradient(ellipse at 70% 70%, hsl(185 80% 45% / 0.18), transparent 60%), hsl(240 10% 6%)",
              }}
            >
              <div className="text-primary" style={{ animation: "var(--animate-float)" }}>
                <SacredSymbol className="size-24" />
              </div>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/70">
                ✦ Трек · {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-2 font-display text-xl uppercase text-foreground text-glow-gold">{c.t}</h3>
              <p className="mt-3 font-mono text-xs leading-relaxed text-foreground/85">{c.ann}</p>
              <p className="mt-3 font-mono text-[11px] leading-relaxed text-muted-foreground">{c.state}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost-gold btn-ghost-gold-hover inline-flex min-h-[52px] items-center justify-center px-6 py-3 text-xs md:text-sm"
        >
          Смотреть все треки в Telegram →
        </a>
      </div>
    </Section>
  );
}

function GiftPromo() {
  return (
    <Section>
      <div className="oracle-card relative overflow-hidden p-8 md:p-12 box-glow-gold">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full"
          style={{ background: "radial-gradient(circle, hsl(45 90% 55% / 0.25), transparent 70%)" }}
        />
        <div className="relative grid items-center gap-8 md:grid-cols-[60%_40%]">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary/80">
              ✦ Бонус первого платного протокола
            </div>
            <h2 className="mt-3 font-display text-2xl uppercase text-primary text-glow-gold md:text-4xl">
              «Код личности» — бесплатно
            </h2>
            <div className="sacred-line my-5 w-24" />
            <p className="font-mono text-sm leading-relaxed text-foreground/90">
              После покупки первого платного протокола ты дополнительно получаешь бесплатный расчёт «Код личности» — психологический разбор по дате рождения: характер, сильные и слабые стороны, отношения, профессия, главная жизненная задача и рекомендации, как эффективнее жить.
            </p>
            <p className="mt-3 font-mono text-xs leading-relaxed text-muted-foreground">
              Бонус открывается автоматически внутри Telegram после первой оплаты. Ничего отдельно запрашивать не нужно.
            </p>

            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold btn-gold-hover mt-6 inline-flex min-h-[54px] items-center justify-center px-7 py-4 text-sm md:text-base"
              style={{ animation: "var(--animate-pulse-glow)" }}
            >
              Открыть в Telegram
            </a>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-primary/80">
              Первый платный протокол → «Код личности» открывается бесплатно
            </p>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <div className="text-primary" style={{ animation: "var(--animate-float)" }}>
              <SacredSymbol className="size-56" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function TreeTeaser() {
  const preview = TREE_NODES.slice(0, 6);
  return (
    <Section>
      <SectionTitle
        kicker="Карта пути"
        title="Древо трансформации"
        lead="21 узел. Один путь. Полная перекалибровка."
      />

      <div className="relative mx-auto mt-4 max-w-3xl">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2"
          style={{ background: "linear-gradient(to bottom, transparent, hsl(45 90% 55% / 0.6), transparent)" }}
        />
        <ul className="space-y-8">
          {preview.map((n, i) => {
            const left = i % 2 === 0;
            return (
              <li key={n.code} className="relative grid grid-cols-2 items-center gap-6">
                <span aria-hidden className="absolute left-1/2 size-2.5 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_14px_3px_hsl(45_90%_55%/0.6)]" />
                <div className={left ? "pr-6 text-right" : "col-start-2 pl-6 text-left"}>
                  <div className="font-mono text-[10px] tracking-[0.25em] text-primary/80">{n.code}</div>
                  <div className="mt-1 font-display text-sm uppercase text-foreground md:text-base">{n.title}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-12 text-center">
        <Link to="/tree" className="btn-ghost-gold btn-ghost-gold-hover inline-flex min-h-[52px] items-center justify-center px-6 py-3 text-xs md:text-sm">
          Все 21 узел → Telegram
        </Link>
      </div>
    </Section>
  );
}

function Modules() {
  const items = [
    {
      n: "01",
      t: "Протоколы",
      d: "Точечные инструменты под конкретный сбой в системе: шум, давление, истощение, страх, потеря вектора, провал ресурса, размытые границы, внутренний перегруз. Когда нужно не «что-нибудь послушать», а точно попасть в нужное состояние.",
      bullets: ["шум и перегруз", "потеря вектора", "страх и давление"],
      span: "md:col-span-2",
    },
    {
      n: "02",
      t: "Мантры-манифесты",
      d: "Слово как несущая частота внутренней опоры. Формат, где главное — не декоративный эффект, а сборка внутреннего закона.",
    },
    {
      n: "03",
      t: "Аудио-резонансы",
      d: "Звук, который собирает внимание, выравнивает ритм и помогает мягко войти в нужный режим без перегруза.",
    },
    {
      n: "04",
      t: "Индивидуальный протокол",
      d: "Точная настройка под личный запрос. Когда нужен не общий модуль, а трек, собранный под конкретную ситуацию и задачу.",
    },
    {
      n: "05",
      t: "Код личности",
      d: "Психологический разбор по дате рождения: характер, сильные и слабые стороны, отношения, профессия, главная жизненная задача и рекомендации.",
    },
  ];
  return (
    <Section>
      <div id="modules" />
      <SectionTitle
        kicker="Модули"
        title="Аптека состояний"
        lead="Не один жанр, а несколько способов входа в настройку."
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {items.map((it) => (
          <motion.div
            key={it.n}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`oracle-card oracle-card-hover flex h-full flex-col p-6 md:p-8 ${it.span ?? ""}`}
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/70">
              ✦ Модуль · {it.n}
            </div>
            <h3 className="mt-3 font-display text-xl uppercase text-foreground text-glow-gold md:text-2xl">
              {it.t}
            </h3>
            <p className="mt-3 font-mono text-sm leading-relaxed text-foreground/85">{it.d}</p>
            {it.bullets && (
              <ul className="mt-4 grid gap-2 font-mono text-xs text-muted-foreground sm:grid-cols-3">
                {it.bullets.map((b) => (
                  <li key={b} className="rounded-md border border-primary/20 bg-primary/5 px-3 py-2">
                    · {b}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section>
      <div id="faq" />
      <SectionTitle kicker="Терминал" title="FAQ" lead="Коротко и по сути — чтобы сразу было понятно, как это работает." />
      <div className="mx-auto max-w-3xl space-y-3">
        {FAQ_ITEMS.map((it, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="oracle-card overflow-hidden">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-label={`Вопрос ${i + 1}: ${it.q}`}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-primary/5"
              >
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                  &gt; вопрос_{String(i + 1).padStart(2, "0")} · {it.q}
                </span>
                <span className={`font-display text-primary transition-transform ${isOpen ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 font-mono text-[13px] leading-relaxed text-foreground/85">
                  {it.a}
                </div>
                <div className="sacred-line" />
              </motion.div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function FinalCTA() {
  return (
    <Section>
      <div className="oracle-card relative overflow-hidden p-10 text-center md:p-16 box-glow-gold">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-30" style={{ background: "radial-gradient(ellipse at center, hsl(45 90% 55% / 0.25), transparent 70%)" }} />
        <div className="relative">
          <div className="font-mono text-[11px] uppercase tracking-[0.35em] text-primary/80">
            ✦ Точка входа
          </div>
          <h2 className="mt-3 font-display text-2xl uppercase text-primary text-glow-gold md:text-4xl">
            Открой проект в Telegram
          </h2>
          <p className="mx-auto mt-5 max-w-2xl font-mono text-sm leading-relaxed text-foreground/85">
            Если тебе откликается сама идея — не оставайся на уровне просмотра. Внутри Telegram находится вся система: карта пути, дерево, модули, диагностика, протоколы и бонус первого платного входа.
          </p>
          <p className="mx-auto mt-4 max-w-xl font-mono text-xs leading-relaxed text-muted-foreground">
            Открой приложение. Посмотри, где сейчас твоя точка сбоя. Забери нужный инструмент.
          </p>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold btn-gold-hover mt-8 inline-flex min-h-[56px] w-full max-w-md items-center justify-center px-8 py-4 text-sm md:text-base"
            style={{ animation: "var(--animate-pulse-glow)" }}
          >
            Открыть в Telegram
          </a>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-primary/80">
            @dna_sound_bot
          </p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-warning">
            ⚠ Цикл перенастройки: 21 день
          </p>
        </div>
      </div>
    </Section>
  );
}

function Landing() {
  return (
    <div className="min-h-screen pb-24 md:pb-0">
      <SiteHeader />
      <main>
        <Hero />
        <HowItWorks />
        <WhatInside />
        <TrackExamples />
        <GiftPromo />
        <TreeTeaser />
        <Modules />
        <FAQ />
        <FinalCTA />
      </main>
      <SiteFooter />
      <StickyMobileCTA />
    </div>
  );
}
