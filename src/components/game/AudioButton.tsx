import { useEffect, useState, type CSSProperties } from "react";
import { AssetButton } from "./AssetButton";
import { BTN } from "@/game/assets";
import { canSpeak, isSpeechSupported, speakEnglish, stopSpeaking } from "@/game/speech";

type Props = {
  /** Sempre uma frase completa e correta em inglês. */
  text: string;
  label?: string;
  width?: number;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  disabled?: boolean;
  /** Variante compacta: fica ao lado da frase, não no rodapé. */
  compact?: boolean;
  className?: string;
  style?: CSSProperties;
};

/** Lê em voz alta apenas frases completas e corretas em inglês. */
export function AudioButton({
  text,
  label,
  width,
  left,
  right,
  top,
  bottom,
  disabled = false,
  compact = false,
  className = "",
  style,
}: Props) {
  const [speaking, setSpeaking] = useState(false);
  const finalWidth = width ?? (compact ? 112 : 158);
  const finalBottom = top === undefined && bottom === undefined ? 24 : bottom;

  useEffect(() => {
    setSpeaking(false);
    return () => stopSpeaking();
  }, [text]);

  return (
    <div
      className={`absolute ${className}`}
      style={{ left, right, top, bottom: finalBottom, width: finalWidth, ...style }}
    >
      <AssetButton
        src={BTN.audio}
        width={finalWidth}
        disabled={disabled}
        label={
          speaking ? "Parar a leitura em inglês" : (label ?? `Ouvir a frase em inglês: ${text}`)
        }
        className={speaking ? "brightness-110" : ""}
        style={top !== undefined ? { left: 0, top: 0 } : { left: 0, bottom: 0 }}
        onClick={() => {
          if (speaking) {
            stopSpeaking();
            setSpeaking(false);
            return;
          }
          // Interrompe qualquer fala anterior antes de iniciar esta.
          stopSpeaking();
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

/** Atalho semântico para o áudio compacto colado à frase. */
export function InlineAudioButton(props: Omit<Props, "compact">) {
  return <AudioButton {...props} compact />;
}
