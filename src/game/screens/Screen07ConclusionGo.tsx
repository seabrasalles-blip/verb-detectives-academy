import { AudioButton } from "@/components/game/AudioButton";
import { CharacterLayer } from "@/components/game/CharacterLayer";
import { Instruction } from "@/components/game/Instruction";
import { Panel } from "@/components/game/Panel";
import { ScreenFrame } from "@/components/game/ScreenFrame";
import { AnalyzedSentence } from "@/components/game/Sentence";
import { BG } from "@/game/assets";

export function Screen07ConclusionGo() {
  return (
    <ScreenFrame background={BG.activity}>
      <CharacterLayer pose="pointing" height={210} left={6} bottom={120} />

      <Instruction top={16} width={640}>
        Agora já podemos escrever a regra do verbo go.
      </Instruction>

      <Panel style={{ left: 210, top: 82, width: 440, height: 168 }}>
        <div className="flex h-full flex-col items-center justify-center gap-1">
          <p lang="en" className="font-display text-[30px] leading-none font-extrabold text-[#463089]">
            I / You / We / They
          </p>
          <p className="text-[26px] font-bold text-[#24566B]">→</p>
          <p lang="en" className="font-display text-[42px] leading-none font-extrabold text-[#B93B2B]">
            GO
          </p>
        </div>
      </Panel>

      <Panel style={{ left: 690, top: 82, width: 400, height: 168 }}>
        <div className="flex h-full flex-col items-center justify-center gap-1">
          <p lang="en" className="font-display text-[30px] leading-none font-extrabold text-[#463089]">
            He / She / It
          </p>
          <p className="text-[26px] font-bold text-[#24566B]">→</p>
          <p lang="en" className="font-display text-[42px] leading-none font-extrabold text-[#B93B2B]">
            GO<span className="rounded bg-[#FFD76A] px-1 text-[#7A4E00]">ES</span>
          </p>
        </div>
      </Panel>

      <p className="absolute top-[266px] left-[210px] w-[880px] text-center text-[23px] font-bold text-[#183B4A]">
        Com I, you, we e they, usamos go. Com he, she e it, usamos goes. O sujeito mostra quem
        realiza a ação; o verbo mostra a ação.
      </p>

      <div className="absolute top-[318px] left-[210px] flex w-[880px] flex-col items-center gap-3">
        <AnalyzedSentence
          size="sm"
          labels
          tokens={[
            { word: "We", role: "subject" },
            { word: "go", role: "verb" },
            { word: "to school", role: "complement" },
          ]}
        />
        <AnalyzedSentence
          size="sm"
          labels
          tokens={[
            { word: "She", role: "subject" },
            { word: "go", suffix: "es", role: "verb" },
            { word: "to school", role: "complement" },
          ]}
        />
      </div>

      <AudioButton
        text="We go to school."
        left={210}
        label="Ouvir o exemplo: We go to school."
      />
      <AudioButton
        text="She goes to school."
        left={392}
        label="Ouvir o exemplo: She goes to school."
      />
    </ScreenFrame>
  );
}
