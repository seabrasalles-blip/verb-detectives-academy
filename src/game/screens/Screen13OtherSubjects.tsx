import { RoundPractice, type Round } from "./RoundPractice";

const ROUNDS: Round[] = [
  {
    before: "My friend",
    after: "to school every day.",
    options: ["go", "goes"],
    answer: "goes",
    success: "Muito bem! My friend representa uma pessoa. É como he ou she.",
    error: "My friend representa uma pessoa. Pode ser como he ou she.",
  },
  {
    before: "The children",
    after: "soccer.",
    options: ["plays", "play"],
    answer: "play",
    success: "Isso! The children representa mais de uma pessoa. É como they.",
    error: "The children representa mais de uma pessoa. É como they.",
  },
  {
    before: "Anna",
    after: "soccer.",
    options: ["play", "plays"],
    answer: "plays",
    success: "Perfeito! Anna é uma pessoa só. É como she.",
    error: "Anna é uma pessoa só. Pense em she.",
  },
  {
    before: "The cat",
    after: "to the garden.",
    options: ["goes", "go"],
    answer: "goes",
    success: "Boa! The cat é um animal, um só. É como it.",
    error: "The cat é um animal, um só. Pense em it.",
  },
  {
    before: "Anna and Tom",
    after: "to the library.",
    options: ["go", "goes"],
    answer: "go",
    success: "Excelente! Anna and Tom são duas pessoas. É como they.",
    error: "Anna and Tom são duas pessoas. Pense em they.",
  },
];

export function Screen13OtherSubjects() {
  return (
    <RoundPractice
      screenNumber={13}
      storageKey="s13"
      title="Sujeitos que não são pronomes"
      rounds={ROUNDS}
      hint="Troque o sujeito por he, she, it ou they para decidir."
      strongHint="Uma pessoa ou coisa só funciona como he/she/it: o verbo recebe s ou es."
      pose="thinking"
    />
  );
}
