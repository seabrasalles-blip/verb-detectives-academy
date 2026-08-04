import { useState } from "react";
import { CharacterLayer } from "@/components/game/CharacterLayer";
import { Instruction } from "@/components/game/Instruction";
import { FeedbackModal, useFeedback } from "@/components/game/FeedbackModal";
import { HintButton } from "@/components/game/HintButton";
import { ScreenFrame } from "@/components/game/ScreenFrame";
import { BG } from "@/game/assets";
import { useGame } from "@/game/state";

const SUBJECTS = [
  { word: "I", group: "go" },
  { word: "She", group: "goes" },
  { word: "They", group: "go" },
  { word: "He", group: "goes" },
  { word: "We", group: "go" },
  { word: "It", group: "goes" },
] as const;

type Group = "go" | "goes";

export function Screen10Sorting() {
  const { complete, isDone, attempts, registerMiss } = useGame();
  const done = isDone(10);
  const [placed, setPlaced] = useState<Record<string, Group>>(
    done ? Object.fromEntries(SUBJECTS.map((s) => [s.word, s.group])) : {},
  );
  const [selected, setSelected] = useState<string | null>(null);
  const [shakeGroup, setShakeGroup] = useState<Group | null>(null);
  const fb = useFeedback();

  const remaining = SUBJECTS.filter((s) => !placed[s.word]);

  const drop = (group: Group, word: string | null) => {
    if (!word) return;
    const subject = SUBJECTS.find((s) => s.word === word);
    if (!subject) return;
    setSelected(null);
    if (subject.group === group) {
      const nextPlaced = { ...placed, [word]: group };
      setPlaced(nextPlaced);
      setShakeGroup(null);
      if (Object.keys(nextPlaced).length === SUBJECTS.length) {
        fb.correct("Caso resolvido! Todos os sujeitos no grupo certo.", () => complete(10));
      }
    } else {
      registerMiss();
      setShakeGroup(group);
      fb.wrong("Esse sujeito pertence ao outro grupo. Tente de novo.");
      window.setTimeout(() => setShakeGroup(null), 400);
    }
  };

  const Box = ({ group, color, left }: { group: Group; color: string; left: number }) => (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        drop(group, e.dataTransfer.getData("text/plain") || selected);
      }}
      className={`absolute flex flex-col items-center rounded-[24px] border-4 border-dashed bg-[#FFFDF5]/95 px-4 py-4 shadow-[0_4px_0_rgba(36,86,107,0.12)] ${
        shakeGroup === group ? "motion-safe:animate-[wv-shake_320ms_ease-out]" : ""
      }`}
      style={{ left, top: 100, width: 300, height: 236, borderColor: color }}
    >
      <button
        type="button"
        onClick={() => drop(group, selected)}
        aria-label={`Colocar o sujeito selecionado no grupo ${group}`}
        className="font-display cursor-pointer rounded-full px-6 py-1 text-[38px] leading-none font-extrabold outline-none focus-visible:ring-4 focus-visible:ring-[#FFD76A]"
        style={{ color }}
      >
        {group.toUpperCase()}
      </button>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {SUBJECTS.filter((s) => placed[s.word] === group).map((s) => (
          <span
            key={s.word}
            className="font-display rounded-[14px] border-4 bg-[#E8FBF5] px-4 py-1 text-[27px] leading-none font-extrabold text-[#1F7A67] motion-safe:animate-[wv-bounce_380ms_ease-out]"
            style={{ borderColor: "#58CDB5" }}
          >
            {s.word}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <ScreenFrame background={BG.activity} nextEnabled={done || remaining.length === 0}>
      <CharacterLayer pose="pointing" height={230} left={0} bottom={110} />

      <Instruction top={26} width={820}>
        Toque em um sujeito e depois no grupo certo (ou arraste até ele).
      </Instruction>


      <Box group="go" color="#52B7E8" left={330} />
      <Box group="goes" color="#A995E8" left={680} />

      <div className="absolute bottom-[118px] left-[300px] flex w-[880px] flex-wrap justify-center gap-3">
        {remaining.map((s) => (
          <button
            key={s.word}
            type="button"
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text/plain", s.word)}
            onClick={() => setSelected(selected === s.word ? null : s.word)}
            aria-pressed={selected === s.word}
            aria-label={`Sujeito ${s.word}`}
            className={`font-display cursor-grab rounded-[16px] border-4 px-6 py-2 text-[30px] leading-none font-extrabold transition-all duration-200 outline-none focus-visible:ring-4 focus-visible:ring-[#FFD76A] motion-safe:hover:-translate-y-[3px] ${
              selected === s.word
                ? "border-[#A995E8] bg-[#F1ECFF] text-[#4B3B8F] ring-4 ring-[#A995E8]/40"
                : "border-[#24566B] bg-[#FFFDF5] text-[#183B4A]"
            }`}
          >
            {s.word}
          </button>
        ))}
        {remaining.length === 0 && (
          <p className="text-[24px] font-extrabold text-[#2C9C86]">
            Todos os sujeitos foram organizados!
          </p>
        )}
      </div>

      <HintButton
        hint="Pense em quantas pessoas o sujeito representa."
        strongHint="He, she e it ficam em goes. I, you, we e they ficam em go."
        attempts={attempts}
        left={200}
      />

      <FeedbackModal feedback={fb.feedback} onClose={fb.close} />
    </ScreenFrame>
  );
}
