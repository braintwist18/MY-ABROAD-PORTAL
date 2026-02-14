
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface IconBoxProps {
  icon: LucideIcon;
  size?: 'sm' | 'md' | 'lg';
  glowColor?: string;
}

export const IconBox: React.FC<IconBoxProps> = ({ 
  icon: Icon, 
  size = 'md',
  glowColor = 'rgba(200,169,81,0.4)'
}) => {
  const sizes = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-10 h-10',
  };

  return (
    <div 
      className={`${sizes[size]} rounded-2xl bg-navy border border-gold/30 flex items-center justify-center shadow-lg`}
      style={{ boxShadow: `0 0 20px ${glowColor}` }}
    >
      <Icon className="text-gold" size={iconSizes[size] === 'w-5 h-5' ? 20 : iconSizes[size] === 'w-7 h-7' ? 28 : 40} />
    </div>
  );
};
