"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { IMAGES } from "@/lib/images";

const ITEMS = [
  { img: IMAGES.gal1, cls: "col-span-6 md:col-span-4 aspect-[4/5]", speed: 0.9, alt: "Cabelo finalizado" },
  { img: IMAGES.gal2, cls: "col-span-6 md:col-span-3 aspect-[3/4] md:mt-16", speed: 1.2, alt: "Unhas" },
  { img: IMAGES.gal3, cls: "col-span-6 md:col-span-5 aspect-[4/3] md:-mt-8", speed: 0.8, alt: "Ambiente do salão" },
  { img: IMAGES.gal4, cls: "col-span-7 md:col-span-5 aspect-[16/10]", speed: 1.05, alt: "Tratamento capilar" },
  { img: IMAGES.gal5, cls: "col-span-5 md:col-span-3 aspect-[3/4] md:mt-10", speed: 1.3, alt: "Cuidados com a pele" },
  { img: IMAGES.gal6, cls: "col-span-12 md:col-span-4 aspect-[4/5] md:-mt-6", speed: 0.85, alt: "Detalhe de produto" },
];

/**
 * GALERIA — asymmetric grid. Items travel at different speeds (data-speed drives
 * a scrubbed y-parallax) and each image zooms out on entry. Hover: zoom + warm
 * overlay + a small gold "+".
 */
export function Gallery() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".gal-item").forEach((el) => {
          const speed = parseFloat(el.dataset.speed || "1");
          gsap.fromTo(
            el,
            { yPercent: 10 * speed },
            {
              yPercent: -10 * speed,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            }
          );
          gsap.from(el.querySelector("img"), {
            scale: 1.3,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
          });
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="galeria"
      className="overflow-hidden bg-offwhite py-24 md:py-36"
    >
      <div className="u-container">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="font-serif text-4xl sm:text-6xl">The Kassen moment</h2>
          <span className="hidden text-[11px] uppercase tracking-widest2 text-gold sm:block">
            Galeria
          </span>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {ITEMS.map((it, i) => (
            <figure
              key={i}
              data-cursor="image"
              data-speed={it.speed}
              className={`gal-item group relative overflow-hidden rounded-[2px] ${it.cls}`}
            >
              <Image
                src={it.img}
                alt={it.alt}
                fill
                sizes="(max-width: 768px) 90vw, 40vw"
                className="object-cover transition-transform duration-[900ms] ease-luxe group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-cocoa/0 transition-colors duration-500 group-hover:bg-cocoa/25" />
              <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-gold/60 text-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                +
              </span>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
