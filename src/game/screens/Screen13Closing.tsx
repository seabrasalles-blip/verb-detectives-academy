import { AssetButton } from "@/components/game/AssetButton";
import { CharacterLayer } from "@/components/game/CharacterLayer";
import { Panel } from "@/components/game/Panel";
import { ScreenFrame } from "@/components/game/ScreenFrame";
import { BG, BTN } from "@/game/assets";
import { useGame } from "@/game/state";

export function Screen13Closing() {
  const { restart } = useGame();

  return (
    <ScreenFrame background={BG.final} showNext={false}>
      <CharacterLayer pose="celebrating" height={400} left={790} bottom={18} />

      <div className="absolute top-[70px] left-[110px] w-[620px] text-center">
        <h2
          className="font-display text-[58px] leading-none font-extrabold text-[#FFFDF6]"
          style={{ textShadow: "0 5px 0 #24566B" }}
        >
          Parabéns!
        </h2>
        <p className="font-display mt-3 text-[30px] leading-none font-extrabold text-[#FFD76A]">
          Você virou um Verb Detective!
        </p>
      </div>

      <Panel tone="paper" style={{ left: 110, top: 210, width: 620, height: 170 }}>
        <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
          <p className="text-[24px] font-bold text-[#183B4A]">
            Você aprendeu quando usar <span className="text-[#52B7E8]">go</span> e{" "}
            <span className="text-[#A995E8]">goes</span> no simple present.
          </p>
          <p className="text-[21px] font-semibold text-[#24566B]">
            Continue observando os verbos nas frases em inglês!
          </p>
        </div>
      </Panel>

      <AssetButton
        src={BTN.restart}
        width={200}
        floating
        label="Recomeçar a investigação desde o início"
        onClick={restart}
        style={{ left: 320, bottom: 40 }}
      />
    </ScreenFrame>
  );
}
