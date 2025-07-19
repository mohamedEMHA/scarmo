import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ProductGallery from '@/components/ProductGallery';
import AboutSection from '@/components/AboutSection';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import CartDrawer from '@/components/CartDrawer';
import { CartProvider } from '@/contexts/CartContext';
import { isRTL, getCurrentLanguage } from '@/lib/i18n';

const Index = () => {
  const [currentSection, setCurrentSection] = useState('hero');
  const currentLang = getCurrentLanguage();
  const isRtl = isRTL();

  // Apply RTL class to document
  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [isRtl, currentLang]);

  // Section observers for navigation highlighting
  const [heroRef, heroInView] = useInView({ threshold: 0.3 });
  const [tshirtsRef, tshirtsInView] = useInView({ threshold: 0.3 });
  const [polosRef, polosInView] = useInView({ threshold: 0.3 });
  const [sweatersRef, sweatersInView] = useInView({ threshold: 0.3 });
  const [shirtsRef, shirtsInView] = useInView({ threshold: 0.3 });
  const [aboutRef, aboutInView] = useInView({ threshold: 0.3 });
  const [contactRef, contactInView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (heroInView) setCurrentSection('hero');
    else if (contactInView) setCurrentSection('contact');
    else if (aboutInView) setCurrentSection('about');
    else if (shirtsInView) setCurrentSection('shirts');
    else if (sweatersInView) setCurrentSection('sweaters');
    else if (polosInView) setCurrentSection('polos');
    else if (tshirtsInView) setCurrentSection('tshirts');
  }, [heroInView, tshirtsInView, polosInView, sweatersInView, shirtsInView, aboutInView, contactInView]);

  return (
    <CartProvider>
      <div className={`min-h-screen bg-background ${isRtl ? 'rtl' : 'ltr'}`}>
        {/* Navigation */}
        <Navigation currentSection={currentSection} />

        {/* Hero Section */}
        <div ref={heroRef}>
          <HeroSection />
        </div>

        {/* Product Sections */}
        <div id="tshirts" ref={tshirtsRef}>
          <ProductGallery />
        </div>

        {/* Additional product sections would be implemented here */}
        <div id="polos" ref={polosRef} className="h-20" />
        <div id="sweaters" ref={sweatersRef} className="h-20" />
        <div id="shirts" ref={shirtsRef} className="h-20" />

        {/* About Section */}
        <div ref={aboutRef}>
          <AboutSection />
        </div>

        {/* Testimonials */}
        <TestimonialCarousel />

        {/* Footer */}
        <div ref={contactRef}>
          <Footer />
        </div>

        {/* Chat Widget */}
        <ChatWidget />

        {/* Cart Drawer */}
        <CartDrawer />
      </div>
    </CartProvider>
  );
};

export default Index;
