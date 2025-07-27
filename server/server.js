const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const axios = require('axios');
const stripe = require('stripe');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Stripe
const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Raw body for webhook verification
app.use('/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());

// Printful API configuration
const PRINTFUL_API_BASE = 'https://api.printful.com';
const printfulHeaders = {
  'Authorization': `Bearer ${process.env.PRINTFUL_API_TOKEN}`,
  'Content-Type': 'application/json'
};

// Helper function to make Printful API calls
const printfulAPI = async (endpoint, method = 'GET', data = null) => {
  try {
    const config = {
      method,
      url: `${PRINTFUL_API_BASE}${endpoint}`,
      headers: printfulHeaders,
    };
    
    if (data) {
      config.data = data;
    }
    
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw new Error(`API Error: ${error.response?.status || 'Unknown'}`);
  }
};

// Routes

// Get products from Printful
app.get('/api/products', async (req, res) => {
  try {
    const response = await printfulAPI('/store/products');
    
    // Transform Printful products to our format
    const products = response.result.map(product => ({
      id: product.id,
      name: product.name,
      thumbnail_url: product.thumbnail_url,
      variants: product.sync_variants?.map(variant => ({
        id: variant.id,
        name: variant.name,
        price: variant.retail_price,
        currency: variant.currency,
        in_stock: variant.availability_status === 'active'
      })) || []
    }));
    
    res.json({ success: true, products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch products' 
    });
  }
});

// Get product details
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await printfulAPI(`/store/products/${id}`);
    
    const product = {
      id: response.result.sync_product.id,
      name: response.result.sync_product.name,
      thumbnail_url: response.result.sync_product.thumbnail_url,
      variants: response.result.sync_variants.map(variant => ({
        id: variant.id,
        name: variant.name,
        price: variant.retail_price,
        currency: variant.currency,
        in_stock: variant.availability_status === 'active',
        files: variant.files || []
      }))
    };
    
    res.json({ success: true, product });
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch product details' 
    });
  }
});

// Calculate shipping rates
app.post('/api/shipping-rates', async (req, res) => {
  try {
    const { recipient, items } = req.body;
    
    const shippingData = {
      recipient,
      items: items.map(item => ({
        sync_variant_id: item.variantId,
        quantity: item.quantity
      }))
    };
    
    const response = await printfulAPI('/shipping/rates', 'POST', shippingData);
    
    res.json({ 
      success: true, 
      rates: response.result 
    });
  } catch (error) {
    console.error('Error calculating shipping:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to calculate shipping rates' 
    });
  }
});

// Create Stripe Checkout Session
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { items, customer, shipping } = req.body;
    
    // Validate items
    if (!items || items.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'No items provided' 
      });
    }
    
    // Create line items for Stripe
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
          metadata: {
            printful_variant_id: item.variantId.toString(),
            printful_product_id: item.productId.toString()
          }
        },
        unit_amount: Math.round(parseFloat(item.price) * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));
    
    // Add shipping if provided
    if (shipping && shipping.rate) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Shipping - ${shipping.name}`,
          },
          unit_amount: Math.round(parseFloat(shipping.rate) * 100),
        },
        quantity: 1,
      });
    }
    
    // Create Stripe session
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:8080'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:8080'}/cart`,
      customer_email: customer?.email,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'ES', 'IT'],
      },
      metadata: {
        items: JSON.stringify(items.map(item => ({
          variantId: item.variantId,
          quantity: item.quantity,
          productId: item.productId
        }))),
        customer: JSON.stringify(customer || {}),
        shipping_method: shipping?.id || ''
      }
    });
    
    res.json({ 
      success: true, 
      sessionId: session.id,
      url: session.url 
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create checkout session' 
    });
  }
});

// Stripe Webhook Handler
app.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  
  try {
    event = stripeClient.webhooks.constructEvent(
      req.body, 
      sig, 
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    try {
      // Extract order data from session metadata
      const items = JSON.parse(session.metadata.items);
      const customer = JSON.parse(session.metadata.customer || '{}');
      const shippingMethod = session.metadata.shipping_method;
      
      // Get shipping address from session
      const shippingAddress = session.shipping_details?.address;
      
      if (!shippingAddress) {
        throw new Error('No shipping address found in session');
      }
      
      // Create Printful order
      const printfulOrder = {
        recipient: {
          name: session.shipping_details.name,
          address1: shippingAddress.line1,
          address2: shippingAddress.line2 || '',
          city: shippingAddress.city,
          state_code: shippingAddress.state,
          country_code: shippingAddress.country,
          zip: shippingAddress.postal_code,
          phone: customer.phone || '',
          email: session.customer_details?.email || customer.email || ''
        },
        items: items.map(item => ({
          sync_variant_id: item.variantId,
          quantity: item.quantity
        })),
        retail_costs: {
          currency: session.currency.toUpperCase(),
          subtotal: (session.amount_subtotal / 100).toFixed(2),
          shipping: session.shipping_cost ? (session.shipping_cost.amount_subtotal / 100).toFixed(2) : '0.00',
          tax: session.total_details?.amount_tax ? (session.total_details.amount_tax / 100).toFixed(2) : '0.00',
          total: (session.amount_total / 100).toFixed(2)
        }
      };
      
      // Submit order to Printful
      const orderResponse = await printfulAPI('/orders', 'POST', printfulOrder);
      
      console.log('Οrder created successfully:', orderResponse.result.id);
      
      // You could store order details in your database here
      // await saveOrderToDatabase(session, orderResponse.result);
      
    } catch (error) {
      console.error('Error processing webhook:', error);
      // You might want to implement retry logic or alert systems here
    }
  }
  
  res.json({ received: true });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error' 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Scarmo server running on port ${PORT}`);
  console.log(`📦 Ιntegration: ${process.env.PRINTFUL_API_TOKEN ? 'Connected' : 'Not configured'}`);
  console.log(`💳 Stripe integration: ${process.env.STRIPE_SECRET_KEY ? 'Connected' : 'Not configured'}`);
  console.log('Server started successfully!');
});