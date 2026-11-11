import { IconHeart, IconPlus } from './Icons';

export default function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onOpenDetail,
}) {
  const subtitle =
    [product.material, product.dimensions].filter(Boolean).join(' · ') || product.details;

  return (
    <article className="group bg-surface rounded-2xl border border-hairline overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
      <div className="relative aspect-square bg-white border-b border-hairline/60 p-2 overflow-hidden">
        <button
          type="button"
          onClick={() => onOpenDetail(product)}
          aria-label={`Ver detalhes de ${product.name}`}
          className="block w-full h-full text-left"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </button>

        <button
          type="button"
          onClick={() => onToggleWishlist(product.id)}
          aria-pressed={isWishlisted}
          aria-label={isWishlisted ? `Remover ${product.name} dos favoritos` : `Salvar ${product.name} nos favoritos`}
          className={`absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-9 h-9 rounded-full flex items-center justify-center border transition-colors shadow-2xs ${
            isWishlisted
              ? 'bg-primary text-cream border-primary'
              : 'bg-surface/95 text-ink hover:text-primary border-hairline/80'
          }`}
        >
          <IconHeart className="w-4 h-4" filled={isWishlisted} />
        </button>
      </div>

      <div className="p-3.5 sm:p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-2 text-xs font-medium text-ink-muted tabular-nums">
          <span className="truncate">{product.category}</span>
          <span className="shrink-0 text-accent-ink">{product.sku}</span>
        </div>

        <h3 className="mt-1.5 font-serif text-sm sm:text-lg font-medium text-ink-strong leading-snug line-clamp-2">
          <button
            type="button"
            onClick={() => onOpenDetail(product)}
            className="text-left hover:text-primary transition-colors"
          >
            {product.name}
          </button>
        </h3>

        <p className="mt-1 text-xs text-ink-muted line-clamp-2">{subtitle}</p>

        <div className="mt-auto pt-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t border-hairline/80">
          <button
            type="button"
            onClick={() => onOpenDetail(product)}
            className="text-xs font-medium text-primary hover:text-primary-strong underline underline-offset-4 text-left"
          >
            Ver detalhes
          </button>

          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-accent hover:bg-accent-hover text-ink-strong font-semibold text-xs px-3.5 py-2 shrink-0 w-full sm:w-auto transition-colors"
          >
            <IconPlus className="w-3.5 h-3.5" />
            <span>Orçar</span>
          </button>
        </div>
      </div>
    </article>
  );
}
