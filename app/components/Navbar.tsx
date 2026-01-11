"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [open, setOpen] = useState(false);

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
            text-xs sm:text-sm md:text-base
            font-bold
            uppercase
            tracking-[0.35em]
            text-black
          "
        >
          Edward Barradas
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden md:flex items-center space-x-12 text-xs uppercase tracking-widest text-gray-700">
          <li>
            <Link href="#gallery" className="hover:text-black transition">
              Gallery
            </Link>
          </li>
          <li>
            <Link href="#services" className="hover:text-black transition">
              Services
            </Link>
          </li>
          <li>
            <Link href="#contact" className="hover:text-black transition">
              Contact
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="
            md:hidden
            text-[10px]
            uppercase
            tracking-[0.35em]
            text-gray-700
            hover:text-black
            transition
          "
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden bg-white border-t border-black/5"
          >
            <ul className="flex flex-col items-center py-10 space-y-8 text-xs uppercase tracking-[0.35em] text-gray-700">
              <li>
                <Link
                  href="#gallery"
                  onClick={() => setOpen(false)}
                  className="hover:text-black transition"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  onClick={() => setOpen(false)}
                  className="hover:text-black transition"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="hover:text-black transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
