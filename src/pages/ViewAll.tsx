import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import debounce from 'lodash.debounce';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Heart,
  Search,
  X,
  SlidersHorizontal,
  Star,
} from 'lucide-react';

const fetchProducts = async ({ pageParam = 0 }) => {
  // In a real app, you'd fetch from an API.
  // We'll simulate with a larger dataset.
  const allProducts = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Product Name ${i + 1}`,
    type: ['T-Shirts', 'Sweaters', 'Belts', 'Neckties', 'Long-Sleeves', 'Shoes', 'Backpacks', 'Underwear'][i % 8],
    price: parseFloat((Math.random() * (200 - 20) + 20).toFixed(2)),
    originalPrice: parseFloat((Math.random() * (250 - 25) + 25).toFixed(2)),
    colors: [{ name: 'Red', hex: '#ff0000' }, { name: 'Blue', hex: '#0000ff' }, { name: 'Green', hex: '#008000' }, { name: 'Yellow', hex: '#ffff00' }, { name: 'Orange', hex: '#ffa500' }][i % 5],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'].slice(i % 3, (i % 3) + 3),
    rating: parseFloat((Math.random() * (5 - 3) + 3).toFixed(1)),
    reviews: Math.floor(Math.random() * 200),
    newest: i > 80,
    bestSeller: i % 4 === 0,
    imageUrl: `https://picsum.photos/400/500?random=${i}`,
    gallery: [
      `https://picsum.photos/600/700?random=${i * 2}`,
      `https://picsum.photos/600/700?random=${i * 3}`,
      `https://picsum.photos/600/700?random=${i * 4}`,
    ]
  }));

  const itemsPerPage = 12;
  const start = pageParam * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = allProducts.slice(start, end);

  return new Promise(resolve => setTimeout(() => resolve({
    items: pageItems,
    nextPage: end < allProducts.length ? pageParam + 1 : undefined,
  }), 500));
};

const categories = ['T-Shirts', 'Sweaters', 'Belts', 'Neckties', 'Long-Sleeves', 'Shoes', 'Backpacks', 'Underwear'];
const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
const colors = [
  { name: 'Red', hex: '#ff0000' },
  { name: 'Blue', hex: '#0000ff' },
  { name: 'Green', hex: '#008000' },
  { name: 'Yellow', hex: '#ffff00' },
  { name: 'Orange', hex: '#ffa500' },
];

