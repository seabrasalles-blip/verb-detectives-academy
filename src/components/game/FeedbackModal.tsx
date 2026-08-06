import { useCallback, useEffect, useId, useRef, useState } from "react";
import { LEX } from "@/game/assets";

export type FeedbackTone = "hypothesis" | "wrong" | "correct" | "conclusion";
export type InlineTone = "clue" | "correct" | "warn";

export type Feedback = {
  tone: FeedbackTone;
  message: string;
  /** Título opcional (sobrepõe o título padrão do tom). */
  title?: string;
  /** Rótulo opcional do botão. */
  action?: string;
} | null;

export type InlineFeedback = {
  tone: InlineTone;
  message: string;
  /** Muda a cada chamada: reinicia a animação e o temporizador. */
  id: number;
} | null;

const INLINE_MS = 2200;

const TONE: Record<
  FeedbackTone,
  { title: string; color: string; border: string; pose: keyof typeof LEX; alt: string; action: string }
> = {
  hypothesis: {
    title: "Nossa hipótese",
    color: "#4B3B8F",
    border: "#A995E8",
    pose: "thinking",
    alt: "Lex pensando sobre a hipótese",
    action: "Vamos testar",
  },
  wrong: {
    title: "Vamos olhar de novo",
    color: "#B93B2B",
    border: "#FF786A",
    pose: "thinking",
    alt: "Lex pensando junto com você",
    action: "Tentar novamente",
  },
  correct: {
    title: "Muito bem!",
    color: "#1F7A67",
    border: "#58CDB5",
    pose: "celebrating",
    alt: "Lex comemorando o acerto",
    action: "Continuar",
  },
  conclusion: {
    title: "Descoberta confirmada",
    color: "#1F7A67",
    border: "#58CDB5",
    pose: "celebrating",
    alt: "Lex comemorando a descoberta",
    action: "Continuar",
  },
};

const INLINE_STYLE: Record<InlineTone, { border: string; bg: string; color: string }> = {
  clue: { border: "#52B7E8", bg: "#E4F4FF", color: "#1F6D96" },
  correct: { border: "#58CDB5", bg: "#E8FBF5", color: "#1F7A67" },
  warn: { border: "#FFD76A", bg: "#FFF6DF", color: "#7A4E00" },
};

type Options = { title?: string; action?: string };

/**
 * Dois níveis de feedback:
 * - inline (pistas e microconfirmações): não bloqueia, some sozinho;
 * - modal (hipótese, erro, acerto, conclusão): bloqueia e exige um clique.
 */
export function useFeedback() {
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [inline, setInline] = useState<InlineFeedback>(null);
  const inlineTimer = useRef<number | undefined>(undefined);
  const counter = useRef(0);
  const onDoneRef = useRef<(() => void) | undefined>(undefined);
  const closingRef = useRef(false);

  useEffect(() => () => window.clearTimeout(inlineTimer.current), []);

  const close = useCallback(() => {
    // Executa o callback exatamente uma vez, mesmo com cliques repetidos.
    if (closingRef.current) return;
    closingRef.current = true;
    const done = onDoneRef.current;
    onDoneRef.current = undefined;
    setFeedback(null);
    done?.();
    closingRef.current = false;
  }, []);

  const show = useCallback(
    (tone: FeedbackTone, message: string, onDone?: () => void, options?: Options) => {
      setFeedback((current) => {
        // Impede que um segundo feedback substitua o que já está aberto.
        if (current) return current;
        onDoneRef.current = onDone;
        return {
          tone,
          message,
          ...(options?.title ? { title: options.title } : {}),
          ...(options?.action ? { action: options.action } : {}),
        };
      });
    },
    [],
  );

  const showInline = useCallback((tone: InlineTone, message: string) => {
    window.clearTimeout(inlineTimer.current);
    counter.current += 1;
    setInline({ tone, message, id: counter.current });
    inlineTimer.current = window.setTimeout(() => setInline(null), INLINE_MS);
  }, []);

  return {
    feedback,
    inline,
    isOpen: feedback !== null,
    close,
    show,
    showInline,
    /** Pista curta, sempre inline. */
    clue: (message: string) => showInline("clue", message),
    /** Microconfirmação inline. */
    ok: (message: string) => showInline("correct", message),
    /** Orientação curta inline (sem bloquear). */
    nudge: (message: string) => showInline("warn", message),
    hypothesis: (message: string, onDone?: () => void, options?: Options) =>
      show("hypothesis", message, onDone, options),
    conclusion: (message: string, onDone?: () => void, options?: Options) =>
      show("conclusion", message, onDone, options),
    correct: (message: string, onDone?: () => void, options?: Options) =>
      show("correct", message, onDone, options),
    wrong: (message: string, options?: Options) => show("wrong", message, undefined, options),
  };
}

