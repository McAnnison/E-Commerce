import Link from "next/link";
import { ShoppingCart, Star, Truck, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-green-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Fresh <span className="text-green-600">Fruits & Vegetables</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Farm-fresh produce delivered to your doorstep. 
            Quality guaranteed, locally sourced, and always fresh.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="h-5 w-5" />
              Shop Now
            </Link>
            <Link
              href="/auth/register"
              className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-colors"
            >
              Join Today
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose Fresh Market?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
              <p className="text-gray-600">
                Hand-picked, fresh produce sourced directly from local farms. 
                Quality guaranteed with every order.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-gray-600">
                Same-day and next-day delivery available. 
                Fresh produce delivered right to your door.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">100% Organic</h3>
              <p className="text-gray-600">
                Certified organic produce grown without harmful pesticides. 
                Safe for you and your family.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Fruits", emoji: "🍎", color: "bg-red-100" },
              { name: "Vegetables", emoji: "🥕", color: "bg-orange-100" },
              { name: "Herbs", emoji: "🌿", color: "bg-green-100" },
              { name: "Root Vegetables", emoji: "🥔", color: "bg-yellow-100" },
            ].map((category) => (
              <Link
                key={category.name}
                href={`/products?category=${category.name}`}
                className={`${category.color} p-6 rounded-lg text-center hover:shadow-lg transition-shadow`}
              >
                <div className="text-4xl mb-3">{category.emoji}</div>
                <h3 className="font-semibold text-gray-800">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for their daily fresh produce needs.
          </p>
          <Link
            href="/products"
            className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
          >
            <ShoppingCart className="h-5 w-5" />
            Browse Products
          </Link>
        </div>
      </section>
    </div>
  );
}
