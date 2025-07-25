import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { usePrintfulCart } from '@/contexts/PrintfulCartContext';

const PrintfulCartIcon: React.FC = () => {
  const { state, dispatch } = usePrintfulCart();

  return (
    <motion.button
      className="relative p-2 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent text-white bg-transparent hover:bg-black hover:border-white border border-transparent"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => dispatch({ type: 'TOGGLE_CART' })}
      aria-label="Shopping cart"
    >
      <ShoppingBag className="w-5 h-5" />
      {state.itemCount > 0 && (
        <motion.span
          className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        >
          {state.itemCount > 99 ? '99+' : state.itemCount}
        </motion.span>
      )}
    </motion.button>
  );
};

export default PrintfulCartIcon;