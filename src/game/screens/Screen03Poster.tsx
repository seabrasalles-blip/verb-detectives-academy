import { CharacterLayer } from "@/components/game/CharacterLayer";
import { FeedbackModal, useFeedback } from "@/components/game/FeedbackModal";
import { Instruction } from "@/components/game/Instruction";
import { Note } from "@/components/game/Note";
import { ScreenFrame } from "@/components/game/ScreenFrame";
import { PartCard, SuspectPoster } from "@/components/game/Sentence";
import { HintButton } from "@/components/game/HintButton";
import { BG } from "@/game/assets";
import { useGame, usePersistentState } from "@/game/state";

/**
 * Investigação inicial. A frase "He go to school." aparece como pista visual
 * e NUNCA é pronunciada: não há botão de áudio nesta tela.
 * O aluno só avança depois de identificar o verbo suspeito.
 */
const WORDS = ["He", "go", "to school."] as const;

export function Screen03Poster() {
  const { complete, isDone, attempts, registerMiss } = useGame();
  const done = isDone(3);
  const [found, setFound] = usePersistentState<string[]>("s3.found", []);
  const fb = useFeedback();
  const solved = done || found.includes("go");

  const tap = (word: string) => {
    if (solved || fb.feedback) return;
    if (word === "go") {
      setFound([...new Set([...found, "go"])]);
      fb.clue("Isso mesmo! Depois de he, o verbo precisa mudar. Vamos descobrir como?", () =>
        complete(3),
      );
      return;
    }
    registerMiss();
    if (word === "He") setFound([...new Set([...found, "He"])]);
    fb.wrong(
      attempts >= 1
        ? "O sujeito é he. Observe com atenção o verbo que aparece depois dele."
        : "Observe novamente o sujeito e o verbo. Qual palavra precisa mudar?",
    );
  };

  const roleOf = (word: string) => {
    if (word === "He" && (found.includes("He") || solved)) return "subject" as const;
    if (word === "go" && solved) return "verb" as const;
    return undefined;
  };

  return (
    <ScreenFrame background={BG.investigation} nextEnabled={solved}>
      <CharacterLayer pose="thinking" height={260} left={6} bottom={54} />

      <Instruction top={18} width={760}>
        {solved
          ? "Pista anotada: o verbo desta frase precisa ser investigado."
          : "Há algo estranho nesta frase. Toque na palavra que precisa ser investigada."}
      </Instruction>

      <SuspectPoster style={{ left: 320, top: 110, width: 620 }}>
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

      <Note kind="clue" style={{ left: 320, top: 330, width: 620 }}>
        {solved
          ? "O verbo go está logo depois de he. Alguma coisa precisa mudar aqui."
          : "Esta frase é uma pista suspeita, por isso não a lemos em voz alta."}
      </Note>

      <HintButton
        hint="Observe o sujeito e depois a palavra que mostra a ação."
        strongHint="O sujeito é he. Olhe bem para a palavra que vem logo depois dele."
        attempts={attempts}
        left={210}
      />

      <FeedbackModal feedback={fb.feedback} onClose={fb.close} />
    </ScreenFrame>
  );
}
