# Wordville – Verb Detectives

Objeto digital educacional infantil (português brasileiro) para a descoberta do
Simple Present com os verbos **go** e **play**. A criança atua como detetive de
palavras e percorre o ciclo investigativo:

`OBSERVAR → ESTRANHAR → HIPÓTESE → IDENTIFICAR SUJEITO/VERBO → COMPARAR → DESCOBRIR O PADRÃO → APLICAR`

## Princípios pedagógicos

- **Substituição pronominal, não contagem de pessoas.** A criança nunca decide
  por "quantas pessoas". Ela troca o sujeito pelo pronome (`Anna → she`) e usa o
  grupo do pronome para escolher a forma do verbo.
  - Grupo base: `I / you / we / they` → `go`, `play`
  - Grupo -s/-es: `he / she / it` → `goes`, `plays`
- **Áudio só de frases corretas.** `canSpeak()` bloqueia estruturas incorretas
  (`He go...`, `They goes...`). As frases suspeitas da investigação existem só
  como pista visual e nunca viram modelo oral.
- **Feedback progressivo.** O primeiro erro convida a observar; a partir do
  segundo, a pista explica a regra. A resposta nunca é entregue de imediato.
- **Hierarquia narrativa.** "Pista encontrada", "Nossa hipótese", "Descoberta",
  "Etapa concluída" durante o percurso; **"Caso resolvido!" apenas na tela 15**.

## As 15 telas

| # | Tela | Etapa investigativa | Interação principal |
|---|------|---------------------|---------------------|
| 1 | Capa | Convite | Botão Start |
| 2 | O caso | Contexto | Diálogo da Lex |
| 3 | Cartaz suspeito | Observar / estranhar | Toque na palavra suspeita (`go`) |
| 4 | Hipótese | Levantar hipótese | Escolha entre três hipóteses |
| 5 | Significado de GO | Observar significado | 3 fases: cena → significado → análise |
| 6 | Testando a hipótese | Comparar | Identificar partes e comparar `I go` / `He goes` |
| 7 | Conclusão de GO | Sistematizar | Regra em painéis + exemplos com áudio |
| 8 | Prática com GO | Aplicar | 6 rodadas com pronomes |
| 9 | Significado de PLAY | Observar significado | 3 fases, mesma estrutura da tela 5 |
| 10 | Nova investigação | Observar / estranhar | Toque no verbo de `She play soccer.` (sem áudio) |
| 11 | Comparando PLAY | Comparar e descobrir | `They play` / `She plays` + regra |
| 12 | Classificação | Generalizar | Classificar pronomes e sujeitos nominais em dois grupos |
| 13 | Outros sujeitos | Aplicar | 5 rodadas com `Anna`, `The children`, `The dog`... |
| 14 | Produção guiada | Produzir | Montar frases a partir de imagens |
| 15 | Encerramento | Fechar o caso | Síntese + reinício ("Caso resolvido!") |

## Acessibilidade

- Documento em `lang="pt-BR"`; toda frase em inglês marcada com `lang="en"`.
- Modais de feedback com `role="dialog"` / `alertdialog`, `aria-modal`,
  `aria-labelledby`, `aria-describedby`, foco preso, retorno de foco, `Esc` e
  restante da tela marcado como `inert`.
- Região `aria-live="assertive"` anuncia cada feedback.
- Alvos de toque com no mínimo 64px; textos entre 20px e 46px no palco.
- `@media (prefers-reduced-motion: reduce)` desliga animações e transições.
- Foco visível (`focus-visible:ring`) em todos os controles.

## Áudio (Web Speech API)

`src/game/speech.ts` cuida da síntese:
- espera o evento `voiceschanged` e prioriza vozes femininas `en-US`;
- `isSpeechSupported()` desabilita o botão quando não há suporte;
- `canSpeak()` impede a leitura de frases gramaticalmente incorretas;
- cancela sempre a fala anterior e só fala após ação explícita da criança.

## Persistência

`localStorage` na chave `wordville-verb-detectives:v3`, com campo `version`.
Estados de versões antigas ou corrompidos são descartados sem travar o app.
Guardamos tela atual, telas concluídas, tentativas por tela e o estado interno
de cada atividade. O botão **Restart** limpa tudo e volta à tela 1.

## Estrutura

```text
src/
  game/
    assets.ts      mapeamento dos assets
    grammar.ts     regras de pronome/verbo (fonte única da verdade)
    speech.ts      síntese de voz segura
    state.tsx      progresso e persistência
    screens/       as 15 telas
  components/game/ componentes do palco (1200x675, escala automática)
```

## Scripts

```bash
bun run dev     # ambiente de desenvolvimento
bun run build   # build de produção
bun run test    # testes unitários (Vitest)
bun run lint    # ESLint
```
