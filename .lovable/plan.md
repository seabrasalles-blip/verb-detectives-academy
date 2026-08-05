# Revisão das telas do verbo GO (05, 06, 07)

## Situação atual verificada

Li os arquivos das três telas e dos componentes compartilhados. A maior parte do que o pedido descreve já está implementada:

- `Screen05MeaningGo` usa `MeaningVerbScreen` com 3 estados (Observar / Significado / Análise), imagem à esquerda em `left:35, top:105`, botões intermediários com texto contextual ("Descobrir o significado", "Analisar a frase") e Next só na fase 2.
- `Screen06TestHypothesis` usa `CompareVerbScreen` com fase de identificação (4 toques), depois alternativas, sufixo `es` destacado só após o acerto.
- `Screen07ConclusionGo` já tem 2 fases persistidas (`s7.phase`): regra com dois painéis e, depois, exemplos alinhados com um `InlineAudioButton` por frase.
- `Sentence.tsx` já expõe `fixedColumns`, `compactLabels`, `showQuestion`, `showRole`, `suffixHighlight` e `COLUMN_WIDTH`.
- `InvestigationStepButton`, `InlineAudioButton` e `CharacterLayer` com `scale`/`transformOrigin` já existem.

O que ainda não foi confirmado é o resultado visual em todos os estados e resoluções.

## O que farei

1. **Auditoria visual com Playwright** — percorrer cada estado das telas 05 (3 estados), 06 (identificação passo a passo, comparação, conclusão) e 07 (regra, exemplos) e capturar telas em 1200×675, 1366×768, 1600×900 e 1920×1080.
2. **Medição automática de colisões** — script que lê o retângulo de cada bloco pedagógico dentro do canvas lógico e sinaliza:
   - qualquer elemento com `bottom > 555`;
   - sobreposição entre caixas de conteúdo;
   - texto cortado (`scrollHeight > clientHeight`);
   - presença de barra de rolagem.
3. **Correções pontuais** nos arquivos citados, apenas onde a auditoria apontar problema:
   - ajuste de `top`/`width`/altura dos blocos que invadirem a faixa de navegação;
   - largura/altura uniforme das alternativas na tela 06 (58–66 px, 21–23 px, área `top` 350–370, largura 650–720);
   - presença visível da Lex (180–220 px reais) via `scale` no `CharacterLayer`;
   - redução de rótulos redundantes (`compactLabels`, `showQuestion`/`showRole`) onde houver repetição;
   - largura/posição dos `InlineAudioButton` (100–125 px) colados a cada frase na tela 07.
4. **Acessibilidade** — conferir `lang="en"` nas frases inglesas, `aria-label` por card e por áudio, foco visível, Enter/Espaço nos cards, `aria-live` no feedback e bloqueio de fundo no modal.
5. **Persistência** — confirmar que `s5.stage`, `s6.step`/`s6.answered` e `s7.phase` sobrevivem ao reload e que Back/Next continuam corretos.

## Escopo técnico

Arquivos que podem ser tocados: `Screen05MeaningGo.tsx`, `Screen06TestHypothesis.tsx`, `Screen07ConclusionGo.tsx`, `MeaningVerbScreen.tsx`, `CompareVerbScreen.tsx`, `Sentence.tsx`, `Instruction.tsx`, `AudioButton.tsx`, `CharacterLayer.tsx`, `InvestigationStepButton.tsx`.

Sem mudanças em assets, backgrounds, paleta, canvas 1200×675, GameStage ou nas demais telas.

## Entrega final

Relatório objetivo com: arquivos alterados, componentes ajustados, mudanças por tela, como as colisões foram evitadas, resoluções testadas e limitações restantes.
