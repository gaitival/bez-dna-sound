import { useEffect, useRef } from "react";
import { initHero3D } from "@/main.js";

interface HeroSymbol3DProps {
  className?: string;
}

export function HeroSymbol3D({ className = "" }: HeroSymbol3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Инициализация 3D сцены через движок в main.js
    const cleanup = initHero3D(containerRef.current);

    return () => {
      if (typeof cleanup === "function") {
        cleanup();
      }
    };
  }, []);

  return (
    <div className={`hero-visual-column ${className}`}>
      <div
        ref={containerRef}
        className="hero-3d-stage"
        role="img"
        aria-label="Интерактивный 3D сакральный портал лаборатории «Без-Дна»"
      >
        {/* Фоновая аура свечения */}
        <div className="hero-ambient-glow" aria-hidden="true" />

        {/* Тонкое орбитальное кольцо с маркерами */}
        <div className="hero-outer-ring" aria-hidden="true" />

        {/* Фоллбэк изображение до инициализации WebGL */}
        <img
          src="/images/hero-symbol.jpg"
          alt="Символ лаборатории Без-Дна"
          className="hero-fallback-image"
          width={295}
          height={295}
          fetchPriority="high"
        />
      </div>
    </div>
  );
}
