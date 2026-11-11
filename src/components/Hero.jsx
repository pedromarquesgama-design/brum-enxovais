import { useState } from 'react';
import { HERO_SLIDES } from '../data/catalog';

export default function Hero({ onOpenSearch }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slide = HERO_SLIDES[activeIndex];

  return (
    <section
      id="inicio"
      aria-label="Destaques principais"
      className="relative isolate w-full bg-gradient-to-b from-linen/60 to-cream md:bg-none md:bg-cream md:min-h-[620px] lg:min-h-[680px] lg:max-h-[780px] flex flex-col justify-between overflow-hidden"
    >
      {/* Desktop full-bleed background photography with sunlit left cream fade */}
      <div className="hidden md:block absolute inset-0 -z-20 pointer-events-none select-none">
        {HERO_SLIDES.map((item, idx) => {
          const isCurrent = idx === activeIndex;
          return (
            <img
              key={item.id}
              src={item.image}
              alt={isCurrent ? item.imageAlt : ''}
              aria-hidden={!isCurrent}
              loading="eager"
              decoding="async"
              className={`absolute inset-0 w-full h-full object-cover ${item.imagePosition} transition-opacity duration-700 ease-out ${
                isCurrent ? 'opacity-100' : 'opacity-0'
              }`}
            />
          );
        })}
      </div>

      <div
        aria-hidden="true"
        className="hidden md:block absolute inset-0 -z-10 pointer-events-none bg-gradient-to-r from-cream via-cream/85 to-transparent"
      />

      {/* Editorial headline + lead + CTAs */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:py-16 lg:py-20 flex-1 flex flex-col justify-between">
        <div className="my-auto max-w-md md:max-w-xl">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-ink-strong leading-[1.15] md:leading-[1.1] tracking-tight">
            {slide.headlineMain}{' '}
            <br />
            <span className="font-serif italic font-normal text-accent-ink">
              {slide.headlineAccent}
            </span>
          </h1>

          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-ink-muted leading-relaxed max-w-sm md:max-w-md">
            {slide.description}
          </p>

          <div className="mt-5 sm:mt-7 flex flex-wrap items-center gap-2.5 sm:gap-3.5">
            <button
              type="button"
              onClick={onOpenSearch}
              className="rounded-full bg-primary hover:bg-primary-strong text-cream font-semibold text-xs sm:text-sm px-6 py-3 sm:px-7 sm:py-3.5 transition-all shadow-sm active:scale-[0.98]"
            >
              Buscar e Filtrar
            </button>

            <a
              href="#categorias"
              className="inline-flex items-center justify-center rounded-full bg-surface/85 hover:bg-linen text-ink-strong border border-hairline font-semibold text-xs sm:text-sm px-5 py-3 sm:px-7 sm:py-3.5 transition-all shadow-xs backdrop-blur-xs active:scale-[0.98]"
            >
              Ver Departamentos
            </a>
          </div>
        </div>

        {/* Desktop bottom pill-dot indicator + active collection label */}
        <div className="hidden md:flex items-center gap-6 pt-12">
          <div
            role="tablist"
            aria-label="Selecionar ambiente em destaque"
            className="flex items-center gap-1"
          >
            {HERO_SLIDES.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Ver destaque ${item.label}`}
                  onClick={() => setActiveIndex(idx)}
                  className="py-2 px-1 flex items-center"
                >
                  <span
                    className={`block h-2 rounded-full transition-all duration-300 ${
                      isActive ? 'w-7 bg-primary' : 'w-2 bg-ink-muted/35 hover:bg-ink-muted/60'
                    }`}
                  />
                </button>
              );
            })}
          </div>
          <span className="text-xs font-medium text-ink-muted tracking-wider uppercase">
            {slide.collectionTag}
          </span>
        </div>
      </div>

      {/* Mobile full-bleed edge-to-edge showcase strip + centered dot indicator */}
      <div className="mt-6 pb-7 md:hidden">
        <div className="relative w-full h-64 sm:h-80 overflow-hidden bg-linen">
          {HERO_SLIDES.map((item, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <img
                key={item.id}
                src={item.image}
                alt={isCurrent ? item.imageAlt : ''}
                aria-hidden={!isCurrent}
                loading="eager"
                decoding="async"
                className={`absolute inset-0 w-full h-full object-cover ${item.imagePosition} transition-opacity duration-700 ease-out ${
                  isCurrent ? 'opacity-100' : 'opacity-0'
                }`}
              />
            );
          })}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink-strong/20 via-transparent to-transparent pointer-events-none"
          />
        </div>

        <div
          role="tablist"
          aria-label="Selecionar destaque visual"
          className="mt-3.5 flex items-center justify-center gap-1"
        >
          {HERO_SLIDES.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Ver destaque ${item.label}`}
                onClick={() => setActiveIndex(idx)}
                className="py-1.5 px-1 flex items-center"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    isActive ? 'w-6 bg-primary' : 'w-1.5 bg-ink-muted/35'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
