
import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  BookOpen,
  MessageCircle,
  Clock,
  CheckCircle,
  Truck,
  Smartphone,
  Target,
  Zap,
  ShieldCheck,
  ChevronRight,
  Monitor,
  ArrowRight,
  Headphones,
  Users
} from 'lucide-react';
import { IconBox } from '../components/ui/IconBox';
import { GradientBlob } from '../components/ui/GradientBlob';
import { PremiumButton } from '../components/ui/PremiumButton';

const modules = [
  {
    week: "Week 01",
    title: "Foundation & Grammar",
    desc: "Building the core linguistic foundation. Intensive sessions on Tenses, Sentence Variation, and Academic Vocabulary.",
    items: ["Grammar for Band 8+", "Contextual Vocabulary", "Sentence Structure Drills"]
  },
  {
    week: "Week 02",
    title: "Listening & Reading Hacks",
    desc: "Mastering the 'Algorithm' of the test. Advanced skimming, scanning, and distractor elimination techniques.",
    items: ["Accent Familiarization", "Time Management Tricks", "Keyword Mapping"]
  },
  {
    week: "Week 03",
    title: "Writing Templates",
    desc: "Proprietary Nexus writing frameworks for Task 1 & 2. Learn how to structure Band 8.5 essays systematically.",
    items: ["Task 1 Data Language", "Essay Framing Templates", "Logical Flow Workshops"]
  },
  {
    week: "Week 04",
    title: "Speaking & Mocks",
    desc: "Live mock interviews with British Council certified trainers. Focus on fluency, coherence, and cue-card expansion.",
    items: ["Cue Card Mastery", "Abstract Topic Drills", "Live Mirror Practice"]
  }
];

const batchSchedule = [
  { type: "Morning Rush", time: "07:30 AM - 09:00 AM", target: "For Professionals", status: "Starts 14th Aug", available: true },
  { type: "Regular Fast Track", time: "11:00 AM - 01:00 PM", target: "For Students", status: "Seats Full", available: false },
  { type: "Evening Core", time: "07:00 PM - 08:30 PM", target: "For Office Goers", status: "Starts 16th Aug", available: true },
  { type: "Weekend Warrior", time: "Sat-Sun (10 AM - 02 PM)", target: "Intensive", status: "Filling Fast", available: true },
];

const programs = [
  {
    name: "Crash Course",
    duration: "4 Weeks",
    bestFor: "Students needing final polish",
    features: ["4 Full Mock Tests", "Daily 2-hour Live Classes", "Writing Corrections"],
    price: "₹12,500"
  },
  {
    name: "Comprehensive",
    duration: "3 Months",
    bestFor: "Base-up Band 8 training",
    features: ["20 Full Mock Tests", "Grammar & Vocab Classes", "Hard Copy Material"],
    price: "₹24,900",
    popular: true
  },
  {
    name: "Elite 1-on-1",
    duration: "Flexible",
    bestFor: "Personalized attention",
    features: ["Customized Study Plan", "Private Trainer Access", "Unlimited Corrections"],
    price: "Enquire Now"
  }
];

