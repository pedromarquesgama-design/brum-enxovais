import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { STORE_INFO } from '../data/catalog';
import { IconBag, IconHeart, IconSearch } from './Icons';
import RealismButton from './ui/shiny-borders-button';

const SHOW_AFTER_PX = 24;

// As três barras viram um X quando o menu abre.
function MenuIcon({ open }) {
  const transition = { type: 'spring', stiffness: 420, damping: 32 };
  const origin = { transformBox: 'fill-box', transformOrigin: 'center' };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden="true"
      className="w-6 h-6"
    >
      <motion.line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        animate={open ? { y: 0, rotate: 45 } : { y: -5, rotate: 0 }}
        transition={transition}
        style={origin}
      />
      <motion.line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        animate={open ? { y: 0, rotate: -45, opacity: 0 } : { y: 0, rotate: 0, opacity: 1 }}
        transition={transition}
        style={origin}
      />
      <motion.line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        animate={open ? { y: 0, rotate: -45 } : { y: 5, rotate: 0 }}
        transition={transition}
        style={origin}
      />
    </svg>
  );
}

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
  const [navVisible, setNavVisible] = useState(
    () => typeof window !== 'undefined' && window.scrollY > SHOW_AFTER_PX
  );

  // A barra fica recolhida no topo para o hero ocupar a tela inteira.
  useEffect(() => {
    const onScroll = () => {
      const visible = window.scrollY > SHOW_AFTER_PX;
      setNavVisible(visible);
      if (!visible) setMobileOpen(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  return (
    <div
      className={`fixed inset-x-0 top-0 z-40 transition-transform duration-300 ease-out focus-within:translate-y-0 ${
        navVisible ? 'translate-y-0 shadow-[0_12px_28px_-20px_rgba(3,45,54,0.5)]' : '-translate-y-full'
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-cream"
      >
        Pular para o conteúdo principal
      </a>

      <div className="bg-primary-deep text-cream text-xs py-2 px-4 text-center border-b border-hairline-dark">
        <p className="max-w-7xl mx-auto leading-snug">
          <span className="sm:hidden">Brum Enxovais - Mais de 1.500 itens!</span>
          <span className="hidden sm:inline">{STORE_INFO.announcement}</span>
        </p>
      </div>

      <header className="bg-cream/95 backdrop-blur-md border-b border-hairline">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-[74px] flex items-center justify-between gap-2 sm:gap-3">
          {/* Mobile menu toggle */}
          <div className="flex items-center lg:hidden shrink-0">
            <motion.button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              className="p-1.5 sm:p-2 -ml-1 sm:-ml-2 rounded-full text-primary pointer-fine:hover:bg-linen transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              <MenuIcon open={mobileOpen} />
            </motion.button>
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
                className="text-sm font-medium text-ink-muted pointer-fine:hover:text-primary transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-0.5 sm:gap-2 shrink-0">
            <motion.button
              type="button"
              onClick={onOpenSearch}
              aria-label="Buscar produtos e abrir filtros"
              className="p-1.5 sm:p-2 rounded-full text-ink pointer-fine:hover:text-primary pointer-fine:hover:bg-linen transition-colors"
              whileTap={{ scale: 0.88 }}
            >
              <IconSearch className="w-5 h-5" />
            </motion.button>

            <motion.button
              type="button"
              onClick={onOpenWishlist}
              aria-label={`Abrir favoritos (${wishlistCount} ${wishlistCount === 1 ? 'item' : 'itens'})`}
              className="relative p-1.5 sm:p-2 rounded-full text-ink pointer-fine:hover:text-primary pointer-fine:hover:bg-linen transition-colors"
              whileTap={{ scale: 0.88 }}
            >
              <IconHeart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 sm:top-0.5 sm:right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-cream text-xs font-semibold flex items-center justify-center tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </motion.button>

            <RealismButton
              text={
                <>
                  <IconBag className="w-4 h-4 shrink-0" />
                  <span className="hidden sm:inline">Orçamento</span>
                  <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-accent text-ink-strong text-xs font-bold flex items-center justify-center tabular-nums">
                    {cartCount}
                  </span>
                </>
              }
              onClick={onOpenCart}
              aria-label={`Abrir lista de orçamento (${cartCount} ${cartCount === 1 ? 'item' : 'itens'})`}
              className="[--shiny-btn-size:0.85rem]"
            />
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        <AnimatePresence initial={false}>
          {mobileOpen && (
            <motion.nav
              key="mobile-nav"
              id="mobile-nav-drawer"
              aria-label="Menu mobile"
              className="lg:hidden overflow-hidden border-t border-hairline bg-surface px-4 py-4 space-y-1 shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              {NAV_LINKS.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-ink-strong pointer-fine:hover:bg-linen transition-colors"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.04, duration: 0.24 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
