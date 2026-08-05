import { CompareVerbScreen } from "@/components/game/CompareVerbScreen";

const COMPLEMENT_Q = "para onde?";

export function Screen06TestHypothesis() {
  return (
    <CompareVerbScreen
      screen={6}
      stateKey="s6"
      firstSentence={[
        { id: "s1-sub", word: "I", role: "subject" },
        { id: "s1-verb", word: "go", role: "verb" },
        { id: "s1-comp", word: "to school", role: "complement", question: COMPLEMENT_Q },
      ]}
      secondSentence={[
        { id: "s2-sub", word: "He", role: "subject" },
        { id: "s2-verb", word: "go", suffix: "es", role: "verb" },
        { id: "s2-comp", word: "to school", role: "complement", question: COMPLEMENT_Q },
      ]}
      options={[
        { text: "O verbo mudou: go virou goes.", correct: true },
        { text: "O complemento mudou.", correct: false },
        { text: "Nada mudou nas duas frases.", correct: false },
      ]}
      conclusion="Você encontrou o padrão: quando usamos he, go muda para goes."
      wrongHint="Compare as palavras que indicam a ação."
      conclusionNote={
        <>
          O verbo mudou: <span lang="en">go</span> virou <span lang="en">goes</span>. Com{" "}
          <span lang="en">he</span>, o verbo recebe{" "}
          <span className="rounded bg-[#FFD76A] px-1 text-[#7A4E00]">es</span>.
        </>
      }
    />
  );
}
