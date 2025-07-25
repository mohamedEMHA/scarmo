import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, ChevronDown, User } from 'lucide-react';
import FocusTrap from 'focus-trap-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { usePrintfulCart } from '@/contexts/PrintfulCartContext';
import PrintfulCartIcon from '@/components/PrintfulCartIcon';
import { t, getCurrentLanguage, isRTL } from '@/lib/i18n';
import AuthModal from './AuthModal';

interface NavigationProps {
  currentSection: string;
  forceSolidBg?: boolean;
}

const Navigation = ({ currentSection, forceSolidBg = false }: NavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(forceSolidBg);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);
  const [isMobileCollectionOpen, setIsMobileCollectionOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; tab: 'login' | 'signup' }>({
    isOpen: false,
    tab: 'login'
  });
  const logoRef = useRef<HTMLDivElement>(null);
  const [logoWidth, setLogoWidth] = useState(0);
  
  const { state, dispatch } = useCart();
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const printfulCart = usePrintfulCart();
  const currentLang = getCurrentLanguage();
  const isRtl = isRTL();

  // All hooks must be called before any conditional returns
  useEffect(() => {
    if (forceSolidBg) return;
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [forceSolidBg]);

  // Close mobile menu when clicking outside or pressing escape
  useEffect(() => {
    if (isMobileMenuOpen) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMobileMenuOpen(false);
          setIsMobileCollectionOpen(false);
        }
      };
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (logoRef.current) {
      setLogoWidth(logoRef.current.offsetWidth);
    }
  }, [logoRef]);

  // Don't render auth-dependent UI until auth is loaded
  if (isLoading) {
    return null;
  }

  const navItems = [
    { id: 'hero', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'contact', label: t('nav.contact') },
  ];

  const collectionItems = [
    { id: 'tshirts', label: t('nav.tshirts') },
    { id: 'sweaters', label: t('nav.sweaters') },
    { id: 'belts', label: t('nav.belts') },
    { id: 'neckties', label: t('nav.neckties') },
    { id: 'longSleeves', label: t('nav.longSleeves') },
    { id: 'shoes', label: t('nav.shoes') },
    { id: 'backpacks', label: t('nav.backpacks') },
    { id: 'underwear', label: t('nav.underwear') },
    { id: 'viewAll', label: t('nav.viewAll') },
  ].sort((a, b) => {
    const order = [
      'tshirts',
      'sweaters',
      'belts',
      'neckties',
      'longSleeves',
      'shoes',
      'backpacks',
      'underwear',
      'viewAll',
    ];
    return order.indexOf(a.id) - order.indexOf(b.id);
  });

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
    setIsMobileCollectionOpen(false);
  };

  const handleViewAllProducts = () => {
    navigate('/products');
    setIsCollectionOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileCollectionOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileCollectionOpen(false);
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
            ref={logoRef}
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <span className={`font-serif text-2xl italic lg:text-2xl transition-colors duration-300 ${
              isScrolled ? 'text-foreground' : 'text-white'
            }`}>
              SCARMO
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Home Button */}
            <button
              onClick={() => scrollToSection('hero')}
              className={`relative px-4 py-2 font-medium transition-colors duration-300 focus-luxury ${
                currentSection === 'hero'
                  ? isScrolled
                    ? 'text-accent'
                    : 'text-accent'
                  : isScrolled
                  ? 'text-foreground hover:text-accent'
                  : 'text-white/90 hover:text-white'
              }`}
              aria-label={`Navigate to ${t('nav.home')} section`}
            >
              {t('nav.home')}
              {currentSection === 'hero' && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  layoutId="activeTab"
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>

            {/* Collection Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsCollectionOpen(true)}
              onMouseLeave={() => setIsCollectionOpen(false)}
            >
              <button
                className={`relative px-4 py-2 font-medium transition-colors duration-300 focus-luxury flex items-center space-x-1 ${
                  collectionItems.some(item => currentSection === item.id)
                    ? isScrolled
                      ? 'text-accent'
                      : 'text-accent'
                    : isScrolled
                    ? 'text-foreground hover:text-accent'
                    : 'text-white/90 hover:text-white'
                }`}
                aria-haspopup="true"
                aria-expanded={isCollectionOpen}
              >
                <span>{t('nav.collection')}</span>
                <motion.div
                  animate={{ rotate: isCollectionOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isCollectionOpen && (
                  <motion.div
                    className="absolute top-full left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ul className="list-none bg-white rounded-xl shadow-lg p-2 z-50 flex justify-center space-x-4 px-4 max-w-full">
                      {collectionItems.map((item) => (
                        <li key={item.id} className="flex-shrink-0">
                          <button
                            onClick={() => {
                              if (item.id === 'viewAll') {
                                handleViewAllProducts();
                              } else {
                                scrollToSection(item.id);
                              }
                              setIsCollectionOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 focus-luxury hover:bg-gray-100 ${
                              currentSection === item.id
                                ? 'bg-accent text-accent-foreground'
                                : 'text-foreground'
                            }`}
                          >
                            {item.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* About and Contact */}
            <button
              onClick={() => scrollToSection('about')}
              className={`relative px-4 py-2 font-medium transition-colors duration-300 focus-luxury ${
                currentSection === 'about'
                  ? isScrolled
                    ? 'text-accent'
                    : 'text-accent'
                  : isScrolled
                  ? 'text-foreground hover:text-accent'
                  : 'text-white/90 hover:text-white'
              }`}
              aria-label={`Navigate to ${t('nav.about')} section`}
            >
              {t('nav.about')}
              {currentSection === 'about' && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  layoutId="activeTab"
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className={`relative px-4 py-2 font-medium transition-colors duration-300 focus-luxury ${
                currentSection === 'contact'
                  ? isScrolled
                    ? 'text-accent'
                    : 'text-accent'
                  : isScrolled
                  ? 'text-foreground hover:text-accent'
                  : 'text-white/90 hover:text-white'
              }`}
              aria-label={`Navigate to ${t('nav.contact')} section`}
            >
              {t('nav.contact')}
              {currentSection === 'contact' && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  layoutId="activeTab"
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          </div>

          {/* Auth, Shopping Bag & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Auth Section */}
            {isAuthenticated ? (
              <div className="relative hidden lg:block">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-300 focus-luxury ${
                    isScrolled
                      ? 'text-foreground hover:bg-muted'
                      : 'text-white hover:bg-white/10'
                  }`}
                  aria-haspopup="true"
                  aria-expanded={isProfileOpen}
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">Welcome, {user?.name}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      className="absolute top-full right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-luxury overflow-hidden z-50"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 text-foreground hover:bg-muted transition-colors duration-200 focus-luxury"
                      >
                        {t('auth.logout')}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-3">
                <button
                  onClick={() => setAuthModal({ isOpen: true, tab: 'login' })}
                  className={`px-4 py-2 font-medium transition-colors duration-300 focus-luxury ${
                    isScrolled
                      ? 'text-foreground hover:text-accent'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {t('auth.login')}
                </button>
                <button
                  onClick={() => setAuthModal({ isOpen: true, tab: 'signup' })}
                  className={`px-4 py-2 font-medium rounded-lg transition-colors duration-300 focus-luxury ${
                    isScrolled
                      ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {t('auth.signup')}
                </button>
              </div>
            )}
            
            {/* Printful Cart Icon */}
            <div className={isScrolled ? 'text-foreground' : 'text-white'}>
              <PrintfulCartIcon />
            </div>

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


        {/* Auth Modal */}
        <AnimatePresence>
          {authModal.isOpen && (
            <AuthModal
              isOpen={authModal.isOpen}
              onClose={() => setAuthModal({ isOpen: false, tab: 'login' })}
              initialTab={authModal.tab}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Navigation Overlay and Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMobileMenu}
            />

            <FocusTrap active={isMobileMenuOpen}>
              <motion.div
                className="fixed top-0 right-0 h-auto w-[25vw] max-w-md bg-[#F3F4F6] shadow-lg z-50 lg:hidden flex flex-col rounded-l-xl"
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                style={{ zIndex: 50 }}
                role="dialog"
                aria-modal="true"
                aria-label="Main menu"
              >
                {/* Header */}
                <div className="flex items-center justify-between h-16 px-6 bg-transparent flex-shrink-0">
                  <span className="font-semibold text-lg">MENU</span>
                  <button
                    onClick={closeMobileMenu}
                    className="p-2 rounded-md hover:bg-black/10 transition-colors"
                    aria-label="Close mobile menu"
                    tabIndex={0}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Menu Items */}
                <div className="p-4 space-y-2 overflow-y-auto">
                  {/* Home */}
                  <button
                    onClick={() => scrollToSection('hero')}
                    className={`w-full text-left px-6 py-4 text-lg font-medium transition-colors duration-300 focus-luxury ${
                      currentSection === 'hero'
                        ? 'bg-accent text-accent-foreground'
                        : 'text-foreground hover:bg-muted/50'
                    }`}
                    aria-label={`Navigate to ${t('nav.home')} section`}
                  >
                    {t('nav.home')}
                  </button>

                  {/* Collection */}
                  <div>
                    <button
                      onClick={() => setIsMobileCollectionOpen(!isMobileCollectionOpen)}
                      className="w-full text-left px-6 py-4 text-lg font-medium transition-colors duration-300 focus-luxury text-foreground hover:bg-muted/50 flex items-center justify-between"
                      aria-haspopup="true"
                      aria-expanded={isMobileCollectionOpen}
                    >
                      <span>{t('nav.collection')}</span>
                      <motion.div
                        animate={{ rotate: isMobileCollectionOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isMobileCollectionOpen && (
                        <motion.div
                          className="ml-6 mt-2 space-y-1"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                          {collectionItems.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => {
                                if (item.id === 'viewAll') {
                                  handleViewAllProducts();
                                } else {
                                  scrollToSection(item.id);
                                }
                              }}
                              className={`w-full text-left px-6 py-3 rounded-lg text-base font-medium transition-colors duration-300 focus-luxury ${
                                currentSection === item.id
                                  ? 'bg-accent/80 text-accent-foreground'
                                  : 'text-foreground/80 hover:bg-muted/50'
                              }`}
                              aria-label={`Navigate to ${item.label} section`}
                            >
                              {item.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* About */}
                  <button
                    onClick={() => scrollToSection('about')}
                    className={`w-full text-left px-6 py-4 text-lg font-medium transition-colors duration-300 focus-luxury ${
                      currentSection === 'about'
                        ? 'bg-accent text-accent-foreground'
                        : 'text-foreground hover:bg-muted/50'
                    }`}
                    aria-label={`Navigate to ${t('nav.about')} section`}
                  >
                    {t('nav.about')}
                  </button>

                  {/* Contact */}
                  <button
                    onClick={() => scrollToSection('contact')}
                    className={`w-full text-left px-6 py-4 text-lg font-medium transition-colors duration-300 focus-luxury ${
                      currentSection === 'contact'
                        ? 'bg-accent text-accent-foreground'
                        : 'text-foreground hover:bg-muted/50'
                    }`}
                    aria-label={`Navigate to ${t('nav.contact')} section`}
                  >
                    {t('nav.contact')}
                  </button>

                  {/* Auth Section */}
                  {!isAuthenticated ? (
                    <div className="pt-4 border-t border-border/80 space-y-8">
                      <button
                        onClick={() => {
                          setAuthModal({ isOpen: true, tab: 'login' });
                          closeMobileMenu();
                        }}
                        className="w-full text-left px-6 py-4 text-lg font-medium transition-colors duration-300 focus-luxury text-foreground hover:bg-muted/50"
                      >
                        {t('auth.login')}
                      </button>
                      <button
                        onClick={() => {
                          setAuthModal({ isOpen: true, tab: 'signup' });
                          closeMobileMenu();
                        }}
                        className="w-full text-left px-6 py-4 text-lg font-medium transition-colors duration-300 focus-luxury bg-accent text-accent-foreground hover:bg-accent/90"
                      >
                        {t('auth.signup')}
                      </button>
                    </div>
                  ) : (
                    <div className="pt-4 border-t border-border/80">
                      <p className="px-6 py-3 text-base font-medium text-foreground/70">
                        Welcome, {user?.name}
                      </p>
                      <button
                        onClick={() => {
                          logout();
                          closeMobileMenu();
                        }}
                        className="w-full text-left px-6 py-4 text-lg font-medium transition-colors duration-300 focus-luxury text-foreground hover:bg-muted/50"
                      >
                        {t('auth.logout')}
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            </FocusTrap>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;