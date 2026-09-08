"use client";

import { useEffect, useRef } from "react";

/**
 * Discreet two-part cursor (fast dot + lerped ring).
 * Reacts to `[data-cursor]` targets:
 *   data-cursor="image" | "button" | "link" | "product"
 *   data-cursor-text="VIEW"  (shown inside the ring)
 * Disabled on touch devices and when reduced motion is requested.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    document.body.classList.add("has-custom-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
    };

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor]"
      );
      if (!el) {
        ring.dataset.state = "";
        ring.dataset.hasLabel = "false";
        return;
      }
      ring.dataset.state = el.dataset.cursor || "link";
      const text = el.dataset.cursorText;
      if (text) {
        label.textContent = text;
        ring.dataset.hasLabel = "true";
      } else {
        ring.dataset.hasLabel = "false";
      }
    };

    const onEnter = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };
    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseenter", onEnter);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
    >
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-gold transition-opacity duration-300"
      />
      <div
        ref={ringRef}
        data-state=""
        data-has-label="false"
        className="cursor-ring fixed left-0 top-0 flex items-center justify-center rounded-full border border-gold/70 text-[9px] font-medium uppercase tracking-widest2 text-offwhite"
      >
        <span ref={labelRef} className="cursor-label" />
      </div>
    </div>
  );
}
