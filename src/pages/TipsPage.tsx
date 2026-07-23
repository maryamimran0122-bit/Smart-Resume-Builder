import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, AlertTriangle, BookOpen, Target } from 'lucide-react';

export const TipsPage: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto px-6 py-10 space-y-12 text-slate-200"
    >
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Resume Mastery Guide</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">How to Write an ATS-Winning Resume in 2026</h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Proven strategies, high-impact action verbs, and formatting rules to land top tech interviews.
        </p>
      </div>

      {/* Grid Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-emerald-950/20 border border-emerald-500/20 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>DO: Best Practices</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-300 leading-relaxed list-disc list-inside">
            <li>Start every bullet point with a strong action verb (e.g. Led, Architected, Spearheaded).</li>
            <li>Quantify results with metric numbers (e.g. "Increased conversion by 28%").</li>
            <li>Tailor skills keywords to match the exact job description.</li>
            <li>Keep formatting clean, consistent, and easy to read.</li>
            <li>Include your LinkedIn and GitHub portfolio links.</li>
          </ul>
        </div>

        <div className="p-6 rounded-3xl bg-rose-950/20 border border-rose-500/20 space-y-4">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <AlertTriangle className="w-5 h-5" />
            <span>DON'T: Common Pitfalls</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-300 leading-relaxed list-disc list-inside">
            <li>Avoid generic descriptions like "responsible for managing tasks".</li>
            <li>Never use low-contrast text or illegible decorative fonts.</li>
            <li>Do not include personal photos or age/marital status if applying in the US/UK.</li>
            <li>Avoid spelling or grammatical errors — use the AI Grammar Enhancer.</li>
            <li>Don't exceed 2 pages unless you have 10+ years of senior executive experience.</li>
          </ul>
        </div>
      </div>

      {/* Action Verbs Cheat Sheet */}
      <div className="p-6 rounded-3xl glass-panel space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-400" />
          High-Impact Action Verbs Cheat Sheet
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-black/40 rounded-2xl border border-white/5">
            <span className="font-bold text-indigo-400 block mb-1">Leadership</span>
            <span className="text-slate-400 leading-relaxed">Spearheaded, Directed, Orchestrated, Championed, Mentored</span>
          </div>
          <div className="p-3 bg-black/40 rounded-2xl border border-white/5">
            <span className="font-bold text-purple-400 block mb-1">Engineering</span>
            <span className="text-slate-400 leading-relaxed">Architected, Implemented, Scaled, Optimized, Refactored</span>
          </div>
          <div className="p-3 bg-black/40 rounded-2xl border border-white/5">
            <span className="font-bold text-emerald-400 block mb-1">Growth & Results</span>
            <span className="text-slate-400 leading-relaxed">Accelerated, Boosted, Generated, Maximized, Reduced</span>
          </div>
          <div className="p-3 bg-black/40 rounded-2xl border border-white/5">
            <span className="font-bold text-amber-400 block mb-1">Design & UX</span>
            <span className="text-slate-400 leading-relaxed">Pioneered, Conceptualized, Standardized, Redesigned</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
