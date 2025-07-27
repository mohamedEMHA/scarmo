import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navigation currentSection="privacy" forceSolidBg={true} />
      <main className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-center mb-4">
              Privacy Policy
            </h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-12"></div>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p>
                This is a placeholder for the Privacy Policy. Replace this text with your actual privacy policy.
              </p>
              <h2>1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us. For example, we collect information when you create an account, subscribe to our newsletter, or otherwise communicate with us. The types of information we may collect include your name, email address, password, and any other information you choose to provide.
              </p>
              <h2>2. How We Use Your Information</h2>
              <p>
                We may use the information we collect to:
              </p>
              <ul>
                <li>Provide, maintain, and improve our services;</li>
                <li>Send you technical notices, updates, security alerts, and support and administrative messages;</li>
                <li>Respond to your comments, questions, and requests, and provide customer service;</li>
                <li>Communicate with you about products, services, offers, and events offered by us and others, and provide news and information we think will be of interest to you;</li>
                <li>Monitor and analyze trends, usage, and activities in connection with our services;</li>
                <li>Personalize and improve the services and provide advertisements, content, or features that match user profiles or interests.</li>
              </ul>
              <h2>3. Sharing of Information</h2>
              <p>
                We may share information about you as follows or as otherwise described in this Privacy Policy:
              </p>
              <ul>
                <li>With vendors, consultants, and other service providers who need access to such information to carry out work on our behalf;</li>
                <li>In response to a request for information if we believe disclosure is in accordance with, or required by, any applicable law, regulation, or legal process;</li>
                <li>If we believe your actions are inconsistent with our user agreements or policies, or to protect the rights, property, and safety of us or others;</li>
                <li>In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business by another company;</li>
                <li>Between and among our present and future parents, affiliates, subsidiaries, and other companies under common control and ownership; and</li>
                <li>With your consent or at your direction.</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default PrivacyPolicy;
