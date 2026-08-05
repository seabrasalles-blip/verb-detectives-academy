import { useCallback, useEffect, useId, useRef, useState } from "react";
import { LEX } from "@/game/assets";

export type FeedbackTone =
  | "clue"
  | "hypothesis"
  | "conclusion"
  | "correct"
  | "stage"
  | "case"
  | "wrong";

export type Feedback = {
  tone: FeedbackTone;
  message: string;
  /** Fecha sozinho depois de alguns segundos (sempre com botão visível). */
  auto?: boolean;
} | null;

const AUTO_MS = 4200;

const TONE = {
  clue: {
    kicker: "Pista encontrada!",
    color: "#2A7FB0",
    border: "#52B7E8",
    pose: "pointing" as const,
    alt: "Lex apontando para a pista encontrada",
    action: "Continuar",
  },
  hypothesis: {
    kicker: "Nossa hipótese",
    color: "#5B45A8",
    border: "#A995E8",
    pose: "thinking" as const,
    alt: "Lex pensando sobre a hipótese",
    action: "Vamos testar",
  },
  conclusion: {
    kicker: "Descoberta!",
    color: "#2C9C86",
    border: "#58CDB5",
    pose: "celebrating" as const,
    alt: "Lex comemorando a descoberta",
    action: "Continuar",
  },
  correct: {
    kicker: "Pista confirmada!",
    color: "#2C9C86",
    border: "#58CDB5",
    pose: "celebrating" as const,
    alt: "Lex comemorando o acerto",
    action: "Continuar",
  },
  stage: {
    kicker: "Etapa concluída!",
    color: "#2C9C86",
    border: "#58CDB5",
    pose: "celebrating" as const,
    alt: "Lex comemorando o fim da etapa",
    action: "Continuar",
  },
  case: {
    kicker: "Caso resolvido!",
    color: "#2C9C86",
    border: "#58CDB5",
    pose: "celebrating" as const,
    alt: "Lex comemorando o caso resolvido",
    action: "Continuar",
  },
  wrong: {
    kicker: "Vamos observar de novo",
    color: "#D9503F",
    border: "#FF786A",
    pose: "thinking" as const,
    alt: "Lex pensando junto com você",
    action: "Tentar de novo",
  },
} satisfies Record<FeedbackTone, unknown> as Record<
  FeedbackTone,
  {
    kicker: string;
    color: string;
    border: string;
    pose: keyof typeof LEX;
    alt: string;
    action: string;
  }
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
    /** Acerto dentro de uma questão. */
    correct: (message: string, onDone?: () => void) => show("correct", message, onDone),
    /** Fim de uma atividade ou conjunto de rodadas. */
    stage: (message: string, onDone?: () => void) => show("stage", message, onDone),
    /** Somente no encerramento do aplicativo. */
    solved: (message: string, onDone?: () => void) => show("case", message, onDone),
    wrong: (message: string) => show("wrong", message),
  };
}

/** Deixa o restante da tela inerte enquanto o diálogo estiver aberto. */
function useInertSiblings(overlay: HTMLElement | null, active: boolean) {
  useEffect(() => {
    if (!active || !overlay?.parentElement) return;
    const siblings = Array.from(overlay.parentElement.children).filter(
      (el): el is HTMLElement => el instanceof HTMLElement && el !== overlay,
    );
    const previous = siblings.map((el) => el.hasAttribute("inert"));
    siblings.forEach((el) => el.setAttribute("inert", ""));
    return () => {
      siblings.forEach((el, i) => {
        if (!previous[i]) el.removeAttribute("inert");
      });
    };
  }, [overlay, active]);
}

export function FeedbackModal({
  feedback,
  onClose,
}: {
  feedback: Feedback;
  onClose: () => void;
}) {
  const [overlay, setOverlay] = useState<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const messageId = useId();

  useInertSiblings(overlay, !!feedback);

  useEffect(() => {
    if (!feedback) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    dialog?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialog) return;
      const focusables = Array.from(
        dialog.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])'),
      ).filter((el) => !el.hasAttribute("disabled"));
      if (!focusables.length) {
        e.preventDefault();
        dialog.focus();
        return;
      }
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || active === dialog)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      const target = previousFocus.current;
      if (target && document.contains(target)) target.focus();
    };
  }, [feedback, onClose]);

  if (!feedback) return null;
  const tone = TONE[feedback.tone];

  return (
    <div
      ref={(node) => setOverlay(node)}
      className="absolute inset-0 z-50 flex items-end justify-center bg-[#183B4A]/25 pb-[70px] motion-safe:animate-[wv-fade_200ms_ease-out]"
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div
        ref={dialogRef}
        role={feedback.tone === "wrong" ? "alertdialog" : "dialog"}
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={messageId}
        tabIndex={-1}
        className={`flex max-w-[860px] items-center gap-5 rounded-[26px] border-[5px] bg-[#FFFDF6] py-4 pr-7 pl-5 shadow-[0_10px_30px_rgba(24,59,74,0.28)] outline-none ${
          feedback.tone === "wrong"
            ? "motion-safe:animate-[wv-shake_320ms_ease-out]"
            : "motion-safe:animate-[wv-bounce_420ms_ease-out]"
        }`}
        style={{ borderColor: tone.border }}
      >
        <img
          src={LEX[tone.pose]}
          alt={tone.alt}
          className="h-[168px] w-auto shrink-0 select-none"
          draggable={false}
        />
        <div>
          <p
            id={titleId}
            className="font-display text-[18px] font-extrabold tracking-[0.14em] uppercase"
            style={{ color: tone.color }}
          >
            {tone.kicker}
          </p>
          <p
            id={messageId}
            className="mt-1 max-w-[520px] text-[24px] leading-snug font-semibold text-[#183B4A]"
          >
            {feedback.message}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="ml-2 shrink-0 cursor-pointer rounded-full border-4 px-6 py-3 text-[20px] font-extrabold transition-transform outline-none focus-visible:ring-4 focus-visible:ring-[#FFD76A] motion-safe:hover:scale-[1.04]"
          style={{
            borderColor: tone.border,
            color: tone.color,
            backgroundColor: "#FFFDF6",
          }}
        >
          {tone.action}
        </button>
      </div>
    </div>
  );
}

/** Região viva anunciada por leitores de tela, sempre montada. */
export function FeedbackAnnouncer({ feedback }: { feedback: Feedback }) {
  return (
    <div className="sr-only" aria-live="assertive" role="status">
      {feedback ? `${TONE[feedback.tone].kicker}. ${feedback.message}` : ""}
    </div>
  );
}
