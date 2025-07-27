import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw, 
  Star, 
  Plus, 
  Minus, 
  ChevronLeft,
  ChevronRight,
  ZoomIn
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

// Mock product data (in real app, this would come from API)
const mockProductData = {
  '1': {
    id: '1',
    name: 'Classic Black Tee',
    price: 89,
    originalPrice: 120,
    images: [
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg'
    ],
    category: 'T-Shirts',
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'White', value: '#FFFFFF' },
      { name: 'Gray', value: '#808080' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: true,
    isSale: true,
    description: 'Experience ultimate comfort with our Classic Black Tee. Crafted from premium organic cotton, this versatile piece features a modern fit that\'s perfect for any occasion. The soft, breathable fabric ensures all-day comfort while maintaining its shape wash after wash.',
    features: [
      '100% Organic Cotton',
      'Pre-shrunk for lasting fit',
      'Reinforced shoulder seams',
      'Tagless for comfort',
      'Machine washable'
    ],
    rating: 4.5,
    reviews: 128,
    stock: 15,
    shipping: {
      standard: 'Free standard shipping on orders over $75',
      express: 'Express shipping available for $9.99',
      returns: '30-day free returns'
    }
  },
  // Add more products as needed
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const product = id ? mockProductData[id as keyof typeof mockProductData] : null;

  useEffect(() => {
    if (product && product.colors.length > 0) {
      setSelectedColor(product.colors[0].value);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Button onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: `${product.id}-${selectedColor}-${selectedSize}`,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size: selectedSize,
        color: selectedColor
      }
    });

    toast.success('Added to cart!');
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentSection="products" />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.nav 
            className="flex items-center space-x-2 text-sm text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button onClick={() => navigate('/')} className="hover:text-foreground">
              Home
            </button>
            <span>/</span>
            <button onClick={() => navigate('/products')} className="hover:text-foreground">
              Products
            </button>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </motion.nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Main Image */}
              <div className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <motion.img
                    src={product.images[selectedImageIndex]}
                    alt={product.name}
                    className={`w-full h-full object-cover cursor-zoom-in transition-transform duration-300 ${
                      isZoomed ? 'scale-150' : 'scale-100'
                    }`}
                    onClick={() => setIsZoomed(!isZoomed)}
                    whileHover={{ scale: isZoomed ? 1.5 : 1.05 }}
                  />
                  
                  {/* Image Navigation */}
                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}
                  
                  {/* Zoom Icon */}
                  <div className="absolute top-4 right-4 bg-white/80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="h-4 w-4" />
                  </div>
                </div>

                {/* Thumbnail Gallery */}
                {product.images.length > 1 && (
                  <div className="flex space-x-2 mt-4">
                    {product.images.map((image, index) => (
                      <motion.button
                        key={index}
                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImageIndex === index 
                            ? 'border-primary' 
                            : 'border-transparent hover:border-border'
                        }`}
                        onClick={() => setSelectedImageIndex(index)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <img 
                          src={image} 
                          alt={`${product.name} view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {product.isNew && <Badge variant="secondary">New</Badge>}
                  {product.isSale && <Badge variant="destructive">Sale</Badge>}
                </div>
                <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
                <p className="text-muted-foreground mt-1">{product.category}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-foreground">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <Badge variant="destructive">
                    Save ${product.originalPrice - product.price}
                  </Badge>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Color: {product.colors.find(c => c.value === selectedColor)?.name}
                </Label>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <motion.button
                      key={color.value}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color.value
                          ? 'border-primary ring-2 ring-primary/30'
                          : 'border-border hover:border-primary/50'
                      }`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setSelectedColor(color.value)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Size</Label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full bg-background border border-border">
                    <SelectValue placeholder="Select a size" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border z-50">
                    {product.sizes.map(size => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Quantity</Label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground ml-2">
                    {product.stock} in stock
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <motion.div 
                  className="flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    onClick={handleAddToCart}
                    className="w-full"
                    size="lg"
                  >
                    Add to Cart - ${product.price * quantity}
                  </Button>
                </motion.div>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={isFavorite ? 'text-red-500 border-red-200' : ''}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Shipping Info */}
              <Card>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-green-600" />
                    <span className="text-sm">{product.shipping.standard}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <RotateCcw className="h-5 w-5 text-blue-600" />
                    <span className="text-sm">{product.shipping.returns}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-purple-600" />
                    <span className="text-sm">Secure checkout with SSL encryption</span>
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <div>
                <h3 className="font-semibold mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const Label = ({ children, className, ...props }: { children: React.ReactNode; className?: string }) => (
  <label className={className} {...props}>{children}</label>
);

export default ProductDetail;