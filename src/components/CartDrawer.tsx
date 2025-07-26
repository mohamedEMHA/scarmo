import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { apiService } from '@/services/api';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CartDrawer = () => {
  const { state, dispatch } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const { sessionId } = await apiService.createCheckoutSession(state.items);
      const stripe = await stripePromise;
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      // You can show a toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border z-50 shadow-luxury"
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
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 id="cart-title" className="text-lg font-semibold text-foreground">
                  Shopping Cart ({state.items.length})
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeCart}
                  aria-label="Close cart"
                  className="h-8 w-8 p-0 hover:bg-muted"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {state.items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                      <svg
                        className="w-8 h-8 text-muted-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </div>
                    <p className="text-muted-foreground mb-2">Your cart is empty</p>
                    <p className="text-sm text-muted-foreground">Start shopping to add items to your cart</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {state.items.map((item) => (
                      <motion.div
                        key={item.id}
                        className="bg-card rounded-2xl p-4 shadow-soft border border-border"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-start space-x-4">
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg bg-muted"
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-foreground truncate">
                              {item.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              ${item.price.toFixed(2)}
                            </p>
                            {(item.size || item.color) && (
                              <div className="flex space-x-2 mt-1">
                                {item.size && (
                                  <span className="text-xs bg-muted px-2 py-1 rounded">
                                    {item.size}
                                  </span>
                                )}
                                {item.color && (
                                  <span className="text-xs bg-muted px-2 py-1 rounded">
                                    {item.color}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Remove Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            aria-label={`Remove ${item.name} from cart`}
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
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
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity"
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="text-sm font-medium text-foreground">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {state.items.length > 0 && (
                <div className="border-t border-border p-6 space-y-4">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total:</span>
                    <span className="text-accent">${state.total.toFixed(2)}</span>
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70"
                    onClick={handleCheckout}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : 'Proceed to Checkout'}
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;