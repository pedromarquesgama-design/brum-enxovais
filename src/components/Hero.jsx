import { useEffect, useRef, useState } from 'react';
import { HERO_SLIDES } from '../data/catalog';

const INTERVAL_MS = 6000;
const SWIPE_THRESHOLD = 45;
const DRAG_LOCK_THRESHOLD = 8;

// Posição dos botões (% da imagem) alinhada ao espaço vazio de cada arte.
const CTAS = {
  slide1: { label: 'Ver Banho', category: 'Banho', tone: 'dark', m: ['9.5%', '32%'], d: ['81%', '60.4%'] },
  slide2: { label: 'Ver Utilidades', category: 'Eletro & Utilidades', tone: 'dark', m: ['8.6%', '25.9%'], d: ['5.4%', '59.4%'] },
  slide3: { label: 'Ver Mesa Posta', category: 'Mesa', tone: 'dark', m: ['7.7%', '25.5%'], d: ['74%', '61.5%'] },
  slide4: { label: 'Ver Coleção Cama', category: 'Cama', tone: 'gold', m: ['7%', '29.9%'], d: ['5.4%', '63.9%'] },
};

const TONES = {
  dark: 'bg-primary-deep text-cream hover:bg-primary-strong',
  gold: 'bg-[#dca74f] text-primary-strong hover:bg-[#cf983f]',
};

