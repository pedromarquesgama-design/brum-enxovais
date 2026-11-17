import { STORE_INFO } from './catalog';

// Vendedores responsáveis por receber orçamentos via WhatsApp.
// Use apenas dígitos com código do país (ex: 5531996844277), sem espaços nem símbolos.
export const SALESMEN = {
  orlei: { name: 'Orlei', whatsapp: STORE_INFO.whatsappDigits },
  derlin: { name: 'Derlin', whatsapp: '5531996844277' },
  delin: { name: 'Derlin', whatsapp: '5531996844277' }, // alias amigável
  junior: { name: 'Junior', whatsapp: '5537998442166' },
};

// Número da loja (fallback quando nenhum vendedor é identificado na URL).
export const DEFAULT_WHATSAPP = STORE_INFO.whatsappDigits;

// Retorna o vendedor pelo slug, ou undefined se não existir.
export function getSalesman(slug) {
  if (!slug) return undefined;
  return SALESMEN[String(slug).toLowerCase().trim()];
}

// Lê a URL (pathname /venda/<slug> ou query param ?rep=<slug> / ?vendedor=<slug>)
export function getSalesmanFromUrl() {
  if (typeof window === 'undefined') return undefined;

  // 1. Tenta query params: ?rep=derlin ou ?vendedor=derlin
  try {
    const params = new URLSearchParams(window.location.search);
    const querySlug = params.get('rep') || params.get('vendedor') || params.get('venda');
    if (querySlug) {
      const s = getSalesman(querySlug);
      if (s) return { slug: querySlug.toLowerCase(), ...s };
    }
  } catch (_) {}

  // 2. Tenta rota no path: /venda/<slug>
  const segments = String(window.location.pathname ?? '').split('/').filter(Boolean);
  if (segments[0] === 'venda' && segments[1]) {
    const s = getSalesman(segments[1]);
    if (s) return { slug: segments[1].toLowerCase(), ...s };
  }

  return undefined;
}

// Compatibilidade com código anterior
export function getSalesmanFromPath(pathname = window.location.pathname) {
  return getSalesmanFromUrl();
}

// Resolve o vendedor: prioriza a URL, depois o localStorage, senão undefined (loja).
export function resolveSalesman() {
  const fromUrl = getSalesmanFromUrl();
  if (fromUrl) {
    try {
      localStorage.setItem('brum_rep_slug', fromUrl.slug);
    } catch (_) {}
    return fromUrl;
  }
  try {
    const slug = localStorage.getItem('brum_rep_slug');
    if (slug) {
      const s = getSalesman(slug);
      if (s) return { slug, ...s };
    }
  } catch (_) {}
  return undefined;
}

// Monta a URL do WhatsApp. Usa o número do vendedor quando houver um,
// senão usa o número da loja (fallback). O número nunca fica exposto na URL.
export function buildWhatsAppUrl(text, salesman) {
  const digits = salesman ? salesman.whatsapp : DEFAULT_WHATSAPP;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
