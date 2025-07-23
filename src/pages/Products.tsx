import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, Grid, List, Search } from 'lucide-react';
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

// Enhanced mock product data
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
];

const categories = ['All', 'T-Shirts', 'Polos', 'Sweaters', 'Shirts'];
const colorOptions = [
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Navy', value: '#000080' },
  { name: 'Gray', value: '#808080' },
  { name: 'Brown', value: '#8B4513' },
  { name: 'Red', value: '#FF0000' },
  { name: 'Green', value: '#228B22' },
];
const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL'];
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Highest Rated' },
];

const Products = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = useMemo(() => {
    let filtered = [...mockProducts];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
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
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Featured - keep original order
        break;
    }

    return filtered;
  }, [selectedCategory, selectedColors, selectedSizes, priceRange, sortBy, searchQuery]);

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceRange([0, 500]);
    setSearchQuery('');
  };

  const activeFiltersCount = 
    (selectedCategory !== 'All' ? 1 : 0) +
    selectedColors.length +
    selectedSizes.length +
    (priceRange[0] !== 0 || priceRange[1] !== 500 ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentSection="products" />
      
      {/* Header */}
      <motion.div 
        className="pt-20 pb-8 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">All Products</h1>
              <p className="text-muted-foreground mt-2">
                Discover our complete collection of premium men's fashion
              </p>
            </div>
            
            {/* Search and View Mode */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <motion.div 
            className={`w-80 flex-shrink-0 ${showFilters ? 'block' : 'hidden'} lg:block`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card rounded-lg border p-6 sticky top-24">
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
            {/* Toolbar */}
            <motion.div 
              className="flex items-center justify-between mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
                <span className="text-sm text-muted-foreground">
                  {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                </span>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-background border border-border">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border z-50">
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            {/* Products */}
            <AnimatePresence mode="wait">
              {filteredProducts.length > 0 ? (
                <motion.div 
                  className={`grid gap-6 ${
                    viewMode === 'grid' 
                      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                      : 'grid-cols-1'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="cursor-pointer"
                    >
                      <ProductCard product={product} index={index} />
                    </motion.div>
                  ))}
                </motion.div>
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
                  <Button onClick={clearFilters}>Clear all filters</Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
