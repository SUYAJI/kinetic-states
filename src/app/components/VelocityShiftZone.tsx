import { motion, useMotionValue, useSpring, useTransform, useVelocity, type MotionValue } from "motion/react";
import { kineticImage } from "../imagery";

function VelocityRow({ index, skewX }: { index: number; skewX: MotionValue<number> }) {
  const backgroundSkew = useTransform(skewX, [-15, 15], [30, -30]);
  return <motion.div className="w-full h-16 bg-white/[0.05] border border-white/10 overflow-hidden relative flex items-center justify-between px-8" style={{ skewX }}><motion.div className="absolute inset-0 w-[150%] -left-[25%] opacity-40 mix-blend-screen bg-black" style={{ skewX: backgroundSkew }}><img src={kineticImage(1080)} alt="" className="w-full h-full object-cover hue-rotate-[220deg] saturate-150 grayscale group-hover:grayscale-0 transition-all duration-700" /></motion.div><span className="font-mono text-xs tracking-[0.4em] font-bold text-white relative z-10 drop-shadow-md">DATA STREAM 0{index}</span><span className="w-4 h-4 bg-white rounded-sm relative z-10" aria-hidden="true" /></motion.div>;
}

export function VelocityShiftZone() {
  const mouseX = useMotionValue(0); const velocityX = useVelocity(mouseX); const smoothVelocity = useSpring(velocityX, { stiffness: 50, damping: 10, mass: 1 }); const skewX = useTransform(smoothVelocity, [-1000, 1000], [15, -15]);
  return <section onPointerMove={(event) => mouseX.set(event.clientX)} className="relative w-full min-h-[320px] h-[400px] overflow-hidden border border-[#222] bg-[#0A0A0A] flex flex-col items-center justify-center group" aria-labelledby="velocity-shift-title"><div className="absolute top-0 left-0 p-6 pointer-events-none z-30"><h3 id="velocity-shift-title" className="text-[11px] font-mono text-white/90 uppercase tracking-[0.2em] mb-3">10: Velocity Shift</h3><p className="text-[10px] font-mono text-white/40 max-w-[240px] uppercase leading-relaxed tracking-wider">Studies the feeling of elements leaning into pointer velocity.</p></div><div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" /><div className="flex flex-col gap-6 w-[80%] max-w-[800px] z-10 relative pointer-events-none">{[1, 2, 3].map((index) => <VelocityRow key={index} index={index} skewX={skewX} />)}</div></section>;
}
