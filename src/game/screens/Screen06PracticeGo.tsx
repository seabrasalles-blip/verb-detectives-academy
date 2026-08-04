import { RoundPractice, type Round } from "./RoundPractice";

const ROUNDS: Round[] = [
  {
    before: "I",
    after: "to school.",
    options: ["go", "goes"],
    answer: "go",
    success: "Boa! Com I usamos go.",
    error: "Com I, o verbo fica na forma básica.",
  },
  {
    before: "They",
    after: "to school.",
    options: ["goes", "go"],
    answer: "go",
    success: "Isso! They também usa go.",
    error: "They é mais de uma pessoa: o verbo não muda.",
  },
  {
    before: "We",
    after: "to the park.",
    options: ["go", "goes"],
    answer: "go",
    success: "Perfeito! We usa go.",
    error: "Pense no grupo I, you, we, they.",
  },
];

export function Screen06PracticeGo() {
  return (
    <RoundPractice
      screenNumber={6}
      title="Grupo I / you / we / they"
      rounds={ROUNDS}
      hint="Esse grupo mantém o verbo na forma básica."
      strongHint="I, you, we e they usam go, sem o final -es."
    />
  );
}
