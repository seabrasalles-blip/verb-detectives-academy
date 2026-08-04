import { LEX, LEX_RATIO, type LexPose } from "@/game/assets";

const ALT: Record<LexPose, string> = {
  neutral: "Lex, a detetive das palavras, sorrindo com sua lupa",
  pointing: "Lex apontando para o quadro de investigação",
  thinking: "Lex pensando, com a mão no queixo",
  celebrating: "Lex comemorando com os braços para o alto",
};

type Props = {
  pose: LexPose;
  height: number;
  left?: number;
  right?: number;
  bottom?: number;
  flip?: boolean;
};

export function CharacterLayer({ pose, height, left, right, bottom = 0, flip = false }: Props) {
  const width = height * LEX_RATIO[pose];
  return (
    <img
      src={LEX[pose]}
      alt={ALT[pose]}
      draggable={false}
      className="pointer-events-none absolute select-none drop-shadow-[0_10px_16px_rgba(24,59,74,0.18)] motion-safe:animate-[wv-rise_500ms_ease-out]"
      style={{
        height,
        width,
        left,
        right,
        bottom,
        transform: flip ? "scaleX(-1)" : undefined,
      }}
    />
  );
}
