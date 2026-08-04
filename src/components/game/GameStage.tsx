import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";

export const STAGE_W = 1200;
export const STAGE_H = 675;
const LETTERBOX = "#E4F4FF";

const ScaleContext = createContext(1);
export const useStageScale = () => useContext(ScaleContext);

/**
 * Palco lógico fixo de 1200x675 (16:9). Todo o conteúdo é posicionado em
 * coordenadas lógicas e o palco inteiro é escalado proporcionalmente,
 * centralizado na janela com letterboxing claro. Nunca há scroll.
 */
export function GameStage({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(1);
  const [portrait, setPortrait] = useState(false);

  useLayoutEffect(() => {
    const update = () => {
      setScale(Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H));
      setPortrait(window.innerHeight > window.innerWidth);
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    const prevBg = body.style.background;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.background = LETTERBOX;
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
      body.style.background = prevBg;
    };
  }, []);

  return (
    <ScaleContext.Provider value={scale}>
      <div
        className="fixed inset-0 flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: LETTERBOX }}
      >
        <div
          className="relative overflow-hidden shadow-[0_18px_60px_rgba(24,59,74,0.20)]"
          style={{
            width: STAGE_W,
            height: STAGE_H,
            transform: `scale(${scale})`,
            transformOrigin: "center center",
          }}
        >
          {children}
        </div>

        {portrait && (
          <div
            role="alert"
            className="absolute inset-0 z-[80] flex flex-col items-center justify-center gap-5 px-8 text-center"
            style={{ backgroundColor: LETTERBOX }}
          >
            <span
              aria-hidden="true"
              className="h-[92px] w-[150px] rounded-[16px] border-[6px] border-[#24566B] motion-safe:animate-[wv-bounce_1.4s_ease-in-out_infinite]"
            />
            <p className="max-w-[420px] text-[22px] leading-snug font-extrabold text-[#183B4A]">
              Gire o dispositivo para a horizontal para continuar a investigação.
            </p>
          </div>
        )}
      </div>
    </ScaleContext.Provider>
  );
}
