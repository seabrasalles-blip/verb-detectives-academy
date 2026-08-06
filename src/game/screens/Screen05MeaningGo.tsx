import { MeaningVerbScreen } from "@/components/game/MeaningVerbScreen";
import { SCENE } from "@/game/assets";

/** 0 = observar · 1 = significado · 2 = análise completa */
export function Screen05MeaningGo() {
  return (
    <MeaningVerbScreen
      screen={5}
      stateKey="s5.stage"
      verb="GO"
      meaning={
        <>
          Go significa <strong>ir</strong>.
        </>
      }
      phrase="I go to school."
      translation="Eu vou para a escola."
      scene={SCENE.goSchool}
      sceneAlt="Menino caminhando em direção à escola com uma mochila."
      sceneScale={1.04}
      audioLabel="Ouvir: I go to school."
      instructions={[
        "Observe a cena e leia a frase.",
        "O que a cena nos ajuda a entender?",
        "Veja as partes da frase.",
      ]}
      tokens={[
        { word: "I", role: "subject" },
        { word: "go", role: "verb" },
        { word: "to school", role: "complement", question: "para onde?" },
      ]}
    />
  );
}