const ProductCard = ({ product }) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  return (
    <>
      <motion.div
        className="relative group bg-white rounded-2xl shadow-lg overflow-hidden"
        layout
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute top-2 right-2 z-10">
          <Button variant="ghost" size="icon" className="rounded-full bg-white/50 backdrop-blur-sm hover:bg-white">
            <Heart className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
        <div className="overflow-hidden aspect-w-1 aspect-h-1">
          <motion.img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold truncate">{product.name}</h3>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-lg font-bold text-red-600">${product.price}</p>
            <p className="text-sm text-gray-500 line-through">${product.originalPrice}</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out bg-gradient-to-t from-black/50 to-transparent">
          <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Add to Cart</Button>
          <Button variant="outline" className="w-full mt-2 bg-white/90" onClick={() => setIsQuickViewOpen(true)}>Quick View</Button>
        </div>
      </motion.div>
      <AnimatePresence>
        {isQuickViewOpen && (
          <QuickViewModal product={product} onClose={() => setIsQuickViewOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

const QuickViewModal = ({ product, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <div className="w-1/2">
          <img src={product.gallery[0]} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="w-1/2 p-8 overflow-y-auto">
          <h2 className="text-3xl font-serif mb-2">{product.name}</h2>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => <Star key={i} className={`h-5 w-5 ${i < Math.round(product.rating) ? 'fill-current' : ''}`} />)}
            </div>
            <a href="#reviews" className="text-sm text-gray-500 hover:underline">({product.reviews} reviews)</a>
          </div>
          <p className="text-2xl font-bold mb-4">${product.price}</p>
          <p className="text-gray-600 mb-6">Some placeholder details about the product's features, material, and fit.</p>
          {/* Add more details like color/size selectors, add to cart, etc. */}
          <Button onClick={onClose} variant="ghost" className="absolute top-4 right-4">
            <X />
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Filters = ({ setFilters, isSidebar = false }) => {
  const [price, setPrice] = useState([0, 250]);

  const handlePriceChange = debounce((newPrice) => {
    setFilters(prev => ({ ...prev, price: newPrice }));
  }, 300);

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      category: 'All',
      sort: 'Newest',
      colors: [],
      sizes: [],
      price: [0, 250],
    });
    setPrice([0, 250]);
  };

  const FilterSection = ({ title, children }) => (
    <div className="py-4 border-b border-gray-200">
      <h4 className="font-semibold mb-3">{title}</h4>
      {children}
    </div>
  );

  return (
    <div className={`${isSidebar ? 'space-y-4' : 'flex items-center space-x-2 overflow-x-auto py-2'}`}>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Filters</h3>
        <Button variant="ghost" onClick={clearFilters}>Clear All</Button>
      </div>

      <FilterSection title="Sort By">
        <Select onValueChange={(value) => setFilters(prev => ({ ...prev, sort: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Newest">Newest</SelectItem>
            <SelectItem value="Price Low→High">Price Low→High</SelectItem>
            <SelectItem value="Price High→Low">Price High→Low</SelectItem>
            <SelectItem value="Best Sellers">Best Sellers</SelectItem>
          </SelectContent>
        </Select>
      </FilterSection>

      <FilterSection title="Category">
        <div className="flex flex-wrap gap-2">
          {['All', ...categories].map(cat => (
            <Button key={cat} variant="outline" onClick={() => setFilters(prev => ({ ...prev, category: cat }))}>{cat}</Button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price Range">
        <Slider
          defaultValue={[0, 250]}
          max={250}
          step={10}
          onValueChange={handlePriceChange}
        />
        <div className="flex justify-between text-sm mt-2">
          <span>${price[0]}</span>
          <span>${price[1]}</span>
        </div>
      </FilterSection>

      <FilterSection title="Colors">
        <div className="flex flex-wrap gap-2">
          {colors.map(color => (
            <button key={color.name} className="w-8 h-8 rounded-full border" style={{ backgroundColor: color.hex }} onClick={() => setFilters(prev => ({ ...prev, colors: [...prev.colors, color.name] }))} />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Sizes">
        <div className="flex flex-wrap gap-2">
          {sizes.map(size => (
            <Button key={size} variant="outline" onClick={() => setFilters(prev => ({ ...prev, sizes: [...prev.sizes, size] }))}>{size}</Button>
          ))}
        </div>
      </FilterSection>
    </div>
  );
};

const ViewAll = () => {
  const [filters, setFilters] = useState({
    searchTerm: '',
    category: 'All',
    sort: 'Newest',
    colors: [],
    sizes: [],
    price: [0, 250],
  });

  const { ref, inView } = useInView();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['products', filters],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const products = useMemo(() => data?.pages.flatMap(page => page.items) ?? [], [data]);

  const handleSearchChange = debounce((e) => {
    setFilters(prev => ({ ...prev, searchTerm: e.target.value }));
  }, 300);

  return (
    <div className="bg-gray-50">
      <Navigation currentSection="view-all" forceSolidBg={true} />
      <main className="container mx-auto px-4 lg:px-8 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/collection/view-all">Collection</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>All Products</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search all products..."
            className="pl-12 py-6 rounded-full border-2 border-transparent focus:border-accent transition-all w-full"
            onChange={handleSearchChange}
          />
          {filters.searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full"
              onClick={() => setFilters(prev => ({ ...prev, searchTerm: ''}))}
            >
              <X />
            </Button>
          )}
        </div>

        <div className="lg:hidden mb-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters & Sort
              </Button>
            </SheetTrigger>
            <SheetContent>
              <Filters setFilters={setFilters} isSidebar={true} />
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-1/4 bg-white p-6 rounded-2xl shadow-lg self-start">
            <Filters setFilters={setFilters} isSidebar={true} />
          </aside>
          <div className="w-full lg:w-3/4">
            {status === 'loading' ? (
              <p>Loading...</p>
            ) : status === 'error' ? (
              <p>Error: {error.message}</p>
            ) : (
              <>
                <AnimatePresence>
                  <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </motion.div>
                </AnimatePresence>
                <div ref={ref} className="mt-12 text-center">
                  {isFetchingNextPage ? (
                    <p>Loading more...</p>
                  ) : hasNextPage ? (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                       <Button onClick={() => fetchNextPage()} className="bg-accent text-accent-foreground hover:bg-accent/90">
                         Load More
                       </Button>
                     </motion.div>
                  ) : (
                    <p>You've seen it all!</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default ViewAll;
