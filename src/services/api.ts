const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Interfaces for Printful API
export interface PrintfulResponse<T> {
  code: number;
  result: T;
  extra?: any;
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
  files?: any[];
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

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    retries = 3,
    backoff = 300
  ): Promise<PrintfulResponse<T>> {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error('Supabase configuration is missing');
    }

    const url = `${SUPABASE_URL}/functions/v1/printful-api?endpoint=${encodeURIComponent(endpoint)}`;

    const config: RequestInit = {
      ...options,
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
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
}

export const apiService = new ApiService();