import type { ReactNode } from "react";
import { AssetButton } from "./AssetButton";
import { BTN } from "@/game/assets";
import { useGame } from "@/game/state";

type Props = {
  background: string;
  children: ReactNode;
  showBack?: boolean;
  showNext?: boolean;
  nextEnabled?: boolean;
  nextLabel?: string;
};

/** Métricas centralizadas dos botões globais de navegação. */
const NAV_BUTTON_SIZE = {
  back: 196,
  next: 176,
} as const;

const NAV_BUTTON_POSITION = {
  side: 20,
  bottom: 20,
} as const;

/** Cenário + barra de navegação inferior, comum a todas as telas. */
export function ScreenFrame({
  background,
  children,
  showBack = true,
  showNext = true,
  nextEnabled = true,
  nextLabel = "Avançar para a próxima etapa",
}: Props) {
  const { back, next, screen } = useGame();

  return (
    <div className="absolute inset-0 motion-safe:animate-[wv-fade_500ms_ease-out]">
      <img
        src={background}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="absolute inset-0 h-full w-full select-none object-cover"
      />
      {children}
      {showBack && screen > 1 && (
        <AssetButton
          src={BTN.back}
          width={NAV_BUTTON_SIZE.back}
          visualScale={1.1}
          label="Voltar para a tela anterior"
          onClick={back}
          style={{ left: NAV_BUTTON_POSITION.side, bottom: NAV_BUTTON_POSITION.bottom }}
        />
      )}

      {showNext && nextEnabled && (
        <AssetButton
          src={BTN.next}
          width={NAV_BUTTON_SIZE.next}
          label={nextLabel}
          onClick={next}
          style={{ right: NAV_BUTTON_POSITION.side, bottom: NAV_BUTTON_POSITION.bottom }}
        />
      )}
    </div>
  );
}
