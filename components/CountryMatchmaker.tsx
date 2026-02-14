import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Banknote, Home, GraduationCap, Wallet, X, ChevronRight, CheckCircle, Brain, Loader2, Send } from 'lucide-react';

// ==========================================
// CONFIGURATION
// ==========================================
const SHEET_URL = "https://api.sheetmonkey.io/form/pqyMt4bzmvN2hhBqCXWHA4";
const WA_NUMBER = "917990675093";

type Step = 'goal' | 'budget' | 'profile' | 'analyzing' | 'result';

interface MatchmakerData {
    goal: string;
    budget: string;
    education: string;
    name: string;
    phone: string;
}

export default function CountryMatchmaker({ onClose }: { onClose?: () => void }) {
    const [step, setStep] = useState<Step>('goal');
    const [data, setData] = useState<MatchmakerData>({
        goal: '',
        budget: '',
        education: '',
        name: '',
        phone: '',
    });
    const [analysisText, setAnalysisText] = useState("Analyzing University Database...");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ==========================================
    // LOGIC ENGINE
    // ==========================================
    const getRecommendation = () => {
        // 1. Strict Budget Rule
        if (data.budget === "Under ₹15 Lakhs") return "Germany & Ireland";

        // 2. PR Goal Rule
        if (data.goal === "Easy PR & Settlement") return "Canada & Australia";

        // 3. High ROI Rule
        if (data.goal === "High ROI / Salaries") return "USA & UK";

        // 4. Default / Education / Other
        return "UK & USA";
    };

    // ==========================================
    // HANDLERS
    // ==========================================
    const handleSelect = (field: keyof MatchmakerData, value: string) => {
        setData(prev => ({ ...prev, [field]: value }));

        // Auto-advance
        if (step === 'goal') setStep('budget');
        else if (step === 'budget') setStep('profile');
        else if (step === 'profile') setStep('analyzing');
    };

    // AI Analysis Effect
    useEffect(() => {
        if (step === 'analyzing') {
            const texts = [
                "Analyzing University Database...",
                "Checking Visa Success Rates...",
                "Matching your Budget...",
                "Finalizing Recommendations..."
            ];

            let i = 0;
            const interval = setInterval(() => {
                i++;
                if (i < texts.length) setAnalysisText(texts[i]);
            }, 800);

            const timeout = setTimeout(() => {
                setStep('result');
            }, 3500);

            return () => {
                clearInterval(interval);
                clearTimeout(timeout);
            };
        }
    }, [step]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.name || !data.phone) return;

        setIsSubmitting(true);
        const recommendation = getRecommendation();

        try {
            // Action A: Sheet Monkey
            await fetch(SHEET_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.name,
                    phone: data.phone
                }),
            }).catch(err => console.error("Sheet Error", err));

            // Action B: WhatsApp
            const message = `Hi, I used the Country Matcher. My Name is ${data.name}. My Goal is ${data.goal} and Budget is ${data.budget}. It recommended ${recommendation} for me. Please guide me.`;
            const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');

            if (onClose) onClose();

        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // ==========================================
    // RENDER HELPERS
    // ==========================================
    const Title = ({ children }: { children: React.ReactNode }) => (
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center font-display">
            {children}
        </h2>
    );

    const OptionCard = ({ icon: Icon, label, selected, onClick }: any) => (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`w-full p-4 rounded-xl border flex items-center gap-4 transition-all group ${selected
                ? 'bg-gold/10 border-gold text-white shadow-[0_0_15px_rgba(200,169,81,0.2)]'
                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-gold/50'
                }`}
        >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${selected ? 'bg-gold text-navy' : 'bg-white/10 text-white group-hover:bg-gold/20 group-hover:text-gold'
                }`}>
                <Icon className="w-5 h-5" />
            </div>
            <span className="font-medium text-lg text-left">{label}</span>
            {selected && <CheckCircle className="w-5 h-5 text-gold ml-auto" />}
        </motion.button>
    );

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-navy-darker/80 backdrop-blur-sm"
                    onClick={onClose}
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-lg bg-navy/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
                >
                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/10">
                        <motion.div
                            className="h-full bg-gold"
                            initial={{ width: '20%' }}
                            animate={{
                                width: step === 'goal' ? '20%' :
                                    step === 'budget' ? '40%' :
                                        step === 'profile' ? '60%' :
                                            step === 'analyzing' ? '80%' : '100%'
                            }}
                        />
                    </div>

                    <div className="p-8 md:p-10">
                        {/* Close Button */}
                        {onClose && (
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        )}

                        <AnimatePresence mode="wait">
                            {/* STEP 1: GOAL */}
                            {step === 'goal' && (
                                <motion.div
                                    key="goal"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <Title>What is your #1 Priority?</Title>
                                    <div className="space-y-3">
                                        <OptionCard
                                            icon={Banknote}
                                            label="High ROI / Salaries"
                                            onClick={() => handleSelect('goal', "High ROI / Salaries")}
                                        />
                                        <OptionCard
                                            icon={Home}
                                            label="Easy PR & Settlement"
                                            onClick={() => handleSelect('goal', "Easy PR & Settlement")}
                                        />
                                        <OptionCard
                                            icon={GraduationCap}
                                            label="Top Tier Education"
                                            onClick={() => handleSelect('goal', "Top Tier Education")}
                                        />
                                        <OptionCard
                                            icon={Wallet}
                                            label="Low Cost / Budget Friendly"
                                            onClick={() => handleSelect('goal', "Low Cost / Budget Friendly")}
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 2: BUDGET */}
                            {step === 'budget' && (
                                <motion.div
                                    key="budget"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <Title>What is your Annual Budget?</Title>
                                    <div className="space-y-3">
                                        <OptionCard
                                            icon={Wallet}
                                            label="Under ₹15 Lakhs"
                                            onClick={() => handleSelect('budget', "Under ₹15 Lakhs")}
                                        />
                                        <OptionCard
                                            icon={Banknote}
                                            label="₹15 Lakhs - ₹25 Lakhs"
                                            onClick={() => handleSelect('budget', "₹15 Lakhs - ₹25 Lakhs")}
                                        />
                                        <OptionCard
                                            icon={CheckCircle}
                                            label="₹25 Lakhs + (No Limit)"
                                            onClick={() => handleSelect('budget', "₹25 Lakhs + (No Limit)")}
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 3: PROFILE */}
                            {step === 'profile' && (
                                <motion.div
                                    key="profile"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <Title>Current Qualification?</Title>
                                    <div className="space-y-3">
                                        <OptionCard
                                            icon={GraduationCap}
                                            label="12th Pass (Undergrad)"
                                            onClick={() => handleSelect('education', "12th Pass (Undergrad)")}
                                        />
                                        <OptionCard
                                            icon={Brain}
                                            label="Bachelor's (Masters)"
                                            onClick={() => handleSelect('education', "Bachelor's (Masters)")}
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 4: ANALYZING */}
                            {step === 'analyzing' && (
                                <motion.div
                                    key="analyzing"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.1 }}
                                    className="flex flex-col items-center justify-center py-12"
                                >
                                    <div className="relative mb-8">
                                        <div className="absolute inset-0 bg-gold blur-2xl opacity-20 rounded-full animate-pulse" />
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                            className="w-24 h-24 border-4 border-gold/30 border-t-gold rounded-full"
                                        />
                                        <Brain className="absolute inset-0 m-auto text-gold w-10 h-10 animate-bounce" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{analysisText}</h3>
                                    <p className="text-slate-400 text-sm">Our AI is finding your perfect match...</p>
                                </motion.div>
                            )}

                            {/* STEP 5: RESULT / GATE */}
                            {step === 'result' && (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div className="text-center mb-8">
                                        <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-gold border border-gold/20">
                                            <CheckCircle className="w-8 h-8" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-white mb-2">We found 3 Perfect Matches!</h2>
                                        <p className="text-slate-400">Unlock your personalized Country Report now.</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <input
                                                type="text"
                                                required
                                                value={data.name}
                                                onChange={(e) => setData(prev => ({ ...prev, name: e.target.value }))}
                                                className="w-full bg-navy-lighter border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all placeholder:text-slate-500"
                                                placeholder="Your Full Name"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="tel"
                                                required
                                                value={data.phone}
                                                onChange={(e) => setData(prev => ({ ...prev, phone: e.target.value }))}
                                                className="w-full bg-navy-lighter border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all placeholder:text-slate-500"
                                                placeholder="WhatsApp Number"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-gold text-navy font-bold py-4 rounded-xl mt-4 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20 transition-all flex justify-center items-center gap-2"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" /> Unlocking...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-5 h-5" /> Unlock My Report
                                                </>
                                            )}
                                        </button>
                                        <p className="text-center text-xs text-slate-500 mt-4">
                                            By clicking Unlock, you agree to receive the report on WhatsApp.
                                        </p>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
