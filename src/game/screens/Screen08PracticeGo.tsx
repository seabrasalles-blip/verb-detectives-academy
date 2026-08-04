import { RoundPractice, type Round } from "./RoundPractice";

const ROUNDS: Round[] = [
  {
    before: "I",
    after: "to school.",
    options: ["go", "goes"],
    answer: "go",
    success: "Boa! Com I usamos go.",
    error: "I está no grupo I, you, we, they. Pense na forma básica do verbo.",
  },
  {
    before: "You",
    after: "to school.",
    options: ["goes", "go"],
    answer: "go",
    success: "Isso! You também usa go.",
    error: "You fica no mesmo grupo de I, we e they.",
  },
  {
    before: "They",
    after: "to school.",
    options: ["go", "goes"],
    answer: "go",
    success: "Perfeito! They usa go.",
    error: "They é mais de uma pessoa: o verbo não muda.",
  },
  {
    before: "He",
    after: "to school.",
    options: ["goes", "go"],
    answer: "goes",
    success: "Muito bem! He pede goes.",
    error: "He está no grupo he, she, it. O verbo muda nesse grupo.",
  },
  {
    before: "She",
    after: "to school.",
    options: ["go", "goes"],
    answer: "goes",
    success: "Isso! She também pede goes.",
    error: "Com she, o verbo ganha -es.",
  },
  {
    before: "It",
    after: "to school.",
    options: ["goes", "go"],
    answer: "goes",
    success: "Perfeito! It usa goes.",
    error: "It fica no mesmo grupo de he e she.",
  },
];

export function Screen08PracticeGo() {
  return (
    <RoundPractice
      screenNumber={8}
      storageKey="s8"
      title="Prática: go ou goes?"
      rounds={ROUNDS}
      hint="Veja em qual grupo está o sujeito da frase."
      strongHint="I, you, we e they usam go. He, she e it usam goes."
    />
  );
}
