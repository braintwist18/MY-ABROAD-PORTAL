
import React from 'react';
import { motion } from 'framer-motion';

interface PremiumButtonProps {
  children: React.ReactNode;
  variant?: 'gold' | 'glass';
  className?: string;
  onClick?: () => void;
}

export const PremiumButton: React.FC<PremiumButtonProps> = ({ 
  children, 
  variant = 'gold', 
  className = '',
  onClick 
}) => {
  const baseStyles = "relative overflow-hidden px-8 py-4 rounded-full font-display font-bold transition-all duration-300 flex items-center justify-center gap-2 group";
  
  const variants = {
    gold: "bg-gold text-navy shadow-[0_0_20px_rgba(200,169,81,0.2)] hover:shadow-[0_0_40px_rgba(200,169,81,0.4)] hover:scale-105 active:scale-95",
    glass: "glass text-white border-white/10 hover:border-white/30 hover:bg-white/10 hover:scale-105 active:scale-95",
  };

  return (
    <motion.button 
      onClick={onClick}
      whileHover={{ y: -2 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'gold' && (
        <div className="absolute inset-0 gold-shimmer animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </motion.button>
  );
};
