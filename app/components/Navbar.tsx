"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > window.innerHeight - 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full transition-all duration-300 ${
        isSticky
          ? "fixed top-0 left-0 z-50 bg-white/90 backdrop-blur-md shadow-sm"
          : "relative bg-white"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="#home"
          className="
            text-sm md:text-base
            font-bold
            uppercase
            tracking-[0.35em]
            text-black
          "
        >
          Edward Barradas
        </Link>

        {/* Navigation */}
        <ul className="flex items-center space-x-10 text-xs uppercase tracking-widest text-gray-700">
          <li>
            <Link
              href="#gallery"
              className="hover:text-black transition-colors"
            >
              Gallery
            </Link>
          </li>
          <li>
            <Link
              href="#services"
              className="hover:text-black transition-colors"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="hover:text-black transition-colors"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
