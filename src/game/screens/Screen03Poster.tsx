import { AudioButton } from "@/components/game/AudioButton";
import { CharacterLayer } from "@/components/game/CharacterLayer";
import { DialogueBubble } from "@/components/game/DialogueBubble";
import { ScreenFrame } from "@/components/game/ScreenFrame";
import { SuspectPoster } from "@/components/game/Sentence";
import { BG } from "@/game/assets";
import { useGame } from "@/game/state";

export function Screen03Poster() {
  const { complete, isDone } = useGame();
  const found = isDone(3);

  return (
    <ScreenFrame background={BG.investigation} nextEnabled={found}>
      <CharacterLayer pose="thinking" height={300} left={12} bottom={40} />

      <DialogueBubble style={{ left: 286, top: 34, width: 690 }}>
        <p className="text-[25px] leading-snug font-bold">
          Encontrei esta frase em um cartaz. Algo parece estranho… O que você percebe?
        </p>
      </DialogueBubble>

      <SuspectPoster style={{ left: 350, top: 244, width: 560 }}>
        <p
          lang="en"
          className="font-display text-center text-[52px] leading-none font-extrabold text-[#183B4A]"
        >
          He go to school.
        </p>
      </SuspectPoster>

      <AudioButton
        text="He go to school."
        label="Ouvir a frase encontrada no cartaz."
        left={196}
      />

      <button
        type="button"
        onClick={() => complete(3)}
        className="font-display absolute bottom-[36px] left-[420px] cursor-pointer rounded-full border-4 border-[#52B7E8] bg-[#FFFDF6] px-8 py-3 text-[24px] font-extrabold text-[#1F6D96] shadow-[0_5px_0_rgba(36,86,107,0.16)] outline-none focus-visible:ring-4 focus-visible:ring-[#FFD76A] motion-safe:hover:-translate-y-[2px]"
      >
        {found ? "Pista anotada ✓" : "Encontrei uma pista"}
      </button>
    </ScreenFrame>
  );
}
