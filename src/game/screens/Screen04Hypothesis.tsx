import { CharacterLayer } from "@/components/game/CharacterLayer";
import { FeedbackModal, FeedbackSlot, useFeedback } from "@/components/game/FeedbackModal";
import { Instruction } from "@/components/game/Instruction";
import { ScreenFrame } from "@/components/game/ScreenFrame";
import { PartCard, SuspectPoster } from "@/components/game/Sentence";
import { BG } from "@/game/assets";
import { useGame, usePersistentState } from "@/game/state";

const WORDS = ["He", "go", "to", "school."] as const;

/** Registro persistente das descobertas: não depende de temporizador. */
function CluesPanel({ hasHe, hasGo }: { hasHe: boolean; hasGo: boolean }) {
  if (!hasHe && !hasGo) return null;
  return (
    <div
      className="absolute rounded-[22px] border-4 border-[#52B7E8] bg-[#FFFDF6] px-6 py-4 shadow-[0_4px_0_rgba(36,86,107,0.10)] motion-safe:animate-[wv-rise_320ms_ease-out]"
      style={{ left: 300, top: 315, width: 640 }}
      role="status"
      aria-live="polite"
    >
      <p className="font-display text-[16px] font-extrabold tracking-[0.10em] text-[#24566B] uppercase">
        Pistas encontradas
      </p>
      <ul className="mt-1 space-y-1">
        {hasHe && (
          <li className="text-[20px] leading-snug font-bold text-[#183B4A]">
            <span className="pr-2 text-[#1F7A67]">✓</span>
            <span lang="en">He</span> é o sujeito: mostra quem realiza a ação.
          </li>
        )}
        {hasGo && (
          <li className="text-[20px] leading-snug font-bold text-[#183B4A]">
            <span className="pr-2 text-[#1F7A67]">✓</span>
            <span lang="en">go</span> é o verbo: mostra a ação.
          </li>
        )}
      </ul>
      {hasGo && (
        <div className="mt-3 border-t-2 border-[#CBE6F5] pt-2">
          <p className="font-display text-[15px] font-extrabold tracking-[0.10em] text-[#4B3B8F] uppercase">
            Hipótese
          </p>
          <p className="text-[20px] leading-snug font-bold text-[#4B3B8F]">
            O verbo pode mudar por causa do sujeito.
          </p>
        </div>
      )}
    </div>
  );
}

export function Screen04Hypothesis() {
  const { complete, isDone } = useGame();
  const [found, setFound] = usePersistentState<string[]>("s4.found", []);
  const fb = useFeedback();
  const done = isDone(4);

  const hasHe = found.includes("He");
  const hasGo = found.includes("go") || done;

  const tap = (word: string) => {
    if (fb.isOpen || done) return;
    if (word === "go") {
      if (!found.includes("go")) setFound([...found, "go"]);
      // Um único modal: a pista fica registrada no painel de pistas da tela.
      fb.hypothesis("Talvez o verbo mude por causa do sujeito.", () => complete(4));
      return;
    }
    if (word === "He") {
      // Descoberta permanente: nada de mensagem temporária redundante.
      if (!found.includes("He")) setFound([...found, "He"]);
      return;
    }
    fb.nudge("Essa parte completa a ideia. Procure a palavra que mostra a ação.");
  };

  const roleOf = (word: string) => {
    if (word === "He" && hasHe) return "subject" as const;
    if (word === "go" && hasGo) return "verb" as const;
    return undefined;
  };

  const instruction = hasHe
    ? "Agora procure a palavra que mostra a ação."
    : "Toque na palavra que você gostaria de investigar.";

  return (
    <ScreenFrame background={BG.investigation} nextEnabled={done}>
      <CharacterLayer pose="pointing" placement="activityPointing" flip />

      <Instruction top={22} width={640} attentionKey={instruction}>
        {instruction}
      </Instruction>

      <SuspectPoster style={{ left: 300, top: 108, width: 640 }}>
        <div className="flex flex-wrap items-start justify-center gap-3">
          {WORDS.map((w) => (
            <PartCard
              key={w}
              word={w}
              role={roleOf(w)}
              labels={!!roleOf(w)}
              size="md"
              onClick={() => tap(w)}
              ariaLabel={`Investigar a palavra ${w}`}
            />
          ))}
        </div>
      </SuspectPoster>

      <CluesPanel hasHe={hasHe} hasGo={hasGo} />

      <FeedbackSlot inline={fb.inline} />
      <FeedbackModal feedback={fb.feedback} onClose={fb.close} />
    </ScreenFrame>
  );
}

