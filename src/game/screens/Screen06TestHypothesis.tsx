import { CharacterLayer } from "@/components/game/CharacterLayer";
import { FeedbackModal, useFeedback } from "@/components/game/FeedbackModal";
import { Instruction } from "@/components/game/Instruction";
import { Note } from "@/components/game/Note";
import { ScreenFrame } from "@/components/game/ScreenFrame";
import { PartCard, type Role } from "@/components/game/Sentence";
import { WordOption } from "@/components/game/WordOption";
import { BG } from "@/game/assets";
import { useGame, usePersistentState } from "@/game/state";

type Tok = { id: string; word: string; suffix?: string; role: Role };

const S1: Tok[] = [
  { id: "s1-sub", word: "I", role: "subject" },
  { id: "s1-verb", word: "go", role: "verb" },
  { id: "s1-comp", word: "to school", role: "complement" },
];
const S2: Tok[] = [
  { id: "s2-sub", word: "He", role: "subject" },
  { id: "s2-verb", word: "go", suffix: "es", role: "verb" },
  { id: "s2-comp", word: "to school", role: "complement" },
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

export function Screen06TestHypothesis() {
  const { complete, isDone, registerMiss } = useGame();
  const done = isDone(6);
  const [step, setStep] = usePersistentState<number>("s6.step", 0);
  const [answered, setAnswered] = usePersistentState<boolean>("s6.answered", false);
  const fb = useFeedback();

  const current = STEPS[Math.min(step, STEPS.length - 1)]!;
  const stepsDone = done || step >= STEPS.length;
  const revealed = done || answered;

  const tap = (t: Tok) => {
    if (stepsDone) return;
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
    if (revealed) return;
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
    <div className="absolute flex items-start gap-3" style={{ top, left: 360 }}>
      <span className="font-display mt-2 w-[34px] text-[24px] font-extrabold text-[#24566B]">
        {index}.
      </span>
      {tokens.map((t) => {
        const shown = done || step > STEPS.findIndex((s) => s.target === t.id);
        const isTarget = STEPS.some((s) => s.target === t.id);
        const showRole = !isTarget ? stepsDone : shown;
        return (
          <PartCard
            key={t.id}
            word={t.suffix && !revealed ? t.word + t.suffix : t.word}
            {...(t.suffix && revealed ? { suffix: t.suffix } : {})}
            {...(showRole ? { role: t.role } : {})}
            labels={showRole}
            size="md"
            {...(stepsDone ? {} : { onClick: () => tap(t) })}
            ariaLabel={`Palavra ${t.suffix ? t.word + t.suffix : t.word}`}
          />
        );
      })}
    </div>
  );

  return (
    <ScreenFrame background={BG.activity} nextEnabled={revealed}>
      <CharacterLayer pose="thinking" height={220} left={8} bottom={120} />

      <Instruction top={16} width={760}>
        {stepsDone ? "O que mudou entre as duas frases?" : current.prompt}
      </Instruction>

      {row(S1, 66, 1)}
      {row(S2, 196, 2)}

      {stepsDone && !revealed && (
        <div className="absolute bottom-[30px] left-[240px] flex w-[900px] flex-col items-center gap-2">
          {OPTIONS.map((o) => (
            <WordOption key={o.text} size="sm" onClick={() => answer(o)} ariaLabel={o.text}>
              <span className="text-[24px]">{o.text}</span>
            </WordOption>
          ))}
        </div>
      )}

      {revealed && (
        <Note kind="conclusion" style={{ left: 300, top: 372, width: 700 }}>
          <span lang="en">I → go</span> · <span lang="en">He → goes</span> — com he, o verbo
          recebe <span className="rounded bg-[#FFD76A] px-1 text-[#7A4E00]">es</span>.
        </Note>
      )}

      <FeedbackModal feedback={fb.feedback} onClose={fb.close} />
    </ScreenFrame>
  );
}
