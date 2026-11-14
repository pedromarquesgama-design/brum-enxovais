import { useEffect } from 'react';
import { IconClose, IconHeart, IconPlus, IconTrash } from './Icons';
import RealismButton from './ui/shiny-borders-button';

export default function WishlistDrawer({
  isOpen,
  onClose,
  products,
  onRemoveWishlist,
  onMoveToCart,
  onOpenDetail,
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
        aria-labelledby="wishlist-drawer-title"
        className="w-full max-w-md bg-surface h-full flex flex-col border-l border-hairline shadow-2xl"
      >
        <div className="px-5 py-4 border-b border-hairline flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <IconHeart className="w-5 h-5 text-primary" filled />
            <h2 id="wishlist-drawer-title" className="font-serif text-xl font-medium text-ink-strong">
              Peças Favoritas
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar favoritos"
            className="w-9 h-9 rounded-full bg-linen pointer-fine:hover:bg-hairline text-ink flex items-center justify-center transition-colors"
          >
            <IconClose className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {products.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-14 h-14 rounded-full bg-linen flex items-center justify-center text-primary">
                <IconHeart className="w-6 h-6" />
              </div>
              <h3 className="mt-4 font-serif text-lg font-medium text-ink-strong">
                Sua lista de favoritos está vazia
              </h3>
              <p className="mt-1.5 text-sm text-ink-muted max-w-xs">
                Toque no ícone de coração em qualquer peça do catálogo para salvar e consultar depois.
              </p>
              <RealismButton
                href="#catalogo"
                onClick={onClose}
                text="Explorar Catálogo"
                className="mt-5 font-serif [--shiny-btn-size:1.05rem]"
              />
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="flex gap-3.5 rounded-2xl bg-cream p-3 border border-hairline/80"
              >
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenDetail(product);
                  }}
                  className="shrink-0"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 rounded-xl object-contain bg-white border border-hairline/60 p-1"
                  />
                </button>

                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenDetail(product);
                      }}
                      className="text-left text-sm font-medium text-ink-strong pointer-fine:hover:text-primary leading-snug line-clamp-2"
                    >
                      {product.name}
                    </button>

                    <button
                      type="button"
                      onClick={() => onRemoveWishlist(product.id)}
                      aria-label={`Remover ${product.name} dos favoritos`}
                      className="text-ink-muted pointer-fine:hover:text-ink-strong p-1 shrink-0"
                    >
                      <IconTrash className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="mt-0.5 text-xs text-ink-muted tabular-nums">
                    {product.sku} · {product.category}
                  </p>

                  <div className="mt-auto pt-2.5">
                    <RealismButton
                      text={
                        <>
                          <IconPlus className="w-3.5 h-3.5 inline-block align-middle" /> Adicionar ao Orçamento
                        </>
                      }
                      onClick={() => onMoveToCart(product)}
                      className="[--shiny-btn-size:0.8rem]"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>
    </div>
  );
}
