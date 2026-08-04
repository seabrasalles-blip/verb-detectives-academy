import { useState } from "react";
import { AudioButton } from "@/components/game/AudioButton";
import { CharacterLayer } from "@/components/game/CharacterLayer";
import { FeedbackModal, useFeedback } from "@/components/game/FeedbackModal";
import { Panel } from "@/components/game/Panel";
import { ScreenFrame } from "@/components/game/ScreenFrame";
import { WordOption } from "@/components/game/WordOption";
import { BG } from "@/game/assets";
import { useGame } from "@/game/state";

const OPTIONS = [
  { id: "A", text: "O sujeito e o verbo." },
  { id: "B", text: "Apenas a palavra school." },
  { id: "C", text: "Nada mudou." },
];

export function Screen04CompareGo() {
  const { complete, isDone, registerMiss } = useGame();
  const solved = isDone(4);
  const [wrongId, setWrongId] = useState<string | null>(null);
  const fb = useFeedback();

  const pick = (id: string) => {
    if (solved) return;
    if (id === "A") {
      setWrongId(null);
      fb.correct("Isso! Quando usamos she, o verbo também muda.", () => complete(4));
    } else {
      registerMiss();
      setWrongId(id);
      fb.wrong("Compare o início e o verbo das duas frases.");
    }
  };

  return (
    <ScreenFrame background={BG.activity} nextEnabled={solved}>
      <CharacterLayer pose="pointing" height={330} left={18} bottom={92} />

      <Panel style={{ left: 452, top: 58, width: 512, height: 300 }}>
        <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="text-[23px] font-bold text-[#24566B]">Observe as duas frases.</p>
          <p className="font-display text-[38px] leading-none font-extrabold text-[#183B4A]">
            <span className="text-[#52B7E8]">I</span> <span className="text-[#52B7E8]">go</span> to
            school.
          </p>
          <p className="font-display text-[38px] leading-none font-extrabold text-[#183B4A]">
            <span className="text-[#A995E8]">She</span>{" "}
            <span className="text-[#A995E8]">goes</span> to school.
          </p>
          <p className="mt-1 text-[24px] font-extrabold text-[#24566B]">
            O que mudou na segunda frase?
          </p>
        </div>
      </Panel>

      <div className="absolute bottom-[118px] left-[330px] flex w-[848px] flex-wrap justify-center gap-4">
        {OPTIONS.map((o) => (
          <WordOption
            key={o.id}
            size="sm"
            state={solved && o.id === "A" ? "correct" : wrongId === o.id ? "wrong" : "idle"}
            disabled={solved}
            onClick={() => pick(o.id)}
            ariaLabel={`Alternativa ${o.id}: ${o.text}`}
          >
            <span className="text-[26px]">
              <span className="mr-2 text-[#52B7E8]">{o.id}.</span>
              {o.text}
            </span>
          </WordOption>
        ))}
      </div>

      <AudioButton text="I go to school. She goes to school." left={200} />
      <FeedbackModal feedback={fb.feedback} onClose={fb.close} />
    </ScreenFrame>
  );
}
