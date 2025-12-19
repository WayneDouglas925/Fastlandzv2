
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 48 }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]">
        {/* Outer Glass Frame */}
        <rect 
          x="5" y="5" width="90" height="90" rx="20" 
          fill="rgba(5, 10, 5, 0.8)" 
          stroke="rgba(34, 197, 94, 0.3)" 
          strokeWidth="1.5"
        />
        {/* Inner Glowing Layer */}
        <rect 
          x="15" y="15" width="70" height="70" rx="15" 
          fill="none" 
          stroke="rgba(34, 197, 94, 0.2)" 
          strokeWidth="1"
        />
        {/* Top Highlight */}
        <path d="M25 15 H75" stroke="rgba(34, 197, 94, 0.6)" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        {/* Bottom Highlight */}
        <path d="M25 85 H75" stroke="rgba(34, 197, 94, 0.4)" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        
        {/* The "F" for Fastlandz */}
        <path 
          d="M40 70 V30 H65 M40 50 H60" 
          stroke="#22c55e" 
          strokeWidth="8" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          fill="none"
          className="drop-shadow-[0_0_12px_rgba(34,197,94,1)]"
        />
        
        {/* Glare effect */}
        <path d="M20 20 L80 80" stroke="white" strokeWidth="0.5" opacity="0.1" />
      </svg>
    </div>
  );
};

export default Logo;
