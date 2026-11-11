import PRODUCTS_DATA from './catalog-items.json';

// Contatos abaixo são ilustrativos (fictícios) até substituição pelos oficiais da Brum Enxovais.
export const STORE_INFO = {
  brandName: 'Brum Enxovais',
  tagline: 'Cama, Mesa, Banho e Utilidades',
  phoneDisplay: '(11) 99842-3100',
  whatsappDigits: '5511998423100',
  email: 'atendimento@brumenxovais.com.br',
  address: 'Rua das Paineiras, 420 — Centro, São Paulo/SP',
  hours: 'Seg a Sex: 09h às 18h · Sáb: 09h às 13h',
  announcement: 'Catálogo Completo com 1.428 Produtos Classificados · Solicite Seu Orçamento sem Compromisso',
  recentSearches: [
    'Colcha',
    'Toalha',
    'Panela',
    'Tapete',
    'Xícaras',
    'Organizador',
    'Ventilador',
    'Boneca',
  ],
};

export const HERO_SLIDES = [
  {
    id: 'cama',
    label: 'Quarto',
    collectionTag: '01 / Quarto & Enxoval',
    headlineMain: 'Enxovais e Utilidades',
    headlineAccent: 'para Viver Bem.',
    description:
      'Descubra mais de 1.400 itens entre cama, mesa posta, banho, cozinha e utilidades escolhidas para o conforto do seu lar.',
    image: '/produtos/hero-cama.jpg',
    imageAlt: 'Quarto decorado com colcha matelassê damasco dourada sobre parede em tom azul petróleo',
    imagePosition: 'object-center md:object-[65%_58%]',
    targetCategory: 'Todos',
  },
  {
    id: 'mesa',
    label: 'Mesa Posta',
    collectionTag: '02 / Mesa Posta',
    headlineMain: 'A Arte de Receber',
    headlineAccent: 'em Cada Detalhe.',
    description:
      'Jogos americanos em renda guipir, xícaras, taças, jarras e toalhas para compor do café da manhã ao jantar.',
    image: '/produtos/hero-mesa.jpg',
    imageAlt: 'Mesa posta com jogo americano bordado em renda guipir, taças e louça branca',
    imagePosition: 'object-[center_45%] md:object-[62%_44%]',
    targetCategory: 'Mesa',
  },
  {
    id: 'banho',
    label: 'Banho',
    collectionTag: '03 / Linha Banho',
    headlineMain: 'Fios Macios e Conforto',
    headlineAccent: 'no Ritual Diário.',
    description:
      'Toalhas em jacquard, fio penteado e jogos coordenados de alta absorção para manter o banheiro acolhedor.',
    image: '/produtos/hero-banho.jpg',
    imageAlt: 'Conjunto de toalhas de banho e rosto em jacquard com acabamento em renda bordada',
    imagePosition: 'object-[center_18%] md:object-[68%_12%]',
    targetCategory: 'Banho',
  },
];

export const CATEGORIES = [
  {
    id: 'Cama',
    title: 'Cama',
    subtitle: 'Colchas, lençóis e edredons',
    image: '/produtos/cama-laise.jpg',
    alt: 'Colcha matelassê em tom azul petróleo',
  },
  {
    id: 'Mesa',
    title: 'Mesa',
    subtitle: 'Toalhas, taças e jogos',
    image: '/produtos/mesa-guipir.jpg',
    alt: 'Jogo americano com bordado em renda guipir',
  },
  {
    id: 'Banho',
    title: 'Banho',
    subtitle: 'Toalhas e jogos de banho',
    image: '/produtos/banho-jasmim.jpg',
    alt: 'Toalhas caneladas de algodão dobradas no banheiro',
  },
  {
    id: 'Tapetes & Cortinas',
    title: 'Tapetes & Cortinas',
    subtitle: 'Tapetes de sala e cortinas',
    image: '/produtos/tapete-tabaco.jpg',
    alt: 'Tapete geométrico em alto relevo na sala de estar',
  },
  {
    id: 'Cozinha & Panelas',
    title: 'Cozinha & Panelas',
    subtitle: 'Panelas, caçarolas e preparo',
    image: '/produtos/cozinha-pressao.jpg',
    alt: 'Panela de pressão com revestimento antiaderente',
  },
  {
    id: 'Organização',
    title: 'Organização',
    subtitle: 'Potes, caixas e sapateiras',
    image: '/produtos/org-potes.jpg',
    alt: 'Potes herméticos de vidro com tampa em aço inox',
  },
  {
    id: 'Eletro & Utilidades',
    title: 'Eletro & Utilidades',
    subtitle: 'Ventiladores, mixers e casa',
    image: '/produtos/cat-eletro.jpg',
    alt: 'Ventilador de mesa preto em bancada iluminada',
  },
  {
    id: 'Vestuário & Moda',
    title: 'Vestuário & Moda',
    subtitle: 'Calçados, roupas e malas',
    image: '/produtos/cat-vestuario.jpg',
    alt: 'Conjunto de malas de viagem rosadas e vestuário casual',
  },
  {
    id: 'Brinquedos & Infantil',
    title: 'Brinquedos & Infantil',
    subtitle: 'Bonecas, carrinhos e infantil',
    image: '/produtos/cat-brinquedos.jpg',
    alt: 'Boneca infantil com vestido floral rosa',
  },
  {
    id: 'Beleza & Bem-Estar',
    title: 'Beleza & Bem-Estar',
    subtitle: 'Cosméticos, capilar e saúde',
    image: '/produtos/cat-beleza.jpg',
    alt: 'Seleção de maquiagem e itens de cuidados pessoais',
  },
];

export const PRODUCTS = PRODUCTS_DATA;

export const CATEGORY_COUNTS = PRODUCTS.reduce((acc, item) => {
  acc[item.category] = (acc[item.category] || 0) + 1;
  return acc;
}, {});

export function buildWhatsAppUrl(text) {
  return `https://wa.me/${STORE_INFO.whatsappDigits}?text=${encodeURIComponent(text)}`;
}
