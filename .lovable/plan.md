# Wordville – Verb Detectives

Objeto digital educacional infantil (Inglês, 8–10 anos) sobre `go/goes` e `play/plays`, em 13 telas, com palco fixo 16:9 e os 14 assets enviados como base visual.

## Assets recebidos (todos serão usados)

- 4 backgrounds: cover, investigation-room, activity, final
- 4 poses da Lex: neutral, pointing, thinking, celebrating
- 6 botões: start, next, back, audio, hint, restart

Cada arquivo será publicado no CDN de assets do projeto e referenciado por um mapa único (`src/game/assets.ts`), com pré-carregamento no início para evitar piscadas entre telas. Nenhum emoji, ícone Lucide ou ilustração gerada substituirá esses arquivos.

## Palco fixo 16:9

Componente `GameStage`: canvas lógico de 1200 × 675 px, escalado por `transform: scale(...)` com `transform-origin: center center`, centralizado com letterbox, `overflow: hidden` no body/root/palco. Sem scroll em nenhuma tela; verificação nas resoluções 1200×675, 1366×768, 1440×900, 1920×1080 e tablet paisagem.

## Estrutura das telas

1. Capa — título Wordville / Verb Detectives, Lex neutra grande, botão Start
2. O caso de Wordville — Lex apontando, balão com 3 linhas, Back/Next
3. Primeira pista — "He go to school.", cada palavra clicável, áudio, dica
4. Comparando go e goes — duas frases destacadas, 3 alternativas
5. Descobrindo o padrão — dois grupos revelados por toque, síntese ao final
6. Prática com GO — 4 rodadas, GO/GOES, progresso "1 de 4"
7. Nova pista: play — "She play soccer.", palavras clicáveis, áudio
8. Comparando play e plays — 3 alternativas
9. Prática com PLAY — 4 rodadas
10. Organizando os sujeitos — arrastar (mouse/toque) + alternativa por clique/teclado, com devolução do card em caso de erro
11. Revisão mista — 4 rodadas alternando go/play, frase completa após o acerto
12. O último cartaz — 4 cartazes grandes, feedback específico por alternativa errada
13. Encerramento — Lex comemorando, síntese do padrão, botão Restart

Todos os textos pedagógicos em HTML (nada embutido nas imagens). Uma única ação cognitiva por tela; nenhuma alternativa começa selecionada; erro nunca bloqueia nem revela a resposta.

## Componentes

`GameStage`, `ScreenRouter`, `BackgroundLayer`, `CharacterLayer`, `DialogueBubble`, `SentenceBoard`, `WordOption`, `FeedbackModal`, `AssetButton`, `AudioButton`, `HintButton`, `ProgressMarker`.

Estado central (tela atual, respostas, tentativas) em um store simples com persistência em `localStorage`; Restart limpa tudo e volta à capa. Sem backend, login ou APIs externas.

## Feedback, áudio, dicas

- Acerto: detalhe verde-água, Lex comemorando, explica o padrão, fecha sozinho em ~2,8 s e libera o Next
- Erro: detalhe coral, Lex pensando, pista curta, permite nova tentativa
- Áudio: `speechSynthesis` en-US, rate 0.82, voz inglesa quando disponível, cancelando fala anterior
- Hint nas telas 3, 6, 7, 9, 10, 11 e 12, ficando mais específico após duas tentativas erradas

## Estilo e acessibilidade

Paleta informada aplicada como tokens em `src/styles.css` (oklch), painéis claros com borda azul-petróleo, cards de palavra ≥ 130 × 70 px, sem visual de dashboard nem componentes shadcn padrão. Navegação por teclado com foco visível, Enter/Espaço nas alternativas, `aria-label` em todos os botões-imagem, `alt` nas poses da Lex, `aria-live` nos feedbacks e respeito a `prefers-reduced-motion`. Animações de 150–350 ms nas interações e 400–600 ms nas transições de tela.

## Notas técnicas

- Projeto TanStack Start já existente: a experiência vive em `src/routes/index.tsx` (rota `/`), substituindo o placeholder, com `head()` próprio de título e descrição.
- Lógica pedagógica (frases, respostas, feedbacks, dicas) centralizada em `src/game/content.ts` para facilitar edição.
- Os PNGs enviados são pesados (~2 MB cada); serão otimizados para web ao subir para o CDN, mantendo a arte original.
