import { useEffect, useState } from "react";
import { AssetButton } from "./AssetButton";
import { BTN } from "@/game/assets";
import { speakEnglish, stopSpeaking } from "@/game/speech";

/** Lê em voz alta apenas a frase em inglês da tela. */
export function AudioButton({
  text,
  left,
  bottom = 24,
  width = 158,
}: {
  text: string;
  left: number;
  bottom?: number;
  width?: number;
}) {
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    setSpeaking(false);
    return () => stopSpeaking();
  }, [text]);

  return (
    <div className="absolute" style={{ left, bottom, width }}>
      <AssetButton
        src={BTN.audio}
        width={width}
        label={
          speaking
            ? `Parar a leitura da frase em inglês: ${text}`
            : `Ouvir a frase em inglês: ${text}`
        }
        className={speaking ? "brightness-110" : ""}
        style={{ left: 0, bottom: 0 }}
        onClick={() => {
          if (speaking) {
            stopSpeaking();
            setSpeaking(false);
            return;
          }
          setSpeaking(true);
          speakEnglish(text, () => setSpeaking(false));
        }}
      />
      {speaking && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-2 -right-1 h-4 w-4 rounded-full bg-[#58CDB5] ring-4 ring-[#FFFDF6] motion-safe:animate-pulse"
        />
      )}
    </div>
  );
}
