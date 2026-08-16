import { motion, useSpring, useMotionValue, useTransform } from "motion/react";
import { useRef } from "react";

export function ParallaxZone() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Base smooth values
  const smoothX = useSpring(x, { stiffness: 100, damping: 20, mass: 1 });
  const smoothY = useSpring(y, { stiffness: 100, damping: 20, mass: 1 });

  // Layer 1 (Background - Moves opposite and slow)
  const bgX = useTransform(smoothX, (v) => v * -0.1);
  const bgY = useTransform(smoothY, (v) => v * -0.1);
  
  // Rotate based on position
  const rotateX = useTransform(smoothY, (v) => v * -0.05);
  const rotateY = useTransform(smoothX, (v) => v * 0.05);

  // Layer 2 (Midground - Moves with cursor, medium speed)
  const midX = useTransform(smoothX, (v) => v * 0.3);
  const midY = useTransform(smoothY, (v) => v * 0.3);

  // Layer 3 (Foreground - Moves fast)
  const fgX = useTransform(smoothX, (v) => v * 0.6);
  const fgY = useTransform(smoothY, (v) => v * 0.6);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full aspect-square overflow-hidden border border-[#222] bg-[#0A0A0A] flex items-center justify-center group"
      style={{ perspective: 1000 }}
    >
      <div className="absolute top-0 left-0 p-6 flex flex-col pointer-events-none z-30">
        <h3 className="text-[11px] font-mono text-white/90 uppercase tracking-[0.2em] mb-3">06 — PARALLAX</h3>
        <p className="text-[10px] font-mono text-white/40 max-w-[240px] uppercase leading-relaxed tracking-wider">
          Explores layered depth cues during navigation.
        </p>
      </div>

      {/* Deep Background Layer */}
      <motion.div 
        className="absolute inset-0 z-0 scale-[1.3] opacity-40"
        style={{ x: bgX, y: bgY, rotateX, rotateY }}
      >
        <img 
          src="/kinetic-field.svg" alt=""
          className="w-full h-full object-cover hue-rotate-180"
        />
      </motion.div>

      {/* Mid Layer */}
      <motion.div 
        className="absolute z-10 w-48 h-48 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm"
        style={{ x: midX, y: midY }}
      >
        {/* Inner element that moves slightly differently to create a glass-like refraction effect */}
        <motion.div
           className="w-full h-full rounded-full border border-white/10"
           style={{ x: fgX, y: fgY }}
        />
      </motion.div>

      {/* Foreground Layer */}
      <motion.div 
        className="relative z-20 font-mono text-5xl tracking-tighter font-black text-white mix-blend-difference pointer-events-none drop-shadow-2xl"
        style={{ x: fgX, y: fgY }}
      >
        DEPTH
      </motion.div>
    </div>
  );
}
