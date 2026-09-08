"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { IMAGES } from "@/lib/images";

const SERVICES = [
  {
    n: "01",
    title: "Cabelos",
    copy: "Corte, coloração, escova, finalização e tratamentos.",
    img: IMAGES.svcHair,
  },
  {
    n: "02",
    title: "Tratamentos Capilares",
    copy: "Hidratação, nutrição, reconstrução e cuidados profissionais.",
    img: IMAGES.svcTreatment,
  },
  {
    n: "03",
    title: "Pele",
    copy: "Tratamentos e cuidados para manter a pele saudável e revitalizada.",
    img: IMAGES.svcSkin,
  },
  {
    n: "04",
    title: "Unhas",
    copy: "Manicure, pedicure e cuidados para unhas.",
    img: IMAGES.svcNails,
  },
];

/**
 * SERVIÇOS — desktop: vertical scroll drives a horizontal pinned track, each
 * card revealing with its own motion (image zoom, text rise, gold corners draw).
 * Mobile/tablet: native snap carousel with a lighter reveal.
 */
export function Services() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const el = track.current!;
          const getDistance = () => el.scrollWidth - window.innerWidth;

          const tween = gsap.to(el, {
            x: () => -getDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: () => "+=" + getDistance(),
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          gsap.utils.toArray<HTMLElement>(".svc-card").forEach((card) => {
            gsap.from(card.querySelector(".svc-media img"), {
              scale: 1.45,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            });
            gsap.from(card.querySelectorAll(".svc-rise"), {
              yPercent: 130,
              opacity: 0,
              duration: 0.8,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: "left 72%",
              },
            });
            gsap.fromTo(
              card.querySelectorAll(".svc-corner"),
              { scale: 0 },
              {
                scale: 1,
                duration: 0.5,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: tween,
                  start: "left 62%",
                },
              }
            );
          });
        }
      );

      mm.add(
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.utils.toArray<HTMLElement>(".svc-card").forEach((card) => {
            gsap.from(card, {
              y: 60,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 88%" },
            });
          });
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="servicos"
      className="relative overflow-hidden bg-bege py-24 lg:h-[100svh] lg:py-0"
    >
      <div className="u-container pt-2 lg:absolute lg:inset-x-0 lg:top-[12vh] lg:z-10">
        <p className="text-[11px] uppercase tracking-widest2 text-gold">Serviços</p>
        <h2 className="mt-3 font-serif text-4xl sm:text-6xl">Seu momento Kassen</h2>
      </div>

      <div className="lg:flex lg:h-full lg:items-center">
        <div
          ref={track}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] lg:mt-0 lg:snap-none lg:overflow-visible lg:px-[12vw] [&::-webkit-scrollbar]:hidden"
        >
          {SERVICES.map((s) => (
            <article
              key={s.n}
              data-cursor="image"
              className="svc-card group relative flex w-[78vw] shrink-0 snap-center flex-col overflow-hidden rounded-[2px] bg-offwhite sm:w-[60vw] md:w-[46vw] lg:h-[64vh] lg:w-[36vw]"
            >
              <div className="svc-media relative aspect-[4/5] overflow-hidden lg:aspect-auto lg:flex-1">
                <Image
                  src={s.img}
                  alt={s.title}
                  fill
                  sizes="(max-width: 1024px) 70vw, 36vw"
                  className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
                />
                <span className="svc-corner absolute left-4 top-4 h-8 w-8 border-l border-t border-gold" />
                <span className="svc-corner absolute bottom-4 right-4 h-8 w-8 border-b border-r border-gold" />
              </div>
              <div className="p-6 lg:p-7">
                <span className="svc-rise block overflow-hidden text-[11px] tracking-widest2 text-gold">
                  {s.n}
                </span>
                <h3 className="svc-rise mt-2 overflow-hidden font-serif text-2xl lg:text-3xl">
                  {s.title}
                </h3>
                <p className="svc-rise mt-2 overflow-hidden text-sm text-cocoa/70">
                  {s.copy}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