export default function Hero({ onSelectCategory }) {
  const [slide, setSlide] = useState({ index: 0, from: null, dir: 0 });
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const gestureRef = useRef({ active: false, startX: 0, startY: 0, axis: null });
  const dragXRef = useRef(0);
  const swipedRef = useRef(false);

  const count = HERO_SLIDES.length;
  const activeIndex = slide.index;
  const nextIndex = (activeIndex + 1) % count;
  const prevIndex = (activeIndex - 1 + count) % count;

  useEffect(() => {
    if (isDragging || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setTimeout(() => {
      setSlide((s) => ({ index: (s.index + 1) % count, from: null, dir: 0 }));
    }, INTERVAL_MS);
    return () => clearTimeout(id);
  }, [activeIndex, isDragging, count]);

  useEffect(() => {
    if (slide.from === null) return undefined;
    const id = setTimeout(() => {
      setSlide((s) => (s.from !== null ? { ...s, from: null, dir: 0 } : s));
    }, 320);
    return () => clearTimeout(id);
  }, [slide.from]);

  const goTo = (category) => {
    onSelectCategory(category);
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const step = (delta, withSlide = false) => {
    setSlide((s) => ({
      index: (s.index + delta + count) % count,
      from: withSlide ? s.index : null,
      dir: withSlide ? delta : 0,
    }));
  };

  const beginGesture = (x, y) => {
    gestureRef.current = { active: true, startX: x, startY: y, axis: null };
    dragXRef.current = 0;
  };

  const moveGesture = (x, y) => {
    const g = gestureRef.current;
    if (!g.active) return;

    const dx = x - g.startX;
    const dy = y - g.startY;

    if (!g.axis) {
      if (Math.abs(dx) < DRAG_LOCK_THRESHOLD && Math.abs(dy) < DRAG_LOCK_THRESHOLD) return;
      if (Math.abs(dy) >= Math.abs(dx)) {
        g.axis = 'y';
        g.active = false;
        return;
      }
      g.axis = 'x';
      swipedRef.current = true;
      setIsDragging(true);
    }

    if (g.axis === 'x') {
      dragXRef.current = dx;
      setDragX(dx);
    }
  };

  const endGesture = () => {
    const g = gestureRef.current;
    if (!g.active) return;
    g.active = false;

    const finalDx = dragXRef.current;
    dragXRef.current = 0;
    setIsDragging(false);
    setDragX(0);

    if (g.axis === 'x') {
      if (finalDx <= -SWIPE_THRESHOLD) step(1, true);
      else if (finalDx >= SWIPE_THRESHOLD) step(-1, true);
      setTimeout(() => {
        swipedRef.current = false;
      }, 60);
    }
  };

  const handleClickCapture = (e) => {
    if (swipedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'ArrowLeft') step(-1);
  };

  return (
    <section
      id="inicio"
      aria-label="Destaques principais"
      onKeyDown={handleKeyDown}
      className="relative w-full overflow-hidden bg-cream"
    >
      <div
        onTouchStart={(e) => e.touches[0] && beginGesture(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchMove={(e) => e.touches[0] && moveGesture(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchEnd={endGesture}
        onTouchCancel={endGesture}
        onMouseDown={(e) => {
          if (e.button === 0) beginGesture(e.clientX, e.clientY);
        }}
        onMouseMove={(e) => moveGesture(e.clientX, e.clientY)}
        onMouseUp={endGesture}
        onMouseLeave={endGesture}
        onClickCapture={handleClickCapture}
        className="relative w-full aspect-[571/1024] md:aspect-[1024/571] [container-type:inline-size] touch-pan-y select-none cursor-grab active:cursor-grabbing"
      >
        {HERO_SLIDES.map((item, idx) => {
          const isCurrent = idx === activeIndex;
          const isLeaving = idx === slide.from;
          const isNextPeek = isDragging && dragX < 0 && idx === nextIndex;
          const isPrevPeek = isDragging && dragX > 0 && idx === prevIndex;
          const cta = CTAS[item.id];

          let transform = 'translateX(0px)';
          if (isDragging) {
            if (isCurrent) transform = `translateX(${dragX}px)`;
            else if (isNextPeek) transform = `translateX(calc(100% + ${dragX}px))`;
            else if (isPrevPeek) transform = `translateX(calc(-100% + ${dragX}px))`;
          } else if (isLeaving && slide.dir !== 0) {
            transform = `translateX(${-slide.dir * 100}%)`;
          }

          const transitionClass = isDragging
            ? 'transition-none'
            : slide.from !== null
              ? 'transition-transform duration-300 ease-out'
              : 'transition-opacity duration-700 ease-out';

          return (
            <div
              key={item.id}
              aria-hidden={!isCurrent}
              style={{ transform }}
              className={`absolute inset-0 ${transitionClass} ${
                isCurrent
                  ? 'z-20 opacity-100'
                  : isNextPeek || isPrevPeek
                    ? 'z-20 opacity-100 pointer-events-none'
                    : isLeaving
                      ? 'z-10 opacity-100 pointer-events-none'
                      : 'z-0 opacity-0 pointer-events-none'
              }`}
            >
              <picture>
                <source media="(min-width: 768px)" srcSet={item.desktop} />
                <img
                  src={item.mobile}
                  alt={isCurrent ? item.alt : ''}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </picture>
              <button
                type="button"
                tabIndex={isCurrent ? 0 : -1}
                onClick={() => goTo(cta.category)}
                style={{ '--ml': cta.m[0], '--mt': cta.m[1], '--dl': cta.d[0], '--dt': cta.d[1] }}
                className={`absolute left-[var(--ml)] top-[var(--mt)] md:left-[var(--dl)] md:top-[var(--dt)] inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium shadow-sm transition-colors cursor-pointer active:scale-[0.98] h-[12.6cqw] px-[6cqw] text-[4.8cqw] md:h-[max(40px,4.2cqw)] md:px-[2.6cqw] md:text-[max(14px,1.5cqw)] ${TONES[cta.tone]}`}
              >
                {cta.label}
              </button>
            </div>
          );
        })}

        <div
          role="tablist"
          aria-label="Selecionar destaque"
          className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-1 rounded-full bg-cream/80 backdrop-blur-xs px-2.5 shadow-xs"
        >
          {HERO_SLIDES.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Ver destaque ${idx + 1}`}
                onClick={() => setSlide({ index: idx, from: null, dir: 0 })}
                className="py-2 px-1 flex items-center cursor-pointer"
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
