import { AudioButton } from "@/components/game/AudioButton";
import { Instruction } from "@/components/game/Instruction";
import { InvestigationStepButton } from "@/components/game/InvestigationStepButton";
import { ScreenFrame } from "@/components/game/ScreenFrame";
import { SentenceRow, type Token } from "@/components/game/Sentence";
import { BG } from "@/game/assets";
import { useGame, usePersistentState } from "@/game/state";
import type { ReactNode } from "react";

export type MeaningPhase = 0 | 1 | 2;

type Props = {
  /** Número da tela (para marcar como concluída). */
  screen: number;
  /** Chave de persistência, ex.: "s9.phase". */
  stateKey: string;
  /** Verbo em destaque, ex.: "PLAY". */
  verb: string;
  /** Significado curto em português. */
  meaning: ReactNode;
  /** Frase completa e correta em inglês. */
  phrase: string;
  /** Tradução da frase. */
  translation: string;
  scene: string;
  sceneAlt: string;
  /** Zoom interno da ilustração (compensa margens brancas do asset). */
  sceneScale?: number;
  tokens?: Token[];
  audioLabel: string;
  /** Instruções de cada estado. */
  instructions?: [string, string, string];
  /** Síntese curta abaixo da análise (máx. 2 linhas). */
  synthesis?: string;
  /** Quando false, a tela termina no estado de significado (sem análise gramatical). */
  withAnalysis?: boolean;
};

const DEFAULT_INSTRUCTIONS: [string, string, string] = [
  "Observe a cena e leia a frase.",
  "O que a cena nos ajuda a entender?",
  "Veja as partes da frase.",
];

/**
 * Tela de significado de um verbo, em três estados progressivos:
 * 0 = observar · 1 = significado · 2 = análise completa.
 * Compartilhada por GO (tela 05) e PLAY (tela 09).
 */
export function MeaningVerbScreen({
  screen,
  stateKey,
  verb,
  meaning,
  phrase,
  translation,
  scene,
  sceneAlt,
  sceneScale = 1.28,
  tokens = [],
  audioLabel,
  instructions = DEFAULT_INSTRUCTIONS,
  synthesis = "O sujeito mostra quem realiza a ação; o verbo mostra a ação.",
  withAnalysis = true,
}: Props) {
  const { complete, isDone } = useGame();
  const [stored, setStored] = usePersistentState<number>(stateKey, 0);
  const done = isDone(screen);
  const maxPhase = withAnalysis ? 2 : 1;
  const phase = done ? maxPhase : Math.min(Math.max(stored, 0), maxPhase);

  const advance = () => {
    const next = Math.min(phase + 1, maxPhase);
    setStored(next);
    if (next === maxPhase) complete(screen);
  };

  return (
    <ScreenFrame background={BG.activity} showNext={phase === maxPhase} nextEnabled={phase === maxPhase}>
      <Instruction top={18} width={720} attentionKey={phase}>
        {instructions[phase as MeaningPhase]}
      </Instruction>


      <div
        className="absolute overflow-hidden rounded-[24px] border-4 border-[#24566B] bg-[#FFFDF6]"
        style={{ left: 35, top: 105, width: 370, height: 280 }}
      >
        <img
          src={scene}
          alt={sceneAlt}
          loading="lazy"
          draggable={false}
          className="h-full w-full select-none object-contain"
          style={{ objectPosition: "center", transform: `scale(${sceneScale})` }}
        />
      </div>

      {/* Card único de conteúdo: verbo, frase, significado e tradução. */}
      <div
        className="absolute flex flex-col justify-center rounded-[24px] border-4 border-[#52B7E8] px-7 py-5 shadow-[0_6px_0_rgba(36,86,107,0.12)]"
        style={{
          left: 455,
          top: 120,
          width: 560,
          minHeight: phase === 0 ? 145 : phase === 2 ? 220 : 235,
          backgroundColor: "#FFFDF6",
        }}
      >
        <div className="mx-auto w-full max-w-[430px]">
          {phase >= 1 && (
            <p
              className="font-display text-[54px] leading-none font-extrabold text-[#FF786A] motion-safe:animate-[wv-rise_400ms_ease-out]"
              lang="en"
            >
              {verb}
            </p>
          )}
          <p
            className={`text-[34px] leading-tight font-extrabold text-[#183B4A] ${phase >= 1 ? "mt-2.5" : ""}`}
            lang="en"
          >
            {phrase}
          </p>
          {phase >= 1 && (
            <div className="mt-4 motion-safe:animate-[wv-rise_400ms_ease-out]">
              <p className="text-[23px] leading-snug font-bold text-[#183B4A]">{meaning}</p>
              <p className="mt-1.5 text-[22px] leading-snug font-semibold text-[#24566B]">
                {translation}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Áudio junto ao card: o controle lê exatamente a frase exibida. */}
      <InlineAudioButton
        text={phrase}
        label={audioLabel}
        left={1032}
        top={phase === 0 ? 158 : 205}
        width={112}
      />


      {withAnalysis && phase === 2 && (
        <div
          className="absolute flex flex-col items-center gap-3 motion-safe:animate-[wv-rise_400ms_ease-out]"
          style={{ left: 270, top: 392, width: 660 }}
        >
          <div className="w-full rounded-[24px] border-4 border-[#52B7E8] bg-[#F4FAFF]/95 px-4 py-3 shadow-[0_4px_0_rgba(36,86,107,0.10)]">
            <SentenceRow tokens={tokens} labels fixedColumns compactLabels size="sm" />
            <p className="mt-2 border-t-2 border-[#BFE3F7] pt-2 text-center text-[21px] leading-snug font-bold text-[#183B4A]">
              {synthesis}
            </p>
          </div>
        </div>
      )}

      {phase < maxPhase && (
        <InvestigationStepButton left={450} top={430} width={300} onClick={advance}>
          {phase === 0 ? "Descobrir o significado" : "Analisar a frase"}
        </InvestigationStepButton>
      )}
    </ScreenFrame>
  );
}

