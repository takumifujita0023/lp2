'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ReactNode } from 'react';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
}

export function AnimatedButton({
  children,
  onClick,
  disabled = false,
  type = 'button',
  className = ''
}: AnimatedButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative overflow-hidden
        px-8 py-6 rounded-2xl
        text-lg font-semibold text-white
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-300
        ${className}
      `}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#4f46e5] via-[#6366f1] to-[#22d3ee]"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundSize: '200% 100%',
        }}
      />

      <motion.div
        className="absolute inset-0 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-white/10" />
        <motion.div
          className="absolute inset-0 border-2 border-white/30 rounded-2xl"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
        {!disabled && <ArrowRight className="h-5 w-5" />}
      </span>
    </motion.button>
  );
}
