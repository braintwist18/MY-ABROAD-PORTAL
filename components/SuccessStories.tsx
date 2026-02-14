import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, BadgeCheck, Star } from 'lucide-react';

const stories = [
    {
        id: 1,
        name: "Anjali P.",
        visa: "Study Visa",
        country: "Canada",
        flag: "🇨🇦",
        days: 12,
        image: "https://images.unsplash.com/photo-1629814493774-4b53155f6534?auto=format&fit=crop&w=800&q=80", // Happy Indian Girl
    },
    {
        id: 2,
        name: "Rahul S.",
        visa: "F1 Visa",
        country: "USA",
        flag: "🇺🇸",
        days: 5,
        image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80", // Indian Student Male
    },
    {
        id: 3,
        name: "Arjun K.",
        visa: "Tier 4 Visa",
        country: "UK",
        flag: "🇬🇧",
        days: 8,
        image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80", // Happy Graduate
    },
    {
        id: 4,
        name: "Vikram M.",
        visa: "Work Permit",
        country: "Australia",
        flag: "🇦🇺",
        days: 20,
        image: "https://images.unsplash.com/photo-1549488497-65715cb98755?auto=format&fit=crop&w=800&q=80", // Young Professional
    },
    {
        id: 5,
        name: "The Mehta Family",
        visa: "PR Approved",
        country: "Canada",
        flag: "🇨🇦",
        days: 45,
        image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80", // Family
    },
    {
        id: 6,
        name: "Mr. & Mrs. Gupta",
        visa: "Visitor Visa",
        country: "USA",
        flag: "🇺🇸",
        days: 15,
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80", // Senior Couple
    },
    {
        id: 7,
        name: "Priya D.",
        visa: "Student Visa",
        country: "Germany",
        flag: "🇩🇪",
        days: 22,
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80", // Student Group
    },
    {
        id: 8,
        name: "Karan L.",
        visa: "Study Visa",
        country: "Ireland",
        flag: "🇮🇪",
        days: 18,
        image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=800&q=80", // Student with backpack
    },
];

export const SuccessStories = () => {
    return (
        <section className="py-24 px-6 overflow-hidden bg-navy">
            <div className="max-w-7xl mx-auto mb-16 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border-gold/20 text-gold text-xs font-bold tracking-widest uppercase mb-6">
                    <BadgeCheck size={14} /> Proven Results
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                    Success Stories <span className="gold-gradient-text">Gallery</span>
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                    Real students, real visas. Join the community of 15,000+ happy achievers who trusted Nexus Overseas.
                </p>
            </div>

            {/* Scrolling Container */}
            <div className="relative w-full">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-navy to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-navy to-transparent z-10 pointer-events-none" />

                <div className="flex gap-8 overflow-x-auto pb-12 pt-4 px-6 snap-x snap-mandatory scrollbar-hide -mx-6 md:mx-0">
                    {stories.map((story) => (
                        <motion.div
                            key={story.id}
                            whileHover={{ scale: 1.02, y: -5 }}
                            className="relative min-w-[280px] md:min-w-[320px] h-[450px] rounded-3xl overflow-hidden cursor-pointer group snap-center border border-white/5 shadow-2xl"
                        >
                            {/* Image */}
                            <img
                                src={story.image}
                                alt={story.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />

                            {/* Visa Badge */}
                            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 flex items-center gap-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.1)] group-hover:bg-green-500/20 group-hover:border-green-500/30 transition-all">
                                <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                                <span className="text-[10px] font-bold text-white uppercase tracking-wider">VISA GRANTED</span>
                            </div>

                            {/* Bottom Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <h3 className="text-2xl font-display font-bold text-white mb-1">
                                    {story.name}
                                </h3>
                                <p className="text-slate-400 text-sm font-medium mb-2">{story.country} • {story.visa}</p>
                                <p className="text-gold text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                    <BadgeCheck className="w-3 h-3" /> Processed in {story.days} Days
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
