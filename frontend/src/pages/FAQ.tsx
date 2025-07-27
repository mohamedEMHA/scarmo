import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What materials do you use?",
    answer: "We use only the finest materials, including premium cotton, merino wool, and genuine leather, sourced from the best suppliers around the world."
  },
  {
    question: "How do I care for my garments?",
    answer: "Care instructions are provided on the label of each garment. Generally, we recommend gentle washing or dry cleaning to maintain the quality and longevity of our products."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for unworn items with tags attached. Please visit our returns page for more details."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order has shipped, you will receive an email with a tracking number and a link to track your package."
  }
];

const FAQ = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navigation currentSection="faq" forceSolidBg={true} />
      <main className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-center mb-2">
              Frequently Asked Questions
            </h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default FAQ;
