import { useState } from "react";
import { AudioButton } from "@/components/game/AudioButton";
import { CharacterLayer } from "@/components/game/CharacterLayer";
import { FeedbackModal, useFeedback } from "@/components/game/FeedbackModal";
import { HintButton } from "@/components/game/HintButton";
import { Panel } from "@/components/game/Panel";
import { ScreenFrame } from "@/components/game/ScreenFrame";
import { WordOption } from "@/components/game/WordOption";
import { BG } from "@/game/assets";
import { useGame } from "@/game/state";

export function Screen08DiscoverGoes() {
  const { complete, isDone, attempts, registerMiss } = useGame();
  const solved = isDone(8);
  const [wrong, setWrong] = useState<string | null>(null);
  const fb = useFeedback();

  const pick = (option: string) => {
    if (solved) return;
    if (option === "goes") {
      setWrong(null);
      fb.correct("Exato! He, she e it pedem goes.", () => complete(8));
    } else {
      registerMiss();
      setWrong(option);
      fb.wrong("Com she, o verbo ganha um final diferente.");
    }
  };

  return (
    <ScreenFrame background={BG.activity} nextEnabled={solved}>
      <CharacterLayer pose="thinking" height={330} left={16} bottom={92} />

      <Panel style={{ left: 452, top: 58, width: 512, height: 290 }}>
        <div className="flex h-full flex-col items-center justify-center gap-5 px-6 text-center">
          <h2 className="font-display text-[28px] leading-none font-extrabold tracking-wide text-[#24566B] uppercase">
            Nova pista
          </h2>
          <p className="font-display text-[44px] leading-tight font-extrabold text-[#183B4A]">
            <span className="text-[#A995E8]">She</span>{" "}
            {solved ? (
              <span className="text-[#2C9C86] underline decoration-[#58CDB5] decoration-4 underline-offset-8">
                goes
              </span>
            ) : (
              <span className="text-[#52B7E8]">___</span>
            )}{" "}
            to school.
          </p>
          {solved && (
            <p className="text-[23px] font-bold text-[#2C9C86]">
              go + <span className="text-[#A995E8]">es</span> = goes
            </p>
          )}
        </div>
      </Panel>

      <div className="absolute bottom-[130px] left-[380px] flex w-[760px] justify-center gap-9">
        {(["go", "goes"] as const).map((o) => (
          <WordOption
            key={o}
            size="lg"
            disabled={solved}
            state={solved && o === "goes" ? "correct" : wrong === o ? "wrong" : "idle"}
            onClick={() => pick(o)}
            ariaLabel={`Escolher ${o}`}
          >
            {o.toUpperCase()}
          </WordOption>
        ))}
      </div>

      <AudioButton text={solved ? "She goes to school." : "She goes to school."} left={200} />
      <HintButton
        hint="Lembre do grupo he, she, it."
        strongHint="Nesse grupo o verbo go recebe -es no final."
        attempts={attempts}
        left={370}
      />

      <FeedbackModal feedback={fb.feedback} onClose={fb.close} />
    </ScreenFrame>
  );
}
