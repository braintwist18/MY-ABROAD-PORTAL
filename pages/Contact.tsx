
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, MessageSquare } from 'lucide-react';
import { IconBox } from '../components/ui/IconBox';
import { PremiumButton } from '../components/ui/PremiumButton';

const SHEET_URL = "https://api.sheetmonkey.io/form/7cUY1tL36rgc4wQ7Bburpt";

export const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch(SHEET_URL, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSubmitStatus('success');
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-6 py-20 min-h-[80vh] flex items-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Contact Info */}
        <div className="space-y-12">
          <div>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              Start Your Global Journey <br /><span className="gold-gradient-text">Today.</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
              Book a free 1-on-1 session with our visa experts. No chatbots, just real guidance.
            </p>
          </div>

          <div className="space-y-8">
            {[
              { icon: Phone, label: 'Call Support', val: '+91 63589 90015' },
              { icon: Mail, label: 'Email Us', val: 'info@myabroadportal.com' },
              { icon: MapPin, label: 'Our Locations', val: 'Vadodara | Ahmedabad | Mahesana' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-6 group">
                <IconBox icon={item.icon} size="sm" />
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">{item.label}</div>
                  <div className="text-lg font-bold group-hover:text-gold transition-colors">{item.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass p-10 rounded-3xl border-white/10"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                <input
                  type="text"
                  name="Name"
                  placeholder="John Doe"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-gold/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                <input
                  type="email"
                  name="Email"
                  placeholder="john@example.com"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-gold/50 transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Interested Service</label>
              <select
                name="Service"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-gold/50 transition-all appearance-none"
              >
                <option className="bg-navy" value="">Select a service</option>
                <option className="bg-navy" value="IELTS/PTE Coaching">IELTS/PTE Coaching</option>
                <option className="bg-navy" value="Student Visa Filing">Student Visa Filing</option>
                <option className="bg-navy" value="Career Counselling">Career Counselling</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Message</label>
              <textarea
                rows={4}
                name="Message"
                placeholder="How can we help you?"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-gold/50 transition-all resize-none"
              ></textarea>
            </div>

            {submitStatus === 'success' && (
              <div className="text-green-400 text-sm font-bold text-center">
                ✅ Thank you! We'll contact you within 24 hours.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="text-red-400 text-sm font-bold text-center">
                ❌ Something went wrong. Please try again or call us directly.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-gold text-navy font-display font-bold text-lg rounded-xl hover:bg-white transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Sending...' : 'Book My Free Consultation'} <Send size={18} />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
