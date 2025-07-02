// page.tsx
"use client";
import { motion, useInView } from "framer-motion";
import Carousel from "./Carousel";
import './pulse.css';
import { useState, useEffect, useRef } from 'react';
import { SaturnRings } from './saturn_rings';

const animatedWords = ["see", "talk", "listen"];


const features = [
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

const neonBlue = '#00FFFF';

// Dummy FAQ data
const faqs = [
    {
        question: "What is Kplor?",
        answer: "Kplor is your personalized AI tutor designed to help you learn efficiently by adapting to your learning style, providing interactive content, and offering smart doubt-solving."
    },
    {
        question: "How does Kplor personalize my learning?",
        answer: "Kplor creates a custom learning path based on your proficiency, goals, and time constraints, ensuring a tailored educational experience."
    },
    {
        question: "Can I talk to Kplor like a human tutor?",
        answer: "Yes, Kplor is designed for natural conversations. You can talk to your AI tutor about any topic or question you have."
    },
    {
        question: "What kind of content does Kplor offer?",
        answer: "Kplor provides immersive and interactive video lectures that adapt to your learning style, along with regular assessments and quizzes."
    },
    {
        question: "Is Kplor suitable for all subjects?",
        answer: "Kplor's core AI is versatile, but specific subject content availability may vary. We are continuously expanding our subject offerings."
    },
];


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
                <div className="md:w-5/12 p-4 relative" style={{overflow:'hidden'}}>
  {/* Saturn Rings Animation */}
  <SaturnRings />
  
  {/* Circle Pulse Animation */}
  <motion.div
    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-cyan-500 opacity-30 z-0"
    style={{  boxShadow: `0 0 60px ${neonBlue}, 0 0 80px ${neonBlue}`}}
    animate={{ scale: [1, 2, 1] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
  />
  <div className="relative z-10 w-full h-[250px]">
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
            <div className="flex justify-center mt-8 mb-12">
                <motion.a
                    href="https://live.kplor.kplor.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{scale: 1.08, boxShadow: `0 0 15px ${neonBlue}, 0 0 30px ${neonBlue}` }}
                    className=" bg-[#00FFFF] text-[#032859] font-bold py-4 px-8 rounded-full shadow-md hover:shadow-xl transition-all duration-200"
                    style={{boxShadow: `0 0 8px ${neonBlue}`}}
                >
                    Try Now!
                </motion.a>
            </div>


            {/* Loved by Students At */}
            <div className="text-center text-xl text-white/90 mb-4">
                Loved by students at
            </div>

            {/* Universities Carousel */}
            <section className="w-full mb-16">
                <Carousel/>
            </section>
            <div className="text-center text-4xl font-bold text-white drop-shadow-lg mb-8">
                Features
            </div>

            {/* Feature Sections */}
            {features.map((feature, index) => (
                <FeatureSection
                    key={index}
                    feature={feature}
                    index={index}
                />
            ))}

            {/* FAQ Section */}
            <section className="w-full max-w-4xl mx-auto my-16 px-4">
                <h2 className="text-center text-4xl font-bold text-white drop-shadow-lg mb-12">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </section>

            {/* Final Call to Action */}
            <section className="w-full text-center py-16">
                <h2 className="text-5xl sm:text-6xl font-extrabold text-white mb-12 drop-shadow-lg leading-tight">
                    Ready to revolutionize your learning?
                </h2>
                <motion.a
                    href="https://live.kplor.kplor.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{scale: 1.08, boxShadow: `0 0 15px ${neonBlue}, 0 0 30px ${neonBlue}` }}
                    className=" bg-[#00FFFF] text-[#032859] font-bold py-4 px-10 rounded-full shadow-md hover:shadow-xl transition-all duration-200 text-xl"
                    style={{boxShadow: `0 0 8px ${neonBlue}`}}
                >
                    Start Learning with Kplor Now!
                </motion.a>
            </section>

        </main>
    );
}

// Separate component for FAQ Item
function FAQItem({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white/10 rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out">
            <button
                className="w-full flex justify-between items-center p-6 text-left text-lg font-semibold text-white cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{question}</span>
                <motion.span
                    initial={false}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-4 text-2xl"
                >
                    &#9660; {/* Unicode for a down arrow */}
                </motion.span>
            </button>
            <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
            >
                <p className="p-6 pt-0 text-white/80">{answer}</p>
            </motion.div>
        </div>
    );
}


function FeatureSection({feature, index}: { feature: any, index: number }) {

    const ref = useRef(null);
    const isInView = useInView(ref, {once: true, amount: 0.2});  // Adjust 'amount' as needed

    const direction = feature.imagePlacement === "left" ? -1 : 1;
    const animationVariants = {
        hidden: {opacity: 0, x: 80 * direction},
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
            style={{minHeight: '320px', backgroundColor: 'rgba(3, 40, 89, 0.65)'}}  // Dimmed blue shade
        >
            {/* Image */}
            {feature.imagePlacement === "left" && (
                <div className="flex items-center justify-center mb-6 md:mb-0" style={{borderRadius: '1rem', padding: '1.5rem'}}>
                    <motion.img
                        src={feature.image}
                        alt={feature.title}
                        className="w-48 h-48 object-contain rounded-xl border border-white/20 bg-white/10 cursor-pointer" // Reduced image size
                    />
                </div>
            )}

            {/* Text Content */}
            <motion.div
                className="flex-1 flex flex-col items-start justify-center max-w-xl cursor-pointer"
            >
                <h2
                    className="text-3xl sm:text-4xl font-bold mb-4 text-white drop-shadow-lg"
                    style={{fontFamily: 'Geist, Arial, sans-serif', letterSpacing: '-0.03em'}}
                >
                    {feature.title}
                </h2>
                <p className="text-lg sm:text-xl text-white/90 mb-2">
                    {feature.description}
                </p>
            </motion.div>

            {/* Image */}
            {feature.imagePlacement === "right" && (
                <div className="flex items-center justify-center mb-6 md:mb-0" style={{borderRadius: '1rem', padding: '1.5rem'}}>
                    <motion.img
                        src={feature.image}
                        alt={feature.title}
                        className="w-48 h-48 object-contain rounded-xl border border-white/20 bg-white/10 cursor-pointer" // Reduced image size
                    />
                </div>
            )}
        </motion.section>
    );
}












