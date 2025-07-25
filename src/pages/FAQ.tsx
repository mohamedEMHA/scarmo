center-long-sleeves
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Navigation from '@/components/Navigation';
import ChatWidget from '@/components/ChatWidget';

const faqItems = [
  {
    question: 'What materials are your clothes made from?',
    answer: 'Our clothes are made from high-quality, sustainable materials, including organic cotton, linen, and recycled fabrics. We believe in creating fashion that is both stylish and environmentally conscious.',
  },
  {
    question: 'How do I care for my garments?',
    answer: 'To ensure the longevity of your clothes, we recommend washing them in cold water and hanging them to dry. For specific care instructions, please refer to the label on each garment.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We accept returns within 30 days of purchase. The item must be in its original condition with tags attached. Please visit our returns page for more information.',
  },
  {
    question: 'How do I track my order?',
    answer: 'Once your order has shipped, you will receive an email with a tracking number. You can use this number to track your order on our website.',
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship to most countries. Shipping costs and delivery times vary depending on the destination. Please check our shipping page for more details.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and Apple Pay.',
=======
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const faqData = [
  {
    question: 'What materials are your clothes made from?',
    answer:
      'Our clothes are crafted from premium, sustainably-sourced materials like organic cotton, merino wool, and recycled fabrics. We believe in quality that feels good and does good.',
  },
  {
    question: 'How do I find the right size?',
    answer:
      'Each product page has a detailed size guide with measurements. We recommend comparing these to a similar garment you own for the best fit. If you\'re between sizes, we suggest sizing up for a more relaxed fit.',
  },
  {
    question: 'What is your shipping policy?',
    answer:
      'We offer free standard shipping on all orders over $50. Express shipping is available for a flat rate. Orders are typically processed within 1-2 business days.',
  },
  {
    question: 'Can I return or exchange an item?',
    answer:
      'Yes, we have a 30-day return policy for unworn items with tags attached. You can initiate a return or exchange through our online portal. Some exclusions, like final sale items, may apply.',
  },
  {
    question: 'How should I care for my garments?',
    answer:
      'To prolong the life of your clothing, we recommend washing in cold water and hanging to dry. Specific care instructions are also listed on the garment\'s tag.',
  },
  {
    question: 'Do you have any physical stores?',
    answer:
      'Currently, we are an online-only brand, which allows us to offer premium quality at a more accessible price point. We host pop-up shops occasionally, so subscribe to our newsletter for updates!',
  },
  {
    question: 'Is your packaging eco-friendly?',
    answer:
      'Yes, we are committed to sustainability. All of our packaging is made from recycled materials and is 100% recyclable. We are always looking for ways to reduce our environmental impact.',
  },
  {
    question: 'How can I track my order?',
    answer:
      'Once your order has shipped, you will receive an email with a tracking number. You can use this number to track your order on the carrier\'s website.',
  },
  {
    question: 'Do you offer gift cards?',
    answer:
      'Yes, we offer digital gift cards in various denominations. They are delivered by email and contain instructions to redeem them at checkout.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards, as well as PayPal, Apple Pay, and Google Pay.',
main
  },
];

const FAQ = () => {
 center-long-sleeves
  return (
    <div className="bg-background text-foreground">
      <Navigation currentSection="" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 lg:px-8 py-24 lg:py-32"
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h1>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </motion.div>
      <ChatWidget />

  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggleFAQ = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="bg-[#F3F4F6] min-h-screen">
      <Navigation currentSection="faq" solidBackground={true} />
      <motion.div
        className="container mx-auto px-4 lg:px-8 py-16 lg:py-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-800 mb-4">
            Frequently Asked Questions
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-800 focus:outline-none"
                  aria-expanded={openIndices.includes(index)}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span>{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openIndices.includes(index) ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndices.includes(index) && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="mt-4 text-gray-600 overflow-hidden"
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      <Footer />
    main
    </div>
  );
};

export default FAQ;
