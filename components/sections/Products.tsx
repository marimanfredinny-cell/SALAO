"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { IMAGES } from "@/lib/images";

const PRODUCTS = [
  { name: "Kassen Ritual Oil", brand: "Kassen Select", img: IMAGES.prod1 },
  { name: "Repair Shampoo", brand: "Keune", img: IMAGES.prod2 },
  { name: "Silk Leave-in", brand: "Keune", img: IMAGES.prod3 },
  { name: "Glow Face Serum", brand: "Kassen Select", img: IMAGES.prod4 },
];

// Kassen Coiffure is the salon brand. Keune is simply one of the product
// brands sold in the salon, listed alongside the others.
const BRANDS = ["Kassen Select", "Keune", "Care Line", "Color Lab", "Kassen Home"];

/**
 * PRODUTOS — gold underline draws under the title, cards rise in sequence,
 * a slow brand marquee runs beneath.
 */
export function Products() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".prod-underline", {
          scaleX: 0,
          transformOrigin: "left",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".prod-head", start: "top 80%" },
        });

        gsap.from(".prod-card", {
          y: 80,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".prod-grid", start: "top 80%" },
        });

        gsap.to(".prod-marquee-inner", {
          xPercent: -50,
          repeat: -1,
          duration: 22,
          ease: "none",
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="produtos"
      className="overflow-hidden bg-champagne py-24 md:py-36"
    >
      <div className="u-container">
        <div className="prod-head max-w-2xl">
          <p className="text-[11px] uppercase tracking-widest2 text-gold">Produtos</p>
          <h2 className="mt-3 font-serif text-4xl sm:text-6xl">
            Take the Kassen experience home.
          </h2>
          <span className="prod-underline mt-4 block h-px w-40 bg-gold" />
          <p className="mt-6 max-w-md text-cocoa/75">
            Continue seu ritual de cuidado em casa com produtos profissionais
            selecionados pelo Kassen Coiffure.
          </p>
        </div>

        <div className="prod-grid mt-14 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {PRODUCTS.map((p) => (
            <article
              key={p.name}
              data-cursor="product"
              data-cursor-text="View"
              className="prod-card group"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[2px] bg-offwhite">
                <Image
                  src={p.img}
                  alt={`${p.name} — ${p.brand}`}
                  fill
                  sizes="(max-width: 1024px) 45vw, 22vw"
                  className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
                />
              </div>
              <p className="mt-3 text-[10px] uppercase tracking-wider2 text-gold">
                {p.brand}
              </p>
              <p className="font-serif text-lg">{p.name}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="prod-marquee mt-16 overflow-hidden border-y border-gold/20 py-4">
        <div className="prod-marquee-inner flex w-max gap-16 pr-16 text-[11px] uppercase tracking-widest2 text-cocoa/45">
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <span key={i} className="whitespace-nowrap">
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
