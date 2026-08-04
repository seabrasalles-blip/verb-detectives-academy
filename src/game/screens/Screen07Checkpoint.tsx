import { CharacterLayer } from "@/components/game/CharacterLayer";
import { DialogueBubble } from "@/components/game/DialogueBubble";
import { Panel } from "@/components/game/Panel";
import { ScreenFrame } from "@/components/game/ScreenFrame";
import { BG } from "@/game/assets";

export function Screen07Checkpoint() {
  return (
    <ScreenFrame background={BG.investigation}>
      <CharacterLayer pose="celebrating" height={400} left={44} bottom={14} />

      <DialogueBubble style={{ left: 340, top: 66, width: 680 }}>
        <p className="text-[26px] leading-[1.35] font-bold">
          Ótimo trabalho, detetive! Você já resolveu a primeira parte do caso.
        </p>
      </DialogueBubble>

      <Panel tone="paper" style={{ left: 340, top: 250, width: 680, height: 150 }}>
        <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
          <p className="font-display text-[26px] font-extrabold tracking-wide text-[#24566B] uppercase">
            Pistas confirmadas
          </p>
          <p className="text-[24px] font-bold text-[#183B4A]">
            <span className="text-[#52B7E8]">I, you, we, they</span> → go
          </p>
          <p className="text-[24px] font-bold text-[#183B4A]">
            Agora vamos investigar <span className="text-[#A995E8]">he, she, it</span>.
          </p>
        </div>
      </Panel>
    </ScreenFrame>
  );
}
