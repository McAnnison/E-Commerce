import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { 
  User, 
  Product, 
  Category, 
  Order, 
  LoginCredentials, 
  RegisterData, 
  AuthResponse,
  ApiResponse,
  PaginatedResponse 
} from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await api.post('/auth/register', data);
    return response.data;
  },

  getMe: async (): Promise<{ user: User }> => {
    const response: AxiosResponse<{ user: User }> = await api.get('/auth/me');
    return response.data;
  },
};

// Products API
export const productsApi = {
  getAll: async (params?: {
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Product>> => {
    const response: AxiosResponse<{ products: Product[]; pagination: PaginatedResponse<Product>['pagination'] }> = await api.get('/products', { params });
    return {
      data: response.data.products,
      pagination: response.data.pagination,
    };
  },

  getById: async (id: string): Promise<{ product: Product }> => {
    const response: AxiosResponse<{ product: Product }> = await api.get(`/products/${id}`);
    return response.data;
  },

  create: async (data: Partial<Product>): Promise<ApiResponse<Product>> => {
    const response: AxiosResponse<ApiResponse<Product>> = await api.post('/products', data);
    return response.data;
  },

  update: async (id: string, data: Partial<Product>): Promise<ApiResponse<Product>> => {
    const response: AxiosResponse<ApiResponse<Product>> = await api.put(`/products/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<ApiResponse> => {
    const response: AxiosResponse<ApiResponse> = await api.delete(`/products/${id}`);
    return response.data;
  },

  updateStock: async (id: string, stock: number): Promise<ApiResponse<Product>> => {
    const response: AxiosResponse<ApiResponse<Product>> = await api.patch(`/products/${id}/stock`, { stock });
    return response.data;
  },
};

// Categories API
export const categoriesApi = {
  getAll: async (): Promise<{ categories: Category[] }> => {
    const response: AxiosResponse<{ categories: Category[] }> = await api.get('/categories');
    return response.data;
  },

  getById: async (id: string): Promise<{ category: Category }> => {
    const response: AxiosResponse<{ category: Category }> = await api.get(`/categories/${id}`);
    return response.data;
  },

  create: async (data: Partial<Category>): Promise<ApiResponse<Category>> => {
    const response: AxiosResponse<ApiResponse<Category>> = await api.post('/categories', data);
    return response.data;
  },

  update: async (id: string, data: Partial<Category>): Promise<ApiResponse<Category>> => {
    const response: AxiosResponse<ApiResponse<Category>> = await api.put(`/categories/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<ApiResponse> => {
    const response: AxiosResponse<ApiResponse> = await api.delete(`/categories/${id}`);
    return response.data;
  },
};

// Orders API
export const ordersApi = {
  getAll: async (params?: { page?: number; limit?: number }): Promise<PaginatedResponse<Order>> => {
    const response: AxiosResponse<{ orders: Order[]; pagination: PaginatedResponse<Order>['pagination'] }> = await api.get('/orders', { params });
    return {
      data: response.data.orders,
      pagination: response.data.pagination,
    };
  },

  getById: async (id: string): Promise<{ order: Order }> => {
    const response: AxiosResponse<{ order: Order }> = await api.get(`/orders/${id}`);
    return response.data;
  },

  create: async (data: {
    items: { productId: string; quantity: number }[];
    deliveryAddress: string;
    notes?: string;
    deliveryDate?: string;
  }): Promise<ApiResponse<Order>> => {
    const response: AxiosResponse<ApiResponse<Order>> = await api.post('/orders', data);
    return response.data;
  },

  updateStatus: async (id: string, status: string): Promise<ApiResponse<Order>> => {
    const response: AxiosResponse<ApiResponse<Order>> = await api.patch(`/orders/${id}/status`, { status });
    return response.data;
  },

  cancel: async (id: string): Promise<ApiResponse<Order>> => {
    const response: AxiosResponse<ApiResponse<Order>> = await api.patch(`/orders/${id}/cancel`);
    return response.data;
  },
};

// Users API
export const usersApi = {
  getAll: async (params?: { page?: number; limit?: number }): Promise<PaginatedResponse<User>> => {
    const response: AxiosResponse<{ users: User[]; pagination: PaginatedResponse<User>['pagination'] }> = await api.get('/users', { params });
    return {
      data: response.data.users,
      pagination: response.data.pagination,
    };
  },

  getById: async (id: string): Promise<{ user: User }> => {
    const response: AxiosResponse<{ user: User }> = await api.get(`/users/${id}`);
    return response.data;
  },

  updateProfile: async (data: { name: string; phone?: string; address?: string }): Promise<ApiResponse<User>> => {
    const response: AxiosResponse<ApiResponse<User>> = await api.put('/users/profile', data);
    return response.data;
  },

  updateRole: async (id: string, role: string): Promise<ApiResponse<User>> => {
    const response: AxiosResponse<ApiResponse<User>> = await api.patch(`/users/${id}/role`, { role });
    return response.data;
  },
};

export default api;