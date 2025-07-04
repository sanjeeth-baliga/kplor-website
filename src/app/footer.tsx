// components/Footer.tsx
import { FaLinkedin, FaXTwitter, FaYoutube, FaInstagram } from 'react-icons/fa6';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#032859] text-white py-12 px-6 md:px-12 lg:px-24">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start px-8 md:px-12 lg:px-16">
        {/* Left Side */}
        <div className="mb-6 md:mb-0">
          <div className="flex items-center mb-4">
            <img src="/Kplor_logo.png" alt="Kplor Logo" className="h-8 w-auto mr-2" />
            <span className="text-xl font-bold">Kplor</span>
          </div>
          <h4 className="text-xl font-semibold mb-2">Get in touch</h4>
          <p className="text-base">info@kplor.com</p>
          <p className="mt-4 text-base">Registered in India as Mindshift Labs Private Limited</p>
        </div>

        {/* Center - Social Media */}
        <div className="flex items-center justify-center mb-6 md:mb-0">
          <div className="flex items-center">
            <a href="https://www.linkedin.com/company/kplor/posts/" target="_blank" rel="noopener noreferrer" className="mr-4 hover:text-[#00FFFF]">
              <FaLinkedin className="w-7 h-7" />
            </a>
            <a href="https://x.com/kplor_ai" target="_blank" rel="noopener noreferrer" className="mr-4 hover:text-[#00FFFF]">
              <FaXTwitter className="w-7 h-7" />
            </a>
            <a href="https://www.youtube.com/@KplorAI" target="_blank" rel="noopener noreferrer" className="mr-4 hover:text-[#00FFFF]">
              <FaYoutube className="w-7 h-7" />
            </a>
            <a href="https://www.instagram.com/kplor_tutor" target="_blank" rel="noopener noreferrer" className="hover:text-[#00FFFF]">
              <FaInstagram className="w-7 h-7" />
            </a>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col mr-8">
            <Link href="/contact_us" className="mb-2 text-base hover:text-[#00FFFF]">Contact Us</Link>
            <Link href="/privacy-policy" className="mb-2 text-base hover:text-[#00FFFF]">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="mb-2 text-base hover:text-[#00FFFF]">Terms & Conditions</Link>
          </div>
          <div className="flex flex-col">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSeYycB7n_i7OhUmFt2JwvIaD396kFJgACBn_04Yf_QQII4JDw/viewform" className="mb-2 text-base hover:text-[#00FFFF]">Feedback</a>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSeVRwA3b9pO0cOH8qnrk2esB8oWiM_Y-evlmD8RUESB_-I7yA/viewform" className="text-base hover:text-[#00FFFF]">Join Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
}