import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-green-700">🍎 FreshMarket</div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/products" className="text-gray-700 hover:text-green-600">Products</Link>
              <Link href="/categories" className="text-gray-700 hover:text-green-600">Categories</Link>
              <Link href="/about" className="text-gray-700 hover:text-green-600">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-green-600">Contact</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-700 hover:text-green-600">Login</Link>
              <Link href="/register" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            Fresh <span className="text-green-600">Fruits</span> & <span className="text-orange-600">Vegetables</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Farm-fresh produce delivered to your doorstep. Quality guaranteed, locally sourced, 
            and sustainably grown fruits and vegetables from trusted suppliers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Shop Now
            </Link>
            <Link href="/about" className="border border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
              Learn More
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Same-day delivery for fresh produce to keep your fruits and vegetables at peak quality.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold mb-2">Organic Quality</h3>
              <p className="text-gray-600">Carefully selected organic produce from local farms, ensuring the highest quality and freshness.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive prices with direct sourcing from farmers, providing value for your money.</p>
            </div>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/categories/fruits" className="group">
              <div className="bg-gradient-to-br from-red-100 to-yellow-100 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
                <div className="text-6xl mb-4">🍎</div>
                <h3 className="text-xl font-semibold group-hover:text-red-600 transition-colors">Fresh Fruits</h3>
                <p className="text-gray-600 mt-2">Apples, bananas, oranges, and more seasonal fruits</p>
              </div>
            </Link>
            <Link href="/categories/vegetables" className="group">
              <div className="bg-gradient-to-br from-green-100 to-lime-100 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
                <div className="text-6xl mb-4">🥕</div>
                <h3 className="text-xl font-semibold group-hover:text-green-600 transition-colors">Vegetables</h3>
                <p className="text-gray-600 mt-2">Tomatoes, carrots, peppers, and fresh vegetables</p>
              </div>
            </Link>
            <Link href="/categories/herbs" className="group">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
                <div className="text-6xl mb-4">🌿</div>
                <h3 className="text-xl font-semibold group-hover:text-emerald-600 transition-colors">Herbs & Spices</h3>
                <p className="text-gray-600 mt-2">Fresh herbs, ginger, and aromatic spices</p>
              </div>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-xl font-bold mb-4">🍎 FreshMarket</div>
              <p className="text-gray-300">Your trusted partner for fresh, quality produce delivered right to your door.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/products" className="hover:text-white">Products</Link></li>
                <li><Link href="/categories" className="hover:text-white">Categories</Link></li>
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/delivery" className="hover:text-white">Delivery Info</Link></li>
                <li><Link href="/returns" className="hover:text-white">Returns</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="text-gray-300 space-y-2">
                <p>📞 +233-20-123-4567</p>
                <p>📧 hello@freshmarket.com</p>
                <p>📍 123 Market Street, Accra, Ghana</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 FreshMarket. All rights reserved. Built with Next.js and love for fresh produce.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
