"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { IMAGES } from "@/lib/images";
import { SplitText } from "@/components/util/SplitText";

/**
 * A EXPERIÊNCIA — asymmetric composition with parallax.
 * Image 1 scales up, image 2 slides in from the right, heading reveals by
 * masked lines, paragraph animates word by word, a gold line drifts along.
 */
export function Experience() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top 78%",
              end: "bottom bottom",
              scrub: 1,
            },
          })
          .fromTo(
            ".exp-img-1",
            { scale: 0.82, yPercent: 10 },
            { scale: 1.05, yPercent: -5, ease: "none" },
            0
          )
          .fromTo(
            ".exp-img-2",
            { xPercent: 65, opacity: 0 },
            { xPercent: 0, opacity: 1, ease: "power2.out" },
            0.1
          )
          .fromTo(
            ".exp-gold",
            { y: 70, opacity: 0 },
            { y: -50, opacity: 1, ease: "none" },
            0
          );

        gsap.from(".exp-title .mask-inner", {
          yPercent: 115,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: { trigger: ".exp-title", start: "top 82%" },
        });

        gsap.from(".exp-copy .st-inner", {
          yPercent: 110,
          opacity: 0,
          duration: 0.6,
          stagger: 0.02,
          ease: "power3.out",
          scrollTrigger: { trigger: ".exp-copy", start: "top 84%" },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="experiencia"
      className="relative overflow-hidden bg-offwhite py-28 md:py-40"
    >
      <div className="u-container grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="exp-title font-serif text-4xl leading-[1.04] sm:text-6xl lg:text-7xl">
            <span className="block overflow-hidden">
              <span className="mask-inner block">Beauty is</span>
            </span>
            <span className="block overflow-hidden">
              <span className="mask-inner block">
                an <span className="italic text-gold">experience.</span>
              </span>
            </span>
          </h2>
          <SplitText
            as="p"
            text="Mais do que um salão, um espaço para cuidar de você, transformar sua beleza e viver cada momento."
            className="exp-copy mt-8 max-w-md text-base leading-relaxed text-cocoa/75 md:text-lg"
          />
        </div>

        <div className="relative lg:col-span-5">
          <div className="exp-img-1 relative aspect-[3/4] w-4/5 overflow-hidden rounded-[2px]">
            <Image
              src={IMAGES.expA}
              alt="Atendimento no Kassen Coiffure"
              fill
              sizes="(max-width: 1024px) 80vw, 30vw"
              className="object-cover"
            />
          </div>
          <div className="exp-img-2 absolute -bottom-10 right-0 aspect-[4/5] w-3/5 overflow-hidden rounded-[2px] border border-gold/30 shadow-2xl">
            <Image
              src={IMAGES.expB}
              alt="Detalhe de beleza e cabelo"
              fill
              sizes="(max-width: 1024px) 60vw, 24vw"
              className="object-cover"
            />
          </div>
          <span className="exp-gold absolute -left-6 top-1/3 h-28 w-px bg-gold" />
        </div>
      </div>
    </section>
  );
}
