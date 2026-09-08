"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";

const QUOTES = [
  {
    q: "Saí do Kassen me sentindo outra pessoa. Cada detalhe foi pensado para mim.",
    a: "Marina R.",
    r: "Cliente desde 2021",
  },
  {
    q: "O cuidado com o cabelo e com a experiência é de outro nível. Virou o meu ritual.",
    a: "Camila F.",
    r: "Coloração & tratamento",
  },
  {
    q: "Ambiente lindo, equipe impecável e um resultado que sempre supera a expectativa.",
    a: "Beatriz L.",
    r: "Corte & finalização",
  },
];

/**
 * DEPOIMENTOS — sticky stage where one quote occupies most of the screen and the
 * others swap in with a soft blur/slide as you scroll. Mobile: simple fades.
 */
export function Testimonials() {
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
          const items = gsap.utils.toArray<HTMLElement>(".tst-item");

          if (reduce) {
            items.forEach((el) => {
              el.style.position = "relative";
              el.style.opacity = "1";
            });
            return;
          }

          if (isDesktop) {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: root.current,
                start: "top top",
                end: "+=" + QUOTES.length * 100 + "%",
                pin: ".tst-sticky",
                scrub: 1,
              },
            });
            items.forEach((el, i) => {
              if (i > 0) {
                tl.fromTo(
                  el,
                  { opacity: 0, y: 60, filter: "blur(12px)" },
                  { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5 },
                  i
                );
              }
              if (i < items.length - 1) {
                tl.to(
                  el,
                  { opacity: 0, y: -60, filter: "blur(12px)", duration: 0.5 },
                  i + 0.5
                );
              }
            });
          } else {
            items.forEach((el) => {
              el.style.position = "relative";
              el.style.opacity = "1";
              gsap.from(el, {
                opacity: 0,
                y: 30,
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: { trigger: el, start: "top 85%" },
              });
            });
          }
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="bg-cocoa text-offwhite">
      <div className="tst-sticky flex min-h-[100svh] items-center overflow-hidden py-24 md:py-0">
        <div className="u-container">
          <p className="text-[11px] uppercase tracking-widest2 text-gold-soft">
            What our clients say
          </p>

          <div className="relative mt-10 md:h-[42vh]">
            {QUOTES.map((it, i) => (
              <blockquote
                key={i}
                className="tst-item flex flex-col justify-center md:absolute md:inset-0"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <p className="max-w-4xl font-serif text-2xl leading-tight sm:text-3xl md:text-5xl lg:text-6xl">
                  &ldquo;{it.q}&rdquo;
                </p>
                <footer className="mt-8 text-sm text-offwhite/60">
                  <span className="text-gold-soft">{it.a}</span> — {it.r}
                </footer>
              </blockquote>
            ))}
          </div>

          <div className="mt-8 flex gap-3">
            {QUOTES.map((_, i) => (
              <span key={i} className="block h-px w-14 bg-gold-soft/50" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
