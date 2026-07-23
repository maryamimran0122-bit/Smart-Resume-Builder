import React from 'react';
import { Education } from '../../../types/resume';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

interface EducationFormProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({ education, onChange }) => {
  const handleAdd = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      gpa: '',
      location: '',
      description: ''
    };
    onChange([...education, newEdu]);
  };

  const handleRemove = (id: string) => {
    onChange(education.filter(e => e.id !== id));
  };

  const handleItemChange = (id: string, field: keyof Education, value: any) => {
    onChange(education.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Education & Qualifications ({education.length})
        </span>
        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Education
        </button>
      </div>

      <div className="space-y-4">
        {education.map((edu, idx) => (
          <div key={edu.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 relative">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" /> Entry #{idx + 1}
              </span>
              <button
                type="button"
                onClick={() => handleRemove(edu.id)}
                className="p-1 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded-lg transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Degree / Certification</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleItemChange(edu.id, 'degree', e.target.value)}
                  placeholder="e.g. Bachelor of Science in Computer Science"
                  className="glass-input w-full rounded-xl px-3 py-1.5 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">University / School</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => handleItemChange(edu.id, 'institution', e.target.value)}
                  placeholder="e.g. Stanford University"
                  className="glass-input w-full rounded-xl px-3 py-1.5 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Location</label>
                <input
                  type="text"
                  value={edu.location || ''}
                  onChange={(e) => handleItemChange(edu.id, 'location', e.target.value)}
                  placeholder="e.g. Stanford, CA"
                  className="glass-input w-full rounded-xl px-3 py-1.5 text-xs"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Start Year</label>
                  <input
                    type="text"
                    value={edu.startDate}
                    onChange={(e) => handleItemChange(edu.id, 'startDate', e.target.value)}
                    placeholder="2018"
                    className="glass-input w-full rounded-xl px-2 py-1.5 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">End Year</label>
                  <input
                    type="text"
                    value={edu.endDate}
                    onChange={(e) => handleItemChange(edu.id, 'endDate', e.target.value)}
                    placeholder="2022"
                    className="glass-input w-full rounded-xl px-2 py-1.5 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">GPA</label>
                  <input
                    type="text"
                    value={edu.gpa || ''}
                    onChange={(e) => handleItemChange(edu.id, 'gpa', e.target.value)}
                    placeholder="3.8 / 4.0"
                    className="glass-input w-full rounded-xl px-2 py-1.5 text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
