const QUALITY_PILLARS = [
  {
    title: 'Tecidos e Acabamento Conferidos',
    description:
      'Seleção focada em gramatura real de algodão, toque acetinado de percal e costuras reforçadas para lavagens frequentes.',
  },
  {
    title: 'Grades Completas por Cômodo',
    description:
      'Opções do Solteiro ao Super King na linha cama, além de jogos completos para banho, mesa posta, sala e cozinha.',
  },
  {
    title: 'Atendimento Direto Consultivo',
    description:
      'Auxiliamos na escolha de medidas, combinações de cores e montagem de enxovais personalizados antes do fechamento.',
  },
];

export default function AboutSection() {
  return (
    <section
      id="qualidade"
      aria-labelledby="qualidade-heading"
      className="py-12 sm:py-16 lg:py-20 bg-surface border-y border-hairline"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-linen border border-hairline shadow-xs">
              <img
                src="/produtos/sobre-laise.jpg"
                alt="Detalhe em close-up da colcha laise bordada creme Brum Enxovais"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6">
            <h2
              id="qualidade-heading"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-ink-strong leading-tight"
            >
              Curadoria pensada para durar no ritmo real da casa
            </h2>

            <p className="mt-4 text-sm sm:text-base text-ink-muted leading-relaxed max-w-xl">
              Na Brum Enxovais reunimos peças têxteis e utilidades domésticas com foco em conforto tátil, boa apresentação e praticidade na manutenção. Cada departamento é organizado por ambiente para facilitar desde pequenas reposições até enxovais completos.
            </p>

            <div className="mt-7 space-y-5">
              {QUALITY_PILLARS.map((pillar) => (
                <div key={pillar.title} className="pl-4 border-l-2 border-accent-strong">
                  <h3 className="text-sm sm:text-base font-semibold text-ink-strong">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-ink-muted leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
