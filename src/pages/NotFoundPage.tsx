import React from 'react';
import { Home, AlertCircle } from 'lucide-react';

interface NotFoundProps {
  onGoHome: () => void;
}

export const NotFoundPage: React.FC<NotFoundProps> = ({ onGoHome }) => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <div className="w-16 h-16 rounded-3xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-black text-white">404 — Page Not Found</h1>
      <p className="text-xs text-slate-400 max-w-sm">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={onGoHome}
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg transition-colors"
      >
        <Home className="w-4 h-4" /> Return to Home
      </button>
    </div>
  );
};
