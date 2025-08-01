// Interfaces for Printful API
export interface PrintfulResponse<T> {
  code: number;
  result: T;
  extra?: unknown;
  error?: {
    reason: string;
    message: string;
  };
}

export interface PrintfulProduct {
  id: number;
  title: string;
  image: string;
  description: string;
  variants: PrintfulVariant[];
}

export interface PrintfulVariant {
  id: number;
  name: string;
  price: string;
  currency: string;
  in_stock: boolean;
  files?: unknown[];
}

export interface PrintfulCategory {
  id: number;
  parent_id: number;
  image_url: string;
  title: string;
}

// Interfaces for the application
export interface CartItem {
  productId: number;
  variantId: number;
  name: string;
  price: string;
  quantity: number;
  image?: string;
}

const VITE_PRINTFUL_API_TOKEN = import.meta.env.VITE_PRINTFUL_API_TOKEN;
const PRINTFUL_API_TOKEN = import.meta.env.PRINTFUL_API_TOKEN;

// Use VITE_ prefixed version first, fallback to non-prefixed version
// For development in web containers, also include a direct fallback
const API_TOKEN = VITE_PRINTFUL_API_TOKEN || PRINTFUL_API_TOKEN || '4lZwhbHrZcbVBtM7OS2UY3RyBqBRGUEA0Teix3mP';

// Debug logging (remove this in production)
console.log('Environment variables check:', {
  VITE_PRINTFUL_API_TOKEN: VITE_PRINTFUL_API_TOKEN ? 'Set' : 'Not set',
  PRINTFUL_API_TOKEN: PRINTFUL_API_TOKEN ? 'Set' : 'Not set',
  API_TOKEN: API_TOKEN ? 'Set' : 'Not set',
  import_meta_env: Object.keys(import.meta.env).filter(key => key.includes('PRINTFUL'))
});

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    retries = 3,
    backoff = 300
  ): Promise<PrintfulResponse<T>> {
    if (!API_TOKEN) {
      return {
        code: 400,
        result: null as T,
        error: {
          reason: 'Configuration Error',
          message: 'Printful API token configuration is missing. Please set VITE_PRINTFUL_API_TOKEN or PRINTFUL_API_TOKEN environment variable.',
        },
      };
    }

    const url = `https://api.printful.com${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data: PrintfulResponse<T> = await response.json();

      if (response.status >= 400) {
        if (response.status >= 500 && retries > 0) {
          await new Promise(resolve => setTimeout(resolve, backoff));
          return this.request(endpoint, options, retries - 1, backoff * 2);
        }
        throw new Error(data.error?.message || 'An unknown API error occurred.');
      }

      return data;
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch' && retries > 0) {
        await new Promise(resolve => setTimeout(resolve, backoff));
        return this.request(endpoint, options, retries - 1, backoff * 2);
      }

      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  async getProducts(): Promise<PrintfulResponse<PrintfulProduct[]>> {
    return this.request<PrintfulProduct[]>('/products');
  }

  async getProduct(id: number): Promise<PrintfulResponse<PrintfulProduct>> {
    return this.request<PrintfulProduct>(`/products/${id}`);
  }

  async getCategories(): Promise<PrintfulResponse<PrintfulCategory[]>> {
    return this.request<PrintfulCategory[]>('/categories');
  }

  async createCheckoutSession(items: CartItem[]): Promise<{ sessionId: string }> {
    // In a real app, this would make a request to our backend to create a Stripe Checkout session.
    // For now, we'll simulate a successful response.
    console.log('Creating checkout session for items:', items);
    return Promise.resolve({ sessionId: `sess_${Math.random().toString(36).substr(2, 9)}` });
  }
}

export const apiService = new ApiService();