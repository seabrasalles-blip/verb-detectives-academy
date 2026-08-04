import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  tail?: "left" | "right" | "none";
  style?: CSSProperties;
  className?: string;
};

/** Balão de fala com contorno azul e seta apontando para Lex. */
export function DialogueBubble({ children, tail = "left", style, className = "" }: Props) {
  return (
    <div
      className={`absolute rounded-[28px] border-[5px] border-[#52B7E8] bg-[#FFFDF6] px-8 py-6 text-[#183B4A] shadow-[0_6px_0_rgba(36,86,107,0.12)] motion-safe:animate-[wv-rise_450ms_ease-out] ${className}`}
      style={style}
    >
      {children}
      {tail !== "none" && (
        <>
          <span
            aria-hidden="true"
            className="absolute h-0 w-0 border-y-[20px] border-y-transparent"
            style={
              tail === "left"
                ? {
                    left: -38,
                    bottom: 38,
                    borderRight: "38px solid #52B7E8",
                  }
                : { right: -38, bottom: 38, borderLeft: "38px solid #52B7E8" }
            }
          />
          <span
            aria-hidden="true"
            className="absolute h-0 w-0 border-y-[14px] border-y-transparent"
            style={
              tail === "left"
                ? { left: -25, bottom: 44, borderRight: "27px solid #FFFDF6" }
                : { right: -25, bottom: 44, borderLeft: "27px solid #FFFDF6" }
            }
          />
        </>
      )}
    </div>
  );
}
