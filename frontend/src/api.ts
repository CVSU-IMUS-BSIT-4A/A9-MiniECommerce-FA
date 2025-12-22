import axios from 'axios';

const API_URL = 'http://localhost:3000';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  sessionId: string;
  createdAt: string;
}

export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface Order {
  id: number;
  customerName: string;
  customerEmail: string;
  customerAddress?: string;
  totalAmount: number;
  status: string;
  items: {
    id: number;
    productId: number;
    productName: string;
    price: number;
    quantity: number;
  }[];
  createdAt: string;
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Product API
export const getProducts = () => api.get<Product[]>('/products');
export const getProduct = (id: number) => api.get<Product>(`/products/${id}`);
export const createProduct = (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => 
  api.post<Product>('/products', data);
export const updateProduct = (id: number, data: Partial<Product>) => 
  api.patch<Product>(`/products/${id}`, data);
export const deleteProduct = (id: number) => api.delete(`/products/${id}`);

// Cart API
export const getCart = (sessionId: string = 'default-session') => 
  api.get<CartItem[]>('/cart', { params: { sessionId } });
export const addToCart = (productId: number, quantity: number, sessionId: string = 'default-session') => 
  api.post<CartItem>('/cart', { productId, quantity, sessionId });
export const updateCartItem = (id: number, quantity: number) => 
  api.patch<CartItem>(`/cart/${id}`, { quantity });
export const removeFromCart = (id: number) => api.delete(`/cart/${id}`);
export const clearCart = (sessionId: string = 'default-session') => 
  api.delete('/cart', { params: { sessionId } });
export const getCartTotal = (sessionId: string = 'default-session') => 
  api.get<{ total: number }>('/cart/total', { params: { sessionId } });

// Order API
export const createOrder = (data: {
  customerName: string;
  customerEmail: string;
  customerAddress?: string;
  items: OrderItem[];
}) => api.post<Order>('/orders', data);
export const getOrders = () => api.get<Order[]>('/orders');
export const getOrder = (id: number) => api.get<Order>(`/orders/${id}`);

export default api;
