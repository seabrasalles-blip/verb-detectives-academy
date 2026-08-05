import { InlineAudioButton } from "@/components/game/AudioButton";
import { CharacterLayer } from "@/components/game/CharacterLayer";
import { Instruction } from "@/components/game/Instruction";
import { InvestigationStepButton } from "@/components/game/InvestigationStepButton";
import { Panel } from "@/components/game/Panel";
import { ScreenFrame } from "@/components/game/ScreenFrame";
import { COLUMN_WIDTH, SentenceRow } from "@/components/game/Sentence";
import { BG } from "@/game/assets";
import { useGame, usePersistentState } from "@/game/state";

const GAP = 16;
const ROW_WIDTH = COLUMN_WIDTH.subject + COLUMN_WIDTH.verb + COLUMN_WIDTH.complement + GAP * 2;
const ROW_LEFT = 330;
const AUDIO_LEFT = ROW_LEFT + ROW_WIDTH + 26;
const COMPLEMENT_Q = "para onde?";

export function Screen07ConclusionGo() {
  const { complete, isDone } = useGame();
  const done = isDone(7);
  const [stored, setStored] = usePersistentState<number>("s7.phase", 1);
  const phase = done ? 2 : stored;

  const seeExamples = () => {
    setStored(2);
    complete(7);
  };

  return (
    <ScreenFrame background={BG.activity} nextEnabled={phase === 2}>
      <CharacterLayer pose="pointing" height={290} left={2} bottom={40} scale={1.1} />

      <Instruction top={16} width={720}>
        {phase === 1
          ? "Agora já podemos escrever a regra do verbo go."
          : "Veja a regra em duas frases."}
      </Instruction>

      {phase === 1 ? (
        <>
          <Panel style={{ left: 250, top: 106, width: 420, height: 190 }}>
            <div className="flex h-full flex-col items-center justify-center gap-1">
              <p
                lang="en"
                className="font-display text-[30px] leading-none font-extrabold text-[#463089]"
              >
                I / You / We / They
              </p>
              <p className="text-[26px] font-bold text-[#24566B]">↓</p>
              <p
                lang="en"
                className="font-display text-[46px] leading-none font-extrabold text-[#B93B2B]"
              >
                GO
              </p>
            </div>
          </Panel>

          <Panel style={{ left: 700, top: 106, width: 400, height: 190 }}>
            <div className="flex h-full flex-col items-center justify-center gap-1">
              <p
                lang="en"
                className="font-display text-[30px] leading-none font-extrabold text-[#463089]"
              >
                He / She / It
              </p>
              <p className="text-[26px] font-bold text-[#24566B]">↓</p>
              <p
                lang="en"
                className="font-display text-[46px] leading-none font-extrabold text-[#B93B2B]"
              >
                GO
                <span className="inline-block rounded bg-[#FFD76A] px-1 leading-none text-[#7A4E00]">
                  ES
                </span>
              </p>
            </div>
          </Panel>

          <div
            className="absolute rounded-[20px] border-4 border-[#52B7E8] bg-[#FFFDF6] px-8 py-4 text-center"
            style={{ left: 250, top: 322, width: 850 }}
          >
            <p className="text-[23px] leading-snug font-bold text-[#183B4A]">
              Com <span lang="en">I, you, we</span> e <span lang="en">they</span>, usamos{" "}
              <span lang="en">go</span>.
              <br />
              Com <span lang="en">he, she</span> e <span lang="en">it</span>, usamos{" "}
              <span lang="en">goes</span>.
            </p>
          </div>

          <InvestigationStepButton left={550} top={452} width={280} onClick={seeExamples}>
            Ver exemplos
          </InvestigationStepButton>
        </>
      ) : (
        <>
          <div
            className="absolute flex items-center justify-center gap-4 rounded-full border-4 border-[#52B7E8] bg-[#FFFDF6] px-6 py-1.5"
            style={{ left: 330, top: 100, width: ROW_WIDTH }}
          >
            <span lang="en" className="text-[20px] font-extrabold text-[#183B4A]">
              I / You / We / They → go
            </span>
            <span lang="en" className="text-[20px] font-extrabold text-[#183B4A]">
              He / She / It → goes
            </span>
          </div>

          <div
            className="absolute rounded-[24px] border-4 border-[#52B7E8] bg-[#F4FAFF]/95 shadow-[0_4px_0_rgba(36,86,107,0.10)]"
            style={{ left: 300, top: 156, width: 632, height: 254 }}
          />

          <div className="absolute" style={{ left: ROW_LEFT, top: 170, width: ROW_WIDTH }}>
            <SentenceRow
              size="sm"
              labels
              compactLabels
              fixedColumns
              columnGap={GAP}
              tokens={[
                { word: "We", role: "subject" },
                { word: "go", role: "verb" },
                { word: "to school", role: "complement", question: COMPLEMENT_Q },
              ]}
            />
          </div>
          <InlineAudioButton
            text="We go to school."
            label="Ouvir: We go to school."
            left={AUDIO_LEFT}
            top={180}
            width={112}
          />

          <div className="absolute" style={{ left: ROW_LEFT, top: 300, width: ROW_WIDTH }}>
            <SentenceRow
              size="sm"
              labels
              compactLabels
              fixedColumns
              columnGap={GAP}
              tokens={[
                { word: "She", role: "subject" },
                { word: "go", suffix: "es", role: "verb" },
                { word: "to school", role: "complement", question: COMPLEMENT_Q },
              ]}
            />
          </div>
          <InlineAudioButton
            text="She goes to school."
            label="Ouvir: She goes to school."
            left={AUDIO_LEFT}
            top={310}
            width={112}
          />

          <div
            className="absolute rounded-[20px] border-4 border-[#52B7E8] bg-[#FFFDF6] px-6 py-3 text-center"
            style={{ left: 300, top: 432, width: 632 }}
          >
            <p className="text-[23px] leading-snug font-bold text-[#183B4A]">
              O sujeito muda e a forma do verbo também muda.
            </p>
          </div>
        </>
      )}
    </ScreenFrame>
  );
}
