# Armadilhas conhecidas (bugs reais já encontrados e corrigidos)

Estas são falhas sutis que apareceram durante o desenvolvimento do site original. O template já vem com as correções aplicadas — este documento existe para você NÃO desfazer essas correções sem querer, e para reconhecer o sintoma rápido se algo parecido aparecer de novo.

## 1. Imagens cobrindo só metade da seção
**Sintoma:** uma foto de fundo (Hero, editorial, etc.) aparece ocupando só uma faixa da largura da tela, com a cor de fundo aparecendo do lado.
**Causa:** a regra global de `<img>` tinha `height:100%` mas faltava `width:100%`. Sem largura explícita, o navegador calcula a largura da imagem pela proporção original a partir da altura, em vez de esticar para preencher o container.
**Correção já aplicada:** a regra global `img{...}` no template inclui `width:100%` — não remova.

## 2. Texto/botões flutuando no meio da seção em vez de nas bordas (topo/baixo)
**Sintoma:** você usa `justify-content:space-between` (ou `flex-end`) num container para separar conteúdo entre topo e base da seção, mas ele continua tudo centralizado no meio, ignorando a mudança.
**Causa:** o filho tinha `height:100%`, mas o pai (`display:flex`) só define `min-height` (não `height`). Porcentagem de altura não resolve contra `min-height`, então o filho volta para altura automática (do conteúdo) e fica centralizado pelo `align-items:center` do pai.
**Correção já aplicada:** o container pai (`.cta`) usa `align-items:stretch` em vez de `center`, forçando o filho a ocupar a altura real da seção.

## 3. Animação de entrada que nunca dispara na ÚLTIMA seção da página
**Sintoma:** um `gsap.from(...)` com `scrollTrigger` funciona em todo o site, mas na seção final (perto do rodapé) o elemento nunca aparece — fica com `opacity:0` para sempre, mesmo rolando até o fim.
**Causa:** o ScrollTrigger calcula um ponto de "fim" (`end`) padrão baseado na altura da viewport. Perto do fim do documento, esse "fim" calculado pode ultrapassar o scroll máximo real da página (não dá pra rolar mais do que existe de conteúdo), e nesse caso específico o disparo da animação pode falhar de forma inconsistente.
**Correção já aplicada:** a revelação de entrada da última seção (CTA final) usa `IntersectionObserver` nativo do navegador em vez de `scrollTrigger` — não depende de cálculo de posição de scroll, só de o elemento entrar na tela. Sempre que adicionar uma animação de entrada na ÚLTIMA seção do site, use esse mesmo padrão (veja o bloco `IntersectionObserver` no fim do `<script>`), não `scrollTrigger`.

## 4. Logo "com fundo quadriculado"
**Sintoma:** o cliente manda a logo em PNG, mas quando você abre a imagem ela mostra um padrão xadrez cinza (o "fundo transparente" do Photoshop/Figma) em vez de transparência de verdade.
**Causa:** a pessoa exportou/printou a área de transparência em vez de exportar com canal alfa real.
**Como resolver:** processar a imagem (script Python com Pillow) detectando que o quadriculado tem duas tonalidades de cinza previsíveis e a logo em si é branca/preta pura — usar a distância de brilho até branco/preto puro como canal alfa, gerando um PNG com transparência real. **Sempre peça o arquivo original** (não um print de tela) antes de processar — perde qualidade se for reexportado de uma captura.

## 2 armadilhas de ambiente de teste (NÃO são bugs do site)

- **CDNs bloqueados em sandbox:** ao testar localmente sem internet completa, o GSAP pode não carregar e o site cai no modo `no-anim` (tudo estático, sem animação) — isso NÃO significa que o código está quebrado. Para testar de verdade, baixe o GSAP via `npm pack gsap@3.12.5` e sirva localmente, substituindo temporariamente os `<script src="https://cdnjs...">` por caminhos locais (nunca comitar isso).
- **Imagens externas (Unsplash etc.) bloqueadas em sandbox:** normal não carregarem em teste isolado; vai funcionar em produção com internet normal.
