'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export function MouseParallax() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100 };
  const x1 = useSpring(useTransform(mouseX, [-1, 1], [-5, 5]), springConfig);
  const y1 = useSpring(useTransform(mouseY, [-1, 1], [-5, 5]), springConfig);
  const x2 = useSpring(useTransform(mouseX, [-1, 1], [5, -5]), springConfig);
  const y2 = useSpring(useTransform(mouseY, [-1, 1], [5, -5]), springConfig);
  const x3 = useSpring(useTransform(mouseX, [-1, 1], [-3, 3]), springConfig);
  const y3 = useSpring(useTransform(mouseY, [-1, 1], [3, -3]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const bounds = document.body.getBoundingClientRect();
      const x = (clientX - bounds.left - bounds.width / 2) / (bounds.width / 2);
      const y = (clientY - bounds.top - bounds.height / 2) / (bounds.height / 2);
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <motion.div
        style={{ x: x1, y: y1 }}
        className="absolute top-1/4 right-1/4 w-20 h-20 rounded-full bg-gradient-to-br from-[#4f46e5]/30 to-[#6366f1]/20 blur-xl"
      />
      <motion.div
        style={{ x: x2, y: y2 }}
        className="absolute bottom-1/3 left-1/3 w-24 h-24 rounded-lg rotate-45 bg-gradient-to-br from-[#22d3ee]/30 to-[#6366f1]/20 blur-xl"
      />
      <motion.div
        style={{ x: x3, y: y3 }}
        className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-gradient-to-br from-[#6366f1]/30 to-[#4f46e5]/20 blur-xl"
      />
    </div>
  );
}
