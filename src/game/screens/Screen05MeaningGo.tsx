import { AudioButton } from "@/components/game/AudioButton";
import { Instruction } from "@/components/game/Instruction";
import { InvestigationStepButton } from "@/components/game/InvestigationStepButton";
import { ScreenFrame } from "@/components/game/ScreenFrame";
import { SentenceRow } from "@/components/game/Sentence";
import { BG, SCENE } from "@/game/assets";
import { useGame, usePersistentState } from "@/game/state";

const TOKENS = [
  { word: "I", role: "subject" as const },
  { word: "go", role: "verb" as const },
  { word: "to school", role: "complement" as const, question: "para onde?" },
];

/** 0 = observar · 1 = significado · 2 = análise completa */
export function Screen05MeaningGo() {
  const { complete, isDone } = useGame();
  const [stage, setStage] = usePersistentState<number>("s5.stage", 0);
  const done = isDone(5);
  const phase = done ? 2 : stage;

  const advance = () => {
    const next = Math.min(phase + 1, 2);
    setStage(next);
    if (next === 2) complete(5);
  };

  return (
    <ScreenFrame background={BG.activity} nextEnabled={phase === 2}>
      <Instruction top={18} width={700}>
        {phase === 0
          ? "Observe a cena e leia a frase."
          : phase === 1
            ? "Agora leia o significado da frase."
            : "Veja as partes da frase."}
      </Instruction>

      <img
        src={SCENE.goSchool}
        alt="Uma criança com mochila indo para a escola"
        width={360}
        height={270}
        loading="lazy"
        draggable={false}
        className="absolute rounded-[24px] border-4 border-[#24566B] bg-[#FFFDF6] object-contain"
        style={{ left: 35, top: 105, width: 360, height: 270 }}
      />

      <div className="absolute" style={{ left: 440, top: 108, width: 620 }}>
        <p className="font-display text-[58px] leading-none font-extrabold text-[#FF786A]" lang="en">
          GO
        </p>
        <p className="mt-3 text-[36px] leading-none font-extrabold text-[#183B4A]" lang="en">
          I go to school.
        </p>
        {phase >= 1 && (
          <div className="mt-4 motion-safe:animate-[wv-rise_400ms_ease-out]">
            <p className="text-[24px] leading-snug font-bold text-[#183B4A]">
              Go significa <strong>ir</strong>.
            </p>
            <p className="mt-1 text-[24px] leading-snug font-semibold text-[#24566B]">
              Eu vou para a escola.
            </p>
          </div>
        )}
      </div>

      {phase === 2 && (
        <div
          className="absolute flex flex-col items-center gap-3 motion-safe:animate-[wv-rise_400ms_ease-out]"
          style={{ left: 270, top: 392, width: 660 }}
        >
          <div className="w-full rounded-[24px] border-4 border-[#52B7E8] bg-[#F4FAFF]/95 px-4 py-3 shadow-[0_4px_0_rgba(36,86,107,0.10)]">
            <SentenceRow tokens={TOKENS} labels fixedColumns compactLabels size="sm" />
          </div>
          <p className="w-full text-center text-[22px] leading-snug font-bold text-[#183B4A]">
            O sujeito mostra quem realiza a ação; o verbo mostra a ação.
          </p>
        </div>
      )}

      {phase < 2 && (
        <InvestigationStepButton left={450} top={430} width={300} onClick={advance}>
          {phase === 0 ? "Descobrir o significado" : "Analisar a frase"}
        </InvestigationStepButton>
      )}

      <AudioButton
        text="I go to school."
        left={220}
        label="Ouvir a frase em inglês: I go to school."
      />
    </ScreenFrame>
  );
}
