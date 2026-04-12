import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* 🔥 Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">ShopX</h2>
          <p className="text-sm">
            Your one-stop online shop for everything you need. Quality products, fast delivery, and trusted service.
          </p>
        </div>

        {/* 🔗 Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Shop</li>
            <li className="hover:text-white cursor-pointer">Cart</li>
            <li className="hover:text-white cursor-pointer">Login</li>
          </ul>
        </div>

        {/* 📞 Support */}
        <div>
          <h3 className="text-white font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">Returns</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Terms</li>
          </ul>
        </div>

        {/* 📧 Subscribe */}
        <div>
          <h3 className="text-white font-semibold mb-3">Subscribe</h3>
          <p className="text-sm mb-3">Get latest updates & offers</p>

          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded-l bg-gray-800 border border-gray-700 text-sm focus:outline-none"
            />
            <button className="bg-blue-500 px-4 rounded-r text-white">
              Send
            </button>
          </div>

          {/* 🔥 Social Icons */}
          <div className="flex gap-4 mt-4 text-xl">
            <FaFacebook className="cursor-pointer hover:text-white" />
            <FaInstagram className="cursor-pointer hover:text-white" />
            <FaTwitter className="cursor-pointer hover:text-white" />
            <MdEmail className="cursor-pointer hover:text-white" />
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center text-sm py-4 border-t border-gray-800">
        © 2026 ShopX. All rights reserved.
      </div>

    </footer>
  );
}