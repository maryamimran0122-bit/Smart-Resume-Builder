import React from 'react';
import { motion } from 'motion/react';
import { Info, ShieldCheck, Cpu, Code2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
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
          <Info className="w-3.5 h-3.5" />
          <span>About VITA.AI Platform</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">Empowering Global Careers in 2026</h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Built with React 19, Tailwind CSS, Google Gemini AI, and local storage state persistence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl glass-panel glass-panel-hover space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Privacy First</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your personal information is stored securely in your browser's LocalStorage. No database sync or account login required.
          </p>
        </div>

        <div className="p-6 rounded-3xl glass-panel glass-panel-hover space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Gemini AI Engine</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Integrated server-side with Gemini 2.5 for instant summary writing, bullet point enhancement, and ATS skill recommendations.
          </p>
        </div>

        <div className="p-6 rounded-3xl glass-panel glass-panel-hover space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Code2 className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Sophisticated Theme</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Designed with glassmorphic panels, glowing indigo/fuchsia backdrop blurs, and adaptive dark/light contrast support.
          </p>
        </div>
      </div>
    </motion.div>
  );
};
