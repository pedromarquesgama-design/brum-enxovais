import { useEffect, useState } from 'react';
import { buildWhatsAppUrl } from '../data/catalog';
import { IconBag, IconClose, IconHeart, IconMinus, IconPlus, IconWhatsApp } from './Icons';

export default function ProductModal({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
}) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const whatsappMessage = `Olá, Brum Enxovais! Gostaria de solicitar orçamento e disponibilidade para:\n• ${product.name} (${product.sku})\n• Departamento: ${product.category}\n• Quantidade: ${quantity}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-ink-strong/60 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        className="w-full max-w-4xl bg-surface rounded-3xl border border-hairline shadow-2xl overflow-hidden max-h-[92vh] flex flex-col md:flex-row"
      >
        {/* Full uncropped product photography */}
        <div className="md:w-1/2 bg-white border-b md:border-b-0 md:border-r border-hairline p-4 flex items-center justify-center shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-h-72 sm:max-h-96 md:max-h-[460px] object-contain"
          />
        </div>

        {/* Product details & quote actions */}
        <div className="md:w-1/2 p-5 sm:p-7 overflow-y-auto flex flex-col">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-accent-ink tabular-nums">
                {product.category} · {product.sku}
              </p>
              <h2
                id="product-modal-title"
                className="mt-1 font-serif text-xl sm:text-2xl font-medium text-ink-strong leading-snug"
              >
                {product.name}
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar detalhes do produto"
              className="w-9 h-9 rounded-full bg-linen hover:bg-hairline text-ink flex items-center justify-center shrink-0 transition-colors"
            >
              <IconClose className="w-4 h-4" />
            </button>
          </div>

          <p className="mt-4 text-sm text-ink-muted leading-relaxed">
            {product.details}
          </p>

          {(product.material || product.dimensions) && (
            <dl className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-2xl bg-cream p-3.5 text-xs">
              {product.material && (
                <div>
                  <dt className="text-ink-muted">Material / Composição</dt>
                  <dd className="mt-0.5 font-semibold text-ink-strong">{product.material}</dd>
                </div>
              )}
              {product.dimensions && (
                <div>
                  <dt className="text-ink-muted">Medidas / Capacidade</dt>
                  <dd className="mt-0.5 font-semibold text-ink-strong">{product.dimensions}</dd>
                </div>
              )}
            </dl>
          )}

          <div className="mt-5 rounded-2xl bg-primary-soft/70 border border-primary/15 px-4 py-3 text-xs text-primary">
            Valores e prazos sob consulta direta com nossa equipe de atendimento.
          </div>

          <div className="mt-auto pt-6 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="inline-flex items-center rounded-full border border-hairline bg-cream p-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Diminuir quantidade"
                  className="w-8 h-8 rounded-full hover:bg-surface flex items-center justify-center text-ink"
                >
                  <IconMinus className="w-3.5 h-3.5" />
                </button>
                <span className="w-7 text-center text-sm font-semibold tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Aumentar quantidade"
                  className="w-8 h-8 rounded-full hover:bg-surface flex items-center justify-center text-ink"
                >
                  <IconPlus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  onAddToCart(product, quantity);
                  onClose();
                }}
                className="flex-1 rounded-full bg-accent hover:bg-accent-hover text-ink-strong font-semibold text-sm py-3 px-4 inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors"
              >
                <IconBag className="w-4 h-4 shrink-0" />
                <span>Adicionar à Lista</span>
              </button>

              <button
                type="button"
                onClick={() => onToggleWishlist(product.id)}
                aria-pressed={isWishlisted}
                aria-label={isWishlisted ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
                className={`w-11 h-11 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                  isWishlisted
                    ? 'bg-primary text-cream border-primary'
                    : 'bg-surface border-hairline text-ink hover:border-primary'
                }`}
              >
                <IconHeart className="w-4 h-4" filled={isWishlisted} />
              </button>
            </div>

            <a
              href={buildWhatsAppUrl(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine w-full rounded-full bg-primary hover:bg-primary-strong text-cream font-medium text-sm py-3 px-5 inline-flex items-center justify-center gap-2 transition-colors"
            >
              <IconWhatsApp className="w-4 h-4" />
              <span>Consultar no WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
