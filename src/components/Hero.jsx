import { useEffect, useRef, useState } from 'react';
import { HERO_SLIDES } from '../data/catalog';
import { IconChevronLeft, IconChevronRight } from './Icons';
import RealismButton from './ui/shiny-borders-button';

const INTERVAL_MS = 6000;
const SWIPE_THRESHOLD = 45;
const DRAG_LOCK_THRESHOLD = 8;
const WHEEL_THRESHOLD = 28;
const WHEEL_COOLDOWN_MS = 520;

// Posição dos botões (% da arte) alinhada ao espaço vazio de cada banner.
const CTAS = {
  slide1: { label: 'Explorar Coleção', category: 'Banho', tone: 'primary', m: ['50%', '87.5%'], d: ['66%', '16%'] },
  slide2: { label: 'Ver Utilidades', category: 'Eletro & Utilidades', tone: 'primary', m: ['50%', '87.5%'], d: ['5.4%', '58%'] },
  slide3: { label: 'Ver Mesa Posta', category: 'Mesa', tone: 'cream', m: ['50%', '79%'], d: ['56%', '60%'] },
};

export default function Hero({ onSelectCategory }) {
  const [index, setIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const gestureRef = useRef({ active: false, startX: 0, startY: 0, axis: null });
  const dragXRef = useRef(0);
  const swipedRef = useRef(false);
  const wheelRef = useRef({ acc: 0, lockedUntil: 0 });

  // No mobile cada arte é um vídeo 9:16; no desktop é a imagem 16:9.
  const videoRefs = useRef([]);
  const [isMobile, setIsMobile] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const count = HERO_SLIDES.length;

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      setIsMobile(mobileQuery.matches);
      setReduceMotion(motionQuery.matches);
    };
    sync();
    mobileQuery.addEventListener('change', sync);
    motionQuery.addEventListener('change', sync);
    return () => {
      mobileQuery.removeEventListener('change', sync);
      motionQuery.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    if (isDragging || reduceMotion) return undefined;
    const id = setTimeout(() => {
      setIndex((i) => (i + 1) % count);
    }, INTERVAL_MS);
    return () => clearTimeout(id);
  }, [index, isDragging, count, reduceMotion]);

  // Só o banner visível toca; os outros ficam pausados.
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (idx === index && !reduceMotion) {
        video.play()?.catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [index, reduceMotion, isMobile]);

  const goTo = (category) => {
    onSelectCategory(category);
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const step = (delta) => {
    setIndex((i) => (i + delta + count) % count);
  };

  const handleWheel = (e) => {
    // Rolagem vertical continua sendo da página; só o eixo horizontal troca de slide.
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    const now = Date.now();
    if (now < wheelRef.current.lockedUntil) return;

    wheelRef.current.acc += e.deltaX;
    if (Math.abs(wheelRef.current.acc) < WHEEL_THRESHOLD) return;

    const dir = wheelRef.current.acc > 0 ? 1 : -1;
    wheelRef.current.acc = 0;
    wheelRef.current.lockedUntil = now + WHEEL_COOLDOWN_MS;
    step(dir);
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
      if (finalDx <= -SWIPE_THRESHOLD) step(1);
      else if (finalDx >= SWIPE_THRESHOLD) step(-1);
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

  // Deslocamento circular: -1 é o slide anterior, 0 o atual, 1 o próximo.
  const offsetOf = (idx) => {
    let offset = idx - index;
    if (offset > count / 2) offset -= count;
    if (offset < -count / 2) offset += count;
    return offset;
  };

  const arrowClass =
    'absolute top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-cream/90 text-primary-strong backdrop-blur-sm shadow-[0_8px_20px_-8px_rgba(3,45,54,0.55)] transition-[background-color,transform,box-shadow] duration-200 hover:bg-cream hover:shadow-[0_12px_26px_-10px_rgba(3,45,54,0.5)] active:scale-95 cursor-pointer';

  return (
    <section
      id="inicio"
      aria-label="Destaques principais"
      onKeyDown={handleKeyDown}
      className="relative w-full overflow-hidden bg-cream"
    >
      <div
        onWheel={handleWheel}
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
        className="relative w-full h-[100svh] md:h-auto md:aspect-[1024/571] [container-type:inline-size] touch-pan-y select-none cursor-grab active:cursor-grabbing"
      >
        {HERO_SLIDES.map((item, idx) => {
          const isCurrent = idx === index;
          const offset = offsetOf(idx);
          const cta = CTAS[item.id];

          const transform = `translateX(calc(${offset * 100}% + ${dragX}px))`;
          const transitionClass = isDragging
            ? 'transition-none'
            : 'transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]';

          return (
            <div
              key={item.id}
              aria-hidden={!isCurrent}
              style={{ transform }}
              className={`absolute inset-0 ${transitionClass} ${
                isCurrent ? 'z-20' : 'z-10 pointer-events-none'
              }`}
            >
              {isMobile ? (
                <video
                  ref={(el) => {
                    videoRefs.current[idx] = el;
                  }}
                  src={item.mobile}
                  poster={item.poster}
                  muted
                  loop
                  playsInline
                  autoPlay={!reduceMotion}
                  preload={idx === 0 ? 'auto' : 'metadata'}
                  aria-hidden="true"
                  tabIndex={-1}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
              ) : (
                /* Os slides laterais começam fora da viewport, então lazy nunca carregaria a arte. */
                <img
                  src={item.desktop}
                  alt={isCurrent ? item.alt : ''}
                  loading="eager"
                  decoding="async"
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              <div
                style={{ '--ml': cta.m[0], '--mt': cta.m[1], '--dl': cta.d[0], '--dt': cta.d[1] }}
                className="absolute left-[var(--ml)] top-[var(--mt)] max-md:-translate-x-1/2 md:left-[var(--dl)] md:top-[var(--dt)]"
              >
                <RealismButton
                  tone={cta.tone}
                  text={cta.label}
                  onClick={() => goTo(cta.category)}
                  tabIndex={isCurrent ? 0 : -1}
                  className="font-serif [--shiny-btn-size:1.15rem] md:[--shiny-btn-size:1rem]"
                />
              </div>
            </div>
          );
        })}

        <button
          type="button"
          aria-label="Destaque anterior"
          onClick={() => step(-1)}
          className={`${arrowClass} left-2 sm:left-4`}
        >
          <IconChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
        <button
          type="button"
          aria-label="Próximo destaque"
          onClick={() => step(1)}
          className={`${arrowClass} right-2 sm:right-4`}
        >
          <IconChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>
    </section>
  );
}
