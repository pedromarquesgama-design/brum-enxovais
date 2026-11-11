import { useEffect, useState } from 'react';
import { STORE_INFO } from '../data/catalog';
import { IconBag, IconClose, IconHeart, IconMenu, IconSearch } from './Icons';

const NAV_LINKS = [
  { href: '#inicio', label: 'Início' },
  { href: '#categorias', label: 'Categorias' },
  { href: '#catalogo', label: 'Catálogo' },
  { href: '#qualidade', label: 'Curadoria' },
  { href: '#contato', label: 'Contato' },
];

export default function Header({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-cream"
      >
        Pular para o conteúdo principal
      </a>

      <div className="bg-primary-deep text-cream text-xs py-2 px-4 text-center border-b border-hairline-dark">
        <p className="max-w-7xl mx-auto leading-snug">
          <span className="sm:hidden">Brum Enxovais · 1.428 itens · Orçamento via WhatsApp</span>
          <span className="hidden sm:inline">{STORE_INFO.announcement}</span>
        </p>
      </div>

      <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b border-hairline">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-[74px] flex items-center justify-between gap-2 sm:gap-3">
          {/* Mobile menu toggle */}
          <div className="flex items-center lg:hidden shrink-0">
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              className="p-1.5 sm:p-2 -ml-1 sm:-ml-2 rounded-full text-primary hover:bg-linen transition-colors"
            >
              {mobileOpen ? <IconClose className="w-5 h-5 sm:w-6 sm:h-6" /> : <IconMenu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>

          {/* Brand Identity */}
          <a
            href="#inicio"
            className="flex items-center shrink-0 focus-visible:rounded-xl"
          >
            <img
              src="/brum-enxovais-logo.png"
              alt="Brum Enxovais — Cama, Mesa, Banho e Utilidades"
              width="1678"
              height="937"
              className="h-11 sm:h-14 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <nav aria-label="Navegação principal" className="hidden lg:flex items-center gap-7 shrink-0">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink-muted hover:text-primary transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-0.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Buscar produtos e abrir filtros"
              className="p-1.5 sm:p-2 rounded-full text-ink hover:text-primary hover:bg-linen transition-colors"
            >
              <IconSearch className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={onOpenWishlist}
              aria-label={`Abrir favoritos (${wishlistCount} ${wishlistCount === 1 ? 'item' : 'itens'})`}
              className="relative p-1.5 sm:p-2 rounded-full text-ink hover:text-primary hover:bg-linen transition-colors"
            >
              <IconHeart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 sm:top-0.5 sm:right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-cream text-xs font-semibold flex items-center justify-center tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Abrir lista de orçamento (${cartCount} ${cartCount === 1 ? 'item' : 'itens'})`}
              className="relative inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-primary text-cream hover:bg-primary-strong px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-colors"
            >
              <IconBag className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Orçamento</span>
              <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-accent text-ink-strong text-xs font-bold flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileOpen && (
          <nav
            id="mobile-nav-drawer"
            aria-label="Menu mobile"
            className="lg:hidden border-t border-hairline bg-surface px-4 py-4 space-y-1 shadow-lg"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl px-4 py-3 text-base font-medium text-ink-strong hover:bg-linen transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
