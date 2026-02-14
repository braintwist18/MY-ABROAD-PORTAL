
import React from 'react';

interface GradientBlobProps {
  color: 'gold' | 'blue';
  className?: string;
  delay?: string;
}

export const GradientBlob: React.FC<GradientBlobProps> = ({ color, className = '', delay = '0s' }) => {
  const colors = {
    gold: 'bg-[#C8A951]',
    blue: 'bg-[#3B82F6]',
  };

  return (
    <div 
      className={`absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 animate-float pointer-events-none ${colors[color]} ${className}`}
      style={{ animationDelay: delay }}
    />
  );
};
