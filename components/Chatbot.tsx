import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, Sparkles, User, ChevronRight } from 'lucide-react';

// --- Types ---
type Sender = 'bot' | 'user';

interface Message {
    id: string;
    text: string;
    sender: Sender;
    options?: string[];
    isTyping?: boolean; // For initial loading state
}

interface UserData {
    name: string;
    phone: string;
    interest: string;
    country: string;
}

// --- Configuration ---
const WA_NUMBER = "917990675093"; // Updated Number

// --- Helper: Fuzzy Matching ---
// Simple Levenshtein distance for typo tolerance
const levenshteinDistance = (a: string, b: string) => {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) == a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    Math.min(
                        matrix[i][j - 1] + 1, // insertion
                        matrix[i - 1][j] + 1 // deletion
                    )
                );
            }
        }
    }

    return matrix[b.length][a.length];
};

const isFuzzyMatch = (input: string, keyword: string, threshold = 2) => {
    // If input is short, require exact match or very close
    if (keyword.length < 4) return input.includes(keyword);

    // Check for substring match first
    if (input.includes(keyword)) return true;

    // Split input into words and check distance against keyword
    const words = input.split(/\s+/);
    return words.some(word => levenshteinDistance(word, keyword) <= threshold);
};

// --- Knowledge Base "Brain" ---
const KNOWLEDGE_BASE = [
    {
        keywords: ['hi', 'hello', 'hey', 'greetings', 'start', 'morning', 'afternoon', 'namaste'],
        response: "Welcome to **My Abroad Portal**! 🌐 A Vision for Your Future.\n\nWe specialize in **Student Visas**, **Visitor Visas**, and **Work Permits & PR**.\n\nHow can we help you today?",
        options: ["Student Visa 🎓", "Visitor Visa ✈️", "Work Permit & PR 🏆", "Talk to Counselor 👨‍💼"]
    },

    // ========== STUDENT VISA ==========
    {
        keywords: ['student visa', 'study abroad', 'study visa', 'student', 'university', 'college', 'education'],
        response: "**Student Visa Services** 🎓\n\nWe provide complete support for study permits in:\n• Canada 🍁\n• USA 🦅\n• UK 🇬🇧\n• Australia 🦘\n\n**Services Include:**\n✅ University Selection\n✅ SOP & LOR Guidance\n✅ Visa Application Filing\n✅ Interview Preparation\n\nWhich country interests you?",
        options: ["Canada", "USA", "UK", "Australia", "All Countries"],
        interest: "Student Visa"
    },

    // ========== VISITOR VISA ==========
    {
        keywords: ['visitor visa', 'tourist visa', 'visit', 'travel', 'family visit', 'tourism'],
        response: "**Visitor Visa Services** ✈️\n\nExpert assistance for tourist and family visit visas:\n• Canada Tourist Visa\n• USA B1/B2 Visa\n• UK Visit Visa\n• Schengen Visa\n\n**We Handle:**\n✅ Document Preparation\n✅ Application Filing\n✅ Interview Support\n\nWhich country would you like to visit?",
        options: ["Canada", "USA", "UK", "Europe", "Talk to Counselor"],
        interest: "Visitor Visa"
    },

    // ========== WORK PERMIT & PR ==========
    {
        keywords: ['work permit', 'pr', 'permanent residence', 'immigration', 'express entry', 'skilled migration', 'work visa'],
        response: "**Work Permit & PR Services** 🏆\n\n**Canada:**\n• Express Entry\n• Provincial Nomination (PNP)\n• Post-Graduation Work Permit\n\n**Australia:**\n• Skilled Migration (189/190)\n• Points Assessment\n• Employer Sponsorship\n\n**Services:**\n✅ Eligibility Assessment (FREE)\n✅ Documentation Support\n✅ Application Filing\n\nWhich program interests you?",
        options: ["Canada Express Entry", "Australia PR", "Points Assessment", "Talk to Expert"],
        interest: "Work Permit & PR"
    },

    // ========== VISA SERVICES (General) ==========
    {
        keywords: ['visa', 'immigration', 'foreign', 'permit'],
        response: "**My Abroad Portal Visa Services** 🌍\n\nWe handle all types of visas:\n\n🎓 **Student Visas** - Study permits for Canada, USA, UK, Australia\n✈️ **Visitor Visas** - Tourist & family visit visas\n🏆 **Work Permits & PR** - Permanent residency solutions\n\nWhich service do you need?",
        options: ["Student Visa", "Visitor Visa", "Work Permit & PR", "Free Consultation"],
        interest: "Visa Services"
    },

    {
        keywords: ['canada', 'canadian'],
        response: "**Canada Study Visa** 🇨🇦\n\n✅ Post-study work permit (3 years)\n✅ PR pathway available\n✅ High acceptance rate\n\n**Our Package Includes:**\n• University shortlisting\n• SOP & LOR creation\n• Financial documentation audit\n• Visa interview prep\n\nFirst assessment is FREE! Want to proceed?",
        options: ["Book Free Assessment", "Talk to Counselor"],
        interest: "Canada Visa"
    },

    {
        keywords: ['uk', 'united kingdom', 'britain', 'england'],
        response: "**UK Study Visa** 🇬🇧\n\n✅ 2-year post-study work visa\n✅ World-class universities\n✅ 1-year master's programs\n\n**Our Package Includes:**\n• University selection\n• UCAS application support\n• CAS letter guidance\n• Visa filing & interview prep\n\nReady to explore UK options?",
        options: ["Book Free Assessment", "Talk to Counselor"],
        interest: "UK Visa"
    },

    {
        keywords: ['usa', 'america', 'united states', 'us'],
        response: "**USA Study Visa** 🇺🇸\n\n✅ OPT & STEM extension\n✅ Top-ranked universities\n✅ Research opportunities\n\n**Our Package Includes:**\n• University matching\n• I-20 processing\n• DS-160 & SEVIS fee guidance\n• F-1 visa interview coaching\n\nInterested in USA admission?",
        options: ["Book Free Assessment", "Talk to Counselor"],
        interest: "USA Visa"
    },

    {
        keywords: ['australia', 'aussie', 'aus'],
        response: "**Australia Study Visa** 🇦🇺\n\n✅ Post-study work rights\n✅ Relaxed visa requirements\n✅ Affordable living costs\n\n**Our Package Includes:**\n• Course & university selection\n• GTE statement drafting\n• Health insurance setup\n• Visa lodgement support\n\nWant to know your eligibility?",
        options: ["Book Free Assessment", "Talk to Counselor"],
        interest: "Australia Visa"
    },

    // ========== PRICING & GENERAL ==========
    {
        keywords: ['price', 'cost', 'fees', 'charge', 'money', 'payment', 'expensive', 'rupees'],
        response: "**Transparent Pricing** 💎\n\n**First Profile Assessment:** **FREE** ✅\n\n**Full Visa Package:** Varies by country & visa type\n• Student Visa: Contact for quote\n• Visitor Visa: Contact for quote\n• PR Services: Contact for quote\n\n*We offer customized packages based on your needs.*\n\nReady to get started with a FREE assessment?",
        options: ["Free Assessment", "Talk to Counselor"],
        interest: "Pricing"
    },

    {
        keywords: ['location', 'address', 'where', 'visit', 'office', 'city', 'located'],
        response: "**Visit Us** 🏢\n\n📍 **Vadodara | Ahmedabad | Mahesana**\n📞 **+91 63589 90015**\n\nVisit any of our 3 branches for a free consultation!\n\nWould you like directions or prefer to book an appointment?",
        options: ["Book Appointment", "Call Now"],
        interest: "General Inquiry"
    },

    {
        keywords: ['contact', 'phone', 'call', 'number', 'speak', 'talk', 'human', 'counselor', 'agent'],
        response: "**Contact My Abroad Portal** 📞\n\n**Phone:** +91 63589 90015\n**Locations:** Vadodara | Ahmedabad | Mahesana\n**WhatsApp:** Available 24/7\n\nOur senior visa consultants are ready to help!\n\nHow would you like to connect?",
        options: ["Call Now", "Chat on WhatsApp", "Request Call Back"],
        interest: "General Inquiry"
    },

    {
        keywords: ['demo', 'book', 'booking', 'register', 'enroll', 'sign up', 'yes', 'appointment', 'consultation'],
        response: "Perfect! 🌟 A free consultation is the best way to understand your options.\n\nLet's get you booked. **What is your full name?**",
        triggerFlow: 'NAME'
    }
];

