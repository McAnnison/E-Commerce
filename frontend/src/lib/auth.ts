import Cookies from 'js-cookie';
import { User } from '@/types';

export const auth = {
  // Store auth data
  setAuth: (token: string, user: User) => {
    Cookies.set('token', token, { expires: 7 }); // 7 days
    localStorage.setItem('user', JSON.stringify(user));
  },

  // Get current user
  getUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Get token
  getToken: (): string | null => {
    return Cookies.get('token') || null;
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!auth.getToken();
  },

  // Check if user is admin
  isAdmin: (): boolean => {
    const user = auth.getUser();
    return user?.role === 'ADMIN';
  },

  // Logout
  logout: () => {
    Cookies.remove('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  },

  // Update user data
  updateUser: (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
  },
};