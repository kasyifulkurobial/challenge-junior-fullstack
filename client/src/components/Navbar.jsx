"use client";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/restaurant" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">RM</span>
              </div>
              <span className="font-bold text-xl text-gray-800">Rumah Makan Padang</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/restaurant" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive("/restaurant") ? "text-red-600 bg-red-50" : "text-gray-700 hover:text-red-600"}`}>
              Beranda
            </Link>
            <a href="/restaurant#menu" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
              Menu
            </a>
            <a href="/restaurant#reservasi" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
              Reservasi
            </a>
            <a href="/restaurant#tentang" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
              Tentang Kami
            </a>
            <a href="/restaurant#kontak" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
              Kontak
            </a>
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium bg-gray-600 text-white hover:bg-gray-700 transition-colors">
              Kembali ke Beranda
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-red-600 focus:outline-none" aria-label="Toggle mobile menu">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                to="/restaurant"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive("/restaurant") ? "text-red-600 bg-red-50" : "text-gray-700 hover:text-red-600"}`}
                onClick={() => setIsOpen(false)}
              >
                Beranda
              </Link>
              <a href="/restaurant#menu" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 transition-colors" onClick={() => setIsOpen(false)}>
                Menu
              </a>
              <a href="/restaurant#reservasi" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 transition-colors" onClick={() => setIsOpen(false)}>
                Reservasi
              </a>
              <a href="/restaurant#tentang" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 transition-colors" onClick={() => setIsOpen(false)}>
                Tentang Kami
              </a>
              <a href="/restaurant#kontak" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 transition-colors" onClick={() => setIsOpen(false)}>
                Kontak
              </a>
              <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium bg-gray-600 text-white hover:bg-gray-700 transition-colors" onClick={() => setIsOpen(false)}>
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
