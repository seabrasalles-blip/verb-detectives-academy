import { RoundPractice, type Round } from "./RoundPractice";

const ROUNDS: Round[] = [
  {
    before: "He",
    after: "to school.",
    options: ["go", "goes"],
    answer: "goes",
    success: "Muito bem! He pede goes.",
    error: "He está no grupo he, she, it.",
  },
  {
    before: "She",
    after: "to the park.",
    options: ["goes", "go"],
    answer: "goes",
    success: "Isso! She também pede goes.",
    error: "Com she, o verbo ganha -es.",
  },
  {
    before: "It",
    after: "to the garden.",
    options: ["go", "goes"],
    answer: "goes",
    success: "Perfeito! It usa goes.",
    error: "It fica no mesmo grupo de he e she.",
  },
];

export function Screen09PracticeGoes() {
  return (
    <RoundPractice
      screenNumber={9}
      title="Grupo he / she / it"
      rounds={ROUNDS}
      hint="Esse grupo muda o final do verbo."
      strongHint="He, she e it usam goes, com -es no final."
      pose="thinking"
    />
  );
}
