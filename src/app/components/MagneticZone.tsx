import { motion, useSpring, useMotionValue } from "motion/react";
import { useRef, useState } from "react";
import { isWithinDistance } from "../interactionMath";

export function MagneticZone() {
  const ref = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Extreme bounciness
  const springX = useSpring(x, { stiffness: 200, damping: 10, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 200, damping: 10, mass: 0.5 });

  const [isAttracted, setIsAttracted] = useState(false);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!ref.current || !containerRef.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    
    if (isWithinDistance(distance, 350)) {
      // Very strong pull
      x.set(distanceX * 0.85);
      y.set(distanceY * 0.85);
      setIsAttracted(true);
    } else {
      x.set(0);
      y.set(0);
      setIsAttracted(false);
    }
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
    setIsAttracted(false);
  };

  return (
    <div 
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full aspect-square overflow-hidden border border-[#222] bg-[#0A0A0A] flex items-center justify-center group"
    >
      <div className="absolute top-0 left-0 p-6 flex flex-col pointer-events-none z-30">
        <h3 className="text-[11px] font-mono text-white/90 uppercase tracking-[0.2em] mb-3">02 — MAGNETIC</h3>
        <p className="text-[10px] font-mono text-white/40 max-w-[240px] uppercase leading-relaxed tracking-wider">
          Explores proximity pull in dense layouts.
        </p>
      </div>

      {/* Field Indicator */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/5 bg-white/[0.02] pointer-events-none" 
        animate={{ scale: isAttracted ? 1.1 : 0.9, opacity: isAttracted ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      />

      <motion.button
        ref={ref}
        style={{ x: springX, y: springY }}
        className="w-32 h-32 flex items-center justify-center relative z-20 overflow-hidden font-mono text-[10px] tracking-[0.3em] uppercase transition-colors"
        animate={{ 
          scale: isAttracted ? 1.8 : 1,
          borderRadius: isAttracted ? "50%" : "0%",
        }}
        transition={{ type: "spring", bounce: 0.5 }}
      >
        <img 
          src="/kinetic-field.svg" alt=""
          className="absolute inset-0 w-full h-full object-cover hue-rotate-90 saturate-150 transition-opacity duration-500 z-0"
          style={{ opacity: isAttracted ? 1 : 0.2 }}
        />
        <div className="absolute inset-0 bg-black/60 z-0 group-hover:bg-black/20 transition-colors" />
        <span className="relative z-10 font-bold mix-blend-difference opacity-100 text-white drop-shadow-md">Pull</span>
      </motion.button>
    </div>
  );
}
