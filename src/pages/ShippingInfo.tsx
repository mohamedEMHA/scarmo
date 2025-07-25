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
