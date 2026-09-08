"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { IMAGES } from "@/lib/images";

const WHATSAPP_URL = "https://wa.me/5500000000000";
const BOOKING_URL = "#";

/**
 * CTA FINAL — cinematic arrival. Background de-zooms, gold lines draw across the
 * frame, the headline unmasks large, subtext and buttons rise in.
 */
export function FinalCta() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top 85%",
              end: "bottom bottom",
              scrub: 1,
            },
          })
          .fromTo(".cta-bg", { scale: 1.25 }, { scale: 1, ease: "none" }, 0)
          .fromTo(
            ".cta-line-v",
            { scaleY: 0 },
            { scaleY: 1, ease: "none" },
            0
          )
          .fromTo(
            ".cta-line-h",
            { scaleX: 0 },
            { scaleX: 1, ease: "none" },
            0
          );

        gsap.from(".cta-title .mask-inner", {
          yPercent: 120,
          duration: 1.1,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: { trigger: ".cta-title", start: "top 82%" },
        });

        gsap.from(".cta-fade", {
          y: 30,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cta-actions", start: "top 88%" },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="contato"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-cocoa text-offwhite"
    >
      <div className="cta-bg absolute inset-0">
        <Image
          src={IMAGES.ctaBg}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
      </div>

      <span className="cta-line-v absolute left-8 top-0 h-full w-px origin-top bg-gold/40 md:left-16" />
      <span className="cta-line-h absolute left-0 top-1/2 w-full origin-left border-t border-gold/25" />

      <div className="u-container relative z-10 py-24 text-center">
        <h2 className="cta-title font-serif text-[13vw] leading-[0.94] md:text-[7vw]">
          <span className="block overflow-hidden">
            <span className="mask-inner block">Your moment</span>
          </span>
          <span className="block overflow-hidden">
            <span className="mask-inner block italic text-gold-soft">
              starts here.
            </span>
          </span>
        </h2>

        <p className="cta-fade mx-auto mt-6 max-w-md text-offwhite/75">
          Reserve um tempo para você.
        </p>

        <div className="cta-actions mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={BOOKING_URL}
            data-cursor="button"
            className="cta-fade w-full rounded-full bg-gold px-8 py-4 text-[11px] uppercase tracking-widest2 text-cocoa transition-transform duration-300 ease-luxe hover:scale-[1.03] sm:w-auto"
          >
            Agendar horário
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            data-cursor="button"
            className="cta-fade w-full rounded-full border border-gold px-8 py-4 text-[11px] uppercase tracking-widest2 text-offwhite transition-colors duration-300 hover:bg-gold hover:text-cocoa sm:w-auto"
          >
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
