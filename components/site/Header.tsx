"use client";

import { useEffect, useState } from "react";
import { MobileMenu } from "./MobileMenu";

export const NAV_LINKS = [
  { label: "Início", href: "#hero" },
  { label: "Serviços", href: "#servicos" },
  { label: "Experiência", href: "#experiencia" },
  { label: "Produtos", href: "#produtos" },
  { label: "Galeria", href: "#galeria" },
  { label: "Contato", href: "#contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-luxe ${
        scrolled
          ? "border-b border-gold/20 bg-offwhite/70 py-3 backdrop-blur-md"
          : "border-b border-transparent bg-transparent py-5"
      }`}
    >
      <div className="u-container flex items-center justify-between gap-6">
        <a
          href="#hero"
          data-cursor="link"
          className={`font-serif text-base tracking-wider2 transition-colors md:text-lg ${
            scrolled ? "text-cocoa" : "text-offwhite"
          }`}
        >
          KASSEN <span className="text-gold">COIFFURE</span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-cursor="link"
              className={`group relative text-[11px] uppercase tracking-wider2 transition-colors ${
                scrolled
                  ? "text-cocoa/70 hover:text-cocoa"
                  : "text-offwhite/80 hover:text-offwhite"
              }`}
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 ease-luxe group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contato"
            data-cursor="button"
            className={`hidden rounded-full border px-5 py-2 text-[11px] uppercase tracking-wider2 transition-colors sm:inline-block ${
              scrolled
                ? "border-gold text-cocoa hover:bg-gold hover:text-offwhite"
                : "border-offwhite/50 text-offwhite hover:border-gold hover:bg-gold hover:text-cocoa"
            }`}
          >
            Agendar
          </a>
          <MobileMenu links={NAV_LINKS} dark={!scrolled} />
        </div>
      </div>
    </header>
  );
}
