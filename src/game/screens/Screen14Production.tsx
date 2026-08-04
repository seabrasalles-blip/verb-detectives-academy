import { AudioButton } from "@/components/game/AudioButton";
import { FeedbackModal, useFeedback } from "@/components/game/FeedbackModal";
import { Instruction } from "@/components/game/Instruction";
import { ProgressMarker } from "@/components/game/ProgressMarker";
import { ScreenFrame } from "@/components/game/ScreenFrame";
import { ROLE_STYLE, type Role } from "@/components/game/Sentence";
import { BG, SCENE } from "@/game/assets";
import { useGame, usePersistentState } from "@/game/state";

type Task = {
  image: string;
  alt: string;
  cards: string[];
  answer: string[];
  roles: Role[];
  success: string;
  errors: Record<string, string>;
};

const TASKS: Task[] = [
  {
    image: SCENE.girlSoccer,
    alt: "Uma menina jogando futebol",
    cards: ["She", "They", "play", "plays", "soccer"],
    answer: ["She", "plays", "soccer"],
    roles: ["subject", "verb", "complement"],
    success: "Frase montada! She plays soccer.",
    errors: {
      subject: "Na imagem há uma menina só. Qual sujeito combina com ela?",
      verb: "Com she, o verbo play recebe s.",
      complement: "Falta dizer o que ela joga.",
    },
  },
  {
    image: SCENE.twoKidsSchool,
    alt: "Duas crianças com mochilas indo para a escola",
    cards: ["He", "They", "go", "goes", "to school"],
    answer: ["They", "go", "to school"],
    roles: ["subject", "verb", "complement"],
    success: "Frase montada! They go to school.",
    errors: {
      subject: "Na imagem há duas crianças. Qual sujeito combina com elas?",
      verb: "Com they, o verbo fica na forma básica.",
      complement: "Falta dizer para onde as crianças vão.",
    },
  },
];

const SLOT_LABEL: Record<Role, string> = {
  subject: "sujeito",
  verb: "verbo",
  complement: "complemento",
};

export function Screen14Production() {
  const { complete, isDone, registerMiss } = useGame();
  const done = isDone(14);
  const [taskIndex, setTaskIndex] = usePersistentState<number>("s14.task", 0);
  const [slots, setSlots] = usePersistentState<(string | null)[]>("s14.slots", [null, null, null]);
  const [solved, setSolved] = usePersistentState<boolean>("s14.solved", false);
  const fb = useFeedback();

  const index = Math.min(taskIndex, TASKS.length - 1);
  const task = TASKS[index]!;
  const finished = done || (solved && index === TASKS.length - 1);
  const used = slots.filter(Boolean) as string[];
  const full = slots.every(Boolean);
  const sentence = `${(slots[0] ?? "").toString()} ${(slots[1] ?? "").toString()} ${(slots[2] ?? "").toString()}.`;

  const place = (card: string) => {
    if (solved) return;
    const free = slots.findIndex((s) => s === null);
    if (free === -1) return;
    const next = [...slots];
    next[free] = card;
    setSlots(next);
  };

  const removeAt = (i: number) => {
    if (solved) return;
    const next = [...slots];
    next[i] = null;
    setSlots(next);
  };

  const check = () => {
    if (!full || solved) return;
    const wrongAt = slots.findIndex((s, i) => s !== task.answer[i]);
    if (wrongAt === -1) {
      setSolved(true);
      fb.correct(task.success, () => {
        if (index === TASKS.length - 1) {
          complete(14);
          return;
        }
        setTaskIndex(index + 1);
        setSlots([null, null, null]);
        setSolved(false);
      });
    } else {
      registerMiss();
      fb.wrong(task.errors[task.roles[wrongAt] as Role] ?? "Revise a ordem das palavras.");
    }
  };

  return (
    <ScreenFrame background={BG.activity} nextEnabled={finished}>
      <Instruction top={14} width={780}>
        Monte a frase que descreve a imagem.
      </Instruction>

      <img
        src={task.image}
        alt={task.alt}
        width={1024}
        height={768}
        loading="lazy"
        draggable={false}
        className="absolute top-[74px] left-[30px] h-[250px] w-[330px] rounded-[24px] border-4 border-[#24566B] bg-[#FFFDF6] object-contain"
      />

      <div className="absolute top-[92px] left-[400px] flex w-[760px] items-start gap-4">
        {slots.map((slot, i) => {
          const role = task.roles[i] as Role;
          const style = ROLE_STYLE[role];
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <button
                type="button"
                lang={slot ? "en" : undefined}
                onClick={() => removeAt(i)}
                disabled={!slot || solved}
                aria-label={
                  slot
                    ? `Retirar a palavra ${slot} do lugar do ${SLOT_LABEL[role]}`
                    : `Lugar vazio do ${SLOT_LABEL[role]}`
                }
                className="font-display flex h-[86px] w-[218px] items-center justify-center rounded-[18px] border-4 border-dashed text-[34px] font-extrabold outline-none focus-visible:ring-4 focus-visible:ring-[#FFD76A] disabled:cursor-default"
                style={{
                  borderColor: style.border,
                  backgroundColor: slot ? style.bg : "#FFFDF6",
                  color: style.text,
                }}
              >
                {slot ?? "___"}
              </button>
              <span className="text-[17px] font-extrabold tracking-[0.06em] text-[#24566B] uppercase">
                {SLOT_LABEL[role]}
              </span>
            </div>
          );
        })}
      </div>

      <div className="absolute top-[250px] left-[400px] flex w-[760px] flex-wrap justify-center gap-3">
        {task.cards.map((card) => (
          <button
            key={card}
            type="button"
            lang="en"
            onClick={() => place(card)}
            disabled={used.includes(card) || solved}
            aria-label={`Usar a palavra ${card}`}
            className="font-display min-h-[64px] min-w-[120px] cursor-pointer rounded-[16px] border-4 border-[#24566B] bg-[#FFFDF5] px-5 py-2 text-[28px] leading-none font-extrabold text-[#183B4A] transition-all duration-200 outline-none focus-visible:ring-4 focus-visible:ring-[#FFD76A] disabled:opacity-40 motion-safe:hover:-translate-y-[3px]"
          >
            {card}
          </button>
        ))}
      </div>

      <ProgressMarker current={index + 1} total={TASKS.length} left={400} top={362} />

      {!solved && (
        <button
          type="button"
          onClick={check}
          disabled={!full}
          className="font-display absolute bottom-[36px] left-[430px] cursor-pointer rounded-full border-4 border-[#58CDB5] bg-[#E8FBF5] px-9 py-3 text-[24px] font-extrabold text-[#1F7A67] shadow-[0_5px_0_rgba(36,86,107,0.16)] outline-none focus-visible:ring-4 focus-visible:ring-[#FFD76A] disabled:opacity-45 motion-safe:hover:-translate-y-[2px]"
        >
          Conferir a frase
        </button>
      )}

      <AudioButton
        text={solved ? sentence : ""}
        left={210}
        disabled={!solved}
        label={
          solved
            ? `Ouvir a frase montada: ${sentence}`
            : "O áudio fica disponível depois que a frase estiver correta"
        }
      />

      <FeedbackModal feedback={fb.feedback} onClose={fb.close} />
    </ScreenFrame>
  );
}
