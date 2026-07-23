import React from 'react';
import { Keyboard, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  charCount: number;
  wordCount: number;
  onOpenShortcuts: () => void;
}

export const Footer: React.FC<FooterProps> = ({ charCount, wordCount, onOpenShortcuts }) => {
  return (
    <footer className="no-print h-10 px-6 flex items-center justify-between border-t border-white/10 bg-black/40 backdrop-blur-md text-[10px] font-medium text-slate-400 z-30">
      <div className="flex items-center gap-6">
        <span>Words: <strong className="text-white">{wordCount}</strong></span>
        <span>Characters: <strong className="text-white">{charCount}</strong></span>
        <span className="hidden sm:inline text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
          v2.5 (2026 Engine)
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="hidden md:flex items-center gap-1.5 text-emerald-400">
          <ShieldCheck className="w-3 h-3" />
          ATS Verified
        </span>
        <button
          onClick={onOpenShortcuts}
          className="hover:text-white flex items-center gap-1 transition-colors"
        >
          <Keyboard className="w-3 h-3 text-indigo-400" />
          Hotkeys
        </button>
        <span className="hidden lg:inline text-slate-500">
          Built with <Heart className="w-2.5 h-2.5 inline text-rose-500" /> for jobseekers worldwide
        </span>
      </div>
    </footer>
  );
};
