import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { TreeAxis } from "@/components/TreeAxis";
import { TELEGRAM_URL } from "@/data/tree";

export const Route = createFileRoute("/tree")({
  head: () => ({
    meta: [
      { title: "Древо трансформации — 21 узел перекалибровки" },
      {
        name: "description",
        content:
          "Древо трансформации: 21 узел резонансных протоколов. Один путь. Полная перекалибровка внутренней системы за 21 день.",
      },
      { property: "og:title", content: "Древо трансформации — 21 узел" },
      { property: "og:description", content: "Один путь. Полная перекалибровка." },
      { property: "og:url", content: "/tree" },
    ],
    links: [{ rel: "canonical", href: "/tree" }],
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
