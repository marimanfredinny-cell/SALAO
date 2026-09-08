# Kassen Coiffure

Site premium, responsivo e cinematográfico para o salão **Kassen Coiffure**.
Cada seção tem uma animação própria acionada pelo scroll — o objetivo é uma
narrativa visual, não uma sucessão de _fade-ins_.

## Stack

| Camada | Ferramenta |
| --- | --- |
| Framework | Next.js 14 (App Router) + React 18 + TypeScript |
| Estilo | Tailwind CSS |
| Scroll suave | Lenis (integrado ao ticker do GSAP) |
| Animação por scroll | GSAP + ScrollTrigger |
| Micro-interações / menu mobile | Framer Motion |
| Produto 3D | React Three Fiber + drei (carregado sob demanda, só no desktop) |

## Rodando

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

Build de produção:

```bash
npm run build && npm start
```

## Estrutura

```
app/
  layout.tsx        # fontes, providers, header, footer
  page.tsx          # ordem das seções (a narrativa)
  globals.css       # variáveis de cor, cursor, reduced-motion
components/
  providers/
    SmoothScrollProvider.tsx   # Lenis + GSAP ticker + âncoras suaves
  site/
    Header.tsx                 # transparente → blur ao rolar
    MobileMenu.tsx             # hamburger + menu fullscreen animado
    CustomCursor.tsx           # cursor discreto (dot + ring) com estados
    Footer.tsx
  three/
    ProductScene.tsx           # cena R3F do frasco (luz, sombra, rotação)
  util/
    SplitText.tsx              # reveal palavra por palavra
  sections/
    Hero.tsx                   # intro cinematográfica + hand-off no scroll
    Experience.tsx             # composição assimétrica + parallax
    Services.tsx               # scroll horizontal fixado (desktop) / carrossel (mobile)
    HairEditorial.tsx          # campanha de beleza: palavras + zoom/parallax
    Treatments.tsx             # imagem sticky cresce enquanto textos trocam
    Products.tsx               # cards + marca (Keune é uma das marcas, não a principal)
    Product3D.tsx              # seção sticky 01→04 + "Explore our products"
    Gallery.tsx                # grid assimétrico, velocidades diferentes
    BeforeAfter.tsx            # slider arrastável antes/depois
    Testimonials.tsx           # depoimento grande sticky, troca no scroll
    InstagramFeed.tsx          # grid editorial + hover
    FinalCta.tsx               # chegada cinematográfica + 2 botões
lib/
  gsap.ts            # registro do ScrollTrigger
  images.ts          # TODAS as imagens em um só lugar (ver abaixo)
  reduced-motion.ts
hooks/
  useIsoLayoutEffect.ts
  useMediaQuery.ts
```

## Como cada seção se comporta em cada dispositivo

- **Desktop** — animações completas: parallax, scroll horizontal fixado, 3D,
  layouts assimétricos.
- **Tablet / mobile** (`max-width: 1023px` / `767px`) — as timelines fixadas
  (`pin`) viram _reveals_ leves e sequenciais, sem travar o scroll; o 3D vira
  imagem renderizada com profundidade e sombra; parallax reduzido.
- **`prefers-reduced-motion`** — Lenis desligado, nenhuma timeline é criada e os
  elementos aparecem já no estado final (as animações só definem o estado
  inicial dentro de `gsap.matchMedia`).

## Trocando as imagens

Todas as imagens vêm de [`lib/images.ts`](lib/images.ts). Hoje são _placeholders_
do Unsplash para o projeto rodar sem assets.

Para usar as fotos da Kassen:

1. Coloque os arquivos em `public/images/` (de preferência `.webp`/`.avif`).
2. Troque cada valor em `lib/images.ts` por `"/images/seu-arquivo.webp"`.
3. Se usar outro domínio remoto, adicione o host em `images.remotePatterns`
   dentro de [`next.config.mjs`](next.config.mjs).

O `next/image` já entrega AVIF/WebP, `lazy loading` e `srcset` automaticamente.

## Modelo 3D real

`components/three/ProductScene.tsx` monta o frasco com primitivos. Para um
modelo real:

1. Coloque o `.glb` em `public/models/`.
2. Use `useGLTF("/models/produto.glb")` do `@react-three/drei` no lugar dos
   `mesh` primitivos.
3. Mantenha o `dynamic(..., { ssr: false })` em `Product3D.tsx` — o bundle 3D
   só é baixado no desktop, sob demanda.

## Ajustes rápidos

- **Paleta**: `tailwind.config.ts` (`offwhite`, `bege`, `nude`, `champagne`,
  `gold`, `cocoa`) e as variáveis em `globals.css`.
- **Tipografia**: `app/layout.tsx` (`Fraunces` serifada / `Inter` sans).
- **Ordem da narrativa**: `app/page.tsx`.
- **Links de agendamento / WhatsApp**: constantes no topo de
  `components/sections/FinalCta.tsx`.
- **Instagram**: `HANDLE_URL` em `components/sections/InstagramFeed.tsx`.

## Performance

- Imagens otimizadas via `next/image` (AVIF/WebP, lazy, `sizes` por seção).
- 3D com `code splitting` (`next/dynamic`) e só no desktop.
- Animações em `transform`/`opacity`, sincronizadas com o ticker do GSAP.
- `prefers-reduced-motion` totalmente suportado.
- Sem overflow horizontal (`overflow-x: hidden` + `sizes` responsivos).
