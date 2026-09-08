"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { IMAGES } from "@/lib/images";

const STEPS = [
  { k: "Hidratação", d: "Reposição de água e nutrientes para devolver maciez e brilho aos fios." },
  { k: "Nutrição", d: "Óleos e lipídios que restauram a elasticidade e o movimento natural." },
  { k: "Reconstrução", d: "Massa e força para cabelos fragilizados por química ou calor." },
  { k: "Pele", d: "Protocolos faciais para uma pele revitalizada, equilibrada e luminosa." },
];

/**
 * TRATAMENTOS — sticky stage. The front image grows from a cropped frame while
 * the text blocks cross-fade one by one; secondary gold elements drift away and
 * a second image is finally revealed behind. Mobile: sequential fades, no pin.
 */
export function Treatments() {
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
          const items = gsap.utils.toArray<HTMLElement>(".trt-step");

          // reduced motion: show every step, stacked and static
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
                end: "+=" + STEPS.length * 90 + "%",
                pin: ".trt-sticky",
                scrub: 1,
              },
            });

            tl.fromTo(
              ".trt-img-front",
              { scale: 0.68, clipPath: "inset(14% 14% 14% 14%)" },
              { scale: 1, clipPath: "inset(0% 0% 0% 0%)", ease: "none" },
              0
            ).to(".trt-gold-el", { opacity: 0, y: -90, ease: "none" }, 0);

            items.forEach((el, i) => {
              // step 0 is already visible at pin entry; only fade later ones in
              if (i > 0) {
                tl.fromTo(
                  el,
                  { opacity: 0, y: 30 },
                  { opacity: 1, y: 0, duration: 0.4 },
                  i * 0.9
                );
              }
              if (i < items.length - 1) {
                tl.to(el, { opacity: 0, y: -30, duration: 0.4 }, i * 0.9 + 0.5);
              }
            });

            tl.fromTo(
              ".trt-img-back",
              { opacity: 0, scale: 1.2 },
              { opacity: 1, scale: 1, ease: "none" },
              items.length * 0.9 - 0.6
            );
          } else {
            gsap.from(".trt-img-front", {
              scale: 0.85,
              opacity: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: ".trt-sticky", start: "top 80%" },
            });
            items.forEach((el) => {
              el.style.position = "relative";
              el.style.opacity = "1";
              gsap.from(el, {
                y: 24,
                opacity: 0,
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: { trigger: el, start: "top 88%" },
              });
            });
          }
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="tratamentos" className="relative bg-offwhite">
      <div className="trt-sticky flex min-h-[100svh] items-center overflow-hidden py-24 md:py-0">
        <div className="u-container grid w-full items-center gap-12 lg:grid-cols-2">
          <div className="relative order-2 aspect-[4/5] w-full lg:order-1">
            <div className="trt-img-back absolute inset-0 overflow-hidden rounded-[2px]">
              <Image
                src={IMAGES.trtBack}
                alt="Cuidados com a pele"
                fill
                sizes="(max-width: 1024px) 90vw, 44vw"
                className="object-cover"
              />
            </div>
            <div className="trt-img-front absolute inset-0 overflow-hidden rounded-[2px] border border-gold/30">
              <Image
                src={IMAGES.trtFront}
                alt="Tratamento capilar profissional"
                fill
                sizes="(max-width: 1024px) 90vw, 44vw"
                className="object-cover"
              />
            </div>
            <span className="trt-gold-el absolute -right-4 -top-4 h-16 w-16 border-r border-t border-gold" />
          </div>

          <div className="relative order-1 lg:order-2">
            <p className="text-[11px] uppercase tracking-widest2 text-gold">
              Tratamentos
            </p>
            <h2 className="mt-3 font-serif text-4xl sm:text-6xl">
              Care beyond beauty.
            </h2>

            <div className="relative mt-10 md:h-44">
              {STEPS.map((s, i) => (
                <div
                  key={s.k}
                  className="trt-step md:absolute md:inset-0"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  <p className="font-serif text-2xl text-gold">{s.k}</p>
                  <p className="mt-2 max-w-sm text-cocoa/75">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
