"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > window.innerHeight - 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full transition-all duration-500 ${
        isSticky
          ? "fixed top-0 left-0 right-0 z-50 bg-[#f5f1ea]/95 backdrop-blur-sm border-b border-black/[0.06]"
          : "relative bg-transparent"
      }`}
    >
      <nav className="max-w-[1100px] mx-auto px-6 py-5 flex items-center justify-between w-full">
        {/* Brand */}
        <Link
          href={isHome ? "#home" : "/"}
          className="text-[10px] uppercase tracking-[0.4em] text-foreground hover:text-gray-warm transition-colors duration-300"
        >
          Edward Barradas
        </Link>

        {/* Desktop navigation */}
        {isHome && (
          <ul className="hidden md:flex items-center gap-10 text-[9px] uppercase tracking-[0.3em] text-gray-warm">
            {["gallery", "services", "contact"].map((item) => (
              <li key={item}>
                <Link
                  href={`#${item}`}
                  className="hover:text-foreground transition-colors duration-300 underline-offset-4 decoration-foreground/20 hover:underline"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* Mobile toggle */}
        {isHome && (
          <button
            id="nav-menu-toggle"
            onClick={() => setOpen(!open)}
            className="md:hidden text-[9px] uppercase tracking-[0.4em] text-gray-warm hover:text-foreground transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {open ? "Close" : "Menu"}
          </button>
        )}
      </nav>

      {/* Mobile menu */}
      {isHome && (
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="fixed inset-0 z-[60] bg-[#f5f1ea] flex flex-col items-center justify-center"
            >
              <button
                id="nav-mobile-close"
                onClick={() => setOpen(false)}
                className="absolute top-6 right-6 text-[9px] uppercase tracking-[0.4em] text-gray-warm hover:text-foreground transition-colors duration-300"
              >
                Close
              </button>

              <ul className="flex flex-col items-center gap-10 text-xs uppercase tracking-[0.45em] text-foreground/70">
                {["gallery", "services", "contact"].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.09 + 0.15 }}
                  >
                    <Link
                      href={`#${item}`}
                      onClick={() => setOpen(false)}
                      className="hover:text-foreground transition-colors duration-300"
                    >
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </header>
  );
}
