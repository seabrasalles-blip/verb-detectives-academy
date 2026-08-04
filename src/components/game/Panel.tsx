import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  tone?: "board" | "paper";
};

/**
 * Painel claro com borda azul-petróleo, usado sobre o quadro dos cenários.
 * Sem vidro, sem gradiente pesado, sombra bem leve.
 */
export function Panel({ children, style, className = "", tone = "board" }: Props) {
  const toneClass =
    tone === "board"
      ? "bg-[#FFFDF5]/95 border-[#24566B]"
      : "bg-[#F4FAFF]/95 border-[#52B7E8]";
  return (
    <div
      className={`absolute rounded-[22px] border-4 ${toneClass} shadow-[0_4px_0_rgba(36,86,107,0.10)] motion-safe:animate-[wv-rise_450ms_ease-out] ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
