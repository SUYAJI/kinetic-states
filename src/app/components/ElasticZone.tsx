import { motion, useSpring, useMotionValue } from "motion/react";
import { useRef } from "react";
import { kineticImage } from "../imagery";

export function ElasticZone() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scaleX = useMotionValue(1);
  const scaleY = useMotionValue(1);
  
  const springX = useSpring(x, { stiffness: 40, damping: 4, mass: 1 });
  const springY = useSpring(y, { stiffness: 40, damping: 4, mass: 1 });
  const springScaleX = useSpring(scaleX, { stiffness: 60, damping: 6, mass: 1 });
  const springScaleY = useSpring(scaleY, { stiffness: 60, damping: 6, mass: 1 });

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    
    if (distance < 300) {
      x.set(distanceX * 0.7);
      y.set(distanceY * 0.7);
      
      scaleX.set(1 + Math.abs(distanceX) * 0.015);
      scaleY.set(Math.max(0.3, 1 - Math.abs(distanceY) * 0.005));
    } else {
      x.set(0);
      y.set(0);
      scaleX.set(1);
      scaleY.set(1);
    }
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
    scaleX.set(1);
    scaleY.set(1);
  };

  return (
    <div 
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full aspect-square overflow-hidden border border-[#222] bg-[#0A0A0A] flex items-center justify-center group"
    >
      <div className="absolute top-0 left-0 p-6 flex flex-col pointer-events-none z-30">
        <h3 className="text-[11px] font-mono text-white/90 uppercase tracking-[0.2em] mb-3">05: ELASTIC</h3>
        <p className="text-[10px] font-mono text-white/40 max-w-[240px] uppercase leading-relaxed tracking-wider">
          Studies tension feedback before commitment.
        </p>
      </div>

      <motion.div
        style={{ 
          x: springX, 
          y: springY,
          scaleX: springScaleX,
          scaleY: springScaleY
        }}
        className="w-32 h-32 flex items-center justify-center relative z-20 overflow-hidden font-mono text-[10px] tracking-[0.3em] uppercase transition-colors"
      >
        <img 
          src={kineticImage(1080)} alt=""
          className="absolute inset-0 w-full h-full object-cover hue-rotate-[240deg] rounded-[64px]"
        />
        <div className="absolute inset-0 rounded-[64px] shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] z-10" />
        <span className="relative z-20 font-bold mix-blend-difference opacity-100 text-white drop-shadow-md">Stretch</span>
      </motion.div>
    </div>
  );
}
