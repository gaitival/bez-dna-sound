export function SacredSymbol({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  // Flower of life-inspired ritual glyph
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="ss-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(45 100% 70%)" stopOpacity="0.9" />
          <stop offset="60%" stopColor="hsl(45 90% 55%)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="hsl(45 90% 55%)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="90" stroke="hsl(45 90% 55% / 0.4)" />
      <circle cx="100" cy="100" r="74" stroke="hsl(45 90% 55% / 0.5)" />
      <circle cx="100" cy="100" r="38" fill="url(#ss-core)" stroke="hsl(45 90% 55% / 0.8)" />
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (Math.PI / 3) * i;
        const x = 100 + Math.cos(a) * 38;
        const y = 100 + Math.sin(a) * 38;
        return <circle key={i} cx={x} cy={y} r="38" stroke="hsl(45 90% 55% / 0.7)" />;
      })}
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (Math.PI / 3) * i + Math.PI / 6;
        const x1 = 100 + Math.cos(a) * 20;
        const y1 = 100 + Math.sin(a) * 20;
        const x2 = 100 + Math.cos(a) * 88;
        const y2 = 100 + Math.sin(a) * 88;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(45 90% 55% / 0.35)" />;
      })}
      <circle cx="100" cy="100" r="4" fill="hsl(45 100% 75%)" />
    </svg>
  );
}
