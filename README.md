# Verb Detectives Adventure

Crie do zero um objeto digital educacional infantil chamado:

WORDVILLE – VERB DETECTIVES

IMPORTANTE:

Este é um novo projeto. Não reproduza o layout do projeto antigo e não utilize uma aparência de dashboard, plataforma corporativa ou aplicativo genérico criado por IA.

Antes de programar, analise todos os assets enviados. Eles definem a identidade visual obrigatória do projeto. Use esses arquivos como elementos principais da composição e não tente substituí-los por emojis, ilustrações genéricas, ícones Lucide ou imagens criadas automaticamente.

==================================================

1. CONTEXTO PEDAGÓGICO

==================================================

Público:

Crianças dos anos iniciais do Ensino Fundamental, aproximadamente 8 a 10 anos.

Componente:

Língua Inglesa.

Tema:

Uso dos verbos “go” e “play” no presente simples, especialmente a diferença entre:

I / You / We / They → go / play

He / She / It → goes / plays

Objetivos de aprendizagem:

- reconhecer que o verbo muda com he, she e it;

- diferenciar go de goes;

- diferenciar play de plays;

- completar frases simples em inglês;

- relacionar sujeitos e formas verbais;

- observar padrões linguísticos por comparação;

- aprender por tentativa, feedback e descoberta.

A explicação final deve mostrar que:

- com I, you, we e they, usamos a forma básica do verbo;

- com he, she e it, o verbo muda;

- geralmente acrescentamos “s”;

- em alguns verbos, acrescentamos “es”;

- go transforma-se em goes;

- play transforma-se em plays.

Não apresente toda essa regra logo no início. O aluno deve descobri-la progressivamente.

==================================================

2. PRINCÍPIOS PEDAGÓGICOS E DE EXPERIÊNCIA

==================================================

O material deve seguir rigorosamente estes princípios:

1. Uma única ação cognitiva principal por tela.

2. Pouco texto em cada tela.

3. Instruções curtas e diretas.

4. Frases em inglês grandes e visualmente destacadas.

5. Explicações em português simples e adequadas para crianças.

6. O aluno pode tentar novamente após errar.

7. O erro nunca deve bloquear permanentemente a atividade.

8. O feedback de erro não deve revelar imediatamente a resposta.

9. O feedback de acerto deve explicar brevemente o padrão observado.

10. Não utilizar verdadeiro ou falso.

11. Não apresentar alternativas já selecionadas.

12. Não colocar várias atividades diferentes na mesma tela.

13. Não criar caça-palavras.

14. Não utilizar menus laterais, cards excessivos ou telas parecidas com dashboards.

15. A personagem Lex deve participar da narrativa e não aparecer como uma pequena decoração.

==================================================

3. IDENTIDADE VISUAL

==================================================

O projeto deve utilizar os assets fornecidos.

Personagem:

- /assets/characters/lex-neutral.png

- /assets/characters/lex-pointing.png

- /assets/characters/lex-thinking.png

- /assets/characters/lex-celebrating.png

Backgrounds:

- /assets/backgrounds/bg-cover.png

- /assets/backgrounds/bg-investigation-room.png

- /assets/backgrounds/bg-activity.png

- /assets/backgrounds/bg-final.png

Botões:

- /assets/buttons/btn-start.png

- /assets/buttons/btn-next.png

- /assets/buttons/btn-back.png

- /assets/buttons/btn-audio.png

- /assets/buttons/btn-hint.png

- /assets/buttons/btn-restart.png

Paleta complementar para elementos criados em HTML e CSS:

--background-light: #F4FAFF;

--background-blue: #E4F4FF;

--sky-blue: #52B7E8;

--dark-teal: #24566B;

--coral: #FF786A;

--mint: #58CDB5;

--lavender: #A995E8;

--yellow: #FFD76A;

--main-text: #183B4A;

--white: #FFFFFF;

Direção estética:

- visual infantil, claro, vivo e autoral;

- aparência de ilustração editorial ou objeto educacional;

