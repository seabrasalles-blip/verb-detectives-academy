/** Faixa de instrução legível sobre qualquer cenário. Altura estável, máx. 2 linhas. */
export function Instruction({
  children,
  top = 18,
  width = 760,
  minHeight = 62,
  attentionKey,
}: {
  children: React.ReactNode;
  top?: number;
  width?: number;
  minHeight?: number;
  /** Ao mudar, o conteúdo executa uma microanimação única indicando novo comando. */
  attentionKey?: string | number;
}) {
  return (
    <div
      className="absolute flex items-center justify-center rounded-full border-4 border-[#52B7E8] px-8 shadow-[0_4px_0_rgba(36,86,107,0.12)]"
      style={{
        top,
        width,
        minHeight,
        left: (1200 - width) / 2,
        backgroundColor: "#FFFDF6",
      }}
    >
      <p
        key={attentionKey ?? "static"}
        className={`line-clamp-2 text-center text-[23px] leading-[1.2] font-bold text-[#183B4A] ${
          attentionKey === undefined
            ? ""
            : "motion-safe:animate-[wv-attention_420ms_ease-out_1]"
        }`}
        style={{ maxHeight: 56 }}
      >
        {children}
      </p>
    </div>
  );
}