/** Área reservada de feedback inline: altura estável para não deslocar o layout. */
export function FeedbackSlot({
  inline,
  left = 300,
  top = 572,
  width = 600,
  className = "",
}: {
  inline: InlineFeedback;
  left?: number;
  top?: number;
  width?: number;
  className?: string;
}) {
  const style = inline ? INLINE_STYLE[inline.tone] : null;
  return (
    <div
      className={`absolute flex items-center justify-center ${className}`}
      style={{ left, top, width, height: 62 }}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {inline && style && (
        <p
          key={inline.id}
          className="flex min-h-[54px] items-center rounded-full border-4 px-6 text-center text-[20px] leading-tight font-bold motion-safe:animate-[wv-rise_220ms_ease-out]"
          style={{ borderColor: style.border, backgroundColor: style.bg, color: style.color }}
        >
          {inline.message}
        </p>
      )}
    </div>
  );
}

export function FeedbackModal({
  feedback,
  onClose,
}: {
  feedback: Feedback;
  onClose: () => void;
}) {
  const actionRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const clicked = useRef(false);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    if (!feedback) return;
    clicked.current = false;
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
    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("keydown", onKey, true);
      const previous = previousFocus.current;
      // Só devolve o foco se o elemento anterior ainda existir e estiver ativo.
      if (previous && previous.isConnected && !(previous as HTMLButtonElement).disabled) {
        previous.focus?.();
      }
    };
  }, [feedback, onClose]);

  if (!feedback) return null;

  const tone = TONE[feedback.tone];

  const handleClose = () => {
    if (clicked.current) return;
    clicked.current = true;
    onClose();
  };

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-[#183B4A]/[0.34] motion-safe:animate-[wv-fade_200ms_ease-out]"
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="flex w-[520px] max-w-[520px] min-w-[400px] flex-col items-center gap-2 rounded-[26px] border-[5px] bg-[#FFFDF6] px-9 py-6 text-center shadow-[0_12px_32px_rgba(24,59,74,0.30)] motion-safe:animate-[wv-rise_220ms_ease-out]"
        style={{ borderColor: tone.border }}
      >
        <img
          src={LEX[tone.pose]}
          alt={tone.alt}
          className="h-[140px] w-auto shrink-0 select-none"
          draggable={false}
        />
        <p
          id={titleId}
          className="font-display text-[18px] font-extrabold tracking-[0.12em] uppercase"
          style={{ color: tone.color }}
        >
          {feedback.title ?? tone.title}
        </p>
        <p
          id={descId}
          className="text-[23px] leading-[1.35] font-semibold text-balance text-[#183B4A]"
        >
          {feedback.message}
        </p>
        <button
          ref={actionRef}
          type="button"
          onClick={handleClose}
          className="mt-2 inline-flex min-h-[54px] min-w-[180px] cursor-pointer items-center justify-center rounded-full border-4 px-8 text-[20px] font-extrabold transition-transform outline-none focus-visible:ring-4 focus-visible:ring-[#FFD76A] motion-safe:hover:scale-[1.03]"
          style={{ borderColor: tone.border, color: tone.color, backgroundColor: "#FFFDF6" }}
        >
          {feedback.action ?? tone.action}
        </button>
      </div>
    </div>
  );
}
