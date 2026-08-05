# Persistência: reiniciar sessões concluídas

O progresso parcial continua sendo salvo; apenas sessões já concluídas deixam de ser restauradas ao atualizar a página.

## Comportamento final

- Atualizar durante uma atividade: restaura tela, rodada, tentativas, cards e estados intermediários (como hoje).
- Ao abrir a tela final, a sessão é marcada como concluída, mas a tela permanece visível.
- Atualizar depois disso: o progresso salvo é descartado e o app abre na capa, com tudo zerado.
- Restart continua limpando tudo imediatamente.
- A tela final passa a mostrar apenas o botão Restart (sem Back e sem Next).

## Alterações técnicas

**src/game/state.tsx**
- `STORAGE_KEY = "wordville-verb-detectives:v3"` e `LEGACY_STORAGE_KEY = "wordville-verb-detectives:v2"`.
- `Saved` ganha `finished: boolean`; novo estado `finished` e função `finish()` no contexto.
- Hidratação: remove a chave legada v2 (sem restaurar nada dela); ao ler v3, se `parsed.finished === true`, remove apenas essa chave e mantém os estados iniciais vazios; caso contrário restaura normalmente.
- Efeito de gravação inclui `finished` no objeto salvo e nas dependências.
- `finish()` (useCallback): para o áudio, marca `finished` e adiciona a tela final a `completed`, sem navegar.
- `restart()`: adiciona `setFinished(false)` e remove as duas chaves do app com `removeItem` (nunca `localStorage.clear()`).

**src/game/screens/Screen15Closing.tsx**
- Usa `const { restart, finish } = useGame()` e chama `finish()` em um `useEffect` na montagem.
- `ScreenFrame` passa a receber `showBack={false}` além de `showNext={false}`.

## Verificação

Testes com Playwright cobrindo: sessão incompleta preservada após reload; tela final visível e reload abrindo na capa sem respostas; Restart limpando na hora e permanecendo limpo após reload; chave v2 simulada removida sem restauração; e nenhuma outra chave do localStorage afetada.
