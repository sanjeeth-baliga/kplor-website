// page.tsx
"use client";
import { motion, useInView } from "framer-motion";
import Carousel from "./Carousel";
import './pulse.css';
import { useState, useEffect, useRef } from 'react';

const animatedWords = ["see", "talk", "listen"];

interface Feature {
  title: string;
  description: string;
  image: string;
  imagePlacement: "left" | "right";
}

const features: Feature[] = [
  {
    title: "Personalize Your Learning Path",
    description: "Create a custom learning path based on your proficiency, goals, and time constraint",
    image: "/sample.svg",
    imagePlacement: "right", // "left" or "right"
  },
  {
    title: "Talk to Kplor about everything",
    description: "Have natural conversations with your AI tutor about any topic or question",
    image: "/sample.svg",
    imagePlacement: "left",
  },
  {
    title: "Understand Concepts with Immersive Lectures",
    description: "Experience interactive video lectures that adapt to your learning style",
    image: "/sample.svg",
    imagePlacement: "right",
  },
  {
    title: "Smart Doubt Solving",
    description: "Get instant, intelligent solutions to your questions with step-by-step explanations",
    image: "/sample.svg",
    imagePlacement: "left",
  },
  {
    title: "Proactive Check your Understanding",
    description: "Regular assessments and quizzes to ensure you are mastering the concepts",
    image: "/sample.svg",
    imagePlacement: "right",
  },
];
//const neonBlue = '#00FFFF'

export default function Home() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % animatedWords.length);
    }, 1500); // Change word every 1.5 seconds

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  return (
    <main className="flex flex-col items-center justify-start min-h-[80vh] px-4 pt-12">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-center w-full max-w-7xl mx-auto">
        {/* Title and One-Liner */}
        <div className="md:w-7/12 p-8">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-6xl font-extrabold text-center md:text-left mb-4 drop-shadow-lg"
          >
            Kplor: Your personalized AI tutor
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-lg sm:text-2xl text-center md:text-left max-w-2xl text-white/90 mb-10"
          >
            Kplor can{" "}
            <motion.span
              key={currentWordIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="font-bold" // Style the animated word
            >
              {animatedWords[currentWordIndex]}
            </motion.span>{" "}
            and create adaptive video content
          </motion.p>
        </div>

        {/* Demo Video */}
        <div className="md:w-5/12 p-4">
          <div className="aspect-w-1 aspect-h-1">
            <iframe
              src="https://www.youtube.com/embed/ibTHRYUtktE"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full rounded-xl"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Try Now Button */}
      {/* Try Now Button with pulse effect */}
<div className="relative flex justify-center items-center mt-8 mb-12">
  {/* Glowing pulse background */}
  <div className="absolute w-40 h-40 rounded-full bg-cyan-400 opacity-40 animate-ping"></div>

  {/* Actual Button */}
  <motion.a
    href="https://live.kplor.kplor.com"
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.96 }}
    className="relative z-10 bg-[#00FFFF] text-[#032859] font-bold py-4 px-8 rounded-full shadow-md hover:shadow-xl transition-all duration-200"
  >
    Try Now!
  </motion.a>
</div>


      {/* Loved by Students At */}
      <div className="text-center text-xl text-white/90 mb-4">
        Loved by students at
      </div>

      {/* Universities Carousel */}
      <section className="w-full">
        <Carousel />
      </section>

       {/* Feature Sections */}
      {features.map((feature, index) => (
        <FeatureSection
          key={index}
          feature={feature}
        />
      ))}
    </main>
  );
}

function FeatureSection({ feature }: { feature: Feature }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });  // Adjust 'amount' as needed
  
    const direction = feature.imagePlacement === "left" ? -1 : 1;
    const animationVariants = {
      hidden: { opacity: 0, x: 80 * direction },
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
    };

    const isHighlighted = isInView;

    return (
      <motion.section
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={animationVariants}
        className={`w-full flex flex-col md:flex-row items-center justify-center gap-10 rounded-2xl px-6 py-10 max-w-5xl mx-auto mb-16 ${isHighlighted ? 'shadow-xl' : 'shadow-md'}`}
        style={{ minHeight: '320px', backgroundColor: 'rgba(3, 40, 89, 0.7)' }}  // Use the blue color
      >
        {/* Image */}
        {feature.imagePlacement === "left" && (
          <div className="flex items-center justify-center mb-6 md:mb-0" style={{ borderRadius: '1rem', padding: '1.5rem' }}>
            <motion.img
              src={feature.image}
              alt={feature.title}
              className="w-64 h-64 object-contain rounded-xl border border-white/20 bg-white/10 cursor-pointer"
            />
          </div>
        )}

        {/* Text Content */}
        <motion.div
          className="flex-1 flex flex-col items-start justify-center max-w-xl cursor-pointer"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4 text-white drop-shadow-lg"
            style={{ fontFamily: 'Geist, Arial, sans-serif', letterSpacing: '-0.03em' }}
          >
            {feature.title}
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-2">
            {feature.description}
          </p>
        </motion.div>

        {/* Image */}
        {feature.imagePlacement === "right" && (
          <div className="flex items-center justify-center mb-6 md:mb-0" style={{ borderRadius: '1rem', padding: '1.5rem' }}>
            <motion.img
              src={feature.image}
              alt={feature.title}
              className="w-64 h-64 object-contain rounded-xl border border-white/20 bg-white/10 cursor-pointer"
            />
          </div>
        )}
      </motion.section>
    );
  }