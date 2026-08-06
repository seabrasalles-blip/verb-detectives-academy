/**
 * Presets de posicionamento da Lex no canvas lógico 1200 × 675.
 *
 * O botão Back ocupa ~196 px de largura ancorado em left 20 / bottom 20,
 * por isso os presets comuns usam bottom >= 88: isso garante uma folga
 * visual de ~18–28 px entre os pés da personagem e a navegação.
 *
 * Os PNGs têm margens transparentes generosas, então `scale` compensa
 * o tamanho visível sem distorcer a arte.
 */
export const CHARACTER_PLACEMENTS = {
  narrativePointing: {
    height: 350,
    left: 30,
    bottom: 94,
    scale: 1.08,
    transformOrigin: "bottom left",
    objectPosition: "bottom left",
  },
  narrativeThinking: {
    height: 335,
    left: 30,
    bottom: 94,
    scale: 1.1,
    transformOrigin: "bottom left",
    objectPosition: "bottom left",
  },
  activityPointing: {
    height: 320,
    left: 28,
    bottom: 90,
    scale: 1.1,
    transformOrigin: "bottom left",
    objectPosition: "bottom left",
  },
  activityThinking: {
    height: 315,
    left: 30,
    bottom: 90,
    scale: 1.12,
    transformOrigin: "bottom left",
    objectPosition: "bottom left",
  },
  rulePointing: {
    height: 320,
    left: 28,
    bottom: 88,
    scale: 1.1,
    transformOrigin: "bottom left",
    objectPosition: "bottom left",
  },
  finalCelebrating: {
    height: 390,
    right: 24,
    bottom: 32,
    scale: 1.04,
    transformOrigin: "bottom right",
    objectPosition: "bottom right",
  },
  /** Exceção da capa: Lex à direita do título, sem barra de navegação por perto. */
  coverNeutral: {
    height: 430,
    left: 780,
    bottom: 16,
    scale: 1,
    transformOrigin: "bottom center",
    objectPosition: "bottom center",
  },
} as const;

export type CharacterPlacement = keyof typeof CHARACTER_PLACEMENTS;
