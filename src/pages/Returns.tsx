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
