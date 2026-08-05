# Corrigir a progressão pedagógica das telas de PLAY

A ordem das rotas continua igual (09 → 10 → 11). O que muda é onde cada conteúdo pedagógico vive: a análise gramatical de "They play soccer" sai da tela 09 e passa a ser a primeira fase da tela 11, depois da investigação do cartaz "She play soccer.".

## Tela 09 — apenas significado

Dois estados, sem análise:

1. Observar: cena do futebol, "They play soccer.", áudio e botão "Descobrir o significado". Instrução: "Observe a cena e leia a frase."
2. Significado: revela PLAY, "Play pode significar brincar ou jogar.", a frase e "Eles jogam futebol." Instrução: "O que a cena nos ajuda a entender?"

Ao revelar o significado a tela é concluída, o botão intermediário some e o Next aparece. Some da tela 09: cards They/play/soccer, rótulos quem?/ação/o quê?, rótulos SUJEITO/VERBO/COMPLEMENTO, a síntese e o painel inferior.

A tela 05 (GO) mantém os três estados atuais — a mudança é opcional no componente compartilhado e vale só para PLAY.

## Tela 10 — sem alterações de fluxo

Continua como está: cartaz "She play soccer.", fala da Lex, botão "Vou investigar", identificação de She e play por toque, hipótese "Talvez play mude quando o sujeito é she." e só então conclusão + Next. Verificação de que nada revela `plays`, o `s` ou a regra.

## Tela 11 — três fases internas

**Fase 1 — analyze-model** (conteúdo transferido da tela 09)

Instrução: "Vamos analisar uma frase correta para testar nossa hipótese."
Mostra They | play | soccer e pede identificação progressiva:

- "Toque em quem realiza a ação." → They: quem? / SUJEITO
- "Toque na palavra que mostra a ação." → play: ação / VERBO
- "Toque na palavra que completa a ideia." → soccer: o quê? / COMPLEMENTO

Nenhum rótulo aparece antes do respectivo acerto. Ao final, uma síntese de até duas linhas ("O sujeito mostra quem realiza a ação; o verbo mostra a ação.") e o botão intermediário "Comparar as frases". Next ainda oculto.

**Fase 2 — compare**

Substitui a composição anterior pelas duas frases alinhadas nas mesmas colunas:

```text
They | play  | soccer
She  | plays | soccer
```

Instrução neutra: "O que mudou entre as duas frases?" Alternativas nas três opções atuais. Erro → "Compare as palavras que mostram a ação." sem revelar o `s`. Acerto → oculta alternativas, mostra o feedback de conclusão e avança para a fase rule.

**Fase 3 — rule**

A tela é reorganizada (a comparação sai de cena): título "Descobrimos a regra do verbo play.", painéis I/You/We/They → PLAY e He/She/It → PLAYS (só o S final em amarelo), síntese "Com he, she e it, play recebe s: plays." e os dois exemplos compactos com áudio, incluindo "She plays soccer.". Só aqui a tela é concluída e o Next aparece.

## Estado salvo

A chave do armazenamento passa de `wordville-verb-detectives:v3` para `:v4`, removendo apenas a chave antiga deste projeto (sem `localStorage.clear()`), para que ninguém volte com a fase antiga da tela 09 ou etapas incompatíveis da 11.

Chaves internas: `s9.phase` (0 = observar, 1 = significado), `s10.phase` / `s10.found` (inalteradas), `s11.phase` (analyze-model | compare | rule), `s11.step`, `s11.answered`.

## Detalhes técnicos

- `MeaningVerbScreen.tsx`: nova prop opcional `withAnalysis` (padrão `true`). A tela 09 passa `withAnalysis={false}`, limitando as fases a 0–1, concluindo a tela ao chegar em 1 e não renderizando o painel de análise. A tela 05 (GO) permanece intacta.
- `CompareVerbScreen.tsx`: nova prop opcional `analyzeModel` (frase-modelo + instruções progressivas + síntese + rótulo do botão). Quando presente, a tela começa nessa fase, com toques sequenciais sujeito → verbo → complemento, e só depois entra na fase de comparação existente. A tela 06 (GO) não passa a prop e mantém o comportamento atual.
- A fase de comparação passa a exibir as duas frases já montadas (sem repetir a etapa de toques da 06) e a fase rule troca o conteúdo em vez de empilhar.
- `Sentence.tsx` já suporta `fixedColumns`, `showQuestion` e destaque de sufixo; sem mudanças estruturais previstas.
- `src/game/state.tsx`: `STORAGE_KEY` para `:v4` e `LEGACY_STORAGE_KEY` para `:v3` (limpeza no boot e no restart).
- `src/routes/index.tsx`: nenhuma mudança no array `SCREENS`.
- Áreas seguras mantidas (conteúdo até y=555), canvas 1200×675, sem scroll, sem sobreposição; botões intermediários nunca chamam `next()`.

## Validação

Percurso completo verificado no navegador: cena → significado → cartaz suspeito → investigação → hipótese → análise de "They play soccer" → comparação → regra PLAY/PLAYS, conferindo Back/Next em cada tela, ausência de análise na 09 e ausência de estado antigo restaurado.
