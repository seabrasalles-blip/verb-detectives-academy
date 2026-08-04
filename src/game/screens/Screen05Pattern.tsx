import { useEffect, useState } from "react";
import { CharacterLayer } from "@/components/game/CharacterLayer";
import { Instruction } from "@/components/game/Instruction";
import { Panel } from "@/components/game/Panel";
import { ScreenFrame } from "@/components/game/ScreenFrame";
import { BG } from "@/game/assets";
import { useGame } from "@/game/state";

function Group({
  title,
  subjects,
  verbs,
  color,
  open,
  onOpen,
}: {
  title: string;
  subjects: string[];
  verbs: string[];
  color: string;
  open: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-expanded={open}
      aria-label={`${title}. Tocar para revelar a forma do verbo.`}
      className="flex h-[262px] w-[340px] cursor-pointer flex-col items-center justify-start rounded-[22px] border-4 bg-[#FFFDF5] px-5 py-4 text-center shadow-[0_4px_0_rgba(36,86,107,0.14)] transition-transform duration-200 outline-none focus-visible:ring-4 focus-visible:ring-[#FFD76A] motion-safe:hover:-translate-y-[3px]"
      style={{ borderColor: color }}
    >
      <span className="font-display text-[34px] leading-none font-extrabold" style={{ color }}>
        {subjects.join(" · ")}
      </span>
      <span className="mt-3 h-[3px] w-full rounded" style={{ background: `${color}55` }} />
      {open ? (
        <span className="mt-4 flex flex-col gap-1">
          {verbs.map((v) => (
            <span
              key={v}
              className="font-display text-[42px] leading-tight font-extrabold text-[#183B4A] motion-safe:animate-[wv-rise_320ms_ease-out]"
            >
              {v}
            </span>
          ))}
        </span>
      ) : (
        <span className="mt-9 flex flex-col items-center gap-2">
          <span
            className="font-display text-[46px] leading-none font-extrabold motion-safe:animate-[wv-glow_2.2s_ease-in-out_infinite]"
            style={{ color }}
          >
            ? ?
          </span>
          <span className="text-[19px] font-bold text-[#24566B]">toque para descobrir</span>
        </span>
      )}
    </button>
  );
}

export function Screen05Pattern() {
  const { complete, isDone } = useGame();
  const [openA, setOpenA] = useState(false);
  const [openB, setOpenB] = useState(false);
  const both = openA && openB;

  useEffect(() => {
    if (both) complete(5);
  }, [both, complete]);

  return (
    <ScreenFrame background={BG.activity} nextEnabled={both || isDone(5)}>
      <CharacterLayer pose="thinking" height={280} left={4} bottom={96} />

      <Instruction top={28} width={620}>
        Toque nos grupos e descubra o padrão.
      </Instruction>


      <div className="absolute top-[92px] left-[344px] flex w-[820px] justify-center gap-10">
        <Group
          title="Grupo 1: I, you, we, they"
          subjects={["I", "You", "We", "They"]}
          verbs={["go", "play"]}
          color="#52B7E8"
          open={openA}
          onOpen={() => setOpenA(true)}
        />
        <Group
          title="Grupo 2: he, she, it"
          subjects={["He", "She", "It"]}
          verbs={["goes", "plays"]}
          color="#A995E8"
          open={openB}
          onOpen={() => setOpenB(true)}
        />
      </div>

      {both && (
        <Panel
          tone="paper"
          style={{ left: 344, top: 372, width: 820, height: 96 }}
          className="motion-safe:animate-[wv-rise_400ms_ease-out]"
        >
          <div className="flex h-full flex-col items-center justify-center gap-1">
            <p className="text-[23px] font-bold text-[#183B4A]">
              <span className="text-[#52B7E8]">I, you, we e they</span> usam a forma básica.
            </p>
            <p className="text-[23px] font-bold text-[#183B4A]">
              <span className="text-[#A995E8]">He, she e it</span> usam uma forma diferente.
            </p>
          </div>
        </Panel>
      )}
    </ScreenFrame>
  );
}
