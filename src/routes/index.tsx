import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { SacredSymbol } from "@/components/SacredSymbol";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AudioDemoPlayer } from "@/components/AudioDemoPlayer";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { TREE_NODES, TELEGRAM_URL } from "@/data/tree";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Аптека состояний — Лаборатория глубинной настройки" },
      {
        name: "description",
        content:
          "Аптека состояний: 21-дневный цикл резонансных протоколов для ясности, опоры и энергии. Подключайся к системе в Telegram.",
      },
      { property: "og:title", content: "Аптека состояний — Лаборатория глубинной настройки" },
      {
        property: "og:description",
        content: "21 узел. Один путь. Полная перекалибровка состояния.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Лаборатория глубинной настройки",
          description:
            "Система диагностических протоколов и аудио-резонансов для перекалибровки состояния.",
          url: "/",
          sameAs: [TELEGRAM_URL],
        }),
      },
    ],
  }),
  component: Landing,
});

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

function SectionTitle({ kicker, title }: { kicker?: string; title: string }) {
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
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-10 md:pt-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-primary"
          style={{ animation: "var(--animate-float)" }}
        >
          <SacredSymbol className="size-32 md:size-44" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-6 font-mono text-[11px] uppercase tracking-[0.4em] text-primary/80"
          style={{ animation: "var(--animate-breathe)" }}
        >
          ✦ Система · Online
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 font-display text-3xl uppercase leading-[1.1] text-primary text-glow-gold md:text-6xl"
        >
          Лаборатория<br />глубинной настройки
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-4 font-display text-base uppercase tracking-[0.3em] text-primary/70 md:text-xl"
        >
          Аптека состояний
        </motion.div>

        <div className="sacred-line mx-auto mt-8 w-56" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="oracle-card mt-8 w-full max-w-2xl px-6 py-6 text-left"
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary/80">
            ✦ Система · Online
          </div>
          <p className="mt-4 text-[15px] leading-relaxed text-foreground/90">
            Привет. Похоже, внутренняя прошивка снова столкнулась с внешней реальностью.
            Без паники — такое уже было у лучших версий человека.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-foreground/90">
            Здесь — резонансные протоколы, которые помогают системе собраться,
            а состоянию выйти из режима{" "}
            <span className="text-primary text-glow-gold">«держусь на характере»</span>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-8 flex w-full max-w-md flex-col gap-3"
        >
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold btn-gold-hover px-6 py-4 text-sm md:text-base"
            style={{ animation: "var(--animate-pulse-glow)" }}
          >
            Открыть в Telegram
          </a>
          <Link
            to="/tree"
            className="btn-ghost-gold btn-ghost-gold-hover px-6 py-3 text-xs md:text-sm"
          >
            Древо трансформации →
          </Link>
        </motion.div>

        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.25em] text-warning">
          ⚠ Цикл перенастройки: 21 день
        </p>
      </div>

      {/* corner glyphs */}
      <div aria-hidden className="pointer-events-none absolute -left-20 top-20 size-72 rounded-full" style={{ background: "radial-gradient(circle, hsl(45 90% 55% / 0.12), transparent 70%)" }} />
      <div aria-hidden className="pointer-events-none absolute -right-20 top-40 size-72 rounded-full" style={{ background: "radial-gradient(circle, hsl(185 80% 45% / 0.10), transparent 70%)" }} />
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Диагностика", d: "Быстро определяешь зону, где система даёт сбой прямо сейчас." },
    { n: "02", t: "Резонансный протокол", d: "Подбираешь точный инструмент под состояние — аудио, мантру или код." },
    { n: "03", t: "21-дневный цикл", d: "Проходишь полный круг перенастройки. Система собирается заново." },
  ];
  return (
    <Section className="" >
      <div id="how" />
      <SectionTitle kicker="Протокол входа" title="Как это работает" />
      <div className="grid gap-5 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="oracle-card oracle-card-hover p-6"
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

function TreeTeaser() {
  const preview = TREE_NODES.slice(0, 6);
  return (
    <Section>
      <SectionTitle kicker="Центральная метафора" title="Древо трансформации" />
      <p className="mx-auto max-w-2xl text-center font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
        21 узел. Один путь. Полная перекалибровка.
      </p>

      <div className="relative mx-auto mt-12 max-w-3xl">
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
        <Link to="/tree" className="btn-ghost-gold btn-ghost-gold-hover inline-block px-6 py-3 text-xs">
          Все 21 узел →
        </Link>
      </div>
    </Section>
  );
}

function Modules() {
  const items = [
    { t: "Протоколы", d: "Точечные инструменты под конкретный сбой в системе.", span: "md:col-span-2 md:row-span-2" },
    { t: "Мантры-манифесты", d: "Слово как несущая частота внутренней опоры." },
    { t: "Аудио-резонансы", d: "Звук, который собирает внимание и выравнивает ритм." },
    { t: "Индивидуальный протокол", d: "Точная настройка под личный запрос." },
    { t: "Код Личности", d: "Глубинный разбор твоей системы. Точка сборки." },
  ];
  return (
    <Section>
      <div id="modules" />
      <SectionTitle kicker="Модули" title="Аптека состояний" />
      <div className="grid auto-rows-[180px] grid-cols-1 gap-4 md:grid-cols-3">
        {items.map((it, i) => (
          <motion.div
            key={it.t}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            className={`oracle-card oracle-card-hover flex flex-col justify-between p-6 ${it.span ?? ""}`}
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/70">
              ✦ Модуль · {String(i + 1).padStart(2, "0")}
            </div>
            <div>
              <h3 className="font-display text-lg uppercase text-foreground text-glow-gold md:text-xl">
                {it.t}
              </h3>
              <p className="mt-2 font-mono text-xs leading-relaxed text-muted-foreground">{it.d}</p>
            </div>
          </motion.div>
        ))}
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
        <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary/80">
              ✦ Спецпредложение · Today only
            </div>
            <h2 className="mt-3 font-display text-2xl uppercase text-primary text-glow-gold md:text-4xl">
              Подарок при покупке 🎁
            </h2>
            <div className="sacred-line my-5 w-24" />
            <p className="font-mono text-sm leading-relaxed text-foreground/90">
              Купи любой звуковой трек сегодня и получи{" "}
              <span className="text-primary text-glow-gold">бесплатно</span> полный
              психологический анализ твоего характера по дате рождения в приложении
              «Код Личности».
            </p>
            <p className="mt-3 font-mono text-xs leading-relaxed text-muted-foreground">
              Обычная стоимость разбора —{" "}
              <span className="text-primary">200 ⭐ Telegram Stars</span>. Ссылка на
              бесплатный разбор придёт автоматически прямо в чат бота сразу после оплаты.
            </p>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold btn-gold-hover mt-6 inline-block px-6 py-3 text-sm"
              style={{ animation: "var(--animate-pulse-glow)" }}
            >
              Забрать подарок →
            </a>
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

function AudioDemo() {
  return (
    <Section>
      <SectionTitle kicker="Послушать" title="Аудио-превью" />
      <p className="mx-auto -mt-4 mb-8 max-w-2xl text-center font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
        15 секунд · надень наушники для максимального эффекта
      </p>
      <AudioDemoPlayer />
    </Section>
  );
}

function Testimonials() {
  const items = [
    { q: "Сначала думала — очередная аудио-практика. На третий день поняла, что внутри стало тише. Ритм собрался сам.", a: "А., 34" },
    { q: "Протокол ZERO сработал как разгрузка системы. Перестал держать то, что давно не моё.", a: "М., 41" },
    { q: "Не эзотерика, не мотивация — точная настройка. После 21 дня живу из другой точки.", a: "К., 29" },
  ];
  return (
    <Section>
      <SectionTitle kicker="Отзывы" title="Свидетельства" />
      <div className="grid gap-5 md:grid-cols-3">
        {items.map((it, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="oracle-card oracle-card-hover relative p-6"
          >
            <span className="absolute -top-3 left-5 font-display text-4xl text-primary text-glow-gold">
              ❝
            </span>
            <blockquote className="mt-3 font-mono text-xs leading-relaxed text-foreground/90">
              {it.q}
            </blockquote>
            <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-primary/80">
              — {it.a}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </Section>
  );
}

function FAQ() {
  const items = [
    { q: "что это вообще такое", a: "Система резонансных протоколов: аудио, мантры и точные инструкции под конкретный сбой в твоём состоянии. Работает в Telegram." },
    { q: "как работают звуковые частоты", a: "Они мягко синхронизируют полушария мозга и переводят психику в нужное состояние — сон, спокойствие, фокус. Без насилия над системой." },
    { q: "нужны ли наушники", a: "Да. Для максимального терапевтического эффекта рекомендуется использовать наушники — звук работает точнее, особенно бинауральные слои." },
    { q: "как я получу подарок «код личности»", a: "Бот за секунду распознаёт оплату трека и пришлёт персональную подарочную кнопку прямо в чат — анализ откроется автоматически." },
    { q: "почему 21 день", a: "За 21 день внутренняя система проходит полный цикл сборки: от диагностики до новой точки опоры. Это не марафон — это перекалибровка." },
    { q: "это эзотерика", a: "Нет. Никаких чакр и оракулов. Только точная работа со вниманием, ритмом и состоянием через звук." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section>
      <div id="faq" />
      <SectionTitle kicker="Терминал" title="FAQ" />
      <div className="mx-auto max-w-3xl space-y-3">
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="oracle-card overflow-hidden">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
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
                <div className="px-5 pb-5 font-mono text-xs leading-relaxed text-foreground/80">
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
            Подключись к системе
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-mono text-xs leading-relaxed text-muted-foreground">
            Открой бота в Telegram. Пройди быструю диагностику. Получи «Код личности» — бесплатно.
          </p>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold btn-gold-hover mt-8 inline-block px-8 py-4 text-sm md:text-base"
            style={{ animation: "var(--animate-pulse-glow)" }}
          >
            Открыть @dna_sound_bot
          </a>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.25em] text-warning">
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
        <AudioDemo />
        <GiftPromo />
        <TreeTeaser />
        <Modules />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <SiteFooter />
      <StickyMobileCTA />
    </div>
  );
}
