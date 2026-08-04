import type { ReactNode } from "react";

/** Card grande de palavra/alternativa: nunca começa selecionado. */
export function WordOption({
  children,
  onClick,
  state = "idle",
  size = "md",
  disabled = false,
  ariaLabel,
}: {
  children: ReactNode;
  onClick?: () => void;
  state?: "idle" | "selected" | "correct" | "wrong";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  ariaLabel?: string;
}) {
  const sizes = {
    sm: "min-w-[130px] min-h-[70px] px-6 text-[30px]",
    md: "min-w-[190px] min-h-[84px] px-8 text-[36px]",
    lg: "min-w-[240px] min-h-[92px] px-9 text-[40px]",
  }[size];

  const states = {
    idle: "border-[#24566B] bg-[#FFFDF5] text-[#183B4A]",
    selected: "border-[#A995E8] bg-[#F1ECFF] text-[#4B3B8F] ring-4 ring-[#A995E8]/40",
    correct: "border-[#58CDB5] bg-[#E8FBF5] text-[#1F7A67]",
    wrong: "border-[#FF786A] bg-[#FFF1EF] text-[#C64434]",
  }[state];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-pressed={state === "selected" ? true : undefined}
      className={`inline-flex cursor-pointer items-center justify-center rounded-[20px] border-4 font-display font-extrabold shadow-[0_4px_0_rgba(36,86,107,0.16)] transition-all duration-200 outline-none focus-visible:ring-4 focus-visible:ring-[#FFD76A] disabled:cursor-not-allowed disabled:opacity-60 motion-safe:hover:-translate-y-[3px] motion-safe:active:translate-y-0 ${sizes} ${states} ${
        state === "correct" ? "motion-safe:animate-[wv-bounce_420ms_ease-out]" : ""
      } ${state === "wrong" ? "motion-safe:animate-[wv-shake_320ms_ease-out]" : ""}`}
    >
      {children}
    </button>
  );
}
