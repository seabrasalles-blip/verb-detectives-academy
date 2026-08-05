import { LEX, LEX_RATIO, type LexPose } from "@/game/assets";

const ALT: Record<LexPose, string> = {
  neutral: "Lex, a detetive das palavras, sorrindo com sua lupa",
  pointing: "Lex apontando para o quadro de investigação",
  thinking: "Lex pensando, com a mão no queixo",
  celebrating: "Lex comemorando com os braços para o alto",
};

type Props = {
  pose: LexPose;
  /** Altura do quadro da imagem (inclui margens transparentes do PNG). */
  height: number;
  left?: number;
  right?: number;
  bottom?: number;
  top?: number;
  flip?: boolean;
  /** Compensa margens transparentes do PNG sem distorcer. */
  scale?: number;
  transformOrigin?: string;
  objectPosition?: string;
  className?: string;
};

export function CharacterLayer({
  pose,
  height,
  left,
  right,
  bottom = 0,
  top,
  flip = false,
  scale = 1,
  transformOrigin = "bottom center",
  objectPosition = "bottom center",
  className = "",
}: Props) {
  const width = height * LEX_RATIO[pose];
  const transform = [flip ? "scaleX(-1)" : null, scale !== 1 ? `scale(${scale})` : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className="pointer-events-none absolute select-none"
      style={{ width, height, left, right, bottom, top }}
    >
      <img
        src={LEX[pose]}
        alt={ALT[pose]}
        draggable={false}
        className={`h-full w-full select-none object-contain drop-shadow-[0_10px_16px_rgba(24,59,74,0.18)] motion-safe:animate-[wv-rise_500ms_ease-out] ${className}`}
        style={{
          objectPosition,
          transformOrigin,
          ...(transform ? { transform } : {}),
        }}
      />
    </div>
  );
}
