// page.tsx
"use client";
import { motion, useInView } from "framer-motion";
//import Carousel from "./Carousel";
// Add this import at the top
//import GifCarousel from "./GifCarousel";
import './pulse.css';
import { useState, useEffect, useRef } from 'react';
//import { FaLinkedin, FaEnvelope } from 'react-icons/fa'; // Import icons
//import {  FaXTwitter, FaYoutube, FaInstagram } from 'react-icons/fa6';
//import { SaturnRings } from './saturn_rings';
// Removed: import NeuronGridBackground from "./NeuronGridBackground";
const animatedWords = ["Videos", "AudioBooks", "PPTs", "Assessments"];
//const qualityWords = ["guide", "teach", "practice", "declutter"];

type Feature = {
    title: string;
    description: string;
    image: string;
    imagePlacement: "left" | "right";
};

const features: Feature[] = [
    {
        title: "Topic Explainers",
        description: "Unlock hidden value in notes, docs, and transcripts by turning them into explainer videos that simplify complex ideas.",
        image: "/f1.png",
        imagePlacement: "right", // "left" or "right"
    },
    {
        title: "Speed and Scale",
        description: "Produce 100+ hours of content per day even from raw, unorganized material",
        image: "/f2.png",
        imagePlacement: "left",
    },
    {
        title: "Contextual Learning",
        description: "Deliver relevant videos for learners tailored to your context and knowledge base",
        image: "/f3.png",
        imagePlacement: "right",
    },
    {
        title: "Engaging Visuals",
        description: "Crisp graphics, animations, and synchronized voiceovers that make learning memorable",
        image: "/f4.png",
        imagePlacement: "left",
    },
    {
        title: "Data safeguards",
        description: "Your data stays yours. We enforce strict privacy, security, and consent controls with zero third-party sharing.",
        image: "/f5.png",
        imagePlacement: "right",
    }

];

const neonBlue = '#00FFFF';

/*type FAQ = {
    question: string;
    answer: string;
};*/

