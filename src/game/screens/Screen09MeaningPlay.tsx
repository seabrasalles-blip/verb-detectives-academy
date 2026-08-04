import { AudioButton } from "@/components/game/AudioButton";
import { Instruction } from "@/components/game/Instruction";
import { ScreenFrame } from "@/components/game/ScreenFrame";
import { AnalyzedSentence } from "@/components/game/Sentence";
import { BG, SCENE } from "@/game/assets";

export function Screen09MeaningPlay() {
  return (
    <ScreenFrame background={BG.activity}>
      <Instruction top={16} width={660}>
        Antes de investigar, vamos entender o verbo play.
      </Instruction>

      <img
        src={SCENE.playSoccer}
        alt="Crianças jogando futebol em um campo"
        width={1024}
        height={768}
        loading="lazy"
        draggable={false}
        className="absolute top-[84px] left-[26px] h-[280px] w-[400px] rounded-[24px] border-4 border-[#24566B] bg-[#FFFDF6] object-contain"
      />

      <div className="absolute top-[90px] left-[470px] w-[520px]">
        <p className="font-display text-[62px] leading-none font-extrabold text-[#FF786A]" lang="en">
          PLAY
        </p>
        <p className="mt-1 text-[25px] font-bold text-[#183B4A]">
          Play pode significar <strong>brincar</strong> ou <strong>jogar</strong>.
        </p>
        <p className="mt-4 text-[34px] leading-none font-extrabold text-[#183B4A]" lang="en">
          They play soccer.
        </p>
        <p className="mt-1 text-[23px] font-semibold text-[#24566B]">Eles jogam futebol.</p>
      </div>

      <div className="absolute top-[396px] left-[60px] flex w-[1080px] justify-center">
        <AnalyzedSentence
          labels
          size="md"
          tokens={[
            { word: "They", role: "subject" },
            { word: "play", role: "verb" },
            { word: "soccer", role: "complement" },
          ]}
        />
      </div>

      <AudioButton
        text="They play soccer."
        left={220}
        label="Ouvir a frase correta: They play soccer."
      />
    </ScreenFrame>
  );
}
