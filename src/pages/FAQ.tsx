import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqItems = [
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
  },
];

const FAQ = () => {
  return (
    <div className="bg-background text-foreground">
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
    </div>
  );
};

export default FAQ;
