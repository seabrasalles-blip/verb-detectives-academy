import { AudioButton } from "@/components/game/AudioButton";
import { CharacterLayer } from "@/components/game/CharacterLayer";
import { FeedbackModal, useFeedback } from "@/components/game/FeedbackModal";
import { HintButton } from "@/components/game/HintButton";
import { Panel } from "@/components/game/Panel";
import { ProgressMarker } from "@/components/game/ProgressMarker";
import { ScreenFrame } from "@/components/game/ScreenFrame";
import { WordOption } from "@/components/game/WordOption";
import { BG, type LexPose } from "@/game/assets";
import { useGame, usePersistentState } from "@/game/state";

export type Round = {
  /** Sujeito da frase (antes da lacuna). */
  before: string;
  after: string;
  options: [string, string];
  answer: string;
  success: string;
  error: string;
};

type Props = {
  screenNumber: number;
  storageKey: string;
  title: string;
  rounds: Round[];
  hint: string;
  strongHint: string;
  pose?: LexPose;
};

/**
 * Prática por rodadas: uma frase por vez, nenhuma alternativa pré-selecionada,
 * áudio somente depois do acerto e progresso preservado ao recarregar.
 */
export function RoundPractice({
  screenNumber,
  storageKey,
  title,
  rounds,
  hint,
  strongHint,
  pose = "pointing",
}: Props) {
  const { complete, isDone, attempts, registerMiss, resetAttempts } = useGame();
  const done = isDone(screenNumber);
  const [index, setIndex] = usePersistentState<number>(`${storageKey}.index`, 0);
  const [revealed, setRevealed] = usePersistentState<boolean>(`${storageKey}.revealed`, false);
  const [wrongOption, setWrongOption] = usePersistentState<string | null>(
    `${storageKey}.wrong`,
    null,
  );
  const fb = useFeedback();

  const safeIndex = Math.min(index, rounds.length - 1);
  const round = rounds[safeIndex]!;
  const showAnswer = done || revealed;
  const fullSentence = `${round.before} ${round.answer} ${round.after}`;

  const pick = (option: string) => {
    if (showAnswer) return;
    if (option === round.answer) {
      setWrongOption(null);
      setRevealed(true);
      fb.correct(round.success, () => {
        if (safeIndex === rounds.length - 1) {
          complete(screenNumber);
          return;
        }
        setIndex(safeIndex + 1);
        setRevealed(false);
        resetAttempts();
      });
    } else {
      registerMiss();
      setWrongOption(option);
      fb.wrong(round.error);
    }
  };

  const lastDone = showAnswer && safeIndex === rounds.length - 1;

  return (
    <ScreenFrame background={BG.activity} nextEnabled={done || lastDone}>
      <CharacterLayer pose={pose} height={300} left={8} bottom={110} />

      <Panel style={{ left: 452, top: 54, width: 512, height: 268 }}>
        <div className="flex h-full flex-col items-center justify-center gap-5 px-6 text-center">
          <h2 className="font-display text-[26px] leading-none font-extrabold tracking-wide text-[#24566B] uppercase">
            {title}
          </h2>
          <p
            lang="en"
            className="font-display text-[40px] leading-tight font-extrabold text-[#183B4A]"
          >
            <span className="text-[#463089]">{round.before}</span>{" "}
            {showAnswer ? (
              <span className="text-[#B93B2B] underline decoration-[#FF786A] decoration-4 underline-offset-8">
                {round.answer}
              </span>
            ) : (
              <span className="text-[#52B7E8]">___</span>
            )}{" "}
            {round.after}
          </p>
        </div>
      </Panel>

      <ProgressMarker current={safeIndex + 1} total={rounds.length} left={452} top={332} />

      <div className="absolute bottom-[130px] left-[380px] flex w-[760px] justify-center gap-9">
        {round.options.map((option) => (
          <WordOption
            key={option}
            size="lg"
            disabled={showAnswer}
            state={
              showAnswer && option === round.answer
                ? "correct"
                : wrongOption === option
                  ? "wrong"
                  : "idle"
            }
            onClick={() => pick(option)}
            ariaLabel={`Escolher ${option}`}
          >
            <span lang="en">{option.toUpperCase()}</span>
          </WordOption>
        ))}
      </div>

      <AudioButton
        text={fullSentence}
        left={200}
        disabled={!showAnswer}
        label={
          showAnswer
            ? `Ouvir a frase completa: ${fullSentence}`
            : "O áudio da frase completa fica disponível depois da resposta correta"
        }
      />
      <HintButton hint={hint} strongHint={strongHint} attempts={attempts} left={370} />

      <FeedbackModal feedback={fb.feedback} onClose={fb.close} />
    </ScreenFrame>
  );
}
