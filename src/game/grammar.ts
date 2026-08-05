/**
 * Regras gramaticais centrais do aplicativo.
 *
 * Estratégia pedagógica: o aluno NUNCA decide pela quantidade de pessoas.
 * Ele descobre qual pronome pode substituir o sujeito e, a partir do grupo
 * desse pronome, escolhe a forma do verbo.
 *
 * Grupo 1 (base): I, you, we, they  -> go / play
 * Grupo 2 (-s/-es): he, she, it     -> goes / plays
 */

export type Pronoun = "I" | "you" | "we" | "they" | "he" | "she" | "it";
export type VerbGroup = "base" | "s";

export const GROUP_1: Pronoun[] = ["I", "you", "we", "they"];
export const GROUP_2: Pronoun[] = ["he", "she", "it"];

/** Grupo de conjugação do pronome. */
export function groupOf(pronoun: string): VerbGroup {
  const p = pronoun.trim().toLowerCase();
  if (p === "i") return "base";
  return (GROUP_2 as string[]).includes(p) ? "s" : "base";
}

/** Forma correta do verbo para um pronome. */
export function verbFor(verb: "go" | "play", pronoun: string): string {
  if (groupOf(pronoun) === "base") return verb;
  return verb === "go" ? "goes" : "plays";
}

/**
 * Pronome que pode substituir um sujeito nominal.
 * Só entram sujeitos com referente claro (sem "my friend" sem contexto).
 */
export const SUBJECT_PRONOUN: Record<string, Pronoun> = {
  Anna: "she",
  Maria: "she",
  "my sister": "she",
  "my mother": "she",
  Pedro: "he",
  Tom: "he",
  "my brother": "he",
  "my father": "he",
  "the cat": "it",
  "the dog": "it",
  "the bus": "it",
  "the children": "they",
  "Anna and Tom": "they",
  "my friends": "they",
};

/** Pronome que substitui o sujeito nominal (ou o próprio pronome). */
export function pronounFor(subject: string): Pronoun | null {
  const key = subject.trim();
  const direct = SUBJECT_PRONOUN[key];
  if (direct) return direct;
  const lower = key.toLowerCase();
  const found = Object.entries(SUBJECT_PRONOUN).find(([k]) => k.toLowerCase() === lower);
  if (found) return found[1];
  const asPronoun = (["I", "you", "we", "they", "he", "she", "it"] as Pronoun[]).find(
    (p) => p.toLowerCase() === lower,
  );
  return asPronoun ?? null;
}

/** Forma correta do verbo para qualquer sujeito (pronome ou nominal). */
export function verbForSubject(verb: "go" | "play", subject: string): string {
  const pronoun = pronounFor(subject);
  return verbFor(verb, pronoun ?? "they");
}
