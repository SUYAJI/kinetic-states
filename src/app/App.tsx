import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { InertiaZone } from "./components/InertiaZone";
import { MagneticZone } from "./components/MagneticZone";
import { DelayedHoverZone } from "./components/DelayedHoverZone";
import { RepulsionZone } from "./components/RepulsionZone";
import { ElasticZone } from "./components/ElasticZone";
import { ParallaxZone } from "./components/ParallaxZone";
import { ScrollInertiaZone } from "./components/ScrollInertiaZone";
import { SelectionGravityZone } from "./components/SelectionGravityZone";
import { TemporalHoverZone } from "./components/TemporalHoverZone";
import { VelocityShiftZone } from "./components/VelocityShiftZone";

export default function App() {
  const reduceMotion = usePrefersReducedMotion();
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Real cursor dot - snappy follow
  const dotX = useSpring(cursorX, { stiffness: 1000, damping: 40, mass: 0.1 });
  const dotY = useSpring(cursorY, { stiffness: 1000, damping: 40, mass: 0.1 });

  // Exaggerated lag cursor ring - Faster and smaller
  const ringX = useSpring(cursorX, { stiffness: 150, damping: 20, mass: 0.5 });
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 20, mass: 0.5 });

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const updatePointerCapability = () => setHasFinePointer(media.matches);
    updatePointerCapability();
    media.addEventListener("change", updatePointerCapability);
    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      media.removeEventListener("change", updatePointerCapability);
      window.removeEventListener("pointermove", move);
    };
  }, [cursorX, cursorY]);

  return (
    <div className={`min-h-screen bg-[#030303] text-white p-6 md:p-12 font-sans flex flex-col items-center relative ${hasFinePointer ? "custom-cursor-active" : ""}`}>
      {/* Global Cursor Dot */}
      {hasFinePointer && !reduceMotion && <motion.div 
        className="fixed top-0 left-0 w-[6px] h-[6px] bg-white rounded-full pointer-events-none z-[100] -ml-[3px] -mt-[3px] mix-blend-difference"
        style={{ x: dotX, y: dotY }}
      />}
      {/* Exaggerated Lag Cursor Ring */}
      {hasFinePointer && !reduceMotion && <motion.div 
        className="fixed top-0 left-0 w-8 h-8 border border-white/50 rounded-full pointer-events-none z-[100] -ml-4 -mt-4 mix-blend-difference"
        style={{ x: ringX, y: ringY }}
      />}

      <div className="max-w-7xl w-full flex-1 flex flex-col z-10 relative">
        <header className="mb-16 max-w-3xl mt-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-2 uppercase">
            Kinetic States
          </h1>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white/80 mb-6">
            Cursor Weight Interaction Study
          </h2>
          <p className="text-[#888] text-[11px] leading-[1.8] tracking-widest uppercase font-mono max-w-2xl mb-4">
            An exploratory collection examining how pointer inertia, magnetic attraction, and delayed hover activation can shape the feeling of stability and targeting in dense interface environments.
          </p>
          <p className="text-[#888] text-[11px] leading-[1.8] tracking-widest uppercase font-mono max-w-2xl">
            These interaction states explore how cursor physics can communicate intent, resistance, confirmation, and spatial structure before explicit interface feedback occurs.
          </p>
        </header>
        
        <h3 className="text-xs font-mono text-white/60 uppercase tracking-[0.2em] mb-6 max-w-2xl">
          Ten interaction states for examining intent signals in dense interface environments
        </h3>
        
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr pb-8">
          <InertiaZone />
          <MagneticZone />
          <DelayedHoverZone />
          <RepulsionZone />
          <ElasticZone />
          <ParallaxZone />
          <ScrollInertiaZone />
          <SelectionGravityZone />
          <TemporalHoverZone />
        </div>

        <div className="w-full pb-24">
          <VelocityShiftZone />
        </div>
      </div>
    </div>
  );
}
