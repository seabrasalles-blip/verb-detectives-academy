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

const ScaleContext = createContext(1);
export const useStageScale = () => useContext(ScaleContext);

/**
 * Palco lógico fixo de 1200x675 (16:9). Todo o conteúdo é posicionado em
 * coordenadas lógicas e o palco inteiro é escalado proporcionalmente,
 * centralizado na janela com letterboxing. Nunca há scroll.
 */
export function GameStage({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const update = () => {
      const s = Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H);
      setScale(s);
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
    body.style.background = "#0d2c39";
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
      body.style.background = prevBg;
    };
  }, []);

  return (
    <ScaleContext.Provider value={scale}>
      <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-[#0d2c39]">
        <div
          className="relative overflow-hidden shadow-[0_18px_60px_rgba(0,0,0,0.35)]"
          style={{
            width: STAGE_W,
            height: STAGE_H,
            transform: `scale(${scale})`,
            transformOrigin: "center center",
          }}
        >
          {children}
        </div>
      </div>
    </ScaleContext.Provider>
  );
}
