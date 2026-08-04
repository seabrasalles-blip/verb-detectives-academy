import { CharacterLayer } from "@/components/game/CharacterLayer";
import { DialogueBubble } from "@/components/game/DialogueBubble";
import { ScreenFrame } from "@/components/game/ScreenFrame";
import { BG } from "@/game/assets";

const STEPS = [
  { en: "Observe", pt: "observar" },
  { en: "Find a clue", pt: "achar uma pista" },
  { en: "Test your idea", pt: "testar a ideia" },
  { en: "Solve the case", pt: "resolver o caso" },
];

export function Screen02Case() {
  return (
    <ScreenFrame background={BG.investigation}>
      <CharacterLayer pose="pointing" height={330} left={16} bottom={40} />

      <DialogueBubble style={{ left: 300, top: 70, width: 700 }}>
        <p className="text-[27px] leading-snug font-bold">
          Algumas frases de Wordville parecem estranhas. Antes de corrigi-las, vamos observar,
          encontrar pistas e testar nossas ideias.
        </p>
      </DialogueBubble>

      <ol className="absolute bottom-[130px] left-[300px] flex w-[700px] items-stretch justify-between gap-2">
        {STEPS.map((s, i) => (
          <li
            key={s.en}
            className="flex w-[160px] flex-col items-center rounded-[18px] border-4 border-[#52B7E8] bg-[#FFFDF6] px-2 py-2 text-center"
          >
            <span className="font-display text-[15px] font-extrabold text-[#52B7E8]">
              {i + 1}
            </span>
            <span lang="en" className="font-display text-[21px] leading-none font-extrabold text-[#183B4A]">
              {s.en}
            </span>
            <span className="text-[15px] font-bold text-[#24566B]">{s.pt}</span>
          </li>
        ))}
      </ol>
    </ScreenFrame>
  );
}
