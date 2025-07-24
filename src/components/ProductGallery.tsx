import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import ProductCard from './ProductCard';
import { t } from '@/lib/i18n';

// Mock product data
const mockProducts = [
  {
    id: '1',
    name: 'Classic Black Tee',
    price: 89,
    originalPrice: 120,
    image: '/placeholder.svg',
    category: 'T-Shirts',
    colors: ['#000000', '#FFFFFF', '#808080'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: true,
    isSale: true,
  },
  {
    id: '2',
    name: 'Premium Navy Polo',
    price: 145,
    image: '/placeholder.svg',
    category: 'Polos',
    colors: ['#000080', '#FFFFFF', '#8B4513'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isNew: false,
    isSale: false,
  },
  {
    id: '3',
    name: 'Cashmere Sweater',
    price: 299,
    image: '/placeholder.svg',
    category: 'Sweaters',
    colors: ['#696969', '#000000', '#F5F5DC'],
    sizes: ['M', 'L', 'XL'],
    isNew: true,
    isSale: false,
  },
  {
    id: '4',
    name: 'Formal White Shirt',
    price: 179,
    originalPrice: 200,
    image: '/placeholder.svg',
    category: 'Shirts',
    colors: ['#FFFFFF', '#87CEEB', '#F0F8FF'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: false,
    isSale: true,
  },
  {
    id: '5',
    name: 'Vintage Tee',
    price: 95,
    image: '/placeholder.svg',
    category: 'T-Shirts',
    colors: ['#8B4513', '#000000', '#FFFFFF'],
    sizes: ['S', 'M', 'L'],
    isNew: false,
    isSale: false,
  },
  {
    id: '6',
    name: 'Sport Polo',
    price: 125,
    image: '/placeholder.svg',
    category: 'Polos',
    colors: ['#FF0000', '#000080', '#228B22'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    isNew: true,
    isSale: false,
  },
];

const ProductGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [t('nav.tshirts'), t('nav.sweaters'), t('nav.belts'), t('nav.neckties'), t('nav.longSleeves'), t('nav.shoes'), t('nav.backpacks'), t('nav.underwear')];

  const filteredProducts = useMemo(() => {
    let filtered = [...mockProducts];

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // Keep original order for featured
        break;
    }

    return filtered;
  }, [selectedCategory, sortBy, priceRange]);

  return (
    <section className="py-16 lg:py-12 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {t('products.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('products.subtitle')}
          </p>
        </motion.div>

        {/* Category Pills & Filters */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 focus-luxury ${
                  selectedCategory === category
                    ? 'bg-accent text-accent-foreground shadow-lg'
                    : 'bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent'
                }`}
                aria-label={`Filter by ${category}`}
              >
                {category}
              </button>
            ))}
              </div>
          </div>
         
        </motion.div>

        {/* Mobile Filters Panel */}
        <motion.div
          className={`lg:hidden mb-8 overflow-hidden ${
            showFilters ? 'max-h-96' : 'max-h-0'
          }`}
          initial={false}
          animate={{
            height: showFilters ? 'auto' : 0,
            opacity: showFilters ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-muted rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-1 hover:bg-background rounded focus-luxury"
                aria-label="Close filters"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Price Range */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full accent-accent focus-luxury"
                aria-label="Maximum price"
              />
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
          layout
        >
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>

        {/* No Products Message */}
        {filteredProducts.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xl text-muted-foreground mb-4">
              No products found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setPriceRange([0, 500]);
              }}
              className="btn-luxury focus-luxury"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Load More Button */}
        {filteredProducts.length > 0 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <button className="btn-outline-luxury focus-luxury">
              {t('products.viewAllProducts')}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProductGallery;
