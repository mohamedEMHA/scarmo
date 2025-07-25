import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import { Button } from '@/components/ui/button';

const pressAssets = [
  {
    title: 'SCARMO Unveils Fall/Winter 2024 Collection',
    thumbnail: 'https://picsum.photos/400/300?random=1',
    url: '#',
    pdfUrl: '#',
  },
  {
    title: 'A New Era of Sustainable Fashion: SCARMO\'s Commitment to the Planet',
    thumbnail: 'https://picsum.photos/400/300?random=2',
    url: '#',
    pdfUrl: null,
  },
  {
    title: 'Behind the Seams: A Look into SCARMO\'s Artisanal Craftsmanship',
    thumbnail: 'https://picsum.photos/400/300?random=3',
    url: '#',
    pdfUrl: '#',
  },
  {
    title: 'SCARMO Announces Partnership with a Leading Tech Innovator',
    thumbnail: 'https://picsum.photos/400/300?random=4',
    url: '#',
    pdfUrl: null,
  },
];

const Press = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navigation currentSection="press" forceSolidBg={true} />
      <main className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-center mb-4">
              Press & Media
            </h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pressAssets.map((asset, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm">
                  <img src={asset.thumbnail} alt={asset.title} className="w-full h-40 object-cover rounded-md mb-4" />
                  <a href={asset.url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold hover:text-accent transition-colors duration-300">
                    {asset.title}
                  </a>
                  {asset.pdfUrl && (
                    <div className="mt-4">
                      <a href={asset.pdfUrl} target="_blank" rel="noopener noreferrer">
                        <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                          Download PDF
                        </Button>
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Press;
