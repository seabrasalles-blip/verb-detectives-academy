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

const STORAGE_KEY = "wordville-verb-detectives:v5";
const PREVIOUS_STORAGE_KEY = "wordville-verb-detectives:v4";
const OBSOLETE_STORAGE_KEYS = [
  "wordville-verb-detectives:v3",
  "wordville-verb-detectives:v2",
];
export const TOTAL_SCREENS = 15;

type Saved = {
  screen: number;
  completed: number[];
  attempts: Record<number, number>;
  data: Record<string, unknown>;
  finished: boolean;
};

type PendingProgress = Partial<Saved> | null;

type HydrationStatus = "loading" | "awaiting-choice" | "ready";

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
  /** Retomada de sessão incompleta. */
  hydrationStatus: HydrationStatus;
  resumeAvailable: boolean;
  continueSavedProgress: () => void;
  restartSavedProgress: () => void;
};

const GameContext = createContext<GameContextValue | null>(null);

const hasMeaningfulProgress = (saved: Partial<Saved>) =>
  Boolean(
    (typeof saved.screen === "number" && saved.screen > 1) ||
      (Array.isArray(saved.completed) && saved.completed.length > 0) ||
      (saved.attempts &&
        typeof saved.attempts === "object" &&
        Object.keys(saved.attempts).length > 0) ||
      (saved.data && typeof saved.data === "object" && Object.keys(saved.data).length > 0),
  );

const removeKey = (key: string) => {
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* armazenamento indisponível */
  }
};

export function GameProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState(1);
  const [completed, setCompleted] = useState<number[]>([]);
  const [attemptsByScreen, setAttemptsByScreen] = useState<Record<number, number>>({});
  const [data, setDataState] = useState<Record<string, unknown>>({});
  const [finished, setFinished] = useState(false);
  const [pendingProgress, setPendingProgress] = useState<PendingProgress>(null);
  const [hydrationStatus, setHydrationStatus] = useState<HydrationStatus>("loading");
  const hydrated = useRef(false);

  // localStorage só existe no cliente; hidratamos depois da montagem.
  useEffect(() => {
    // Chaves muito antigas do próprio projeto: descartadas sem restaurar.
    OBSOLETE_STORAGE_KEYS.forEach(removeKey);

    const read = (key: string): Partial<Saved> | null | undefined => {
      let raw: string | null = null;
      try {
        raw = window.localStorage.getItem(key);
      } catch {
        return undefined;
      }
      if (!raw) return undefined;
      try {
        const parsed = JSON.parse(raw) as Partial<Saved>;
        if (!parsed || typeof parsed !== "object") throw new Error("inválido");
        return parsed;
      } catch {
        removeKey(key);
        return null;
      }
    };

    let source = STORAGE_KEY;
    let parsed = read(STORAGE_KEY);
    if (parsed === undefined) {
      source = PREVIOUS_STORAGE_KEY;
      parsed = read(PREVIOUS_STORAGE_KEY);
    }

    if (parsed && typeof parsed === "object") {
      if (parsed.finished === true) {
        // Sessão já concluída: começa uma nova sessão vazia.
        removeKey(source);
      } else if (hasMeaningfulProgress(parsed)) {
        setPendingProgress(parsed);
        hydrated.current = true;
        setHydrationStatus("awaiting-choice");
        return;
      } else {
        removeKey(source);
      }
    }

    hydrated.current = true;
    setHydrationStatus("ready");
  }, []);

  useEffect(() => {
    if (!hydrated.current || hydrationStatus !== "ready") return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          screen,
          completed,
          attempts: attemptsByScreen,
          data,
          finished,
        } satisfies Saved),
      );
    } catch {
      /* armazenamento indisponível */
    }
  }, [screen, completed, attemptsByScreen, data, finished, hydrationStatus]);

  const clearProgress = useCallback(() => {
    stopSpeaking();
    setCompleted([]);
    setAttemptsByScreen({});
    setDataState({});
    setFinished(false);
    setScreen(1);
    removeKey(STORAGE_KEY);
    removeKey(PREVIOUS_STORAGE_KEY);
  }, []);

  const continueSavedProgress = useCallback(() => {
    const saved = pendingProgress;
    if (!saved) {
      setHydrationStatus("ready");
      return;
    }
    setScreen(
      typeof saved.screen === "number"
        ? Math.min(Math.max(saved.screen, 1), TOTAL_SCREENS)
        : 1,
    );
    setCompleted(Array.isArray(saved.completed) ? saved.completed : []);
    setAttemptsByScreen(
      saved.attempts && typeof saved.attempts === "object" ? saved.attempts : {},
    );
    setDataState(saved.data && typeof saved.data === "object" ? saved.data : {});
    setFinished(false);
    setPendingProgress(null);
    // Migração: a partir daqui a sessão vive apenas na chave atual.
    removeKey(PREVIOUS_STORAGE_KEY);
    setHydrationStatus("ready");
  }, [pendingProgress]);

  const restartSavedProgress = useCallback(() => {
    clearProgress();
    setPendingProgress(null);
    setHydrationStatus("ready");
  }, [clearProgress]);

  const complete = useCallback((n: number) => {
    setCompleted((prev) => (prev.includes(n) ? prev : [...prev, n]));
  }, []);

  const finish = useCallback(() => {
    stopSpeaking();
    setFinished(true);
    setCompleted((prev) => (prev.includes(TOTAL_SCREENS) ? prev : [...prev, TOTAL_SCREENS]));
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
      finished,
      finish,
      restart: clearProgress,
      attempts: attemptsByScreen[screen] ?? 0,
      registerMiss: () =>
        setAttemptsByScreen((prev) => ({ ...prev, [screen]: (prev[screen] ?? 0) + 1 })),
      resetAttempts: () => setAttemptsByScreen((prev) => ({ ...prev, [screen]: 0 })),
      getData: <T,>(key: string, fallback: T) =>
        (Object.prototype.hasOwnProperty.call(data, key) ? (data[key] as T) : fallback),
      setData,
      hydrationStatus,
      resumeAvailable: hydrationStatus === "awaiting-choice" && pendingProgress !== null,
      continueSavedProgress,
      restartSavedProgress,
    }),
    [
      screen,
      completed,
      complete,
      goTo,
      attemptsByScreen,
      data,
      setData,
      finished,
      finish,
      clearProgress,
      hydrationStatus,
      pendingProgress,
      continueSavedProgress,
      restartSavedProgress,
    ],
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
