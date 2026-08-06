import { RoundPractice, type Round } from "./RoundPractice";

const ROUNDS: Round[] = [
  {
    before: "My friend",
    after: "to school every day.",
    options: ["go", "goes"],
    answer: "goes",
    success:
      "My friend representa uma pessoa. Podemos substituí-lo por he ou she; por isso usamos goes.",
    error: "My friend representa uma pessoa. Por qual pronome podemos substituí-lo?",
    error2: "Se my friend é como he ou she, o verbo muda.",
  },
  {
    before: "The children",
    after: "soccer.",
    options: ["plays", "play"],
    answer: "play",
    success: "The children representa mais de uma pessoa. É como they; por isso usamos play.",
    error: "The children representa mais de uma pessoa. Pense em um pronome que represente várias pessoas.",
    error2: "Se the children é como they, o verbo fica na forma básica.",
  },
  {
    before: "Anna",
    after: "soccer.",
    options: ["play", "plays"],
    answer: "plays",
    success: "Anna representa uma pessoa. É como she; por isso usamos plays.",
    error: "Anna representa uma pessoa. Qual pronome pode substituí-la?",
    error2: "Se Anna é como she, o verbo muda.",
  },
  {
    before: "The cat",
    after: "to the garden.",
    options: ["goes", "go"],
    answer: "goes",
    success: "The cat representa um animal no singular. É como it; por isso usamos goes.",
    error: "The cat representa um animal no singular. Pense no pronome it.",
    error2: "Se the cat é como it, o verbo muda.",
  },
  {
    before: "Anna and Tom",
    after: "to the library.",
    options: ["go", "goes"],
    answer: "go",
    success: "Anna and Tom representam duas pessoas. É como they; por isso usamos go.",
    error: "Anna and Tom representam mais de uma pessoa. Qual pronome representa esse grupo?",
    error2: "Se Anna and Tom é como they, o verbo fica na forma básica.",
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
