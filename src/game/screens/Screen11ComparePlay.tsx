import { CompareVerbScreen } from "@/components/game/CompareVerbScreen";

export function Screen11ComparePlay() {
  return (
    <CompareVerbScreen
      screen={11}
      stateKey="s11"
      firstSentence={[
        { id: "p1-sub", word: "They", role: "subject" },
        { id: "p1-verb", word: "play", role: "verb" },
        { id: "p1-comp", word: "soccer", role: "complement", question: "o quê?" },
      ]}
      secondSentence={[
        { id: "p2-sub", word: "She", role: "subject" },
        { id: "p2-verb", word: "play", suffix: "s", role: "verb" },
        { id: "p2-comp", word: "soccer", role: "complement", question: "o quê?" },
      ]}
      options={[
        { text: "O verbo mudou: play virou plays.", correct: true },
        { text: "O complemento mudou.", correct: false },
        { text: "Nada mudou nas duas frases.", correct: false },
      ]}
      conclusion="Você encontrou o padrão: com she, play muda para plays."
      wrongHint="Compare as palavras que indicam a ação."
      ruleTitle="Descobrimos a regra do verbo play."
      ruleGroups={[
        { subjects: "I / You / We / They", verb: "PLAY" },
        { subjects: "He / She / It", verb: "PLAY", suffix: "S" },
      ]}
      ruleSynthesis={
        <>
          Com <span lang="en">he</span>, <span lang="en">she</span> e <span lang="en">it</span>,{" "}
          <span lang="en">play</span> recebe s: <span lang="en">plays</span>.
        </>
      }
      ruleExamples={[
        { text: "They play soccer." },
        { text: "She plays soccer.", audio: true, audioLabel: "Ouvir: She plays soccer." },
      ]}
    />
  );
}
