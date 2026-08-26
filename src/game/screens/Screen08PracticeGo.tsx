import { RoundPractice, type Round } from "./RoundPractice";

/**
 * Rodadas intercaladas (go / goes) e alternativa correta alternando de lado,
 * para que a criança precise analisar o sujeito em cada rodada.
 */
const ROUNDS: Round[] = [
  {
    before: "I",
    after: "to school.",
    options: ["goes", "go"],
    answer: "go",
    success: "Muito bem! I pertence ao grupo de I, you, we e they, por isso usamos go.",
    error: "Observe o sujeito da frase. Ele pertence a qual grupo?",
    error2: "I fica no grupo de I, you, we e they. Nesse grupo o verbo não muda.",
  },
  {
    before: "He",
    after: "to school.",
    options: ["goes", "go"],
    answer: "goes",
    success: "Muito bem! He pertence ao grupo de he, she e it, por isso usamos goes.",
    error: "Observe o sujeito da frase. Ele pertence a qual grupo?",
    error2: "He pertence ao grupo de he, she e it. Nesse grupo o verbo muda.",
  },
  {
    before: "You",
    after: "to school.",
    options: ["go", "goes"],
    answer: "go",
    success: "Isso! You está no mesmo grupo de I, we e they, por isso usamos go.",
    error: "Observe o sujeito da frase. Ele pertence a qual grupo?",
    error2: "You fica no grupo de I, you, we e they. Nesse grupo o verbo não muda.",
  },
  {
    before: "She",
    after: "to school.",
    options: ["go", "goes"],
    answer: "goes",
    success: "Isso! She pertence ao grupo de he, she e it, por isso usamos goes.",
    error: "Observe o sujeito da frase. Ele pertence a qual grupo?",
    error2: "She pertence ao grupo de he, she e it. Nesse grupo o verbo muda.",
  },
  {
    before: "They",
    after: "to school.",
    options: ["goes", "go"],
    answer: "go",
    success: "Perfeito! They representa mais de uma pessoa, por isso usamos go.",
    error: "Observe quantas pessoas o sujeito representa.",
    error2: "They fica no grupo de I, you, we e they. Nesse grupo o verbo não muda.",
  },
  {
    before: "It",
    after: "to school.",
    options: ["goes", "go"],
    answer: "goes",
    success: "Perfeito! It pertence ao grupo de he, she e it, por isso usamos goes.",
    error: "Observe o sujeito da frase. Ele pertence a qual grupo?",
    error2: "It pertence ao grupo de he, she e it. Nesse grupo o verbo muda.",
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
