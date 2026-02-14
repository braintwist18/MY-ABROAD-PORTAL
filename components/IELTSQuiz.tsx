import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Award, Send, Phone, Lock, ChevronRight, Share2 } from 'lucide-react';

// ============================================
// CONFIGURATION
// ============================================
const SHEET_URL = "https://api.sheetmonkey.io/form/pqyMt4bzmvN2hhBqCXWHA4";
const WA_NUMBER = "917990675093"; // Updated Number

// ============================================
// QUIZ DATA (FIXED)
// ============================================
const quizQuestions = [
  {
    id: 1,
    type: "Reading (Inference)",
    question: "The passage implies that urban sprawl is 'inevitable'. What does the author mean?",
    options: ["It is a deliberate choice", "It cannot be avoided", "It is environmentally beneficial"],
    correctAnswer: 1, // Index of "It cannot be avoided"
  },
  {
    id: 2,
    type: "Vocabulary (Academic)",
    question: "Select the most accurate synonym for 'Substantial' in an academic context:",
    options: ["Minimal", "Significant", "Fragile"],
    correctAnswer: 1, // Index of "Significant"
  },
  {
    id: 3,
    type: "Reading (True/False)",
    question: "TRUE/FALSE/NOT GIVEN: The text states that the team won despite the rain. The statement says 'Weather did not affect the outcome'.",
    options: ["True", "False", "Not Given"],
    correctAnswer: 0, // Index of "True"
  },
  {
    id: 4,
    type: "Listening (Idiom)",
    question: "If a speaker says they are 'on the fence' about a project, they are:",
    options: ["Very supportive", "Undecided", "Highly critical"],
    correctAnswer: 1, // Index of "Undecided"
  },
  {
    id: 5,
    type: "Listening (Distractor)",
    question: "A speaker says: 'I'll arrive at 6... actually, let's make it 7.' What time is the arrival?",
    options: ["6:00 PM", "7:00 PM", "8:00 PM"],
    correctAnswer: 1, // Index of "7:00 PM"
  },
  {
    id: 6,
    type: "Listening (Signposting)",
    question: "Which word indicates a speaker is about to provide a summary?",
    options: ["In contrast", "To recap", "Furthermore"],
    correctAnswer: 1, // Index of "To recap"
  },
  {
    id: 7,
    type: "Writing (Cohesion)",
    question: "Which connector is used to introduce a contrasting academic argument?",
    options: ["Moreover", "Nevertheless", "Subsequently"],
    correctAnswer: 1, // Index of "Nevertheless"
  },
  {
    id: 8,
    type: "Writing (Task 1)",
    question: "Identify the correct structure for Task 1: 'The graph illustrates a ______ in sales.'",
    options: ["Sharply decline", "Sharp decline", "Sharp declining"],
    correctAnswer: 1, // Index of "Sharp decline"
  },
  {
    id: 9,
    type: "Speaking (Strategy)",
    question: "Which phrase is most appropriate to 'buy time' during a Speaking interview?",
    options: ["I don't know", "That's an interesting question, let me think...", "Next question please"],
    correctAnswer: 1, // Index of "That's an interesting question..."
  },
  {
    id: 10,
    type: "Vocabulary (Band 8+)",
    question: "Select the most 'Band 8+' vocabulary to describe a busy city:",
    options: ["A very crowded place", "A bustling metropolis", "A place with many people"],
    correctAnswer: 1, // Index of "A bustling metropolis"
  },
];

