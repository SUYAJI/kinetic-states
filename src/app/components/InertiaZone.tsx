import { motion } from "motion/react";
import { useState } from "react";

export function InertiaZone() {
  const [isHoveringTarget, setIsHoveringTarget] = useState(false);

  return (
    <div 
      className="relative w-full aspect-square overflow-hidden border border-[#222] bg-[#0A0A0A] flex items-center justify-center group"
    >
      <div className="absolute top-0 left-0 p-6 flex flex-col pointer-events-none z-30">
        <h3 className="text-[11px] font-mono text-white/90 uppercase tracking-[0.2em] mb-3">01 — INERTIA</h3>
        <p className="text-[10px] font-mono text-white/40 max-w-[240px] uppercase leading-relaxed tracking-wider">
          Examines the feeling of pointer lag during approach.
        </p>
      </div>
      
      {/* Target Element - Extreme transform */}
      <motion.div 
        className="w-64 h-64 overflow-hidden relative shadow-2xl"
        onHoverStart={() => setIsHoveringTarget(true)}
        onHoverEnd={() => setIsHoveringTarget(false)}
        animate={{ 
          scale: isHoveringTarget ? 0.35 : 1,
          borderRadius: isHoveringTarget ? "50%" : "0%",
          rotate: isHoveringTarget ? 90 : 0
        }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      >
        <img 
          src="/kinetic-field.svg" alt=""
          className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-150"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none opacity-80 group-hover:opacity-0 transition-opacity" />
      </motion.div>
    </div>
  );
}
