import { TELEGRAM_URL } from "@/data/tree";

export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-primary/30 bg-background/85 px-3 py-3 backdrop-blur-md md:hidden">
      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-gold btn-gold-hover flex min-h-[52px] w-full items-center justify-center px-4 py-3 text-sm"
        style={{ animation: "var(--animate-pulse-glow)" }}
      >
        Открыть приложение в Telegram
      </a>
    </div>
  );
}
