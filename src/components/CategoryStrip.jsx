import { CATEGORIES, CATEGORY_COUNTS } from '../data/catalog';

export default function CategoryStrip({ selectedCategory, onSelectCategory }) {
  const handleSelect = (categoryId) => {
    onSelectCategory(categoryId);
    const catalogEl = document.getElementById('catalogo');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="categorias"
      aria-labelledby="categorias-heading"
      className="py-12 sm:py-16 lg:py-20 bg-cream"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 sm:mb-10">
          <div>
            <h2
              id="categorias-heading"
              className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-ink-strong"
            >
              Departamentos para Toda a Casa
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-ink-muted">
              Escolha um departamento para filtrar os produtos identificados em nosso catálogo.
            </p>
          </div>

          {selectedCategory !== 'Todos' && (
            <button
              type="button"
              onClick={() => handleSelect('Todos')}
              className="self-start sm:self-auto text-xs sm:text-sm font-semibold text-accent-ink pointer-fine:hover:text-primary underline underline-offset-4"
            >
              Mostrar todos os departamentos
            </button>
          )}
        </div>

        {/* Mobile horizontal rail / Desktop 5x2 symmetrical grid */}
        <div className="flex lg:grid lg:grid-cols-5 gap-5 sm:gap-6 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 snap-x snap-mandatory no-scrollbar">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category.id;
            const count = CATEGORY_COUNTS[category.id] || 0;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => handleSelect(isSelected ? 'Todos' : category.id)}
                aria-pressed={isSelected}
                className="group flex flex-col items-center text-center shrink-0 w-32 sm:w-36 lg:w-auto snap-start focus-visible:rounded-2xl"
              >
                <div
                  className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-linen border-4 border-white transition-all duration-300 ${
                    isSelected
                      ? 'ring-2 ring-primary ring-offset-2 ring-offset-cream shadow-md'
                      : 'ring-1 ring-ink/15 shadow-sm pointer-fine:group-hover:ring-primary/50 pointer-fine:group-hover:shadow-md'
                  }`}
                >
                  <img
                    src={category.image}
                    alt={category.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 pointer-fine:group-hover:scale-105"
                  />
                </div>

                <span
                  className={`mt-3 text-sm font-medium leading-tight transition-colors ${
                    isSelected ? 'text-primary font-semibold' : 'text-ink-strong pointer-fine:group-hover:text-primary'
                  }`}
                >
                  {category.title}
                </span>
                <span className="mt-0.5 text-xs text-ink-muted tabular-nums">
                  {count} itens
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
