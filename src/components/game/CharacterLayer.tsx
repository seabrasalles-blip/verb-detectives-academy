import { LEX, LEX_RATIO, type LexPose } from "@/game/assets";
import { CHARACTER_PLACEMENTS, type CharacterPlacement } from "@/game/characterPlacements";

const ALT: Record<LexPose, string> = {
  neutral: "Lex, a detetive das palavras, sorrindo com sua lupa",
  pointing: "Lex apontando para o quadro de investigação",
  thinking: "Lex pensando, com a mão no queixo",
  celebrating: "Lex comemorando com os braços para o alto",
};

type Props = {
  pose: LexPose;
  /** Preset de posicionamento; as props explícitas abaixo têm prioridade. */
  placement?: CharacterPlacement;
  /** Altura do quadro da imagem (inclui margens transparentes do PNG). */
  height?: number;
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
  placement,
  height,
  left,
  right,
  bottom,
  top,
  flip = false,
  scale,
  transformOrigin,
  objectPosition,
  className = "",
}: Props) {
  const preset = placement
    ? (CHARACTER_PLACEMENTS[placement] as {
        height: number;
        left?: number;
        right?: number;
        bottom?: number;
        top?: number;
        scale: number;
        transformOrigin: string;
        objectPosition: string;
      })
    : undefined;

  // Ordem de resolução: props explícitas da tela → preset → padrões.
  const h = height ?? preset?.height ?? 300;
  const s = scale ?? preset?.scale ?? 1;
  const origin = transformOrigin ?? preset?.transformOrigin ?? "bottom center";
  const objPos = objectPosition ?? preset?.objectPosition ?? "bottom center";

  const resolvedTop = top ?? preset?.top;
  const resolvedBottom = bottom ?? preset?.bottom;
  const resolvedLeft = left ?? preset?.left;
  const resolvedRight = right ?? preset?.right;

  // Um único eixo por vez: nunca top e bottom (nem left e right) juntos.
  const vertical =
    resolvedTop !== undefined ? { top: resolvedTop } : { bottom: resolvedBottom ?? 0 };
  const horizontal =
    resolvedLeft !== undefined
      ? { left: resolvedLeft }
      : resolvedRight !== undefined
        ? { right: resolvedRight }
        : { left: 0 };

  const width = h * LEX_RATIO[pose];
  const transform = [flip ? "scaleX(-1)" : null, s !== 1 ? `scale(${s})` : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className="pointer-events-none absolute select-none"
      style={{ width, height: h, ...horizontal, ...vertical }}
    >
      <img
        src={LEX[pose]}
        alt={ALT[pose]}
        draggable={false}
        className={`h-full w-full select-none object-contain drop-shadow-[0_10px_16px_rgba(24,59,74,0.18)] motion-safe:animate-[wv-rise_500ms_ease-out] ${className}`}
        style={{
          objectPosition: objPos,
          transformOrigin: origin,
          ...(transform ? { transform } : {}),
        }}
      />
    </div>
  );
}
