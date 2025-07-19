import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { t } from '@/lib/i18n';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  colors: string[];
  sizes: string[];
  isNew?: boolean;
  isSale?: boolean;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isFavorited, setIsFavorited] = useState(false);
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
    });
  };

  return (
    <motion.div
      className="card-luxury group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500"
          animate={{ scale: isHovered ? 1.1 : 1 }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-accent text-accent-foreground px-2 py-1 text-xs font-medium rounded">
              NEW
            </span>
          )}
          {product.isSale && (
            <span className="bg-destructive text-destructive-foreground px-2 py-1 text-xs font-medium rounded">
              SALE
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <motion.div
          className="absolute top-3 right-3 flex flex-col gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            className={`p-2 rounded-full backdrop-blur-sm transition-colors duration-300 focus-luxury ${
              isFavorited
                ? 'bg-accent text-accent-foreground'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
            onClick={() => setIsFavorited(!isFavorited)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </motion.button>

          <motion.button
            className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors duration-300 focus-luxury"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Quick view product"
          >
            <Eye className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Add to Cart Button */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
        >
          <button 
            onClick={handleAddToCart}
            className="w-full btn-luxury flex items-center justify-center gap-2 focus-luxury"
          >
            <ShoppingCart className="w-4 h-4" />
            {t('products.addToCart')}
          </button>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {product.category}
          </span>
        </div>

        <h3 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors duration-300">
          {product.name}
        </h3>

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

        {/* Color Options */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm text-muted-foreground">Colors:</span>
          <div className="flex gap-1">
            {product.colors.map((color) => (
              <button
                key={color}
                className={`w-5 h-5 rounded-full border-2 transition-all duration-300 focus-luxury ${
                  selectedColor === color
                    ? 'border-accent scale-110'
                    : 'border-border hover:border-accent/50'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
                aria-label={`Select ${color} color`}
              />
            ))}
          </div>
        </div>

        {/* Size Options */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sizes:</span>
          <div className="flex gap-1">
            {product.sizes.map((size) => (
              <span
                key={size}
                className="text-xs px-2 py-1 border border-border rounded text-muted-foreground"
              >
                {size}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;