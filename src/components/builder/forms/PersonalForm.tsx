import React from 'react';
import { PersonalInfo } from '../../../types/resume';
import { Camera, Sparkles, User, Briefcase, Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

interface PersonalFormProps {
  personal: PersonalInfo;
  onChange: (updated: PersonalInfo) => void;
  onOpenPhotoModal: () => void;
  onGenerateAISummary: () => void;
  isAiLoading: boolean;
}

export const PersonalForm: React.FC<PersonalFormProps> = ({
  personal,
  onChange,
  onOpenPhotoModal,
  onGenerateAISummary,
  isAiLoading
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange({ ...personal, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4">
      {/* Photo & Name Row */}
      <div className="flex gap-4 items-start">
        <div
          onClick={onOpenPhotoModal}
          className="relative w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer overflow-hidden group shrink-0"
        >
          {personal.photoUrl ? (
            <img src={personal.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <User className="w-8 h-8 text-slate-600" />
          )}
          <div className="absolute inset-0 bg-indigo-600/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
            <Camera className="w-5 h-5 mb-0.5" />
            <span className="text-[9px] font-bold">EDIT</span>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <User className="w-3 h-3 text-indigo-400" /> Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={personal.fullName}
              onChange={handleChange}
              placeholder="e.g. Alexander Sterling"
              className="glass-input w-full rounded-xl px-3 py-2 text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Briefcase className="w-3 h-3 text-indigo-400" /> Target Job Title
            </label>
            <input
              type="text"
              name="jobTitle"
              value={personal.jobTitle}
              onChange={handleChange}
              placeholder="e.g. Senior Software Engineer / Lead Designer"
              className="glass-input w-full rounded-xl px-3 py-2 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Grid Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Mail className="w-3 h-3 text-indigo-400" /> Email Address
          </label>
          <input
            type="email"
            name="email"
            value={personal.email}
            onChange={handleChange}
            placeholder="alex@sterling.design"
            className="glass-input w-full rounded-xl px-3 py-2 text-xs"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Phone className="w-3 h-3 text-indigo-400" /> Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={personal.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-9872"
            className="glass-input w-full rounded-xl px-3 py-2 text-xs"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <MapPin className="w-3 h-3 text-indigo-400" /> Location / Address
          </label>
          <input
            type="text"
            name="address"
            value={personal.address}
            onChange={handleChange}
            placeholder="San Francisco, CA"
            className="glass-input w-full rounded-xl px-3 py-2 text-xs"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Linkedin className="w-3 h-3 text-indigo-400" /> LinkedIn Profile
          </label>
          <input
            type="text"
            name="linkedin"
            value={personal.linkedin}
            onChange={handleChange}
            placeholder="linkedin.com/in/alexsterling"
            className="glass-input w-full rounded-xl px-3 py-2 text-xs"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Github className="w-3 h-3 text-indigo-400" /> GitHub URL
          </label>
          <input
            type="text"
            name="github"
            value={personal.github}
            onChange={handleChange}
            placeholder="github.com/alexsterling"
            className="glass-input w-full rounded-xl px-3 py-2 text-xs"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Globe className="w-3 h-3 text-indigo-400" /> Portfolio Website
          </label>
          <input
            type="text"
            name="portfolio"
            value={personal.portfolio}
            onChange={handleChange}
            placeholder="sterling.design"
            className="glass-input w-full rounded-xl px-3 py-2 text-xs"
          />
        </div>
      </div>

      {/* Professional Summary */}
      <div className="space-y-1.5 pt-2">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Professional Summary
          </label>
          <button
            type="button"
            onClick={onGenerateAISummary}
            disabled={isAiLoading}
            className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20"
          >
            <Sparkles className="w-3 h-3" />
            {isAiLoading ? 'AI Enhancing...' : 'Write with AI'}
          </button>
        </div>
        <textarea
          name="summary"
          rows={4}
          value={personal.summary}
          onChange={handleChange}
          placeholder="Briefly describe your core expertise, career achievements, and value proposition..."
          className="glass-input w-full rounded-xl px-3 py-2 text-xs resize-none"
        />
      </div>
    </div>
  );
};
