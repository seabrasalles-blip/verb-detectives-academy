import { defineConfig } from "vitest/config";

/** Configuração isolada dos testes unitários (não afeta o build do app). */
export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.{ts,tsx}"],
    globals: true,
  },
});
