import { RoundPractice, type Round } from "./RoundPractice";

/**
 * Sujeitos que não são pronomes: a criança troca o sujeito pelo pronome
 * correspondente (Anna -> she) e só depois escolhe a forma do verbo.
 */
const ROUNDS: Round[] = [
  {
    before: "Anna",
    after: "to school every day.",
    options: ["go", "goes"],
    answer: "goes",
    success: "Perfeito! Anna pode ser trocada por she, e she pede goes.",
    hints: [
      "Qual pronome pode substituir Anna nesta frase?",
      "Anna pode ser trocada por she. Com she, o verbo go vira goes.",
    ],
  },
  {
    before: "The children",
    after: "soccer in the park.",
    options: ["plays", "play"],
    answer: "play",
    success: "Isso! The children pode ser trocado por they, e they pede play.",
    hints: [
      "Troque The children por um pronome. Qual deles cabe aqui?",
      "The children pode ser trocado por they. Com they, o verbo continua play.",
    ],
  },
  {
    before: "Pedro",
    after: "soccer with his cousins.",
    options: ["play", "plays"],
    answer: "plays",
    success: "Muito bem! Pedro pode ser trocado por he, e he pede plays.",
    hints: [
      "Qual pronome você usaria no lugar de Pedro?",
      "Pedro pode ser trocado por he. Com he, o verbo play vira plays.",
    ],
  },
  {
    before: "The dog",
    after: "to the garden every morning.",
    options: ["goes", "go"],
    answer: "goes",
    success: "Boa! The dog pode ser trocado por it, e it pede goes.",
    hints: [
      "Para falar de um animal, qual pronome usamos em inglês?",
      "The dog pode ser trocado por it. Com it, o verbo go vira goes.",
    ],
  },
  {
    before: "Anna and Tom",
    after: "to the library after class.",
    options: ["go", "goes"],
    answer: "go",
    success: "Excelente! Anna and Tom pode ser trocado por they, e they pede go.",
    hints: [
      "Anna and Tom pode ser trocado por qual pronome?",
      "Anna and Tom pode ser trocado por they. Com they, o verbo continua go.",
    ],
  },
];

export function Screen13OtherSubjects() {
  return (
    <RoundPractice
      screenNumber={13}
      storageKey="s13"
      title="Sujeitos que não são pronomes"
      rounds={ROUNDS}
      hint="Troque o sujeito por um pronome: he, she, it ou they."
      strongHint="Se o sujeito puder ser trocado por he, she ou it, o verbo recebe -s ou -es."
      pose="thinking"
      stageMessage="Etapa concluída! Você já troca o sujeito pelo pronome antes de escolher o verbo."
    />
  );
}