- cores luminosas;

- evitar filtro amarelado;

- evitar fundos escuros;

- evitar excesso de sombras;

- evitar cards brancos repetidos;

- evitar gradientes genéricos em todas as superfícies;

- evitar pequenos ícones espalhados pela tela;

- usar os próprios cenários para organizar visualmente o conteúdo;

- aproveitar os quadros e áreas livres existentes nos backgrounds;

- manter Lex grande e expressiva.

Escala visual recomendada:

- Lex: aproximadamente 300 a 460 px de altura, conforme a tela;

- títulos: 42 a 58 px;

- frases em inglês: 34 a 48 px;

- instruções: 22 a 28 px;

- alternativas: mínimo de 28 px;

- botões principais: largura visual aproximada de 170 a 240 px;

- áreas clicáveis: mínimo de 56 × 56 px.

Não coloque textos diretamente dentro dos arquivos de background.

Todos os textos pedagógicos devem ser renderizados em HTML para permitir edição, acessibilidade e boa nitidez.

==================================================

4. ESTRUTURA TÉCNICA DA TELA

==================================================

O aplicativo deve funcionar como uma experiência de tela fixa em proporção 16:9.

Canvas lógico obrigatório:

1200 × 675 px.

Requisitos:

- sem barra de rolagem horizontal;

- sem barra de rolagem vertical;

- todo o aplicativo deve permanecer visível na mesma tela;

- não reorganizar os elementos verticalmente como uma página responsiva comum;

- redimensionar proporcionalmente todo o canvas;

- centralizar o canvas na janela;

- preservar a proporção 16:9;

- usar letterboxing quando necessário;

- não cortar elementos importantes;

- não permitir overflow fora do canvas.

Criar um componente de palco, como:

GameStage

Esse componente deve:

- ter largura lógica de 1200 px;

- ter altura lógica de 675 px;

- calcular a escala conforme o viewport;

- usar transform: scale(...);

- usar transform-origin: center center;

- permanecer centralizado;

- manter overflow: hidden no body, no root e no palco.

Testar em:

- 1200 × 675;

- 1366 × 768;

- 1440 × 900;

- 1920 × 1080;

- tablets em orientação horizontal.

==================================================

5. ARQUITETURA DO APLICATIVO

==================================================

Criar o projeto com:

- React;

- TypeScript;

- componentes reutilizáveis;

- organização clara de arquivos;

- estado centralizado para navegação e progresso;

- sem banco de dados;

- sem login;

- sem autenticação;

- sem Supabase;

- sem APIs externas obrigatórias.

Componentes sugeridos:

- GameStage

- ScreenRouter

- BackgroundLayer

- CharacterLayer

- DialogueBubble

- SentenceBoard

- WordOption

- FeedbackModal

- AssetButton

- AudioButton

- HintButton

- ProgressMarker

Criar um fluxo controlado por estados ou rotas internas, sem recarregar a página.

Salvar o progresso atual em localStorage.

O botão Restart deve:

- limpar o progresso;

- limpar respostas;

- limpar tentativas;

- retornar para a capa.

Pré-carregar os backgrounds, personagens e botões para evitar piscadas entre telas.

==================================================

6. ÁUDIO

==================================================

O botão Audio deve usar o asset:

/assets/buttons/btn-audio.png

Nas telas com frases em inglês, o botão deve ler apenas a frase em inglês.

Utilizar a API speechSynthesis do navegador.

Configuração sugerida:

- idioma: en-US;

- velocidade aproximada: 0.82;

- volume: 1;

- selecionar uma voz em inglês disponível no dispositivo;

- criar fallback quando nenhuma voz específica estiver disponível.

Impedir que dois áudios sejam reproduzidos ao mesmo tempo.

Ao clicar novamente, interromper a fala anterior antes de começar uma nova.

Adicionar aria-label explicativo ao botão.

==================================================

7. NAVEGAÇÃO

==================================================

Usar os assets:

- btn-next.png

- btn-back.png

- btn-restart.png

