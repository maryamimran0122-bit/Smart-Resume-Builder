import React from 'react';
import { Experience } from '../../../types/resume';
import { Plus, Trash2, Sparkles, Briefcase, Calendar, MapPin } from 'lucide-react';
import { generateAIEnhancement } from '../../../services/aiService';

interface ExperienceFormProps {
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
  jobTitle?: string;
  onToast: (msg: string) => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({
  experiences,
  onChange,
  jobTitle,
  onToast
}) => {
  const [aiLoadingId, setAiLoadingId] = React.useState<string | null>(null);

  const handleAdd = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    onChange([...experiences, newExp]);
  };

  const handleRemove = (id: string) => {
    onChange(experiences.filter(e => e.id !== id));
  };

  const handleItemChange = (id: string, field: keyof Experience, value: any) => {
    onChange(experiences.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const handleAiEnhanceBullets = async (id: string, text: string) => {
    if (!text.trim()) {
      onToast('Please enter a brief description first for AI bullet generation');
      return;
    }
    setAiLoadingId(id);
    try {
      const result = await generateAIEnhancement({
        action: 'bullet',
        text,
        jobTitle
      });
      handleItemChange(id, 'description', result);
      onToast('Experience bullets enhanced with AI!');
    } catch (err) {
      onToast('Failed to generate AI bullets');
    } finally {
      setAiLoadingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Work History ({experiences.length})
        </span>
        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Experience
        </button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp, idx) => (
          <div key={exp.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 relative group">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" /> Position #{idx + 1}
              </span>
              <button
                type="button"
                onClick={() => handleRemove(exp.id)}
                className="p-1 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded-lg transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Job Title</label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => handleItemChange(exp.id, 'position', e.target.value)}
                  placeholder="e.g. Lead UI Designer"
                  className="glass-input w-full rounded-xl px-3 py-1.5 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Company / Organization</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleItemChange(exp.id, 'company', e.target.value)}
                  placeholder="e.g. Meta Flow Systems"
                  className="glass-input w-full rounded-xl px-3 py-1.5 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Location</label>
                <input
                  type="text"
                  value={exp.location || ''}
                  onChange={(e) => handleItemChange(exp.id, 'location', e.target.value)}
                  placeholder="e.g. San Francisco, CA / Remote"
                  className="glass-input w-full rounded-xl px-3 py-1.5 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Start Date</label>
                  <input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) => handleItemChange(exp.id, 'startDate', e.target.value)}
                    placeholder="e.g. 2021 / Jan 2021"
                    className="glass-input w-full rounded-xl px-3 py-1.5 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">End Date</label>
                  <input
                    type="text"
                    disabled={exp.current}
                    value={exp.current ? 'Present' : exp.endDate}
                    onChange={(e) => handleItemChange(exp.id, 'endDate', e.target.value)}
                    placeholder="e.g. Present / 2024"
                    className="glass-input w-full rounded-xl px-3 py-1.5 text-xs disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`curr-${exp.id}`}
                checked={exp.current}
                onChange={(e) => handleItemChange(exp.id, 'current', e.target.checked)}
                className="rounded accent-indigo-500"
              />
              <label htmlFor={`curr-${exp.id}`} className="text-xs text-slate-300 cursor-pointer">I currently work here</label>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Key Responsibilities & Impact</label>
                <button
                  type="button"
                  onClick={() => handleAiEnhanceBullets(exp.id, exp.description)}
                  disabled={aiLoadingId === exp.id}
                  className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20"
                >
                  <Sparkles className="w-3 h-3" />
                  {aiLoadingId === exp.id ? 'Refining...' : 'AI Bullets'}
                </button>
              </div>
              <textarea
                rows={3}
                value={exp.description}
                onChange={(e) => handleItemChange(exp.id, 'description', e.target.value)}
                placeholder="• Spearheaded design system adoption across 5 product teams...&#10;• Reduced page render latency by 35% through code optimizations..."
                className="glass-input w-full rounded-xl px-3 py-2 text-xs"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
