"use client";

import { Suspense, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { IMAGES } from "@/lib/images";

// 3D loaded on demand, client-only, desktop-only.
const ProductScene = dynamic(
  () => import("@/components/three/ProductScene").then((m) => m.ProductScene),
  { ssr: false, loading: () => <StageImage /> }
);

const STEPS = [
  { n: "01", t: "Care", d: "Fórmulas que respeitam o fio e o couro cabeludo." },
  { n: "02", t: "Professional", d: "A mesma linha usada nos serviços do salão." },
  { n: "03", t: "Performance", d: "Resultado visível: brilho, maciez e proteção." },
  { n: "04", t: "Take it home", d: "Seu ritual Kassen continua todos os dias." },
];

function StageImage() {
  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0 -z-10 blur-2xl"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, rgba(216,193,153,0.55), transparent 70%)",
        }}
      />
      <div className="relative mx-auto h-full w-3/4 overflow-hidden rounded-[3px] shadow-2xl">
        <Image
          src={IMAGES.productStage}
          alt="Produto profissional Kassen"
          fill
          sizes="(max-width: 1024px) 60vw, 30vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}

/**
 * PRODUTO 3D — sticky stage. The product stays present while 01→04 cross-fade,
 * scaling up and shifting position through the narrative, ending on
 * "EXPLORE OUR PRODUCTS". Real R3F scene on desktop, rendered-image fallback
 * (with depth + shadow) on mobile / reduced motion.
 */
export function Product3D() {
  const root = useRef<HTMLElement>(null);
  const enable3D = useMediaQuery(
    "(min-width: 1024px) and (prefers-reduced-motion: no-preference)"
  );

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
          const items = gsap.utils.toArray<HTMLElement>(".p3d-step");

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
                end: "+=" + (STEPS.length + 1) * 85 + "%",
                pin: ".p3d-sticky",
                scrub: 1,
              },
            });

            tl.fromTo(
              ".p3d-stage",
              { scale: 0.78, xPercent: -8, rotate: -4 },
              { scale: 1.08, xPercent: 8, rotate: 4, ease: "none" }
            );

            items.forEach((el, i) => {
              if (i > 0) {
                tl.fromTo(
                  el,
                  { opacity: 0, x: 44 },
                  { opacity: 1, x: 0, duration: 0.4 },
                  i * 0.8
                );
              }
              if (i < items.length - 1) {
                tl.to(el, { opacity: 0, x: -44, duration: 0.4 }, i * 0.8 + 0.5);
              }
            });

            // fade the last step out, bring the closing CTA in
            tl.to(
              items[items.length - 1],
              { opacity: 0, x: -44, duration: 0.4 },
              items.length * 0.8 - 0.1
            );
            tl.fromTo(
              ".p3d-cta",
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.5 },
              items.length * 0.8 + 0.2
            );
          } else {
            gsap.from(".p3d-stage", {
              scale: 0.85,
              opacity: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: ".p3d-sticky", start: "top 80%" },
            });
            items.forEach((el) => {
              el.style.position = "relative";
              el.style.opacity = "1";
              gsap.from(el, {
                x: 24,
                opacity: 0,
                duration: 0.6,
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
    <section ref={root} className="relative bg-cocoa text-offwhite">
      <div className="p3d-sticky flex min-h-[100svh] items-center overflow-hidden py-24 md:py-0">
        <div className="u-container grid w-full items-center gap-10 md:grid-cols-2">
          <div className="p3d-stage relative mx-auto aspect-square w-[70%] max-w-md md:w-full">
            {enable3D ? (
              <Suspense fallback={<StageImage />}>
                <ProductScene />
              </Suspense>
            ) : (
              <StageImage />
            )}
          </div>

          <div className="relative">
            <p className="text-[11px] uppercase tracking-widest2 text-gold-soft">
              The Kassen products
            </p>

            <div className="relative mt-6 md:h-52">
              {STEPS.map((s, i) => (
                <div
                  key={s.n}
                  className="p3d-step md:absolute md:inset-0"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  <span className="font-serif text-5xl text-gold-soft">{s.n}</span>
                  <h3 className="mt-2 font-serif text-3xl">{s.t}</h3>
                  <p className="mt-2 max-w-sm text-offwhite/70">{s.d}</p>
                </div>
              ))}

              <a
                href="#produtos"
                className="p3d-cta mt-8 inline-flex items-center gap-3 text-sm uppercase tracking-widest2 text-gold-soft md:absolute md:inset-x-0 md:top-0 md:mt-0"
              >
                Explore our products
                <span className="h-px w-12 bg-gold-soft" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
