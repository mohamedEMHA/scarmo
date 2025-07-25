import { useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

interface InfoPageProps {
  title: string;
  children: ReactNode;
}

const InfoPage = ({ title, children }: InfoPageProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navigation forceSolidBg={true} />
      <main className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12 max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-center mb-2">
              {title}
            </h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
            {children}
          </motion.div>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default InfoPage;
