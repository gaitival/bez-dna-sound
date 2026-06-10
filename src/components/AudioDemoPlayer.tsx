import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Track = {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  src: string;
};

const TRACKS: Track[] = [
  {
    id: "sleep",
    emoji: "🌌",
    title: "Глубокий сон",
    subtitle: "Дельта-волны · перезагрузка нервной системы",
    src: "https://cdn.pixabay.com/download/audio/2022/10/18/audio_31c4b1cc24.mp3?filename=ambient-piano-amp-strings-10711.mp3",
  },
  {
    id: "calm",
    emoji: "⚡",
    title: "Снятие тревоги",
    subtitle: "Альфа-резонанс · мягкое заземление",
    src: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8e9f0c0f4.mp3?filename=relaxing-145038.mp3",
  },
  {
    id: "focus",
    emoji: "🧘",
    title: "Фокус и медитация",
    subtitle: "Бета-настройка · ясность и присутствие",
    src: "https://cdn.pixabay.com/download/audio/2021/11/25/audio_91b32e02f9.mp3?filename=meditation-ambient-music-22174.mp3",
  },
];

export function AudioDemoPlayer() {
  const [active, setActive] = useState(TRACKS[0].id);
  const [playing, setPlaying] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const current = TRACKS.find((t) => t.id === active)!;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlaying(null);
    setProgress(0);
  }, [active]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing === active) {
      a.pause();
      setPlaying(null);
    } else {
      a.play().catch(() => {});
      setPlaying(active);
    }
  };

  return (
    <div className="oracle-card p-6 md:p-10">
      <div className="grid gap-3 md:grid-cols-3">
        {TRACKS.map((t) => {
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`oracle-card-hover rounded-lg border p-4 text-left transition ${
                isActive
                  ? "border-primary/70 bg-primary/10 shadow-[0_0_24px_-6px_hsl(45_90%_55%/0.6)]"
                  : "border-border/50 bg-card/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{t.emoji}</span>
                <div>
                  <div className="font-display text-sm uppercase text-foreground">
                    {t.title}
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    Демо · 15 сек
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <motion.div
        key={current.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-8 flex flex-col items-center gap-5 rounded-lg border border-primary/20 bg-background/60 p-6"
      >
        <div className="text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/80">
            ✦ Сейчас играет
          </div>
          <div className="mt-2 font-display text-lg uppercase text-primary text-glow-gold">
            {current.emoji} {current.title}
          </div>
          <div className="mt-1 font-mono text-[11px] text-muted-foreground">
            {current.subtitle}
          </div>
        </div>

        <button
          onClick={toggle}
          className="group flex size-16 items-center justify-center rounded-full border border-primary/60 bg-primary/10 transition hover:bg-primary/20"
          style={{ animation: playing === active ? "var(--animate-pulse-glow)" : undefined }}
          aria-label={playing === active ? "Пауза" : "Воспроизвести"}
        >
          {playing === active ? (
            <span className="flex gap-1">
              <span className="h-5 w-1.5 bg-primary" />
              <span className="h-5 w-1.5 bg-primary" />
            </span>
          ) : (
            <span className="ml-1 h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-primary" />
          )}
        </button>

        <div className="h-1 w-full overflow-hidden rounded-full bg-border/40">
          <div
            className="h-full bg-primary transition-[width] duration-200"
            style={{ width: `${progress}%`, boxShadow: "0 0 12px hsl(45 90% 55% / 0.7)" }}
          />
        </div>

        <audio
          ref={audioRef}
          src={current.src}
          preload="none"
          onTimeUpdate={(e) => {
            const a = e.currentTarget;
            if (a.duration) setProgress(Math.min(100, (a.currentTime / a.duration) * 100));
          }}
          onEnded={() => {
            setPlaying(null);
            setProgress(0);
          }}
        />
      </motion.div>
    </div>
  );
}
