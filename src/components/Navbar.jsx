import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { cart } from "../store/cartStore";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(cart.length);

  // 🔥 Auto update cart count
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(cart.length);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* 🔥 Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          ShopX
        </Link>

        {/* 🔥 Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">

          <Link to="/home" className="hover:text-blue-500">
            Shop
          </Link>

          <Link to="/cart" className="hover:text-blue-500">
            Cart
          </Link>

          {/* 🔍 Search */}
          <input
            type="text"
            placeholder="Search..."
            className="border px-3 py-1 rounded-lg focus:outline-none"
          />

          {/* 🛒 Cart Icon + Badge */}
          <div className="relative cursor-pointer">
            <ShoppingCart size={22} />

            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
              {count}
            </span>
          </div>

          {/* 👤 User */}
          <User size={22} className="cursor-pointer" />

        </div>

        {/* 📱 Mobile Menu Button */}
        <div className="md:hidden">
          {open ? (
            <X size={28} onClick={() => setOpen(false)} />
          ) : (
            <Menu size={28} onClick={() => setOpen(true)} />
          )}
        </div>

      </div>

      {/* 📱 Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white px-6 pb-4 space-y-3">

          <Link to="/home" className="block">
            Shop
          </Link>

          <Link to="/cart" className="block">
            Cart
          </Link>

          <input
            type="text"
            placeholder="Search..."
            className="border px-3 py-1 rounded-lg w-full"
          />

        </div>
      )}

    </nav>
  );
}