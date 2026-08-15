import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { TreeAxis } from "@/components/TreeAxis";
import { TELEGRAM_URL } from "@/data/tree";

const BASE_URL = "https://bez-dna-sound.lovable.app";
const TREE_URL = `${BASE_URL}/tree`;
const OG_IMAGE = "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/82bcb4c3-5a9e-4cc4-97df-cb6c8c7bdba4/id-preview-98bbd9d3--fc8f40ba-b85b-4c91-ae90-7fa61df0c66d.lovable.app-1780920518014.png";

export const Route = createFileRoute("/tree")({
  head: () => ({
    meta: [
      { title: "Древо трансформации — 21 узел перекалибровки | Без-Дна" },
      {
        name: "description",
        content:
          "Древо трансформации: 21 узел резонансных протоколов. Один путь. Полная перекалибровка внутренней системы за 21 день.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Без-Дна — Лаборатория глубинной настройки" },
      { property: "og:locale", content: "ru_RU" },
      { property: "og:title", content: "Древо трансформации — 21 узел перекалибровки | Без-Дна" },
      {
        property: "og:description",
        content: "21 узел резонансных протоколов. Один путь. Полная перекалибровка внутренней системы за 21 день.",
      },
      { property: "og:url", content: TREE_URL },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Древо трансформации — 21 узел перекалибровки | Без-Дна" },
      {
        name: "twitter:description",
        content: "21 узел резонансных протоколов. Один путь. Полная перекалибровка внутренней системы за 21 день.",
      },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "canonical", href: TREE_URL },
      { rel: "alternate", hrefLang: "ru", href: TREE_URL },
      { rel: "alternate", hrefLang: "x-default", href: TREE_URL },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Древо трансформации — 21 узел перекалибровки",
          description: "21 узел резонансных протоколов. Один путь. Полная перекалибровка внутренней системы за 21 день.",
          url: TREE_URL,
          inLanguage: "ru-RU",
          isPartOf: {
            "@type": "WebSite",
            name: "Без-Дна — Лаборатория глубинной настройки",
            url: BASE_URL,
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Главная",
              item: BASE_URL,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Древо трансформации",
              item: TREE_URL,
            },
          ],
        }),
      },
    ],
  }),
  component: TreePage,
});

function TreePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="px-4 pb-20 pt-12 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <Link
            to="/"
            className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-primary"
          >
            ← назад
          </Link>
          <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.35em] text-primary/80">
            ✦ Карта пути
          </div>
          <h1 className="mt-3 font-display text-3xl uppercase text-primary text-glow-gold md:text-5xl">
            Древо трансформации
          </h1>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            21 узел. Один путь. Полная перекалибровка.
          </p>
          <div className="sacred-line mx-auto mt-8 w-56" />

          <div className="oracle-card mx-auto mt-10 max-w-xl px-6 py-5 text-left box-glow-gold">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
              ✦ Бонус первого протокола
            </div>
            <div className="mt-1 font-display text-sm uppercase text-foreground">
              «Код личности» — бесплатно
            </div>
          </div>
        </motion.div>

        <TreeAxis />

        <div className="mx-auto mt-16 max-w-md text-center">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold btn-gold-hover inline-block px-8 py-4 text-sm md:text-base"
            style={{ animation: "var(--animate-pulse-glow)" }}
          >
            Войти в цикл — Telegram
          </a>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-warning">
            ⚠ Цикл перенастройки: 21 день
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
