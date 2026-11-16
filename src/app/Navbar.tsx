// Navbar.tsx
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DEMO_URL } from "../components/home/shared";

const links = [
  { href: "/", label: "Overview" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/videos", label: "Sample Content" },
  { href: "/more-info", label: "More Info" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  const handleNavClick = (href: string) => {
    close();
    if (href === "/#how-it-works" && typeof window !== "undefined") {
      if (window.location.pathname === "/") {
        const el = document.getElementById("how-it-works");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? "border-line bg-white/90 backdrop-blur-md"
          : "border-transparent bg-paper/70 backdrop-blur-sm"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-5 sm:px-8"
      >
        <Link href="/" onClick={close} className="flex items-center gap-2.5 group" aria-label="Kplor home">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-kplor-900 overflow-hidden shadow-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Kplor_logo.png" alt="Kplor logo" className="h-8 w-8 object-contain scale-110" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-kplor-900">Kplor</span>
        </Link>

        <ul className="hidden items-center gap-8 text-sm font-medium text-charcoal md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                prefetch={l.href.startsWith("/#") ? false : true}
                onClick={() => handleNavClick(l.href)}
                className="transition-colors hover:text-kplor-500"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-kplor-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-kplor-700"
          >
            Book a Demo
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-line md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              {open ? (
                <path d="M4 4l10 10M14 4L4 14" stroke="#032859" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M3 5h12M3 9h12M3 13h12" stroke="#032859" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <ul id="mobile-menu" className="border-t border-line bg-white px-5 pb-4 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                prefetch={l.href.startsWith("/#") ? false : true}
                onClick={() => handleNavClick(l.href)}
                className="block border-b border-line py-3.5 text-base font-medium text-charcoal"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/contact_us" onClick={close} className="block py-3.5 text-base font-medium text-charcoal">
              Contact
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}