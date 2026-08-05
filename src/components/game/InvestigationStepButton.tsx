import type { CSSProperties } from "react";

/**
 * Botão HTML de avanço interno da investigação (revelar etapa, ver exemplos).
 * Nunca ocupa a área de navegação inferior.
 */
export function InvestigationStepButton({
  children,
  onClick,
  left,
  top,
  right,
  width = 300,
  ariaLabel,
  style,
}: {
  children: React.ReactNode;
  onClick: () => void;
  left?: number;
  top?: number;
  right?: number;
  width?: number;
  ariaLabel?: string;
  style?: CSSProperties;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="font-display absolute inline-flex min-h-[58px] cursor-pointer items-center justify-center rounded-[22px] border-4 border-[#A995E8] bg-[#F6F3FF] px-6 text-[22px] leading-tight font-extrabold text-[#24566B] shadow-[0_4px_0_rgba(36,86,107,0.14)] transition-all duration-200 outline-none focus-visible:ring-4 focus-visible:ring-[#FFD76A] motion-safe:hover:-translate-y-[2px] hover:bg-[#F1ECFF]"
      style={{ left, top, right, width: Math.min(Math.max(width, 280), 330), ...style }}
    >
      {children}
    </button>
  );
}
