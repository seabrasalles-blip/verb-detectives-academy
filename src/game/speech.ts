/**
 * Síntese de voz em inglês.
 *
 * Regras do projeto:
 * - nunca sintetizar frases gramaticalmente incorretas;
 * - cancelar sempre a fala anterior;
 * - esperar o evento voiceschanged para escolher a melhor voz;
 * - nunca falar sem uma ação explícita do usuário.
 */

let cachedVoice: SpeechSynthesisVoice | null = null;
let listening = false;

export function isSpeechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function ensureVoiceListener() {
  if (listening || !isSpeechSupported()) return;
  listening = true;
  window.speechSynthesis.addEventListener?.("voiceschanged", () => {
    cachedVoice = null;
    pickVoice();
  });
}

function pickVoice(): SpeechSynthesisVoice | null {
  if (!isSpeechSupported()) return null;
  if (cachedVoice) return cachedVoice;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  cachedVoice =
    voices.find((v) => v.lang === "en-US" && /female|samantha|zira|google/i.test(v.name)) ??
    voices.find((v) => v.lang === "en-US") ??
    voices.find((v) => v.lang?.replace("_", "-").toLowerCase().startsWith("en")) ??
    null;
  return cachedVoice;
}

/**
 * Frases proibidas: estruturas incorretas que aparecem como pista visual
 * na investigação e jamais podem virar modelo oral para a criança.
 */
const FORBIDDEN = [/\b(he|she|it)\s+(go|play)\b(?!s|es)/i, /\b(i|you|we|they)\s+(goes|plays)\b/i];

/** true quando a frase pode ser pronunciada (gramaticalmente correta). */
export function canSpeak(text: string): boolean {
  const clean = text.trim();
  if (!clean) return false;
  return !FORBIDDEN.some((re) => re.test(clean));
}

export function speakEnglish(text: string, onEnd?: () => void) {
  if (!isSpeechSupported() || !canSpeak(text)) {
    onEnd?.();
    return;
  }
  ensureVoiceListener();
  // Nunca deixar dois áudios ao mesmo tempo.
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.82;
  utterance.volume = 1;
  const voice = pickVoice();
  if (voice) utterance.voice = voice;
  utterance.onend = () => onEnd?.();
  utterance.onerror = () => onEnd?.();
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (!isSpeechSupported()) return;
  window.speechSynthesis.cancel();
}
