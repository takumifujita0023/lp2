'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export function GlassCard({ children, className = '', delay = 0, hover = true }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      whileHover={hover ? { scale: 1.03, y: -5 } : {}}
      className={`
        relative overflow-hidden rounded-3xl
        bg-white/[0.03] backdrop-blur-sm
        border border-white/[0.05]
        shadow-[0_8px_32px_0_rgba(99,102,241,0.1)]
        hover:shadow-[0_8px_48px_0_rgba(99,102,241,0.2)]
        hover:border-white/[0.1]
        transition-all duration-300
        ${className}
      `}
    >
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: 'radial-gradient(circle at top right, rgba(99, 102, 241, 0.05), transparent 60%)',
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
