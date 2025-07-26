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

const returnsFaqs = [
  {
    question: "What is your return policy?",

    answer: "We offer a 30-day return policy for unworn items with tags attached. Please visit our returns page for more details."
  },
  {
    question: "How do I start a return?",
    answer: "To start a return, please visit our returns portal and enter your order number and email address. You will be guided through the process of creating a return label and sending your item back to us."
  },
  {
    question: "When will I receive my refund?",
    answer: "Once we receive your return, we will inspect it and process your refund within 5-7 business days. You will receive an email notification once your refund has been processed."
  },
  {
    question: "Can I exchange an item?",
    answer: "Yes, we offer exchanges for items of the same value. Please visit our returns portal to start an exchange."

    answer: "We offer a 30-day return policy for unworn items with tags attached. Items must be in their original condition."
  },
  {
    question: "How do I start a return?",
    answer: "To start a return, please visit our online returns portal. You will need your order number and email address."
  },
  {
    question: "Are returns free?",
    answer: "Yes, we offer free returns for all domestic orders. A prepaid shipping label will be provided to you."
  },
  {
    question: "When will I receive my refund?",
    answer: "Once we receive and inspect your return, your refund will be processed within 5-7 business days. You will receive an email notification once your refund has been issued."

  }
];

const Returns = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navigation currentSection="returns" forceSolidBg={true} />
      <main className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-center mb-4">
              Returns & Exchanges
            </h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-12"></div>
            <Accordion type="single" collapsible className="w-full">
              {returnsFaqs.map((faq, index) => (
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
    <InfoPage title="Returns">
      <Accordion type="single" collapsible className="w-full">
        {returnsFaqs.map((faq, index) => (
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

export default Returns;
