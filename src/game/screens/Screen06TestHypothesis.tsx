import { CharacterLayer } from "@/components/game/CharacterLayer";
import { FeedbackModal, useFeedback } from "@/components/game/FeedbackModal";
import { Instruction } from "@/components/game/Instruction";
import { Note } from "@/components/game/Note";
import { ScreenFrame } from "@/components/game/ScreenFrame";
import { COLUMN_WIDTH, PartCard, type Role } from "@/components/game/Sentence";
import { BG } from "@/game/assets";
import { useGame, usePersistentState } from "@/game/state";

type Tok = { id: string; word: string; suffix?: string; role: Role; question?: string };

const COMPLEMENT_Q = "para onde?";

const S1: Tok[] = [
  { id: "s1-sub", word: "I", role: "subject" },
  { id: "s1-verb", word: "go", role: "verb" },
  { id: "s1-comp", word: "to school", role: "complement", question: COMPLEMENT_Q },
];
const S2: Tok[] = [
  { id: "s2-sub", word: "He", role: "subject" },
  { id: "s2-verb", word: "go", suffix: "es", role: "verb" },
  { id: "s2-comp", word: "to school", role: "complement", question: COMPLEMENT_Q },
];

const STEPS = [
  { target: "s1-sub", prompt: "Toque no sujeito da primeira frase." },
  { target: "s1-verb", prompt: "Agora toque no verbo da primeira frase." },
  { target: "s2-sub", prompt: "Toque no sujeito da segunda frase." },
  { target: "s2-verb", prompt: "Agora toque no verbo da segunda frase." },
];

const OPTIONS = [
  { text: "O verbo mudou: go virou goes.", correct: true },
  { text: "O complemento mudou.", correct: false },
  { text: "Nada mudou nas duas frases.", correct: false },
];

const GAP = 16;
const ROW_WIDTH = COLUMN_WIDTH.subject + COLUMN_WIDTH.verb + COLUMN_WIDTH.complement + GAP * 2;
const ROW_LEFT = (1200 - ROW_WIDTH) / 2 + 40;

export function Screen06TestHypothesis() {
  const { complete, isDone, registerMiss } = useGame();
  const done = isDone(6);
  const [step, setStep] = usePersistentState<number>("s6.step", 0);
  const [answered, setAnswered] = usePersistentState<boolean>("s6.answered", false);
  const fb = useFeedback();

  const current = STEPS[Math.min(step, STEPS.length - 1)]!;
  const stepsDone = done || step >= STEPS.length;
  const revealed = done || answered;
  const busy = fb.feedback !== null;

  const tap = (t: Tok) => {
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
          ? "Essa palavra mostra quem realiza a ação. Agora procure a ação."
          : "Essa palavra mostra a ação. Agora procure quem realiza a ação.",
    );
  };

  const answer = (opt: (typeof OPTIONS)[number]) => {
    if (revealed || busy) return;
    if (opt.correct) {
      setAnswered(true);
      fb.conclusion("Você encontrou o padrão: quando usamos he, go muda para goes.", () =>
        complete(6),
      );
    } else {
      registerMiss();
      fb.wrong("Compare as duas frases palavra por palavra. Olhe bem para a palavra da ação.");
    }
  };

  const row = (tokens: Tok[], top: number, index: number) => (
    <div className="absolute flex items-start" style={{ top, left: ROW_LEFT, gap: GAP }}>
      <span
        aria-hidden="true"
        className="font-display mt-2 -ml-[46px] flex h-[34px] w-[34px] items-center justify-center rounded-full border-[3px] border-[#24566B] bg-[#FFFDF6] text-[18px] font-extrabold text-[#24566B]"
      >
        {index}
      </span>
      {tokens.map((t) => {
        const identified = done || step > STEPS.findIndex((s) => s.target === t.id);
        const isTarget = STEPS.some((s) => s.target === t.id);
        const showRole = isTarget ? identified : stepsDone;
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
            width={COLUMN_WIDTH[t.role]}
            {...(clickable ? { onClick: () => tap(t) } : {})}
            ariaLabel={`Palavra ${t.suffix ? t.word + t.suffix : t.word}`}
          />
        );
      })}
    </div>
  );

  return (
    <ScreenFrame background={BG.activity} nextEnabled={revealed}>
      <CharacterLayer pose="thinking" height={300} left={4} bottom={40} scale={1.12} />

      <Instruction top={16} width={760}>
        {stepsDone ? "O que mudou entre as duas frases?" : current.prompt}
      </Instruction>

      <div
        className="absolute rounded-[24px] border-4 border-[#52B7E8] bg-[#F4FAFF]/95 shadow-[0_4px_0_rgba(36,86,107,0.10)]"
        style={{ left: 262, top: 96, width: 700, height: 250 }}
      />

      {row(S1, 110, 1)}
      {row(S2, 240, 2)}

      {stepsDone && !revealed && (
        <div
          className="absolute flex flex-col items-stretch"
          style={{ top: 360, left: 380, width: 690, gap: 10 }}
        >
          {OPTIONS.map((o) => (
            <button
              key={o.text}
              type="button"
              onClick={() => answer(o)}
              disabled={busy}
              className="font-display inline-flex min-h-[60px] w-full cursor-pointer items-center justify-center rounded-[18px] border-4 border-[#24566B] bg-[#FFFDF5] px-6 text-[22px] leading-tight font-extrabold text-[#183B4A] shadow-[0_4px_0_rgba(36,86,107,0.16)] transition-all duration-200 outline-none focus-visible:ring-4 focus-visible:ring-[#FFD76A] disabled:cursor-not-allowed disabled:opacity-70 motion-safe:hover:-translate-y-[2px]"
            >
              {o.text}
            </button>
          ))}
        </div>
      )}

      {revealed && (
        <Note kind="conclusion" style={{ left: 380, top: 380, width: 690 }}>
          O verbo mudou: <span lang="en">go</span> virou <span lang="en">goes</span>. Com{" "}
          <span lang="en">he</span>, o verbo recebe{" "}
          <span className="rounded bg-[#FFD76A] px-1 text-[#7A4E00]">es</span>.
        </Note>
      )}

      <FeedbackModal feedback={fb.feedback} onClose={fb.close} />
    </ScreenFrame>
  );
}
