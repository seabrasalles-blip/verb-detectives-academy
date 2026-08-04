import { useCallback, useEffect, useRef, useState } from "react";
import { LEX } from "@/game/assets";

export type FeedbackTone = "clue" | "hypothesis" | "conclusion" | "correct" | "wrong";

export type Feedback = {
  tone: FeedbackTone;
  message: string;
  /** Fecha sozinho depois de alguns segundos (usado nos acertos). */
  auto?: boolean;
} | null;

const AUTO_MS = 2800;

const TONE = {
  clue: {
    kicker: "Pista",
    color: "#2A7FB0",
    border: "#52B7E8",
    pose: "pointing" as const,
    alt: "Lex apontando para a pista encontrada",
    action: "Continuar",
  },
  hypothesis: {
    kicker: "Hipótese",
    color: "#5B45A8",
    border: "#A995E8",
    pose: "thinking" as const,
    alt: "Lex pensando sobre a hipótese",
    action: "Vamos testar",
  },
  conclusion: {
    kicker: "Conclusão",
    color: "#2C9C86",
    border: "#58CDB5",
    pose: "celebrating" as const,
    alt: "Lex comemorando a conclusão",
    action: "Continuar",
  },
  correct: {
    kicker: "Caso resolvido",
    color: "#2C9C86",
    border: "#58CDB5",
    pose: "celebrating" as const,
    alt: "Lex comemorando o acerto",
    action: "Continuar",
  },
  wrong: {
    kicker: "Vamos olhar de novo",
    color: "#D9503F",
    border: "#FF786A",
    pose: "thinking" as const,
    alt: "Lex pensando junto com você",
    action: "Tentar de novo",
  },
} satisfies Record<FeedbackTone, unknown> as Record<
  FeedbackTone,
  { kicker: string; color: string; border: string; pose: keyof typeof LEX; alt: string; action: string }
>;

export function useFeedback() {
  const [feedback, setFeedback] = useState<Feedback>(null);
  const timer = useRef<number | undefined>(undefined);
  const onDoneRef = useRef<(() => void) | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const close = useCallback(() => {
    window.clearTimeout(timer.current);
    setFeedback(null);
    const done = onDoneRef.current;
    onDoneRef.current = undefined;
    done?.();
  }, []);

  const show = useCallback(
    (tone: FeedbackTone, message: string, onDone?: () => void, auto = false) => {
      window.clearTimeout(timer.current);
      onDoneRef.current = onDone;
      setFeedback({ tone, message, auto });
      if (auto) {
        timer.current = window.setTimeout(() => {
          setFeedback(null);
          const done = onDoneRef.current;
          onDoneRef.current = undefined;
          done?.();
        }, AUTO_MS);
      }
    },
    [],
  );

  return {
    feedback,
    close,
    show,
    clue: (message: string, onDone?: () => void) => show("clue", message, onDone),
    hypothesis: (message: string, onDone?: () => void) => show("hypothesis", message, onDone),
    conclusion: (message: string, onDone?: () => void) => show("conclusion", message, onDone),
    correct: (message: string, onDone?: () => void) => show("correct", message, onDone, true),
    wrong: (message: string) => show("wrong", message),
  };
}

export function FeedbackModal({
  feedback,
  onClose,
}: {
  feedback: Feedback;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!feedback) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    actionRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab") {
        // Foco preso no diálogo enquanto o feedback estiver aberto.
        e.preventDefault();
        actionRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previousFocus.current?.focus?.();
    };
  }, [feedback, onClose]);

  return (
    <>
      <div className="sr-only" aria-live="assertive" role="status">
        {feedback ? `${TONE[feedback.tone].kicker}. ${feedback.message}` : ""}
      </div>
      {feedback && (
        <div
          className="absolute inset-0 z-50 flex items-end justify-center bg-[#183B4A]/25 pb-[70px] motion-safe:animate-[wv-fade_200ms_ease-out]"
          onPointerDown={(e) => {
            // Bloqueia qualquer interação com o fundo.
            e.stopPropagation();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={TONE[feedback.tone].kicker}
            className={`flex max-w-[820px] items-center gap-5 rounded-[26px] border-[5px] bg-[#FFFDF6] py-4 pr-7 pl-5 shadow-[0_10px_30px_rgba(24,59,74,0.28)] ${
              feedback.tone === "wrong"
                ? "motion-safe:animate-[wv-shake_320ms_ease-out]"
                : "motion-safe:animate-[wv-bounce_420ms_ease-out]"
            }`}
            style={{ borderColor: TONE[feedback.tone].border }}
          >
            <img
              src={LEX[TONE[feedback.tone].pose]}
              alt={TONE[feedback.tone].alt}
              className="h-[168px] w-auto shrink-0 select-none"
              draggable={false}
            />
            <div>
              <p
                className="font-display text-[17px] font-extrabold tracking-[0.14em] uppercase"
                style={{ color: TONE[feedback.tone].color }}
              >
                {TONE[feedback.tone].kicker}
              </p>
              <p className="mt-1 max-w-[520px] text-[24px] leading-snug font-semibold text-[#183B4A]">
                {feedback.message}
              </p>
            </div>
            {!feedback.auto && (
              <button
                ref={actionRef}
                type="button"
                onClick={onClose}
                className="ml-2 shrink-0 cursor-pointer rounded-full border-4 px-6 py-3 text-[20px] font-extrabold transition-transform outline-none focus-visible:ring-4 focus-visible:ring-[#FFD76A] motion-safe:hover:scale-[1.04]"
                style={{
                  borderColor: TONE[feedback.tone].border,
                  color: TONE[feedback.tone].color,
                  backgroundColor: "#FFFDF6",
                }}
              >
                {TONE[feedback.tone].action}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
