import { useEffect, useRef, useState } from "react";
import { LEX } from "@/game/assets";

export type Feedback = { tone: "correct" | "wrong"; message: string } | null;

const CORRECT_MS = 2800;

export function useFeedback() {
  const [feedback, setFeedback] = useState<Feedback>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const close = () => {
    window.clearTimeout(timer.current);
    setFeedback(null);
  };

  return {
    feedback,
    close,
    correct(message: string, onDone?: () => void) {
      window.clearTimeout(timer.current);
      setFeedback({ tone: "correct", message });
      timer.current = window.setTimeout(() => {
        setFeedback(null);
        onDone?.();
      }, CORRECT_MS);
    },
    wrong(message: string) {
      window.clearTimeout(timer.current);
      setFeedback({ tone: "wrong", message });
    },
  };
}

export function FeedbackModal({ feedback, onClose }: { feedback: Feedback; onClose: () => void }) {
  return (
    <div
      aria-live="assertive"
      className="pointer-events-none absolute inset-0 z-40 flex items-end justify-center pb-[96px]"
    >
      {feedback && (
        <div
          role="status"
          className={`pointer-events-auto flex max-w-[760px] items-center gap-5 rounded-[26px] border-[5px] bg-[#FFFDF6] py-4 pr-7 pl-4 shadow-[0_8px_24px_rgba(24,59,74,0.18)] ${
            feedback.tone === "correct"
              ? "border-[#58CDB5] motion-safe:animate-[wv-bounce_420ms_ease-out]"
              : "border-[#FF786A] motion-safe:animate-[wv-shake_320ms_ease-out]"
          }`}
        >
          <img
            src={feedback.tone === "correct" ? LEX.celebrating : LEX.thinking}
            alt={feedback.tone === "correct" ? "Lex comemorando" : "Lex pensando"}
            className="h-[104px] w-auto select-none"
            draggable={false}
          />
          <div>
            <p
              className="font-display text-[16px] font-extrabold tracking-[0.14em] uppercase"
              style={{ color: feedback.tone === "correct" ? "#2C9C86" : "#D9503F" }}
            >
              {feedback.tone === "correct" ? "Pista certa" : "Quase lá"}
            </p>
            <p className="mt-1 max-w-[520px] text-[24px] leading-snug font-semibold text-[#183B4A]">
              {feedback.message}
            </p>
          </div>
          {feedback.tone === "wrong" && (
            <button
              type="button"
              onClick={onClose}
              className="ml-2 shrink-0 cursor-pointer rounded-full border-4 border-[#FF786A] bg-[#FFF1EF] px-6 py-3 text-[20px] font-extrabold text-[#D9503F] transition-transform outline-none focus-visible:ring-4 focus-visible:ring-[#FFD76A] motion-safe:hover:scale-[1.04]"
            >
              Tentar de novo
            </button>
          )}
        </div>
      )}
    </div>
  );
}
