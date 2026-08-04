import { AudioButton } from "@/components/game/AudioButton";
import { CharacterLayer } from "@/components/game/CharacterLayer";
import { DialogueBubble } from "@/components/game/DialogueBubble";
import { FeedbackModal, useFeedback } from "@/components/game/FeedbackModal";
import { Instruction } from "@/components/game/Instruction";
import { Note } from "@/components/game/Note";
import { ScreenFrame } from "@/components/game/ScreenFrame";
import { PartCard, SuspectPoster } from "@/components/game/Sentence";
import { BG } from "@/game/assets";
import { useGame, usePersistentState } from "@/game/state";

const WORDS = ["She", "play", "soccer."] as const;

export function Screen10NewInvestigation() {
  const { complete, isDone } = useGame();
  const done = isDone(10);
  const [phase, setPhase] = usePersistentState<number>("s10.phase", 0);
  const [found, setFound] = usePersistentState<string[]>("s10.found", []);
  const fb = useFeedback();
  const investigating = done || phase > 0;

  const tap = (word: string) => {
    if (word === "play") {
      if (!found.includes("play")) setFound([...found, "play"]);
      fb.clue("Você encontrou o verbo. Será que ele também muda com she?", () =>
        fb.hypothesis("Talvez play mude quando o sujeito é she.", () => complete(10)),
      );
      return;
    }
    if (word === "She") {
      if (!found.includes("She")) setFound([...found, "She"]);
      fb.clue("Boa! She é o sujeito: mostra quem realiza a ação. Agora procure a ação.");
      return;
    }
    fb.clue("Essa palavra completa a ideia. Procure a palavra que mostra a ação.");
  };

  const roleOf = (word: string) => {
    if (word === "She" && found.includes("She")) return "subject" as const;
    if (word === "play" && (found.includes("play") || done)) return "verb" as const;
    return undefined;
  };

  return (
    <ScreenFrame background={BG.investigation} nextEnabled={done}>
      <CharacterLayer pose="thinking" height={240} left={4} bottom={60} />

      {investigating ? (
        <Instruction top={20} width={640}>
          Toque na palavra que você gostaria de investigar.
        </Instruction>
      ) : (
        <DialogueBubble style={{ left: 280, top: 26, width: 680 }}>
          <p className="text-[25px] leading-snug font-bold">
            Outro cartaz parece estranho. Use o que descobrimos para investigar.
          </p>
        </DialogueBubble>
      )}

      <SuspectPoster style={{ left: 330, top: 178, width: 580 }}>
        {investigating ? (
          <div className="flex flex-wrap items-start justify-center gap-3">
            {WORDS.map((w) => (
              <PartCard
                key={w}
                word={w}
                role={roleOf(w)}
                labels={!!roleOf(w)}
                size="md"
                onClick={() => tap(w)}
                ariaLabel={`Investigar a palavra ${w}`}
              />
            ))}
          </div>
        ) : (
          <p
            lang="en"
            className="font-display text-center text-[48px] leading-none font-extrabold text-[#183B4A]"
          >
            She play soccer.
          </p>
        )}
      </SuspectPoster>

      {(found.includes("play") || done) && (
        <Note kind="hypothesis" style={{ left: 330, top: 356, width: 580 }}>
          Talvez play mude quando o sujeito é she.
        </Note>
      )}

      {!investigating && (
        <button
          type="button"
          onClick={() => setPhase(1)}
          className="font-display absolute bottom-[38px] left-[440px] cursor-pointer rounded-full border-4 border-[#52B7E8] bg-[#FFFDF6] px-8 py-3 text-[24px] font-extrabold text-[#1F6D96] shadow-[0_5px_0_rgba(36,86,107,0.16)] outline-none focus-visible:ring-4 focus-visible:ring-[#FFD76A] motion-safe:hover:-translate-y-[2px]"
        >
          Vou investigar
        </button>
      )}

      <AudioButton
        text="She play soccer."
        left={196}
        label="Ouvir a frase encontrada no cartaz."
      />

      <FeedbackModal feedback={fb.feedback} onClose={fb.close} />
    </ScreenFrame>
  );
}
