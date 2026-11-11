import { IconArrowRight } from './Icons';

export default function PromoBanners({ onSelectCategory }) {
  const jumpToCategory = (category) => {
    onSelectCategory(category);
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section aria-label="Destaques comerciais" className="py-12 sm:py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Dark Petroleum Editorial Card */}
          <div className="relative rounded-3xl overflow-hidden bg-primary-deep text-cream min-h-[280px] sm:min-h-[320px] flex flex-col justify-between p-7 sm:p-10 border border-hairline-dark">
            <img
              src="/produtos/cama-damasco.jpg"
              alt="Cobre-leito matelassê damasco coordenado em quarto"
              loading="lazy"
              className="hidden sm:block absolute right-0 top-0 bottom-0 w-1/2 h-full object-cover opacity-35"
              style={{ maskImage: 'linear-gradient(to left, black 35%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to left, black 35%, transparent 100%)' }}
            />
            <div className="relative z-10 max-w-sm">
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-cream leading-tight">
                Linha Quarto &amp; Enxoval Coordenado
              </h2>
              <p className="mt-3 text-sm sm:text-base text-cream/85 leading-relaxed">
                Colchas laise, lençóis bordados em ponto palito e edredons macios do tamanho Solteiro ao Super King.
              </p>
            </div>

            <div className="relative z-10 mt-6">
              <button
                type="button"
                onClick={() => jumpToCategory('Cama')}
                className="inline-flex items-center gap-2 rounded-full bg-accent hover:bg-accent-hover text-ink-strong font-semibold text-sm px-6 py-3 transition-colors"
              >
                <span>Ver Coleção Cama</span>
                <IconArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Warm Linen Editorial Card */}
          <div className="relative rounded-3xl overflow-hidden bg-linen text-ink-strong min-h-[280px] sm:min-h-[320px] flex flex-col justify-between p-7 sm:p-10 border border-hairline">
            <img
              src="/produtos/mesa-guipir.jpg"
              alt="Mesa posta com jogo americano em renda guipir"
              loading="lazy"
              className="hidden sm:block absolute right-0 top-0 bottom-0 w-1/2 h-full object-cover opacity-80"
              style={{ maskImage: 'linear-gradient(to left, black 45%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to left, black 45%, transparent 100%)' }}
            />
            <div className="relative z-10 max-w-sm">
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-ink-strong leading-tight">
                Mesa Posta &amp; Utilidades Diárias
              </h2>
              <p className="mt-3 text-sm sm:text-base text-ink-muted leading-relaxed">
                Jogos americanos guipir, panelas de cozimento uniforme e organizadores que simplificam a rotina da cozinha.
              </p>
            </div>

            <div className="relative z-10 mt-6 flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => jumpToCategory('Mesa')}
                className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-strong text-cream font-medium text-sm px-6 py-3 transition-colors"
              >
                <span>Ver Mesa Posta</span>
                <IconArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => jumpToCategory('Panelas & Cozinha')}
                className="inline-flex items-center justify-center rounded-full bg-surface hover:bg-cream text-primary border border-hairline font-medium text-sm px-5 py-3 transition-colors"
              >
                Cozinha &amp; Panelas
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
