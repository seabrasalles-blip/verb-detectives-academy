import { InlineAudioButton } from "@/components/game/AudioButton";
import { CharacterLayer } from "@/components/game/CharacterLayer";
import { FeedbackModal, FeedbackSlot, useFeedback } from "@/components/game/FeedbackModal";
import { HintButton } from "@/components/game/HintButton";
import { Panel } from "@/components/game/Panel";
import { ProgressMarker } from "@/components/game/ProgressMarker";
import { ScreenFrame } from "@/components/game/ScreenFrame";
import { WordOption } from "@/components/game/WordOption";
import { BG, type LexPose } from "@/game/assets";
import { useGame, usePersistentState } from "@/game/state";
import { useRef } from "react";

export type Round = {
  /** Sujeito da frase (antes da lacuna). */
  before: string;
  after: string;
  options: [string, string];
  answer: string;
  success: string;
  /** Primeira tentativa incorreta: orientação geral. */
  error: string;
  /** Tentativas seguintes: pista mais específica (sem entregar a resposta). */
  error2?: string;
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
  const sentenceRef = useRef<HTMLParagraphElement>(null);
  const [misses, setMisses] = usePersistentState<number>(`${storageKey}.misses`, 0);

  const safeIndex = Math.min(index, rounds.length - 1);
  const round = rounds[safeIndex]!;
  const showAnswer = done || revealed;
  const fullSentence = `${round.before} ${round.answer} ${round.after}`;

  const pick = (option: string) => {
    // Bloqueia cliques repetidos enquanto o modal estiver aberto.
    if (showAnswer || fb.isOpen) return;
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
        setMisses(0);
        resetAttempts();
        // O foco vai para a nova frase, não para uma alternativa que mudou.
        window.setTimeout(() => sentenceRef.current?.focus(), 0);
      });
    } else {
      registerMiss();
      setWrongOption(option);
      const next = misses + 1;
      setMisses(next);
      fb.wrong(next >= 2 && round.error2 ? round.error2 : round.error);
    }
  };

  const lastDone = showAnswer && safeIndex === rounds.length - 1;

  return (
    <ScreenFrame background={BG.activity} nextEnabled={done || lastDone}>
      <CharacterLayer pose={pose} placement="activityPointing" height={310} bottom={110} />

      <Panel style={{ left: 452, top: 54, width: 512, height: 268 }}>
        <div className="flex h-full flex-col items-center justify-center gap-5 px-6 text-center">
          <h2 className="font-display text-[26px] leading-none font-extrabold tracking-wide text-[#24566B] uppercase">
            {title}
          </h2>
          <p
            lang="en"
            ref={sentenceRef}
            tabIndex={-1}
            className="font-display text-[40px] outline-none leading-tight font-extrabold text-[#183B4A]"
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

      <ProgressMarker
        current={safeIndex + 1}
        total={rounds.length}
        left={708}
        top={342}
        width={430}
        centered
        variant="card"
      />

      <div className="absolute top-[430px] left-[380px] flex w-[760px] justify-center gap-9">

        {round.options.map((option) => (
          <WordOption
            key={option}
            size="lg"
            disabled={showAnswer || fb.isOpen}
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

      {/* Áudio junto ao painel da frase; nunca antecipa a resposta. */}
      <InlineAudioButton
        text={showAnswer ? fullSentence : ""}
        left={976}
        top={236}
        width={112}
        disabled={!showAnswer}
        label={
          showAnswer
            ? `Ouvir a frase completa: ${fullSentence}`
            : "O áudio da frase completa fica disponível depois da resposta correta"
        }
      />
      <HintButton
        hint={hint}
        strongHint={strongHint}
        attempts={attempts}
        right={20}
        top={58}
        width={132}
        compact
      />


      <FeedbackSlot inline={fb.inline} left={340} top={568} width={520} />
      <FeedbackModal
        feedback={fb.feedback}
        onClose={() => {
          if (!fb.isOpen) return;
          const wasWrong = fb.feedback?.tone === "wrong";
          fb.close();
          if (wasWrong) setWrongOption(null);
        }}
      />
    </ScreenFrame>
  );
}