Regras:

- Back retorna para a tela anterior;

- Next só aparece ou fica habilitado após a conclusão da etapa;

- não permitir que o aluno avance sem realizar a ação central da tela;

- nas telas apenas narrativas, Next pode aparecer desde o início;

- os botões devem ser exibidos como imagens transparentes;

- não adicionar caixas ou botões HTML por trás das imagens;

- aplicar somente efeitos discretos de hover, foco e clique.

Interações dos botões:

Hover:

- aumentar para aproximadamente 1.04;

- aplicar brilho discreto.

Clique:

- reduzir momentaneamente para aproximadamente 0.97.

Disabled:

- reduzir opacidade;

- remover brilho;

- impedir clique.

==================================================

8. FEEDBACKS

==================================================

Criar um FeedbackModal reutilizável.

Feedback de acerto:

- borda ou detalhe em verde-água;

- usar Lex comemorando;

- mensagem curta;

- explicar o padrão;

- permanecer visível por aproximadamente 2,5 a 3 segundos;

- fechar automaticamente;

- depois habilitar ou mostrar o botão Next.

Feedback de erro:

- borda ou detalhe coral;

- usar Lex pensando;

- não avançar;

- não alterar a resposta correta;

- não mostrar imediatamente a solução;

- incluir uma pista curta;

- permitir fechar e tentar novamente;

- preservar o estado necessário da tela.

Não mostrar feedbacks longos.

Exemplos:

Acerto:

“Muito bem! Com he, usamos goes.”

Erro:

“Observe novamente. Qual palavra mostra a ação?”

Acerto:

“Isso! Com she, usamos plays.”

Erro:

“Pense no sujeito da frase. É uma pessoa ou várias?”

==================================================

9. FLUXO DAS TELAS

==================================================

Criar 13 etapas.

----------------------------------------

TELA 1 — CAPA

----------------------------------------

Background:

bg-cover.png

Elementos:

- Lex neutra em destaque;

- título grande:

  “Wordville”

- subtítulo:

  “Verb Detectives”

- chamada curta:

  “Help Lex fix the verbs!”

- botão Start.

Composição:

- usar a área central livre do background para o título;

- Lex deve ocupar aproximadamente 34% da altura ou largura útil;

- não sobrecarregar a capa;

- não colocar instruções adicionais;

- não colocar menu;

- não colocar cards.

Ao clicar em Start, avançar para a tela 2.

----------------------------------------

TELA 2 — O CASO DE WORDVILLE

----------------------------------------

Background:

bg-investigation-room.png

Personagem:

Lex apontando.

Texto no balão:

“Algo estranho aconteceu em Wordville!

Alguns verbos estão no lugar errado.

Você pode me ajudar a encontrar as formas corretas?”

Usar no máximo três linhas curtas no balão.

Botões:

- Back;

- Next.

Esta tela não possui atividade.

----------------------------------------

TELA 3 — PRIMEIRA PISTA

----------------------------------------

Background:

bg-activity.png

Personagem:

Lex pensando, posicionada em uma lateral sem cobrir o quadro.

Instrução:

“Leia a frase. Toque na palavra que precisa ser corrigida.”

Frase grande no quadro:

“He go to school.”

Cada palavra deve ser um elemento clicável separado.

Adicionar botão Audio.

Resposta correta:

go

Ao tocar em “go”:

Feedback:

“Pista encontrada! Com he, usamos goes.”

Depois do feedback, mostrar a frase corrigida:

“He goes to school.”

Destacar “he” e “goes” com cores relacionadas visualmente.

Ao tocar em qualquer outra palavra:

Feedback:

“Ainda não. Procure a palavra que mostra a ação.”

----------------------------------------

TELA 4 — COMPARANDO GO E GOES

----------------------------------------

Background:

bg-activity.png

Personagem:

Lex apontando.

Instrução:

“Observe as duas frases.”

Exibir uma frase por vez ou em dois campos grandes e muito limpos:

“I go to school.”

“She goes to school.”

Destacar:

