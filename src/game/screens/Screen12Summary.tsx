import { CharacterLayer } from "@/components/game/CharacterLayer";
import { DialogueBubble } from "@/components/game/DialogueBubble";
import { Panel } from "@/components/game/Panel";
import { ScreenFrame } from "@/components/game/ScreenFrame";
import { BG } from "@/game/assets";

export function Screen12Summary() {
  return (
    <ScreenFrame background={BG.investigation} nextLabel="Ir para o encerramento">
      <CharacterLayer pose="celebrating" height={370} left={26} bottom={20} />

      <DialogueBubble style={{ left: 330, top: 48, width: 700 }}>
        <p className="text-[25px] leading-snug font-bold">
          Caso encerrado! Estas são as pistas do nosso caderno de detetive.
        </p>
      </DialogueBubble>

      <div className="absolute top-[210px] left-[330px] flex w-[700px] gap-6">
        <Panel style={{ position: "relative", width: 338, height: 200 }}>
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <p className="font-display text-[44px] leading-none font-extrabold text-[#52B7E8]">go</p>
            <p className="text-[22px] font-bold text-[#183B4A]">I · you · we · they</p>
            <p className="text-[19px] font-semibold text-[#24566B]">They go to school.</p>
          </div>
        </Panel>
        <Panel style={{ position: "relative", width: 338, height: 200 }}>
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <p className="font-display text-[44px] leading-none font-extrabold text-[#A995E8]">
              goes
            </p>
            <p className="text-[22px] font-bold text-[#183B4A]">he · she · it</p>
            <p className="text-[19px] font-semibold text-[#24566B]">She goes to school.</p>
          </div>
        </Panel>
      </div>
    </ScreenFrame>
  );
}
