import React from 'react';
import { CustomizationSettings, FontOption, TemplateId } from '../../../types/resume';
import { Palette, Type, Layout, Eye, EyeOff, Sparkles } from 'lucide-react';

interface CustomizationFormProps {
  customization: CustomizationSettings;
  onChange: (settings: CustomizationSettings) => void;
}

const TEMPLATES: { id: TemplateId; name: string; desc: string }[] = [
  { id: 'minimal', name: 'Minimal', desc: 'Monochrome, clean, typography focused' },
  { id: 'corporate', name: 'Corporate', desc: 'Structured header, classic executive feel' },
  { id: 'creative', name: 'Creative', desc: 'Modern card borders, soft glow badges' },
  { id: 'modern', name: 'Modern', desc: 'Side-by-side accent sidebar layout' },
  { id: 'executive', name: 'Executive', desc: 'Serif/sans pairing, double rules' },
  { id: 'ats', name: 'ATS Friendly', desc: 'Maximum parser compatibility & zero graphics' },
  { id: 'student', name: 'Student', desc: 'Education & academic achievements prioritized' },
  { id: 'developer', name: 'Developer', desc: 'Terminal aesthetic with monospaced code theme' }
];

const FONTS: FontOption[] = ['Poppins', 'Inter', 'Plus Jakarta Sans', 'Playfair Display', 'Fira Code', 'Outfit'];

const COLOR_PRESETS = [
  '#6366f1', // Indigo
  '#2563eb', // Royal Blue
  '#059669', // Emerald
  '#dc2626', // Crimson
  '#0f172a', // Midnight Navy
  '#d946ef', // Fuchsia
  '#d97706', // Amber Gold
  '#4f46e5'  // Violet
];

export const CustomizationForm: React.FC<CustomizationFormProps> = ({
  customization,
  onChange
}) => {
  const handleUpdate = (field: keyof CustomizationSettings, val: any) => {
    onChange({ ...customization, [field]: val });
  };

  return (
    <div className="space-y-6">
      {/* Template Selector */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Layout className="w-3.5 h-3.5 text-indigo-400" /> Choose Resume Template
        </label>
        <div className="grid grid-cols-2 gap-2">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => handleUpdate('templateId', t.id)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                customization.templateId === t.id
                  ? 'bg-indigo-600/20 border-indigo-500 shadow-lg shadow-indigo-500/10'
                  : 'bg-white/5 border-white/5 hover:border-white/20'
              }`}
            >
              <span className="block text-xs font-bold text-white mb-0.5">{t.name}</span>
              <span className="block text-[10px] text-slate-400 leading-tight">{t.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-indigo-400" /> Primary Color Accent
        </label>
        <div className="flex flex-wrap items-center gap-2">
          {COLOR_PRESETS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => handleUpdate('primaryColor', color)}
              className={`w-7 h-7 rounded-xl transition-transform ${
                customization.primaryColor === color ? 'scale-110 ring-2 ring-white ring-offset-2 ring-offset-black' : 'hover:scale-105 opacity-80'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
          <input
            type="color"
            value={customization.primaryColor}
            onChange={(e) => handleUpdate('primaryColor', e.target.value)}
            className="w-7 h-7 rounded-xl bg-transparent cursor-pointer border border-white/20"
          />
        </div>
      </div>

      {/* Typography */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5 text-indigo-400" /> Typography Family
        </label>
        <div className="grid grid-cols-3 gap-2">
          {FONTS.map((font) => (
            <button
              key={font}
              type="button"
              onClick={() => handleUpdate('fontFamily', font)}
              className={`py-2 px-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                customization.fontFamily === font
                  ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                  : 'bg-white/5 border-white/5 text-slate-300 hover:border-white/20'
              }`}
              style={{
                fontFamily: font === 'Playfair Display' ? 'serif' : font === 'Fira Code' ? 'monospace' : 'sans-serif'
              }}
            >
              {font}
            </button>
          ))}
        </div>
      </div>

      {/* Show/Hide Icons */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
        <span className="text-xs font-semibold text-slate-200">Display Section Icons</span>
        <button
          type="button"
          onClick={() => handleUpdate('showIcons', !customization.showIcons)}
          className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
            customization.showIcons ? 'bg-indigo-600 text-white' : 'bg-white/10 text-slate-400'
          }`}
        >
          {customization.showIcons ? 'Icons Enabled' : 'Icons Hidden'}
        </button>
      </div>
    </div>
  );
};
