import { AudioButton } from "@/components/game/AudioButton";
import { CharacterLayer } from "@/components/game/CharacterLayer";
import { FeedbackModal, useFeedback } from "@/components/game/FeedbackModal";
import { Instruction } from "@/components/game/Instruction";
import { Note } from "@/components/game/Note";
import { ScreenFrame } from "@/components/game/ScreenFrame";
import { PartCard, type Role } from "@/components/game/Sentence";
import { BG } from "@/game/assets";
import { useGame, usePersistentState } from "@/game/state";

type Tok = { id: string; word: string; suffix?: string; role: Role };

const S1: Tok[] = [
  { id: "p1-sub", word: "They", role: "subject" },
  { id: "p1-verb", word: "play", role: "verb" },
  { id: "p1-comp", word: "soccer", role: "complement" },
];
const S2: Tok[] = [
  { id: "p2-sub", word: "She", role: "subject" },
  { id: "p2-verb", word: "play", suffix: "s", role: "verb" },
  { id: "p2-comp", word: "soccer", role: "complement" },
];

const STEPS = [
  { target: "p1-sub", prompt: "Toque no sujeito da primeira frase." },
  { target: "p2-sub", prompt: "Agora toque no sujeito da segunda frase." },
  { target: "p1-verb", prompt: "Toque no verbo da primeira frase." },
  { target: "p2-verb", prompt: "Agora toque no verbo da segunda frase." },
];

export function Screen11ComparePlay() {
  const { complete, isDone } = useGame();
  const done = isDone(11);
  const [step, setStep] = usePersistentState<number>("s11.step", 0);
  const fb = useFeedback();

  const finished = done || step >= STEPS.length;
  const current = STEPS[Math.min(step, STEPS.length - 1)]!;

  const tap = (t: Tok) => {
    if (finished) return;
    if (t.id === current.target) {
      const next = step + 1;
      setStep(next);
      if (next === STEPS.length) {
        fb.conclusion("Com she, o verbo play recebe s: plays.", () => complete(11));
      } else {
        fb.clue(
          t.role === "subject"
            ? "Isso! Esse é o sujeito: quem realiza a ação."
            : "Isso! Esse é o verbo: a ação da frase.",
        );
      }
      return;
    }
    fb.clue(
      t.role === "complement"
        ? "Essa palavra completa a ideia. Procure a palavra pedida na instrução."
        : "Quase! Leia a instrução e procure a palavra pedida nesta frase.",
    );
  };

  const row = (tokens: Tok[], top: number, index: number) => (
    <div className="absolute flex items-start gap-3" style={{ top, left: 380 }}>
      <span className="font-display mt-2 w-[30px] text-[24px] font-extrabold text-[#24566B]">
        {index}.
      </span>
      {tokens.map((t) => {
        const idx = STEPS.findIndex((s) => s.target === t.id);
        const showRole = idx === -1 ? finished : done || step > idx;
        return (
          <PartCard
            key={t.id}
            word={t.suffix && !finished ? t.word + t.suffix : t.word}
            {...(t.suffix && finished ? { suffix: t.suffix } : {})}
            {...(showRole ? { role: t.role } : {})}
            labels={showRole}
            size="md"
            {...(finished ? {} : { onClick: () => tap(t) })}
            ariaLabel={`Palavra ${t.suffix ? t.word + t.suffix : t.word}`}
          />
        );
      })}
    </div>
  );

  return (
    <ScreenFrame background={BG.activity} nextEnabled={finished}>
      <CharacterLayer pose="pointing" height={210} left={6} bottom={120} />

      <Instruction top={14} width={720}>
        {finished ? "O que mudou? O verbo play recebeu s." : current.prompt}
      </Instruction>

      {row(S1, 80, 1)}
      {row(S2, 214, 2)}

      {finished && (
        <>
          <Note kind="conclusion" style={{ left: 300, top: 348, width: 700 }}>
            <span lang="en">play → play</span>
            <span className="rounded bg-[#FFD76A] px-1 text-[#7A4E00]">s</span> — com she, o verbo
            recebe s.
          </Note>
          <div className="absolute top-[458px] left-[300px] flex w-[700px] justify-between text-center">
            <p lang="en" className="font-display text-[26px] font-extrabold text-[#463089]">
              I / You / We / They → <span className="text-[#B93B2B]">PLAY</span>
            </p>
            <p lang="en" className="font-display text-[26px] font-extrabold text-[#463089]">
              He / She / It → <span className="text-[#B93B2B]">PLAYS</span>
            </p>
          </div>
        </>
      )}

      <AudioButton
        text="She plays soccer."
        left={200}
        disabled={!finished}
        label={
          finished
            ? "Ouvir a frase correta: She plays soccer."
            : "O áudio fica disponível depois da comparação"
        }
      />

      <FeedbackModal feedback={fb.feedback} onClose={fb.close} />
    </ScreenFrame>
  );
}
