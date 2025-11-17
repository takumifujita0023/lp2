'use client';

import { motion } from 'framer-motion';

export function FlowingLights() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="absolute w-[200%] h-[2px] bg-gradient-to-r from-transparent via-[#6366f1]/30 to-transparent"
          style={{
            top: `${20 + index * 30}%`,
            left: '-100%',
            transform: 'rotate(-15deg)',
            filter: 'blur(2px)',
          }}
          animate={{
            x: ['0%', '100%'],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 8 + index * 2,
            delay: index * 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {[0, 1].map((index) => (
        <motion.div
          key={`diagonal-${index}`}
          className="absolute w-[2px] h-[200%] bg-gradient-to-b from-transparent via-[#8b5cf6]/20 to-transparent"
          style={{
            left: `${30 + index * 40}%`,
            top: '-100%',
            filter: 'blur(2px)',
          }}
          animate={{
            y: ['0%', '100%'],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: 10 + index * 2,
            delay: index * 4,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
