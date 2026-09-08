export function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-bege">
      <div className="u-container grid gap-10 py-16 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl">
            KASSEN <span className="text-gold">COIFFURE</span>
          </p>
          <p className="mt-3 max-w-xs text-sm tracking-wider2 text-cocoa/60">
            Beauty • Care • Experience
          </p>
        </div>
        <div className="text-sm leading-relaxed text-cocoa/70">
          <p className="mb-2 text-[11px] uppercase tracking-wider2 text-cocoa">
            Contato
          </p>
          <p>Rua Exemplo, 123 — Sua Cidade</p>
          <p>+55 (00) 0000-0000</p>
          <p>ola@kassencoiffure.com</p>
        </div>
        <div className="text-sm text-cocoa/70">
          <p className="mb-2 text-[11px] uppercase tracking-wider2 text-cocoa">
            Social
          </p>
          <a
            href="https://instagram.com/salaokassencoiffure"
            target="_blank"
            rel="noreferrer"
            data-cursor="link"
            className="transition-colors hover:text-cocoa"
          >
            @salaokassencoiffure
          </a>
        </div>
      </div>
      <div className="u-container flex flex-col items-center justify-between gap-3 border-t border-gold/15 py-6 text-xs text-cocoa/50 md:flex-row">
        <p>
          © {new Date().getFullYear()} Kassen Coiffure. Todos os direitos
          reservados.
        </p>
        <p>Feito com cuidado.</p>
      </div>
    </footer>
  );
}
