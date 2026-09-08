/**
 * Single source of truth for imagery.
 *
 * These are Unsplash placeholders so the project builds and runs out of the box.
 * Replace each entry with Kassen Coiffure's own photography (drop files in
 * /public/images and point these to `/images/...`) — nothing else needs to change.
 */

const u = (id: string, w = 1500, q = 78) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const IMAGES = {
  // Hero
  heroHair: u("1560066984-138dadb4c035", 2200, 80),

  // A Experiência
  expA: u("1522337660859-02fbefca4702", 1200),
  expB: u("1519699047748-de8e457a634e", 1100),

  // Serviços
  svcHair: u("1562322140-8baeececf3df", 1300),
  svcTreatment: u("1633681926035-ec1ac984418a", 1300),
  svcSkin: u("1570172619644-dfd03ed5d881", 1300),
  svcNails: u("1604654894610-df63bc536371", 1300),

  // Editorial de cabelo
  hairEditorial: u("1595476108010-b4d1f102b1b1", 2200, 80),

  // Tratamentos
  trtFront: u("1633681926022-84c23e8cb2d6", 1300),
  trtBack: u("1512290923902-8a9f81dc236c", 1300),

  // Produtos
  prod1: u("1631730359585-38a4935cbec4", 900),
  prod2: u("1598887142487-3c854d51d185", 900),
  prod3: u("1585232351009-aa87416fca90", 900),
  prod4: u("1620916566398-39f1143ab7be", 900),

  // Produto (fallback do 3D)
  productStage: u("1608248543803-ba4f8c70ae0b", 1200),

  // Galeria
  gal1: u("1580618672591-eb180b1a973f", 1200),
  gal2: u("1522337094846-8a818192de1f", 1100),
  gal3: u("1560869713-7d0a29430803", 1300),
  gal4: u("1633681926022-84c23e8cb2d6", 1400),
  gal5: u("1487412947147-5cebf100ffc2", 1100),
  gal6: u("1596704017254-9b121068fb31", 1100),

  // Antes / Depois
  beforeImg: u("1519014816548-bf5fe059798b", 1400),
  afterImg: u("1560066984-138dadb4c035", 1400),

  // Instagram
  ig1: u("1554519515-242161756769", 800),
  ig2: u("1633681926035-ec1ac984418a", 800),
  ig3: u("1560869713-7d0a29430803", 800),
  ig4: u("1522337660859-02fbefca4702", 800),
  ig5: u("1570172619644-dfd03ed5d881", 800),
  ig6: u("1487412947147-5cebf100ffc2", 800),

  // CTA final
  ctaBg: u("1522338242992-e1a54906a8da", 2200, 80),
} as const;

export type ImageKey = keyof typeof IMAGES;
