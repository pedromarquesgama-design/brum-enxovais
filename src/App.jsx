import { useMemo, useState } from 'react';
import AboutSection from './components/AboutSection';
import CartDrawer from './components/CartDrawer';
import CatalogSection from './components/CatalogSection';
import CategoryStrip from './components/CategoryStrip';
import ContactSection from './components/ContactSection';
import FilterSheet from './components/FilterSheet';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import { IconCheck } from './components/Icons';
import ProductModal from './components/ProductModal';
import PromoBanners from './components/PromoBanners';
import WishlistDrawer from './components/WishlistDrawer';
import { PRODUCTS } from './data/catalog';

const INITIAL_VISIBLE = 24;
const PAGE_STEP = 24;

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState('default');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const [cartItems, setCartItems] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    window.clearTimeout(window.__brumToastTimer);
    window.__brumToastTimer = window.setTimeout(() => setToastMessage(''), 2600);
  };

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = PRODUCTS.filter((item) => {
      if (selectedCategory !== 'Todos' && item.category !== selectedCategory) return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.material.toLowerCase().includes(q) ||
        item.details.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q)
      );
    });

    if (sortBy === 'name-asc') {
      return [...list].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
    }
    if (sortBy === 'name-desc') {
      return [...list].sort((a, b) => b.name.localeCompare(a.name, 'pt-BR'));
    }
    if (sortBy === 'sku-asc') {
      return [...list].sort((a, b) => a.sku.localeCompare(b.sku, 'pt-BR', { numeric: true }));
    }
    return list;
  }, [searchQuery, selectedCategory, sortBy]);

  const activeFilterCount =
    (selectedCategory !== 'Todos' ? 1 : 0) + (sortBy !== 'default' ? 1 : 0);

  const wishlistProducts = useMemo(
    () => PRODUCTS.filter((p) => wishlistIds.includes(p.id)),
    [wishlistIds]
  );

  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setVisibleCount(INITIAL_VISIBLE);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Todos');
    setSortBy('default');
    setVisibleCount(INITIAL_VISIBLE);
  };

  const handleApplySheet = ({ query, category, sort }) => {
    setSearchQuery(query);
    setSelectedCategory(category);
    setSortBy(sort);
    setVisibleCount(INITIAL_VISIBLE);
    const catalogEl = document.getElementById('catalogo');
    if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleToggleWishlist = (productId) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      showToast(exists ? 'Removido dos favoritos' : 'Salvo nos favoritos');
      return exists ? prev.filter((id) => id !== productId) : [...prev, productId];
    });
  };

  const handleAddToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { product, qty }];
    });

    showToast(`${product.name} adicionado ao orçamento`);
  };

  const handleUpdateQty = (productId, nextQty) => {
    if (nextQty <= 0) {
      setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, qty: nextQty } : i))
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream text-ink">
      <Header
        cartCount={cartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsFilterSheetOpen(true)}
      />

      <main id="main-content" className="flex-1">
        <Hero />

        <CategoryStrip
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
        />

        <CatalogSection
          products={filteredProducts}
          totalCatalogCount={PRODUCTS.length}
          visibleCount={visibleCount}
          onShowMore={() => setVisibleCount((prev) => prev + PAGE_STEP)}
          searchQuery={searchQuery}
          onSearchChange={(val) => {
            setSearchQuery(val);
            setVisibleCount(INITIAL_VISIBLE);
          }}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          onOpenFilterSheet={() => setIsFilterSheetOpen(true)}
          onResetFilters={handleResetFilters}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onOpenDetail={setActiveProduct}
          activeFilterCount={activeFilterCount}
        />

        <PromoBanners onSelectCategory={handleCategoryChange} />

        <AboutSection />

        <ContactSection />
      </main>

      <Footer onSelectCategory={handleCategoryChange} />

      {isFilterSheetOpen && (
        <FilterSheet
          onClose={() => setIsFilterSheetOpen(false)}
          initialQuery={searchQuery}
          initialCategory={selectedCategory}
          initialSort={sortBy}
          onApply={handleApplySheet}
        />
      )}

      {activeProduct && (
        <ProductModal
          key={activeProduct.id}
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
          isWishlisted={wishlistIds.includes(activeProduct.id)}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={(id) => setCartItems((prev) => prev.filter((i) => i.product.id !== id))}
        onClearCart={() => setCartItems([])}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        products={wishlistProducts}
        onRemoveWishlist={handleToggleWishlist}
        onMoveToCart={(product) => handleAddToCart(product, 1)}
        onOpenDetail={setActiveProduct}
      />

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 rounded-full bg-primary-strong text-cream px-5 py-3 text-xs sm:text-sm font-medium shadow-xl border border-hairline-dark flex items-center gap-2.5 max-w-[92vw]"
        >
          <span className="w-5 h-5 rounded-full bg-accent text-ink-strong flex items-center justify-center shrink-0">
            <IconCheck className="w-3.5 h-3.5" />
          </span>
          <span className="truncate">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
