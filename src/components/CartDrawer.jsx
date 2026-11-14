import { useEffect } from 'react';
import { buildWhatsAppUrl } from '../data/catalog';
import { IconBag, IconClose, IconMinus, IconPlus, IconTrash } from './Icons';
import RealismButton from './ui/shiny-borders-button';

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totalUnits = items.reduce((sum, item) => sum + item.qty, 0);

  const summaryLines = items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.product.name} (${item.product.sku}) — ${item.qty} un.`
    )
    .join('\n');

  const whatsappHref = buildWhatsAppUrl(
    `Olá, Brum Enxovais! Gostaria de solicitar disponibilidade e orçamento para os itens abaixo:\n\n${summaryLines}`
  );

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-ink-strong/55 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className="w-full max-w-md bg-surface h-full flex flex-col border-l border-hairline shadow-2xl"
      >
        <div className="px-5 py-4 border-b border-hairline flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <IconBag className="w-5 h-5 text-primary" />
            <h2 id="cart-drawer-title" className="font-serif text-xl font-medium text-ink-strong">
              Lista de Orçamento
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar lista de orçamento"
            className="w-9 h-9 rounded-full bg-linen pointer-fine:hover:bg-hairline text-ink flex items-center justify-center transition-colors"
          >
            <IconClose className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-14 h-14 rounded-full bg-linen flex items-center justify-center text-primary">
                <IconBag className="w-6 h-6" />
              </div>
              <h3 className="mt-4 font-serif text-lg font-medium text-ink-strong">
                Sua lista de orçamento está vazia
              </h3>
              <p className="mt-1.5 text-sm text-ink-muted max-w-xs">
                Selecione os produtos desejados no catálogo para consultar disponibilidade e valores diretamente pelo WhatsApp.
              </p>
              <RealismButton
                href="#catalogo"
                onClick={onClose}
                text="Explorar Catálogo"
                className="mt-5 font-serif [--shiny-btn-size:1.05rem]"
              />
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3.5 rounded-2xl bg-cream p-3 border border-hairline/80"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 rounded-xl object-contain bg-white border border-hairline/60 p-1 shrink-0"
                />

                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-medium text-ink-strong leading-snug line-clamp-2">
                      {item.product.name}
                    </h3>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.product.id)}
                      aria-label={`Remover ${item.product.name}`}
                      className="text-ink-muted pointer-fine:hover:text-ink-strong p-1"
                    >
                      <IconTrash className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="mt-0.5 text-xs text-ink-muted truncate tabular-nums">
                    {item.product.sku} · {item.product.category}
                  </p>

                  <div className="mt-auto pt-2 flex items-center justify-between gap-2">
                    <div className="inline-flex items-center rounded-full bg-surface border border-hairline p-0.5">
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.product.id, item.qty - 1)}
                        aria-label="Diminuir quantidade"
                        className="w-7 h-7 rounded-full pointer-fine:hover:bg-linen flex items-center justify-center text-ink"
                      >
                        <IconMinus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-semibold tabular-nums">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.product.id, item.qty + 1)}
                        aria-label="Aumentar quantidade"
                        className="w-7 h-7 rounded-full pointer-fine:hover:bg-linen flex items-center justify-center text-ink"
                      >
                        <IconPlus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-medium text-accent-ink tabular-nums">
                      {item.qty} {item.qty === 1 ? 'unidade' : 'unidades'}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-5 border-t border-hairline bg-cream space-y-3.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-muted">Total selecionado</span>
              <span className="font-serif text-lg font-semibold text-ink-strong tabular-nums">
                {items.length} {items.length === 1 ? 'produto' : 'produtos'} ({totalUnits} un.)
              </span>
            </div>

            <RealismButton
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              text="Solicitar Orçamento no WhatsApp"
              className="w-full font-serif [--shiny-btn-size:1rem]"
            />

            <button
              type="button"
              onClick={onClearCart}
              className="w-full text-xs font-medium text-ink-muted pointer-fine:hover:text-ink-strong underline underline-offset-4 py-1"
            >
              Limpar lista
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
