import type { CSSProperties } from "react";

type Props = {
  src: string;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  width?: number;
  style?: CSSProperties;
  className?: string;
  floating?: boolean;
  /** Escala aplicada apenas ao desenho interno (compensa margens do PNG). */
  visualScale?: number;
};

/**
 * Botão renderizado apenas com o PNG fornecido: sem caixa HTML por trás,
 * apenas hover/press discretos e foco visível para teclado.
 */
export function AssetButton({
  src,
  label,
  onClick,
  disabled = false,
  width = 176,
  style,
  className = "",
  floating = false,
  visualScale = 1,
}: Props) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={`group absolute cursor-pointer border-0 bg-transparent p-0 outline-none transition-transform duration-200 ease-out focus-visible:ring-4 focus-visible:ring-[#FFD76A] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-45 motion-safe:hover:scale-[1.04] motion-safe:active:scale-[0.97] disabled:hover:scale-100 rounded-[26px] min-h-[56px] min-w-[56px] ${
        floating ? "motion-safe:animate-[wv-float_2.6s_ease-in-out_infinite]" : ""
      } ${className}`}
      style={{ width, ...style }}
    >
      <img
        src={src}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="pointer-events-none block w-full select-none transition-[filter] duration-200 group-hover:brightness-[1.06] group-disabled:brightness-100 group-disabled:saturate-[0.65]"
        style={visualScale === 1 ? undefined : { transform: `scale(${visualScale})` }}
      />
    </button>
  );
}

