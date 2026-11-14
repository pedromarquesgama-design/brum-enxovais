import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { CATEGORIES, CATEGORY_COUNTS, PRODUCTS, STORE_INFO } from '../data/catalog';
import { IconCheck, IconClose, IconSearch } from './Icons';
import RealismButton from './ui/shiny-borders-button';

const SORT_OPTIONS = [
  { id: 'default', label: 'Ordem do Acervo' },
  { id: 'name-asc', label: 'Nome (A–Z)' },
  { id: 'name-desc', label: 'Nome (Z–A)' },
  { id: 'sku-asc', label: 'Código SKU' },
];

const CATEGORY_OPTIONS = ['Todos', ...CATEGORIES.map((c) => c.id)];

export default function FilterSheet({
  onClose,
  initialQuery,
  initialCategory,
  initialSort,
  onApply,
}) {
  const [draftQuery, setDraftQuery] = useState(initialQuery);
  const [draftCategory, setDraftCategory] = useState(initialCategory);
  const [draftSort, setDraftSort] = useState(initialSort);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const draftMatchCount = useMemo(() => {
    const q = draftQuery.trim().toLowerCase();
    return PRODUCTS.filter((item) => {
      if (draftCategory !== 'Todos' && item.category !== draftCategory) return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.material.toLowerCase().includes(q) ||
        item.details.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q)
      );
    }).length;
  }, [draftQuery, draftCategory]);

  const activeFilters =
    (draftCategory !== 'Todos' ? 1 : 0) +
    (draftSort !== 'default' ? 1 : 0) +
    (draftQuery.trim() ? 1 : 0);

  const handleReset = () => {
    setDraftQuery('');
    setDraftCategory('Todos');
    setDraftSort('default');
  };

  const handleApply = () => {
    onApply({
      query: draftQuery,
      category: draftCategory,
      sort: draftSort,
    });
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink-strong/55 backdrop-blur-xs"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-sheet-title"
        className="w-full sm:max-w-lg bg-surface rounded-t-[28px] sm:rounded-3xl border border-hairline shadow-2xl max-h-[90vh] flex flex-col overflow-hidden"
        initial={{ opacity: 0, y: 48, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
      >
        <div className="pt-3 pb-1 flex justify-center sm:hidden">
          <div className="w-10 h-1 rounded-full bg-hairline" />
        </div>

        <div className="px-5 py-3.5 border-b border-hairline flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <h2 id="filter-sheet-title" className="font-serif text-xl font-medium text-ink-strong">
              Busca &amp; Filtros
            </h2>
            {activeFilters > 0 && (
              <span className="min-w-[22px] h-[22px] px-1.5 rounded-full bg-primary-soft text-primary text-xs font-bold flex items-center justify-center tabular-nums">
                {activeFilters}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-accent-ink pointer-fine:hover:text-primary"
            >
              Limpar Tudo
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar filtros"
              className="w-8 h-8 rounded-full bg-linen pointer-fine:hover:bg-hairline text-ink flex items-center justify-center transition-colors"
            >
              <IconClose className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-5 space-y-6 overflow-y-auto">
          <div>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-ink-muted">
                <IconSearch className="w-4 h-4" />
              </span>
              <input
                type="search"
                value={draftQuery}
                onChange={(e) => setDraftQuery(e.target.value)}
                placeholder="Digite produto, material ou código COD..."
                aria-label="Pesquisar no filtro"
                className="w-full rounded-full bg-cream border border-hairline pl-10 pr-10 py-3 text-sm text-ink-strong placeholder:text-ink-muted/75 focus:border-primary focus:outline-none"
              />
              {draftQuery && (
                <button
                  type="button"
                  onClick={() => setDraftQuery('')}
                  aria-label="Apagar termo pesquisado"
                  className="absolute inset-y-0 right-3 flex items-center text-ink-muted pointer-fine:hover:text-ink-strong"
                >
                  <IconClose className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="mt-3">
              <p className="text-xs font-semibold text-ink-muted mb-2">Buscas Populares</p>
              <div className="flex flex-wrap gap-2">
                {STORE_INFO.recentSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setDraftQuery(term)}
                    className="rounded-full bg-linen pointer-fine:hover:bg-hairline text-ink text-xs font-medium px-3 py-1.5 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-ink-muted mb-2.5">Ordenar Resultados</p>
            <div className="grid grid-cols-2 gap-2.5">
              {SORT_OPTIONS.map((option) => {
                const selected = draftSort === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setDraftSort(option.id)}
                    aria-pressed={selected}
                    className={`rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium border flex items-center justify-between gap-2 transition-colors ${
                      selected
                        ? 'bg-primary border-primary text-cream font-semibold'
                        : 'bg-surface border-hairline text-ink pointer-fine:hover:bg-cream'
                    }`}
                  >
                    <span className="truncate">{option.label}</span>
                    {selected && <IconCheck className="w-4 h-4 shrink-0 text-accent" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-ink-muted mb-2.5">Departamentos</p>
            <div className="grid grid-cols-2 gap-2.5">
              {CATEGORY_OPTIONS.map((category) => {
                const selected = draftCategory === category;
                const count =
                  category === 'Todos' ? PRODUCTS.length : CATEGORY_COUNTS[category] || 0;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setDraftCategory(category)}
                    aria-pressed={selected}
                    className={`rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium flex items-center justify-between gap-2 transition-colors ${
                      selected
                        ? 'bg-primary text-cream shadow-xs'
                        : 'bg-cream border border-hairline text-ink pointer-fine:hover:bg-linen'
                    }`}
                  >
                    <span className="truncate">
                      {category} ({count})
                    </span>
                    {selected && <IconCheck className="w-4 h-4 shrink-0 text-accent" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-hairline bg-cream flex items-center gap-3">
          <RealismButton
            tone="surface"
            text="Limpar"
            onClick={handleReset}
            className="flex-1 [--shiny-btn-size:0.9rem]"
          />
          <RealismButton
            text={
              <>
                <span>Aplicar Filtros</span>
                <span className="min-w-[24px] h-6 px-1.5 rounded-full bg-accent text-ink-strong text-xs font-bold flex items-center justify-center tabular-nums">
                  {draftMatchCount}
                </span>
              </>
            }
            onClick={handleApply}
            className="flex-[1.7] [--shiny-btn-size:0.9rem]"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
