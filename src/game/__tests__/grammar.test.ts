import { describe, expect, it } from "vitest";
import { canSpeak } from "@/game/speech";
import { groupOf, pronounFor, verbFor, verbForSubject } from "@/game/grammar";

describe("canSpeak", () => {
  it("bloqueia frases incorretas com he/she/it", () => {
    expect(canSpeak("He go to school.")).toBe(false);
    expect(canSpeak("She play soccer.")).toBe(false);
    expect(canSpeak("It go to the garden.")).toBe(false);
  });

  it("bloqueia frases incorretas com I/you/we/they", () => {
    expect(canSpeak("They goes to school.")).toBe(false);
    expect(canSpeak("I plays soccer.")).toBe(false);
  });

  it("permite frases corretas", () => {
    expect(canSpeak("He goes to school.")).toBe(true);
    expect(canSpeak("They play soccer.")).toBe(true);
    expect(canSpeak("I go to school.")).toBe(true);
  });

  it("bloqueia texto vazio", () => {
    expect(canSpeak("   ")).toBe(false);
  });
});

describe("regras gramaticais", () => {
  it("agrupa pronomes corretamente", () => {
    expect(groupOf("I")).toBe("base");
    expect(groupOf("they")).toBe("base");
    expect(groupOf("she")).toBe("s");
  });

  it("conjuga o verbo pelo pronome", () => {
    expect(verbFor("go", "we")).toBe("go");
    expect(verbFor("go", "he")).toBe("goes");
    expect(verbFor("play", "it")).toBe("plays");
  });

  it("substitui sujeitos nominais por pronomes", () => {
    expect(pronounFor("Anna")).toBe("she");
    expect(pronounFor("the dog")).toBe("it");
    expect(pronounFor("Anna and Tom")).toBe("they");
    expect(pronounFor("Nobody")).toBeNull();
  });

  it("conjuga a partir de sujeitos nominais", () => {
    expect(verbForSubject("go", "Anna")).toBe("goes");
    expect(verbForSubject("play", "The children")).toBe("play");
  });
});
