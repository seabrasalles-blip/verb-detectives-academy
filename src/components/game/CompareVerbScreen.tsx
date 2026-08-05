import { InlineAudioButton } from "@/components/game/AudioButton";
import { CharacterLayer } from "@/components/game/CharacterLayer";
import { FeedbackModal, useFeedback } from "@/components/game/FeedbackModal";
import { Instruction } from "@/components/game/Instruction";
import { Note } from "@/components/game/Note";
import { ScreenFrame } from "@/components/game/ScreenFrame";
import { PartCard, type Role } from "@/components/game/Sentence";
import { BG } from "@/game/assets";
import { useGame, usePersistentState } from "@/game/state";
import type { ReactNode } from "react";

export type CompareToken = {
  id: string;
  word: string;
  /** Terminação (s / es) — só é destacada depois da conclusão. */
  suffix?: string;
  role: Role;
  question?: string;
};

export type RuleGroup = { subjects: string; verb: string; suffix?: string };

type Props = {
  screen: number;
  /** Prefixo das chaves de persistência, ex.: "s11". */
  stateKey: string;
  firstSentence: CompareToken[];
  secondSentence: CompareToken[];
  /** Alternativas da fase de comparação; exatamente uma correta. */
  options: { text: string; correct: boolean }[];
  /** Mensagem do modal de conclusão (após o acerto). */
  conclusion: string;
  /** Dica exibida quando a alternativa está errada. */
  wrongHint?: string;
  /** Quando informado, a tela entra numa fase final de regra com dois painéis. */
  ruleGroups?: [RuleGroup, RuleGroup];
  ruleTitle?: string;
  ruleSynthesis?: ReactNode;
  /** Exemplos curtos da fase da regra (o segundo recebe o áudio). */
  ruleExamples?: { text: string; audio?: boolean; audioLabel?: string }[];
  /** Nota de conclusão usada quando não há fase de regra. */
  conclusionNote?: ReactNode;
};

/** Colunas fixas: as duas frases ficam perfeitamente alinhadas. */
const W: Record<Role, number> = { subject: 140, verb: 180, complement: 240 };
const GAP = 16;
const ROW_WIDTH = W.subject + W.verb + W.complement + GAP * 2;
const ROW_LEFT = 330;
const PANEL_LEFT = 268;
const PANEL_WIDTH = ROW_LEFT - PANEL_LEFT + ROW_WIDTH + 16;

/**
 * Comparação de duas frases em três fases:
 * identificação (toques) → comparação (o que mudou?) → regra.
 * Compartilhada por GO (tela 06) e PLAY (tela 11).
 */
