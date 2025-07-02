// Navbar.tsx
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false); // State for About Us dropdown

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const neonBlue = '#00FFFF';

  // Function to close the dropdown menu
  const closeMenu = () => {
    setAboutMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`sticky top-0 z-50 flex justify-between items-center px-8 py-4 transition-all duration-300 ${scrolled ? 'bg-[#032859]/90 shadow-xl' : 'bg-[#032859]/50 shadow-none'} text-white`}
      style={{
        backgroundColor: '#032859',
        fontFamily: 'ui-serif, Georgia, serif' // Explicitly apply the Geist Sans font
      }}
    >
      {/* Logo */}
      <div className="text-lg font-bold">
        <Link href="/" className="flex items-center" onClick={closeMenu}>
          <img src="/Kplor_logo.png" alt="Kplor Logo" className="h-12 w-auto mr-2" /> {/* Replace with your actual logo file */}
          Kplor
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-8 text-lg font-semibold relative"> {/* Added relative for dropdown positioning */}
        {/* How it works link */}
        <Link href="/#features-section" onClick={closeMenu}>How it works</Link>

        {/* About Us Dropdown */}
        <div className="relative">
          <button
            onClick={() => setAboutMenuOpen(!aboutMenuOpen)}
            className="focus:outline-none"
          >
            About Us
          </button>
          {aboutMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 mt-2 w-40 bg-[#032859] rounded-md shadow-lg py-2 z-50"
            >
              <Link
                href="/about"
                className="block px-4 py-2 text-sm hover:bg-[#00FFFF] hover:text-[#032859]"
                onClick={closeMenu} // Close menu when Team is clicked
              >
                Team
              </Link>
              <Link
                href="#" // Keep href="#" for now as requested
                className="block px-4 py-2 text-sm hover:bg-[#00FFFF] hover:text-[#032859]"
                onClick={closeMenu} // Close menu when Blog is clicked (no navigation)
              >
                Blog
              </Link>
            </motion.div>
          )}
        </div>

        <Link href="/contact" onClick={closeMenu}>Contact</Link>
      </div>

      {/* Sign-Up Button */}
      <motion.button
        whileHover={{ scale: 1.1, boxShadow: `0 0 15px ${neonBlue}, 0 0 30px ${neonBlue}`, backgroundColor: '#00FFFF', color: '#032859' }}
        className="bg-[#00FFFF] text-[#032859] font-bold py-2 px-4 rounded-full shadow-md hover:shadow-xl transition-all duration-200"
      >
        Sign Up
      </motion.button>
    </motion.nav>
  );
}