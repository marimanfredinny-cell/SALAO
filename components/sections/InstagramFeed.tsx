"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { IMAGES } from "@/lib/images";

const SHOTS = [IMAGES.ig1, IMAGES.ig2, IMAGES.ig3, IMAGES.ig4, IMAGES.ig5, IMAGES.ig6];
const HANDLE_URL = "https://instagram.com/salaokassencoiffure";

function IgIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * INSTAGRAM — editorial grid, staggered scale-in on scroll; hover reveals a warm
 * overlay + Instagram icon with a gentle zoom.
 */
export function InstagramFeed() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".ig-item", {
          y: 60,
          opacity: 0,
          scale: 0.94,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".ig-grid", start: "top 84%" },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="overflow-hidden bg-offwhite py-24 md:py-36">
      <div className="u-container text-center">
        <p className="text-[11px] uppercase tracking-widest2 text-gold">Instagram</p>
        <h2 className="mt-3 font-serif text-4xl sm:text-6xl">
          Follow the Kassen moment
        </h2>
        <a
          href={HANDLE_URL}
          target="_blank"
          rel="noreferrer"
          data-cursor="link"
          className="mt-4 inline-block text-sm tracking-wider2 text-cocoa/70 transition-colors hover:text-cocoa"
        >
          @salaokassencoiffure
        </a>
      </div>

      <div className="ig-grid u-container mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-6">
        {SHOTS.map((src, i) => (
          <a
            key={i}
            href={HANDLE_URL}
            target="_blank"
            rel="noreferrer"
            data-cursor="image"
            className="ig-item group relative aspect-square overflow-hidden rounded-[2px]"
          >
            <Image
              src={src}
              alt="Publicação do Instagram do Kassen Coiffure"
              fill
              sizes="(max-width: 768px) 45vw, 16vw"
              className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-110"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-cocoa/0 text-offwhite opacity-0 transition-all duration-500 group-hover:bg-cocoa/35 group-hover:opacity-100">
              <IgIcon />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
