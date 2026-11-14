import { CATEGORIES, STORE_INFO, buildWhatsAppUrl } from '../data/catalog';
import { IconChevronDown, IconMail, IconPhone, IconWhatsApp } from './Icons';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer({ onSelectCategory }) {
  const goToCategory = (category) => {
    onSelectCategory(category);
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="bg-primary-deep text-cream border-t border-hairline-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <a href="#inicio" className="inline-block focus-visible:rounded-2xl">
              <span className="inline-flex items-center rounded-2xl bg-cream px-4 py-2 shadow-xs">
                <img
                  src="/brum-enxovais-logo.png"
                  alt="Brum Enxovais — Cama, Mesa, Banho e Utilidades"
                  width="1678"
                  height="937"
                  className="h-12 sm:h-14 w-auto object-contain"
                />
              </span>
              <span className="text-xs text-accent font-medium mt-3 block">
                {STORE_INFO.tagline}
              </span>
            </a>

            <p className="mt-4 text-sm text-cream/80 leading-relaxed max-w-sm">
              Peças de cama, mesa, banho, tapetes, cozinha, organização e utilidades selecionadas para compor enxovais e equipar o lar.
            </p>

            <div className="mt-6 flex items-center gap-2.5">
              <a
                href={buildWhatsAppUrl('Olá, Brum Enxovais!')}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Conversar no WhatsApp"
                className="w-10 h-10 rounded-full bg-primary pointer-fine:hover:bg-accent pointer-fine:hover:text-ink-strong text-cream border border-hairline-dark flex items-center justify-center transition-colors"
              >
                <IconWhatsApp className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${STORE_INFO.email}`}
                aria-label="Enviar e-mail"
                className="w-10 h-10 rounded-full bg-primary pointer-fine:hover:bg-accent pointer-fine:hover:text-ink-strong text-cream border border-hairline-dark flex items-center justify-center transition-colors"
              >
                <IconMail className="w-4 h-4" />
              </a>
              <a
                href={`tel:${STORE_INFO.whatsappDigits}`}
                aria-label="Ligar para atendimento"
                className="w-10 h-10 rounded-full bg-primary pointer-fine:hover:bg-accent pointer-fine:hover:text-ink-strong text-cream border border-hairline-dark flex items-center justify-center transition-colors"
              >
                <IconPhone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Desktop Link Columns */}
          <div className="hidden md:grid md:col-span-7 md:grid-cols-[1fr_0.9fr_1.4fr] gap-6 lg:gap-8">
            <div>
              <h3 className="text-sm font-semibold text-cream mb-3.5">Departamentos</h3>
              <ul className="space-y-2.5 text-sm text-cream/80">
                {CATEGORIES.map((category) => (
                  <li key={category.id}>
                    <button
                      type="button"
                      onClick={() => goToCategory(category.id)}
                      className="pointer-fine:hover:text-accent transition-colors text-left"
                    >
                      {category.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-cream mb-3.5">Navegação</h3>
              <ul className="space-y-2.5 text-sm text-cream/80">
                <li>
                  <a href="#inicio" className="pointer-fine:hover:text-accent transition-colors">
                    Início
                  </a>
                </li>
                <li>
                  <a href="#categorias" className="pointer-fine:hover:text-accent transition-colors">
                    Categorias
                  </a>
                </li>
                <li>
                  <a href="#catalogo" className="pointer-fine:hover:text-accent transition-colors">
                    Catálogo Completo
                  </a>
                </li>
                <li>
                  <a href="#qualidade" className="pointer-fine:hover:text-accent transition-colors">
                    Curadoria e Qualidade
                  </a>
                </li>
                <li>
                  <a href="#contato" className="pointer-fine:hover:text-accent transition-colors">
                    Fale Conosco
                  </a>
                </li>
              </ul>
            </div>

            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-cream mb-3.5">Atendimento</h3>
              <ul className="space-y-2.5 text-sm text-cream/80">
                <li className="tabular-nums">{STORE_INFO.phoneDisplay}</li>
                <li className="[overflow-wrap:anywhere]">{STORE_INFO.email}</li>
                <li>{STORE_INFO.address}</li>
                <li>{STORE_INFO.hours}</li>
              </ul>
            </div>
          </div>

          {/* Mobile Accordions */}
          <div className="md:hidden space-y-2 border-t border-hairline-dark pt-4">
            <details className="group border-b border-hairline-dark pb-3">
              <summary className="flex items-center justify-between py-2 text-sm font-semibold text-cream list-none cursor-pointer">
                <span>Departamentos</span>
                <IconChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
              </summary>
              <ul className="pt-2 pb-1 space-y-2 text-sm text-cream/80">
                {CATEGORIES.map((category) => (
                  <li key={category.id}>
                    <button
                      type="button"
                      onClick={() => goToCategory(category.id)}
                      className="pointer-fine:hover:text-accent text-left"
                    >
                      {category.title}
                    </button>
                  </li>
                ))}
              </ul>
            </details>

            <details className="group border-b border-hairline-dark pb-3">
              <summary className="flex items-center justify-between py-2 text-sm font-semibold text-cream list-none cursor-pointer">
                <span>Navegação</span>
                <IconChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
              </summary>
              <ul className="pt-2 pb-1 space-y-2 text-sm text-cream/80">
                <li><a href="#inicio" className="pointer-fine:hover:text-accent">Início</a></li>
                <li><a href="#categorias" className="pointer-fine:hover:text-accent">Categorias</a></li>
                <li><a href="#catalogo" className="pointer-fine:hover:text-accent">Catálogo</a></li>
                <li><a href="#qualidade" className="pointer-fine:hover:text-accent">Curadoria</a></li>
                <li><a href="#contato" className="pointer-fine:hover:text-accent">Contato</a></li>
              </ul>
            </details>

            <details className="group border-b border-hairline-dark pb-3">
              <summary className="flex items-center justify-between py-2 text-sm font-semibold text-cream list-none cursor-pointer">
                <span>Atendimento</span>
                <IconChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
              </summary>
              <ul className="pt-2 pb-1 space-y-2 text-sm text-cream/80">
                <li className="tabular-nums">{STORE_INFO.phoneDisplay}</li>
                <li>{STORE_INFO.email}</li>
                <li>{STORE_INFO.address}</li>
                <li>{STORE_INFO.hours}</li>
              </ul>
            </details>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-hairline-dark flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/75">
          <p>© {CURRENT_YEAR} {STORE_INFO.brandName} — Todos os direitos reservados.</p>
          <p>Valores e disponibilidade sob consulta; dados de contato exibidos têm caráter ilustrativo.</p>
        </div>
      </div>
    </footer>
  );
}
