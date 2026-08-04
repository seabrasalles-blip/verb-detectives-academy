import { CharacterLayer } from "@/components/game/CharacterLayer";
import { DialogueBubble } from "@/components/game/DialogueBubble";
import { ScreenFrame } from "@/components/game/ScreenFrame";
import { BG } from "@/game/assets";

export function Screen02Case() {
  return (
    <ScreenFrame background={BG.investigation}>
      <CharacterLayer pose="pointing" height={430} left={40} bottom={12} />
      <DialogueBubble style={{ left: 330, top: 96, width: 690 }}>
        <p className="text-[28px] leading-[1.35] font-bold">
          Algo estranho aconteceu em Wordville!
          <br />
          Alguns verbos estão no lugar errado.
          <br />
          Você pode me ajudar a encontrar as formas corretas?
        </p>
      </DialogueBubble>
    </ScreenFrame>
  );
}
