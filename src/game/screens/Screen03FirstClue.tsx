import { useState } from "react";
import { AudioButton } from "@/components/game/AudioButton";
import { CharacterLayer } from "@/components/game/CharacterLayer";
import { FeedbackModal, useFeedback } from "@/components/game/FeedbackModal";
import { HintButton } from "@/components/game/HintButton";
import { Panel } from "@/components/game/Panel";
import { ScreenFrame } from "@/components/game/ScreenFrame";
import { BG } from "@/game/assets";
import { useGame } from "@/game/state";

const WORDS = ["He", "go", "to", "school."];
const ANSWER = "go";

export function Screen03FirstClue() {
  const { complete, isDone, attempts, registerMiss } = useGame();
  const solved = isDone(3);
  const [wrongWord, setWrongWord] = useState<string | null>(null);
  const fb = useFeedback();

  const pick = (word: string) => {
    if (solved) return;
    if (word === ANSWER) {
      setWrongWord(null);
      fb.correct("Pista encontrada! Com he, usamos goes.", () => complete(3));
    } else {
      registerMiss();
      setWrongWord(word);
      fb.wrong("Ainda não. Procure a palavra que mostra a ação.");
    }
  };

  return (
    <ScreenFrame background={BG.activity} nextEnabled={solved}>
      <CharacterLayer pose="thinking" height={360} left={22} bottom={82} />

      <Panel style={{ left: 452, top: 62, width: 512, height: 300 }}>
        <div className="flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="text-[23px] leading-snug font-bold text-[#24566B]">
            Leia a frase. Toque na palavra que precisa ser corrigida.
          </p>

          {!solved ? (
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              {WORDS.map((word) => (
                <button
                  key={word}
                  type="button"
                  onClick={() => pick(word)}
                  aria-label={`Palavra ${word.replace(".", "")}`}
                  className={`font-display cursor-pointer rounded-[16px] border-4 px-5 py-2 text-[42px] leading-none font-extrabold transition-all duration-200 outline-none focus-visible:ring-4 focus-visible:ring-[#FFD76A] motion-safe:hover:-translate-y-[3px] ${
                    wrongWord === word
                      ? "border-[#FF786A] bg-[#FFF1EF] text-[#C64434] motion-safe:animate-[wv-shake_320ms_ease-out]"
                      : "border-transparent bg-[#E4F4FF] text-[#183B4A] hover:border-[#52B7E8]"
                  }`}
                >
                  {word}
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-7">
              <p className="font-display text-[44px] leading-none font-extrabold text-[#183B4A]">
                <span className="text-[#A995E8] underline decoration-[#A995E8] decoration-4 underline-offset-8">
                  He
                </span>{" "}
                <span className="text-[#A995E8] underline decoration-[#A995E8] decoration-4 underline-offset-8">
                  goes
                </span>{" "}
                to school.
              </p>
              <p className="mt-5 text-[22px] font-bold text-[#2C9C86]">
                He e goes combinam: o verbo mudou.
              </p>
            </div>
          )}
        </div>
      </Panel>

      <AudioButton text={solved ? "He goes to school." : "He go to school."} left={200} />
      <HintButton
        hint="Procure o verbo da frase."
        strongHint="O verbo é a palavra que mostra o que He faz todos os dias."
        attempts={attempts}
        left={370}
      />

      <FeedbackModal feedback={fb.feedback} onClose={fb.close} />
    </ScreenFrame>
  );
}
