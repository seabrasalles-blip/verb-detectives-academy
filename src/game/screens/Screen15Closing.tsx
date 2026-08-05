import { AssetButton } from "@/components/game/AssetButton";
import { CharacterLayer } from "@/components/game/CharacterLayer";
import { Panel } from "@/components/game/Panel";
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
      <CharacterLayer pose="celebrating" height={330} right={20} bottom={16} />

      <div className="absolute top-[36px] left-[70px] w-[640px] text-center">
        <h2
          className="font-display text-[46px] leading-none font-extrabold text-[#FFFDF6]"
          style={{ textShadow: "0 4px 0 #24566B" }}
        >
          Você virou um Verb Detective!
        </h2>
      </div>

      <Panel style={{ left: 70, top: 108, width: 300, height: 150 }}>
        <div className="flex h-full flex-col items-center justify-center gap-1 text-center">
          <p lang="en" className="font-display text-[38px] leading-none font-extrabold text-[#FF786A]">
            GO
          </p>
          <p className="text-[22px] font-bold text-[#183B4A]">= ir</p>
          <p lang="en" className="font-display mt-1 text-[38px] leading-none font-extrabold text-[#FF786A]">
            PLAY
          </p>
          <p className="text-[22px] font-bold text-[#183B4A]">= brincar ou jogar</p>
        </div>
      </Panel>

      <Panel style={{ left: 396, top: 108, width: 340, height: 150 }}>
        <div className="flex h-full flex-col items-center justify-center gap-1 text-center">
          <p lang="en" className="font-display text-[24px] leading-none font-extrabold text-[#463089]">
            I / You / We / They
          </p>
          <p lang="en" className="font-display text-[30px] leading-none font-extrabold text-[#B93B2B]">
            go / play
          </p>
          <p lang="en" className="font-display mt-2 text-[24px] leading-none font-extrabold text-[#463089]">
            He / She / It
          </p>
          <p lang="en" className="font-display text-[30px] leading-none font-extrabold text-[#B93B2B]">
            goe<span className="rounded bg-[#FFD76A] px-1 text-[#7A4E00]">s</span> / play
            <span className="rounded bg-[#FFD76A] px-1 text-[#7A4E00]">s</span>
          </p>
        </div>
      </Panel>

      <Panel tone="paper" style={{ left: 70, top: 274, width: 666, height: 130 }}>
        <div className="flex h-full flex-col items-center justify-center gap-1 text-center">
          <p className="text-[21px] font-bold text-[#183B4A]">
            <strong className="text-[#463089]">Sujeito:</strong> quem realiza a ação. ·{" "}
            <strong className="text-[#B93B2B]">Verbo:</strong> a palavra que mostra a ação.
          </p>
          <p className="text-[21px] font-bold text-[#183B4A]">
            Com he, she e it, o verbo muda. Geralmente acrescentamos s.
          </p>
          <p className="text-[21px] font-bold text-[#183B4A]">
            No verbo go, acrescentamos es: <span lang="en">goes</span>.
          </p>
        </div>
      </Panel>

      <AssetButton
        src={BTN.restart}
        width={190}
        floating
        label="Recomeçar a investigação desde o início"
        onClick={restart}
        style={{ left: 310, bottom: 30 }}
      />
    </ScreenFrame>
  );
}
