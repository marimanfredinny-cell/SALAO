"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { IMAGES } from "@/lib/images";

/**
 * ANTES E DEPOIS — draggable vertical divider (pointer events, clip-path on the
 * "before" layer). Entry: halves slide in from opposite sides, divider draws
 * down, title unmasks.
 */
export function BeforeAfter() {
  const root = useRef<HTMLElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [pos, setPos] = useState(50);

  const moveTo = useCallback((clientX: number) => {
    const el = wrap.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(96, Math.max(4, p)));
  }, []);

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".ba-before", {
          xPercent: -10,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 76%" },
        });
        gsap.from(".ba-after", {
          xPercent: 10,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 76%" },
        });
        gsap.from(".ba-handle", {
          scaleY: 0,
          transformOrigin: "top",
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });
        gsap.from(".ba-title .mask-inner", {
          yPercent: 115,
          stagger: 0.1,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: { trigger: ".ba-title", start: "top 84%" },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="bg-bege py-24 md:py-36">
      <div className="u-container">
        <h2 className="ba-title font-serif text-4xl sm:text-6xl">
          <span className="block overflow-hidden">
            <span className="mask-inner block">The</span>
          </span>
          <span className="block overflow-hidden">
            <span className="mask-inner block italic text-gold">transformation.</span>
          </span>
        </h2>

        <div
          ref={wrap}
          data-lenis-prevent
          className="relative mt-12 aspect-[16/10] w-full touch-none select-none overflow-hidden rounded-[2px] border border-gold/25"
          onPointerDown={(e) => {
            dragging.current = true;
            (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
            moveTo(e.clientX);
          }}
          onPointerMove={(e) => dragging.current && moveTo(e.clientX)}
          onPointerUp={() => (dragging.current = false)}
          onPointerCancel={() => (dragging.current = false)}
        >
          <div className="ba-after absolute inset-0">
            <Image
              src={IMAGES.afterImg}
              alt="Depois"
              fill
              sizes="(max-width: 1024px) 90vw, 70vw"
              className="object-cover"
            />
            <span className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-cocoa/70 px-3 py-1 text-[10px] uppercase tracking-wider2 text-offwhite">
              Depois
            </span>
          </div>

          <div
            className="ba-before absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <Image
              src={IMAGES.beforeImg}
              alt="Antes"
              fill
              sizes="(max-width: 1024px) 90vw, 70vw"
              className="object-cover"
            />
            <span className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-cocoa/70 px-3 py-1 text-[10px] uppercase tracking-wider2 text-offwhite">
              Antes
            </span>
          </div>

          <div
            className="ba-handle pointer-events-none absolute inset-y-0 z-10 w-px bg-gold"
            style={{ left: `${pos}%` }}
          >
            <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold bg-offwhite text-gold shadow-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />
              </svg>
            </span>
          </div>
        </div>
        <p className="mt-4 text-center text-xs tracking-wider2 text-cocoa/50">
          Arraste para revelar
        </p>
      </div>
    </section>
  );
}
