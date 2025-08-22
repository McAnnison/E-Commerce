import { CartItem, Product } from '@/types';

const CART_KEY = 'shopping_cart';

export const cart = {
  // Get cart items
  getItems: (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    const cartStr = localStorage.getItem(CART_KEY);
    return cartStr ? JSON.parse(cartStr) : [];
  },

  // Set cart items
  setItems: (items: CartItem[]) => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  },

  // Add item to cart
  addItem: (product: Product, quantity: number = 1) => {
    const items = cart.getItems();
    const existingIndex = items.findIndex(item => item.productId === product.id);

    if (existingIndex >= 0) {
      items[existingIndex].quantity += quantity;
    } else {
      items.push({
        productId: product.id,
        product,
        quantity,
      });
    }

    cart.setItems(items);
  },

  // Remove item from cart
  removeItem: (productId: string) => {
    const items = cart.getItems().filter(item => item.productId !== productId);
    cart.setItems(items);
  },

  // Update item quantity
  updateQuantity: (productId: string, quantity: number) => {
    const items = cart.getItems();
    const index = items.findIndex(item => item.productId === productId);

    if (index >= 0) {
      if (quantity <= 0) {
        items.splice(index, 1);
      } else {
        items[index].quantity = quantity;
      }
      cart.setItems(items);
    }
  },

  // Get total items count
  getItemsCount: (): number => {
    return cart.getItems().reduce((total, item) => total + item.quantity, 0);
  },

  // Get total price
  getTotalPrice: (): number => {
    return cart.getItems().reduce((total, item) => total + (item.product.price * item.quantity), 0);
  },

  // Clear cart
  clear: () => {
    localStorage.removeItem(CART_KEY);
  },
};