- I e go com uma cor;

- She e goes com outra cor.

Pergunta:

“O que mudou na segunda frase?”

Alternativas grandes:

A. O sujeito e o verbo.

B. Apenas a palavra school.

C. Nada mudou.

Resposta correta:

A

Feedback correto:

“Isso! Quando usamos she, o verbo também muda.”

Feedback de erro:

“Compare o início e o verbo das duas frases.”

----------------------------------------

TELA 5 — DESCOBRINDO O PADRÃO

----------------------------------------

Background:

bg-activity.png

Instrução:

“Toque nos grupos e descubra o padrão.”

Criar dois grupos grandes:

Grupo 1:

I

You

We

They

Ao tocar, revelar:

go

play

Grupo 2:

He

She

It

Ao tocar, revelar:

goes

plays

Não mostrar tudo simultaneamente no carregamento inicial.

Mostrar as informações progressivamente.

Após os dois grupos serem explorados, exibir:

“I, you, we e they usam a forma básica.”

“He, she e it usam uma forma diferente.”

Botão Next aparece somente depois da exploração dos dois grupos.

----------------------------------------

TELA 6 — PRÁTICA COM GO

----------------------------------------

Background:

bg-activity.png

Título:

“Choose: GO or GOES”

Realizar quatro rodadas dentro da mesma tela, mostrando somente uma frase por vez.

Rodada 1:

“I ___ to school.”

Resposta: go

Rodada 2:

“She ___ to school.”

Resposta: goes

Rodada 3:

“We ___ to school.”

Resposta: go

Rodada 4:

“He ___ to school.”

Resposta: goes

Alternativas:

GO

GOES

As alternativas devem ser grandes, claras e centralizadas.

Ao clicar em uma alternativa:

- não deixar uma opção previamente marcada;

- avaliar somente após o clique;

- em caso de erro, permitir nova tentativa;

- mudar para a próxima rodada apenas depois do acerto.

Feedbacks corretos:

“I combina com go.”

“She combina com goes.”

“We combina com go.”

“He combina com goes.”

Feedbacks de erro:

“Observe o sujeito antes de escolher.”

“Com he ou she, o verbo muda.”

“Com I ou we, use a forma básica.”

Mostrar progresso discreto:

1 de 4

2 de 4

3 de 4

4 de 4

----------------------------------------

TELA 7 — NOVA PISTA: PLAY

----------------------------------------

Background:

bg-activity.png

Personagem:

Lex pensando.

Instrução:

“Encontre o verbo que precisa ser corrigido.”

Frase:

“She play soccer.”

Cada palavra deve ser clicável.

Resposta:

play

Acerto:

“Muito bem! Com she, usamos plays.”

Mostrar depois:

“She plays soccer.”

Erro:

“Procure a palavra que mostra a ação.”

Adicionar botão Audio.

----------------------------------------

TELA 8 — COMPARANDO PLAY E PLAYS

----------------------------------------

Background:

bg-activity.png

Personagem:

Lex apontando.

Exibir:

“They play soccer.”

“He plays soccer.”

Pergunta:

“Qual palavra mudou quando usamos he?”

Alternativas:

A. soccer

B. plays

C. they

Resposta correta:

B

Acerto:

“Exatamente! Com he, play vira plays.”

Erro:

“Observe o verbo da segunda frase.”

----------------------------------------

TELA 9 — PRÁTICA COM PLAY

----------------------------------------

Background:

bg-activity.png

Título:

“Choose: PLAY or PLAYS”

Quatro rodadas:

1.

“I ___ soccer.”

Resposta: play

2.

“He ___ soccer.”

Resposta: plays

3.

“They ___ soccer.”

Resposta: play

4.

“She ___ soccer.”

Resposta: plays

Aplicar as mesmas regras da tela 6.

----------------------------------------

TELA 10 — ORGANIZANDO OS SUJEITOS

----------------------------------------

Background:

bg-activity.png

Instrução:

“Leve cada sujeito para o grupo correto.”

Cards:

I

You

We

They

He

She

It

Áreas de destino:

Área 1:

“GO / PLAY”

Área 2:

“GOES / PLAYS”

Classificação correta:

GO / PLAY:

I

You

We

They

GOES / PLAYS:

He

She

It

Implementar:

- arrastar e soltar com mouse;

- arrastar e soltar com toque;

- alternativa por clique: selecionar o card e depois tocar na área;

- cards grandes;

- áreas de destino amplas;

- posição inicial levemente randomizada sem causar sobreposição;

- manter cards legíveis.

Quando um card estiver incorreto:

- mostrar feedback;

- devolver o card para a posição anterior;

- não reorganizar os demais cards.

Quando todos estiverem corretos:

Feedback:

“Ótimo trabalho! Você organizou os sujeitos corretamente.”

----------------------------------------

TELA 11 — REVISÃO MISTA

----------------------------------------

Background:

bg-activity.png

Título:

“Fix the sentence!”

Apresentar uma frase por rodada.

Rodada 1:

“They ___ soccer.”

play / plays

Resposta: play

Rodada 2:

“She ___ to school.”

go / goes

Resposta: goes

Rodada 3:

“He ___ soccer.”

play / plays

Resposta: plays

Rodada 4:

“We ___ to school.”

go / goes

Resposta: go

Após cada resposta correta, mostrar a frase completa.

Feedback de erro deve explicar o significado ou a relação sujeito-verbo, e não apenas dizer “tente novamente”.

Exemplos:

“Observe: they fala de mais de uma pessoa.”

“Com she, o verbo go muda para goes.”

“Com he, play recebe s.”

“Com we, usamos a forma básica go.”

----------------------------------------

TELA 12 — O ÚLTIMO CARTAZ

----------------------------------------

Background:

bg-investigation-room.png

Personagem:

Lex apontando.

Texto:

“Falta apenas um cartaz para resolver o caso!”

Pergunta:

“Qual frase está correta?”

Alternativas em cartazes grandes:

A. She go to school.

B. She goes to school.

C. She going to school.

D. She goes school to.

Resposta correta:

B

Feedback correto:

“Caso resolvido! She combina com goes.”

Feedbacks das alternativas incorretas:

A:

“Com she, o verbo go precisa mudar.”

C:

“A frase está usando outra forma verbal. Procure a forma do presente simples.”

D:

“As palavras estão fora da ordem correta.”

Após o acerto, habilitar Next.

----------------------------------------

TELA 13 — ENCERRAMENTO

----------------------------------------

Background:

bg-final.png

Personagem:

Lex comemorando em tamanho grande.

Título:

“Case solved!”

Mensagem:

“Você ajudou Lex a consertar os verbos de Wordville!”

Síntese visual:

“I / You / We / They → go / play”

“He / She / It → goes / plays”

Explicação curta:

“Com he, she e it, o verbo muda.

Geralmente acrescentamos s.

Go vira goes.”

Não criar um grande bloco de texto.

Adicionar:

- botão Restart;

- pequena indicação visual de conclusão;

- animação leve de entrada;

- confetes discretos já presentes no background, sem exagerar.

==================================================

10. BOTÃO DE DICA

==================================================

Usar:

/assets/buttons/btn-hint.png

O botão Hint pode aparecer nas telas 3, 6, 7, 9, 10, 11 e 12.

A dica nunca deve entregar diretamente a resposta na primeira tentativa.

Exemplos:

Tela 3:

“Procure o verbo da frase.”

Tela 6:

“Leia primeiro o sujeito.”

Tela 7:

“A ação da frase é jogar.”

Tela 10:

“He, she e it ficam no mesmo grupo.”

Tela 12:

“Com she, go precisa mudar.”

Após duas tentativas incorretas, a dica pode ficar um pouco mais específica.

==================================================

11. ESTILO DOS ELEMENTOS CRIADOS EM CÓDIGO

==================================================

Não utilizar componentes shadcn com aparência padrão.

Os elementos criados em CSS devem harmonizar com os assets.