export const Coaching: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-navy">
      {/* Background Decor */}
      <GradientBlob color="gold" className="-top-40 -right-40 opacity-20" />
      <GradientBlob color="blue" className="top-1/4 -left-40 opacity-10" />

      {/* Hero: Result-Oriented Section */}
      <section className="relative pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border-gold/30 text-gold text-xs font-bold uppercase tracking-[0.2em] mb-8"
          >
            <ShieldCheck size={14} /> Result-Driven Intensive Coaching
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-extrabold tracking-tight mb-8"
          >
            India's Highest Rated <br />
            <span className="gold-gradient-text">IELTS Bootcamp.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10"
          >
            Join the intensive program that has helped over 10,000+ students secure Band 7.5+
            through template-based writing and algorithm-targeted reading strategies.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <PremiumButton className="px-10 py-5 text-lg">Book Free Demo Class</PremiumButton>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <span className="flex text-gold">★★★★★</span> (4.9/5 Rating)
            </div>
          </motion.div>
        </div>
      </section>

      {/* Batch Schedule Table: The Conversion Hub */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Live Batch Schedules</h2>
            <p className="text-slate-400">Limited to 15 students per batch for maximum attention.</p>
          </div>

          <div className="glass rounded-[2rem] border-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/5">
                    <th className="px-8 py-6 text-sm font-bold uppercase tracking-widest text-slate-500">Batch Type</th>
                    <th className="px-8 py-6 text-sm font-bold uppercase tracking-widest text-slate-500">Timings (IST)</th>
                    <th className="px-8 py-6 text-sm font-bold uppercase tracking-widest text-slate-500">Ideal For</th>
                    <th className="px-8 py-6 text-sm font-bold uppercase tracking-widest text-slate-500">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {batchSchedule.map((batch, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors group">
                      <td className="px-8 py-6 font-display font-bold text-lg group-hover:text-gold transition-colors">{batch.type}</td>
                      <td className="px-8 py-6 text-slate-300 flex items-center gap-2"><Clock size={16} className="text-gold" /> {batch.time}</td>
                      <td className="px-8 py-6 text-slate-400 italic text-sm">{batch.target}</td>
                      <td className="px-8 py-6">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${batch.available ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20 opacity-50'
                          }`}>
                          {batch.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum: Module-Wise Breakdown */}
      <section className="py-20 px-6 bg-navy-darker/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display font-bold mb-16 text-center">Course Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {modules.map((mod, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="glass p-8 rounded-3xl border-white/5 group relative overflow-hidden"
              >
                <div className="text-gold font-display font-bold text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <div className="h-[2px] w-4 bg-gold"></div> {mod.week}
                </div>
                <h3 className="text-2xl font-display font-bold mb-4">{mod.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{mod.desc}</p>
                <ul className="space-y-3">
                  {mod.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle size={14} className="text-gold" /> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Types: Commercial Comparison */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display font-bold mb-16 text-center">Enrollment Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((prog, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className={`p-1 rounded-[2.5rem] ${prog.popular ? 'bg-gradient-to-br from-gold/50 via-gold/10 to-transparent shadow-[0_0_50px_rgba(200,169,81,0.15)]' : 'bg-white/5'}`}
              >
                <div className="bg-navy p-10 rounded-[2.4rem] h-full flex flex-col">
                  {prog.popular && <div className="text-gold text-[10px] font-bold uppercase tracking-widest mb-4">Most Recommended</div>}
                  <h3 className="text-3xl font-display font-bold mb-1">{prog.name}</h3>
                  <div className="text-gold font-bold mb-6">{prog.duration}</div>
                  <p className="text-slate-400 text-sm mb-8">{prog.bestFor}</p>

                  <div className="h-px bg-white/5 w-full mb-8"></div>

                  <ul className="space-y-4 flex-grow mb-10">
                    {prog.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                        <Zap size={16} className="text-gold shrink-0 mt-0.5" /> {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <div className="text-2xl font-display font-bold mb-6">{prog.price}</div>
                    <PremiumButton variant={prog.popular ? 'gold' : 'glass'} className="w-full">
                      Enroll Now
                    </PremiumButton>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Study Material: The Deliverables Grid */}
      <section className="py-24 px-6 bg-navy-darker">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">The <span className="gold-gradient-text">All-In-One</span> Visa Suite</h2>
            <p className="text-slate-400">From your first IELTS class to your first day on campus. We handle the paperwork, the prep, and the panic—so you don't have to.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: "Hard Copy Materials", desc: "4 Core books & 10 workbooks couriered to you." },
              { icon: Smartphone, title: "Skik International Mobile App", desc: "Practice vocab, listening & reading on the go." },
              { icon: MessageCircle, title: "24/7 WhatsApp Group", desc: "Direct access to mentors for instant doubt solving." },
              { icon: Monitor, title: "AI-Evaluated Mocks", desc: "Detailed breakdown of score within 10 minutes." }
            ].map((item, idx) => (
              <div key={idx} className="glass p-8 rounded-3xl border-white/5 text-center group">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="text-gold" size={32} />
                </div>
                <h4 className="text-xl font-display font-bold mb-3">{item.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Conversion Section */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto glass p-16 rounded-[4rem] border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-[100px] -z-10 animate-pulse-slow"></div>
          <h2 className="text-5xl md:text-6xl font-display font-extrabold mb-8 leading-tight">
            Don't Just Prepare. <br />
            <span className="gold-gradient-text">Dominate.</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            Book your session today and get a free 15-minute score assessment with our senior trainer.
            Limited slots available for the August intake.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <PremiumButton className="px-12 py-5 text-lg">Claim Free Demo Class</PremiumButton>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-navy overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i * 10}`} alt="student" />
                  </div>
                ))}
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">+12 booked today</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
