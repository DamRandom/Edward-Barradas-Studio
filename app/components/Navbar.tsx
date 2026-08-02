"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
          ? "fixed top-0 left-0 right-0 z-50 bg-[#f5f1ea]/92 backdrop-blur-md border-b border-black/[0.07] shadow-xs"
          : "relative bg-transparent"
      }`}
    >
      <nav className="z-60 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-5 flex items-center justify-between w-full">
        {/* Logo */}
        <Link href={isHome ? "#home" : "/"} className="flex items-center group">
          <Image
            src="/images/logo.png"
            alt="Edward Barradas"
            width={300}
            height={100}
            priority
            className="h-10 sm:h-12 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
          />
        </Link>

        {/* Desktop links */}
        {isHome && (
          <div className="hidden md:flex items-center gap-12">
            <span className="text-[9px] uppercase tracking-[0.4em] text-foreground/30 font-light border-r border-black/10 pr-8">
              Lima, Perú
            </span>
            <ul className="flex items-center gap-8 text-[10px] uppercase tracking-[0.35em] text-foreground/60">
              {[
                { name: "gallery", label: "Gallery" },
                { name: "about", label: "About" },
                { name: "services", label: "Services" },
                { name: "contact", label: "Contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={`#${item.name}`}
                    className="hover:text-foreground transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-accent-gold hover:after:w-full after:transition-all after:duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Mobile toggle */}
        {isHome && (
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-[9px] uppercase tracking-[0.4em] text-foreground/70 hover:text-foreground transition-colors duration-300 px-3 py-1.5 border border-black/10 rounded-none"
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
              className="fixed inset-0 z-60 bg-[#f5f1ea] flex flex-col items-center justify-center"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-6 right-6 text-[9px] uppercase tracking-[0.4em] text-gray-warm hover:text-foreground"
              >
                Close
              </button>

              <ul className="flex flex-col items-center gap-10 text-xs uppercase tracking-[0.45em] text-foreground/70">
                {[
                  { name: "gallery", label: "Gallery" },
                  { name: "about", label: "About" },
                  { name: "services", label: "Services" },
                  { name: "contact", label: "Contact" },
                ].map((item, i) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.09 + 0.15 }}
                  >
                    <Link
                      href={`#${item.name}`}
                      onClick={() => setOpen(false)}
                      className="hover:text-foreground transition-colors duration-300"
                    >
                      {item.label}
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