import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Instagram, Facebook, Linkedin, MapPin, Phone, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Welcome to Scarmo!",
        description: "You've been subscribed to our newsletter. Get ready for exclusive offers and style updates.",
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  const footerLinks = {
    'Shop': [
      { name: 'T-Shirts', href: '#tshirts' },
      { name: 'Polos', href: '#polos' },
      { name: 'Sweaters', href: '#sweaters' },
      { name: 'Shirts', href: '#shirts' },
      { name: 'New Arrivals', href: '#new' },
      { name: 'Sale', href: '#sale' },
    ],
    'Customer Care': [
      { name: 'Size Guide', href: '#size-guide' },
      { name: 'Shipping Info', href: '#shipping' },
      { name: 'Returns', href: '#returns' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Contact Us', href: '#contact' },
      { name: 'Track Order', href: '#track' },
    ],
    'Company': [
      { name: 'About Us', href: '#about' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Sustainability', href: '#' },
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '#' },
    ],
  };

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/scarmo', color: 'hover:text-pink-500' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/scarmo', color: 'hover:text-blue-500' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/scarmo', color: 'hover:text-blue-600' },
  ];

  const contactInfo = [
    { icon: MapPin, text: '123 Fashion Ave, New York, NY 10001' },
    { icon: Phone, text: '+1 (555) 123-4567' },
    { icon: Mail, text: 'hello@scarmo.com' },
    { icon: Clock, text: 'Mon-Fri: 9AM-6PM EST' },
  ];

  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Newsletter Section */}
        <motion.div
          className="py-12 border-b border-background/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Stay in Style
            </h3>
            <p className="text-lg text-background/80 mb-8">
              Be the first to know about new collections, exclusive offers, and style tips.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-background text-foreground border border-background/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
                  disabled={isSubmitting}
                  aria-describedby="newsletter-description"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-accent/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-foreground"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            
            <p id="newsletter-description" className="text-sm text-background/60 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-accent to-accent/80 rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-lg">S</span>
              </div>
              <span className="font-bold text-2xl">SCARMO</span>
            </div>
            
            <p className="text-background/80 leading-relaxed mb-6 max-w-md">
              Crafting premium menswear with uncompromising quality and timeless design. 
              Every piece tells a story of excellence and attention to detail.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 text-sm text-background/70">
                  <item.icon className="w-4 h-4 text-accent" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links], sectionIndex) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + sectionIndex * 0.1 }}
            >
              <h4 className="font-semibold text-lg mb-4 text-accent">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>

                    {link.href.startsWith('/') ? (
                      <Link
                        to={link.href}
                    {link.href === '#faq' ? (
                      <Link
                        to="/faq"

                        className="text-background/70 hover:text-accent transition-colors duration-300 focus:outline-none focus:text-accent"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-background/70 hover:text-accent transition-colors duration-300 focus:outline-none focus:text-accent"
                      >
                        {link.name}
                      </a>
                    )}

                    <a
                      href={link.href}
                      className="text-background/70 hover:text-accent transition-colors duration-300 focus:outline-none focus:text-accent"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          className="py-8 border-t border-background/20 flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {/* Copyright */}
          <div className="text-background/70 text-center md:text-left">
            <p>&copy; 2024 Scarmo. All rights reserved.</p>
            <p className="text-sm mt-1">
              Designed with ❤️ for the modern gentleman
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            <span className="text-background/70 text-sm">Follow us:</span>
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-background/70 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent rounded-lg p-1 ${social.color}`}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Follow us on ${social.name}`}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;