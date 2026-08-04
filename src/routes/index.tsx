import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { GameStage } from "@/components/game/GameStage";
import { ALL_ASSETS } from "@/game/assets";
import { GameProvider, useGame } from "@/game/state";
import { Screen01Cover } from "@/game/screens/Screen01Cover";
import { Screen02Case } from "@/game/screens/Screen02Case";
import { Screen03FirstClue } from "@/game/screens/Screen03FirstClue";
import { Screen04CompareGo } from "@/game/screens/Screen04CompareGo";
import { Screen05Pattern } from "@/game/screens/Screen05Pattern";
import { Screen06PracticeGo } from "@/game/screens/Screen06PracticeGo";
import { Screen07Checkpoint } from "@/game/screens/Screen07Checkpoint";
import { Screen08DiscoverGoes } from "@/game/screens/Screen08DiscoverGoes";
import { Screen09PracticeGoes } from "@/game/screens/Screen09PracticeGoes";
import { Screen10Sorting } from "@/game/screens/Screen10Sorting";
import { Screen11MixedChallenge } from "@/game/screens/Screen11MixedChallenge";
import { Screen12Summary } from "@/game/screens/Screen12Summary";
import { Screen13Closing } from "@/game/screens/Screen13Closing";

const TITLE = "Wordville – Verb Detectives | Simple Present: go e goes";
const DESCRIPTION =
  "Objeto digital educacional infantil: ajude a detetive Lex a descobrir quando usar go e goes no simple present, com áudio, dicas e atividades interativas.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const SCREENS = [
  Screen01Cover,
  Screen02Case,
  Screen03FirstClue,
  Screen04CompareGo,
  Screen05Pattern,
  Screen06PracticeGo,
  Screen07Checkpoint,
  Screen08DiscoverGoes,
  Screen09PracticeGoes,
  Screen10Sorting,
  Screen11MixedChallenge,
  Screen12Summary,
  Screen13Closing,
];

function ScreenRouter() {
  const { screen } = useGame();
  const Current = SCREENS[screen - 1] ?? Screen01Cover;

  useEffect(() => {
    ALL_ASSETS.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  return (
    <main key={screen} className="absolute inset-0">
      <h1 className="sr-only">Wordville – Verb Detectives</h1>
      <Current />
    </main>
  );
}

function Index() {
  return (
    <GameProvider>
      <GameStage>
        <ScreenRouter />
      </GameStage>
    </GameProvider>
  );
}
