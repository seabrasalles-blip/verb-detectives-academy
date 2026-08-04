import { AudioButton } from "@/components/game/AudioButton";
import { Instruction } from "@/components/game/Instruction";
import { ScreenFrame } from "@/components/game/ScreenFrame";
import { PartCard } from "@/components/game/Sentence";
import { BG, SCENE } from "@/game/assets";
import { useGame, usePersistentState } from "@/game/state";

const PARTS = [
  { word: "I", role: "subject" as const, note: "quem realiza a ação" },
  { word: "go", role: "verb" as const, note: "a ação: ir" },
  { word: "to school", role: "complement" as const, note: "para onde a pessoa vai" },
];

export function Screen05MeaningGo() {
  const { complete, isDone } = useGame();
  const [shown, setShown] = usePersistentState<number>("s5.shown", 0);
  const done = isDone(5);
  const revealed = done ? PARTS.length : shown;

  const reveal = () => {
    const next = Math.min(revealed + 1, PARTS.length);
    setShown(next);
    if (next === PARTS.length) complete(5);
  };

  return (
    <ScreenFrame background={BG.activity} nextEnabled={done || revealed === PARTS.length}>
      <Instruction top={18} width={620}>
        O verbo go mostra a ação de ir.
      </Instruction>

      <img
        src={SCENE.goSchool}
        alt="Uma criança com mochila indo para a escola"
        width={1024}
        height={768}
        loading="lazy"
        draggable={false}
        className="absolute top-[86px] left-[26px] h-[280px] w-[380px] rounded-[24px] border-4 border-[#24566B] bg-[#FFFDF6] object-contain"
      />

      <div className="absolute top-[92px] left-[452px] w-[520px]">
        <p className="font-display text-[62px] leading-none font-extrabold text-[#FF786A]" lang="en">
          GO
        </p>
        <p className="mt-1 text-[26px] font-bold text-[#183B4A]">
          Go significa <strong>ir</strong>.
        </p>
        <p className="mt-4 text-[34px] leading-none font-extrabold text-[#183B4A]" lang="en">
          I go to school.
        </p>
        <p className="mt-1 text-[23px] font-semibold text-[#24566B]">Eu vou para a escola.</p>
      </div>

      <div className="absolute top-[392px] left-[60px] flex w-[1080px] items-start justify-center gap-8">
        {PARTS.slice(0, revealed).map((p) => (
          <div key={p.word} className="flex flex-col items-center gap-1">
            <PartCard word={p.word} role={p.role} labels size="md" />
            <span className="max-w-[240px] text-center text-[18px] font-bold text-[#24566B]">
              {p.note}
            </span>
          </div>
        ))}
      </div>

      {revealed < PARTS.length && !done && (
        <button
          type="button"
          onClick={reveal}
          className="font-display absolute bottom-[34px] left-[420px] cursor-pointer rounded-full border-4 border-[#A995E8] bg-[#F1ECFF] px-8 py-3 text-[23px] font-extrabold text-[#4B3B8F] shadow-[0_5px_0_rgba(36,86,107,0.16)] outline-none focus-visible:ring-4 focus-visible:ring-[#FFD76A] motion-safe:hover:-translate-y-[2px]"
        >
          Descobrir a próxima parte
        </button>
      )}

      <AudioButton text="I go to school." left={220} label="Ouvir a frase correta: I go to school." />
    </ScreenFrame>
  );
}
