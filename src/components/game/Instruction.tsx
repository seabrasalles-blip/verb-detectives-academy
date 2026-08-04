/** Faixa de instrução legível sobre qualquer cenário. */
export function Instruction({
  children,
  top = 30,
  width = 720,
}: {
  children: React.ReactNode;
  top?: number;
  width?: number;
}) {
  return (
    <p
      className="absolute rounded-full border-4 border-[#52B7E8] px-7 py-2 text-center text-[22px] leading-snug font-bold text-[#183B4A] shadow-[0_4px_0_rgba(36,86,107,0.12)]"
      style={{ top, width, left: (1200 - width) / 2, backgroundColor: "#FFFDF6" }}
    >

      {children}
    </p>
  );
}
