'use client';

export function GeometricPatterns() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <pattern id="hexagons" x="0" y="0" width="100" height="86.6" patternUnits="userSpaceOnUse">
            <path
              d="M 50 0 L 93.3 25 L 93.3 75 L 50 100 L 6.7 75 L 6.7 25 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-[#6366f1]"
            />
          </pattern>

          <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1.5" fill="currentColor" className="text-[#8b5cf6]" />
          </pattern>

          <pattern id="lines" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="80" stroke="currentColor" strokeWidth="0.5" className="text-[#22d3ee]" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#hexagons)" />
        <rect width="100%" height="100%" fill="url(#dots)" opacity="0.5" />
        <rect width="100%" height="100%" fill="url(#lines)" opacity="0.3" />
      </svg>
    </div>
  );
}
