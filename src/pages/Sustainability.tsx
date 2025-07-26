import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

const Sustainability = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navigation currentSection="sustainability" forceSolidBg={true} />
      <main className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-center mb-4">
              Sustainability
            </h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-12"></div>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p>
                At SCARMO, we are committed to a more sustainable future. We believe that fashion and sustainability can and should coexist, and we are dedicated to making a positive impact on the planet and its people. Our sustainability efforts are focused on three key areas: materials, manufacturing, and packaging.
              </p>
              <p>
                We are proud to use a variety of sustainable materials in our products, including organic cotton, recycled polyester, and Tencel. We are also committed to working with manufacturing partners who share our values and are dedicated to ethical and environmentally friendly practices.
              </p>
              <p>
                We are constantly working to reduce our environmental footprint, and we are committed to transparency and continuous improvement. We believe that by working together, we can create a more sustainable future for fashion and for the planet.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Sustainability;
