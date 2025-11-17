'use client';

import { motion } from 'framer-motion';

interface SectionDividerProps {
  variant?: 'gradient' | 'glow' | 'animated';
}

export function SectionDivider({ variant = 'gradient' }: SectionDividerProps) {
  if (variant === 'glow') {
    return (
      <div className="relative h-px my-24">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#6366f1]/50 to-transparent"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8b5cf6]/30 to-transparent blur-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>
    );
  }

  if (variant === 'animated') {
    return (
      <div className="relative h-px my-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#6366f1]/20 to-transparent" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#22d3ee]/60 to-transparent"
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
    );
  }

  return (
    <div className="h-px bg-gradient-to-r from-transparent via-[#6366f1]/30 to-transparent my-24" />
  );
}