// ============================================
// MAIN COMPONENT
// ============================================
export default function IELTSQuiz() {
  const [currentStep, setCurrentStep] = useState<'start' | 'quiz' | 'analyzing' | 'gate' | 'result'>('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Calculate Band Score
  const calculateResult = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quizQuestions[index].correctAnswer) {
        correct++;
      }
    });

    let band = "Band 5.0 - 5.5";
    if (correct >= 9) band = "Band 8.0 - 8.5";
    else if (correct >= 7) band = "Band 7.0 - 7.5";
    else if (correct >= 5) band = "Band 6.0 - 6.5";

    return { correct, band };
  };

  // Handle Logic
  const handleStart = () => setCurrentStep('quiz');

  const handleAnswerSelect = (index: number) => setSelectedOption(index);

  const handleNext = () => {
    if (selectedOption === null) return;

    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setCurrentStep('analyzing');
    }
  };

  // Simulation of "Analyzing..."
  useEffect(() => {
    if (currentStep === 'analyzing') {
      const timer = setTimeout(() => {
        setCurrentStep('gate');
      }, 2000); // 2 seconds delay
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  // Submit Logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    const { correct, band } = calculateResult();

    try {
      // Action A: POST to Sheet
      await fetch(SHEET_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          score: `${correct}/10`,
          band
        }),
      }).catch(err => console.error("Sheet Error:", err));

      // Action B: Open WhatsApp
      const message = `Hi, I just finished the test. My Name is ${name}. My Predicted Band is ${band}. I want to join the batch.`;
      const whatsappUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

      window.open(whatsappUrl, '_blank');

      setCurrentStep('result');
    } catch (error) {
      console.error(error);
      // Even if fetch fails, show result
      setCurrentStep('result');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================
  // RENDER HELPERS
  // ============================================

  // 1. Start Screen
  if (currentStep === 'start') {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#C8A951] to-transparent opacity-50" />

          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 bg-gradient-to-br from-[#C8A951] to-[#E5C572] rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-[#C8A951]/20"
          >
            <Award className="w-10 h-10 text-[#0A1628]" />
          </motion.div>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            IELTS <span className="text-[#C8A951]">Band Predictor</span>
          </h1>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Take our premium 2-minute diagnostic test to reveal your current IELTS standing.
            <span className="block mt-2 text-[#C8A951]/80 font-medium">10 Questions • AI Analysis • Instant Result</span>
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            className="bg-gradient-to-r from-[#C8A951] to-[#E5C572] text-[#0A1628] font-bold text-xl py-4 px-10 rounded-xl shadow-xl hover:shadow-[#C8A951]/20 transition-all flex items-center gap-2 mx-auto"
          >
            Start Diagnostic <ChevronRight className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // 2. Quiz Screen
  if (currentStep === 'quiz') {
    const question = quizQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-[#C8A951] text-sm font-semibold mb-2">
              <span>Question {currentQuestion + 1}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-[#C8A951]"
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl"
            >
              <div className="inline-block px-3 py-1 rounded-full bg-[#C8A951]/10 text-[#C8A951] text-xs font-bold tracking-wider mb-4 border border-[#C8A951]/20">
                {question.type.toUpperCase()}
              </div>

              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8 leading-snug">
                {question.question}
              </h2>

              <div className="space-y-4">
                {question.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswerSelect(idx)}
                    className={`w-full p-5 rounded-xl text-left transition-all border-2 flex items-center gap-4 group ${selectedOption === idx
                      ? 'bg-[#C8A951]/10 border-[#C8A951] shadow-[0_0_20px_rgba(200,169,81,0.2)]'
                      : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/20'
                      }`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedOption === idx ? 'border-[#C8A951]' : 'border-white/30 group-hover:border-white/60'
                      }`}>
                      {selectedOption === idx && <div className="w-3 h-3 bg-[#C8A951] rounded-full" />}
                    </div>
                    <span className={`text-lg ${selectedOption === idx ? 'text-[#C8A951]' : 'text-gray-300'}`}>
                      {option}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleNext}
                  disabled={selectedOption === null}
                  className={`py-3 px-8 rounded-xl font-bold text-lg transition-all ${selectedOption === null
                    ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                    : 'bg-[#C8A951] text-[#0A1628] hover:bg-[#E5C572]'
                    }`}
                >
                  {currentQuestion === 9 ? 'Finish Test' : 'Next'}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // 3. Analyzing Loader
  if (currentStep === 'analyzing') {
    return (
      <div className="min-h-screen bg-[#0A1628] flex flex-col items-center justify-center p-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-[#C8A951]/30 border-t-[#C8A951] rounded-full mb-8"
        />
        <h2 className="text-2xl font-bold text-white mb-2">Analyzing Responses...</h2>
        <p className="text-gray-400">Calculating your Band Score</p>
      </div>
    );
  }

  // 4. Gate (Lead Gen Form)
  if (currentStep === 'gate') {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#C8A951]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#C8A951]">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Score Ready</h2>
            <p className="text-gray-300">Enter your details to reveal your Predicted Band Score & Feedback.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#C8A951] text-sm font-semibold mb-2">FULL NAME</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0A1628]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#C8A951] focus:ring-1 focus:ring-[#C8A951] outline-none transition-all placeholder:text-gray-600"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-[#C8A951] text-sm font-semibold mb-2">WHATSAPP NUMBER</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#0A1628]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#C8A951] focus:ring-1 focus:ring-[#C8A951] outline-none transition-all placeholder:text-gray-600"
                placeholder="+91 98765 43210"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#C8A951] to-[#E5C572] text-[#0A1628] font-bold py-4 rounded-xl mt-4 hover:shadow-lg hover:shadow-[#C8A951]/20 transition-all flex justify-center items-center gap-2"
            >
              {isSubmitting ? 'Unlocking...' : (
                <>
                  <Share2 className="w-5 h-5" /> Reveal Score
                </>
              )}
            </button>
          </form>
          <p className="text-center text-xs text-gray-500 mt-6">
            Your results will be sent to your WhatsApp immediately.
          </p>
        </motion.div>
      </div>
    );
  }

  // 5. Result Screen
  if (currentStep === 'result') {
    const { correct, band } = calculateResult();

    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C8A951] to-transparent" />

          <h2 className="text-gray-300 text-lg mb-2">Great job, {name}!</h2>
          <h1 className="text-4xl font-bold text-white mb-8">Your Predicted Score</h1>

          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-[#C8A951] blur-2xl opacity-20 rounded-full" />
            <div className="relative border-4 border-[#C8A951] rounded-full w-40 h-40 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(200,169,81,0.3)] bg-[#0A1628]">
              <span className="text-3xl font-bold text-white">{band}</span>
              <span className="text-xs text-[#C8A951] mt-1 tracking-widest uppercase">Band Score</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="text-[#C8A951] text-2xl font-bold">{correct}/10</div>
              <div className="text-gray-400 text-sm">Correct Answers</div>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="text-[#C8A951] text-2xl font-bold">Top 15%</div>
              <div className="text-gray-400 text-sm">Performance</div>
            </div>
          </div>

          <p className="text-gray-300 mb-8 max-w-sm mx-auto">
            We've sent a detailed breakdown and study plan to your WhatsApp <span className="text-[#C8A951] font-semibold">({phone})</span>.
          </p>

          <a
            href={`https://wa.me/${WA_NUMBER}?text=Hi, I want to join the IELTS batch.`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-green-900/20 flex items-center justify-center gap-2"
          >
            <Phone className="w-5 h-5" /> Join Today's Batch
          </a>
        </motion.div>
      </div>
    );
  }

  return null;
}
