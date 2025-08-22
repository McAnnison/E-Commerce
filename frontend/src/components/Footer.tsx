import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">🍎 Fresh Market</h3>
            <p className="text-gray-300 text-sm">
              Your local source for fresh, organic fruits and vegetables. 
              Quality produce delivered to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-md font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/orders" className="text-gray-300 hover:text-white">
                  Track Orders
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-300 hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-white">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-md font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>📞 +1 (555) 123-4567</p>
              <p>📧 info@freshmarket.com</p>
              <p>📍 123 Market Street, City, State 12345</p>
              <p>🕒 Mon-Sat: 8AM-8PM, Sun: 9AM-6PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-300">
          <p>&copy; 2025 Fresh Market. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};