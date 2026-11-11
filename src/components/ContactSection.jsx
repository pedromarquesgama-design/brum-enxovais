import { STORE_INFO, buildWhatsAppUrl } from '../data/catalog';
import { IconMail, IconMapPin, IconPhone } from './Icons';

export default function ContactSection() {
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <a
            href={buildWhatsAppUrl('Olá, Brum Enxovais! Gostaria de falar com o atendimento.')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 rounded-2xl bg-surface p-5 sm:p-6 border border-hairline hover:border-primary/50 transition-colors"
          >
            <div className="w-11 h-11 rounded-full bg-primary-soft text-primary flex items-center justify-center shrink-0">
              <IconPhone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-ink-strong">WhatsApp &amp; Atendimento</h3>
              <p className="mt-0.5 text-sm font-medium text-primary tabular-nums">
                {STORE_INFO.phoneDisplay}
              </p>
              <p className="mt-1 text-xs text-ink-muted">{STORE_INFO.hours}</p>
            </div>
          </a>

          <a
            href={`mailto:${STORE_INFO.email}`}
            className="flex items-start gap-4 rounded-2xl bg-surface p-5 sm:p-6 border border-hairline hover:border-primary/50 transition-colors"
          >
            <div className="w-11 h-11 rounded-full bg-accent-soft text-accent-ink flex items-center justify-center shrink-0">
              <IconMail className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-ink-strong">E-mail Comercial</h3>
              <p className="mt-0.5 text-sm font-medium text-primary break-all">
                {STORE_INFO.email}
              </p>
              <p className="mt-1 text-xs text-ink-muted">
                Orçamentos de enxoval e pedidos corporativos
              </p>
            </div>
          </a>

          <div className="flex items-start gap-4 rounded-2xl bg-surface p-5 sm:p-6 border border-hairline">
            <div className="w-11 h-11 rounded-full bg-linen text-primary flex items-center justify-center shrink-0">
              <IconMapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-ink-strong">Endereço Ilustrativo</h3>
              <p className="mt-0.5 text-sm text-ink">{STORE_INFO.address}</p>
              <p className="mt-1 text-xs text-ink-muted">
                Envio estruturado para todo o território nacional
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
