'use client';

import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0a0a1e] to-[#050816]" />

      <motion.div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, #4f46e5 0%, #6366f1 30%, #8b5cf6 60%, transparent 100%)',
          filter: 'blur(120px)',
          opacity: 0.25,
        }}
        animate={{
          scale: [1, 1.3, 1.1, 1],
          x: [0, 50, -30, 0],
          y: [0, -40, 20, 0],
          rotate: [0, 120, 240, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute top-1/4 -left-40 w-[450px] h-[450px] rounded-full"
        style={{
          background: 'radial-gradient(circle, #8b5cf6 0%, #d946ef 40%, #ec4899 70%, transparent 100%)',
          filter: 'blur(130px)',
          opacity: 0.2,
        }}
        animate={{
          scale: [1, 1.4, 1.2, 1],
          x: [0, -30, 40, 0],
          y: [0, 60, -30, 0],
          rotate: [0, -90, -180, -270, -360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-20 right-1/4 w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, #22d3ee 0%, #06b6d4 40%, #6366f1 70%, transparent 100%)',
          filter: 'blur(110px)',
          opacity: 0.18,
        }}
        animate={{
          scale: [1, 1.2, 1.3, 1],
          x: [0, 40, -20, 0],
          y: [0, -50, 30, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute top-1/2 right-1/3 w-[350px] h-[350px] rounded-full"
        style={{
          background: 'radial-gradient(circle, #10b981 0%, #22d3ee 50%, transparent 100%)',
          filter: 'blur(100px)',
          opacity: 0.15,
        }}
        animate={{
          scale: [1, 1.25, 1.1, 1],
          x: [0, -40, 30, 0],
          y: [0, 40, -40, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/4 w-[380px] h-[380px] rounded-full"
        style={{
          background: 'radial-gradient(circle, #f59e0b 0%, #8b5cf6 40%, #6366f1 70%, transparent 100%)',
          filter: 'blur(140px)',
          opacity: 0.12,
        }}
        animate={{
          scale: [1, 1.35, 1.15, 1],
          x: [0, 30, -40, 0],
          y: [0, -30, 40, 0],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, #6366f1 1.5px, transparent 1.5px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 25px,
            #8b5cf6 25px,
            #8b5cf6 26px
          )`,
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 30px,
            #22d3ee 30px,
            #22d3ee 31px
          )`,
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

export function SectionBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
    </div>
  );
}
