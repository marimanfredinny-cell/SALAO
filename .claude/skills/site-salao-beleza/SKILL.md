---
name: site-salao-beleza
description: Gera um site institucional de uma página (one-page) para salões de beleza/estética, usando o mesmo template visual e as mesmas animações de scroll (GSAP + ScrollTrigger) sempre — só troca conteúdo, fotos, logo e paleta de cores por cliente. Use sempre que o usuário pedir para criar o site de um novo salão/clínica de beleza a partir deste modelo, ou pedir para "gerar o site igual ao de antes" para outro negócio.
---

# Site institucional para salão de beleza (template reutilizável)

Esta skill gera sites de uma página só (landing page longa, com scroll) para salões de beleza, clínicas de estética, barbearias etc., **reaproveitando 100% do design e das animações** de um template já validado — só o conteúdo muda por cliente (nome, textos, fotos, logo, paleta de cores, contato).

Não é geração livre: é preenchimento de um molde. Ao seguir esta skill, produza sempre a MESMA estrutura de seções e as MESMAS animações — nunca invente uma seção nova, remova uma seção, ou reescreva a lógica de animação, a menos que o usuário peça explicitamente.

## Antes de começar: leia a referência

1. `reference/EFFECTS.md` — resumo de TODOS os efeitos/animações do site, seção por seção. Leia antes de tocar no código, para saber o que precisa continuar funcionando.
2. `reference/ARMADILHAS.md` — bugs reais já encontrados e corrigidos (imagem cobrindo só metade da tela, texto flutuando no meio da seção, animação que nunca dispara na última seção, logo com fundo quadriculado). O template já vem com as correções — não desfaça.
3. `template/index.html` — o molde completo, com placeholders entre colchetes (ex: `[Nome do Salão]`) e comentários indicando cada seção.

## Passo 1 — Colete as informações do cliente

Pergunte ao usuário (ou use o que ele já mandou) tudo isto. Se algo não for aplicável ao negócio dele (ex: não vende produtos, não faz antes/depois), pergunte se prefere remover a seção ou preencher com um conteúdo genérico — não decida sozinho por remover uma seção do molde.

**Identidade**
- Nome do salão/marca (e como ele deve aparecer dividido em duas linhas no título do Hero — normalmente o nome principal + um complemento, ex: "KASSEN" / "Coiffure", ou "3" / "Beauty")
- Logo em duas versões: branca (PNG com fundo transparente de verdade) e preta (idem). **Se vier com fundo quadriculado em vez de transparência real, processe antes de usar — veja `reference/ARMADILHAS.md` item 4.**
- Paleta de cores: pelo menos a cor de destaque principal (`--gold`) e, se possível, um tom escuro de contraste (`--cocoa`). As outras 6 variáveis podem ser derivadas automaticamente (tons claros = versões bem clareadas da cor de destaque; `--gold-soft` = versão mais clara do destaque; `--cocoa-soft` = versão média do tom escuro). Nunca deixe menos de 2 cores — se o cliente só mandar uma, gere um tom escuro de contraste dentro da mesma família de cor (nunca use um dourado genérico "de template" por padrão).
- Slogan/serviços principais (3 itens curtos, viram o subtítulo do Hero e o rodapé — ex: "Cabelo • Estética Facial e Corporal Avançada • Unhas")

**Contato**
- Telefone (com DDI se for outro país) — usado no botão flutuante do WhatsApp (`https://wa.me/<número só dígitos>`) e no bloco de contato
- Endereço completo, de preferência já dividido em 2 linhas curtas para caber no layout
- Instagram (@handle e URL completa)
- Link de agendamento, se houver um diferente do Instagram (ex: Calendly, WhatsApp Business)

**Fotos** (peça os arquivos originais, não prints de tela — perde qualidade)
- Hero (1 foto, formato paisagem/retrato grande, é a foto de fundo da primeira tela)
- Experiência (1 ou 2 fotos — se só vier uma, repita nas duas posições como no exemplo original)
- Serviços (até 4 fotos, uma por card de serviço)
- Editorial/seção cheia (1 foto de ambiente, vai ficar escurecida com um degradê)
- Tratamentos (1 ou 2 fotos)
- Produtos (até 4 fotos de produto — **se o fundo não for já transparente, remova o fundo** antes de usar; ver seção "Como remover fundo de foto de produto" abaixo)
- Produto em destaque/3D (1 foto de produto, também sem fundo)
- Antes/depois (2 fotos separadas, "antes" e "depois" — se o cliente só tiver uma foto composta com as duas lado a lado, avise que o ideal são duas fotos separadas para o efeito de arrastar funcionar bem, mas pode-se usar a composta como fallback removendo o slider, avisando o usuário da limitação)
- CTA final (1 foto de ambiente/produto marcante — no exemplo original é a cadeira de atendimento com a logo)

