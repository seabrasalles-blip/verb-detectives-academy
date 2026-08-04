import { useState } from "react";
import { AssetButton } from "./AssetButton";
import { BTN } from "@/game/assets";

/**
 * Dica: nunca entrega a resposta na primeira tentativa. Depois de duas
 * tentativas incorretas, a dica fica um pouco mais específica.
 */
export function HintButton({
  hint,
  strongHint,
  attempts,
  left,
  bottom = 24,
}: {
  hint: string;
  strongHint?: string;
  attempts: number;
  left: number;
  bottom?: number;
}) {
  const [open, setOpen] = useState(false);
  const text = attempts >= 2 && strongHint ? strongHint : hint;

  return (
    <div className="absolute" style={{ left, bottom }}>
      <AssetButton
        src={BTN.hint}
        width={158}
        label={open ? "Fechar a dica" : "Ver uma dica"}
        style={{ left: 0, bottom: 0 }}
        onClick={() => setOpen((v) => !v)}
      />
      {open && (
        <div
          role="status"
          aria-live="polite"
          className="absolute bottom-[74px] left-0 w-[330px] rounded-[20px] border-4 border-[#FFD76A] bg-[#FFFDF6] px-5 py-4 text-[21px] leading-snug font-semibold text-[#183B4A] shadow-[0_6px_18px_rgba(24,59,74,0.16)] motion-safe:animate-[wv-rise_260ms_ease-out]"
        >
          {text}
        </div>
      )}
    </div>
  );
}
