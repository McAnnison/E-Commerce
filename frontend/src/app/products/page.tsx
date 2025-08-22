'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  imageUrl: string;
  stockQuantity: number;
  averageRating: number;
  category: {
    name: string;
  };
}

interface ProductsResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // For now, we'll use mock data since the backend may not be running
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Fresh Bananas',
        description: 'Sweet and ripe bananas, perfect for breakfast or snacks',
        price: 8.50,
        unit: 'bunch',
        imageUrl: '/api/placeholder/300/200',
        stockQuantity: 150,
        averageRating: 4.5,
        category: { name: 'Fruits' }
      },
      {
        id: '2',
        name: 'Red Apples',
        description: 'Crispy red apples imported from South Africa',
        price: 15.00,
        unit: 'kg',
        imageUrl: '/api/placeholder/300/200',
        stockQuantity: 80,
        averageRating: 4.8,
        category: { name: 'Fruits' }
      },
      {
        id: '3',
        name: 'Tomatoes',
        description: 'Fresh red tomatoes, perfect for cooking',
        price: 6.00,
        unit: 'kg',
        imageUrl: '/api/placeholder/300/200',
        stockQuantity: 200,
        averageRating: 4.2,
        category: { name: 'Vegetables' }
      },
      {
        id: '4',
        name: 'Carrots',
        description: 'Fresh organic carrots, rich in beta-carotene',
        price: 7.00,
        unit: 'kg',
        imageUrl: '/api/placeholder/300/200',
        stockQuantity: 90,
        averageRating: 4.6,
        category: { name: 'Vegetables' }
      }
    ];

    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-48 mb-8"></div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow p-4">
                  <div className="h-48 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold text-green-700">🍎 FreshMarket</Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/products" className="text-green-600 font-semibold">Products</Link>
              <Link href="/categories" className="text-gray-700 hover:text-green-600">Categories</Link>
              <Link href="/about" className="text-gray-700 hover:text-green-600">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-green-600">Contact</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-green-600">🛒</button>
              <Link href="/login" className="text-gray-700 hover:text-green-600">Login</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Fresh Products</h1>
          <p className="text-gray-600">Discover our selection of fresh fruits and vegetables</p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg">All Products</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Fruits</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Vegetables</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Herbs</button>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-w-16 aspect-h-12">
                <div className="w-full h-48 bg-gradient-to-br from-green-100 to-orange-100 rounded-t-lg flex items-center justify-center">
                  <span className="text-4xl">
                    {product.category.name === 'Fruits' ? '🍎' : 
                     product.category.name === 'Vegetables' ? '🥕' : '🌿'}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{product.name}</h3>
                  <span className="text-sm text-gray-500">{product.category.name}</span>
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center mb-3">
                  <div className="text-lg font-bold text-green-600">
                    ₵{product.price.toFixed(2)} / {product.unit}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="text-yellow-400 mr-1">⭐</span>
                    {product.averageRating.toFixed(1)}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Stock: {product.stockQuantity}
                  </span>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <div className="flex space-x-2">
            <button className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Previous</button>
            <button className="px-3 py-2 bg-green-600 text-white rounded">1</button>
            <button className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">2</button>
            <button className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">3</button>
            <button className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Next</button>
          </div>
        </div>
      </main>
    </div>
  );
}