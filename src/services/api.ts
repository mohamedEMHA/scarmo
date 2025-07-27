const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export interface PrintfulProduct {
  id: number;
  name: string;
  thumbnail_url: string;
  variants: PrintfulVariant[];
}

export interface PrintfulVariant {
  id: number;
  name: string;
  price: string;
  currency: string;
  in_stock: boolean;
  files?: any[];
}

export interface CartItem {
  productId: number;
  variantId: number;
  name: string;
  price: string;
  quantity: number;
  image?: string;
}

export interface ShippingRate {
  id: string;
  name: string;
  rate: string;
  currency: string;
}

export interface Customer {
  email?: string;
  phone?: string;
  name?: string;
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }


    // Get all products from Printful
    async getProducts(): Promise<{ result: PrintfulProduct[] }> {
        return this.request<{ result: PrintfulProduct[] }>('/api/printful/store/products', {
            headers: {
                'Authorization': `Bearer ${import.meta.env.VITE_PRINTFUL_API_KEY}`,
            },
        });
    }

  // Get all products from Printful
  async getProducts(): Promise<{ result: PrintfulProduct[] }> {
    const url = `https://api.printful.com/store/products`;
    const options = {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_PRINTFUL_API_KEY}`,
      },
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  }


  // Get specific product details
  async getProduct(id: number): Promise<{ result: PrintfulProduct }> {
    return this.request<{ result: PrintfulProduct }>(`/api/printful/store/products/${id}`, {
        headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_PRINTFUL_API_KEY}`,
        },
    });
  }

  // Calculate shipping rates
  async getShippingRates(
    recipient: any,
    items: CartItem[]
  ): Promise<{ success: boolean; rates: ShippingRate[] }> {
    return this.request<{ success: boolean; rates: ShippingRate[] }>('/api/shipping-rates', {
      method: 'POST',
      body: JSON.stringify({ recipient, items }),
    });
  }

  // Create Stripe checkout session
  async createCheckoutSession(
    items: CartItem[],
    customer?: Customer,
    shipping?: ShippingRate
  ): Promise<{ success: boolean; sessionId: string; url: string }> {
    return this.request<{ success: boolean; sessionId: string; url: string }>('/api/create-checkout-session', {
      method: 'POST',
      body: JSON.stringify({ items, customer, shipping }),
    });
  }
}

export const apiService = new ApiService();