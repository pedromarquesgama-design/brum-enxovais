import { useEffect } from 'react';
import { IconClose } from '../Icons';

type ImageLightboxProps = {
  src: string;
  alt: string;
  onClose: () => void;
};

// Zoom é do próprio dispositivo (pinça / ctrl+scroll do navegador): aqui só a saída.
export default function ImageLightbox({ src, alt, onClose }: ImageLightboxProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
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
        className="flex items-center justify-end gap-3 p-3 sm:p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar imagem ampliada"
          className="w-10 h-10 rounded-full bg-cream/90 hover:bg-cream text-ink-strong flex items-center justify-center transition-colors"
        >
          <IconClose className="w-5 h-5" />
        </button>
      </div>

      <div
        className="flex-1 overflow-auto px-4 sm:px-8 pb-8 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          style={{ height: 'calc(100vh - 7rem)' }}
          className="w-auto max-w-none object-contain select-none"
        />
      </div>
    </div>
  );
}
