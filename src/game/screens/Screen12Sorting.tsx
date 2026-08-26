import { useRef } from "react";
import { CharacterLayer } from "@/components/game/CharacterLayer";
import { FeedbackModal, FeedbackSlot, useFeedback } from "@/components/game/FeedbackModal";
import { HintButton } from "@/components/game/HintButton";
import { Instruction } from "@/components/game/Instruction";
import { Note } from "@/components/game/Note";
import { ScreenFrame } from "@/components/game/ScreenFrame";
import { BG } from "@/game/assets";
import { useGame, usePersistentState } from "@/game/state";

type Group = "base" | "s";

/** Ordem propositalmente misturada: evita perceber os grupos pela sequência. */
const SUBJECTS: { word: string; group: Group }[] = [
  { word: "I", group: "base" },
  { word: "She", group: "s" },
  { word: "They", group: "base" },
  { word: "He", group: "s" },
  { word: "You", group: "base" },
  { word: "It", group: "s" },
  { word: "We", group: "base" },
];


const BOXES: { group: Group; title: string; color: string; left: number }[] = [
  { group: "base", title: "GO / PLAY", color: "#52B7E8", left: 300 },
  { group: "s", title: "GOES / PLAYS", color: "#A995E8", left: 690 },
];

export function Screen12Sorting() {
  const { complete, isDone, attempts, registerMiss } = useGame();
  const done = isDone(12);
  const [placed, setPlaced] = usePersistentState<Record<string, Group>>("s12.placed", {});
  const [selected, setSelected] = usePersistentState<string | null>("s12.selected", null);
  const shakeRef = useRef<HTMLDivElement>(null);
  const fb = useFeedback();

  const remaining = SUBJECTS.filter((s) => !placed[s.word]);
  const finished = done || remaining.length === 0;

  const [misses, setMisses] = usePersistentState<number>("s12.misses", 0);

  const drop = (group: Group, word: string | null) => {
    if (!word || fb.isOpen || finished) return;
    const subject = SUBJECTS.find((s) => s.word === word);
    if (!subject) return;
    setSelected(null);
    if (subject.group === group) {
      const nextPlaced = { ...placed, [word]: group };
      setPlaced(nextPlaced);
      if (Object.keys(nextPlaced).length === SUBJECTS.length) {
        fb.conclusion("O sujeito ajuda a escolher a forma do verbo.", () => complete(12), {
          title: "Caso resolvido",
        });
      } else {
        fb.ok(group === "base" ? `Isso! ${word} usa go ou play.` : `Isso! ${word} usa goes ou plays.`);
      }
    } else {
      // O card volta para a bandeja: nada é movido.
      registerMiss();
      const next = misses + 1;
      setMisses(next);
      const specific = group === "s" ? "I, you, we e they usam go/play." : "He, she e it usam goes/plays.";
      const general =
        group === "s"
          ? "Esse sujeito pertence ao grupo que usa a forma básica do verbo."
          : "Esse sujeito pertence ao grupo em que o verbo muda.";
      fb.wrong(next >= 2 ? `${general} ${specific}` : general);
    }
  };

  return (
    <ScreenFrame background={BG.activity} nextEnabled={finished}>
      <CharacterLayer pose="pointing" placement="activityPointing" height={300} bottom={132} />

      <Instruction top={16} width={860}>
        Arraste o card até o grupo correto.
      </Instruction>

      {BOXES.map((box) => (
        <div
          key={box.group}
          data-group={box.group}
          ref={box.group === "s" ? shakeRef : undefined}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            drop(box.group, e.dataTransfer.getData("text/plain") || selected);
          }}
          className="absolute flex flex-col items-center rounded-[24px] border-4 border-dashed bg-[#FFFDF5]/95 px-4 py-3 shadow-[0_4px_0_rgba(36,86,107,0.12)]"
          style={{ left: box.left, top: 82, width: 340, height: 250, borderColor: box.color }}
        >
          <button
            type="button"
            onClick={() => drop(box.group, selected)}
            aria-label={`Colocar o sujeito selecionado no grupo ${box.title}`}
            lang="en"
            className="font-display cursor-pointer rounded-full px-5 py-1 text-[30px] leading-none font-extrabold outline-none focus-visible:ring-4 focus-visible:ring-[#FFD76A]"
            style={{ color: box.color }}
          >
            {box.title}
          </button>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {SUBJECTS.filter((s) => placed[s.word] === box.group).map((s) => (
              <span
                key={s.word}
                lang="en"
                className="font-display rounded-[14px] border-4 border-[#58CDB5] bg-[#E8FBF5] px-4 py-1 text-[26px] leading-none font-extrabold text-[#1F7A67] motion-safe:animate-[wv-bounce_380ms_ease-out]"
              >
                {s.word} ✓
              </span>
            ))}
          </div>
        </div>
      ))}

      <div className="absolute bottom-[122px] left-[240px] flex w-[920px] flex-wrap justify-center gap-3">
        {remaining.map((s) => (
          <button
            key={s.word}
            type="button"
            lang="en"
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text/plain", s.word)}
            onPointerDown={(e) => {
              if (e.pointerType === "mouse") return;
              (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
              setSelected(s.word);
            }}
            onPointerUp={(e) => {
              if (e.pointerType === "mouse") return;
              const target = document
                .elementFromPoint(e.clientX, e.clientY)
                ?.closest("[data-group]") as HTMLElement | null;
              if (target?.dataset["group"]) {
                drop(target.dataset["group"] as Group, s.word);
              }
            }}
            onClick={() => setSelected(selected === s.word ? null : s.word)}
            aria-pressed={selected === s.word}
            aria-label={`Sujeito ${s.word}${selected === s.word ? ", selecionado" : ""}`}
            className={`font-display min-h-[64px] min-w-[110px] cursor-grab rounded-[16px] border-4 px-6 py-2 text-[28px] leading-none font-extrabold transition-all duration-200 outline-none focus-visible:ring-4 focus-visible:ring-[#FFD76A] motion-safe:hover:-translate-y-[3px] ${
              selected === s.word
                ? "border-[#A995E8] bg-[#F1ECFF] text-[#463089] ring-4 ring-[#A995E8]/40"
                : "border-[#24566B] bg-[#FFFDF5] text-[#183B4A]"
            }`}
          >
            {s.word}
            {selected === s.word && <span className="ml-2 text-[18px]">selecionado</span>}
          </button>
        ))}
      </div>

      {finished && (
        <Note kind="conclusion" style={{ left: 300, top: 356, width: 720 }}>
          O sujeito ajuda a escolher a forma do verbo.
        </Note>
      )}

      <HintButton
        hint="Pense em quantas pessoas o sujeito representa."
        strongHint="He, she e it ficam em goes/plays. I, you, we e they ficam em go/play."
        attempts={attempts}
        left={200}
      />

      <FeedbackSlot inline={fb.inline} left={330} top={566} width={540} />
      <FeedbackModal feedback={fb.feedback} onClose={fb.close} />
    </ScreenFrame>
  );
}
