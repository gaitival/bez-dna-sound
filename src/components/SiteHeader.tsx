import { Link } from "@tanstack/react-router";
import { TELEGRAM_URL } from "@/data/tree";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 backdrop-blur-md" style={{ background: "hsl(240 10% 4% / 0.65)" }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-display text-[13px] uppercase tracking-[0.18em] text-primary text-glow-gold">
          <span className="inline-block size-2 rounded-full bg-primary shadow-[0_0_10px_hsl(45_90%_55%)]" />
          Лаборатория
        </Link>
        <nav className="hidden gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:flex">
          <a href="/#how" className="hover:text-primary">Как это работает</a>
          <Link to="/tree" className="hover:text-primary">Древо</Link>
          <a href="/#modules" className="hover:text-primary">Аптека</a>
          <a href="/#faq" className="hover:text-primary">FAQ</a>
        </nav>
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold btn-gold-hover px-3 py-1.5 text-[11px] md:px-4 md:py-2 md:text-xs"
        >
          В Telegram
        </a>
      </div>
    </header>
  );
}
