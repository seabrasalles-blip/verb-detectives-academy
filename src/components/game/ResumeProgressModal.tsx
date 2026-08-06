import { useEffect, useRef } from "react";
import { LEX, LEX_RATIO } from "@/game/assets";
import { useGame } from "@/game/state";

const LEX_H = 158;

/**
 * Modal de retomada: aparece quando existe uma investigação incompleta salva.
 * Bloqueia toda a interface até o aluno escolher continuar ou recomeçar.
 */
function ResumeProgressModal({
  onContinue,
  onRestart,
}: {
  onContinue: () => void;
  onRestart: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const continueRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    continueRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // Não é possível descartar sem decidir.
        e.preventDefault();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = cardRef.current?.querySelectorAll<HTMLButtonElement>("button");
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !cardRef.current?.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !cardRef.current?.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, []);

  return (
    <div
      className="absolute inset-0 z-[90] flex items-center justify-center"
      style={{ backgroundColor: "rgba(24,59,74,0.36)" }}
    >
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-title"
        aria-describedby="resume-desc"
        className="relative flex flex-col items-center rounded-[28px] border-4 px-10 pb-8 pt-6 text-center shadow-[0_20px_50px_rgba(24,59,74,0.32)]"
        style={{ width: 560, backgroundColor: "#FFFDF6", borderColor: "#52B7E8" }}
      >
        <img
          src={LEX.thinking}
          alt=""
          aria-hidden="true"
          style={{ height: LEX_H, width: LEX_H * LEX_RATIO.thinking }}
          className="mb-2 object-contain"
        />
        <h2
          id="resume-title"
          className="text-[32px] font-extrabold leading-tight text-[#183B4A]"
        >
          Investigação em andamento
        </h2>
        <p id="resume-desc" className="mt-2 text-[19px] leading-snug text-[#24566B]">
          Encontramos uma atividade que ainda não foi concluída. Você quer continuar de onde
          parou ou recomeçar?
        </p>
        <p className="mt-2 text-[15px] font-semibold leading-snug text-[#C86156]">
          Ao recomeçar, suas respostas e tentativas salvas serão apagadas.
        </p>

        <div className="mt-5 flex items-center justify-center gap-4">
          <button
            ref={continueRef}
            type="button"
            onClick={onContinue}
            aria-label="Continuar a atividade de onde parei"
            className="min-h-[58px] min-w-[190px] rounded-[18px] border-4 border-[#183B4A] bg-[#52B7E8] px-6 text-[21px] font-extrabold text-[#0F2C38] transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#183B4A]"
          >
            Continuar
          </button>
          <button
            type="button"
            onClick={onRestart}
            aria-label="Recomeçar e apagar o progresso salvo"
            className="min-h-[58px] min-w-[190px] rounded-[18px] border-4 border-[#FF9A8F] bg-[#FFF3F1] px-6 text-[21px] font-extrabold text-[#B8483C] transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#B8483C]"
          >
            Recomeçar
          </button>
        </div>
      </div>
    </div>
  );
}

/** Só renderiza o modal quando existe progresso incompleto aguardando decisão. */
export function ResumeProgressGate() {
  const { resumeAvailable, continueSavedProgress, restartSavedProgress } = useGame();
  if (!resumeAvailable) return null;
  return (
    <ResumeProgressModal
      onContinue={continueSavedProgress}
      onRestart={restartSavedProgress}
    />
  );
}
