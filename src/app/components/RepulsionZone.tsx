import { motion, useSpring, useMotionValue } from "motion/react";
import { useRef } from "react";

export function RepulsionZone() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // High stiffness for aggressive snapping away
  const springX = useSpring(x, { stiffness: 400, damping: 15, mass: 0.8 });
  const springY = useSpring(y, { stiffness: 400, damping: 15, mass: 0.8 });

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    // Center of the container, assume the object wants to return to center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Position of the object relative to viewport
    const objectX = centerX + springX.get();
    const objectY = centerY + springY.get();
    
    const distanceX = e.clientX - objectX;
    const distanceY = e.clientY - objectY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    
    // If pointer gets too close, repel strongly
    if (distance < 200) {
      // Repel in opposite direction
      x.set(x.get() - distanceX * 1.5);
      y.set(y.get() - distanceY * 1.5);
    } else {
      // Slowly drift back to center
      x.set(0);
      y.set(0);
    }
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
    >
      <div className="absolute top-0 left-0 p-6 flex flex-col pointer-events-none z-30">
        <h3 className="text-[11px] font-mono text-[#FF3333] uppercase tracking-[0.2em] mb-3">04 — REPULSION</h3>
        <p className="text-[10px] font-mono text-white/40 max-w-[240px] uppercase leading-relaxed tracking-wider">
          Tests negative force around critical actions.
        </p>
      </div>

      <motion.div
        style={{ x: springX, y: springY }}
        className="w-24 h-24 flex items-center justify-center relative z-20 overflow-hidden font-mono text-[10px] tracking-[0.3em] uppercase transition-colors"
        whileHover={{ scale: 0.8 }} // Extra squeeze if somehow caught
      >
        <img 
          src="/kinetic-field.svg" alt=""
          className="absolute inset-0 w-full h-full object-cover hue-rotate-[-30deg] contrast-150 saturate-200 rounded-full"
        />
        <div className="absolute inset-0 rounded-full border-2 border-[#FF3333] z-10" />
        <span className="relative z-20 font-bold mix-blend-difference opacity-100 text-white shadow-black drop-shadow-lg">Flee</span>
      </motion.div>
    </div>
  );
}
