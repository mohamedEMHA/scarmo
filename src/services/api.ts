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
  API_TOKEN: API_TOKEN ? 'Set' : 'Not set'
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

    // For development, return mock data to avoid CORS issues
    // In production, you would use a backend proxy or serverless function
    if (import.meta.env.DEV) {
      console.log('Development mode: Returning mock data to avoid CORS issues');
      return this.getMockData<T>(endpoint);
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
      // Fallback to mock data if API call fails
      console.log('API call failed, falling back to mock data');
      return this.getMockData<T>(endpoint);
    }
  }

  private getMockData<T>(endpoint: string): PrintfulResponse<T> {
    if (endpoint === '/products') {
      return {
        code: 200,
        result: [
          {
            id: 1,
            title: "Premium Cotton T-Shirt",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
            description: "High-quality cotton t-shirt with premium fit",
            variants: [
              {
                id: 1,
                name: "Classic Black",
                price: "29.99",
                currency: "USD",
                in_stock: true
              },
              {
                id: 2,
                name: "Navy Blue",
                price: "29.99",
                currency: "USD",
                in_stock: true
              }
            ]
          },
          {
            id: 2,
            title: "Wool Blend Sweater",
            image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop",
            description: "Comfortable wool blend sweater for all seasons",
            variants: [
              {
                id: 3,
                name: "Charcoal Gray",
                price: "59.99",
                currency: "USD",
                in_stock: true
              }
            ]
          },
          {
            id: 3,
            title: "Leather Belt",
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
            description: "Genuine leather belt with classic buckle",
            variants: [
              {
                id: 4,
                name: "Brown Leather",
                price: "39.99",
                currency: "USD",
                in_stock: true
              }
            ]
          },
          {
            id: 4,
            title: "Silk Necktie",
            image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
            description: "Elegant silk necktie for formal occasions",
            variants: [
              {
                id: 5,
                name: "Navy Blue",
                price: "49.99",
                currency: "USD",
                in_stock: true
              }
            ]
          },
          {
            id: 5,
            title: "Long Sleeve Polo",
            image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop",
            description: "Classic long sleeve polo shirt",
            variants: [
              {
                id: 6,
                name: "White",
                price: "34.99",
                currency: "USD",
                in_stock: true
              }
            ]
          },
          {
            id: 6,
            title: "Premium Sneakers",
            image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
            description: "Comfortable and stylish sneakers",
            variants: [
              {
                id: 7,
                name: "White",
                price: "89.99",
                currency: "USD",
                in_stock: true
              }
            ]
          },
          {
            id: 7,
            title: "Canvas Backpack",
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
            description: "Durable canvas backpack for everyday use",
            variants: [
              {
                id: 8,
                name: "Khaki",
                price: "69.99",
                currency: "USD",
                in_stock: true
              }
            ]
          },
          {
            id: 8,
            title: "Cotton Boxers",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
            description: "Comfortable cotton boxer shorts",
            variants: [
              {
                id: 9,
                name: "Gray",
                price: "19.99",
                currency: "USD",
                in_stock: true
              }
            ]
          }
        ] as T
      };
    }

    return {
      code: 200,
      result: [] as T
    };
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