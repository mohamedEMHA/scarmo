import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { t, getCurrentLanguage, isRTL } from '@/lib/i18n';

interface NavigationProps {
  currentSection: string;
}

const Navigation = ({ currentSection }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { state, dispatch } = useCart();
  const currentLang = getCurrentLanguage();
  const isRtl = isRTL();

  const navItems = [
    { id: 'hero', label: t('nav.home') },
    { id: 'tshirts', label: t('nav.tshirts') },
    { id: 'polos', label: t('nav.polos') },
    { id: 'sweaters', label: t('nav.sweaters') },
    { id: 'shirts', label: t('nav.shirts') },
    { id: 'about', label: t('nav.about') },
    { id: 'contact', label: t('nav.contact') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg'
          : 'bg-transparent'
      } ${isRtl ? 'rtl' : 'ltr'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-accent to-accent/80 rounded-lg flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-sm">S</span>
            </div>
            <span className={`font-bold text-xl lg:text-2xl transition-colors duration-300 ${
              isScrolled ? 'text-foreground' : 'text-white'
            }`}>
              SCARMO
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 font-medium transition-colors duration-300 focus-luxury ${
                  currentSection === item.id
                    ? isScrolled
                      ? 'text-accent'
                      : 'text-accent'
                    : isScrolled
                    ? 'text-foreground hover:text-accent'
                    : 'text-white/90 hover:text-white'
                }`}
                aria-label={`Navigate to ${item.label} section`}
              >
                {item.label}
                {currentSection === item.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                    layoutId="activeTab"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Shopping Bag & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <motion.button
              className={`relative p-2 rounded-lg transition-colors duration-300 focus-luxury ${
                isScrolled
                  ? 'text-foreground hover:bg-muted'
                  : 'text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              aria-label="Shopping bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {state.items.length > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                >
                  {state.items.reduce((total, item) => total + item.quantity, 0)}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors duration-300 focus-luxury ${
                isScrolled
                  ? 'text-foreground hover:bg-muted'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className={`lg:hidden overflow-hidden ${
            isMobileMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
          }`}
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col space-y-2 pt-4 border-t border-border/20">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-left px-4 py-3 rounded-lg font-medium transition-colors duration-300 focus-luxury ${
                  currentSection === item.id
                    ? 'bg-accent text-accent-foreground'
                    : isScrolled
                    ? 'text-foreground hover:bg-muted'
                    : 'text-white hover:bg-white/10'
                }`}
                aria-label={`Navigate to ${item.label} section`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navigation;