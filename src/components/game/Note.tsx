import type { CSSProperties, ReactNode } from "react";

type Kind = "clue" | "hypothesis" | "conclusion";

const KIND = {
  clue: { label: "Pista", border: "#52B7E8", bg: "#E4F4FF", color: "#1F6D96" },
  hypothesis: { label: "Nossa hipótese", border: "#A995E8", bg: "#F1ECFF", color: "#4B3B8F" },
  conclusion: { label: "Conclusão", border: "#58CDB5", bg: "#E8FBF5", color: "#1F7A67" },
} as const;

/** Ficha de investigação: separa visualmente pista, hipótese e conclusão. */
export function Note({
  kind,
  children,
  style,
  className = "",
}: {
  kind: Kind;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}) {
  const k = KIND[kind];
  return (
    <div
      className={`absolute rounded-[20px] border-4 px-6 pt-6 pb-4 shadow-[0_5px_0_rgba(36,86,107,0.12)] motion-safe:animate-[wv-rise_400ms_ease-out] ${className}`}
      style={{ borderColor: k.border, backgroundColor: k.bg, ...style }}
    >
      <span
        className="font-display absolute -top-4 left-5 rounded-full px-4 py-1 text-[15px] font-extrabold tracking-[0.12em] text-[#FFFDF6] uppercase"
        style={{ backgroundColor: k.border }}
      >
        {k.label}
      </span>
      <div className="text-[22px] leading-snug font-bold" style={{ color: k.color }}>
        {children}
      </div>
    </div>
  );
}
