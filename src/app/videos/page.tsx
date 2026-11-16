// src/app/videos/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaCalendarAlt } from "react-icons/fa";
import { DEMO_URL } from "../../components/home/shared";
import { CallbackModal } from "../../components/common/CallbackModal";

export default function VideosPage() {
  const [callbackOpen, setCallbackOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-paper text-charcoal font-sans selection:bg-kplor-200">
      {/* Top Banner / Hero */}
      <section className="flex-1 flex flex-col justify-center items-center py-20 sm:py-28 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center w-full">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-kplor-900 leading-tight"
          >
            All our client courseware is covered under strict NDA
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            To protect our enterprise and institutional clients’ proprietary IP, course catalogues and corporate training modules are kept confidential.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-3 text-base sm:text-lg font-medium text-kplor-800 max-w-2xl mx-auto leading-relaxed"
          >
            Book a discovery call with our team and we will gladly create a <span className="text-sky-600 font-semibold">free custom sample video</span> using your own curriculum, slides, or brand guidelines.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              type="button"
              onClick={() => setCallbackOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-kplor-900 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-kplor-700 hover:scale-105"
            >
              <FaPhoneAlt className="text-xs text-[#00FFFF]" />
              Request a Free Sample
            </button>
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-kplor-900/30 bg-white px-7 py-3.5 text-base font-semibold text-kplor-900 transition-all hover:bg-kplor-50 shadow-xs hover:border-kplor-900"
            >
              <FaCalendarAlt className="text-xs text-kplor-600" />
              Book a Demo
            </a>
          </motion.div>
        </div>
      </section>

      {/* Callback Request Modal */}
      <CallbackModal isOpen={callbackOpen} onClose={() => setCallbackOpen(false)} />
    </div>
  );
}
