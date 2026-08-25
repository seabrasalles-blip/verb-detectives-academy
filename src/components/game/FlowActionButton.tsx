import type { CSSProperties } from "react";

type Props = {
  children: string;
  onClick: () => void;
  ariaLabel: string;
  style?: CSSProperties;
  disabled?: boolean;
};

/**
 * Ação de avanço em HTML, com presença visual próxima do botão ilustrado "Next".
 * Usada quando a própria atividade substitui o Next (evita dois botões de "seguir").
 */
export function FlowActionButton({ children, onClick, ariaLabel, style, disabled }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="font-display absolute inline-flex min-h-[64px] min-w-[205px] cursor-pointer items-center justify-center rounded-full border-4 border-[#1F6D96] bg-[#F0644F] px-8 text-[24px] font-extrabold tracking-wide text-[#FFFDF6] shadow-[0_6px_0_rgba(31,109,150,0.35)] outline-none ring-inset ring-2 ring-[#FFD76A] focus-visible:ring-4 focus-visible:ring-[#FFD76A] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45 motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:-translate-y-[2px] motion-safe:active:translate-y-[1px]"
      style={style}
    >
      {children}
    </button>
  );
}
