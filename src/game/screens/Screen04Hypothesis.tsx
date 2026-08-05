import { CharacterLayer } from "@/components/game/CharacterLayer";
import { FeedbackModal, useFeedback } from "@/components/game/FeedbackModal";
import { HintButton } from "@/components/game/HintButton";
import { Instruction } from "@/components/game/Instruction";
import { Note } from "@/components/game/Note";
import { ScreenFrame } from "@/components/game/ScreenFrame";
import { SentenceRow, SuspectPoster } from "@/components/game/Sentence";
import { WordOption } from "@/components/game/WordOption";
import { BG } from "@/game/assets";
import { useGame, usePersistentState } from "@/game/state";

/** Levantamento de hipótese: o aluno escolhe a explicação mais provável. */
const OPTIONS = [
  { id: "verb", text: "O verbo muda por causa do sujeito.", correct: true },
  { id: "order", text: "As palavras estão fora de ordem.", correct: false },
  { id: "complement", text: "Falta uma palavra no complemento.", correct: false },
];

export function Screen04Hypothesis() {
  const { complete, isDone, attempts, registerMiss } = useGame();
  const done = isDone(4);
  const [chosen, setChosen] = usePersistentState<string | null>("s4.choice", null);
  const fb = useFeedback();
  const solved = done || chosen === "verb";

  const pick = (opt: (typeof OPTIONS)[number]) => {
    if (solved || fb.feedback) return;
    if (opt.correct) {
      setChosen(opt.id);
      fb.hypothesis(
        "Boa hipótese! Vamos investigar o verbo go para descobrir como ele muda depois de he.",
        () => complete(4),
      );
      return;
    }
    registerMiss();
    fb.wrong(
      attempts >= 1
        ? "A ordem e o complemento estão certos: He … to school. Sobra observar a palavra da ação."
        : "Leia a frase de novo e compare cada parte. Qual delas parece não combinar com he?",
    );
  };

  return (
    <ScreenFrame background={BG.investigation} nextEnabled={solved}>
      <CharacterLayer pose="pointing" height={250} left={4} bottom={48} />

      <Instruction top={18} width={760}>
        {solved
          ? "Anotamos a hipótese na ficha da investigação."
          : "Qual hipótese explica melhor o que está estranho na frase?"}
      </Instruction>

      <SuspectPoster style={{ left: 320, top: 100, width: 620 }}>
        <SentenceRow
          size="sm"
          labels
          compactLabels
          tokens={[
            { word: "He", role: "subject" },
            { word: "go", role: "verb" },
            { word: "to school", role: "complement", question: "para onde?" },
          ]}
        />
      </SuspectPoster>

      {solved ? (
        <Note kind="hypothesis" style={{ left: 320, top: 300, width: 620 }}>
          O verbo pode mudar por causa do sujeito. Vamos testar essa hipótese.
        </Note>
      ) : (
        <div className="absolute top-[290px] left-[300px] flex w-[660px] flex-col items-center gap-3">
          {OPTIONS.map((opt) => (
            <WordOption
              key={opt.id}
              size="sm"
              onClick={() => pick(opt)}
              ariaLabel={`Escolher a hipótese: ${opt.text}`}
            >
              <span className="px-2 text-[22px] leading-tight">{opt.text}</span>
            </WordOption>
          ))}
        </div>
      )}

      <HintButton
        hint="Uma hipótese é um palpite que ainda vamos testar."
        strongHint="Compare He go com outras frases que você já viu. A palavra da ação é a suspeita."
        attempts={attempts}
        left={210}
      />

      <FeedbackModal feedback={fb.feedback} onClose={fb.close} />
    </ScreenFrame>
  );
}
