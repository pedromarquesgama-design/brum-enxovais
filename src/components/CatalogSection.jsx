import { CATEGORIES, CATEGORY_COUNTS } from '../data/catalog';
import { IconClose, IconSearch, IconSliders } from './Icons';
import ProductCard from './ProductCard';

const CATEGORY_TABS = ['Todos', ...CATEGORIES.map((c) => c.id)];

export default function CatalogSection({
  products,
  totalCatalogCount,
  visibleCount,
  onShowMore,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onOpenFilterSheet,
  onResetFilters,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onOpenDetail,
  activeFilterCount,
}) {
  const displayedProducts = products.slice(0, visibleCount);
  const progressPct =
    products.length === 0 ? 0 : Math.min(100, Math.round((displayedProducts.length / products.length) * 100));

  return (
    <section
      id="catalogo"
      aria-labelledby="catalogo-heading"
      className="py-12 sm:py-16 lg:py-20 bg-linen/55 border-y border-hairline"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-7 sm:mb-9">
          <div>
            <h2
              id="catalogo-heading"
              className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-ink-strong"
            >
              Catálogo Completo
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-ink-muted">
              Todos os itens classificados por departamento para montagem de orçamento sem compromisso.
            </p>
          </div>

          <p className="text-xs sm:text-sm font-medium text-ink-muted tabular-nums">
            {products.length === totalCatalogCount
              ? `${totalCatalogCount.toLocaleString('pt-BR')} produtos catalogados`
              : `${products.length.toLocaleString('pt-BR')} de ${totalCatalogCount.toLocaleString('pt-BR')} itens encontrados`}
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-ink-muted">
              <IconSearch className="w-4 h-4" />
            </span>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar por nome, código COD., material..."
              aria-label="Buscar produtos no catálogo"
              className="w-full rounded-full bg-surface border border-hairline pl-10 pr-10 py-2.5 text-sm text-ink-strong placeholder:text-ink-muted/75 focus:border-primary focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Limpar busca"
                className="absolute inset-y-0 right-2.5 flex items-center px-1.5 text-ink-muted hover:text-ink-strong"
              >
                <IconClose className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onOpenFilterSheet}
              className="inline-flex items-center gap-2 rounded-full bg-surface border border-hairline hover:border-primary/60 text-ink-strong text-xs sm:text-sm font-medium px-4 py-2.5 transition-colors shrink-0"
            >
              <IconSliders className="w-4 h-4 text-primary" />
              <span>Busca e Filtros</span>
              {activeFilterCount > 0 && (
                <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-accent text-ink-strong text-xs font-bold flex items-center justify-center tabular-nums">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {(activeFilterCount > 0 || searchQuery) && (
              <button
                type="button"
                onClick={onResetFilters}
                className="text-xs sm:text-sm font-medium text-accent-ink hover:text-primary underline underline-offset-4 px-1"
              >
                Limpar filtros
              </button>
            )}
          </div>
        </div>

        {/* Category Pills with Live Counts */}
        <div
          role="tablist"
          aria-label="Filtrar catálogo por departamento"
          className="flex items-center gap-2 overflow-x-auto md:overflow-visible md:flex-wrap pb-2 mb-7 sm:mb-9 no-scrollbar"
        >
          {CATEGORY_TABS.map((category) => {
            const isSelected = selectedCategory === category;
            const count = category === 'Todos' ? totalCatalogCount : CATEGORY_COUNTS[category] || 0;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => onCategoryChange(category)}
                className={`rounded-full px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors tabular-nums ${
                  isSelected
                    ? 'bg-primary text-cream shadow-xs'
                    : 'bg-surface border border-hairline text-ink-muted hover:text-ink-strong hover:bg-linen'
                }`}
              >
                {category} ({count})
              </button>
            );
          })}
        </div>

        {/* Product Grid or Empty Recovery */}
        {displayedProducts.length === 0 ? (
          <div className="bg-surface rounded-2xl border border-hairline p-8 sm:p-12 text-center max-w-lg mx-auto">
            <h3 className="font-serif text-xl font-medium text-ink-strong">
              Nenhum produto encontrado
            </h3>
            <p className="mt-2 text-sm text-ink-muted">
              Não encontramos peças para os critérios selecionados. Tente outro termo de busca ou visualize todo o catálogo.
            </p>
            <button
              type="button"
              onClick={onResetFilters}
              className="mt-5 inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary-strong text-cream text-sm font-medium px-6 py-3 transition-colors"
            >
              Ver Todo o Catálogo
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-7">
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onToggleWishlist={onToggleWishlist}
                  onAddToCart={onAddToCart}
                  onOpenDetail={onOpenDetail}
                />
              ))}
            </div>

            {/* Progressive Pagination Bar */}
            <div className="mt-10 sm:mt-12 flex flex-col items-center">
              <p className="text-xs sm:text-sm text-ink-muted font-medium tabular-nums">
                Exibindo {displayedProducts.length.toLocaleString('pt-BR')} de {products.length.toLocaleString('pt-BR')} produtos
              </p>

              <div className="mt-2.5 w-48 sm:w-56 h-1.5 rounded-full bg-hairline overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              {displayedProducts.length < products.length && (
                <button
                  type="button"
                  onClick={onShowMore}
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-surface hover:bg-primary hover:text-cream text-primary border border-primary/35 font-medium text-sm px-7 py-3 transition-colors shadow-2xs"
                >
                  Carregar Mais Produtos (+24)
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
