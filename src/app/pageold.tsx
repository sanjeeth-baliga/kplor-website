// page.tsx
"use client";
import { motion } from "framer-motion";
import Carousel from "./Carousel";
import './pulse.css';
import { useState, useEffect } from 'react';

const animatedWords = ["see", "talk", "listen"];

export default function Home() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % animatedWords.length);
    }, 1500); // Change word every 1.5 seconds

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  return (
    <main className="flex flex-col items-center justify-start min-h-[80vh] px-2 sm:px-4 pt-8 sm:pt-12">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-center mb-4 sm:mb-8 drop-shadow-lg"
      >
        Kplor: Your personalized AI tutor
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className="text-base sm:text-lg md:text-2xl text-center max-w-2xl text-white/90 mb-6 sm:mb-10"
      >
        Kplor can{" "}
        <motion.span
          key={currentWordIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="font-bold"
        >
          {animatedWords[currentWordIndex]}
        </motion.span>{" "}
        and create adaptive video content
      </motion.p>

      {/* Rest of your Home component */}
            <section className="flex flex-col md:flex-row w-full max-w-6xl gap-12 items-start justify-center mt-2 mb-20" style={{position: 'relative', minHeight: '600px'}}>
        {/* Pulse Loader as Background */}
        <div style={{position: 'absolute', right: '-70%', top: '50%', transform: 'translateY(-50%)', zIndex: 1, pointerEvents: 'none', width: '900px', height: '900px', boxShadow: 'none', border: 'none'}}>
          <div className="loader">
            <div className="ring"></div>
            <div className="ring"></div>
            <div className="ring"></div>
            <div className="nucleus"></div>
            <motion.a
              href="https://live.kplor.kplor.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.08, boxShadow: '0 4px 32px 0 #1e40af' }}
              whileTap={{ scale: 0.96 }}
              className="pulse-btn"
              style={{ pointerEvents: 'auto' }}
            >
              Try Now!
            </motion.a>
          </div>
        </div>
        {/* Left: YouTube Video */}
        <div className="w-full md:w-4/5 flex flex-col items-center justify-center relative z-10">
          <div className="aspect-video w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <iframe
              src="https://www.youtube.com/embed/ibTHRYUtktE"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full aspect-video"
              style={{ aspectRatio: '16/9', display: 'block' }}
            ></iframe>
          </div>
        </div>
        {/* Right: Empty for spacing on desktop */}
        <div className="hidden md:block md:w-1/5" />
      </section>
      {/* Partners Carousel Section */}
       {/* Partners Carousel Section */}
       <section className="w-full flex flex-col items-center justify-center mt-32 mb-16">
        {/* Our Partners Text */}
        <div className="flex flex-col items-center mb-8">
          <span className="text-5xl font-extrabold tracking-tight text-white drop-shadow-lg" style={{ fontFamily: 'Geist, Arial, sans-serif', letterSpacing: '-0.04em' }}>
            Our Partners
          </span>
        </div>
        {/* Carousel */}
        <div className="w-full"> {/* Removed max-w-5xl and overflow-visible */}
          <Carousel />
        </div>
      </section>
      {/* Personalize Your Learning Path Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0, y: 80 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.9,
              ease: 'easeOut',
              when: 'beforeChildren',
              staggerChildren: 0.25,
            },
          },
        }}
        className="w-full flex flex-col md:flex-row items-center justify-center gap-10 rounded-2xl px-6 py-10 max-w-5xl mx-auto mb-16"
        style={{ minHeight: '320px' }}
      >
        {/* Text Content */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 80 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
          }}
          whileHover={{ y: -10, scale: 1.03, boxShadow: '0 8px 32px 0 rgba(143,81,234,0.15)' }}
          className="flex-1 flex flex-col items-start justify-center max-w-xl cursor-pointer"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4 text-white drop-shadow-lg"
            style={{ fontFamily: 'Geist, Arial, sans-serif', letterSpacing: '-0.03em' }}
          >
            Personalize Your Learning Path
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-2">
            Create a custom learning path based on your proficiency, goals and time constraint
          </p>
        </motion.div>
        {/* Image */}
        <div className="flex items-center justify-center mb-6 md:mb-0" style={{ background: 'rgba(30,30,40,0.7)', borderRadius: '1rem', padding: '1.5rem' }}>
          <motion.img
            src="/sample.svg"
            alt="Personalized Learning Path"
            variants={{
              hidden: { opacity: 0, y: 80, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: 'easeOut' } },
            }}
            whileHover={{ y: -10, scale: 1.07, boxShadow: '0 8px 32px 0 rgba(143,81,234,0.18)' }}
            className="w-64 h-64 object-contain rounded-xl shadow-lg border border-white/20 bg-white/10 cursor-pointer"
          />
        </div>
      </motion.section>
      {/* End Personalize Section */}
      
      {/* Talk to Kplor about everything Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0, x: -80 },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.9,
              ease: 'easeOut',
              when: 'beforeChildren',
              staggerChildren: 0.25,
            },
          },
        }}
        className="w-full flex flex-col md:flex-row items-center justify-center gap-10 rounded-2xl px-6 py-10 max-w-5xl mx-auto mb-16"
        style={{ minHeight: '320px' }}
      >
        {/* Image */}
        <div className="flex items-center justify-center mb-6 md:mb-0" style={{ background: 'rgba(30,30,40,0.7)', borderRadius: '1rem', padding: '1.5rem' }}>
          <motion.img
            src="/sample.svg"
            alt="Talk to Kplor"
            variants={{
              hidden: { opacity: 0, x: -80, scale: 0.95 },
              visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.9, ease: 'easeOut' } },
            }}
            whileHover={{ y: -10, scale: 1.07, boxShadow: '0 8px 32px 0 rgba(143,81,234,0.18)' }}
            className="w-64 h-64 object-contain rounded-xl shadow-lg border border-white/20 bg-white/10 cursor-pointer"
          />
        </div>
        {/* Text Content */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 80 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
          }}
          whileHover={{ y: -10, scale: 1.03, boxShadow: '0 8px 32px 0 rgba(143,81,234,0.15)' }}
          className="flex-1 flex flex-col items-start justify-center max-w-xl cursor-pointer"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4 text-white drop-shadow-lg"
            style={{ fontFamily: 'Geist, Arial, sans-serif', letterSpacing: '-0.03em' }}
          >
            Talk to Kplor about everything
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-2">
            Have natural conversations with your AI tutor about any topic or question
          </p>
        </motion.div>
      </motion.section>

      {/* Understand Concepts with Immersive Lectures Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0, x: 80 },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.9,
              ease: 'easeOut',
              when: 'beforeChildren',
              staggerChildren: 0.25,
            },
          },
        }}
        className="w-full flex flex-col md:flex-row-reverse items-center justify-center gap-10 rounded-2xl px-6 py-10 max-w-5xl mx-auto mb-16"
        style={{ minHeight: '320px' }}
      >
        {/* Image */}
        <div className="flex items-center justify-center mb-6 md:mb-0" style={{ background: 'rgba(30,30,40,0.7)', borderRadius: '1rem', padding: '1.5rem' }}>
          <motion.img
            src="/sample.svg"
            alt="Immersive Lectures"
            variants={{
              hidden: { opacity: 0, x: 80, scale: 0.95 },
              visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.9, ease: 'easeOut' } },
            }}
            whileHover={{ y: -10, scale: 1.07, boxShadow: '0 8px 32px 0 rgba(143,81,234,0.18)' }}
            className="w-64 h-64 object-contain rounded-xl shadow-lg border border-white/20 bg-white/10 cursor-pointer"
          />
        </div>
        {/* Text Content */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -80 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
          }}
          whileHover={{ y: -10, scale: 1.03, boxShadow: '0 8px 32px 0 rgba(143,81,234,0.15)' }}
          className="flex-1 flex flex-col items-start justify-center max-w-xl cursor-pointer"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4 text-white drop-shadow-lg"
            style={{ fontFamily: 'Geist, Arial, sans-serif', letterSpacing: '-0.03em' }}
          >
            Understand Concepts with Immersive Lectures
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-2">
            Experience interactive video lectures that adapt to your learning style
          </p>
        </motion.div>
      </motion.section>

      {/* Smart Doubt Solving Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0, x: -80 },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.9,
              ease: 'easeOut',
              when: 'beforeChildren',
              staggerChildren: 0.25,
            },
          },
        }}
        className="w-full flex flex-col md:flex-row items-center justify-center gap-10 rounded-2xl px-6 py-10 max-w-5xl mx-auto mb-16"
        style={{ minHeight: '320px' }}
      >
        {/* Image */}
        <div className="flex items-center justify-center mb-6 md:mb-0" style={{ background: 'rgba(30,30,40,0.7)', borderRadius: '1rem', padding: '1.5rem' }}>
          <motion.img
            src="/sample.svg"
            alt="Smart Doubt Solving"
            variants={{
              hidden: { opacity: 0, x: -80, scale: 0.95 },
              visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.9, ease: 'easeOut' } },
            }}
            whileHover={{ y: -10, scale: 1.07, boxShadow: '0 8px 32px 0 rgba(143,81,234,0.18)' }}
            className="w-64 h-64 object-contain rounded-xl shadow-lg border border-white/20 bg-white/10 cursor-pointer"
          />
        </div>
        {/* Text Content */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 80 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
          }}
          whileHover={{ y: -10, scale: 1.03, boxShadow: '0 8px 32px 0 rgba(143,81,234,0.15)' }}
          className="flex-1 flex flex-col items-start justify-center max-w-xl cursor-pointer"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4 text-white drop-shadow-lg"
            style={{ fontFamily: 'Geist, Arial, sans-serif', letterSpacing: '-0.03em' }}
          >
            Smart Doubt Solving
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-2">
            Get instant, intelligent solutions to your questions with step-by-step explanations
          </p>
        </motion.div>
      </motion.section>

      {/* Proactive Check your Understanding Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0, x: 80 },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.9,
              ease: 'easeOut',
              when: 'beforeChildren',
              staggerChildren: 0.25,
            },
          },
        }}
        className="w-full flex flex-col md:flex-row-reverse items-center justify-center gap-10 rounded-2xl px-6 py-10 max-w-5xl mx-auto mb-16"
        style={{ minHeight: '320px' }}
      >
        {/* Image */}
        <div className="flex items-center justify-center mb-6 md:mb-0" style={{ background: 'rgba(30,30,40,0.7)', borderRadius: '1rem', padding: '1.5rem' }}>
          <motion.img
            src="/sample.svg"
            alt="Check Understanding"
            variants={{
              hidden: { opacity: 0, x: 80, scale: 0.95 },
              visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.9, ease: 'easeOut' } },
            }}
            whileHover={{ y: -10, scale: 1.07, boxShadow: '0 8px 32px 0 rgba(143,81,234,0.18)' }}
            className="w-64 h-64 object-contain rounded-xl shadow-lg border border-white/20 bg-white/10 cursor-pointer"
          />
        </div>
        {/* Text Content */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -80 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
          }}
          whileHover={{ y: -10, scale: 1.03, boxShadow: '0 8px 32px 0 rgba(143,81,234,0.15)' }}
          className="flex-1 flex flex-col items-start justify-center max-w-xl cursor-pointer"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4 text-white drop-shadow-lg"
            style={{ fontFamily: 'Geist, Arial, sans-serif', letterSpacing: '-0.03em' }}
          >
            Proactive Check your Understanding
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-2">
            Regular assessments and quizzes to ensure you are mastering the concepts
          </p>
        </motion.div>
      </motion.section>
    </main>
  );
}