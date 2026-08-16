import { motion } from "motion/react";
import { useState } from "react";

export function DelayedHoverZone() {
  const [isHovered, setIsHovered] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  
  return (
    <div className="relative w-full aspect-square overflow-hidden border border-[#222] bg-[#0A0A0A] flex items-center justify-center group">
      <div className="absolute top-0 left-0 p-6 flex flex-col pointer-events-none z-30">
        <h3 className="text-[11px] font-mono text-white/90 uppercase tracking-[0.2em] mb-3">03 — DELAY</h3>
        <p className="text-[10px] font-mono text-white/40 max-w-[240px] uppercase leading-relaxed tracking-wider">
          Sustained presence filters accidental hover activation.
        </p>
      </div>

      {/* Explosive Background when activated */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActivated ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <img 
          src="/kinetic-field.svg" alt=""
          className="w-full h-full object-cover hue-rotate-180 scale-110 saturate-200"
        />
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
      </motion.div>

      <motion.div 
        className="relative border border-white/20 overflow-hidden w-[180px] h-[180px] flex items-center justify-center shadow-lg z-10 bg-[#0A0A0A]"
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => {
          setIsHovered(false);
          setIsActivated(false);
        }}
        animate={{ 
          scale: isActivated ? 5 : isHovered ? 1.2 : 1,
          borderRadius: isActivated ? "0%" : isHovered ? "50%" : "0%",
          borderColor: isActivated ? "rgba(255,255,255,0)" : isHovered ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.15)",
          opacity: isActivated ? 0 : 1
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Fill Layer */}
        <motion.div
          className="absolute inset-0 bg-white text-black flex flex-col items-center justify-center z-10"
          initial={{ y: "100%" }}
          animate={{ y: isHovered ? "0%" : "100%" }}
          transition={{ 
            duration: isHovered ? 0.8 : 0.4, 
            ease: isHovered ? "linear" : [0.16, 1, 0.3, 1] 
          }}
          onAnimationComplete={() => {
            if (isHovered) setIsActivated(true);
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center mix-blend-difference text-white z-20">
          <motion.div 
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 4, ease: "linear", repeat: Infinity }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
               <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
            </svg>
          </motion.div>
          
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase mt-6 font-bold">
            Hold
          </span>
        </div>
      </motion.div>
    </div>
  );
}
