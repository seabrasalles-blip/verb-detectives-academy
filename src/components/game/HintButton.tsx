import { useState } from "react";
import { AssetButton } from "./AssetButton";
import { BTN } from "@/game/assets";

/**
 * Dica: nunca entrega a resposta na primeira tentativa. Depois de duas
 * tentativas incorretas, a dica fica um pouco mais específica.
 * Quando posicionada por `top`, o texto abre para baixo (nunca fora do canvas).
 */
export function HintButton({
  hint,
  strongHint,
  attempts,
  left,
  right,
  top,
  bottom,
  width,
  compact = false,
}: {
  hint: string;
  strongHint?: string;
  attempts: number;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  width?: number;
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const text = attempts >= 2 && strongHint ? strongHint : hint;
  const usesTop = top !== undefined;
  const finalBottom = usesTop ? undefined : (bottom ?? 24);
  const buttonWidth = width ?? (compact ? 132 : 158);
  const anchorRight = right !== undefined;

  return (
    <div
      className="absolute"
      style={{
        ...(left !== undefined ? { left } : {}),
        ...(anchorRight ? { right } : {}),
        ...(usesTop ? { top } : { bottom: finalBottom }),
        width: buttonWidth,
      }}
    >
      <AssetButton
        src={BTN.hint}
        width={buttonWidth}
        label={open ? "Fechar a dica" : "Ver uma dica"}
        style={usesTop ? { left: 0, top: 0 } : { left: 0, bottom: 0 }}
        onClick={() => setOpen((v) => !v)}
      />
      {open && (
        <div
          role="status"
          aria-live="polite"
          className={`absolute w-[320px] rounded-[20px] border-4 border-[#FFD76A] bg-[#FFFDF6] px-5 py-4 text-[21px] leading-snug font-semibold text-[#183B4A] shadow-[0_6px_18px_rgba(24,59,74,0.16)] motion-safe:animate-[wv-rise_260ms_ease-out] ${
            usesTop ? "top-[74px]" : "bottom-[74px]"
          } ${anchorRight ? "right-0" : "left-0"}`}
        >
          {text}
        </div>
      )}
    </div>
  );
}
