// components/Footer.tsx
import { FaLinkedin, FaXTwitter, FaYoutube, FaInstagram } from 'react-icons/fa6';
import { SiNvidia } from 'react-icons/si';
import Link from 'next/link';
import { solutions } from '../content/solutions';

export default function Footer() {
  return (
    <footer className="w-full bg-[#032859] text-white py-12 px-6 md:px-12 lg:px-24">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start px-8 md:px-12 lg:px-16">
        {/* Left Side */}
        <div className="mb-6 md:mb-0">
          <div className="flex items-center mb-4">
            <img src="/Kplor_logo.png" alt="Kplor logo" className="h-8 w-auto mr-2" />
            <span className="text-xl font-bold">Kplor</span>
          </div>
          <p className="text-base">Registered in India as Mindshift Labs Private Limited</p>
          <div className="mt-5 flex items-center gap-3">
            <div
              className="bg-white rounded-lg px-3 py-2 flex items-center justify-center shadow-xs"
              title="NVIDIA"
            >
              <SiNvidia className="h-7 w-7 text-[#76B900]" aria-label="NVIDIA logo" />
            </div>
            <div
              className="bg-white rounded-lg p-1.5 flex items-center justify-center shadow-xs"
              title="Startup Karnataka"
            >
              <img
                src="/startup_karnataka.png"
                alt="Startup Karnataka"
                title="Startup Karnataka"
                className="h-9 w-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Center - Social Media */}
        <div className="flex items-center justify-center mb-6 md:mb-0">
          <div className="flex items-center">
            <a href="https://www.linkedin.com/company/kplor/posts/" target="_blank" rel="noopener noreferrer" aria-label="Kplor on LinkedIn" title="LinkedIn" className="mr-4 hover:text-[#00FFFF]">
              <FaLinkedin className="w-7 h-7" aria-hidden="true" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="https://x.com/kplor_ai" target="_blank" rel="noopener noreferrer" aria-label="Kplor on X (Twitter)" title="X (Twitter)" className="mr-4 hover:text-[#00FFFF]">
              <FaXTwitter className="w-7 h-7" aria-hidden="true" />
              <span className="sr-only">X (Twitter)</span>
            </a>
            <a href="https://www.youtube.com/@KplorAI" target="_blank" rel="noopener noreferrer" aria-label="Kplor on YouTube" title="YouTube" className="mr-4 hover:text-[#00FFFF]">
              <FaYoutube className="w-7 h-7" aria-hidden="true" />
              <span className="sr-only">YouTube</span>
            </a>
            <a href="https://www.instagram.com/kplor_tutor" target="_blank" rel="noopener noreferrer" aria-label="Kplor on Instagram" title="Instagram" className="hover:text-[#00FFFF]">
              <FaInstagram className="w-7 h-7" aria-hidden="true" />
              <span className="sr-only">Instagram</span>
            </a>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col mr-8">
            <span className="mb-2 text-sm font-semibold uppercase tracking-wider text-white/60">Solutions</span>
            {solutions.map((s) => (
              <span key={s.slug} className="mb-2 text-base text-white/75 select-none cursor-default">
                {s.audience}
              </span>
            ))}
          </div>
          <div className="flex flex-col mr-8">
            <Link href="/more-info?tab=about" className="mb-2 text-base hover:text-[#00FFFF]">About Us</Link>
            <Link href="/contact_us" className="mb-2 text-base hover:text-[#00FFFF]">Contact Us</Link>
            <Link href="/privacy-policy" className="mb-2 text-base hover:text-[#00FFFF]">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="mb-2 text-base hover:text-[#00FFFF]">Terms &amp; Conditions</Link>
          </div>
          <div className="flex flex-col">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSeYycB7n_i7OhUmFt2JwvIaD396kFJgACBn_04Yf_QQII4JDw/viewform" className="mb-2 text-base hover:text-[#00FFFF]">Feedback</a>
            <a href="https://www.linkedin.com/company/kplor/" target="_blank" rel="noopener noreferrer" className="text-base hover:text-[#00FFFF]">Join Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
}