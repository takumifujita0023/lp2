'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function ParallaxShapes() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        style={{ y: y1 }}
        className="absolute top-1/4 right-20 w-16 h-16 rounded-full bg-gradient-to-br from-[#4f46e5]/20 to-[#6366f1]/10 blur-sm"
      />

      <motion.div
        style={{ y: y2 }}
        className="absolute top-1/2 left-10 w-20 h-20 rounded-lg rotate-45 bg-gradient-to-br from-[#22d3ee]/20 to-[#6366f1]/10 blur-sm"
      />

      <motion.div
        style={{ y: y3 }}
        className="absolute bottom-1/3 right-1/4 w-12 h-12 rounded-full bg-gradient-to-br from-[#6366f1]/20 to-[#4f46e5]/10 blur-sm"
      />
    </div>
  );
}
