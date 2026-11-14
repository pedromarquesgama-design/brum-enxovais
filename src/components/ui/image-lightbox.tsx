import { useEffect, useState } from 'react';
import { IconClose } from '../Icons';
import RealismButton from './shiny-borders-button';

const ZOOM_STEPS = [1, 1.5, 2, 3];

type ImageLightboxProps = {
  src: string;
  alt: string;
  onClose: () => void;
};

export default function ImageLightbox({ src, alt, onClose }: ImageLightboxProps) {
  const [step, setStep] = useState(0);

  const zoom = ZOOM_STEPS[step];
  const zoomIn = () => setStep((s) => Math.min(s + 1, ZOOM_STEPS.length - 1));
  const zoomOut = () => setStep((s) => Math.max(s - 1, 0));
  const reset = () => setStep(0);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === '+' || e.key === '=') setStep((s) => Math.min(s + 1, ZOOM_STEPS.length - 1));
      if (e.key === '-') setStep((s) => Math.max(s - 1, 0));
      if (e.key === '0') setStep(0);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col bg-ink-strong/92 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Imagem ampliada: ${alt}`}
      onClick={onClose}
    >
      <div
        className="flex items-center justify-between gap-3 p-3 sm:p-4 text-cream"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-xs tabular-nums opacity-80">
          {Math.round(zoom * 100)}% · duplo clique para resetar
        </span>

        <div className="flex items-center gap-2">
          <RealismButton
            tone="surface"
            text="−"
            onClick={zoomOut}
            aria-label="Reduzir zoom"
            className="[--shiny-btn-size:0.9rem]"
          />
          <RealismButton
            tone="surface"
            text={`${Math.round(zoom * 100)}%`}
            onClick={reset}
            aria-label="Resetar zoom"
            className="[--shiny-btn-size:0.9rem]"
          />
          <RealismButton
            tone="surface"
            text="+"
            onClick={zoomIn}
            aria-label="Aumentar zoom"
            className="[--shiny-btn-size:0.9rem]"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar imagem ampliada"
            className="w-10 h-10 rounded-full bg-cream/90 hover:bg-cream text-ink-strong flex items-center justify-center transition-colors"
          >
            <IconClose className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        className="flex-1 overflow-auto px-4 sm:px-8 pb-8 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          onDoubleClick={reset}
          style={{ height: `calc((100vh - 6rem) * ${zoom})` }}
          className="w-auto max-w-none object-contain select-none"
        />
      </div>
    </div>
  );
}
