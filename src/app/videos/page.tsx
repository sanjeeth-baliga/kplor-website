// src/app/videos/page.tsx
"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaTimes } from "react-icons/fa";
import { videoCategories, VideoItem } from "./videoData";


export default function VideosPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const visibleCategories = useMemo(() => {
    if (activeCategory === "all") return videoCategories;
    return videoCategories.filter((c) => c.id === activeCategory);
  }, [activeCategory]);

  const closeModal = useCallback(() => setActiveVideo(null), []);

  // Close modal on Escape key
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
    <div
      className="min-h-screen text-white"
      style={{
        background:
          "linear-gradient(to bottom right, rgb(40, 98, 173) 0%, rgb(9, 44, 91) 50%, #E0F2F7 85%, #FFFFFF 100%)",
      }}
    >
      {/* Hero */}
      <div className="pt-16 pb-10 px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6"
          >
            Sample Videos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-white/90"
          >
            A look at how Kplor turns text and manuals into explainer videos —
            organized by subject.
          </motion.p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-24 mb-10">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-3">
          <CategoryTab
            label="All"
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

      {/* Category Sections */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-24 pb-20">
        <div className="max-w-6xl mx-auto space-y-16">
          {visibleCategories.map((category) => (
            <section key={category.id}>
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold">
                  {category.label}
                </h2>
                {category.description && (
                  <p className="text-white/70 mt-1">{category.description}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.videos.map((video, idx) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    index={idx}
                    onPlay={() => setActiveVideo(video)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Modal Player */}
      <AnimatePresence>
        {activeVideo && (
          <VideoModal video={activeVideo} onClose={closeModal} />
        )}
      </AnimatePresence>
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
      className={`px-5 py-2 rounded-full text-sm sm:text-base font-semibold transition-all duration-200 border ${
        active
          ? "bg-[#00FFFF] text-[#032859] border-transparent shadow-md"
          : "bg-white/10 text-white border-white/20 hover:bg-white/20"
      }`}
    >
      {label}
    </button>
  );
}

function VideoCard({
  video,
  index,
  onPlay,
}: {
  video: VideoItem;
  index: number;
  onPlay: () => void;
}) {
  const isReady = video.driveFileId !== "REPLACE_WITH_FILE_ID";

  return (
    <motion.button
      type="button"
      onClick={onPlay}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4) }}
      whileHover={{ y: -4 }}
      className="text-left bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl group focus:outline-none focus:ring-2 focus:ring-[#00FFFF]"
      style={{ backgroundColor: "rgba(3, 40, 89, 0.65)" }}
    >
      {/* Thumbnail area */}
      <div className="relative aspect-video bg-[#021c3d] flex items-center justify-center overflow-hidden">
        {isReady ? (
          <img
            src={`https://drive.google.com/thumbnail?id=${video.driveFileId}&sz=w640`}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-200"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a3a73] to-[#032859]" />
        )}
        <div className="relative z-10 w-14 h-14 rounded-full bg-[#00FFFF] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
          <FaPlay className="text-[#032859] ml-1" size={18} />
        </div>
        {video.durationLabel && (
          <span className="absolute bottom-2 right-2 z-10 text-xs font-semibold bg-black/60 px-2 py-1 rounded">
            {video.durationLabel}
          </span>
        )}
      </div>

      {/* Title */}
      <div className="p-4">
        <h3 className="font-semibold text-white leading-snug">
          {video.title}
        </h3>
        {!isReady && (
          <p className="text-xs text-white/50 mt-1">Coming soon</p>
        )}
      </div>
    </motion.button>
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl"
        style={{ backgroundColor: "#032859" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h3 className="font-semibold text-white truncate pr-4">
            {video.title}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close video"
            className="text-white/70 hover:text-white transition-colors flex-shrink-0"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Player */}
        <div className="aspect-video bg-black">
          {isReady ? (
            <iframe
              src={`https://drive.google.com/file/d/${video.driveFileId}/preview`}
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
      </motion.div>
    </motion.div>
  );
}