export function CompareVerbScreen({
  screen,
  stateKey,
  firstSentence,
  secondSentence,
  options,
  conclusion,
  wrongHint = "Compare as palavras que indicam a ação.",
  ruleGroups,
  ruleTitle = "Descobrimos a regra do verbo.",
  ruleSynthesis,
  ruleExamples = [],
  conclusionNote,
}: Props) {
  const { complete, isDone, registerMiss } = useGame();
  const done = isDone(screen);
  const [step, setStep] = usePersistentState<number>(`${stateKey}.step`, 0);
  const [answered, setAnswered] = usePersistentState<boolean>(`${stateKey}.answered`, false);
  const fb = useFeedback();

  const steps = [
    { target: firstSentence[0]!.id, prompt: "Toque no sujeito da primeira frase." },
    { target: firstSentence[1]!.id, prompt: "Agora toque no verbo da primeira frase." },
    { target: secondSentence[0]!.id, prompt: "Toque no sujeito da segunda frase." },
    { target: secondSentence[1]!.id, prompt: "Agora toque no verbo da segunda frase." },
  ];

  const current = steps[Math.min(step, steps.length - 1)]!;
  const stepsDone = done || step >= steps.length;
  const revealed = done || answered;
  const busy = fb.feedback !== null;
  const rulePhase = revealed && !!ruleGroups;

  const tap = (t: CompareToken) => {
    if (stepsDone || busy) return;
    if (t.id === current.target) {
      setStep(step + 1);
      fb.clue(
        t.role === "subject"
          ? "Isso! Esse é o sujeito: mostra quem realiza a ação."
          : "Isso! Esse é o verbo: mostra a ação.",
      );
      return;
    }
    fb.clue(
      t.role === "complement"
        ? "Essa palavra completa a ideia. Procure a palavra pedida na instrução."
        : t.role === "subject"
          ? "Essa palavra mostra quem realiza a ação. Leia a instrução de novo."
          : "Essa palavra mostra a ação. Leia a instrução de novo.",
    );
  };

  const answer = (opt: { correct: boolean }) => {
    if (revealed || busy) return;
    if (opt.correct) {
      setAnswered(true);
      fb.conclusion(conclusion, () => complete(screen));
    } else {
      registerMiss();
      fb.wrong(wrongHint);
    }
  };

  const row = (tokens: CompareToken[], top: number, index: number) => (
    <div className="absolute flex items-start" style={{ top, left: ROW_LEFT, gap: GAP }}>
      <span
        aria-hidden="true"
        className="font-display mt-2 -ml-[44px] flex h-[34px] w-[34px] items-center justify-center rounded-full border-[3px] border-[#24566B] bg-[#FFFDF6] text-[18px] font-extrabold text-[#24566B]"
      >
        {index}
      </span>
      {tokens.map((t) => {
        const idx = steps.findIndex((s) => s.target === t.id);
        const showRole = idx === -1 ? stepsDone : done || step > idx;
        const clickable = !stepsDone && !busy;
        return (
          <PartCard
            key={t.id}
            word={t.suffix && !revealed ? t.word + t.suffix : t.word}
            {...(t.suffix && revealed ? { suffix: t.suffix } : {})}
            {...(showRole ? { role: t.role } : {})}
            question={t.question}
            labels={showRole}
            compactLabels
            size="sm"
            width={W[t.role]}
            {...(clickable ? { onClick: () => tap(t) } : {})}
            ariaLabel={`Palavra ${t.suffix ? t.word + t.suffix : t.word}`}
          />
        );
      })}
    </div>
  );

  return (
    <ScreenFrame background={BG.activity} showNext={revealed} nextEnabled={revealed}>
      {rulePhase ? (
        <CharacterLayer pose="pointing" height={280} left={2} bottom={60} scale={1.08} />
      ) : (
        <CharacterLayer pose="thinking" height={280} left={4} bottom={70} scale={1.1} />
      )}

      <Instruction top={16} width={760}>
        {rulePhase ? ruleTitle : stepsDone ? "O que mudou entre as duas frases?" : current.prompt}
      </Instruction>

      {rulePhase && ruleGroups ? (
        <>
          {ruleGroups.map((g, i) => (
            <div
              key={g.subjects}
              className="absolute flex flex-col items-center justify-center gap-1 rounded-[24px] border-4 border-[#52B7E8] bg-[#FFFDF6] shadow-[0_4px_0_rgba(36,86,107,0.10)]"
              style={{ left: i === 0 ? 300 : 700, top: 100, width: 390, height: 190 }}
            >
              <p
                lang="en"
                className="font-display text-[28px] leading-none font-extrabold text-[#463089]"
              >
                {g.subjects}
              </p>
              <p className="text-[26px] font-bold text-[#24566B]">↓</p>
              <p
                lang="en"
                className="font-display text-[46px] leading-none font-extrabold text-[#B93B2B]"
              >
                {g.verb}
                {g.suffix && (
                  <span className="rounded bg-[#FFD76A] px-1 text-[#7A4E00]">{g.suffix}</span>
                )}
              </p>
            </div>
          ))}

          <div
            className="absolute rounded-[20px] border-4 border-[#52B7E8] bg-[#FFFDF6] px-8 py-3 text-center"
            style={{ left: 300, top: 310, width: 790 }}
          >
            <p className="text-[23px] leading-snug font-bold text-[#183B4A]">{ruleSynthesis}</p>
          </div>

          {ruleExamples.length > 0 && (
            <div
              className="absolute rounded-[20px] border-4 border-[#52B7E8] bg-[#F4FAFF]/95"
              style={{ left: 300, top: 396, width: 790, height: 132 }}
            >
              {ruleExamples.map((ex, i) => (
                <div key={ex.text}>
                  <span
                    lang="en"
                    className="absolute text-[26px] font-extrabold text-[#183B4A]"
                    style={{ left: 28, top: 16 + i * 58 }}
                  >
                    {ex.text}
                  </span>
                  {ex.audio && (
                    <InlineAudioButton
                      text={ex.text}
                      {...(ex.audioLabel ? { label: ex.audioLabel } : {})}
                      width={112}
                      left={640}
                      top={8 + i * 58}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

        </>
      ) : (
        <>
          <div
            className="absolute rounded-[24px] border-4 border-[#52B7E8] bg-[#F4FAFF]/95 shadow-[0_4px_0_rgba(36,86,107,0.10)]"
            style={{ left: PANEL_LEFT, top: 96, width: PANEL_WIDTH, height: 250 }}
          />
          {row(firstSentence, 110, 1)}
          {row(secondSentence, 240, 2)}

          {stepsDone && !revealed && (
            <div
              className="absolute flex flex-col items-stretch"
              style={{ top: 356, left: 340, width: 700, gap: 8 }}
            >
              {options.map((o) => (
                <button
                  key={o.text}
                  type="button"
                  onClick={() => answer(o)}
                  disabled={busy}
                  className="font-display inline-flex min-h-[58px] w-full cursor-pointer items-center justify-center rounded-[18px] border-4 border-[#24566B] bg-[#FFFDF5] px-6 text-[22px] leading-tight font-extrabold text-[#183B4A] shadow-[0_4px_0_rgba(36,86,107,0.16)] transition-all duration-200 outline-none focus-visible:ring-4 focus-visible:ring-[#FFD76A] disabled:cursor-not-allowed disabled:opacity-70 motion-safe:hover:-translate-y-[2px]"
                >
                  {o.text}
                </button>
              ))}
            </div>
          )}

          {revealed && conclusionNote && (
            <Note kind="conclusion" style={{ left: 340, top: 380, width: 700 }}>
              {conclusionNote}
            </Note>
          )}
        </>
      )}

      <FeedbackModal feedback={fb.feedback} onClose={fb.close} />
    </ScreenFrame>
  );
}
