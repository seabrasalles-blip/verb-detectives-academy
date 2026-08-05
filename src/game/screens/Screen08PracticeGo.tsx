import { RoundPractice, type Round } from "./RoundPractice";

/** Prática com pronomes: o grupo do pronome decide a forma do verbo. */
const ROUNDS: Round[] = [
  {
    before: "I",
    after: "to school every day.",
    options: ["go", "goes"],
    answer: "go",
    success: "Isso! Com I usamos a forma base: go.",
    hints: [
      "Pense no grupo do pronome I. Ele fica com a forma base ou com a forma terminada em -es?",
      "I está no grupo de I, you, we e they. Esse grupo usa go.",
    ],
  },
  {
    before: "He",
    after: "to the park.",
    options: ["goes", "go"],
    answer: "goes",
    success: "Muito bem! Com he o verbo recebe -es: goes.",
    hints: [
      "Volte à nossa descoberta: o que acontece com o verbo depois de he?",
      "He está no grupo de he, she e it. Esse grupo usa goes.",
    ],
  },
  {
    before: "We",
    after: "to the market on Saturday.",
    options: ["go", "goes"],
    answer: "go",
    success: "Perfeito! We usa a forma base: go.",
    hints: [
      "We fica no mesmo grupo de qual pronome que você já estudou?",
      "We está no grupo de I, you, we e they. Esse grupo usa go.",
    ],
  },
  {
    before: "She",
    after: "to the library after class.",
    options: ["go", "goes"],
    answer: "goes",
    success: "Isso mesmo! She pede goes.",
    hints: [
      "Compare com he. She se comporta do mesmo jeito?",
      "She está no grupo de he, she e it. Esse grupo usa goes.",
    ],
  },
  {
    before: "It",
    after: "to the garden every morning.",
    referent: "It aqui é o gato da história.",
    options: ["goes", "go"],
    answer: "goes",
    success: "Boa! It está no mesmo grupo de he e she: goes.",
    hints: [
      "It fala do gato. Ele entra no grupo de he e she ou no grupo de they?",
      "It está no grupo de he, she e it. Esse grupo usa goes.",
    ],
  },
  {
    before: "They",
    after: "to the beach in summer.",
    options: ["go", "goes"],
    answer: "go",
    success: "Excelente! They usa a forma base: go.",
    hints: [
      "They está em qual dos dois grupos que descobrimos?",
      "They está no grupo de I, you, we e they. Esse grupo usa go.",
    ],
  },
];

export function Screen08PracticeGo() {
  return (
    <RoundPractice
      screenNumber={8}
      storageKey="s8"
      title="Aplicando a regra do verbo go"
      rounds={ROUNDS}
      hint="Descubra em qual grupo o pronome está: I/you/we/they ou he/she/it."
      strongHint="Com he, she e it o verbo go vira goes. Com os outros pronomes ele continua go."
      stageMessage="Etapa concluída! Você já sabe quando usar go e quando usar goes."
    />
  );
}
