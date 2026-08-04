import { useEffect, useState } from "react";
import { AssetButton } from "./AssetButton";
import { BTN } from "@/game/assets";
import { speakEnglish, stopSpeaking } from "@/game/speech";

/** Lê em voz alta apenas frases completas e corretas em inglês. */
export function AudioButton({
  text,
  left,
  bottom = 24,
  width = 158,
  label,
  disabled = false,
}: {
  text: string;
  left: number;
  bottom?: number;
  width?: number;
  label?: string;
  disabled?: boolean;
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
        disabled={disabled}
        label={
          speaking
            ? "Parar a leitura em inglês"
            : (label ?? `Ouvir a frase em inglês: ${text}`)
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
