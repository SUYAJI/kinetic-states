import { motion, useSpring, useMotionValue, type MotionValue } from "motion/react";
import { useEffect, useRef } from "react";

export function SelectionGravityZone() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const cursorX = useMotionValue(-1000);
  const cursorY = useMotionValue(-1000);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  const handlePointerLeave = () => {
    cursorX.set(-1000);
    cursorY.set(-1000);
  };

  return (
    <div 
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full aspect-square overflow-hidden border border-[#222] bg-[#0A0A0A] flex items-center justify-center group"
    >
      <div className="absolute top-0 left-0 p-6 flex flex-col pointer-events-none z-30">
        <h3 className="text-[11px] font-mono text-white/90 uppercase tracking-[0.2em] mb-3">08 — SELECTION GRAVITY</h3>
        <p className="text-[10px] font-mono text-white/40 max-w-[240px] uppercase leading-relaxed tracking-wider">
          Cursor proximity warps surrounding elements to increase target density.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6 relative z-10 w-3/4 max-w-[300px]">
        {Array.from({ length: 16 }).map((_, i) => (
          <GravityNode key={i} index={i} cursorX={cursorX} cursorY={cursorY} />
        ))}
      </div>
    </div>
  );
}

function GravityNode({ index, cursorX, cursorY }: { index: number; cursorX: MotionValue<number>; cursorY: MotionValue<number> }) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const targetScale = useMotionValue(1);
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  
  const scale = useSpring(targetScale, { stiffness: 150, damping: 15, mass: 0.5 });
  const x = useSpring(targetX, { stiffness: 150, damping: 15, mass: 0.5 });
  const y = useSpring(targetY, { stiffness: 150, damping: 15, mass: 0.5 });

  useEffect(() => {
    return cursorX.on("change", (latestX: number) => {
      if (!nodeRef.current) return;
      const rect = nodeRef.current.getBoundingClientRect();
      const parentRect = nodeRef.current.parentElement?.parentElement?.getBoundingClientRect();
      if (!parentRect) return;

      const nodeCX = (rect.left - parentRect.left) + rect.width / 2;
      const nodeCY = (rect.top - parentRect.top) + rect.height / 2;

      const latestY = cursorY.get();
      
      const dx = latestX - nodeCX;
      const dy = latestY - nodeCY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 150) {
        // Bend towards cursor
        const pullFactor = (150 - dist) / 150;
        targetScale.set(1 + pullFactor * 0.5);
        targetX.set(dx * pullFactor * 0.3);
        targetY.set(dy * pullFactor * 0.3);
      } else {
        targetScale.set(1);
        targetX.set(0);
        targetY.set(0);
      }
    });
  }, [cursorX, cursorY, targetScale, targetX, targetY]);

  return (
    <motion.div 
      ref={nodeRef}
      className="aspect-square bg-white/10 rounded-full border border-white/20 transition-colors hover:bg-white flex items-center justify-center overflow-hidden"
      style={{ scale, x, y }}
      whileHover={{ scale: 1.8 }}
    >
      <img 
        src="/kinetic-field.svg" alt=""
        className="w-full h-full object-cover saturate-[3] hue-rotate-[90deg] opacity-40 mix-blend-screen"
        style={{ filter: `hue-rotate(${index * 20}deg) saturate(2)` }}
      />
    </motion.div>
  );
}
