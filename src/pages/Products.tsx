import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, Search, SlidersHorizontal, Star, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import ProductCard from '@/components/ProductCard';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import Breadcrumb from '@/components/Breadcrumb';
import QuickViewModal from '@/components/QuickViewModal';
import { apiService } from '@/services/api';

// Enhanced mock product data with more variety
const mockProducts = [
  {
    id: '1',
    name: 'Classic Black Tee',
    price: 89,
    originalPrice: 120,
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    category: 'T-Shirts',
    colors: ['#000000', '#FFFFFF', '#808080'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: true,
    isSale: true,
    description: 'Premium cotton blend for ultimate comfort and style.',
    rating: 4.5,
    reviews: 128
  },
  {
    id: '2',
    name: 'Premium Navy Polo',
    price: 145,
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    category: 'Polos',
    colors: ['#000080', '#FFFFFF', '#8B4513'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isNew: false,
    isSale: false,
    description: 'Elegant polo shirt perfect for casual and semi-formal occasions.',
    rating: 4.8,
    reviews: 89
  },
  {
    id: '3',
    name: 'Cashmere Sweater',
    price: 299,
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    category: 'Sweaters',
    colors: ['#696969', '#000000', '#F5F5DC'],
    sizes: ['M', 'L', 'XL'],
    isNew: true,
    isSale: false,
    description: 'Luxurious cashmere blend for the ultimate in comfort and sophistication.',
    rating: 4.9,
    reviews: 45
  },
  {
    id: '4',
    name: 'Formal White Shirt',
    price: 179,
    originalPrice: 200,
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    category: 'Shirts',
    colors: ['#FFFFFF', '#87CEEB', '#F0F8FF'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: false,
    isSale: true,
    description: 'Crisp formal shirt ideal for business and special occasions.',
    rating: 4.6,
    reviews: 156
  },
  {
    id: '5',
    name: 'Vintage Tee',
    price: 95,
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    category: 'T-Shirts',
    colors: ['#8B4513', '#000000', '#FFFFFF'],
    sizes: ['S', 'M', 'L'],
    isNew: false,
    isSale: false,
    description: 'Retro-inspired design with modern comfort.',
    rating: 4.3,
    reviews: 72
  },
  {
    id: '6',
    name: 'Sport Polo',
    price: 125,
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    category: 'Polos',
    colors: ['#FF0000', '#000080', '#228B22'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    isNew: true,
    isSale: false,
    description: 'Athletic polo with moisture-wicking technology.',
    rating: 4.7,
    reviews: 93
  },
  {
    id: '7',
    name: 'Leather Belt Classic',
    price: 75,
    originalPrice: 95,
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg'],
    category: 'Belts',
    colors: ['#8B4513', '#000000'],
    sizes: ['32', '34', '36', '38', '40'],
    isNew: false,
    isSale: true,
    description: 'Genuine leather belt with brass buckle.',
    rating: 4.4,
    reviews: 67
  },
  {
    id: '8',
    name: 'Silk Necktie',
    price: 65,
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg'],
    category: 'Neckties',
    colors: ['#000080', '#8B0000', '#006400'],
    sizes: ['One Size'],
    isNew: true,
    isSale: false,
    description: '100% silk necktie with elegant patterns.',
    rating: 4.6,
    reviews: 34
  },
  {
    id: '9',
    name: 'Long Sleeve Henley',
    price: 89,
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    category: 'Long-Sleeves',
    colors: ['#808080', '#000000', '#FFFFFF'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: false,
    isSale: false,
    description: 'Comfortable henley perfect for layering.',
    rating: 4.2,
    reviews: 88
  },
  {
    id: '10',
    name: 'Designer Sneakers',
    price: 199,
    originalPrice: 250,
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    category: 'Shoes',
    colors: ['#FFFFFF', '#000000', '#808080'],
    sizes: ['8', '9', '10', '11', '12'],
    isNew: false,
    isSale: true,
    description: 'Premium sneakers with superior comfort and style.',
    rating: 4.7,
    reviews: 156
  },
  {
    id: '11',
    name: 'Canvas Backpack',
    price: 120,
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg'],
    category: 'Backpacks',
    colors: ['#8B4513', '#000000', '#808080'],
    sizes: ['One Size'],
    isNew: true,
    isSale: false,
    description: 'Durable canvas backpack for everyday use.',
    rating: 4.5,
    reviews: 76
  },
  {
    id: '12',
    name: 'Cotton Boxer Briefs',
    price: 35,
    originalPrice: 45,
    image: '/placeholder.svg',
    images: ['/placeholder.svg'],
    category: 'Underwear',
    colors: ['#000000', '#808080', '#FFFFFF'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: false,
    isSale: true,
    description: 'Comfortable cotton boxer briefs, pack of 3.',
    rating: 4.3,
    reviews: 234
  }
];

const categories = ['All', 'T-Shirts', 'Sweaters', 'Belts', 'Neckties', 'Long-Sleeves', 'Shoes', 'Backpacks', 'Underwear'];
const colorOptions = [
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Navy', value: '#000080' },
  { name: 'Gray', value: '#808080' },
  { name: 'Brown', value: '#8B4513' },
  { name: 'Red', value: '#FF0000' },
  { name: 'Green', value: '#228B22' },
  { name: 'Dark Red', value: '#8B0000' },
  { name: 'Dark Green', value: '#006400' },
];
const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL'];
const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low → High' },
  { value: 'price-high', label: 'Price: High → Low' },
  { value: 'bestsellers', label: 'Best Sellers' },
];

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  colors: string[];
  sizes: string[];
  isNew?: boolean;
  isSale?: boolean;
  description?: string;
  rating?: number;
  reviews?: number;
}

const Products = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [displayedProducts, setDisplayedProducts] = useState(8);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const response = await apiService.getProducts();
      if (response.error?.message === 'Supabase or Printful API token configuration is missing') {
        setProducts(mockProducts);
      } else if (response.result) {
        // Assuming the API result matches the Product interface
        // You might need to transform the data if it doesn't
        setProducts(response.result as unknown as Product[]);
      }
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleQuickView = useCallback((product: Product) => {
    setQuickViewProduct(product);
    setShowQuickView(true);
  }, []);

  const loadMoreProducts = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayedProducts(prev => Math.min(prev + 8, products.length));
      setIsLoading(false);
    }, 500);
  }, [products.length]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by search query
    if (debouncedSearchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by colors
    if (selectedColors.length > 0) {
      filtered = filtered.filter(product =>
        product.colors.some(color => selectedColors.includes(color))
      );
    }

    // Filter by sizes
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(product =>
        product.sizes.some(size => selectedSizes.includes(size))
      );
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
      case 'bestsellers':
        filtered.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [products, selectedCategory, selectedColors, selectedSizes, priceRange, sortBy, debouncedSearchQuery]);

  const clearFilters = useCallback(() => {
    setSelectedCategory('All');
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceRange([0, 500]);
    setSearchQuery('');
    setDebouncedSearchQuery('');
  }, []);

  const activeFiltersCount = 
    (selectedCategory !== 'All' ? 1 : 0) +
    selectedColors.length +
    selectedSizes.length +
    (priceRange[0] !== 0 || priceRange[1] !== 500 ? 1 : 0);

  const visibleProducts = filteredProducts.slice(0, displayedProducts);
  const hasMoreProducts = filteredProducts.length > displayedProducts;

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentSection="products" />
      
      {/* Header with Breadcrumb and Search */}
      <motion.div 
        className="pt-20 pb-6 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto">
          <Breadcrumb 
            items={[
              { label: 'Collection', href: '/' },
              { label: 'All Products' }
            ]} 
          />
          
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">All Products</h1>
              <p className="text-muted-foreground">
                Discover our complete collection of premium men's fashion
              </p>
            </div>
            
            {/* Full-width Search Bar */}
            <motion.div 
              className="relative max-w-2xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search products by name, category, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-12 h-12 text-lg bg-muted/30 border-border/50 focus:border-accent focus:ring-accent rounded-2xl transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors focus-luxury"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Mobile/Tablet Horizontal Filter Toolbar */}
        <motion.div 
          className="lg:hidden mb-6 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="flex items-center gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {/* Category Pills */}
            <div className="flex gap-2 flex-shrink-0">
              {categories.map(category => (
                <motion.button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-accent/20'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 bg-background border-border">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border z-50">
                {sortOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Color Dots */}
            <div className="flex gap-2 flex-shrink-0">
              {colorOptions.map(color => (
                <motion.button
                  key={color.value}
                  className={`w-8 h-8 rounded-full border-2 flex-shrink-0 transition-all ${
                    selectedColors.includes(color.value) 
                      ? 'border-accent ring-2 ring-accent/30' 
                      : 'border-border hover:border-accent/50'
                  }`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => {
                    setSelectedColors(prev =>
                      prev.includes(color.value)
                        ? prev.filter(c => c !== color.value)
                        : [...prev, color.value]
                    );
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={color.name}
                />
              ))}
            </div>

            {/* Size Pills */}
            <div className="flex gap-2 flex-shrink-0">
              {sizeOptions.map(size => (
                <motion.button
                  key={size}
                  className={`px-3 py-1 text-sm border rounded-full transition-all ${
                    selectedSizes.includes(size)
                      ? 'bg-accent text-accent-foreground border-accent'
                      : 'bg-background hover:bg-accent/10 border-border'
                  }`}
                  onClick={() => {
                    setSelectedSizes(prev =>
                      prev.includes(size)
                        ? prev.filter(s => s !== size)
                        : [...prev, size]
                    );
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {size}
                </motion.button>
              ))}
            </div>

            {/* Filters Button */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex-shrink-0"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              More Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>

            {/* Clear All */}
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="flex-shrink-0">
                Clear All
              </Button>
            )}
          </div>
        </motion.div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <motion.div 
            className={`w-80 flex-shrink-0 ${showFilters ? 'block' : 'hidden'} lg:block`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-muted/20 rounded-2xl border p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Filters</h3>
                {activeFiltersCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear all
                  </Button>
                )}
              </div>

              {/* Active Filters */}
              {activeFiltersCount > 0 && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {selectedCategory !== 'All' && (
                      <Badge variant="secondary" className="text-xs">
                        {selectedCategory}
                        <X 
                          className="h-3 w-3 ml-1 cursor-pointer" 
                          onClick={() => setSelectedCategory('All')}
                        />
                      </Badge>
                    )}
                    {selectedColors.map(color => (
                      <Badge key={color} variant="secondary" className="text-xs">
                        {colorOptions.find(c => c.value === color)?.name}
                        <X 
                          className="h-3 w-3 ml-1 cursor-pointer" 
                          onClick={() => setSelectedColors(prev => prev.filter(c => c !== color))}
                        />
                      </Badge>
                    ))}
                    {selectedSizes.map(size => (
                      <Badge key={size} variant="secondary" className="text-xs">
                        {size}
                        <X 
                          className="h-3 w-3 ml-1 cursor-pointer" 
                          onClick={() => setSelectedSizes(prev => prev.filter(s => s !== size))}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Category Filter */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-3 block">Category</Label>
                <div className="space-y-2">
                  {categories.map(category => (
                    <motion.div 
                      key={category} 
                      className="flex items-center space-x-2"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Checkbox
                        id={category}
                        checked={selectedCategory === category}
                        onCheckedChange={() => setSelectedCategory(category)}
                      />
                      <Label htmlFor={category} className="text-sm cursor-pointer">
                        {category}
                      </Label>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-3 block">Colors</Label>
                <div className="grid grid-cols-4 gap-2">
                  {colorOptions.map(color => (
                    <motion.button
                      key={color.value}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColors.includes(color.value) 
                          ? 'border-primary ring-2 ring-primary/30' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => {
                        setSelectedColors(prev =>
                          prev.includes(color.value)
                            ? prev.filter(c => c !== color.value)
                            : [...prev, color.value]
                        );
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-3 block">Sizes</Label>
                <div className="grid grid-cols-3 gap-2">
                  {sizeOptions.map(size => (
                    <motion.button
                      key={size}
                      className={`px-3 py-2 text-sm border rounded-md transition-all ${
                        selectedSizes.includes(size)
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background hover:bg-accent hover:text-accent-foreground border-border'
                      }`}
                      onClick={() => {
                        setSelectedSizes(prev =>
                          prev.includes(size)
                            ? prev.filter(s => s !== size)
                            : [...prev, size]
                        );
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-3 block">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </Label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={500}
                  min={0}
                  step={10}
                  className="w-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Desktop Toolbar */}
            <motion.div 
              className="hidden lg:flex items-center justify-between mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span className="text-sm text-muted-foreground">
                Showing {visibleProducts.length} of {filteredProducts.length} products
              </span>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-background border-border">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border z-50">
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            {/* Products Grid */}
            <AnimatePresence mode="wait">
              {filteredProducts.length > 0 ? (
                <>
                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {visibleProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="cursor-pointer bg-muted/20 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        <div className="relative aspect-square overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            loading="lazy"
                          />
                          
                          {/* Wishlist Icon */}
                          <motion.button
                            className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus-luxury"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ opacity: 1, scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle wishlist toggle
                            }}
                            aria-label="Add to wishlist"
                          >
                            <Heart className="w-4 h-4" />
                          </motion.button>

                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex flex-col gap-2">
                            {product.isNew && (
                              <Badge variant="secondary" className="text-xs">NEW</Badge>
                            )}
                            {product.isSale && (
                              <Badge variant="destructive" className="text-xs">SALE</Badge>
                            )}
                          </div>

                          {/* Quick View & Add to Cart on Hover */}
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            whileHover={{ opacity: 1, y: 0 }}
                          >
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                className="flex-1 bg-white/20 backdrop-blur-sm text-white border-white/20 hover:bg-white/30"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleQuickView(product);
                                }}
                              >
                                Quick View
                              </Button>
                              <Button 
                                size="sm" 
                                className="btn-luxury"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Handle add to cart
                                }}
                              >
                                Add to Cart
                              </Button>
                            </div>
                          </motion.div>
                        </div>

                        {/* Product Info */}
                        <div className="p-4">
                          <div className="mb-2">
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                              {product.category}
                            </span>
                          </div>

                          <h3 className="font-semibold text-lg mb-2 text-foreground">
                            {product.name}
                          </h3>

                          {/* Rating */}
                          {product.rating && (
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-3 h-3 ${
                                      i < Math.floor(product.rating!) 
                                        ? 'fill-yellow-400 text-yellow-400' 
                                        : 'text-gray-300'
                                    }`} 
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {product.rating} ({product.reviews} reviews)
                              </span>
                            </div>
                          )}

                          {/* Price */}
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xl font-bold text-foreground">
                              ${product.price}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>

                          {/* Color Options Preview */}
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Colors:</span>
                            <div className="flex gap-1">
                              {product.colors.slice(0, 3).map((color, colorIndex) => (
                                <div
                                  key={colorIndex}
                                  className="w-4 h-4 rounded-full border border-border"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                              {product.colors.length > 3 && (
                                <span className="text-xs text-muted-foreground">
                                  +{product.colors.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Load More Button */}
                  {hasMoreProducts && (
                    <motion.div 
                      className="text-center mt-12"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      <Button 
                        onClick={loadMoreProducts}
                        disabled={isLoading}
                        className="btn-luxury px-8 py-3"
                      >
                        {isLoading ? 'Loading...' : 'Load More Products'}
                      </Button>
                    </motion.div>
                  )}
                </>
              ) : (
                <motion.div 
                  className="text-center py-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-lg font-medium text-foreground mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search terms.
                  </p>
                  <Button onClick={clearFilters} className="btn-luxury">Clear all filters</Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal 
        product={quickViewProduct}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
      />

      <Footer />
    </div>
  );
};

export default Products;
