"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { IMAGES } from "@/lib/images";

const WORDS = [
  { t: "Cut", pos: "left-[6vw] top-[20%]" },
  { t: "Color", pos: "right-[8vw] top-[34%]" },
  { t: "Care", pos: "left-[12vw] bottom-[28%]" },
  { t: "Shine", pos: "right-[10vw] bottom-[16%]" },
];

/**
 * SEÇÃO DE CABELO — beauty-campaign feel. Desktop pins and scrubs: the image
 * de-zooms to 1, the title unmasks, and the four words drop in at staggered
 * scroll offsets from different corners. Mobile: lighter, non-pinned reveal.
 */
export function HairEditorial() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reduce } = context.conditions as {
            isDesktop: boolean;
            reduce: boolean;
          };
          if (reduce) return;

          if (isDesktop) {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: root.current,
                  start: "top top",
                  end: "+=150%",
                  pin: true,
                  scrub: 1,
                },
              })
              .fromTo(".hair-media img", { scale: 1.4 }, { scale: 1, ease: "none" }, 0)
              .fromTo(
                ".hair-title .mask-inner",
                { yPercent: 120 },
                { yPercent: 0, stagger: 0.1, ease: "power3.out" },
                0.05
              )
              .fromTo(
                ".hair-word",
                { opacity: 0, y: 44, rotate: (i: number) => (i % 2 ? 5 : -5) },
                { opacity: 1, y: 0, rotate: 0, stagger: 0.18, ease: "power2.out" },
                0.25
              );
          } else {
            gsap.from(".hair-title .mask-inner", {
              yPercent: 120,
              stagger: 0.1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: root.current, start: "top 70%" },
            });
            gsap.from(".hair-word", {
              opacity: 0,
              y: 30,
              stagger: 0.12,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: { trigger: root.current, start: "top 55%" },
            });
          }
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative h-[100svh] min-h-[560px] overflow-hidden bg-cocoa text-offwhite"
    >
      <div className="hair-media absolute inset-0">
        <Image
          src={IMAGES.hairEditorial}
          alt="Editorial de cabelo — Kassen Coiffure"
          fill
          sizes="100vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cocoa/85 via-cocoa/25 to-cocoa/55" />
      </div>

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <h2 className="hair-title text-center font-serif text-[16vw] leading-[0.95] md:text-[8vw]">
          <span className="block overflow-hidden">
            <span className="mask-inner block">Hair,</span>
          </span>
          <span className="block overflow-hidden">
            <span className="mask-inner block italic text-gold-soft">your way.</span>
          </span>
        </h2>
      </div>

      {WORDS.map((w) => (
        <span
          key={w.t}
          className={`hair-word absolute ${w.pos} font-serif text-3xl uppercase tracking-wider2 text-gold-soft md:text-5xl`}
        >
          {w.t}
        </span>
      ))}
    </section>
  );
}
