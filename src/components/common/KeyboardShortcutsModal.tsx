import React from 'react';
import { Keyboard, X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { keys: ['Ctrl', 'Z'], desc: 'Undo last edit' },
    { keys: ['Ctrl', 'Y'], desc: 'Redo reverted edit' },
    { keys: ['Ctrl', 'P'], desc: 'Print / Export PDF' },
    { keys: ['Ctrl', 'S'], desc: 'Manual force save to localStorage' },
    { keys: ['Esc'], desc: 'Close modals & popups' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121218] border border-white/10 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <Keyboard className="w-5 h-5 text-indigo-400" />
            <span>Keyboard Shortcuts</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {shortcuts.map((s, idx) => (
            <div key={idx} className="flex items-center justify-between p-2.5 rounded-2xl bg-white/5 border border-white/5 text-xs">
              <span className="text-slate-300">{s.desc}</span>
              <div className="flex items-center gap-1">
                {s.keys.map((k, i) => (
                  <kbd key={i} className="px-2 py-1 bg-black/50 border border-white/20 rounded-lg text-[10px] font-mono text-indigo-300 font-bold shadow-inner">
                    {k}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
};