Painéis:

- fundo branco ou creme muito claro;

- borda azul-petróleo ou azul-céu;

- cantos arredondados moderados;

- sombra muito leve;

- sem efeito de vidro;

- sem excesso de brilho;

- sem grandes gradientes.

Cards de palavras:

- grandes;

- mínimo aproximado de 130 × 70 px;

- texto centralizado;

- contraste alto;

- estados claros de foco, seleção e acerto;

- não usar cards muito pequenos.

Balões de diálogo:

- fundo branco ou creme;

- contorno azul;

- texto azul-escuro;

- seta apontando para Lex;

- largura suficiente para evitar muitas quebras de linha;

- no máximo três ou quatro linhas.

==================================================

12. ACESSIBILIDADE

==================================================

Implementar:

- navegação por teclado;

- foco visível;

- Enter ou Espaço para selecionar alternativas;

- aria-label nos botões em imagem;

- alt text nos personagens;

- contraste adequado;

- não depender exclusivamente de cor;

- suporte a prefers-reduced-motion;

- botão de áudio com estado perceptível;

- mensagens de feedback anunciadas por aria-live.

Nas atividades de arrastar, oferecer sempre alternativa por clique ou teclado.

==================================================

13. ANIMAÇÕES

==================================================

Utilizar animações curtas e discretas.

Permitido:

- entrada suave de Lex;

- leve flutuação do botão Start;

- pequeno bounce em acertos;

- shake muito discreto em erros;

- transição de opacidade entre telas;

- brilho sutil em pistas.

Evitar:

- animações contínuas em todos os elementos;

- movimentos rápidos;

- elementos piscando;

- excesso de partículas;

- transições longas;

- zooms agressivos.

Duração sugerida:

150 a 350 ms para interações;

400 a 600 ms para entrada de tela.

==================================================

14. CRITÉRIOS DE ACEITAÇÃO

==================================================

Antes de considerar o projeto concluído, verificar obrigatoriamente:

1. A tela permanece em proporção 16:9.

2. Não existe barra de rolagem.

3. Nenhum elemento importante é cortado.

4. Os assets enviados são utilizados corretamente.

5. Lex permanece visualmente consistente.

6. Lex aparece grande, e não como miniatura.

7. Existe apenas uma atividade principal por tela.

8. Nenhuma alternativa começa selecionada.

9. O aluno pode tentar novamente após errar.

10. O feedback correto explica o padrão.

11. O feedback de erro não entrega imediatamente a resposta.

12. O botão Next só aparece ou habilita depois da conclusão.

13. Todos os áudios leem as frases corretas.

14. O botão Restart limpa todo o progresso.

15. Arrastar e soltar funciona com mouse e toque.

16. Existe alternativa por clique para o drag-and-drop.

17. Todos os botões possuem aria-label.

18. Não foram usados emojis como elementos de interface.

19. Não foram criadas ilustrações genéricas para substituir os assets.

20. A interface não tem aparência de dashboard ou template automático.

21. Não existe scroll em nenhuma das 13 telas.

22. A aplicação funciona sem banco de dados.

23. O progresso não é perdido ao atualizar acidentalmente a página.

24. Todos os textos ficam nítidos e são renderizados em HTML.

25. A aplicação está pronta para publicação no Lovable e posterior exportação para GitHub.

==================================================

15. ENTREGA

==================================================

Implemente o projeto completo.

Ao terminar:

1. revise visualmente todas as telas;

2. teste todas as respostas;

3. teste os feedbacks;

4. teste a navegação Back e Next;

5. teste Restart;

6. teste o áudio;

7. teste o redimensionamento;

8. teste mouse, teclado e toque;

9. corrija qualquer overflow;

10. apresente um resumo objetivo do que foi implementado.

Não simplifique a estrutura sem justificar.

Não concentre várias etapas em uma única tela.

Não substitua os backgrounds ou personagens fornecidos.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/bfad318d-5dee-4a72-9994-e6e3dd5b4f9c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
