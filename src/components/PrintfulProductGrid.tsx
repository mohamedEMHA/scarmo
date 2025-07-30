import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, AlertCircle, Loader2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { apiService, PrintfulProduct, CartItem } from '@/services/api';
import { usePrintfulCart } from '@/contexts/PrintfulCartContext';
import { toast } from 'sonner';

const PrintfulProductGrid: React.FC = () => {
  const [products, setProducts] = useState<PrintfulProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { dispatch } = usePrintfulCart();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getProducts();
      if (response.code === 200) {
        setProducts(response.result);
      } else {
        throw new Error(response.error?.message || 'Failed to load products');
      }
    } catch (err) {
      console.error('Error loading products:', err);
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product: PrintfulProduct, variantIndex: number = 0) => {
    const variant = product.variants[variantIndex];
    
    if (!variant || !variant.in_stock) {
      toast.error('This item is currently out of stock');
      return;
    }

    const cartItem: CartItem = {
      productId: product.id,
      variantId: variant.id,
      name: `${product.title} - ${variant.name}`,
      price: variant.price,
      quantity: 1,
      image: product.image,
    };

    dispatch({ type: 'ADD_ITEM', payload: cartItem });
    toast.success(`Added ${product.title} to cart`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-accent" />
          <p className="text-muted-foreground">Loading products from Printful...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Failed to Load Products</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={loadProducts} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">No Products Found</h3>
          <p className="text-muted-foreground">
            No products are currently available in your Printful store.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-background">
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
            Latest Collection
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Premium streetwear directly from our Printful catalog
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          <AnimatePresence>
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                  
                  {/* Stock Badge */}
                  {product.variants.length > 0 && (
                    <div className="absolute top-3 left-3">
                      <Badge 
                        variant={product.variants[0].in_stock ? "secondary" : "destructive"}
                        className="text-xs"
                      >
                        {product.variants[0].in_stock ? 'In Stock' : 'Out of Stock'}
                      </Badge>
                    </div>
                  )}

                  {/* Quick Add Button */}
                  <motion.div
                    className="absolute bottom-4 left-4 right-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      onClick={() => addToCart(product)}
                      disabled={!product.variants[0]?.in_stock}
                      className="w-full bg-black text-white hover:bg-gray-800 transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </motion.div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-gray-900 group-hover:text-black transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 truncate">{product.description}</p>

                  {/* Price Range */}
                  {product.variants.length > 0 && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {product.variants.length === 1 ? (
                          <span className="text-xl font-bold text-black">
                            ${product.variants[0].price}
                          </span>
                        ) : (
                          <span className="text-xl font-bold text-black">
                            From ${Math.min(...product.variants.map(v => parseFloat(v.price)))}
                          </span>
                        )}
                        <span className="text-sm text-gray-500 uppercase">
                          {product.variants[0].currency}
                        </span>
                      </div>
                      
                      {/* Variant Count */}
                      {product.variants.length > 1 && (
                        <span className="text-xs text-gray-500">
                          {product.variants.length} variants
                        </span>
                      )}
                    </div>
                  )}

                  {/* Variants Preview */}
                  {product.variants.length > 1 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {product.variants.slice(0, 3).map((variant, idx) => (
                        <button
                          key={variant.id}
                          onClick={() => addToCart(product, idx)}
                          disabled={!variant.in_stock}
                          className="text-xs px-2 py-1 border border-gray-200 rounded hover:border-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title={`${variant.name} - $${variant.price}`}
                        >
                          ${variant.price}
                        </button>
                      ))}
                      {product.variants.length > 3 && (
                        <span className="text-xs text-gray-500 px-2 py-1">
                          +{product.variants.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Refresh Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Button
            onClick={loadProducts}
            variant="outline"
            className="border-black text-black hover:bg-black hover:text-white transition-colors"
          >
            Refresh Products
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PrintfulProductGrid;