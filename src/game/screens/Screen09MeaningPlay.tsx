import { MeaningVerbScreen } from "@/components/game/MeaningVerbScreen";
import { SCENE } from "@/game/assets";

/** 0 = observar · 1 = significado (a análise da frase acontece na tela 11) */
export function Screen09MeaningPlay() {
  return (
    <MeaningVerbScreen
      screen={9}
      stateKey="s9.phase"
      withAnalysis={false}
      verb="PLAY"
      meaning={
        <>
          Play pode significar <strong>brincar</strong> ou <strong>jogar</strong>.
        </>
      }
      phrase="They play soccer."
      translation="Eles jogam futebol."
      scene={SCENE.playSoccer}
      sceneAlt="Duas crianças jogando futebol juntas."
      sceneScale={1.07}
      audioLabel="Ouvir: They play soccer."
      instructions={[
        "Observe a cena e leia a frase.",
        "O que a cena nos ajuda a entender?",
        "O que a cena nos ajuda a entender?",
      ]}
    />
  );
}
