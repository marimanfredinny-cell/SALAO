"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Link = { label: string; href: string };

const EASE = [0.22, 1, 0.36, 1] as const;

export function MobileMenu({
  links,
  dark = false,
}: {
  links: Link[];
  dark?: boolean;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const barColor = open ? "bg-cocoa" : dark ? "bg-offwhite" : "bg-cocoa";

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative z-[60] flex h-10 w-10 items-center justify-center"
      >
        <span className="relative block h-3 w-6">
          <span
            className={`absolute left-0 block h-px w-6 transition-all duration-300 ease-luxe ${barColor} ${
              open ? "top-1/2 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 top-1/2 block h-px w-6 transition-all duration-300 ease-luxe ${barColor} ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 block h-px w-6 transition-all duration-300 ease-luxe ${barColor} ${
              open ? "top-1/2 -rotate-45" : "bottom-0"
            }`}
          />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ clipPath: "circle(0% at calc(100% - 36px) 36px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 36px) 36px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 36px) 36px)" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-0 z-50 flex flex-col bg-bege"
          >
            <div className="flex flex-1 flex-col justify-center gap-1 px-8">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ y: 36, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.22 + i * 0.06, duration: 0.5, ease: EASE }}
                  className="border-b border-gold/15 py-3 font-serif text-4xl text-cocoa"
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.5, ease: EASE }}
              className="px-8 pb-12"
            >
              <a
                href="#contato"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-gold py-4 text-center text-sm uppercase tracking-widest2 text-offwhite"
              >
                Agendar horário
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
