import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

import InfoPage from '@/components/InfoPage';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const TrackOrder = () => {

  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleTrackOrder = (e) => {
    e.preventDefault();
    // Add your track order logic here
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navigation currentSection="track-order" forceSolidBg={true} />
      <main className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-center mb-4">
              Track Your Order
            </h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-12"></div>
            <form onSubmit={handleTrackOrder} className="space-y-6">
              <div>
                <label htmlFor="order-number" className="block text-sm font-medium text-gray-700">
                  Order Number
                </label>
                <div className="mt-1">
                  <Input
                    id="order-number"
                    name="order-number"
                    type="text"
                    required
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="Enter your order number"
                  />
                </div>
              </div>

              <div>
                <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  Track Order
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </div>

  return (
    <InfoPage title="Track Order">
      <div className="space-y-4">
        <p className="text-center text-gray-700 dark:text-gray-300">
          Enter your order number below to track its status.
        </p>
        <div className="flex w-full max-w-sm items-center space-x-2 mx-auto">
          <Input type="text" placeholder="Order Number" />
          <Button type="submit">Track</Button>
        </div>
      </div>
    </InfoPage>

  );
};

export default TrackOrder;
