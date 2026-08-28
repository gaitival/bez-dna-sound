import { motion } from "framer-motion";
import { useCanonicalTransformationTracks, type CanonicalTrack } from "@/data/tree";

export function TreeAxis({
  compact = false,
  tracks: customTracks,
}: {
  compact?: boolean;
  tracks?: CanonicalTrack[];
}) {
  const tracks = customTracks ?? useCanonicalTransformationTracks();

  return (
    <div className="relative mx-auto w-full max-w-5xl px-4 py-8 md:py-12">
      {/* Desktop central vertical axis */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 md:block"
        style={{
          background:
            "linear-gradient(to bottom, transparent, hsl(45 90% 55% / 0.7) 4%, hsl(45 90% 55% / 0.7) 96%, transparent)",
          boxShadow: "0 0 18px hsl(45 90% 55% / 0.4)",
        }}
      />

      {/* Mobile left vertical axis */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-4 block w-px -translate-x-1/2 md:hidden"
        style={{
          background:
            "linear-gradient(to bottom, transparent, hsl(45 90% 55% / 0.7) 4%, hsl(45 90% 55% / 0.7) 96%, transparent)",
          boxShadow: "0 0 14px hsl(45 90% 55% / 0.4)",
        }}
      />

      <ol className="relative space-y-8 md:space-y-16">
        {tracks.map((n, i) => {
          const left = i % 2 === 0;
          return (
            <motion.li
              key={n.id || n.code}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.03 * (i % 6) }}
              className="transformation-tree-node relative flex items-start md:grid md:grid-cols-2 md:items-center md:gap-10"
            >
              {/* Mobile node dot */}
              <span
                aria-hidden
                className="absolute left-4 top-2 -translate-x-1/2 md:hidden"
              >
                <span className="block size-2.5 rounded-full bg-primary shadow-[0_0_14px_3px_hsl(45_90%_55%/0.6)]" />
              </span>

              {/* Desktop central node dot */}
              <span
                aria-hidden
                className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block"
              >
                <span className="block size-3 rounded-full bg-primary shadow-[0_0_18px_4px_hsl(45_90%_55%/0.6)]" />
              </span>

              {/* Node Card / Info */}
              <div
                className={`w-full min-w-0 pl-10 md:pl-0 ${
                  left
                    ? "md:pr-12 md:text-right"
                    : "md:col-start-2 md:pl-12 md:text-left"
                }`}
              >
                {n.seriesLabel && (
                  <div className="mb-1 font-mono text-[9px] uppercase tracking-[0.25em] text-primary/70 md:text-[10px]">
                    ✦ {n.seriesLabel}
                  </div>
                )}
                <div className="font-mono text-[10px] tracking-[0.25em] text-primary/80 md:text-[11px]">
                  {n.code}
                </div>
                <h3
                  className={`transformation-tree-node__title mt-1 font-display text-[15px] uppercase leading-tight text-foreground md:text-lg ${
                    compact ? "" : "text-glow-gold"
                  }`}
                >
                  {n.title}
                </h3>
                {n.subtitle && (
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-primary/90 md:text-[11px]">
                    — {n.subtitle}
                  </div>
                )}
                {!compact && (
                  <p className="transformation-tree-node__description mt-2 font-mono text-[11px] leading-relaxed text-muted-foreground md:text-xs">
                    {n.description || n.desc}
                  </p>
                )}
              </div>

              {/* Desktop Grid Spacer */}
              <div
                aria-hidden
                className={`hidden md:block ${left ? "col-start-2" : "col-start-1 row-start-1"}`}
              />
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
