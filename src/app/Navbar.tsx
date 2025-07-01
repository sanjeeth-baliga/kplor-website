// Navbar.tsx
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
const neonBlue = '#00FFFF'
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`sticky top-0 z-50 flex justify-between items-center px-8 py-4  transition-all duration-300 ${scrolled ? 'bg-[#032859]/90 shadow-xl' : 'bg-[#032859]/50 shadow-none'} text-white`}
      style={{backgroundColor: '#032859'}}
    >
      {/* Logo */}
      <div className="text-lg font-bold">
        <Link href="/" className="flex items-center">
          <img src="/logo-removebg-preview.svg" alt="Kplor Logo" className="h-8 w-auto mr-2" /> {/* Replace with your actual logo file */}
          Kplor Logo
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-8 text-base">
        <Link href="/">How it works</Link>
        <Link href="/about">About Us</Link>
        <Link href="/contact">Contact</Link>
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