'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';
import { auth } from '@/lib/auth';
import { cart } from '@/lib/cart';
import { User as UserType } from '@/types';

export const Header: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setUser(auth.getUser());
    setCartCount(cart.getItemsCount());

    // Listen for cart updates
    const handleStorageChange = () => {
      setCartCount(cart.getItemsCount());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    auth.logout();
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-green-600">
            🍎 Fresh Market
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/products" className="text-gray-700 hover:text-green-600">
              Products
            </Link>
            {user?.role === 'ADMIN' && (
              <Link href="/admin" className="text-gray-700 hover:text-green-600">
                Admin
              </Link>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/orders" className="text-gray-700 hover:text-green-600">
                  My Orders
                </Link>
                <Link href="/cart" className="relative text-gray-700 hover:text-green-600">
                  <ShoppingCart className="h-6 w-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-700" />
                  <span className="text-gray-700">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-red-600"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="space-x-4">
                <Link
                  href="/auth/login"
                  className="text-gray-700 hover:text-green-600"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/products"
                className="text-gray-700 hover:text-green-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              {user?.role === 'ADMIN' && (
                <Link
                  href="/admin"
                  className="text-gray-700 hover:text-green-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
              {user ? (
                <>
                  <Link
                    href="/orders"
                    className="text-gray-700 hover:text-green-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <Link
                    href="/cart"
                    className="flex items-center text-gray-700 hover:text-green-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Cart ({cartCount})
                  </Link>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-gray-700">Welcome, {user.name}</span>
                    <button
                      onClick={handleLogout}
                      className="text-red-600 hover:text-red-700"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  <Link
                    href="/auth/login"
                    className="block text-gray-700 hover:text-green-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};