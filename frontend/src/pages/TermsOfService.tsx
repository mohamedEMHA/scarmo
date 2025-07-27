import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navigation currentSection="terms" forceSolidBg={true} />
      <main className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-center mb-4">
              Terms of Service
            </h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-12"></div>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p>
                Welcome to SCARMO. These terms and conditions outline the rules and regulations for the use of our website and the purchase of our products. By accessing this website, we assume you accept these terms and conditions. Do not continue to use SCARMO if you do not agree to all of the terms and conditions stated on this page.
              </p>
              <p>
                The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.
              </p>
              <p>
                We reserve the right to amend these terms and conditions at any time. It is your responsibility to check this page regularly for changes. Your continued use of the site following the posting of changes will mean that you accept and agree to the changes.
              </p>
            </div>
            <div className="mt-12 text-center">
              <Link to="/">
                <button className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-3 rounded-lg font-medium transition-colors duration-300">
                  Accept
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default TermsOfService;
