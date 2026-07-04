import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { SacredSymbol } from "@/components/SacredSymbol";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

import { TREE_NODES, TELEGRAM_URL } from "@/data/tree";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Без-Дна — Лаборатория глубинной настройки" },
      {
        name: "description",
        content:
          "Telegram-проект треков и аудио-инструментов для состояний: убрать шум, вернуть энергию, выйти из страха, усилить магнетизм и снова собрать себя. Первый вход — бесплатно.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Без-Дна — Лаборатория глубинной настройки" },
      {
        property: "og:description",
        content:
          "Треки и аудио-инструменты под конкретное состояние. Первый вход и первый протокол — бесплатно. Внутри Telegram.",
      },
      { property: "og:url", content: "https://bez-dna-sound.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Без-Дна — Лаборатория глубинной настройки" },
      {
        name: "twitter:description",
        content:
          "Треки и аудио-инструменты под конкретное состояние. Первый вход — бесплатно.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://bez-dna-sound.lovable.app/" },
      { rel: "alternate", hrefLang: "ru", href: "https://bez-dna-sound.lovable.app/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://bez-dna-sound.lovable.app/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Проект Без-Дна",
          alternateName: "Без-Дна — Лаборатория глубинной настройки",
          description:
            "Telegram-проект треков и аудио-инструментов под конкретные состояния.",
          url: "https://bez-dna-sound.lovable.app/",
          logo: "https://bez-dna-sound.lovable.app/favicon.ico",
          sameAs: [TELEGRAM_URL],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Без-Дна — Лаборатория глубинной настройки",
          url: "https://bez-dna-sound.lovable.app/",
          inLanguage: "ru-RU",
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
    q: "Что это такое",
    a: "Это Telegram-проект треков и сопутствующих материалов для состояний, когда нужно убрать внутренний шум, вернуть фокус, восстановить ресурс, границы и внутреннюю опору.",
  },
  {
    q: "Чем это отличается от обычной музыки",
    a: "Обычную музыку чаще включают под настроение. Здесь треки собраны под конкретные состояния и сопровождаются визуалом и инструкцией, чтобы эффект был не только атмосферным, но и прикладным.",
  },
  {
    q: "Что можно получить сразу после входа",
    a: "После перехода в Telegram открывается бесплатный первый шаг: можно посмотреть систему и протестировать стартовый протокол без обязательной покупки.",
  },
  {
    q: "Нужны ли наушники",
    a: "Желательно — так звук воспринимается точнее и внимание меньше рассеивается. Но начать можно и без них.",
  },
  {
    q: "Это долгая и сложная история",
    a: "Нет. Первый вход и первый тест занимают немного времени. Дальше можно идти глубже только если сама система действительно откликается.",
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

function SectionTitle({
  kicker,
  title,
  sublabel,
  lead,
}: {
  kicker?: string;
  title: string;
  sublabel?: string;
  lead?: string;
}) {
  return (
    <div className="mb-10 text-center">
      {kicker && (
        <div className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary/80">
          {kicker}
        </div>
      )}
      <h2 className="mt-3 font-display text-2xl uppercase text-primary text-glow-gold md:text-4xl">
        {title}
      </h2>
      {sublabel && (
        <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          {sublabel}
        </div>
      )}
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
    <section className="relative overflow-hidden px-4 pb-14 pt-8 md:pb-20 md:pt-16">
      <div className="mx-auto max-w-6xl">
        {/* Top row: title + symbol */}
        <div className="grid items-start gap-6 md:grid-cols-[60%_40%]">
          <div className="text-center md:text-left">
            <h1 className="font-display uppercase text-primary text-glow-gold"
                style={{ fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.005em" }}>
              Лаборатория<br />глубинной настройки
            </h1>

            <p className="mt-5 w-full font-mono text-sm leading-relaxed text-foreground/85 md:text-[15px]">
              <span className="hidden md:inline">
                Telegram-проект треков и аудио-инструментов для состояний, когда нужно убрать внутренний шум, вернуть энергию, выйти из страха, усилить магнетизм, почувствовать опору и снова собрать себя.
              </span>
              <span className="md:hidden">
                Треки и инструменты для состояний, когда нужно убрать шум, вернуть энергию, выйти из страха и снова собрать себя.
              </span>
            </p>

            <div className="sacred-line mx-auto mt-6 w-32 md:mx-0" />
          </div>

          {/* Right column — symbol */}
          <div className="relative flex items-start justify-center md:-ml-8 md:-mt-6">
            <div className="text-primary" style={{ animation: "var(--animate-float)" }}>
              <SacredSymbol className="size-44 md:size-[300px]" />
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(circle at center, hsl(45 90% 55% / 0.16), transparent 62%)" }}
            />
          </div>
        </div>

        {/* Bottom row: full-width text + CTA */}
        <div className="mt-8 md:mt-10">
          <div className="w-full text-left">
            <p className="hidden text-[15px] leading-relaxed text-foreground/90 md:block">
              Здесь не нужно долго гадать, что с тобой происходит. Внутри системы можно быстро выбрать текущее состояние и получить точный инструмент под свой запрос.
            </p>
            <p className="hidden mt-3 text-[15px] leading-relaxed text-foreground/90 md:block">
              Это не просто аудио для фона, а рабочий пакет: трек, визуал и инструкция. Под запросы, с которыми люди приходят чаще всего: страх, усталость, потеря фокуса, размытые границы, дефицит ресурса, магнетизм, удача и возврат к своей опоре.
            </p>
            <p className="text-[14px] leading-relaxed text-foreground/90 md:hidden">
              Внутри можно быстро выбрать текущее состояние и получить готовый пакет: трек, визуал и инструкцию. Всё происходит в Telegram — без лишней путаницы и долгих поисков.
            </p>
          </div>

          <div className="mt-10 flex flex-col items-center text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary">
              ✦ Первый вход и первый протокол — бесплатно
            </p>
            <p className="mt-2 font-mono text-[12px] leading-relaxed text-muted-foreground">
              Без обязательной покупки. Зайти, посмотреть и протестировать систему можно сразу.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold btn-gold-hover inline-flex h-[52px] items-center justify-center px-6 text-xs md:text-sm"
                style={{ animation: "var(--animate-pulse-glow)" }}
              >
                Открыть приложение в Telegram
              </a>
              <a
                href="#tree"
                className="btn-ghost-gold btn-ghost-gold-hover inline-flex h-[52px] items-center justify-center px-6 text-xs md:text-sm"
              >
                Посмотреть карту состояний ↓
              </a>
            </div>

            <p className="mt-5 font-mono text-[11px] leading-relaxed text-muted-foreground">
              Внутри: карта состояний, треки, инструкции, визуалы и бесплатный первый шаг.
            </p>
          </div>
        </div>

      </div>

      <div aria-hidden className="pointer-events-none absolute -left-20 top-20 size-72 rounded-full" style={{ background: "radial-gradient(circle, hsl(45 90% 55% / 0.12), transparent 70%)" }} />
      <div aria-hidden className="pointer-events-none absolute -right-20 top-40 size-72 rounded-full" style={{ background: "radial-gradient(circle, hsl(185 80% 45% / 0.10), transparent 70%)" }} />
    </section>
  );
}

function ProblemBlock() {
  return (
    <Section>
      <SectionTitle
        kicker="Зачем"
        title="Когда обычные способы уже не работают"
      />
      <div className="mx-auto w-full space-y-5 font-mono text-[14px] leading-relaxed text-foreground/85 md:text-[15px]">
        <p>
          Иногда психика не «сломалась» — она просто перегружена. Слишком много чужого давления, фонового шума, тревоги, накопленной усталости и внутренних противоречий.
        </p>
        <p>
          В таком состоянии музыка для фона, случайные практики и бесконечный контент редко помогают. Нужен не шум поверх шума, а точный вход в нужное состояние: убрать внутренний хаос, вернуть фокус, восстановить границы, собрать внимание и снова почувствовать, что управление внутри тебя.
        </p>
        <p className="text-foreground/95">
          <span className="text-primary">«Без-Дна»</span> — это система треков, визуалов и инструкций, собранных под конкретные внутренние состояния: когда нужно вернуть ясность, ресурс, границы, фокус или внутреннюю опору.
        </p>
      </div>
    </Section>
  );
}

function HowItWorks() {
  const cards = [
    {
      n: "01",
      t: "Точка входа",
      d: "Выбирается то состояние, которое требует фиксации прямо сейчас: тревога, перегруз, страх, потеря фокуса, усталость, размытые границы или дефицит ресурса.",
    },
    {
      n: "02",
      t: "Подбор трека",
      d: "Система показывает трек или формат, который ближе всего к текущему состоянию. Не по жанру, а по задаче.",
    },
    {
      n: "03",
      t: "Пакет материалов",
      d: "Каждый протокол включает не только аудио, но и визуал с инструкцией — чтобы состояние не просто «зазвучало», а зафиксировалось точнее.",
    },
    {
      n: "04",
      t: "Быстрый эффект",
      d: "Первый сеанс занимает немного времени и помогает почувствовать сдвиг: меньше шума, больше собранности, ясности и внутренней управляемости.",
    },
  ];
  return (
    <Section>
      <div id="how" />
      <SectionTitle
        kicker="Протокол входа"
        title="Как это работает"
        lead="Простой путь без долгого вхождения в теорию."
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
    { t: "Аудио", d: "WAV и MP3 — полная версия трека в двух форматах." },
    { t: "Визуал", d: "Образ, графика или мандала состояния — в зависимости от конкретного трека." },
    { t: "Инструкция", d: "Короткая инструкция: как включать, на что обратить внимание и как работать с треком точнее." },
    { t: "Доступ в Telegram", d: "Все материалы, навигация и дальнейшая работа открываются внутри Telegram-приложения — в одном понятном месте." },
  ];
  return (
    <Section>
      <SectionTitle
        kicker="Состав"
        title="Что входит в каждый протокол"
        lead="Не один файл, а полноценный рабочий набор."
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
      ann: "Очищает ментальный шум, навязчивые мысли и внешнее давление.",
      state: "Когда в голове хаос, перегруз и нужно быстро вернуть контроль над вниманием.",
    },
    {
      t: "Право на своё",
      ann: "Возвращает границы, ресурс и способность спокойно не отдавать себя лишнему.",
      state: "Когда затянулся режим спасателя, донора и вечного «ну ладно».",
    },
    {
      t: "Победоносец",
      ann: "Собирает волю, снижает давление страха и возвращает позицию автора своей жизни.",
      state: "Когда тревога пытается перехватить управление, а действовать всё равно нужно.",
    },
    {
      t: "Исток рода",
      ann: "Помогает снять внутреннюю тяжесть старых сценариев и вернуть опору под ногами.",
      state: "Когда внутри слишком много не твоего, а жить приходится именно на этом фундаменте.",
    },
  ];
  return (
    <Section>
      <div id="examples" />
      <SectionTitle
        kicker="Примеры треков"
        title="Примеры треков"
        lead="Несколько состояний, с которых чаще всего начинают вход в систему. Это не весь каталог, а несколько типичных точек входа — чтобы сразу понять, как устроена логика проекта."
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
          className="btn-gold btn-gold-hover inline-flex min-h-[54px] items-center justify-center px-7 py-4 text-sm md:text-base"
          style={{ animation: "var(--animate-pulse-glow)" }}
        >
          Открыть приложение в Telegram
        </a>
      </div>
    </Section>
  );
}

function TreeTeaser() {
  const preview = TREE_NODES.slice(0, 6);
  return (
    <Section>
      <div id="tree" />
      <SectionTitle
        kicker="Навигация"
        title="Карта состояний"
        sublabel="Древо трансформации внутри Telegram"
        lead="Внутри проекта состояния и треки собраны не в хаос, а в понятную карту входов."
      />

      <div className="relative mx-auto mt-4 max-w-3xl">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 hidden md:block"
          style={{ background: "linear-gradient(to bottom, transparent, hsl(45 90% 55% / 0.6), transparent)" }}
        />
        <ul className="space-y-5 md:space-y-8">
          {preview.map((n, i) => {
            const left = i % 2 === 0;
            return (
              <li key={n.code} className="relative md:grid md:grid-cols-2 md:items-start md:gap-6">
                <span aria-hidden className="hidden md:block absolute left-1/2 top-2 size-2.5 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_14px_3px_hsl(45_90%_55%/0.6)]" />
                <div className={`oracle-card p-4 md:border-0 md:bg-transparent md:p-0 md:shadow-none ${left ? "md:pr-6 md:text-right" : "md:col-start-2 md:pl-6 md:text-left"}`}>
                  <div className="font-mono text-[10px] tracking-[0.25em] text-primary/80">{n.code}</div>
                  <div className="mt-1 font-display text-sm uppercase text-foreground md:text-base">{n.title}</div>
                  <div className="mt-1 font-mono text-[11px] leading-relaxed text-muted-foreground">{n.desc}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-12 text-center">
        <Link to="/tree" className="btn-ghost-gold btn-ghost-gold-hover inline-flex min-h-[52px] items-center justify-center px-6 py-3 text-xs md:text-sm">
          Вся карта в Telegram →
        </Link>
      </div>
    </Section>
  );
}

function Modules() {
  const base = [
    {
      label: "Формат · 01",
      t: "Протоколы",
      d: "Точечные треки под конкретный сбой: шум, страх, перегруз, размытые границы, потеря вектора и дефицит энергии.",
    },
    {
      label: "Формат · 02",
      t: "Аудио-резонансы",
      d: "Инструменты для выравнивания внимания, ритма и внутреннего состояния без перегруза.",
    },
    {
      label: "Формат · 03",
      t: "Манифесты",
      d: "Треки, где слово работает как внутренняя опора и помогает зафиксировать позицию, границы и настрой.",
    },
  ];
  const personal = [
    {
      label: "Персонально · 01",
      t: "Индивидуальный протокол",
      d: "Точная настройка под личный запрос, когда нужен не общий модуль, а персонально собранный трек.",
    },
    {
      label: "Персонально · 02",
      t: "Код личности",
      d: "Экспресс-разбор по дате рождения: сильные стороны, внутренние дефициты, особенности характера и векторы развития.",
    },
  ];
  return (
    <Section>
      <div id="modules" />
      <SectionTitle
        kicker="Модули"
        title="Аптека состояний"
        lead="Каталог инструментов, разделённый по формату и типу задачи."
      />

      <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-primary/80">
        ✦ Базовые форматы
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {base.map((it) => (
          <motion.div
            key={it.t}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="oracle-card oracle-card-hover flex h-full flex-col p-6"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/70">
              ✦ {it.label}
            </div>
            <h3 className="mt-3 font-display text-lg uppercase text-foreground text-glow-gold md:text-xl">
              {it.t}
            </h3>
            <p className="mt-3 font-mono text-[13px] leading-relaxed text-foreground/85">{it.d}</p>
          </motion.div>
        ))}
      </div>

      <div className="mb-4 mt-10 font-mono text-[11px] uppercase tracking-[0.3em] text-primary/80">
        ✦ Персональные решения
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {personal.map((it) => (
          <motion.div
            key={it.t}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="oracle-card oracle-card-hover flex h-full flex-col p-6 md:p-8"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/70">
              ✦ {it.label}
            </div>
            <h3 className="mt-3 font-display text-xl uppercase text-foreground text-glow-gold md:text-2xl">
              {it.t}
            </h3>
            <p className="mt-3 font-mono text-sm leading-relaxed text-foreground/85">{it.d}</p>
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
      <SectionTitle kicker="Терминал" title="FAQ" lead="Коротко и по делу." />
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
            Запустить систему в Telegram
          </h2>
          <p className="mx-auto mt-5 max-w-2xl font-mono text-sm leading-relaxed text-foreground/85">
            Внутри Telegram уже открыты карта состояний, треки, инструкции и первый бесплатный шаг. Можно быстро зайти, посмотреть, протестировать систему и понять, откликается ли такой формат именно сейчас.
          </p>
          <p className="mx-auto mt-4 max-w-xl font-mono text-xs leading-relaxed text-muted-foreground">
            Вход бесплатный. Первый тест занимает немного времени и не требует обязательной покупки.
          </p>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold btn-gold-hover mt-8 inline-flex min-h-[56px] w-full max-w-md items-center justify-center px-8 py-4 text-sm md:text-base"
            style={{ animation: "var(--animate-pulse-glow)" }}
          >
            Открыть приложение в Telegram
          </a>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-primary/80">
            @dna_sound_bot
          </p>
        </div>
      </div>
    </Section>
  );
}

function Landing() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <Hero />
        <ProblemBlock />
        <HowItWorks />
        <WhatInside />
        <TrackExamples />
        <TreeTeaser />
        <Modules />
        <FAQ />
        <FinalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
