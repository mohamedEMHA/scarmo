import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <motion.nav 
      className="flex items-center space-x-2 text-sm text-muted-foreground mb-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      aria-label="Breadcrumb navigation"
    >
      <Link 
        to="/" 
        className="flex items-center hover:text-foreground transition-colors duration-200 focus-luxury"
        aria-label="Go to homepage"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {items.map((item, index) => (
        <motion.div 
          key={index} 
          className="flex items-center space-x-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <ChevronRight className="w-4 h-4 text-border" />
          {item.href ? (
            <Link 
              to={item.href} 
              className="hover:text-foreground transition-colors duration-200 focus-luxury"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </motion.div>
      ))}
    </motion.nav>
  );
};

export default Breadcrumb;