import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { GameStage } from "@/components/game/GameStage";
import { ALL_ASSETS } from "@/game/assets";
import { GameProvider, useGame } from "@/game/state";
import { Screen01Cover } from "@/game/screens/Screen01Cover";
import { Screen02Case } from "@/game/screens/Screen02Case";
import { Screen03Poster } from "@/game/screens/Screen03Poster";
import { Screen04Hypothesis } from "@/game/screens/Screen04Hypothesis";
import { Screen05MeaningGo } from "@/game/screens/Screen05MeaningGo";
import { Screen06TestHypothesis } from "@/game/screens/Screen06TestHypothesis";
import { Screen07ConclusionGo } from "@/game/screens/Screen07ConclusionGo";
import { Screen08PracticeGo } from "@/game/screens/Screen08PracticeGo";
import { Screen09MeaningPlay } from "@/game/screens/Screen09MeaningPlay";
import { Screen10NewInvestigation } from "@/game/screens/Screen10NewInvestigation";
import { Screen11ComparePlay } from "@/game/screens/Screen11ComparePlay";
import { Screen12Sorting } from "@/game/screens/Screen12Sorting";
import { Screen13OtherSubjects } from "@/game/screens/Screen13OtherSubjects";
import { Screen14Production } from "@/game/screens/Screen14Production";
import { Screen15Closing } from "@/game/screens/Screen15Closing";

const TITLE = "Wordville – Verb Detectives | go, goes, play e plays";
const DESCRIPTION =
  "Investigação linguística infantil: observe, levante hipóteses e descubra com a detetive Lex quando usar go/goes e play/plays no simple present.";

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
  Screen03Poster,
  Screen04Hypothesis,
  Screen05MeaningGo,
  Screen06TestHypothesis,
  Screen07ConclusionGo,
  Screen08PracticeGo,
  Screen09MeaningPlay,
  Screen10NewInvestigation,
  Screen11ComparePlay,
  Screen12Sorting,
  Screen13OtherSubjects,
  Screen14Production,
  Screen15Closing,
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
