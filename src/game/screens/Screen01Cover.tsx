import { AssetButton } from "@/components/game/AssetButton";
import { CharacterLayer } from "@/components/game/CharacterLayer";
import { BG, BTN } from "@/game/assets";
import { useGame } from "@/game/state";

export function Screen01Cover() {
  const { next } = useGame();
  return (
    <div className="absolute inset-0 motion-safe:animate-[wv-fade_500ms_ease-out]">
      <img
        src={BG.cover}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      <header className="absolute top-[96px] left-[330px] w-[520px] text-center">
        <h1
          className="font-display text-[74px] leading-[0.9] font-extrabold tracking-tight text-[#FFFDF6]"
          style={{ textShadow: "0 5px 0 #24566B, 0 9px 20px rgba(24,59,74,0.35)" }}
        >
          Wordville
        </h1>
        <p
          className="font-display mt-2 text-[40px] leading-none font-extrabold tracking-[0.06em] text-[#FFD76A] uppercase"
          style={{ textShadow: "0 4px 0 #24566B" }}
        >
          Verb Detectives
        </p>
        <p className="mx-auto mt-5 inline-block rounded-full border-4 border-[#52B7E8] bg-[#FFFDF6]/95 px-7 py-2 text-[26px] font-bold text-[#183B4A]">
          Help Lex fix the verbs!
        </p>
      </header>

      <CharacterLayer pose="neutral" height={430} left={780} bottom={16} />

      <AssetButton
        src={BTN.start}
        width={222}
        floating
        label="Start: começar a investigação"
        onClick={next}
        style={{ left: 479, bottom: 74 }}
      />
    </div>
  );
}
