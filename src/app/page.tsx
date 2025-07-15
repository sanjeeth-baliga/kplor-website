// page.tsx
"use client";
import { motion, useInView } from "framer-motion";
import Carousel from "./Carousel";
import './pulse.css';
import { useState, useEffect, useRef } from 'react';
//import { FaLinkedin, FaEnvelope } from 'react-icons/fa'; // Import icons
//import {  FaXTwitter, FaYoutube, FaInstagram } from 'react-icons/fa6';
//import { SaturnRings } from './saturn_rings';
// Removed: import NeuronGridBackground from "./NeuronGridBackground";

const animatedWords = ["aspirants", "hustlers", "toppers", "procrastinators"];
const qualityWords = ["guide", "teach", "practice", "declutter"];

type Feature = {
    title: string;
    description: string;
    image: string;
    imagePlacement: "left" | "right";
};

const features: Feature[] = [
    {
        title: "Study What Matters, When it Matters",
        description: "Kplor is that studious friend who knows what to focus on and in what order. Learn and practice what your examiners want on the answer sheet.",
        image: "/learning_path.gif",
        imagePlacement: "right", // "left" or "right"
    },
    {
        title: "Liberate yourself from comparison or judgement",
        description: "Kplor won't judge your pace, your questions or your panic. Whether you need a slower pace, a confidence boost, or a moment to breathe, it's got your back",
        image: "/study_mate.png",
        imagePlacement: "left",
    },
    {
        title: "Your questions answered before you forget them",
        description: "No more waiting on professors or chasing replies. With instant doubt solving and smarter assessments, Kplor answers your questions before they fade or get buried",
        image: "/Engaging_video.gif",
        imagePlacement: "right",
    },
    {
        title: "So Bingeworthy, you'll Forget you are studying",
        description: "With vibrant videos and dynamic explanations, even the toughest topics feel alive and addictive with Kplor",
        image: "/doubt_assessment.gif",
        imagePlacement: "left",
    },
    {
        title: "Get rescued when caught in doom scrolling",
        description: "Kplor sees when you're zoning out, scrolling away, or just done. It nudges you back and keeps your study streak alive",
        image: "/attention.png",
        imagePlacement: "right",
    },
    {
        title: "Your Data. Your Space. No Exceptions",
        description: "Kplor protects your privacy like a fortress. No raw visuals stored. No voice stored. No data shared",
        image: "/safe_data.png",
        imagePlacement: "left",
    }

];

const neonBlue = '#00FFFF';

type FAQ = {
    question: string;
    answer: string;
};

