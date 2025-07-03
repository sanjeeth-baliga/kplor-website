// app/about/page.tsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link"; // Import Link for internal navigation or external links
import { FaLinkedin, FaEnvelope } from 'react-icons/fa'; // Import icons

// Define the data for team members
const teamMembers = [
    {
        name: "Mukil",
        role: "Co-Founder & CEO",
        oneLiner: "Passionate about revolutionizing education with AI.",
        photo: "/mukil.jpg", // Replace with actual image paths
        linkedin: "https://www.linkedin.com/in/mukil-vannan-804706a5/",
        email: "john.doe@example.com",
    },
    {
        name: "Sanjeeth",
        role: "Co-Founder & CTO",
        oneLiner: "Building intelligent systems that empower learners.",
        photo: "/sanjeeth.jpg",
        linkedin: "https://www.linkedin.com/in/sanjeethbaliga/",
        email: "jane.smith@example.com",
    },
    {
        name: "Nitesh",
        role: "Founding Team-AI Engineer",
        oneLiner: "Crafting engaging and adaptive learning experiences.",
        photo: "/nitesh.jpg",
        linkedin: "https://www.linkedin.com/in/nitesh-wadhavinde/",
        email: "alice.johnson@example.com",
    },
];

const neonBlue = '#00FFFF'; // Reusing the neonBlue color from page.tsx

export default function AboutPage() {
    return (
        <main className="flex flex-col items-center justify-start min-h-[80vh] px-2 sm:px-4 pt-8 sm:pt-12">
            {/* About Us Title */}
            <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-center text-white mb-8 sm:mb-16 drop-shadow-lg"
            >
                Meet Our Team
            </motion.h1>

            {/* Team Profiles Section */}
            <section className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 px-4">
                {teamMembers.map((member, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
                        className="bg-white/10 rounded-2xl p-8 flex flex-col items-center text-center shadow-xl backdrop-blur-sm"
                        style={{ minHeight: '320px', backgroundColor: 'rgba(3, 40, 89, 0.65)' }} // Consistent background with feature sections
                    >
                        {/* Photo */}
                        <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-white/20 shadow-lg">
                            <img
                                src={member.photo}
                                alt={member.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Name and Role */}
                        <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">{member.name}</h2>
                        <p className="text-lg text-[#00FFFF] mb-4 font-semibold">{member.role}</p> {/* Neon blue for role */}
                        <p className="text-white/90 text-md mb-6">{member.oneLiner}</p>

                        {/* Social Links */}
                        <div className="flex space-x-6">
                            <Link href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="text-white hover:text-[#00FFFF] transition-colors duration-200"
                                >
                                    <FaLinkedin size={30} />
                                </motion.div>
                            </Link>
                            <Link href={`mailto:${member.email}`}>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="text-white hover:text-[#00FFFF] transition-colors duration-200"
                                >
                                    <FaEnvelope size={30} />
                                </motion.div>
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </section>

            {/* Join Us Button */}
            <section className="w-full text-center py-8">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-8 drop-shadow-lg">
                    Want to join our mission?
                </h2>
                <motion.a
                    href="/careers" // Link to your careers page or an external application link
                    whileHover={{scale: 1.08, boxShadow: `0 0 15px ${neonBlue}, 0 0 30px ${neonBlue}` }}
                    className=" bg-[#00FFFF] text-[#032859] font-bold py-4 px-10 rounded-full shadow-md hover:shadow-xl transition-all duration-200 text-xl"
                    style={{boxShadow: `0 0 8px ${neonBlue}`}}
                >
                    Join Us!
                </motion.a>
            </section>
        </main>
    );
}