// Dummy FAQ data
/*
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

];*/


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
                    background: 'linear-gradient(to bottom right, rgb(40, 98, 173) 0%, rgb(9, 44, 91) 50%, #E0F2F7 85%, #FFFFFF 100%)',
                    color: '#032859'
                }}
            >
                {/* Content of the Hero Section - Centered */}
                <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto z-10">
                    {/* Title and One-Liner - Centered with constrained width */}
                    <div className="w-full p-4 sm:p-8 flex flex-col justify-center items-center text-center">
                        <div className="w-full max-w-4xl">
                            <motion.h1
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="text-2xl sm:text-4xl md:text-6xl font-extrabold mb-4 sm:mb-6 drop-shadow-lg text-white"
                            >
                                Instantly Convert Text into Captivating{" "}
                                <span className="inline-block align-baseline min-w-[220px] sm:min-w-[320px] md:min-w-[450px] h-12 sm:h-16 md:h-24">
                                    <motion.span
                                        key={currentWordIndex}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className="font-bold text-[#00FFFF] inline-block text-left w-full"
                                    >
                                        {animatedWords[currentWordIndex]}
                                    </motion.span>
                                </span>
                            </motion.h1>
                            
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                                className="text-lg sm:text-xl md:text-2xl text-white mb-6"
                            >
                                Effortlessly turn manuals, courses, and study material into dynamic explainer videos
                            </motion.p>
                        </div>
                        
                        {/* Three Feature Cards - Centered */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mt-4 mb-8">
    {/* Card 1: Affordable at Scale */}
    <motion.div 
        className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-xl p-4 text-center border border-white/30 shadow-lg"
        whileHover={{ scale: 1.05, y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
    >
        <h3 className="font-bold text-white text-xl">Affordable at Scale</h3>
    </motion.div>
    
    {/* Card 2: Lightning-Fast Creation */}
    <motion.div 
        className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-xl p-4 text-center border border-white/30 shadow-lg"
        whileHover={{ scale: 1.05, y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
    >
        <h3 className="font-bold text-white text-xl">Lightning-Fast Creation</h3>
    </motion.div>
    
    {/* Card 3: Tailored for All */}
    <motion.div 
        className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-xl p-4 text-center border border-white/30 shadow-lg"
        whileHover={{ scale: 1.05, y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
    >
        <h3 className="font-bold text-white text-xl">Tailored for All</h3>
    </motion.div>
</div>
                        
                        {/* Two Buttons - Centered with equal width */}
                        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl justify-center mt-12">
                            <motion.a
                                href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2mPZpVSaMqZW8ltDDcJvcmm8JxnNs8eut6ZE_akpJJ5uehlz4ev8mWkg5HzZRUxUKxy-8ugk_d"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{scale: 1.08, boxShadow: `0 0 15px ${neonBlue}, 0 0 30px ${neonBlue}` }}
                                className="bg-[#00FFFF] text-[#032859] font-bold py-4 px-8 rounded-full shadow-md hover:shadow-xl transition-all duration-200 text-lg sm:text-xl whitespace-normal text-center block flex-1"
                                style={{boxShadow: `0 0 8px ${neonBlue}`}}
                            >
                                Book a Demo
                            </motion.a>
                            
                            <motion.a
                                href="https://drive.google.com/drive/folders/17_TfNvFvngVBKr8sLBKw1fEkUSZTY4wR"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{scale: 1.08, boxShadow: `0 0 15px ${neonBlue}, 0 0 30px ${neonBlue}` }}
                                className="bg-[#00FFFF] text-[#032852] font-bold py-4 px-8 rounded-full shadow-md hover:shadow-xl transition-all duration-200 text-lg sm:text-xl whitespace-normal text-center block flex-1"
                                style={{boxShadow: `0 0 8px ${neonBlue}`}}
                            >
                                Watch Sample Videos
                            </motion.a>
                        </div>
                    </div>
                </div>
            </section>
        

                {/* Main Content Area (White Background) */}
                <main className="flex flex-col items-center justify-start w-full px-2 sm:px-4 mt-13">
                    {/* Loved by Students At - visible before scroll */}
                    

{/* Trusted by Leaders in Learning Section */}
<div className="text-center text-4xl font-extrabold text-gray-900 mt-0 mb-10 tracking-tight drop-shadow-lg">
    Trusted by Leaders in Learning
</div>

{/* Cards Grid - 3 columns, 2 rows */}
<div className="w-full max-w-6xl mx-auto mb-24 grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
    {/* Card 1: 1000+ hours of content */}
    <motion.div 
        className="rounded-2xl p-6 text-center border border-white/30 shadow-xl"
        style={{ backgroundColor: '#032859' }}
        whileHover={{ scale: 1.05, y: -5, boxShadow: "0 10px 25px -5px rgba(0, 255, 255, 0.3)" }}
        transition={{ type: "spring", stiffness: 300 }}
    >
        <h3 className="font-bold text-white text-2xl mb-3">2,000+ hours</h3>
        <p className="text-white text-lg">of engaging content created</p>
    </motion.div>
    
    {/* Card 2: 10000+ multimodal videos delivered */}
    <motion.div 
        className="rounded-2xl p-6 text-center border border-white/30 shadow-xl"
        style={{ backgroundColor: '#032859' }}
        whileHover={{ scale: 1.05, y: -5, boxShadow: "0 10px 25px -5px rgba(0, 255, 255, 0.3)" }}
        transition={{ type: "spring", stiffness: 300 }}
    >
        <h3 className="font-bold text-white text-2xl mb-3">10,000+</h3>
        <p className="text-white text-lg">multimodal videos delivered</p>
    </motion.div>
    
    {/* Card 3: Loved by 20+ colleges */}
    <motion.div 
        className="rounded-2xl p-6 text-center border border-white/30 shadow-xl"
        style={{ backgroundColor: '#032859' }}
        whileHover={{ scale: 1.05, y: -5, boxShadow: "0 10px 25px -5px rgba(0, 255, 255, 0.3)" }}
        transition={{ type: "spring", stiffness: 300 }}
    >
        <h3 className="font-bold text-white text-2xl mb-3">20+ Colleges</h3>
        <p className="text-white text-lg">including IITs and IIMs</p>
    </motion.div>
    
    {/* Card 4: Partnered with Corporate L&Ds */}
    <motion.div 
        className="rounded-2xl p-6 text-center border border-white/30 shadow-xl"
        style={{ backgroundColor: '#032859' }}
        whileHover={{ scale: 1.05, y: -5, boxShadow: "0 10px 25px -5px rgba(0, 255, 255, 0.3)" }}
        transition={{ type: "spring", stiffness: 300 }}
    >
        <h3 className="font-bold text-white text-2xl mb-3">Corporate L&Ds</h3>
        <p className="text-white text-lg">Partnerships established</p>
    </motion.div>
    
    {/* Card 5: Integrated into multiple LMSs */}
    <motion.div 
        className="rounded-2xl p-6 text-center border border-white/30 shadow-xl"
        style={{ backgroundColor: '#032859' }}
        whileHover={{ scale: 1.05, y: -5, boxShadow: "0 10px 25px -5px rgba(0, 255, 255, 0.3)" }}
        transition={{ type: "spring", stiffness: 300 }}
    >
        <h3 className="font-bold text-white text-2xl mb-3">LMS Integration</h3>
        <p className="text-white text-lg">Seamlessly integrated into multiple platforms</p>
    </motion.div>
    
    {/* Card 6: Deployed in multiple domains */}
    <motion.div 
        className="rounded-2xl p-6 text-center border border-white/30 shadow-xl"
        style={{ backgroundColor: '#032859' }}
        whileHover={{ scale: 1.05, y: -5, boxShadow: "0 10px 25px -5px rgba(0, 255, 255, 0.3)" }}
        transition={{ type: "spring", stiffness: 300 }}
    >
        <h3 className="font-bold text-white text-2xl mb-3">Multiple Domains</h3>
        <p className="text-white text-lg">STEM, Business, Finance, Coding and K-12</p>
    </motion.div>
</div>

{/* Remove the two panels that were below the trusted section since we've incorporated that content into the cards */}
                    {/* Content after carousel with radial gradient background */}
                    <div
                      id="features-section"
                      className="w-full flex flex-col items-center py-16 px-2 sm:px-6 md:px-12 lg:px-0"
                      style={{
                        background: 'linear-gradient(to bottom right, #fff 0%, #e0f2f7 20%, rgb(40, 98, 173) 50%, rgb(9, 44, 91) 100%)'
                      }}
                    >
                      <div className="text-center text-4xl font-bold text-gray-800 drop-shadow-lg mb-12 mt-6">
                          How does Kplor Bring Learning Content to Life?
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
                              Free pilots available to get you started
                          </h2>
                          <motion.a
                              href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2mPZpVSaMqZW8ltDDcJvcmm8JxnNs8eut6ZE_akpJJ5uehlz4ev8mWkg5HzZRUxUKxy-8ugk_d"
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{scale: 1.08, boxShadow: `0 0 15px ${neonBlue}, 0 0 30px ${neonBlue}` }}
                              className="block w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto bg-[#00FFFF] text-[#032859] font-bold py-4 px-4 sm:px-10 rounded-full shadow-md hover:shadow-xl transition-all duration-200 text-lg sm:text-xl whitespace-normal text-center overflow-hidden"
                              style={{boxShadow: `0 0 8px ${neonBlue}`}}
                          >
                              Book a Demo
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
/*
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
                    ▼
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
}*/


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
                        className="w-64 object-contain rounded-xl border border-white/20 bg-white/10 cursor-pointer" // Reduced image size
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
                        className="w-64 object-contain rounded-xl border border-white/20 bg-white/10 cursor-pointer" // Reduced image size
                    />
                </div>
            )}
        </motion.section>
    );
}
