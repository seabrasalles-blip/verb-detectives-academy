import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { stopSpeaking } from "./speech";

const STORAGE_KEY = "wordville-verb-detectives:v3";
const LEGACY_STORAGE_KEY = "wordville-verb-detectives:v2";
export const TOTAL_SCREENS = 15;

type Saved = {
  screen: number;
  completed: number[];
  attempts: Record<number, number>;
  data: Record<string, unknown>;
  finished: boolean;
};

type GameContextValue = {
  screen: number;
  isDone: (n: number) => boolean;
  complete: (n: number) => void;
  next: () => void;
  back: () => void;
  goTo: (n: number) => void;
  restart: () => void;
  /** Sessão concluída: o próximo carregamento começa do zero. */
  finished: boolean;
  finish: () => void;
  attempts: number;
  registerMiss: () => void;
  resetAttempts: () => void;
  /** Estado intermediário de cada atividade (rodada atual, cards já colocados...). */
  getData: <T>(key: string, fallback: T) => T;
  setData: (key: string, value: unknown) => void;
};

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState(1);
  const [completed, setCompleted] = useState<number[]>([]);
  const [attemptsByScreen, setAttemptsByScreen] = useState<Record<number, number>>({});
  const [data, setDataState] = useState<Record<string, unknown>>({});
  const [finished, setFinished] = useState(false);
  const hydrated = useRef(false);
  const [, forceHydrated] = useState(0);

  // localStorage só existe no cliente; hidratamos depois da montagem.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<Saved>;
        if (typeof parsed.screen === "number") {
          setScreen(Math.min(Math.max(parsed.screen, 1), TOTAL_SCREENS));
        }
        if (Array.isArray(parsed.completed)) setCompleted(parsed.completed);
        if (parsed.attempts && typeof parsed.attempts === "object") {
          setAttemptsByScreen(parsed.attempts);
        }
        if (parsed.data && typeof parsed.data === "object") setDataState(parsed.data);
      }
    } catch {
      /* progresso corrompido: recomeça do zero */
    }
    hydrated.current = true;
    forceHydrated((n) => n + 1);
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          screen,
          completed,
          attempts: attemptsByScreen,
          data,
        } satisfies Saved),
      );
    } catch {
      /* armazenamento indisponível */
    }
  }, [screen, completed, attemptsByScreen, data]);

  const complete = useCallback((n: number) => {
    setCompleted((prev) => (prev.includes(n) ? prev : [...prev, n]));
  }, []);

  const goTo = useCallback((n: number) => {
    stopSpeaking();
    setScreen(Math.min(Math.max(n, 1), TOTAL_SCREENS));
  }, []);

  const setData = useCallback((key: string, value: unknown) => {
    setDataState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const value = useMemo<GameContextValue>(
    () => ({
      screen,
      isDone: (n: number) => completed.includes(n),
      complete,
      next: () => goTo(screen + 1),
      back: () => goTo(screen - 1),
      goTo,
      restart: () => {
        stopSpeaking();
        setCompleted([]);
        setAttemptsByScreen({});
        setDataState({});
        setScreen(1);
        try {
          window.localStorage.removeItem(STORAGE_KEY);
        } catch {
          /* ignore */
        }
      },
      attempts: attemptsByScreen[screen] ?? 0,
      registerMiss: () =>
        setAttemptsByScreen((prev) => ({ ...prev, [screen]: (prev[screen] ?? 0) + 1 })),
      resetAttempts: () => setAttemptsByScreen((prev) => ({ ...prev, [screen]: 0 })),
      getData: <T,>(key: string, fallback: T) =>
        (Object.prototype.hasOwnProperty.call(data, key) ? (data[key] as T) : fallback),
      setData,
    }),
    [screen, completed, complete, goTo, attemptsByScreen, data, setData],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame precisa estar dentro de GameProvider");
  return ctx;
}

/** Estado de uma atividade, persistido junto com o progresso. */
export function usePersistentState<T>(key: string, initial: T) {
  const { getData, setData } = useGame();
  const value = getData<T>(key, initial);
  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      const resolved =
        typeof next === "function" ? (next as (prev: T) => T)(getData<T>(key, initial)) : next;
      setData(key, resolved);
    },
    [getData, setData, key, initial],
  );
  return [value, set] as const;
}
