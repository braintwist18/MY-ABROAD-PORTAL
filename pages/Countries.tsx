
import React from 'react';
import { motion } from 'framer-motion';
import { Country } from '../types';

export const Countries: React.FC = () => {
  const destinations: Country[] = [
    { name: 'Canada', code: 'ca', description: 'World-class PR opportunities and post-study work permits.' },
    { name: 'United Kingdom', code: 'gb', description: 'Fast-track degrees and global industry heritage.' },
    { name: 'United States', code: 'us', description: 'The peak of innovation and academic excellence.' },
    { name: 'Australia', code: 'au', description: 'High quality of life and booming tech sectors.' },
    { name: 'Germany', code: 'de', description: 'Free education in top-tier public universities.' },
    { name: 'Ireland', code: 'ie', description: 'Europe\'s tech hub with a friendly student environment.' },
  ];

  return (
    <div className="px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
            Your Future <span className="gold-gradient-text">Destinations.</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            We represent the finest institutions across these global powerhouses.
            Choose your terrain, and we will pave the road.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((country, idx) => (
            <motion.div
              key={country.code}
              whileHover={{ scale: 1.03, borderColor: 'rgba(200, 169, 81, 0.4)' }}
              className="glass p-10 rounded-3xl border-white/5 transition-colors group cursor-pointer"
            >
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-24 h-24 rounded-full border-4 border-gold/20 p-1 group-hover:border-gold/50 transition-colors shadow-xl">
                  <img
                    src={`https://flagcdn.com/w160/${country.code}.png`}
                    alt={country.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="text-3xl font-display font-bold">{country.name}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{country.description}</p>
                <div className="pt-4 w-full">
                  <div className="h-[1px] w-full bg-white/5 mb-6"></div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gold opacity-60">
                    <span>Intake: Sept/Jan</span>
                    <span>PR Eligible: Yes</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
