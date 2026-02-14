import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, BadgeCheck, ShieldCheck } from 'lucide-react';

// Dynamically import all images from the wall-of-trust folder
const images = import.meta.glob('/src/assets/wall-of-trust/*', { eager: true, as: 'url' });
const imageUrls = Object.values(images);

// Realistic Mock Data Pool
const MOCK_PROFILES = [
    { name: "Riya Gupta", country: "Canada", visa: "Study Visa", days: 12 },
    { name: "Priya Sharma", country: "UK", visa: "Tier 4 Student", days: 8 },
    { name: "Vikram Singh", country: "USA", visa: "F1 Visa", days: 15 },
    { name: "Aarav Patel", country: "Australia", visa: "Subclass 500", days: 18 },
    { name: "Arjun Mehta", country: "Germany", visa: "Student Visa", days: 22 },
    { name: "Sneha Reddy", country: "Canada", visa: "PGWP", days: 45 },
    { name: "Rohan Kumar", country: "Ireland", visa: "Study Visa", days: 14 },
    { name: "Ananya Das", country: "USA", visa: "Spring Intake", days: 10 },
    { name: "Ishaan Verma", country: "UK", visa: "Priority Visa", days: 5 },
    { name: "Kavya Nair", country: "New Zealand", visa: "Student Visa", days: 25 },
    { name: "Aditya Joshi", country: "Canada", visa: "SDS Category", days: 9 },
    { name: "Diya Malhotra", country: "Australia", visa: "Masters", days: 16 },
    { name: "Manish Tiwari", country: "USA", visa: "F1 Approval", days: 7 },
    { name: "Sanya Kapoor", country: "France", visa: "Student Visa", days: 20 },
    { name: "Varun Chopra", country: "UK", visa: "Russell Group", days: 11 },
    { name: "Nisha Agarwal", country: "Canada", visa: "Study Permit", days: 13 },
];

export const VisaWallOfTrust = () => {
    return (
        <section className="py-24 px-6 relative">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border-gold/20 text-gold text-xs font-bold tracking-widest uppercase mb-6">
                        <ShieldCheck size={14} /> Official Grants
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                        Wall of <span className="gold-gradient-text">Trust</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Real people. Real visas. Real dreams achieved. Join the hall of fame.
                    </p>
                </div>

                {/* Dynamic Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {imageUrls.length > 0 ? (
                        imageUrls.map((url, idx) => {
                            // Deterministically assign a profile based on index
                            const profile = MOCK_PROFILES[idx % MOCK_PROFILES.length];

                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    whileHover={{ scale: 1.05 }}
                                    viewport={{ once: true }}
                                    className="aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer group relative shadow-2xl border border-white/5"
                                >
                                    {/* Image */}
                                    <img
                                        src={url}
                                        alt={`Visa Success Story ${profile.name}`}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Overlay Gradient (From SuccessStories) */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />

                                    {/* Visa Badge (From SuccessStories) */}
                                    <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 flex items-center gap-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.1)] group-hover:bg-green-500/20 group-hover:border-green-500/30 transition-all">
                                        <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">VISA GRANTED</span>
                                    </div>

                                    {/* Bottom Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <h3 className="text-xl font-display font-bold text-white mb-1">
                                            {profile.name}
                                        </h3>
                                        <p className="text-slate-400 text-sm font-medium mb-2">{profile.country} • {profile.visa}</p>
                                        <p className="text-gold text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                            <BadgeCheck className="w-3 h-3" /> Processed in {profile.days} Days
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })
                    ) : (
                        // Fallback State if no images exist
                        <div className="col-span-full py-12 text-center border border-dashed border-white/10 rounded-3xl bg-white/5">
                            <p className="text-slate-400 mb-2">No success stories uploaded yet.</p>
                            <p className="text-sm text-slate-500">Add images to <code className="text-gold">src/assets/wall-of-trust</code></p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
