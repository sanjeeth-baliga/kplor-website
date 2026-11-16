"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroScene() {
  const [scene, setScene] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setScene((s) => (s + 1) % 3);
    }, 4500);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative w-full aspect-[4/3] md:aspect-[16/9] max-w-5xl mx-auto flex items-center justify-center pointer-events-none">
      <svg viewBox="0 0 1000 600" className="w-full h-full overflow-visible">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-heavy" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="15" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="screen-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a2347" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#04152e" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        
        {/* Ambient background particles */}
        <motion.g 
          initial={{ scale: 1, opacity: 0.08 }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.08, 0.15, 0.08] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} 
          style={{ transformOrigin: "500px 300px" }}
        >
          <circle cx="500" cy="300" r="280" fill="#2bc4ff" filter="blur(120px)" />
        </motion.g>

        {/* 1. THE INPUT (Floating Document) */}
        <g transform="translate(150, 300)">
          <motion.g 
            initial={{ y: -10 }}
            animate={{ y: [-10, 10, -10] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Document Base with softened drop shadow */}
            <path 
              d="M -33,-43 L 15,-43 L 33,-25 L 33,43 L -33,43 Z" 
              fill="#ffffff" stroke="#ffffff" strokeWidth="4" strokeLinejoin="round" 
              style={{ filter: "drop-shadow(0px 15px 25px rgba(0,0,0,0.25)) drop-shadow(0px 5px 10px rgba(0,0,0,0.15))" }} 
            />
            {/* Folded Corner */}
            <path 
              d="M 15,-43 L 33,-25 L 15,-25 Z" 
              fill="#f1f5f9" stroke="#f1f5f9" strokeWidth="4" strokeLinejoin="round" 
              style={{ filter: "drop-shadow(-2px 3px 5px rgba(0,0,0,0.25))" }} 
            />
            
            {/* Document Lines */}
            <rect x="-15" y="-10" width="35" height="6" rx="3" fill="#0f2a52" />
            <rect x="-15" y="8" width="25" height="6" rx="3" fill="#0f2a52" />
            <rect x="-15" y="26" width="30" height="6" rx="3" fill="#0f2a52" />
            
            <motion.g 
              initial={{ scale: 0.5, opacity: 0.8 }} 
              animate={{ scale: 2.2, opacity: 0 }} 
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <circle cx="0" cy="0" r="50" fill="none" stroke="#2bc4ff" strokeWidth="2" />
            </motion.g>
          </motion.g>
        </g>
        
        {/* DATA STREAM (Doc -> Table) */}
        <g stroke="#2bc4ff" strokeWidth="2.5" strokeDasharray="8 8" fill="none">
          <motion.path 
            d="M 210 300 C 280 250, 350 350, 420 370"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: [0, -32] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </g>
        <motion.g
          initial={{ x: 210, y: 300, opacity: 0 }}
          animate={{ x: [210, 280, 350, 420], y: [300, 270, 330, 370], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="0" cy="0" r="6" fill="#2bc4ff" filter="url(#glow)" />
        </motion.g>

        {/* 2. THE EXPERIMENT (Avatar + Table) */}
        <g transform="translate(480, 350)">
          <path d="M-140,50 L140,50 L160,80 L-160,80 Z" fill="#0f2a52" stroke="#2bc4ff" strokeWidth="2" />
          <rect x="-140" y="80" width="280" height="12" fill="#0a1b38" stroke="#2bc4ff" strokeWidth="2" />
          <rect x="-120" y="52" width="240" height="2" fill="#2bc4ff" filter="url(#glow)" />
          
          <g transform="translate(-60, -10)">
            <path d="M-10,-15 Q0,-25 10,-15 Q35,25 35,60 L-35,60 Q-35,25 -10,-15 Z" fill="#ffffff" filter="url(#glow)" />
            <motion.g 
              initial={{ y: 0 }}
              animate={{ y: [0, -6, 0] }} 
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <circle cx="0" cy="-48" r="18" fill="#2bc4ff" filter="url(#glow-heavy)" />
            </motion.g>
            <motion.path 
              d="M 20 20 Q 40 10 60 30 Q 80 50 100 40" 
              fill="none" stroke="#2bc4ff" strokeWidth="4" strokeLinecap="round" filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </g>
          <g transform="translate(60, 50)">
            <path d="M-35,0 L35,0 L25,-15 L-25,-15 Z" fill="#16335f" />
            <polygon points="-15,-15 15,-15 0,-45" fill="#2bc4ff" opacity="0.4" />
            
            <motion.g 
              initial={{ rotate: 0, scale: 1 }}
              animate={{ rotate: 360, scale: [1, 1.2, 1] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }} 
              style={{ transformOrigin: "0px -45px" }}
            >
              <circle cx="0" cy="-45" r="18" fill="none" stroke="#f5a524" strokeWidth="3" filter="url(#glow)" />
            </motion.g>
            <circle cx="0" cy="-45" r="6" fill="#f5a524" filter="url(#glow)" />
            
            {[
              { id: 0, xOffset: -20, delay: 0 },
              { id: 1, xOffset: 15, delay: 0.7 },
              { id: 2, xOffset: 5, delay: 1.4 }
            ].map((p) => (
              <motion.g
                key={p.id}
                initial={{ x: 0, y: -45, opacity: 0 }}
                animate={{ y: -140, x: p.xOffset, opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: p.delay }}
              >
                <circle cx="0" cy="0" r="4" fill="#2bc4ff" filter="url(#glow)" />
              </motion.g>
            ))}
          </g>
        </g>
        
        {/* DATA STREAM (Experiment -> Video Screen) */}
        <g stroke="#f5a524" strokeWidth="3" strokeDasharray="10 10" fill="none">
          <motion.path 
            d="M 580 380 C 650 350, 700 250, 750 250"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: [0, -40] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </g>
        <motion.g
          initial={{ x: 580, y: 380, opacity: 0 }}
          animate={{ x: [580, 650, 700, 750], y: [380, 310, 250, 250], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="0" cy="0" r="6" fill="#f5a524" filter="url(#glow)" />
        </motion.g>

        {/* 3. THE OUTPUT (Holographic Video Screen) */}
        <g transform="translate(800, 250)">
          <rect x="-160" y="-120" width="320" height="200" rx="12" fill="url(#screen-grad)" stroke="#2bc4ff" strokeWidth="3" filter="url(#glow)" />
          
          <path d="M-40,80 L40,80 L60,130 L-60,130 Z" fill="#0f2a52" />
          <rect x="-70" y="130" width="140" height="8" rx="4" fill="#2bc4ff" />
          
          <circle cx="0" cy="105" r="10" fill="#16335f" />
          <polygon points="-2,100 5,105 -2,110" fill="#2bc4ff" filter="url(#glow)" />
          <g transform="translate(-160, -120)">
            <AnimatePresence mode="wait">
              {scene === 0 && <SceneK12 key="k12" />}
              {scene === 1 && <SceneSupplyChain key="supply" />}
              {scene === 2 && <SceneCorporate key="corp" />}
            </AnimatePresence>
          </g>
        </g>
      </svg>
    </div>
  );
}
function SceneK12() {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5 }}
    >
      <text x="160" y="35" fill="#2bc4ff" fontSize="18" fontWeight="bold" textAnchor="middle" letterSpacing="2">K-12 EDUCATION</text>
      
      <g transform="translate(160, 110)">
        <circle cx="0" cy="0" r="12" fill="#f5a524" />
        <motion.g initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}>
          <ellipse cx="0" cy="0" rx="50" ry="18" fill="none" stroke="#2bc4ff" strokeWidth="3" />
        </motion.g>
        <motion.g initial={{ rotate: 60 }} animate={{ rotate: 420 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "0 0" }}>
          <ellipse cx="0" cy="0" rx="50" ry="18" fill="none" stroke="#2bc4ff" strokeWidth="3" />
        </motion.g>
        <motion.g initial={{ rotate: 120 }} animate={{ rotate: 480 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "0 0" }}>
          <ellipse cx="0" cy="0" rx="50" ry="18" fill="none" stroke="#2bc4ff" strokeWidth="3" />
        </motion.g>
      </g>
      
      <motion.g initial={{ y: -5 }} animate={{ y: [-5, 5, -5] }} transition={{ duration: 2, repeat: Infinity }}>
        <text x="50" y="80" fill="#ffffff" fontSize="28">∑</text>
      </motion.g>
      <motion.g initial={{ y: 5 }} animate={{ y: [5, -5, 5] }} transition={{ duration: 2.5, repeat: Infinity }}>
        <text x="250" y="140" fill="#ffffff" fontSize="28">π</text>
      </motion.g>
    </motion.g>
  );
}
function SceneSupplyChain() {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5 }}
    >
      <text x="160" y="35" fill="#58d68d" fontSize="18" fontWeight="bold" textAnchor="middle" letterSpacing="2">SUPPLY CHAIN</text>
      
      <rect x="40" y="140" width="240" height="12" rx="6" fill="#16335f" />
      
      {[50, 105, 160, 215, 270].map(x => (
        <motion.g key={x} initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: `${x}px 146px` }}>
          <circle cx={x} cy="146" r="4" fill="#2bc4ff" />
        </motion.g>
      ))}
      
      <motion.g
        initial={{ x: 40 }}
        animate={{ x: [40, 240, 40] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
      >
        <rect x="0" y="90" width="40" height="40" rx="4" fill="#f5a524" />
        <line x1="0" y1="110" x2="40" y2="110" stroke="#d98f1c" strokeWidth="2" />
        <line x1="20" y1="90" x2="20" y2="130" stroke="#d98f1c" strokeWidth="2" />
      </motion.g>
      <path d="M 240 140 L 240 70 L 270 50 L 300 70 L 300 140 Z" fill="#2bc4ff" opacity="0.3" />
    </motion.g>
  );
}
function SceneCorporate() {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5 }}
    >
      <text x="160" y="35" fill="#f5a524" fontSize="18" fontWeight="bold" textAnchor="middle" letterSpacing="2">CORPORATE</text>
      
      <rect x="50" y="160" width="220" height="2" fill="#ffffff" opacity="0.3" />
      
      <motion.rect x="70" width="30" fill="#2bc4ff" initial={{ height: 0, y: 160 }} animate={{ height: 30, y: 130 }} transition={{ duration: 1 }} />
      <motion.rect x="130" width="30" fill="#58d68d" initial={{ height: 0, y: 160 }} animate={{ height: 60, y: 100 }} transition={{ duration: 1, delay: 0.2 }} />
      <motion.rect x="190" width="30" fill="#f5a524" initial={{ height: 0, y: 160 }} animate={{ height: 90, y: 70 }} transition={{ duration: 1, delay: 0.4 }} />
      <motion.path 
        d="M 85 130 L 145 100 L 205 70 L 250 50" 
        fill="none" stroke="#ffffff" strokeWidth="4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
      />
      
      <motion.g initial={{ x: 250, y: 50, scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.5 }}>
        <circle cx="0" cy="0" r="6" fill="#ffffff" />
      </motion.g>
    </motion.g>
  );
}