const FALLBACK_RESPONSE = {
    text: "I want to ensure I understand you perfectly. 🤔\n\nI can connect you directly to our visa consultant, or you can choose from these popular options:",
    options: ["Student Visa 🎓", "Visitor Visa ✈️", "Work Permit & PR 🏆", "Talk to Counselor"]
};

// --- Component ---
export const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Welcome to My Abroad Portal! 🌐 A Vision for Your Future.",
            sender: 'bot',
        },
        {
            id: '2',
            text: "How can we help you with your visa needs today?",
            sender: 'bot',
            options: ["Student Visa 🎓", "Visitor Visa ✈️", "Work Permit & PR 🏆", "Talk to Counselor 👨‍💼"],
        }
    ]);

    // Flow control
    const [flowState, setFlowState] = useState<'IDLE' | 'NAME' | 'PHONE' | 'INTEREST'>('IDLE');
    const [userData, setUserData] = useState<UserData>({
        name: '',
        phone: '',
        interest: '',
        country: ''
    });

    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping, isOpen]);

    // Helper to add message
    const addMessage = (text: string, sender: Sender, options?: string[]) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            text,
            sender,
            options
        };
        setMessages(prev => [...prev, newMessage]);
    };

    // Bot thinking simulation
    const simulateBotResponse = (response: string, options?: string[], delay = 1000) => {
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            addMessage(response, 'bot', options);
        }, delay);
    };

    // Main Logic Engine
    const processInput = (input: string) => {
        const lowerInput = input.trim().toLowerCase();

        // 1. Check if we are in a Data Collection Flow
        if (flowState === 'NAME') {
            setUserData(prev => ({ ...prev, name: input }));
            setFlowState('PHONE');
            simulateBotResponse(`Nice to meet you, ${input}! 👋\n\nCould you please share your **WhatsApp number** so our team can send you the demo link?`);
            return;
        }

        if (flowState === 'PHONE') {
            setUserData(prev => ({ ...prev, phone: input }));
            setFlowState('IDLE'); // End of flow

            // Final Action: WhatsApp Redirect
            const finalMessage = "Perfect! 🎉 I've generated a priority pass for you.\n\nClick the button below to confirm your slot on WhatsApp with our Senior Counselor.";
            simulateBotResponse(finalMessage, ["Confirm on WhatsApp 🟢"]);
            return;
        }

        // 2. Keyword Matching (The "Brain")

        // Smart Keyword Search with Fuzzy Matching
        let matchedItem = null;

        // Iterate through all items
        for (const item of KNOWLEDGE_BASE) {
            // Check all keywords for this item
            const isMatch = item.keywords.some(keyword => isFuzzyMatch(lowerInput, keyword));
            if (isMatch) {
                matchedItem = item;
                break; // Stop at first match (Priority determined by array order)
            }
        }

        if (matchedItem) {
            if (matchedItem.interest) {
                setUserData(prev => ({ ...prev, interest: matchedItem.interest }));
            }
            // Check if this triggers a flow immediately
            if (matchedItem.triggerFlow === 'NAME') {
                setFlowState('NAME');
            }
            simulateBotResponse(matchedItem.response, matchedItem.options);
        } else {
            // Fallback
            simulateBotResponse(FALLBACK_RESPONSE.text, FALLBACK_RESPONSE.options);
        }
    };

    const handleSend = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputText.trim()) return;

        // Add User Message
        addMessage(inputText, 'user');
        const tempInput = inputText;
        setInputText('');

        // Process
        processInput(tempInput);
    };

    const handleOptionClick = (option: string) => {
        addMessage(option, 'user');

        // Special handling for the WhatsApp button
        if (option.includes("WhatsApp")) {
            // Construct WhatsApp URL
            const { name, phone, interest } = userData;
            const text = `Hi, I chatted with Priya (AI). I am interested in *${interest || 'Overseas Education'}*. My Name is *${name}* and Phone is *${phone}*. Please guide me.`;
            const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
            window.open(url, '_blank');
            return;
        }

        processInput(option);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none font-sans">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="pointer-events-auto mb-4 w-[360px] md:w-[400px] h-[600px] bg-navy/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-navy-lighter to-navy p-4 flex items-center justify-between border-b border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-yellow-600 flex items-center justify-center border border-white/10 shadow-lg">
                                        <Bot className="text-navy w-6 h-6" />
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-navy animate-pulse"></div>
                                </div>
                                <div>
                                    <h3 className="font-display font-bold text-white text-lg">Skik International</h3>
                                    <p className="text-xs text-gold/80 font-medium flex items-center gap-1">
                                        <Sparkles size={10} /> Online • Premium Support
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                    {/* Message Bubble */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`max-w-[85%] px-5 py-3 text-sm leading-relaxed shadow-md ${msg.sender === 'user'
                                            ? 'bg-gradient-to-br from-gold to-yellow-600 text-navy font-bold rounded-2xl rounded-tr-sm'
                                            : 'bg-white/10 backdrop-blur-md text-slate-100 rounded-2xl rounded-tl-sm border border-white/5'
                                            }`}
                                    >
                                        {/* Render newlines */}
                                        {msg.text.split('\n').map((line, i) => (
                                            <p key={i} className={i > 0 ? 'mt-2' : ''}>
                                                {/* Simple markdown bold parsing */}
                                                {line.split('**').map((part, index) =>
                                                    index % 2 === 1 ? <strong key={index} className="text-white">{part}</strong> : part
                                                )}
                                            </p>
                                        ))}
                                    </motion.div>

                                    {/* Options / Chips */}
                                    {msg.options && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className="mt-3 flex flex-wrap gap-2"
                                        >
                                            {msg.options.map((opt) => (
                                                <button
                                                    key={opt}
                                                    onClick={() => handleOptionClick(opt)}
                                                    className="px-4 py-2 bg-navy-lighter hover:bg-white/10 border border-gold/20 hover:border-gold/50 rounded-xl text-xs text-gold font-bold transition-all shadow-sm active:scale-95 flex items-center gap-2"
                                                >
                                                    {opt} <ChevronRight size={12} />
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <div className="flex items-center gap-1 bg-white/5 rounded-2xl rounded-tl-sm px-4 py-3 w-fit">
                                    <div className="w-2 h-2 bg-gold/50 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                                    <div className="w-2 h-2 bg-gold/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    <div className="w-2 h-2 bg-gold/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSend} className="p-4 border-t border-white/5 bg-navy-darker/90 backdrop-blur-md">
                            <div className="relative flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="Type your message..."
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    className="w-full bg-navy border border-white/10 rounded-2xl pl-4 pr-12 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all shadow-inner"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputText.trim()}
                                    className="absolute right-2 p-2 bg-gold rounded-xl text-navy hover:bg-white hover:text-navy disabled:opacity-50 disabled:bg-slate-700 disabled:text-slate-500 transition-all shadow-lg active:scale-90"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                            <div className="text-center mt-2">
                                <span className="text-[10px] text-slate-500 uppercase tracking-widest">Powered by Skik International</span>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="pointer-events-auto relative group"
            >
                <div className="absolute inset-0 bg-gold rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity animate-pulse"></div>
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gold to-yellow-600 rounded-full shadow-2xl relative z-10 border-2 border-white/10">
                    {isOpen ? (
                        <X className="text-navy w-8 h-8" />
                    ) : (
                        <MessageCircle className="text-navy w-8 h-8" />
                    )}
                </div>
                {/* Notification Badge */}
                {!isOpen && (
                    <div className="absolute -top-1 -right-1 z-20 w-5 h-5 bg-red-500 rounded-full border-2 border-navy flex items-center justify-center">
                        <span className="text-[10px] font-bold text-white">1</span>
                    </div>
                )}
            </motion.button>
        </div>
    );
};
