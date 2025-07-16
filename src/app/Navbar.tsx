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
      className={`sticky top-0 z-50 flex flex-wrap md:flex-nowrap justify-between items-center px-2 sm:px-4 md:px-8 py-3 sm:py-4 transition-all duration-300 ${scrolled ? 'bg-[#032859]/90 shadow-xl' : 'bg-[#032859]/50 shadow-none'} text-white`}
      style={{
        backgroundColor: '#032859',
        fontFamily: 'Helvetica, Arial, sans-serif' // Use Helvetica with common fallbacks
      }}
    >
      {/* Logo */}
      <div className="text-lg font-bold flex-shrink-0">
        <Link href="/" className="flex items-center" onClick={closeMenu}>
          <img src="/Kplor_logo.png" alt="Kplor Logo" className="h-10 w-auto mr-2" /> {/* Replace with your actual logo file */}
          Kplor
        </Link>
      </div>

      {/* Hamburger for mobile */}
      <div className="md:hidden ml-auto">
        <button onClick={() => setAboutMenuOpen(!aboutMenuOpen)} className="focus:outline-none">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>

      {/* Navigation Links */}
      <div className={`flex-col md:flex-row md:flex items-center gap-6 md:gap-8 text-base font-semibold relative ${aboutMenuOpen ? 'flex' : 'hidden'} md:flex bg-[#032859] md:bg-transparent absolute md:static top-full left-0 w-full md:w-auto p-4 md:p-0 z-40`}> 
        <Link href="/#features-section" onClick={closeMenu} className="block py-2 md:py-0">How it works</Link>
        <Link href="/about" onClick={closeMenu} className="block py-2 md:py-0">About Us</Link>
        <Link href="/contact_us" onClick={closeMenu} className="block py-2 md:py-0">Contact</Link>
      </div>

      {/* Sign-Up Button */}
      <motion.button
        onClick={() => window.open('https://live.kplor.kplor.com', '_blank')}
        whileHover={{ scale: 1.1, boxShadow: `0 0 15px ${neonBlue}, 0 0 30px ${neonBlue}`, backgroundColor: '#00FFFF', color: '#032859' }}
        className="cursor-pointer bg-[#00FFFF] text-[#032859] font-bold py-2 px-4 rounded-full shadow-md hover:shadow-xl transition-all duration-200 ml-2 flex-shrink-0"
      >
        Sign Up
      </motion.button>
    </motion.nav>
  );
}