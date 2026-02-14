import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Plane, CheckCircle, ArrowRight, TrendingUp, Award, Sparkles, MapPin, Globe } from 'lucide-react';
import { PremiumButton } from '../components/ui/PremiumButton';
import { IconBox } from '../components/ui/IconBox';
import { GradientBlob } from '../components/ui/GradientBlob';
import CountryMatchmaker from '../components/CountryMatchmaker';
import { Page } from '../types';

interface HomeProps {
  setActivePage: (page: Page) => void;
}

export const Home: React.FC<HomeProps> = ({ setActivePage }) => {
  const [showMatchmaker, setShowMatchmaker] = React.useState(false);

  const stats = [
    { value: '15k+', label: 'Dream Careers Launched' },
    { value: '98%', label: 'Visa Success Rate' },
    { value: '45+', label: 'Global Uni Partners' },
    { value: 'Top 1%', label: 'Gujarat\'s Best' },
  ];

  return (
    <div className="relative overflow-hidden min-h-screen bg-navy">
      {/* Background Decor */}
      <GradientBlob color="gold" className="-top-40 -right-40 opacity-40" />
      <GradientBlob color="blue" className="top-1/2 -left-40 opacity-30" delay="2s" />

      {/* Hero Section */}
      <section className="relative px-6 pt-24 pb-32">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-2 glass rounded-full border border-blue-400/30 text-blue-400 text-sm font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              <Award size={16} /> A Vision for Your Future
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-8xl font-display font-extrabold tracking-tight leading-[1.1] max-w-5xl mx-auto">
              A Vision for Your Future: <br />
              <span className="text-blue-400 drop-shadow-2xl">Expert Visa Solutions</span>
            </h1>

            {/* Subheadline */}
            <p className="text-slate-300 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-light">
              Expert visa solutions for Canada, USA, UK & Australia. Your trusted partner in making global dreams a reality.
            </p>

            {/* Primary CTA */}
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setShowMatchmaker(true)}
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-blue-500 rounded-2xl overflow-hidden hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 w-full sm:w-auto justify-center"
              >
                <Plane className="text-white" size={24} />
                <span className="text-white font-display font-bold text-xl">Find My Dream Country</span>
                <ArrowRight className="text-white group-hover:translate-x-1 transition-transform" size={24} />
              </button>
            </div>
          </motion.div>

          {/* Central Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[80px] -z-10"></div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-8 px-6 bg-blue-400/5 border-y border-blue-400/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-display font-bold text-blue-400">3</div>
              <div className="text-slate-400 text-sm uppercase tracking-widest">Locations</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-display font-bold text-blue-400">1000+</div>
              <div className="text-slate-400 text-sm uppercase tracking-widest">Visas Approved</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-display font-bold text-blue-400">95%</div>
              <div className="text-slate-400 text-sm uppercase tracking-widest">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual-Engine Showcase */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Our <span className="text-blue-400">Visa Services</span></h2>
            <p className="text-slate-400">Expert solutions for all your global mobility needs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Student Visa - ENHANCED */}
            <motion.div
              whileHover={{ y: -12, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActivePage('contact')}
              className="group relative glass p-8 rounded-3xl border-white/5 overflow-hidden hover:border-blue-400/60 transition-all cursor-pointer hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]"
            >
              {/* FREE Badge - Pulsing */}
              <motion.div
                className="absolute top-4 right-4 z-20"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-blue-500/50">
                  FREE Consultation
                </div>
              </motion.div>

              {/* Animated Plane Background */}
              <motion.div
                className="absolute -right-10 top-1/2 -translate-y-1/2 opacity-5 group-hover:opacity-15"
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Plane className="text-blue-400 w-32 h-32 rotate-45" />
              </motion.div>

              {/* Sparkle Effect */}
              <motion.div
                className="absolute top-8 left-8 opacity-0 group-hover:opacity-100"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="text-blue-400 w-5 h-5" />
              </motion.div>

              <div className="relative z-10 space-y-4">
                <motion.div
                  className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center shadow-lg shadow-blue-500/20"
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <GraduationCap className="text-blue-400 w-7 h-7" />
                </motion.div>

                <div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    Student Visa
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    Complete support for study permits in Canada, USA, UK & Australia. From university selection to visa approval.
                  </p>
                </div>

                {/* Success Badge */}
                <div className="flex items-center gap-2 bg-blue-500/10 rounded-lg p-2 border border-blue-400/20">
                  <Award className="text-blue-400 w-4 h-4" />
                  <span className="text-blue-400 text-xs font-bold">95% Success Rate</span>
                </div>

                <ul className="space-y-2">
                  {['University Selection', 'SOP & LOR Guidance', 'Visa Interview Prep'].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center gap-2 text-slate-300 text-sm"
                      whileHover={{ x: 5 }}
                    >
                      <CheckCircle className="text-blue-400 w-4 h-4" /> {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Visitor Visa - ENHANCED */}
            <motion.div
              whileHover={{ y: -12, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActivePage('contact')}
              className="group relative glass p-8 rounded-3xl border-white/5 overflow-hidden hover:border-blue-400/60 transition-all cursor-pointer hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]"
            >
              {/* FREE Badge - Pulsing */}
              <motion.div
                className="absolute top-4 right-4 z-20"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              >
                <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-blue-500/50">
                  FREE Consultation
                </div>
              </motion.div>

              {/* Animated Flying Plane */}
              <motion.div
                className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 group-hover:opacity-15"
                animate={{
                  x: [-100, 50],
                  y: [0, -20, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Plane className="text-blue-400 w-24 h-24 rotate-12" />
              </motion.div>

              {/* Sparkle Effect */}
              <motion.div
                className="absolute top-8 left-8 opacity-0 group-hover:opacity-100"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="text-blue-400 w-5 h-5" />
              </motion.div>

              <div className="relative z-10 space-y-4">
                <motion.div
                  className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center shadow-lg shadow-blue-500/20"
                  whileHover={{ rotate: [0, 15, -15, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Plane className="text-blue-400 w-7 h-7" />
                </motion.div>

                <div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    Visitor Visa
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    Tourist and family visit visas with expert documentation and application support for hassle-free travel.
                  </p>
                </div>

                {/* Success Badge */}
                <div className="flex items-center gap-2 bg-blue-500/10 rounded-lg p-2 border border-blue-400/20">
                  <Award className="text-blue-400 w-4 h-4" />
                  <span className="text-blue-400 text-xs font-bold">Fast Processing</span>
                </div>

                <ul className="space-y-2">
                  {['Document Preparation', 'Application Filing', 'Interview Support'].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center gap-2 text-slate-300 text-sm"
                      whileHover={{ x: 5 }}
                    >
                      <CheckCircle className="text-blue-400 w-4 h-4" /> {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Work Permit & PR - ENHANCED */}
            <motion.div
              whileHover={{ y: -12, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActivePage('contact')}
              className="group relative glass p-8 rounded-3xl border-white/5 overflow-hidden hover:border-blue-400/60 transition-all cursor-pointer hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]"
            >
              {/* FREE Badge - Pulsing */}
              <motion.div
                className="absolute top-4 right-4 z-20"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              >
                <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-blue-500/50">
                  FREE Assessment
                </div>
              </motion.div>

              {/* Animated Globe */}
              <motion.div
                className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-5 group-hover:opacity-15"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Globe className="text-blue-400 w-32 h-32" />
              </motion.div>

              {/* Sparkle Effect */}
              <motion.div
                className="absolute top-8 left-8 opacity-0 group-hover:opacity-100"
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="text-blue-400 w-5 h-5" />
              </motion.div>

              <div className="relative z-10 space-y-4">
                <motion.div
                  className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center shadow-lg shadow-blue-500/20"
                  whileHover={{ scale: 1.15, rotate: 180 }}
                  transition={{ duration: 0.6 }}
                >
                  <Globe className="text-blue-400 w-7 h-7" />
                </motion.div>

                <div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    Work Permit & PR
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    Permanent residency and work permit solutions for Canada, Australia with Express Entry & skilled migration.
                  </p>
                </div>

                {/* Success Badge */}
                <div className="flex items-center gap-2 bg-blue-500/10 rounded-lg p-2 border border-blue-400/20">
                  <Award className="text-blue-400 w-4 h-4" />
                  <span className="text-blue-400 text-xs font-bold">Expert Guidance</span>
                </div>

                <ul className="space-y-2">
                  {['Express Entry', 'Provincial Nomination', 'Points Assessment'].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center gap-2 text-slate-300 text-sm"
                      whileHover={{ x: 5 }}
                    >
                      <CheckCircle className="text-blue-400 w-4 h-4" /> {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section with Location */}
      <section className="py-24 px-6 border-t border-white/5 bg-navy-darker">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-5xl md:text-6xl font-display font-extrabold gold-gradient-text mb-2">{stat.value}</div>
                <div className="text-slate-400 font-medium uppercase tracking-widest text-xs md:text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Location Badge */}
          <div className="mt-16 flex justify-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 rounded-full border border-white/10 text-slate-300 text-sm">
              <MapPin className="text-gold w-4 h-4" />
              Serving Students from <span className="text-white font-bold">Gujarat</span> to the World 🌏
            </div>
          </div>
        </div>
      </section>

      {/* Country Matchmaker Modal */}
      {showMatchmaker && <CountryMatchmaker onClose={() => setShowMatchmaker(false)} />}
    </div>
  );
};
