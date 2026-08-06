# Continuar ou Recomeçar: modal de retomada

Quando houver uma investigação incompleta salva no navegador, o app deixa de restaurar o progresso automaticamente e passa a perguntar ao aluno o que fazer.

## Comportamento

- Sem progresso salvo: abre na capa, sem modal.
- Progresso incompleto salvo: a capa aparece ao fundo (sem interação) e um modal bloqueia a tela com as opções Continuar e Recomeçar. O progresso salvo não é apagado nem sobrescrito enquanto o aluno não decide.
- Continuar: restaura tela, telas concluídas, tentativas, rodadas, cards e respostas intermediárias exatamente como estavam.
- Recomeçar: apaga somente as chaves deste app, volta à capa e inicia sessão vazia.
- Sessão marcada como concluída (`finished: true`): comportamento atual mantido — a sessão é descartada, o app abre na capa e o modal não aparece.
- Restart da tela final continua igual e não dispara o modal.
- Nada de `beforeunload`, `alert`, `confirm` ou diálogo nativo.

## Alterações técnicas

**src/game/state.tsx**
- `STORAGE_KEY = "wordville-verb-detectives:v5"`, `PREVIOUS_STORAGE_KEY = "...:v4"`; a chave v3 é apenas removida.
- Novos estados: `pendingProgress: Saved | null` e `hydrationStatus: "loading" | "awaiting-choice" | "ready"`.
- Helper `hasMeaningfulProgress(saved)`: screen > 1, ou completed/attempts/data não vazios.
- Hidratação: lê v5; se ausente, lê v4 (migração). JSON inválido → remove só aquela chave e segue vazio. `finished === true` → remove a chave e fica `ready`. Progresso significativo → guarda em `pendingProgress` sem aplicar nenhum `setState` e fica `awaiting-choice`. Sem progresso significativo → remove o registro vazio e fica `ready`.
- Efeito de gravação só executa com `hydrationStatus === "ready"`, evitando que o estado vazio sobrescreva o progresso durante o modal.
- `continueSavedProgress()`: aplica screen/completed/attempts/data do pendente, mantém `finished=false`, grava em v5 e remove v4.
- `restartSavedProgress()`: limpa todos os estados, remove v5 e v4 com `removeItem` (nunca `localStorage.clear()`), volta à capa.
- Contexto ganha `hydrationStatus`, `resumeAvailable`, `continueSavedProgress`, `restartSavedProgress`; `restart()` reutiliza a mesma limpeza interna.

**src/components/game/ResumeProgressModal.tsx** (novo)
- Overlay cobrindo o palco 1200×675, fundo azul-petróleo ~36%, acima de tudo.
- Card opaco `#FFFDF6`, borda azul-céu, raio 28px, largura ~560px, sombra moderada, sem scroll.
- Lex pensando (~160px), título "Investigação em andamento", mensagem, aviso sobre apagar respostas.
- Botões HTML lado a lado: Continuar (azul-céu/verde-água, borda azul-petróleo) e Recomeçar (fundo claro, borda e texto coral), 190×58 mínimo.
- `role="dialog"`, `aria-modal`, `aria-labelledby`/`aria-describedby`, foco inicial em Continuar, foco preso (Tab/Shift+Tab), sem fechar por Escape ou clique fora.

**src/routes/index.tsx**
- Renderiza `<ResumeProgressGate />` dentro do `GameStage`, acima do `ScreenRouter`; retorna `null` quando `resumeAvailable` é falso.
- Enquanto `hydrationStatus !== "ready"`, o `ScreenRouter` mostra a capa sem interação (nunca a tela salva), evitando piscada.

## Verificação

Playwright cobrindo: primeira visita sem modal; refresh com progresso parcial mostrando o modal com a capa ao fundo; Continuar restaurando tela/rodada/cards/tentativas; Recomeçar limpando e não reabrindo o modal; sessão concluída abrindo na capa; migração v4 → v5 com remoção da v4 após a escolha; navegação por teclado, mouse e toque; ausência de scroll e de chaves externas afetadas.
