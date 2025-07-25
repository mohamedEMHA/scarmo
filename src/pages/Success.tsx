import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Truck, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePrintfulCart } from '@/contexts/PrintfulCartContext';

const Success: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { dispatch } = usePrintfulCart();
  const [sessionId] = useState(searchParams.get('session_id'));

  useEffect(() => {
    // Clear the cart after successful payment
    dispatch({ type: 'CLEAR_CART' });
  }, [dispatch]);

  const steps = [
    {
      icon: CheckCircle,
      title: 'Payment Confirmed',
      description: 'Your payment has been successfully processed',
      status: 'completed'
    },
    {
      icon: Package,
      title: 'Order Processing',
      description: 'Your order is being prepared for fulfillment',
      status: 'current'
    },
    {
      icon: Truck,
      title: 'Shipping',
      description: 'Your items will be shipped via Printful',
      status: 'upcoming'
    },
    {
      icon: Mail,
      title: 'Delivery',
      description: 'You\'ll receive tracking information via email',
      status: 'upcoming'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Success Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Successful!
          </h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been confirmed and will be processed shortly.
          </p>
          {sessionId && (
            <p className="text-sm text-gray-500 mt-2">
              Order ID: {sessionId.slice(-8).toUpperCase()}
            </p>
          )}
        </motion.div>

        {/* Order Process Steps */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            What happens next?
          </h2>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  step.status === 'completed' 
                    ? 'bg-green-100 text-green-600' 
                    : step.status === 'current'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  <step.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium ${
                    step.status === 'completed' || step.status === 'current'
                      ? 'text-gray-900'
                      : 'text-gray-500'
                  }`}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Important Information */}
        <motion.div
          className="bg-blue-50 rounded-lg p-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="font-medium text-blue-900 mb-2">
            Important Information
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• You will receive an email confirmation shortly</li>
            <li>• Your order will be fulfilled by Printful</li>
            <li>• Tracking information will be sent when your order ships</li>
            <li>• Estimated delivery: 3-7 business days</li>
          </ul>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <Button
            onClick={() => navigate('/')}
            className="flex-1 bg-black text-white hover:bg-gray-800"
          >
            Continue Shopping
          </Button>
          <Button
            onClick={() => navigate('/products')}
            variant="outline"
            className="flex-1 border-black text-black hover:bg-black hover:text-white"
          >
            View All Products
          </Button>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          className="text-center mt-8 pt-8 border-t border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <p className="text-sm text-gray-600">
            Questions about your order?{' '}
            <a 
              href="mailto:support@scarmo.com" 
              className="text-black hover:underline font-medium"
            >
              Contact Support
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Success;