import { motion } from "framer-motion";
import { TREE_NODES } from "@/data/tree";

export function TreeAxis({ compact = false }: { compact?: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-5xl px-4 py-12">
      {/* central vertical axis */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2"
        style={{
          background:
            "linear-gradient(to bottom, transparent, hsl(45 90% 55% / 0.7) 8%, hsl(45 90% 55% / 0.7) 92%, transparent)",
          boxShadow: "0 0 18px hsl(45 90% 55% / 0.4)",
        }}
      />
      <ol className="relative space-y-12 md:space-y-16">
        {TREE_NODES.map((n, i) => {
          const left = i % 2 === 0;
          return (
            <motion.li
              key={n.code}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.04 * (i % 6) }}
              className="relative grid grid-cols-2 items-center gap-4 md:gap-10"
            >
              {/* node dot */}
              <span
                aria-hidden
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <span className="block size-3 rounded-full bg-primary shadow-[0_0_18px_4px_hsl(45_90%_55%/0.6)]" />
              </span>

              <div className={left ? "pr-4 text-right md:pr-12" : "col-start-2 pl-4 text-left md:pl-12"}>
                <div className="font-mono text-[11px] tracking-[0.25em] text-primary/80">
                  {n.code}
                </div>
                <h3
                  className={`mt-1 font-display text-[15px] uppercase leading-tight text-foreground md:text-lg ${
                    compact ? "" : "text-glow-gold"
                  }`}
                >
                  {n.title}
                </h3>
                {!compact && (
                  <p className="mt-2 font-mono text-[11px] leading-relaxed text-muted-foreground md:text-xs">
                    {n.desc}
                  </p>
                )}
              </div>
              <div className={left ? "col-start-2" : "col-start-1 row-start-1"} />
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
