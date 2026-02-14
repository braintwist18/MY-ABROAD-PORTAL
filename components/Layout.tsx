
import React from 'react';
import { Menu, X, GraduationCap, Plane, Globe, Phone, Home, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Page, NavLink } from '../types';
import { Chatbot } from './Chatbot';

interface LayoutProps {
  children: React.ReactNode;
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const navLinks: NavLink[] = [
  { label: 'Home', id: 'home' },
  { label: 'Visa Services', id: 'visa' },
  { label: 'Countries', id: 'countries' },
  { label: 'Contact', id: 'contact' },
];

export const Layout: React.FC<LayoutProps> = ({ children, activePage, setActivePage }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-gold selection:text-navy">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setActivePage('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-navy-lighter border border-gold/30 flex items-center justify-center shadow-[0_0_15px_rgba(200,169,81,0.3)]">
              <GraduationCap className="text-gold w-6 h-6" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">
              MY ABROAD <span className="text-blue-400">PORTAL</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActivePage(link.id)}
                className={`text-sm font-medium transition-colors hover:text-blue-400 ${activePage === link.id ? 'text-blue-400' : 'text-slate-400'
                  }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => setActivePage('contact')}
              className="px-6 py-2.5 rounded-full bg-blue-500 text-white font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
            >
              Consult Now
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-slate-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 md:hidden glass pt-24 px-6"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setActivePage(link.id);
                    setIsMenuOpen(false);
                  }}
                  className={`text-2xl font-display font-bold text-left ${activePage === link.id ? 'text-gold' : 'text-slate-200'
                    }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow pt-24">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-navy-darker border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-navy-lighter border border-gold/30 flex items-center justify-center">
                <GraduationCap className="text-gold w-5 h-5" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight">MY ABROAD PORTAL</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Premium overseas education and immigration consulting. Empowering global careers through precision coaching and zero-rejection visa filing.
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold mb-4 text-white">Services</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="hover:text-gold cursor-pointer" onClick={() => setActivePage('coaching')}>IELTS Coaching</li>
              <li className="hover:text-gold cursor-pointer" onClick={() => setActivePage('coaching')}>PTE Academic</li>
              <li className="hover:text-gold cursor-pointer" onClick={() => setActivePage('visa')}>Student Visa</li>
              <li className="hover:text-gold cursor-pointer" onClick={() => setActivePage('visa')}>Work Permit</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold mb-4 text-white">Destinations</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="hover:text-gold cursor-pointer" onClick={() => setActivePage('countries')}>Canada</li>
              <li className="hover:text-gold cursor-pointer" onClick={() => setActivePage('countries')}>United Kingdom</li>
              <li className="hover:text-gold cursor-pointer" onClick={() => setActivePage('countries')}>United States</li>
              <li className="hover:text-gold cursor-pointer" onClick={() => setActivePage('countries')}>Australia</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold mb-4 text-white">Newsletter</h4>
            <p className="text-sm text-slate-400 mb-4">Get the latest global education trends.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm flex-grow focus:outline-none focus:border-gold"
              />
              <button className="bg-gold px-4 rounded-lg text-navy font-bold text-sm">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:row items-center justify-between gap-4">
          <span className="text-xs text-slate-500">© 2026 My Abroad Portal. All rights reserved.</span>
          <div className="flex gap-6">
            <span className="text-xs text-slate-500 hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-xs text-slate-500 hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </footer>

      <Chatbot />
    </div >
  );
};
