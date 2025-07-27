import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePrintfulCart } from '@/contexts/PrintfulCartContext';

const PrintfulCartDrawer: React.FC = () => {
  const { state, dispatch } = usePrintfulCart();

  const updateQuantity = (productId: number, variantId: number, quantity: number) => {
    dispatch({ 
      type: 'UPDATE_QUANTITY', 
      payload: { productId, variantId, quantity } 
    });
  };

  const removeItem = (productId: number, variantId: number) => {
    dispatch({ 
      type: 'REMOVE_ITEM', 
      payload: { productId, variantId } 
    });
  };

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white border-l border-gray-200 z-50 shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 id="cart-title" className="text-lg font-semibold text-gray-900">
                  Shopping Cart ({state.itemCount})
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeCart}
                  aria-label="Close cart"
                  className="h-8 w-8 p-0 hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {state.items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <ShoppingBag className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 mb-2">Your cart is empty</p>
                    <p className="text-sm text-gray-400">Add some products to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {state.items.map((item) => (
                      <motion.div
                        key={`${item.productId}-${item.variantId}`}
                        className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-start space-x-4">
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            <img
                              src={item.image || '/placeholder.svg'}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg bg-gray-200"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/placeholder.svg';
                              }}
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 truncate">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              ${item.price} each
                            </p>
                          </div>

                          {/* Remove Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.productId, item.variantId)}
                            aria-label={`Remove ${item.name} from cart`}
                            className="h-8 w-8 p-0 text-gray-400 hover:text-red-500 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity"
                              className="h-8 w-8 p-0 border-gray-300"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="h-8 w-8 p-0 border-gray-300"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {state.items.length > 0 && (
                <div className="border-t border-gray-200 p-6 space-y-4">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total:</span>
                    <span className="text-black">${state.total.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PrintfulCartDrawer;