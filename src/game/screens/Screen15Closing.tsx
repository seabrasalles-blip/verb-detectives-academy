import { AssetButton } from "@/components/game/AssetButton";
import { CharacterLayer } from "@/components/game/CharacterLayer";
import { ScreenFrame } from "@/components/game/ScreenFrame";
import { BG, BTN } from "@/game/assets";
import { useGame } from "@/game/state";
import { useEffect } from "react";


export function Screen15Closing() {
  const { restart, finish } = useGame();

  // Marca a sessão como concluída: a tela final continua visível,
  // mas um recarregamento começa uma sessão nova.
  useEffect(() => {
    finish();
  }, [finish]);

  return (
    <ScreenFrame background={BG.final} showBack={false} showNext={false}>
      <CharacterLayer pose="celebrating" placement="finalCelebrating" />

      {/* Cabeçalho em faixa clara e opaca */}
      <div
        className="absolute flex flex-col items-center justify-center rounded-[26px] border-4 border-[#24566B] bg-[#FFFDF6] px-6 py-3 text-center shadow-[0_4px_0_rgba(36,86,107,0.12)] motion-safe:animate-[wv-rise_450ms_ease-out]"
        style={{ left: 64, top: 26, width: 736, height: 96 }}
      >
        <h2
          lang="en"
          className="font-display text-[48px] leading-none font-extrabold text-[#B93B2B]"
        >
          Case solved!
        </h2>
        <p className="mt-1 text-[26px] leading-none font-bold text-[#183B4A]">
          Você se tornou um Verb Detective!
        </p>
      </div>

      {/* Painel único de síntese */}
      <div
        className="absolute rounded-[28px] border-4 border-[#52B7E8] bg-[#FFFDF6] p-7 shadow-[0_4px_0_rgba(36,86,107,0.10)] motion-safe:animate-[wv-rise_550ms_ease-out]"
        style={{ left: 64, top: 142, width: 736, height: 356 }}
      >
        <div className="flex h-full flex-col gap-[22px]">

          <div>
            <p className="text-[19px] font-bold text-[#24566B]">Você descobriu os verbos</p>
            <div className="mt-1 flex items-center gap-10">
              <p className="text-[29px] font-extrabold text-[#183B4A]">
                <span lang="en" className="font-display text-[#FF786A]">
                  GO
                </span>{" "}
                = ir
              </p>
              <p className="text-[29px] font-extrabold text-[#183B4A]">
                <span lang="en" className="font-display text-[#FF786A]">
                  PLAY
                </span>{" "}
                = brincar ou jogar
              </p>
            </div>
          </div>

          <div>
            <p className="text-[19px] font-bold text-[#24566B]">Você descobriu o padrão</p>
            <div className="mt-1 space-y-1">
              <p lang="en" className="font-display text-[27px] leading-tight font-extrabold">
                <span className="text-[#463089]">I / You / We / They</span>
                <span className="px-2 text-[#24566B]">→</span>
                <span className="text-[#FF786A]">go / play</span>
              </p>
              <p lang="en" className="font-display text-[27px] leading-tight font-extrabold">
                <span className="text-[#463089]">He / She / It</span>
                <span className="px-2 text-[#24566B]">→</span>
                <span className="text-[#FF786A]">
                  go<span className="rounded bg-[#FFD76A] px-1 text-[#7A4E00]">es</span> / play
                  <span className="rounded bg-[#FFD76A] px-1 text-[#7A4E00]">s</span>
                </span>
              </p>
            </div>
          </div>

          <div className="border-t-2 border-[#CBE6F5] pt-3">
            <p className="text-[21px] leading-snug font-bold text-[#24566B]">
              <strong className="text-[#463089]">Sujeito:</strong> quem realiza a ação.
            </p>
            <p className="mt-[7px] text-[21px] leading-snug font-bold text-[#24566B]">
              <strong className="text-[#FF786A]">Verbo:</strong> a palavra que mostra a ação.
            </p>
          </div>

        </div>
      </div>

      <AssetButton
        src={BTN.restart}
        width={205}
        floating
        label="Recomeçar a investigação desde o início"
        onClick={restart}
        style={{ left: 330, bottom: 25 }}
      />
    </ScreenFrame>
  );
}
