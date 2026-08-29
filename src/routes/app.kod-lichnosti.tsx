import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const BASE_URL = "https://bez-dna-sound.com";
const PAGE_URL = `${BASE_URL}/app/kod-lichnosti`;

export const Route = createFileRoute("/app/kod-lichnosti")({
  head: () => ({
    meta: [
      { title: "Код личности | Без-Дна" },
      { name: "description", content: "Разбор внутренней архитектуры по дате рождения в проекте Без-Дна." },
      { property: "og:title", content: "Код личности | Без-Дна" },
      { property: "og:description", content: "Разбор внутренней архитектуры по дате рождения." },
      { property: "og:url", content: PAGE_URL },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
  }),
  component: KodLichnostiPage,
});

function KodLichnostiPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 pb-20 pt-12 text-center md:pt-20">
        <Link
          to="/"
          className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-primary"
        >
          ← назад
        </Link>
        <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.35em] text-primary/80">
          ✦ Приложение
        </div>
        <h1 className="mt-3 font-display text-3xl uppercase text-primary text-glow-gold md:text-5xl">
          Код личности
        </h1>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Разбор внутренней архитектуры по дате рождения
        </p>

        <div className="oracle-card mx-auto mt-10 max-w-xl px-6 py-8 text-center box-glow-gold">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Экспресс-разбор по дате рождения: сильные стороны, внутренние дефициты, особенности характера и векторы развития.
          </p>
          <a
            href="https://valentin-birth-code.fly.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold btn-gold-hover mt-6 inline-flex h-[52px] items-center justify-center px-6 text-xs md:text-sm"
            style={{ animation: "var(--animate-pulse-glow)" }}
          >
            Открыть приложение
          </a>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
