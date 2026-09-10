# Resumo de todos os efeitos do site

Este documento descreve, seção por seção, toda animação/interação do template. Serve como referência para não perder nenhum efeito ao gerar um site novo, e para explicar ao cliente o que o site faz.

Tecnologia: GSAP 3 + plugin ScrollTrigger (carregados via CDN cdnjs), sem nenhuma outra biblioteca. Tudo funciona com HTML/CSS/JS puro num único arquivo `index.html`.

## Efeitos que valem para o site inteiro

- **Cursor customizado** (só desktop com mouse de precisão): um ponto dourado que segue o mouse instantaneamente, e um anel que segue com atraso suave (interpolação), mudando de tamanho e cor conforme o que está sob o cursor — grande e translúcido sobre imagens, médio sobre botões, pequeno sobre links, e escuro sólido com o texto "Ver" sobre os produtos. Desativado em touch e quando o usuário pede "reduzir movimento".
- **Cabeçalho fixo com transição de estado**: começa transparente sobre o Hero (logo branca, menu claro) e, a partir de 40px de scroll, vira sólido com efeito vidro (blur), trocando para a logo preta e menu escuro — com transição suave.
- **Menu mobile em "íris"**: o menu de tela cheia abre com um círculo que se expande a partir do botão hambúrguer (clip-path), com os links do menu entrando em cascata (um de cada vez).
- **Botão flutuante do WhatsApp**: fixo no canto inferior direito em todas as seções, com leve aumento ao passar o mouse.
- **Fallback de acessibilidade**: se o usuário tiver "reduzir movimento" ativado no sistema, ou se o GSAP não carregar (ex: sem internet), TODAS as animações são desativadas automaticamente e o conteúdo aparece direto na posição final — nada fica invisível, cortado ou quebrado. Isso é essencial e não pode ser removido.

## Seção por seção

1. **Hero** — introdução cinematográfica ao carregar a página: o fundo aparece com fade, a foto é revelada por uma máscara que "abre" de baixo para cima, a imagem faz zoom-out (1.35x → 1x), o texto de apoio ("kicker") sobe com leve desfoque, o título principal entra linha por linha de baixo para cima, o subtítulo aparece com letter-spacing animado, e por último o indicador de scroll. Ao rolar a página para baixo, a foto continua dando zoom (ligado à posição do scroll, não a um tempo fixo) enquanto título/subtítulo/indicador desaparecem — e volta ao rolar para cima.
2. **Experiência** — duas fotos com parallax em velocidades diferentes ao rolar; uma delas desliza da direita para dentro da tela; uma linha dourada decorativa aparece; o título entra linha por linha; o parágrafo de texto revela **palavra por palavra** (cada palavra sobe de baixo com uma máscara).
3. **Serviços** — trilho horizontal "grudado" na tela (pin): o scroll vertical do usuário empurra os cards para o lado. Cada card recebe zoom na foto conforme entra na tela, o texto sobe em cascata, e os cantos decorativos dourados aparecem com escala. Funciona em qualquer tamanho de tela, inclusive celular.
4. **Editorial (seção cheia com foto de fundo)** — a seção prende na tela enquanto a foto de fundo sai de um zoom forte para o normal; o título grande entra de baixo; e 4 palavras soltas (ex: "Corte / Cor / Cuidado / Brilho") aparecem nos quatro cantos da tela, uma de cada vez, com leve rotação.
5. **Bloco "troca de texto grudada" (reusado 2x: Tratamentos e Produto 3D)** — a seção prende na tela enquanto o usuário rola, e o texto ao lado troca automaticamente entre 3–4 passos (cada um some/aparece com fade e deslocamento, sincronizado ao scroll — não é automático por tempo). Na versão "Tratamentos" a foto principal também dá um zoom saindo de um recorte para a tela cheia, e uma segunda foto de fundo aparece no final da troca. Na versão "Produto 3D" o produto flutua girando/escalando levemente durante a troca de texto, e ao final aparece um botão de call-to-action.
6. **Produto 3D — tilt com o mouse**: além do scroll, ao passar o mouse sobre o produto flutuante ele se inclina em 3D (perspectiva) seguindo a posição do cursor.
7. **Produtos** — o traço dourado embaixo do título "desenha" da esquerda para a direita; os cards do grid sobem em cascata ao entrarem na tela; embaixo, uma faixa de texto (marcas/palavras-chave) rola infinitamente da direita para a esquerda.
8. **Antes/Depois** — slider de arrastar: duas fotos sobrepostas que o usuário arrasta horizontalmente para revelar o "antes" por baixo do "depois" (ou vice-versa), com uma linha + botão circular acompanhando o dedo/mouse. Ao entrar na tela, as duas fotos deslizam de lados opostos e a linha do meio "cresce" de cima para baixo. Precisa de DUAS fotos separadas (antes e depois), cada aparecendo com um selo "Antes"/"Depois" no canto.
9. **Depoimentos** — a seção prende na tela e os depoimentos trocam um a um conforme o usuário rola (fade + leve desfoque + deslocamento vertical) — como um carrossel controlado pelo scroll, não por tempo.
10. **CTA final** — a foto de fundo continua dando zoom-out sutil conforme rola até a seção, com degradês escuros no topo e embaixo (garante contraste do texto branco). As informações de contato aparecem dos dois lados (esquerda/direita) e o botão central — revelados com fade + subida ao entrarem na tela. **Importante:** essa revelação usa `IntersectionObserver` nativo em vez de ScrollTrigger, porque é a última seção da página e o cálculo de fim do ScrollTrigger pode ultrapassar o scroll máximo possível, fazendo a animação nunca disparar (bug real encontrado e corrigido durante o desenvolvimento — ver `reference/ARMADILHAS.md`).
11. **Localização** — mapa do Google Maps incorporado (sem precisar de chave de API), estático, com o endereço acima.

## O que NUNCA deve ser alterado ao gerar um site novo

- A lógica do `<script>` (a função `stickySwap`, o cursor customizado, o slider de antes/depois, o tilt 3D, o menu mobile, o fallback de `no-anim`/`reduced-motion`, o `IntersectionObserver` do CTA final).
- As regras estruturais do CSS (posicionamento, tamanhos relativos, `pin`, `clip-path`, `transform`). Só os **valores** das variáveis de cor em `:root` mudam.
- A ordem/estrutura das seções e os `id`s usados nos links do menu (`#hero`, `#servicos`, etc.) — o scroll suave e os `ScrollTrigger` dependem desses seletores.
