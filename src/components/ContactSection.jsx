import { STORE_INFO } from '../data/catalog';
import { resolveSalesman, buildWhatsAppUrl } from '../data/salesmen';
import { IconPhone } from './Icons';

export default function ContactSection() {
  const salesman = resolveSalesman();
  const phoneLabel = salesman ? salesman.name : STORE_INFO.phoneDisplay;
  const whatsappHref = buildWhatsAppUrl(
    salesman
      ? `Olá, ${salesman.name}! Gostaria de falar com você sobre os produtos da Brum Enxovais.`
      : 'Olá, Brum Enxovais! Gostaria de falar com o atendimento.',
    salesman
  );
  return (
    <section
      id="contato"
      aria-labelledby="contato-heading"
      className="scroll-mt-20 py-12 sm:py-16 lg:py-20 bg-cream"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mb-8 sm:mb-10">
          <h2
            id="contato-heading"
            className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-ink-strong"
          >
            Fale com Nossa Equipe
          </h2>
          <p className="mt-2 text-sm sm:text-base text-ink-muted">
            Tire dúvidas sobre medidas de cama, prazos de envio ou monte seu orçamento personalizado em atendimento direto.
          </p>
        </div>

        <div className="max-w-md">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 rounded-2xl bg-surface p-5 sm:p-6 border border-hairline pointer-fine:hover:border-primary/50 transition-colors"
          >
            <div className="w-11 h-11 rounded-full bg-primary-soft text-primary flex items-center justify-center shrink-0">
              <IconPhone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-ink-strong">
                {salesman ? `WhatsApp · ${salesman.name}` : 'WhatsApp & Atendimento'}
              </h3>
              <p className="mt-0.5 text-sm font-medium text-primary tabular-nums">{phoneLabel}</p>
              <p className="mt-1 text-xs text-ink-muted">{STORE_INFO.hours}</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
