import { CharacterLayer } from "@/components/game/CharacterLayer";
import { FeedbackModal, FeedbackSlot, useFeedback } from "@/components/game/FeedbackModal";
import { Instruction } from "@/components/game/Instruction";
import { Note } from "@/components/game/Note";
import { ScreenFrame } from "@/components/game/ScreenFrame";
import { PartCard, SuspectPoster } from "@/components/game/Sentence";
import { BG } from "@/game/assets";
import { useGame, usePersistentState } from "@/game/state";

const WORDS = ["He", "go", "to", "school."] as const;

export function Screen04Hypothesis() {
  const { complete, isDone } = useGame();
  const [found, setFound] = usePersistentState<string[]>("s4.found", []);
  const fb = useFeedback();
  const done = isDone(4);

  const tap = (word: string) => {
    if (fb.isOpen || done) return;
    if (word === "go") {
      if (!found.includes("go")) setFound([...found, "go"]);
      // Um único modal: a pista fica registrada na nota da própria tela.
      fb.hypothesis("Talvez o verbo mude por causa do sujeito.", () => complete(4));
      return;
    }
    if (word === "He") {
      if (!found.includes("He")) setFound([...found, "He"]);
      fb.clue("Isso! He é o sujeito. Agora procure a palavra que mostra a ação.");
      return;
    }
    fb.clue("Essa parte completa a ideia. Procure a palavra que mostra a ação.");
  };

  const roleOf = (word: string) => {
    if (word === "He" && found.includes("He")) return "subject" as const;
    if (word === "go" && (found.includes("go") || done)) return "verb" as const;
    return undefined;
  };

  return (
    <ScreenFrame background={BG.investigation} nextEnabled={done}>
      <CharacterLayer pose="pointing" height={250} left={4} bottom={40} />

      <Instruction top={22} width={640}>
        Toque na palavra que você gostaria de investigar.
      </Instruction>

      <SuspectPoster style={{ left: 300, top: 108, width: 640 }}>
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
      </SuspectPoster>

      {(found.includes("go") || done) && (
        <Note kind="hypothesis" style={{ left: 300, top: 320, width: 640 }}>
          O verbo pode mudar por causa do sujeito.
        </Note>
      )}

      <FeedbackSlot inline={fb.inline} />
      <FeedbackModal feedback={fb.feedback} onClose={fb.close} />
    </ScreenFrame>
  );
}
