// src/app/videos/ArchivedVideosCatalog.tsx
// ARCHIVED: Full video catalogue component preserved exactly as it was.
// To restore the full video catalogue on /videos, import and render this component in src/app/videos/page.tsx.

"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaTimes, FaPhoneAlt, FaArrowRight, FaBuilding, FaGraduationCap } from "react-icons/fa";
import Link from "next/link";
import { videoCategories, VideoItem } from "./videoData";
import { DEMO_URL } from "../../components/home/shared";
import { CallbackModal } from "../../components/common/CallbackModal";

export function ArchivedVideosCatalog() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [callbackOpen, setCallbackOpen] = useState(false);

  const visibleCategories = useMemo(() => {
    if (activeCategory === "all") return videoCategories;
    return videoCategories.filter((c) => c.id === activeCategory);
  }, [activeCategory]);

  const closeModal = useCallback(() => setActiveVideo(null), []);

  useEffect(() => {
    if (!activeVideo) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeVideo, closeModal]);

  return (
    <div className="min-h-screen bg-white text-charcoal font-sans selection:bg-kplor-200">
      {/* Hero Header */}
      <section className="bg-paper border-b border-line py-16 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-kplor-900"
          >
            Sample Content
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            A look at how Kplor turns text, manuals, and complex lecture material into high-retention animated explainers across subjects.
          </motion.p>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-line px-4 sm:px-6 md:px-12 lg:px-24 py-3">
        <div className="max-w-6xl mx-auto overflow-x-auto no-scrollbar flex items-center justify-start sm:justify-center gap-2">
          <CategoryTab
            label="All Subjects"
            active={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
          />
          {videoCategories.map((cat) => (
            <CategoryTab
              key={cat.id}
              label={cat.label}
              active={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            />
          ))}
        </div>
      </div>

      {/* Video Content Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-16 space-y-20">
        {visibleCategories.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-32">
            <div className="mb-8 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-kplor-500" />
                <h2 className="text-2xl sm:text-3xl font-bold text-kplor-900 tracking-tight">
                  {category.label}
                </h2>
                <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  {category.videos.length} {category.videos.length === 1 ? "video" : "videos"}
                </span>
              </div>
              {category.description && (
                <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
                  {category.description}
                </p>
              )}
            </div>

            {category.id === "corporate-ld" && (
              <div className="mb-10 rounded-2xl border border-kplor-200 bg-gradient-to-br from-sky-50/70 via-white to-blue-50/40 p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-kplor-600 mb-2">
                      <FaBuilding className="text-kplor-500" />
                      Corporate L&D
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-kplor-900">
                      Turn manuals, SOPs, and slides into videos employees actually finish
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                      Transform compliance manuals, policy decks, and internal expert sessions into engaging, bite-sized explainer modules. Every piece is SCORM-compliant, LMS-ready, and available with multilingual dubbing and voice cloning.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCallbackOpen(true)}
                    className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-kplor-900 hover:bg-kplor-800 text-white text-sm font-semibold transition-all shadow-md hover:scale-105"
                  >
                    <FaPhoneAlt className="text-xs text-[#00FFFF]" />
                    Talk to our team
                  </button>
                </div>
              </div>
            )}

            {category.id === "edtech" && (
              <div className="mb-10 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 sm:p-8">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-kplor-600 mb-2">
                    <FaGraduationCap className="text-kplor-500" />
                    Exam Prep & Certifications
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-kplor-900">
                    Step-by-step concept walkthroughs for competitive exams
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                    Exams like SAT, CFA, and professional IFRS certifications require clear conceptual understanding. Kplor turns complex math problems, accounting standards, and verbal deduction logic into structured visual explainers where every step is clearly shown.
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {category.videos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onPlay={() => setActiveVideo(video)}
                />
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Bottom Conversion Section */}
      <section className="bg-paper border-t border-line py-20 px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-kplor-900">
            Have content you need turned into videos?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Share your syllabi, PDFs, slide decks, or faculty recordings. We handle instructional mapping, storyboards, and production.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto rounded-full bg-kplor-900 px-8 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:bg-kplor-700 hover:scale-105"
            >
              Book a Demo
            </a>
            <button
              type="button"
              onClick={() => setCallbackOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-kplor-900 bg-white px-7 py-3.5 text-base font-semibold text-kplor-900 transition-all hover:bg-kplor-50"
            >
              <FaPhoneAlt className="text-xs text-kplor-600" />
              Ask our team to call you
            </button>
          </div>
        </div>
      </section>

      {/* Video Modal Player */}
      <AnimatePresence>
        {activeVideo && (
          <VideoModal video={activeVideo} onClose={closeModal} />
        )}
      </AnimatePresence>

      <CallbackModal isOpen={callbackOpen} onClose={() => setCallbackOpen(false)} />
    </div>
  );
}

function CategoryTab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 border whitespace-nowrap ${
        active
          ? "bg-kplor-900 text-white border-kplor-900 shadow-sm"
          : "bg-white text-slate-600 border-slate-200 hover:border-kplor-400 hover:text-kplor-900"
      }`}
    >
      {label}
    </button>
  );
}

function VideoCard({
  video,
  onPlay,
}: {
  video: VideoItem;
  onPlay: () => void;
}) {
  const isReady = video.driveFileId !== "REPLACE_WITH_FILE_ID";

  return (
    <div className="flex flex-col bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-kplor-300 transition-all duration-300 group">
      <button
        type="button"
        onClick={onPlay}
        aria-label={`Play ${video.title}`}
        className="relative w-full aspect-video bg-slate-900 flex items-center justify-center overflow-hidden focus:outline-none focus:ring-2 focus:ring-kplor-500"
      >
        {isReady ? (
          <img
            src={`https://drive.google.com/thumbnail?id=${video.driveFileId}&sz=w640`}
            alt={`${video.title}: Kplor explainer video thumbnail`}
            className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
        )}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
        <div className="relative z-10 w-12 h-12 rounded-full bg-kplor-900 text-[#00FFFF] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-kplor-800 transition-transform duration-200">
          <FaPlay className="ml-0.5" size={14} />
        </div>
        {video.durationLabel && (
          <span className="absolute bottom-2 right-2 z-10 text-[11px] font-semibold bg-black/70 text-white px-2 py-0.5 rounded">
            {video.durationLabel}
          </span>
        )}
      </button>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-kplor-900 text-base leading-snug group-hover:text-kplor-600 transition-colors">
          <Link href={`/videos/${video.id.toLowerCase()}`}>
            {video.title}
          </Link>
        </h3>
        {video.description && (
          <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed flex-grow">
            {video.description}
          </p>
        )}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
          <button
            type="button"
            onClick={onPlay}
            className="text-kplor-600 hover:text-kplor-800 inline-flex items-center gap-1.5 transition-colors"
          >
            <FaPlay size={10} />
            Watch Preview
          </button>
          <Link
            href={`/videos/${video.id.toLowerCase()}`}
            className="text-slate-400 hover:text-kplor-600 inline-flex items-center gap-1 transition-colors"
          >
            Details <FaArrowRight size={10} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function VideoModal({
  video,
  onClose,
}: {
  video: VideoItem;
  onClose: () => void;
}) {
  const isReady = video.driveFileId !== "REPLACE_WITH_FILE_ID";
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl bg-white border border-slate-200"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
          <div className="pr-4">
            <h3 className="font-bold text-kplor-900 text-lg truncate">
              {video.title}
            </h3>
            {video.description && (
              <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                {video.description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close video"
            className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-full hover:bg-slate-100 flex-shrink-0"
          >
            <FaTimes size={18} />
          </button>
        </div>

        <div className="aspect-video bg-black">
          {isReady ? (
            <iframe
              src={`https://drive.google.com/file/d/${video.driveFileId}/preview`}
              title={video.title}
              className="w-full h-full"
              allow="autoplay"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/60 text-center px-6">
              This video isn&apos;t linked up yet. Check back soon!
            </div>
          )}
        </div>

        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Kplor Explainer Video Sample</span>
          <Link
            href={`/videos/${video.id.toLowerCase()}`}
            onClick={onClose}
            className="font-semibold text-kplor-600 hover:text-kplor-800 inline-flex items-center gap-1"
          >
            Open standalone page <FaArrowRight size={10} />
          </Link>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}
