import type { CSSProperties, ReactNode } from "react";

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
    question: "o quê?",
  },
};

/** Larguras fixas por função: garantem colunas alinhadas entre frases diferentes. */
export const COLUMN_WIDTH: Record<Role, number> = {
  subject: 120,
  verb: 170,
  complement: 250,
};

type PartProps = {
  /** Parte da palavra em inglês (sem a terminação destacada). */
  word: string;
  /** Letras acrescentadas (s / es), destacadas em amarelo. */
  suffix?: string | undefined;
  role?: Role | undefined;
  /** Mostra os rótulos "quem? / sujeito" abaixo do card. */
  labels?: boolean;
  /** Rótulos compactos (usados quando há duas frases na mesma tela). */
  compactLabels?: boolean;
  /** Mostra a pergunta orientadora (quem? / ação / para onde?). */
  showQuestion?: boolean;
  /** Mostra o nome da função (sujeito / verbo / complemento). */
  showRole?: boolean;
  /** Pergunta específica para este complemento (ex.: "para onde?"). */
  question?: string | undefined;
  /** Destaca o sufixo em amarelo. Quando false, a palavra fica visualmente inteira. */
  suffixHighlight?: boolean;
  /** Largura fixa do card (colunas alinhadas). */
  width?: number | undefined;
  size?: "sm" | "md" | "lg" | undefined;
  onClick?: (() => void) | undefined;
  ariaLabel?: string | undefined;
  dim?: boolean;
  className?: string;
  style?: CSSProperties | undefined;
};

const SIZES = {
  sm: "text-[30px] px-4 py-1.5 rounded-[14px]",
  md: "text-[38px] px-6 py-2 rounded-[18px]",
  lg: "text-[46px] px-7 py-2.5 rounded-[20px]",
} as const;

export function PartCard({
  word,
  suffix,
  role,
  labels = false,
  compactLabels = false,
  showQuestion = true,
  showRole = true,
  question,
  suffixHighlight = true,
  width,
  size = "md",
  onClick,
  ariaLabel,
  dim = false,
  className = "",
  style,
}: PartProps) {
  const roleStyle = role ? ROLE_STYLE[role] : null;
  const Tag = onClick ? "button" : "span";
  const showLabels = labels && !!roleStyle && (showQuestion || showRole);

  return (
    <span
      className={`inline-flex flex-col items-center ${compactLabels ? "gap-0.5" : "gap-1"} ${className}`}
      style={{ width, ...style }}
    >
      <Tag
        {...(onClick
          ? { type: "button" as const, onClick, "aria-label": ariaLabel ?? `Palavra ${word}` }
          : {})}
        lang="en"
        className={`font-display inline-flex w-full items-baseline justify-center border-4 leading-none font-extrabold shadow-[0_4px_0_rgba(36,86,107,0.14)] transition-all duration-200 outline-none focus-visible:ring-4 focus-visible:ring-[#FFD76A] ${
          SIZES[size]
        } ${onClick ? "cursor-pointer motion-safe:hover:-translate-y-[3px]" : ""} ${
          dim ? "opacity-55" : ""
        }`}
        style={{
          borderColor: roleStyle?.border ?? "#24566B",
          backgroundColor: roleStyle?.bg ?? "#FFFDF5",
          color: roleStyle?.text ?? "#183B4A",
        }}
      >
        {word}
        {suffix &&
          (suffixHighlight ? (
            <span
              className="rounded-[6px] px-1"
              style={{ backgroundColor: "#FFD76A", color: "#7A4E00" }}
            >
              {suffix}
            </span>
          ) : (
            <span>{suffix}</span>
          ))}
      </Tag>
      {showLabels && roleStyle && (
        <span className="flex flex-col items-center leading-[1.15]">
          {showQuestion && (
            <span
              className={`font-bold text-[#24566B] ${compactLabels ? "text-[15px]" : "text-[16px]"}`}
            >
              {question ?? roleStyle.question}
            </span>
          )}
          {showRole && (
            <span
              className={`font-extrabold tracking-[0.06em] uppercase ${
                compactLabels ? "text-[14px]" : "text-[15px]"
              }`}
              style={{ color: roleStyle.border === "#24566B" ? "#1B4557" : roleStyle.text }}
            >
              {roleStyle.label}
            </span>
          )}
        </span>
      )}
    </span>
  );
}

export type Token = {
  word: string;
  suffix?: string;
  role?: Role;
  question?: string;
  suffixHighlight?: boolean;
};

type RowProps = {
  tokens: Token[];
  labels?: boolean;
  compactLabels?: boolean;
  showQuestion?: boolean;
  showRole?: boolean;
  /** Usa COLUMN_WIDTH para que frases diferentes fiquem alinhadas. */
  fixedColumns?: boolean;
  columnGap?: number;
  size?: PartProps["size"];
  className?: string;
  style?: CSSProperties | undefined;
};

/** Uma frase em linha, com colunas previsíveis. */
export function SentenceRow({
  tokens,
  labels = false,
  compactLabels = false,
  showQuestion = true,
  showRole = true,
  fixedColumns = false,
  columnGap = 16,
  size = "md",
  className = "",
  style,
}: RowProps) {
  return (
    <div
      className={`flex items-start justify-center ${className}`}
      style={{ gap: columnGap, ...style }}
    >
      {tokens.map((t, i) => (
        <PartCard
          key={`${t.word}-${i}`}
          word={t.word}
          suffix={t.suffix}
          role={t.role}
          question={t.question}
          suffixHighlight={t.suffixHighlight ?? true}
          labels={labels && !!t.role}
          compactLabels={compactLabels}
          showQuestion={showQuestion}
          showRole={showRole}
          size={size}
          width={fixedColumns && t.role ? COLUMN_WIDTH[t.role] : undefined}
        />
      ))}
    </div>
  );
}

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
          question={t.question}
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
