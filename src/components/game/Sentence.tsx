import type { ReactNode } from "react";

export type Role = "subject" | "verb" | "complement";

/** Código visual consistente: cor + rótulo em palavras (nunca só a cor). */
export const ROLE_STYLE: Record<
  Role,
  { border: string; bg: string; text: string; label: string; question: string }
> = {
  subject: {
    border: "#A995E8",
    bg: "#F1ECFF",
    text: "#463089",
    label: "sujeito",
    question: "quem?",
  },
  verb: {
    border: "#FF786A",
    bg: "#FFF1EF",
    text: "#B93B2B",
    label: "verbo",
    question: "ação",
  },
  complement: {
    border: "#24566B",
    bg: "#E4F4FF",
    text: "#1B4557",
    label: "complemento",
    question: "o quê? / para onde?",
  },
};

type PartProps = {
  /** Parte da palavra em inglês (sem a terminação destacada). */
  word: string;
  /** Letras acrescentadas (s / es), destacadas em amarelo. */
  suffix?: string | undefined;
  role?: Role | undefined;
  /** Mostra os rótulos "quem? / sujeito" abaixo do card. */
  labels?: boolean;
  size?: "sm" | "md" | "lg" | undefined;
  onClick?: (() => void) | undefined;
  ariaLabel?: string | undefined;
  dim?: boolean;
  className?: string;
};

const SIZES = {
  sm: "text-[28px] px-4 py-1.5 rounded-[14px]",
  md: "text-[38px] px-6 py-2 rounded-[18px]",
  lg: "text-[46px] px-7 py-2.5 rounded-[20px]",
} as const;

export function PartCard({
  word,
  suffix,
  role,
  labels = false,
  size = "md",
  onClick,
  ariaLabel,
  dim = false,
  className = "",
}: PartProps) {
  const style = role ? ROLE_STYLE[role] : null;
  const Tag = onClick ? "button" : "span";

  return (
    <span className={`inline-flex flex-col items-center gap-1 ${className}`}>
      <Tag
        {...(onClick
          ? { type: "button" as const, onClick, "aria-label": ariaLabel ?? `Palavra ${word}` }
          : {})}
        lang="en"
        className={`font-display inline-flex items-baseline border-4 leading-none font-extrabold shadow-[0_4px_0_rgba(36,86,107,0.14)] transition-all duration-200 outline-none focus-visible:ring-4 focus-visible:ring-[#FFD76A] ${
          SIZES[size]
        } ${onClick ? "cursor-pointer motion-safe:hover:-translate-y-[3px]" : ""} ${
          dim ? "opacity-55" : ""
        }`}
        style={{
          borderColor: style?.border ?? "#24566B",
          backgroundColor: style?.bg ?? "#FFFDF5",
          color: style?.text ?? "#183B4A",
        }}
      >
        {word}
        {suffix && (
          <span
            className="rounded-[6px] px-1"
            style={{ backgroundColor: "#FFD76A", color: "#7A4E00" }}
          >
            {suffix}
          </span>
        )}
      </Tag>
      {labels && style && (
        <span className="flex flex-col items-center leading-tight">
          <span className="text-[16px] font-bold text-[#24566B]">{style.question}</span>
          <span
            className="text-[15px] font-extrabold tracking-[0.08em] uppercase"
            style={{ color: style.border === "#24566B" ? "#1B4557" : style.text }}
          >
            {style.label}
          </span>
        </span>
      )}
    </span>
  );
}

export type Token = { word: string; suffix?: string; role?: Role };

/** Frase analisada: cards lado a lado, com ou sem rótulos. */
export function AnalyzedSentence({
  tokens,
  labels = false,
  size = "md",
  className = "",
}: {
  tokens: Token[];
  labels?: boolean;
  size?: PartProps["size"];
  className?: string;
}) {
  return (
    <span className={`flex flex-wrap items-start justify-center gap-3 ${className}`}>
      {tokens.map((t, i) => (
        <PartCard
          key={`${t.word}-${i}`}
          word={t.word}
          suffix={t.suffix}
          role={t.role}
          labels={labels && !!t.role}
          size={size}
        />
      ))}
    </span>
  );
}

/** Legenda do código visual (cor + palavra). */
export function RoleLegend({ className = "" }: { className?: string }) {
  return (
    <span className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
      {(Object.keys(ROLE_STYLE) as Role[]).map((role) => (
        <span
          key={role}
          className="inline-flex items-center gap-2 rounded-full border-[3px] px-3 py-0.5 text-[17px] font-bold"
          style={{
            borderColor: ROLE_STYLE[role].border,
            backgroundColor: ROLE_STYLE[role].bg,
            color: ROLE_STYLE[role].text,
          }}
        >
          {ROLE_STYLE[role].label}
        </span>
      ))}
    </span>
  );
}

/** Cartaz suspeito: deixa claro que a frase está sob investigação. */
export function SuspectPoster({
  children,
  style,
  className = "",
}: {
  children: ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={`absolute -rotate-1 rounded-[18px] border-4 border-dashed border-[#FF786A] bg-[#FFFDF6] px-8 pt-9 pb-7 shadow-[0_8px_0_rgba(36,86,107,0.14)] ${className}`}
      style={style}
    >
      <span className="absolute -top-4 left-6 rounded-full bg-[#FF786A] px-4 py-1 text-[16px] font-extrabold tracking-[0.12em] text-[#FFFDF6] uppercase">
        Frase suspeita
      </span>
      {children}
    </div>
  );
}
