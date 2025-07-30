const API_BASE_URL = 'https://api.printful.com';
const API_TOKEN = import.meta.env.VITE_PRINTFUL_API_TOKEN;

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
  name:string;
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
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    retries = 3,
    backoff = 300
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    if (!API_TOKEN) {
      throw new Error('Printful API token is not configured. Please set VITE_PRINTFUL_API_TOKEN in your .env file.');
    }

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
      
      if (!response.ok) {
        // For 5xx errors, we can retry
        if (response.status >= 500 && retries > 0) {
          await new Promise(resolve => setTimeout(resolve, backoff));
          return this.request(endpoint, options, retries - 1, backoff * 2);
        }

        const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      // The Printful API wraps its responses in a result object
      const data = await response.json();
      return data.result;
    } catch (error) {
      // Retry on network errors
      if (error instanceof TypeError && error.message === 'Failed to fetch' && retries > 0) {
        await new Promise(resolve => setTimeout(resolve, backoff));
        return this.request(endpoint, options, retries - 1, backoff * 2);
      }

      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // Get all products from Printful
  async getProducts(): Promise<PrintfulProduct[]> {
    return this.request<PrintfulProduct[]>('/store/products');
  }
}

export const apiService = new ApiService();