**Conteúdo textual**
- 4 serviços (nome curto + 1 frase de descrição cada)
- 4 "passos" da seção Tratamentos (nome curto + 1 frase cada)
- 4 produtos (marca + nome)
- 4 atributos da seção Produto 3D (nome curto + 1 frase cada)
- 3 depoimentos (frase + nome da cliente + detalhe, ex: "Cliente desde 2021")
- 4 palavras soltas da seção editorial (ex: "Corte / Cor / Cuidado / Brilho")

Se o cliente não tiver algum desses textos prontos, você pode sugerir uma versão curta baseada no que ele descrever do negócio — mas confirme com ele antes de publicar.

## Passo 2 — Gere o site

1. Copie `template/index.html` para a raiz do projeto do cliente como `index.html`.
2. Preencha o `:root` do CSS com a paleta do cliente (8 variáveis de cor). Não mude os NOMES das variáveis nem adicione novas — só os valores hex.
3. Substitua todos os placeholders entre colchetes pelo conteúdo do cliente, seção por seção (use Edit, não regrave o arquivo inteiro).
4. Organize as fotos numa pasta `assets/` na raiz, com nomes descritivos em minúsculo sem espaço (ex: `assets/hero.jpg`, `assets/servico-1.jpg`), e ajuste os `data-src`/`src` do HTML para bater com os nomes reais.
5. Otimize fotos grandes antes de usar (a maioria das câmeras/celulares gera arquivos de vários MB, desnecessário para web): redimensione para no máximo ~1800px no lado maior e salve como JPEG qualidade ~82-85 (exceto logos e fotos de produto, que devem continuar PNG para manter transparência).
6. Se alguma foto de produto ou logo vier com fundo que precisa ser removido, processe com Python/Pillow antes de usar (peça o arquivo original ao cliente, nunca um print).
7. Gere a URL do mapa: `https://www.google.com/maps?q=<endereço com espaços trocados por +>&output=embed` (não precisa de chave de API).
8. **Nunca edite a estrutura do `<style>` (seletores, propriedades, media queries) nem a lógica do `<script>`** além do necessário para content — a única exceção é se o usuário pedir explicitamente para adicionar/remover uma seção ou mudar um comportamento.

## Passo 3 — Teste antes de entregar

O CDN do GSAP costuma estar bloqueado em ambientes de sandbox sem internet completa — nesse caso o site cai automaticamente no modo sem animação (`no-anim`), o que pode dar a falsa impressão de que as animações "sumiram". Para testar de verdade:

```bash
mkdir -p /tmp/sitetest && cd /tmp/sitetest
npm pack gsap@3.12.5 && tar -xzf gsap-3.12.5.tgz
cp package/dist/gsap.min.js package/dist/ScrollTrigger.min.js .
# sirva o index.html real trocando temporariamente (só no arquivo servido, nunca no repositório)
# as duas tags <script src="https://cdnjs..."> por "gsap.min.js" e "ScrollTrigger.min.js"
python3 -m http.server 8977
```

Depois use um navegador (Playwright, se disponível) em pelo menos duas larguras — mobile (~390px) e desktop (~1400px) — e confira:
- O Hero cobre 100% da largura/altura e a animação de entrada roda.
- A seção de Serviços rola na horizontal ao rolar a página verticalmente.
- Tratamentos e Produto 3D trocam de texto ao rolar, presos na tela.
- O slider de Antes/Depois começa em 50% e responde ao arrastar.
- Os botões da última seção (CTA final) aparecem — não ficam com opacidade 0 para sempre.
- O botão flutuante do WhatsApp aparece em todas as seções e aponta pro número certo.
- O mapa mostra o endereço certo (não vai carregar em sandbox sem internet — confira só a URL).

## Passo 4 — Publique

Siga o fluxo normal de git do projeto (branch, commit, push, PR) — as instruções de commit/PR do ambiente/projeto têm prioridade sobre esta skill.
