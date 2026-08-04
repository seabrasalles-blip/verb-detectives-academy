import { useState } from "react";
import { AudioButton } from "@/components/game/AudioButton";
import { CharacterLayer } from "@/components/game/CharacterLayer";
import { FeedbackModal, useFeedback } from "@/components/game/FeedbackModal";
import { HintButton } from "@/components/game/HintButton";
import { Panel } from "@/components/game/Panel";
import { ProgressMarker } from "@/components/game/ProgressMarker";
import { ScreenFrame } from "@/components/game/ScreenFrame";
import { WordOption } from "@/components/game/WordOption";
import { BG, type LexPose } from "@/game/assets";
import { useGame } from "@/game/state";

export type Round = {
  /** Frase com ___ no lugar do verbo. */
  before: string;
  after: string;
  options: [string, string];
  answer: string;
  success: string;
  error: string;
};

type Props = {
  screenNumber: number;
  title: string;
  rounds: Round[];
  hint: string;
  strongHint: string;
  pose?: LexPose;
};

/** Prática por rodadas: uma frase por vez, sem alternativa pré-selecionada. */
export function RoundPractice({
  screenNumber,
  title,
  rounds,
  hint,
  strongHint,
  pose = "pointing",
}: Props) {
  const { complete, isDone, attempts, registerMiss, resetAttempts } = useGame();
  const done = isDone(screenNumber);
  const [index, setIndex] = useState(done ? rounds.length - 1 : 0);
  const [wrongOption, setWrongOption] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(done);
  const fb = useFeedback();

  const round = rounds[index]!;
  const spoken = revealed
    ? `${round.before} ${round.answer} ${round.after}`
    : `${round.before} ${round.after}`;

  const pick = (option: string) => {
    if (revealed) return;
    if (option === round.answer) {
      setWrongOption(null);
      setRevealed(true);
      fb.correct(round.success, () => {
        if (index === rounds.length - 1) {
          complete(screenNumber);
          return;
        }
        setIndex((i) => i + 1);
        setRevealed(false);
        resetAttempts();
      });
    } else {
      registerMiss();
      setWrongOption(option);
      fb.wrong(round.error);
    }
  };

  const lastDone = revealed && index === rounds.length - 1;

  return (
    <ScreenFrame background={BG.activity} nextEnabled={done || lastDone}>
      <CharacterLayer pose={pose} height={320} left={12} bottom={96} />

      <Panel style={{ left: 452, top: 58, width: 512, height: 286 }}>
        <div className="flex h-full flex-col items-center justify-center gap-5 px-6 text-center">
          <h2 className="font-display text-[30px] leading-none font-extrabold tracking-wide text-[#24566B] uppercase">
            {title}
          </h2>
          <p className="font-display text-[42px] leading-tight font-extrabold text-[#183B4A]">
            {round.before}{" "}
            {revealed ? (
              <span className="text-[#2C9C86] underline decoration-[#58CDB5] decoration-4 underline-offset-8">
                {round.answer}
              </span>
            ) : (
              <span className="text-[#52B7E8]">___</span>
            )}{" "}
            {round.after}
          </p>
        </div>
      </Panel>

      <ProgressMarker current={index + 1} total={rounds.length} left={452} top={356} />

      <div className="absolute bottom-[130px] left-[380px] flex w-[760px] justify-center gap-9">
        {round.options.map((option) => (
          <WordOption
            key={option}
            size="lg"
            disabled={revealed}
            state={
              revealed && option === round.answer
                ? "correct"
                : wrongOption === option
                  ? "wrong"
                  : "idle"
            }
            onClick={() => pick(option)}
            ariaLabel={`Escolher ${option}`}
          >
            {option.toUpperCase()}
          </WordOption>
        ))}
      </div>

      <AudioButton text={spoken} left={200} />
      <HintButton hint={hint} strongHint={strongHint} attempts={attempts} left={370} />

      <FeedbackModal feedback={fb.feedback} onClose={fb.close} />
    </ScreenFrame>
  );
}
