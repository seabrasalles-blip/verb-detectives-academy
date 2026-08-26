# Substituir o asset do botão Back (btn-back)

Trocar exclusivamente o asset do botão **Voltar** pela nova imagem anexada (`btn-back1.png`), mantendo todo o restante do projeto intacto.

## Passos

1. **Upload do novo asset para a CDN**
   - Criar o pointer a partir do anexo: `lovable-assets create --file /mnt/user-uploads/btn-back1.png --filename btn-back.png > src/assets/btn-back.png.asset.json`
   - Isso gera um novo `asset_id`/URL estável; o pointer antigo é sobrescrito.

2. **Ajuste fino de proporção (se necessário)**
   - A nova imagem tem formato de cápsula larga (~960×316 no anexo, proporção ~3:1), diferente do asset atual.
   - Verificar no preview se `NAV_BUTTON_SIZE.back` (196px) e `visualScale={1.1}` em `src/components/game/ScreenFrame.tsx` continuam adequados com a nova arte; ajustar apenas essas constantes se o botão ficar desproporcional ao Next (176px).
   - O botão permanece no canto inferior esquerdo (`left: 20, bottom: 20`), com a seta apontando para a esquerda — a nova arte já respeita isso.

3. **Verificação**
   - Conferir o build (`/tmp/observability/build-errors.log`).
   - Validar via Playwright em algumas telas (ex.: Screen02, Screen08, Screen14): tamanho visual equilibrado com o Next, sem corte, sem sobreposição com Lex, foco de teclado visível (`rounded-[26px]` no `AssetButton` continua adequado à cápsula).

## Fora de escopo

- Nenhuma alteração em `btn-next`, Lex, backgrounds ou demais assets.
- Nenhuma mudança de fluxo, textos ou lógica de navegação.

## Detalhes técnicos

- Arquivo alterado: `src/assets/btn-back.png.asset.json` (novo pointer).
- Possível ajuste: `src/components/game/ScreenFrame.tsx` (apenas constantes `NAV_BUTTON_SIZE.back` / `visualScale`).
- O asset antigo na CDN pode ser removido depois com `lovable-assets delete` se não for mais referenciado; por segurança, não será deletado nesta etapa.
