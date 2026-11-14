import { useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { IconClose } from '../Icons';

type Rect = { left: number; top: number; width: number; height: number };

type ImageLightboxProps = {
  src: string;
  alt: string;
  /** Área ocupada pela miniatura: a imagem nasce de dentro dela. */
  origin: Rect;
  onClose: () => void;
};

const TOOLBAR = 56;

// Zoom é do próprio dispositivo (pinça / ctrl+scroll do navegador): aqui só a saída.
export default function ImageLightbox({ src, alt, origin, onClose }: ImageLightboxProps) {
  const target = useMemo(() => {
    const ratio = origin.width / origin.height || 1;
    const maxHeight = window.innerHeight - TOOLBAR - 56;
    const maxWidth = window.innerWidth - 64;
    let height = maxHeight;
    let width = height * ratio;
    if (width > maxWidth) {
      width = maxWidth;
      height = width / ratio;
    }
    return {
      left: (window.innerWidth - width) / 2,
      top: TOOLBAR + (window.innerHeight - TOOLBAR - height) / 2,
      width,
      height,
    };
  }, [origin]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const from = {
    x: origin.left,
    y: origin.top,
    scaleX: origin.width / target.width,
    scaleY: origin.height / target.height,
    opacity: 0.5,
  };

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col bg-ink-strong/92 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      role="dialog"
      aria-modal="true"
      aria-label={`Imagem ampliada: ${alt}`}
      onClick={onClose}
    >
      <div
        className="flex items-center justify-end gap-3 p-3 sm:p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button
          type="button"
          onClick={onClose}
          aria-label="Fechar imagem ampliada"
          className="w-10 h-10 rounded-full bg-cream/90 pointer-fine:hover:bg-cream text-ink-strong flex items-center justify-center transition-colors"
          whileTap={{ scale: 0.9 }}
        >
          <IconClose className="w-5 h-5" />
        </motion.button>
      </div>

      <motion.img
        src={src}
        alt={alt}
        className="fixed object-contain select-none"
        style={{
          left: 0,
          top: 0,
          width: target.width,
          height: target.height,
          transformOrigin: 'top left',
        }}
        initial={from}
        animate={{ x: target.left, y: target.top, scaleX: 1, scaleY: 1, opacity: 1 }}
        exit={from}
        transition={{ type: 'spring', stiffness: 190, damping: 26, mass: 0.9 }}
      />
    </motion.div>
  );
}
