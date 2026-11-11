import { useEffect, useState } from 'react';
import { HERO_SLIDES } from '../data/catalog';

const INTERVAL_MS = 6000;

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => setActiveIndex((i) => (i + 1) % HERO_SLIDES.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="inicio" aria-label="Destaques principais" className="relative w-full overflow-hidden bg-cream">
      <div className="relative w-full aspect-[9/16] max-h-[85svh] md:aspect-[1024/571] md:max-h-none">
        {HERO_SLIDES.map((item, idx) => {
          const isCurrent = idx === activeIndex;
          return (
            <picture key={item.id} aria-hidden={!isCurrent}>
              <source media="(min-width: 768px)" srcSet={item.desktop} />
              <img
                src={item.mobile}
                alt={isCurrent ? item.alt : ''}
                loading={idx === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
                  isCurrent ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </picture>
          );
        })}

        <div role="tablist" aria-label="Selecionar destaque" className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1">
          {HERO_SLIDES.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Ver destaque ${idx + 1}`}
                onClick={() => setActiveIndex(idx)}
                className="py-2 px-1 flex items-center"
              >
                <span className={`block h-2 rounded-full transition-all duration-300 ${isActive ? 'w-7 bg-primary' : 'w-2 bg-ink-muted/40'}`} />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
