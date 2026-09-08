"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { IMAGES } from "@/lib/images";

/**
 * HERO — cinematic intro then a scrub hand-off into the next section.
 * Intro: background fade → image unmasked → logo → title (masked lines) →
 * subtitle (letter-spacing settle) → scroll indicator.
 * On scroll: image zooms, title drifts up & fades, chrome fades, overlay clears.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
          .from(".hero-bg", { opacity: 0, duration: 1.1 })
          .fromTo(
            ".hero-image-mask",
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.35, ease: "power4.inOut" },
            0.15
          )
          .from(".hero-image img", { scale: 1.35, duration: 1.8, ease: "power3.out" }, "<")
          .from(".hero-kicker", { y: 18, opacity: 0, filter: "blur(8px)", duration: 0.9 }, 0.7)
          .from(
            ".hero-title .mask-inner",
            { yPercent: 120, duration: 1, stagger: 0.12, ease: "power4.out" },
            0.85
          )
          .from(
            ".hero-sub",
            { opacity: 0, letterSpacing: "0.7em", duration: 1 },
            1.15
          )
          .from(".hero-scroll", { opacity: 0, y: -12, duration: 0.8 }, 1.35);

        gsap
          .timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          })
          .to(".hero-image img", { scale: 1.18, ease: "none" }, 0)
          .to(".hero-title", { yPercent: -32, opacity: 0, ease: "none" }, 0)
          .to(
            ".hero-kicker, .hero-sub, .hero-scroll",
            { opacity: 0, y: -30, ease: "none" },
            0
          )
          .to(".hero-overlay", { opacity: 0.55, ease: "none" }, 0);
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="hero"
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-bege"
    >
      <div className="hero-bg absolute inset-0 bg-gradient-to-b from-champagne via-bege to-nude" />

      <div className="hero-image-mask absolute inset-0">
        <div className="hero-image absolute inset-0">
          <Image
            src={IMAGES.heroHair}
            alt="Cabelo em destaque — Kassen Coiffure"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="hero-overlay absolute inset-0 bg-cocoa/25" />
        </div>
      </div>

      {/* gold editorial frame */}
      <div className="pointer-events-none absolute inset-4 border border-gold/40 md:inset-8" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-offwhite">
        <p className="hero-kicker mb-5 text-[11px] uppercase tracking-widest2 text-gold-soft">
          Salão de beleza
        </p>
        <h1 className="hero-title font-serif text-[15vw] leading-[0.92] sm:text-[12vw] lg:text-[8.5vw]">
          <span className="block overflow-hidden">
            <span className="mask-inner block">KASSEN</span>
          </span>
          <span className="block overflow-hidden">
            <span className="mask-inner block italic text-gold-soft">Coiffure</span>
          </span>
        </h1>
        <p className="hero-sub mt-6 text-[10px] uppercase tracking-[0.2em] sm:text-xs sm:tracking-widest2 md:text-sm">
          Beauty • Care • Experience
        </p>
      </div>

      <div className="hero-scroll absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <span className="relative block h-14 w-px overflow-hidden bg-offwhite/40">
          <span className="absolute left-0 top-0 block h-4 w-px animate-scroll-dot bg-gold" />
        </span>
      </div>
    </section>
  );
}
