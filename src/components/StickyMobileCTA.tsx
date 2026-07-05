import { TELEGRAM_URL } from "@/data/tree";

export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[1000] px-4 pb-[14px] pt-2 md:hidden">
      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-gold btn-gold-hover flex h-[64px] w-full items-center justify-center rounded-[18px] px-4 text-[17px] uppercase"
        style={{ animation: "var(--animate-pulse-glow)", letterSpacing: "0.08em" }}
      >
        Открыть в Telegram ⚡
      </a>
    </div>
  );
}
