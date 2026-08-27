import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const BASE_URL = "https://bez-dna-sound.lovable.app";
const PAGE_URL = `${BASE_URL}/app/vizualizator`;

export const Route = createFileRoute("/app/vizualizator")({
  head: () => ({
    meta: [
      { title: "Визуализатор | Без-Дна" },
      { name: "description", content: "Интерактивный визуализатор состояний в проекте Без-Дна." },
      { property: "og:title", content: "Визуализатор | Без-Дна" },
      { property: "og:description", content: "Интерактивный визуализатор состояний." },
      { property: "og:url", content: PAGE_URL },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
  }),
  component: VizualizatorPage,
});

function VizualizatorPage() {
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
          Визуализатор
        </h1>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Интерактивная карта состояний
        </p>

        <div className="oracle-card mx-auto mt-10 max-w-xl px-6 py-8 text-left box-glow-gold">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Здесь скоро появится страница с визуализатором и ссылкой на приложение.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
