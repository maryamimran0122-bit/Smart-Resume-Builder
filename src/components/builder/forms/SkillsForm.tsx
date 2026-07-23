import React, { useState } from 'react';
import { Skill } from '../../../types/resume';
import { Plus, Trash2, Sparkles, Code2 } from 'lucide-react';
import { generateAIEnhancement } from '../../../services/aiService';

interface SkillsFormProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
  jobTitle?: string;
  onToast: (msg: string) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({
  skills,
  onChange,
  jobTitle,
  onToast
}) => {
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<'technical' | 'soft' | 'language'>('technical');
  const [newSkillLevel, setNewSkillLevel] = useState('Expert');
  const [aiLoading, setAiLoading] = useState(false);

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    const newSkill: Skill = {
      id: `sk-${Date.now()}`,
      name: newSkillName.trim(),
      category: newSkillCategory,
      level: newSkillLevel
    };
    onChange([...skills, newSkill]);
    setNewSkillName('');
  };

  const handleRemove = (id: string) => {
    onChange(skills.filter(s => s.id !== id));
  };

  const handleSuggestAISkills = async () => {
    setAiLoading(true);
    try {
      const suggested = await generateAIEnhancement({
        action: 'skills',
        text: jobTitle || 'Software Engineer & Designer',
        jobTitle
      });
      const skillNames = suggested.split(',').map(s => s.trim()).filter(Boolean);
      const newSkillList = [...skills];
      skillNames.forEach(name => {
        if (!newSkillList.some(existing => existing.name.toLowerCase() === name.toLowerCase())) {
          newSkillList.push({
            id: `sk-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            name,
            category: 'technical',
            level: 'Advanced'
          });
        }
      });
      onChange(newSkillList);
      onToast(`Added AI suggested skills for ${jobTitle || 'your role'}!`);
    } catch (err) {
      onToast('Failed to suggest skills');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Skills & Proficiencies ({skills.length})
        </span>
        <button
          type="button"
          onClick={handleSuggestAISkills}
          disabled={aiLoading}
          className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 bg-indigo-500/10 px-2.5 py-1 rounded-xl border border-indigo-500/20"
        >
          <Sparkles className="w-3.5 h-3.5" />
          {aiLoading ? 'Suggesting...' : 'AI Skill Suggestions'}
        </button>
      </div>

      {/* Input box */}
      <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <input
            type="text"
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
            placeholder="Add skill (e.g. React 19, Figma, System Design)..."
            className="glass-input sm:col-span-1 rounded-xl px-3 py-1.5 text-xs"
          />
          <select
            value={newSkillCategory}
            onChange={(e) => setNewSkillCategory(e.target.value as any)}
            className="glass-input rounded-xl px-2 py-1.5 text-xs text-white bg-black"
          >
            <option value="technical">Technical Skill</option>
            <option value="soft">Soft Skill / Leadership</option>
            <option value="language">Language</option>
          </select>
          <select
            value={newSkillLevel}
            onChange={(e) => setNewSkillLevel(e.target.value)}
            className="glass-input rounded-xl px-2 py-1.5 text-xs text-white bg-black"
          >
            <option value="Expert">Expert</option>
            <option value="Advanced">Advanced</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Beginner">Beginner</option>
            <option value="Native">Native Language</option>
          </select>
        </div>
        <button
          type="button"
          onClick={handleAddSkill}
          className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md"
        >
          <Plus className="w-3.5 h-3.5" /> Add Skill
        </button>
      </div>

      {/* Skills Pill Tags */}
      <div className="flex flex-wrap gap-2 pt-2">
        {skills.map(s => (
          <div
            key={s.id}
            className="group flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-slate-200 hover:border-indigo-500/50 transition-colors"
          >
            <span>{s.name}</span>
            <span className="text-[9px] text-indigo-400 font-bold bg-indigo-500/10 px-1.5 rounded">{s.level}</span>
            <button
              type="button"
              onClick={() => handleRemove(s.id)}
              className="p-0.5 text-slate-500 hover:text-rose-400 rounded transition-colors ml-0.5"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
