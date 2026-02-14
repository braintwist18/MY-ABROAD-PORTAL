
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, Send, MapPin, ArrowRight, ShieldCheck, FileCheck } from 'lucide-react';
import { IconBox } from '../components/ui/IconBox';
import { VisaWallOfTrust } from '../components/VisaWallOfTrust';

export const Visa: React.FC = () => {
  const steps = [
    { title: 'Assessment', icon: Search, desc: 'Detailed profile audit & risk analysis.' },
    { title: 'Documentation', icon: FileText, desc: 'Meticulous organizing of all legal transcripts.' },
    { title: 'Filing', icon: Send, desc: 'Submission through certified visa channels.' },
    { title: 'Fly', icon: MapPin, desc: 'Pre-departure orientation & airport pickup.' },
  ];

  return (
    <div className="px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 text-gold font-bold mb-4"
          >
            <ShieldCheck size={20} /> Zero Rejection Protocol
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
            Your Visa. Our <br /><span className="gold-gradient-text">Responsibility.</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
            We maintain a 98.7% success rate because we treat every application like our own. No detail is too small when your future is at stake.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-32 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <motion.div
                whileHover={{ y: -5 }}
                className="glass p-8 rounded-3xl border-white/5 space-y-4 text-center h-full flex flex-col items-center"
              >
                <IconBox icon={step.icon} />
                <h3 className="text-xl font-display font-bold">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
              {idx < 3 && (
                <div className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 text-gold/30">
                  <ArrowRight size={32} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Wall of Trust */}
        <VisaWallOfTrust />
      </div>
    </div>
  );
};
