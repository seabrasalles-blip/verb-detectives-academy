type ProgressMarkerProps = {
  current: number;
  total: number;
  /** Quando `centered` é true, `left` é o centro horizontal (translateX(-50%)). */
  left: number;
  top: number;
  variant?: "plain" | "card";
  label?: string;
  width?: number;
  centered?: boolean;
  className?: string;
};

export function ProgressMarker({
  current,
  total,
  left,
  top,
  variant = "plain",
  label,
  width,
  centered = false,
  className = "",
}: ProgressMarkerProps) {
  const text = label ?? (variant === "card" ? `Rodada ${current} de ${total}` : `${current} de ${total}`);
  const aria = `Rodada ${current} de ${total}`;

  const dots = (
    <span className="flex items-center gap-2" aria-hidden="true">
      {Array.from({ length: total }, (_, i) => {
        const doneRound = i < current - 1;
        const isCurrent = i === current - 1;
        if (variant !== "card") {
          return (
            <span
              key={i}
              className="h-3.5 w-3.5 rounded-full border-2 border-[#24566B]"
              style={{ background: doneRound ? "#58CDB5" : isCurrent ? "#FFD76A" : "transparent" }}
            />
          );
        }
        return (
          <span
            key={i}
            className="flex items-center justify-center rounded-full border-[3px] border-[#24566B] text-[10px] leading-none font-extrabold text-[#183B4A]"
            style={{
              width: isCurrent ? 19 : 16,
              height: isCurrent ? 19 : 16,
              background: doneRound ? "#58CDB5" : isCurrent ? "#FFD76A" : "#F4FAFF",
              boxShadow: isCurrent ? "0 0 0 3px rgba(255,215,106,0.45)" : undefined,
            }}
          >
            {doneRound ? "✓" : ""}
          </span>
        );
      })}
    </span>
  );

  const base: React.CSSProperties = {
    left,
    top,
    width,
    transform: centered ? "translateX(-50%)" : undefined,
  };

  if (variant === "card") {
    return (
      <div
        className={`pointer-events-none absolute flex items-center justify-center ${className}`}
        style={base}
      >
        <div
          role="status"
          aria-label={aria}
          aria-live="polite"
          aria-atomic="true"
          className="flex items-center gap-3 rounded-[20px] border-[3px] border-[#52B7E8] bg-[#FFFDF6] px-6 py-2.5 shadow-[0_4px_10px_rgba(36,86,107,0.18)]"
          style={{ minHeight: 56 }}
        >
          <span className="text-[20px] leading-none font-extrabold whitespace-nowrap text-[#24566B]">
            {text}
          </span>
          {dots}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`absolute flex items-center gap-3 ${className}`}
      style={base}
      role="status"
      aria-label={aria}
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="text-[20px] font-bold text-[#24566B]">{text}</span>
      {dots}
    </div>
  );
}
