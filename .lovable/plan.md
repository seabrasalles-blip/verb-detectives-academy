# Revisão global da Lex (tamanho e posicionamento)

Objetivo: deixar a Lex maior, afastada da margem esquerda, longe do botão Back (que agora tem 196 px de largura, ancorado em left 20 / bottom 20) e visualmente ligada ao conteúdo de cada tela — sem tocar nos PNGs, textos, painéis, navegação ou no canvas 1200 × 675.

## 1. Novo arquivo de presets

`src/game/characterPlacements.ts` com `CHARACTER_PLACEMENTS`:

| preset | height | left/right | bottom | scale | origem |
|---|---|---|---|---|---|
| narrativePointing | 350 | left 30 | 94 | 1.08 | bottom left |
| narrativeThinking | 335 | left 30 | 94 | 1.10 | bottom left |
| activityPointing | 320 | left 28 | 90 | 1.10 | bottom left |
| activityThinking | 315 | left 30 | 90 | 1.12 | bottom left |
| rulePointing | 320 | left 28 | 88 | 1.10 | bottom left |
| finalCelebrating | 390 | right 24 | 32 | 1.04 | bottom right |
| coverNeutral (exceção) | 430 | left 780 | 16 | 1.0 | bottom center |

Todos com `objectPosition` igual ao `transformOrigin`. `bottom ≥ 88` mantém 18–28 px livres acima do Back.

## 2. CharacterLayer.tsx

- Nova prop opcional `placement?: keyof typeof CHARACTER_PLACEMENTS`.
- Resolução: preset → props explícitas da tela → defaults. As props continuam podendo sobrescrever qualquer campo.
- Posicionamento vertical exclusivo: aplicar `top` **ou** `bottom`, nunca os dois (hoje `bottom = 0` vaza mesmo com `top` definido). Mesma regra para `left`/`right`.
- `transform` continua composto na ordem `scaleX(-1) scale(n)` quando há flip + escala.
- Sem mudanças em alt text, animação de entrada ou drop-shadow.

## 3. Telas atualizadas

| tela | hoje | passa a usar |
|---|---|---|
| Screen02Case | pointing 330 / left 16 / bottom 40 | `narrativePointing` |
| Screen03Poster | thinking 300 / left 12 / bottom 40 | `narrativeThinking` |
| Screen04Hypothesis | pointing 250 / left 4 / bottom 40 | `activityPointing` |
| Screen07ConclusionGo | pointing 290 / left 2 / bottom 40 | `rulePointing` |
| Screen10NewInvestigation | thinking 240 / left 4 / bottom 60 | `activityThinking` |
| Screen12Sorting | pointing 200 / left 2 / bottom 120 | `activityPointing` com `bottom` próprio (a tela tem alternativas baixas) |
| RoundPractice | height 300 / left 8 / bottom 110 | `activityPointing` + `bottom` próprio (marcador de rodadas) |
| CompareVerbScreen — fase regra | pointing 280 / left 2 / bottom 60 | `rulePointing` |
| CompareVerbScreen — identificação | thinking 280 / left 4 / bottom 70 | `activityThinking` |
| Screen15Closing | celebrating 390 / right 16 | `finalCelebrating` (composição mantida) |
| Screen01Cover | neutral 430 / left 780 | mantida como exceção (capa, Lex à direita do título) |

Nenhuma alternativa, painel, poster ou botão muda de lugar; ajuste apenas se a verificação visual mostrar colisão.

## 4. Verificação

Playwright em 1200×675, 1366×768, 1600×900 e 1920×1080, percorrendo as 15 telas: capturas de tela para confirmar que a Lex não encosta na margem nem no Back, não é cortada (chapéu, lupa, mão, pés), não cobre conteúdo e que não há scroll. Ajuste fino dos presets se alguma captura reprovar.

## 5. Relatório final

Ao terminar, informo: mudanças no CharacterLayer, presets criados com valores finais, telas atualizadas, exceções (capa, sorting, prática), como a folga em relação ao Back foi garantida e as resoluções testadas.
