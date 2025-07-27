import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import { Button } from '@/components/ui/button';

import InfoPage from '@/components/InfoPage';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,

} from '@/components/ui/table';

const sizeData = [
  { size: 'S', chest: '36-38', waist: '30-32' },
  { size: 'M', chest: '38-40', waist: '32-34' },
  { size: 'L', chest: '40-42', waist: '34-36' },
  { size: 'XL', chest: '42-44', waist: '36-38' },
  { size: 'XXL', chest: '44-46', waist: '38-40' },
];

const SizeGuide = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navigation currentSection="size-guide" forceSolidBg={true} />
      <main className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-center mb-4">
              Size Guide
            </h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-12"></div>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p>
                Finding the perfect fit is essential for looking and feeling your best. Use the chart below to determine your size. If you have any questions, please don't hesitate to contact our customer service team for assistance.
              </p>
            </div>
            <div className="mt-8">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Size</TableHead>
                    <TableHead>Chest (in)</TableHead>
                    <TableHead>Waist (in)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sizeData.map((row) => (
                    <TableRow key={row.size}>
                      <TableCell>{row.size}</TableCell>
                      <TableCell>{row.chest}</TableCell>
                      <TableCell>{row.waist}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-8 text-center">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                Download Size Chart
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default SizeGuide;
