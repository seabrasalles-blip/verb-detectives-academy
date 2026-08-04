import bgCover from "@/assets/bg-cover.jpg.asset.json";
import bgInvestigation from "@/assets/bg-investigation-room.jpg.asset.json";
import bgActivity from "@/assets/bg-activity.jpg.asset.json";
import bgFinal from "@/assets/bg-final.jpg.asset.json";
import lexNeutral from "@/assets/lex-neutral.png.asset.json";
import lexPointing from "@/assets/lex-pointing.png.asset.json";
import lexThinking from "@/assets/lex-thinking.png.asset.json";
import lexCelebrating from "@/assets/lex-celebrating.png.asset.json";
import btnStart from "@/assets/btn-start.png.asset.json";
import btnNext from "@/assets/btn-next.png.asset.json";
import btnBack from "@/assets/btn-back.png.asset.json";
import btnAudio from "@/assets/btn-audio.png.asset.json";
import btnHint from "@/assets/btn-hint.png.asset.json";
import btnRestart from "@/assets/btn-restart.png.asset.json";

export const BG = {
  cover: bgCover.url,
  investigation: bgInvestigation.url,
  activity: bgActivity.url,
  final: bgFinal.url,
} as const;

export const LEX = {
  neutral: lexNeutral.url,
  pointing: lexPointing.url,
  thinking: lexThinking.url,
  celebrating: lexCelebrating.url,
} as const;

/** Proporção largura/altura de cada pose, para dimensionar sem distorcer. */
export const LEX_RATIO = {
  neutral: 872 / 1536,
  pointing: 687 / 1328,
  thinking: 628 / 1303,
  celebrating: 644 / 1190,
} as const;

export const BTN = {
  start: btnStart.url,
  next: btnNext.url,
  back: btnBack.url,
  audio: btnAudio.url,
  hint: btnHint.url,
  restart: btnRestart.url,
} as const;

export const ALL_ASSETS: string[] = [
  ...Object.values(BG),
  ...Object.values(LEX),
  ...Object.values(BTN),
];

export type LexPose = keyof typeof LEX;
