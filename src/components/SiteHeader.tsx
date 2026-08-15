import { Link } from "@tanstack/react-router";
import { useState } from "react";

type NavItem = { href: string; label: string; internal?: boolean };
const NAV: NavItem[] = [
  { href: "/#how", label: "Как это работает" },
  { href: "/#examples", label: "Примеры треков" },
  { href: "/tree", label: "Карта состояний", internal: true },
  { href: "/states", label: "Состояния", internal: true },
  { href: "/#modules", label: "Аптека" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 border-b border-border/60 backdrop-blur-md"
      style={{ background: "hsl(240 10% 4% / 0.7)" }}
    >
      <div className="mx-auto flex h-[60px] max-w-6xl items-center justify-between px-4 md:h-[76px]">
        <Link
          to="/"
          className="flex items-center gap-2 font-display text-[12px] uppercase tracking-[0.2em] text-primary text-glow-gold md:text-[13px]"
          onClick={() => setOpen(false)}
        >
          <span className="inline-block size-2 rounded-full bg-primary shadow-[0_0_10px_hsl(45_90%_55%)]" />
          Проект Без-Дна
        </Link>

        <nav className="hidden gap-7 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground md:flex">
          {NAV.map((it) =>
            it.internal ? (
              <Link key={it.href} to={it.href as "/tree"} className="hover:text-primary">
                {it.label}
              </Link>
            ) : (
              <a key={it.href} href={it.href} className="hover:text-primary">
                {it.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Меню"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-9 items-center justify-center rounded-md border border-border/60 text-primary md:hidden"
          >
            <span className="font-display text-base leading-none">{open ? "✕" : "≡"}</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 md:hidden" style={{ background: "hsl(240 10% 4% / 0.95)" }}>
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 font-mono text-[12px] uppercase tracking-[0.2em] text-muted-foreground">
            {NAV.map((it) =>
              it.internal ? (
                <Link
                  key={it.href}
                  to={it.href as "/tree"}
                  className="rounded px-2 py-3 hover:bg-primary/5 hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  {it.label}
                </Link>
              ) : (
                <a
                  key={it.href}
                  href={it.href}
                  className="rounded px-2 py-3 hover:bg-primary/5 hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  {it.label}
                </a>
              ),
            )}
            <a
              href="https://t.me/dna_sound_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded px-2 py-3 text-primary hover:bg-primary/5"
              onClick={() => setOpen(false)}
            >
              Открыть в Telegram
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
