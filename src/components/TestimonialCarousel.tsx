import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Marcus Johnson',
    title: 'Executive Director',
    location: 'New York, NY',
    rating: 5,
    content: 'The quality of Scarmo\'s shirts is unmatched. The attention to detail and the premium materials make every piece feel like a luxury investment. I\'ve been wearing their collection for over a year and the quality remains exceptional.',
    avatar: '/placeholder.svg',
  },
  {
    id: 2,
    name: 'Alexander Chen',
    title: 'Creative Director',
    location: 'Los Angeles, CA',
    rating: 5,
    content: 'Scarmo has redefined my wardrobe. Their sweaters are incredibly soft and the fit is perfect. The customer service is outstanding and the shipping is always fast. Highly recommend to anyone looking for premium menswear.',
    avatar: '/placeholder.svg',
  },
  {
    id: 3,
    name: 'David Rodriguez',
    title: 'Entrepreneur',
    location: 'Miami, FL',
    rating: 5,
    content: 'I was skeptical about ordering luxury clothing online, but Scarmo exceeded all my expectations. The polo shirts are exactly as described and the quality is superior to anything I\'ve purchased before.',
    avatar: '/placeholder.svg',
  },
  {
    id: 4,
    name: 'James Thompson',
    title: 'Investment Banker',
    location: 'Chicago, IL',
    rating: 5,
    content: 'The t-shirts from Scarmo are simply the best. The fabric is incredibly soft and durable. After multiple washes, they still look and feel brand new. This is luxury at its finest.',
    avatar: '/placeholder.svg',
  },
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
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
            What Our Customers Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Scarmo for their premium menswear needs.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="text-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              {/* Quote Icon */}
              <motion.div
                className="flex justify-center mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                  <Quote className="w-8 h-8 text-accent" />
                </div>
              </motion.div>

              {/* Testimonial Content */}
              <motion.blockquote
                className="text-xl lg:text-2xl font-light leading-relaxed mb-8 text-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                "{testimonials[currentIndex].content}"
              </motion.blockquote>

              {/* Rating */}
              <motion.div
                className="flex justify-center mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-accent fill-current"
                  />
                ))}
              </motion.div>

              {/* Customer Info */}
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="w-16 h-16 bg-muted rounded-full mb-4 overflow-hidden">
                  <img
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-semibold text-lg mb-1">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-muted-foreground mb-1">
                  {testimonials[currentIndex].title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonials[currentIndex].location}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 p-3 rounded-full bg-background shadow-lg border border-border hover:bg-muted transition-all duration-300 focus-luxury"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 p-3 rounded-full bg-background shadow-lg border border-border hover:bg-muted transition-all duration-300 focus-luxury"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 focus-luxury ${
                index === currentIndex
                  ? 'bg-accent'
                  : 'bg-border hover:bg-accent/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;