import { RoundPractice, type Round } from "./RoundPractice";

const ROUNDS: Round[] = [
  {
    before: "My friend",
    after: "to school every day.",
    options: ["go", "goes"],
    answer: "goes",
    success: "Muito bem! My friend é como he ou she.",
    error: "My friend é uma pessoa só: pense em he/she.",
  },
  {
    before: "The children",
    after: "to the park.",
    options: ["goes", "go"],
    answer: "go",
    success: "Isso! The children é como they.",
    error: "The children é mais de uma pessoa: pense em they.",
  },
  {
    before: "The cat",
    after: "to the garden.",
    options: ["go", "goes"],
    answer: "goes",
    success: "Perfeito! The cat é como it.",
    error: "The cat é um animal, um só: pense em it.",
  },
  {
    before: "Anna and Tom",
    after: "to the library.",
    options: ["goes", "go"],
    answer: "go",
    success: "Excelente! Duas pessoas funcionam como they.",
    error: "Anna and Tom são duas pessoas: pense em they.",
  },
];

export function Screen11MixedChallenge() {
  return (
    <RoundPractice
      screenNumber={11}
      title="Desafio final"
      rounds={ROUNDS}
      hint="Troque o sujeito por he, she, it ou they para decidir."
      strongHint="Se o sujeito for uma pessoa/coisa só, use goes. Se for mais de uma, use go."
      pose="thinking"
    />
  );
}
