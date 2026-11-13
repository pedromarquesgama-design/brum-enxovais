import PRODUCTS_DATA from './catalog-items.json';
import heroDesktopBath from '../assets/hero/hero-desktop-bath.jpg';
import heroMobileBath from '../assets/hero/hero-mobile-bath.mp4';
import heroMobileBathPoster from '../assets/hero/hero-mobile-bath.jpg';
import heroDesktopUtility from '../assets/hero/hero-desktop-utility.jpg';
import heroMobileUtility from '../assets/hero/hero-mobile-utility.mp4';
import heroMobileUtilityPoster from '../assets/hero/hero-mobile-utility.jpg';
import heroDesktopTable from '../assets/hero/hero-desktop-table.jpg';
import heroMobileTable from '../assets/hero/hero-mobile-table.mp4';
import heroMobileTablePoster from '../assets/hero/hero-mobile-table.jpg';

// Contatos abaixo são ilustrativos (fictícios) até substituição pelos oficiais da Brum Enxovais.
export const STORE_INFO = {
  brandName: 'Brum Enxovais',
  tagline: 'Cama, Mesa, Banho e Utilidades',
  phoneDisplay: '(37) 99949-8599',
  whatsappDigits: '5537999498599',
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

// Cada destaque tem uma arte 16:9 para desktop e uma animação 9:16 para mobile.
export const HERO_SLIDES = [
  {
    id: 'slide1',
    mobile: heroMobileBath,
    poster: heroMobileBathPoster,
    desktop: heroDesktopBath,
    alt: 'Maciez para todo dia',
  },
  {
    id: 'slide2',
    mobile: heroMobileUtility,
    poster: heroMobileUtilityPoster,
    desktop: heroDesktopUtility,
    alt: 'Praticidade para todo dia',
  },
  {
    id: 'slide3',
    mobile: heroMobileTable,
    poster: heroMobileTablePoster,
    desktop: heroDesktopTable,
    alt: 'Mesa posta com charme',
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
