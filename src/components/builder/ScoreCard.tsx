import React from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';
import { ResumeScore } from '../../types/resume';

interface ScoreCardProps {
  score: ResumeScore;
  onApplyFix?: (section: string) => void;
  onGenerateAISummary?: () => void;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ score, onApplyFix, onGenerateAISummary }) => {
  const getScoreColor = (total: number) => {
    if (total >= 90) return 'text-emerald-400 bg-emerald-500';
    if (total >= 80) return 'text-indigo-400 bg-indigo-500';
    if (total >= 70) return 'text-amber-400 bg-amber-500';
    return 'text-rose-400 bg-rose-500';
  };

  const badgeColor = getScoreColor(score.totalScore);

  return (
    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
      {/* Header & Main Score */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">ATS Strength Score</h3>
            <p className="text-[10px] text-slate-400">Grade: <span className="font-bold text-white">{score.grade}</span></p>
          </div>
        </div>
        <div className="text-right">
          <span className={`text-xl font-black ${badgeColor.split(' ')[0]}`}>{score.totalScore}%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
        <div
          className={`h-full transition-all duration-700 ease-out ${badgeColor.split(' ')[1]}`}
          style={{ width: `${score.totalScore}%` }}
        />
      </div>

      {/* Breakdown Metrics */}
      <div className="grid grid-cols-3 gap-2 text-[10px]">
        <div className="bg-black/30 p-2 rounded-xl border border-white/5">
          <span className="text-slate-400 block">Personal</span>
          <span className="font-bold text-white">{score.breakdown.personal}/20</span>
        </div>
        <div className="bg-black/30 p-2 rounded-xl border border-white/5">
          <span className="text-slate-400 block">Experience</span>
          <span className="font-bold text-white">{score.breakdown.experience}/25</span>
        </div>
        <div className="bg-black/30 p-2 rounded-xl border border-white/5">
          <span className="text-slate-400 block">Skills</span>
          <span className="font-bold text-white">{score.breakdown.skills}/15</span>
        </div>
      </div>

      {/* Action Suggestions */}
      <div className="space-y-2 pt-2 border-t border-white/5">
        <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">AI Recommendations</h4>
        <div className="space-y-1.5 max-h-36 overflow-y-auto">
          {score.suggestions.map((s, idx) => (
            <div
              key={idx}
              className={`p-2.5 rounded-xl text-[11px] leading-relaxed border flex items-start gap-2 ${
                s.type === 'warning'
                  ? 'bg-amber-500/10 border-amber-500/20 text-amber-200'
                  : s.type === 'tip'
                  ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-200'
                  : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-200'
              }`}
            >
              {s.type === 'warning' && <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />}
              {s.type === 'tip' && <Lightbulb className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />}
              {s.type === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />}
              <div className="flex-1">
                <span>{s.message}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick AI Enhance CTA */}
      {onGenerateAISummary && (
        <button
          onClick={onGenerateAISummary}
          className="w-full py-2 px-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-lg transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
          <span>Auto-Enhance Summary with AI</span>
        </button>
      )}
    </div>
  );
};
