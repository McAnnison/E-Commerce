export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  role: 'ADMIN' | 'CUSTOMER';
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  products?: Product[];
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  unit: string;
  image?: string;
  stock: number;
  isActive: boolean;
  categoryId: string;
  category?: Category;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product?: Product;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  user?: User;
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';
  totalAmount: number;
  deliveryFee: number;
  notes?: string;
  deliveryAddress: string;
  deliveryDate?: string;
  orderItems: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  name: string;
  password: string;
  phone?: string;
  address?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  message: string;
}

export interface ApiResponse<T = unknown> {
  success?: boolean;
  message: string;
  data?: T;
  [key: string]: unknown;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}