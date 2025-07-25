import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';

const fetchProducts = async ({ pageParam = 0 }) => {
  const res = await fetch(`/api/products?page=${pageParam}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

const ViewAll = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const products = data?.pages.flatMap((page) => page.items) ?? [];

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) =>
      category === 'all' ? true : product.type.toLowerCase() === category
    );

  const categories = [
    ...new Set(products.map((product) => product.type.toLowerCase())),
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navigation currentSection="view-all" forceSolidBg={true} />
      <main className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif text-center mb-4">
            All Products
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-12"></div>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {status === 'loading' ? (
            <p>Loading...</p>
          ) : status === 'error' ? (
            <p>Error: {error.message}</p>
          ) : (
            <>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    whileHover={{
                      borderColor: 'var(--accent)',
                      borderWidth: '2px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    }}
                  >
                    <Link to={`/product/${product.id}`}>
                      <Card className="bg-white rounded-lg shadow-md p-4 h-full">
                        <CardContent>
                          <img
                            src={product.thumbnail_url}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-md mb-4"
                          />
                          <h3 className="text-lg font-semibold">{product.name}</h3>
                          <p className="text-gray-500">${product.retail_price}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
              <div className="mt-12 text-center">
                <Button
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {isFetchingNextPage
                    ? 'Loading more...'
                    : hasNextPage
                    ? 'Load More'
                    : 'Nothing more to load'}
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default ViewAll;
