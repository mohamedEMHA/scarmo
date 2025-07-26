
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import InfoPage from '@/components/InfoPage';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const shippingFaqs = [
  {
    question: "What are your shipping options?",

    answer: "We offer standard, expedited, and overnight shipping options. Shipping costs and delivery times vary by location and shipping method."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to most countries worldwide. International shipping costs and delivery times vary by location."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order has shipped, you will receive an email with a tracking number and a link to track your package."
  },
  {
    question: "What if my order is lost or damaged?",
    answer: "If your order is lost or damaged in transit, please contact our customer service team for assistance. We will work with you to resolve the issue as quickly as possible."

    answer: "We offer standard, expedited, and overnight shipping options. You can select your preferred method at checkout."
  },
  {
    question: "How much does shipping cost?",
    answer: "Shipping costs are calculated based on your location and the shipping method you choose. The total cost will be displayed at checkout."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to most countries worldwide. International shipping costs and delivery times vary by location."
  },
  {
    question: "How long will it take to receive my order?",
    answer: "Delivery times depend on your location and the shipping method selected. Standard shipping typically takes 5-7 business days, while expedited shipping takes 2-3 business days."

  }
];

const ShippingInfo = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navigation currentSection="shipping-info" forceSolidBg={true} />
      <main className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-center mb-4">
              Shipping Info
            </h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-12"></div>
            <Accordion type="single" collapsible className="w-full">
              {shippingFaqs.map((faq, index) => (
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

  return (
    <InfoPage title="Shipping Info">
      <Accordion type="single" collapsible className="w-full">
        {shippingFaqs.map((faq, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </InfoPage>
  );
};

export default ShippingInfo;
