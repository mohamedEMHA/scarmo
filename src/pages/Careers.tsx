import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

const jobOpenings = [
  {
    title: 'Senior Frontend Developer',
    location: 'New York, NY',
    description: 'We are looking for a talented and passionate Senior Frontend Developer to join our team and help us build the future of fashion technology.',
    applyUrl: '#',
  },
  {
    title: 'Product Manager',
    location: 'Remote',
    description: 'We are seeking an experienced Product Manager to lead the development of our e-commerce platform and create a world-class customer experience.',
    applyUrl: '#',
  },
  {
    title: 'Digital Marketing Specialist',
    location: 'New York, NY',
    description: 'We are looking for a creative and data-driven Digital Marketing Specialist to help us grow our brand and reach new customers.',
    applyUrl: '#',
  },
];

const Careers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navigation currentSection="careers" forceSolidBg={true} />
      <main className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-center mb-4">
              Careers at SCARMO
            </h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-12"></div>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p>
                At SCARMO, we are more than just a clothing brand—we are a team of passionate individuals dedicated to redefining the world of modern menswear. We believe in fostering a creative and collaborative environment where every team member has the opportunity to make a real impact. Our culture is built on a foundation of innovation, excellence, and a shared love for timeless style.
              </p>
              <p>
                We are always looking for talented and driven individuals to join us on our mission to create exceptional products and a world-class customer experience. If you are passionate about fashion, technology, and making a difference, we would love to hear from you. Explore our current openings below and take the next step in your career with SCARMO.
              </p>
            </div>
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-6">Current Openings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jobOpenings.map((job, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm">
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <p className="text-gray-500 mb-4">{job.location}</p>
                    <p className="text-gray-600 mb-6">{job.description}</p>
                    <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
                      <button className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-2 rounded-lg font-medium transition-colors duration-300">
                        Apply Now
                      </button>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Careers;
