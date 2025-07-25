import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navigation currentSection="about" forceSolidBg={true} />
      <main className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-center mb-4">
              About SCARMO
            </h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-12"></div>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p>
                Founded on the principles of timeless elegance and exceptional quality, SCARMO is more than just a clothing brand—it's a celebration of classic style for the modern gentleman. Our journey began with a simple mission: to create garments that are not only beautiful but also enduring, crafted with the utmost care and attention to detail.
              </p>
              <p>
                At SCARMO, we believe that true luxury lies in the craftsmanship. We partner with the world's finest artisans and source only the most premium materials, from luxurious merino wool to the softest pima cotton. Each piece in our collection is a testament to our commitment to quality, designed to be a cherished part of your wardrobe for years to come. Our mission is to provide you with a curated selection of essentials that embody sophistication and effortless style.
              </p>
              <p>
                We invite you to explore our collection and discover the SCARMO difference. For more information about our brand, our products, or our commitment to quality, please visit our <Link to="/faq" className="text-accent hover:underline">FAQ page</Link>.
              </p>
            </div>
            <div className="mt-12 text-center">
              <Link to="/faq">
                <button className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-3 rounded-lg font-medium transition-colors duration-300">
                  Learn More
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default About;
