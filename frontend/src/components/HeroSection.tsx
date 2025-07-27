import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { t } from '@/lib/i18n';

// Import hero images
import heroTshirt from '@/assets/hero-tshirt.jpg';
import heroPolo from '@/assets/hero-polo.jpg';
import heroSweater from '@/assets/hero-sweater.jpg';
import heroShirt from '@/assets/hero-shirt.jpg';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const heroSlides = [
    {
      image: heroTshirt,
      title: 'Premium T-Shirts',
      subtitle: 'Crafted from the finest cotton',
      cta: 'Shop T-Shirts',
      section: 'tshirts',
    },
    {
      image: heroPolo,
      title: 'Elegant Polos',
      subtitle: 'Sophisticated style for every occasion',
      cta: 'Shop Polos',
      section: 'polos',
    },
    {
      image: heroSweater,
      title: 'Luxury Sweaters',
      subtitle: 'Warmth meets uncompromising style',
      cta: 'Shop Sweaters',
      section: 'sweaters',
    },
    {
      image: heroShirt,
      title: 'Dress Shirts',
      subtitle: 'Impeccable tailoring for the modern gentleman',
      cta: 'Shop Shirts',
      section: 'shirts',
    },
  ];

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
          />
          <div className="absolute inset-0 hero-overlay" />
        </motion.div>
      </AnimatePresence>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="block text-white">{t('hero.title')}</span>
              <span className="block text-accent text-3xl md:text-4xl lg:text-5xl font-light mt-2">
                {heroSlides[currentSlide].title}
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl lg:text-3xl font-light mb-12 text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {heroSlides[currentSlide].subtitle}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <button
                onClick={() => scrollToSection(heroSlides[currentSlide].section)}
                className="btn-luxury focus-luxury"
                aria-label={`Shop ${heroSlides[currentSlide].title}`}
              >
                {heroSlides[currentSlide].cta}
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="btn-outline-luxury focus-luxury"
                aria-label="Learn about Scarmo"
              >
                {t('hero.ourStory')}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-all duration-300 focus-luxury"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-all duration-300 focus-luxury"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              setIsAutoPlaying(false);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 focus-luxury ${
              index === currentSlide
                ? 'bg-accent'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 right-8 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/60 rounded-full relative">
          <motion.div
            className="w-1 h-3 bg-accent rounded-full absolute top-2 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;