// Dummy FAQ data
const faqs: FAQ[] = [
    {
        question: "Which courses can I learn from Kplor?",
        answer: "Engineering Mathematics for now, but other subjects are in the pipeline based on an interest gauging exercise."
    },
    { 
        question: "What if my course isn’t on Kplor yet?",
        answer: "Just request it & upload your details. Once enough of your friends do the same, Kplor builds the course in days and BAM! You’re learning.",
    },
    {
        question: "Is it specific to any university students?",
        answer: "Kplor can be trained on all Top Indian universities curriculum; User can pick / choose relevant topics."
    },
    {
        question: "Is it free to use or paid?",
        answer: "The beta version is free to use, but will eventually charge a nominal one time fee. Sign-up early for free credits."
    },
    {
        question: "Does Kplor store my data? What about its safety?",
        answer: "Your raw facial and voice data won't be stored. Kplor does not share data with third parties."
    },
    {
        question: "What devices and browsers are supported?",
        answer: "Currently, you can run Kplor on any web browser from Desktop. We are building for smartphones and tablets. Stay tuned for the launch."
    },
    {
        question: "Is the AI watching me while using the platform?",
        answer: "To ensure the best experience, Kplor will periodically watch you and gauge your emotions. But any raw data captured is immediately deleted."
    },
    {
        question: "Can I turn off the camera?",
        answer: "Yes, you can opt out of facial tracking. But distraction detection will be disabled in this case."
    },
    {
        question: "How will it help me hack my grades within a short span?",
        answer: "Kplor runs an algorithm that identifies the key topics and questions required to crack an exam based on past university papers. It can roll out practice assessments while explaining unclear concepts with this understanding"   
    },
    {
        question: "Will it give proper conceptual explanations or just give answers?",
        answer: "Kplor is the answer to all your learning requirements - whether it is understanding a concept, resolving a doubt, clearing out fundamentals or solving practice problems with you"
    },
    {
        question: "Can Kplor create a study schedule based on a deadline?",
        answer: "Yes, it can. Just let it know where you are right now, where you want to get and how much time you have."
    },
    {
        question: "I'm a professor. How can I get my students to use it?",
        answer: "Just write to our founder at mukil@kplor.com and we will reach out to you."
    }

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
        <>
            <div className="overflow-x-hidden">
                {/* Hero Section with Gradient Background */}
                <section
                    className="relative w-full overflow-hidden px-2 sm:px-4 pt-6 sm:pt-8 min-h-[70vh] flex flex-col items-center justify-start"
                    style={{
                        // Changed gradient to be more gradual and include a light blue tint
                        background: 'linear-gradient(to bottom right, rgb(40, 98, 173) 0%, rgb(9, 44, 91) 50%, #E0F2F7 85%, #FFFFFF 100%)',
                        color: '#032859' // Changed text color to dark blue for better visibility as background lightens
                    }}
                >
                    {/* Content of the Hero Section */}
                    <div className="flex flex-col md:flex-row items-start justify-center w-full max-w-7xl mx-auto z-10"> {/* Changed items-center to items-start for alignment */}
                        {/* Title and One-Liner */}
                        <div className="md:w-6/12 p-4 sm:p-8 flex flex-col justify-start">
                            <motion.h1
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="text-3xl sm:text-6xl md:text-8xl font-extrabold text-center md:text-left mb-4 sm:mb-6 drop-shadow-lg text-white"
                            >
                                Hack Your Grades
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                                className="text-base sm:text-lg md:text-2xl text-center md:text-left max-w-2xl mb-4 sm:mb-6 text-white"
                            >
                                Built for the{" "}
                                <motion.span
                                    key={currentWordIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="font-bold text-[#00FFFF]"
                                >
                                    {animatedWords[currentWordIndex]}
                                </motion.span>{" "}
                                . A sidekick to effortlessly guide and save last minute exam panic
                            </motion.p>
                        </div>

                        {/* Demo Video */}
                        <div className="md:w-6/12 p-2 sm:p-4 flex flex-col items-center justify-center w-full" style={{overflow:'visible', minHeight: '320px'}}>
                            <div className="relative z-10 w-full max-w-[630px] h-[180px] sm:h-[260px] md:h-[360px] mx-auto" style={{marginTop: 0}}>
                                <iframe
                                src="https://www.youtube.com/embed/ibTHRYUtktE"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="w-full h-full rounded-2xl shadow-2xl border-4 border-white/30"
                                ></iframe>
                            </div>
                        </div>
                    </div>

                    {/* Try Now Button (part of Hero Section) */}
                    <div className="flex flex-col items-center mt-8 mb-24 z-10"> {/* Changed to flex-col and added items-center */}
                        <motion.a
                            href="https://live.kplor.kplor.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{scale: 1.08, boxShadow: `0 0 15px ${neonBlue}, 0 0 30px ${neonBlue}` }}
                            className=" bg-[#00FFFF] text-[#032859] font-bold py-6 px-12 rounded-full shadow-md hover:shadow-xl transition-all duration-200 text-2xl"
                            style={{boxShadow: `0 0 8px ${neonBlue}`}}
                        >
                            Try the Cheat Code for Free
                        </motion.a>
                        
                        {/* No Credit Card Required Animation */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="mt-2 flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-sm bg-white/10 border border-white/20 shadow-sm"
                            style={{ backgroundColor: 'rgba(3, 40, 89, 0.45)' }}
                        >
                            <motion.div
                                animate={{ 
                                    scale: [1, 1.15, 1],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{ 
                                    duration: 1.5, 
                                    repeat: Infinity, 
                                    ease: "easeInOut",
                                    times: [0, 0.5, 0.75, 1]
                                }}
                                className="text-green-400 text-base font-normal"
                            >
                                ✓
                            </motion.div>
                            <motion.p
                                animate={{ 
                                    opacity: [0.6, 1, 0.6],
                                    x: [0, 2, 0]
                                }}
                                transition={{ 
                                    duration: 2, 
                                    repeat: Infinity, 
                                    ease: "easeInOut",
                                    times: [0, 0.5, 1]
                                }}
                                className="text-white text-xs font-normal"
                            >
                                No credit card required
                            </motion.p>
                        </motion.div>
                    </div>

                </section>

                {/* Main Content Area (White Background) */}
                <main className="flex flex-col items-center justify-start w-full px-2 sm:px-4">
                    {/* Loved by Students At - visible before scroll */}
                    <div className="text-center text-4xl font-extrabold text-gray-900 mt-12 mb-2 tracking-tight drop-shadow-lg">
                        Loved by students at
                    </div>
                    <section className="w-full max-w-5xl mx-auto mb-24 bg-white py-4 rounded-2xl px-2 sm:px-6">
                        <Carousel/>
                    </section>
                    {/* Content after carousel with radial gradient background */}
                    <div
                      id="features-section"
                      className="w-full flex flex-col items-center py-16 px-2 sm:px-6 md:px-12 lg:px-0"
                      style={{
                        background: 'linear-gradient(to bottom right, #fff 0%, #e0f2f7 20%, rgb(40, 98, 173) 50%, rgb(9, 44, 91) 100%)'
                      }}
                    >
                      <div className="text-center text-4xl font-bold text-gray-800 drop-shadow-lg mb-12 mt-6">
                          What makes Kplor a Grade Hacking Machine
                      </div>

                      {/* Feature Sections in translucent cards */}
                      <div className="w-full flex flex-col items-center">
                        {features.map((feature, index) => (
                            //<div key={index} className="backdrop-blur-md bg-white/20 rounded-2xl shadow-xl mb-8 w-full max-w-5xl">
                            <FeatureSection
                                key={index}
                                feature={feature}
                            />
                            //</div>
                        ))}
                      </div>

                      {/* FAQ Section in translucent card */}
                      <section className="w-full max-w-4xl mx-auto my-16 px-2 sm:px-6 lg:px-0">
                        {/*<div className="backdrop-blur-md bg-white/20 rounded-2xl shadow-xl p-8">*/}
                          <h2 className="text-center text-4xl font-bold text-white drop-shadow-lg mb-12">
                              FAQs
                          </h2>
                          <div className="space-y-6">
                              {faqs.map((faq, index) => (
                                  <FAQItem key={index} question={faq.question} answer={faq.answer} />
                              ))}
                          </div>
                        {/*</div>*/}
                      </section>

                      {/* Final Call to Action - Now in a translucent card */}
                      <section className="w-full text-center py-16 px-2 sm:px-6 lg:px-0">
                        <div 
                            className="backdrop-blur-md bg-white/20 rounded-2xl shadow-xl p-8 max-w-4xl mx-auto"
                            style={{ backgroundColor: 'rgba(3, 40, 89, 0.65)' }}
                        >
                          <h2
                              className="text-3xl sm:text-4xl font-extrabold text-white mb-12 drop-shadow-lg leading-tight"
                              style={{ fontFamily: 'Geist, sans-serif' }}
                          >
                              The world is unfair and grades get you shortlists and admits. Overcome this hurdle now with Kplor
                          </h2>
                          <motion.a
                              href="https://live.kplor.kplor.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{scale: 1.08, boxShadow: `0 0 15px ${neonBlue}, 0 0 30px ${neonBlue}` }}
                              className="block w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto bg-[#00FFFF] text-[#032859] font-bold py-4 px-4 sm:px-10 rounded-full shadow-md hover:shadow-xl transition-all duration-200 text-lg sm:text-xl whitespace-normal text-center overflow-hidden"
                              style={{boxShadow: `0 0 8px ${neonBlue}`}}
                          >
                              Hack your Grades with Kplor Now!
                          </motion.a>
                        </div>
                      </section>
                    </div>

                </main>
            </div>
        </>
    );
}

// Separate component for FAQ Item
function FAQItem({ question, answer }: FAQ) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="backdrop-blur-sm bg-white/20 rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out"
            //style={{ backgroundColor: 'rgba(3, 40, 89, 0.65)' }} // Keep this as it's for the FAQ item itself
        >
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
                    ▼ {/* Unicode for a down arrow */}
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


function FeatureSection({ feature }: { feature: Feature }) {

    const ref = useRef(null);
    const isInView = useInView(ref, {once: true, amount: 0.2});  // Adjust 'amount' as needed

    const direction = feature.imagePlacement === "left" ? -1 : 1;
    const animationVariants = {
        hidden: {opacity: 0, x: 80 * direction, backgroundColor: 'rgba(3, 40, 89, 0.65)'},
        visible: {
            opacity: 1,
            x: 0,
            backgroundColor: 'rgba(3, 40, 89, 0.75)',
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
            className={`backdrop-blur-sm w-full flex flex-col md:flex-row items-center justify-center gap-10 rounded-2xl px-6 py-10 max-w-5xl mx-auto mb-16 ${isHighlighted ? 'shadow-xl' : 'shadow-md'}`}
            style={{minHeight: '320px'}}
        >
            {/* Image */}
            {feature.imagePlacement === "left" && (
                <div className="flex items-center justify-center mb-6 md:mb-0" style={{borderRadius: '1rem', padding: '1.5rem'}}>
                    <motion.img
                        src={feature.image}
                        alt={feature.title}
                        className="w-48 object-contain rounded-xl border border-white/20 bg-white/10 cursor-pointer" // Reduced image size
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
                        className="w-48 object-contain rounded-xl border border-white/20 bg-white/10 cursor-pointer" // Reduced image size
                    />
                </div>
            )}
        </motion.section>
    );
}
