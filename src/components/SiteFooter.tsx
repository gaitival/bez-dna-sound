import { TELEGRAM_URL } from "@/data/tree";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/40">
      <div className="sacred-line" />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-center">
        <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary/80">
          ✦ Система · Online
        </div>
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost-gold btn-ghost-gold-hover px-5 py-2 text-xs"
        >
          @dna_sound_bot
        </a>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          © {new Date().getFullYear()} — Лаборатория глубинной настройки
        </p>
      </div>
    </footer>
  );
}
