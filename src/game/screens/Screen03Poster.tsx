import { InlineAudioButton } from "@/components/game/AudioButton";
import { CharacterLayer } from "@/components/game/CharacterLayer";
import { DialogueBubble } from "@/components/game/DialogueBubble";
import { FlowActionButton } from "@/components/game/FlowActionButton";
import { ScreenFrame } from "@/components/game/ScreenFrame";
import { SuspectPoster } from "@/components/game/Sentence";
import { BG } from "@/game/assets";
import { useGame } from "@/game/state";

export function Screen03Poster() {
  const { complete, next } = useGame();

  const investigate = () => {
    complete(3);
    next();
  };

  return (
    <ScreenFrame background={BG.investigation} showNext={false}>
      <CharacterLayer pose="thinking" placement="narrativeThinking" />

      <DialogueBubble style={{ left: 286, top: 34, width: 690 }}>
        <p className="text-[25px] leading-snug font-bold">
          Encontrei esta frase em um cartaz. Algo parece estranho… O que você percebe?
        </p>
      </DialogueBubble>

      <SuspectPoster style={{ left: 350, top: 244, width: 560 }}>
        <p lang="en" className="font-display text-center text-[52px] leading-none font-extrabold text-[#183B4A]">
          He go to school.
        </p>
      </SuspectPoster>

      <InlineAudioButton
        text="He go to school."
        label="Ouvir a frase encontrada no cartaz."
        left={930}
        top={300}
        width={112}
      />


      <FlowActionButton
        onClick={investigate}
        ariaLabel="Investigar a frase encontrada no cartaz"
        style={{ right: 20, bottom: 20 }}
      >
        Quero investigar!
      </FlowActionButton>
    </ScreenFrame>
  );
}
