import React from 'react';
import { Project, Certification, Award, Volunteer, Reference } from '../../../types/resume';
import { Plus, Trash2, FolderKanban, Award as AwardIcon, Heart, UserCheck, CheckCircle2 } from 'lucide-react';

interface ProjectsFormProps {
  projects: Project[];
  certifications: Certification[];
  awards: Award[];
  volunteer: Volunteer[];
  references: Reference[];
  onUpdateProjects: (proj: Project[]) => void;
  onUpdateCertifications: (certs: Certification[]) => void;
  onUpdateAwards: (awards: Award[]) => void;
  onUpdateVolunteer: (vol: Volunteer[]) => void;
  onUpdateReferences: (refs: Reference[]) => void;
}

export const ProjectsForm: React.FC<ProjectsFormProps> = ({
  projects,
  certifications,
  awards,
  volunteer,
  references,
  onUpdateProjects,
  onUpdateCertifications,
  onUpdateAwards,
  onUpdateVolunteer,
  onUpdateReferences
}) => {
  const [activeSubTab, setActiveSubTab] = React.useState<'projects' | 'certs' | 'awards' | 'volunteer' | 'refs'>('projects');

  // Projects handlers
  const handleAddProject = () => {
    onUpdateProjects([...projects, {
      id: `proj-${Date.now()}`,
      title: '',
      subtitle: '',
      link: '',
      description: '',
      technologies: ''
    }]);
  };

  const handleAddCert = () => {
    onUpdateCertifications([...certifications, {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      date: '',
      link: ''
    }]);
  };

  const handleAddAward = () => {
    onUpdateAwards([...awards, {
      id: `award-${Date.now()}`,
      name: '',
      issuer: '',
      date: '',
      description: ''
    }]);
  };

  const handleAddVol = () => {
    onUpdateVolunteer([...volunteer, {
      id: `vol-${Date.now()}`,
      organization: '',
      role: '',
      startDate: '',
      endDate: '',
      description: ''
    }]);
  };

  const handleAddRef = () => {
    onUpdateReferences([...references, {
      id: `ref-${Date.now()}`,
      name: '',
      position: '',
      company: '',
      email: '',
      phone: ''
    }]);
  };

  return (
    <div className="space-y-4">
      {/* Sub Tabs */}
      <div className="flex flex-wrap gap-1 p-1 bg-black/40 border border-white/10 rounded-2xl text-xs">
        <button
          type="button"
          onClick={() => setActiveSubTab('projects')}
          className={`flex-1 py-1.5 px-3 rounded-xl font-semibold transition-all ${activeSubTab === 'projects' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
        >
          Projects ({projects.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('certs')}
          className={`flex-1 py-1.5 px-3 rounded-xl font-semibold transition-all ${activeSubTab === 'certs' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
        >
          Certs ({certifications.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('awards')}
          className={`flex-1 py-1.5 px-3 rounded-xl font-semibold transition-all ${activeSubTab === 'awards' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
        >
          Awards ({awards.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('volunteer')}
          className={`flex-1 py-1.5 px-3 rounded-xl font-semibold transition-all ${activeSubTab === 'volunteer' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
        >
          Volunteer ({volunteer.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('refs')}
          className={`flex-1 py-1.5 px-3 rounded-xl font-semibold transition-all ${activeSubTab === 'refs' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
        >
          References ({references.length})
        </button>
      </div>

      {/* Projects */}
      {activeSubTab === 'projects' && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Key Projects</span>
            <button type="button" onClick={handleAddProject} className="px-3 py-1 bg-indigo-600/20 text-indigo-300 rounded-xl text-xs font-semibold flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Add Project
            </button>
          </div>
          {projects.map((proj) => (
            <div key={proj.id} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  value={proj.title}
                  onChange={(e) => onUpdateProjects(projects.map(p => p.id === proj.id ? { ...p, title: e.target.value } : p))}
                  placeholder="Project Title (e.g. Aura AI Design System)"
                  className="glass-input flex-1 rounded-xl px-3 py-1 text-xs font-bold"
                />
                <button type="button" onClick={() => onUpdateProjects(projects.filter(p => p.id !== proj.id))} className="p-1 hover:text-rose-400 ml-2">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={proj.link || ''}
                  onChange={(e) => onUpdateProjects(projects.map(p => p.id === proj.id ? { ...p, link: e.target.value } : p))}
                  placeholder="Live URL / GitHub Link"
                  className="glass-input rounded-xl px-3 py-1 text-xs"
                />
                <input
                  type="text"
                  value={proj.technologies}
                  onChange={(e) => onUpdateProjects(projects.map(p => p.id === proj.id ? { ...p, technologies: e.target.value } : p))}
                  placeholder="Tech Stack (React, TypeScript, Node)"
                  className="glass-input rounded-xl px-3 py-1 text-xs"
                />
              </div>
              <textarea
                rows={2}
                value={proj.description}
                onChange={(e) => onUpdateProjects(projects.map(p => p.id === proj.id ? { ...p, description: e.target.value } : p))}
                placeholder="Key features and results achieved..."
                className="glass-input w-full rounded-xl px-3 py-1.5 text-xs"
              />
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {activeSubTab === 'certs' && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Certifications</span>
            <button type="button" onClick={handleAddCert} className="px-3 py-1 bg-indigo-600/20 text-indigo-300 rounded-xl text-xs font-semibold flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Add Certification
            </button>
          </div>
          {certifications.map((cert) => (
            <div key={cert.id} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => onUpdateCertifications(certifications.map(c => c.id === cert.id ? { ...c, name: e.target.value } : c))}
                  placeholder="Certification Name (e.g. AWS Solutions Architect)"
                  className="glass-input flex-1 rounded-xl px-3 py-1 text-xs font-bold"
                />
                <button type="button" onClick={() => onUpdateCertifications(certifications.filter(c => c.id !== cert.id))} className="p-1 hover:text-rose-400 ml-2">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => onUpdateCertifications(certifications.map(c => c.id === cert.id ? { ...c, issuer: e.target.value } : c))}
                  placeholder="Issuing Authority (Google / AWS)"
                  className="glass-input rounded-xl px-3 py-1 text-xs"
                />
                <input
                  type="text"
                  value={cert.date}
                  onChange={(e) => onUpdateCertifications(certifications.map(c => c.id === cert.id ? { ...c, date: e.target.value } : c))}
                  placeholder="Year / Date"
                  className="glass-input rounded-xl px-3 py-1 text-xs"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Awards */}
      {activeSubTab === 'awards' && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Honors & Awards</span>
            <button type="button" onClick={handleAddAward} className="px-3 py-1 bg-indigo-600/20 text-indigo-300 rounded-xl text-xs font-semibold flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Add Award
            </button>
          </div>
          {awards.map((a) => (
            <div key={a.id} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  value={a.name}
                  onChange={(e) => onUpdateAwards(awards.map(item => item.id === a.id ? { ...item, name: e.target.value } : item))}
                  placeholder="Award Name (e.g. Best Interface Design 2024)"
                  className="glass-input flex-1 rounded-xl px-3 py-1 text-xs font-bold"
                />
                <button type="button" onClick={() => onUpdateAwards(awards.filter(item => item.id !== a.id))} className="p-1 hover:text-rose-400 ml-2">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={a.issuer}
                  onChange={(e) => onUpdateAwards(awards.map(item => item.id === a.id ? { ...item, issuer: e.target.value } : item))}
                  placeholder="Award Issuer"
                  className="glass-input rounded-xl px-3 py-1 text-xs"
                />
                <input
                  type="text"
                  value={a.date}
                  onChange={(e) => onUpdateAwards(awards.map(item => item.id === a.id ? { ...item, date: e.target.value } : item))}
                  placeholder="Year"
                  className="glass-input rounded-xl px-3 py-1 text-xs"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Volunteer */}
      {activeSubTab === 'volunteer' && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Volunteer Work</span>
            <button type="button" onClick={handleAddVol} className="px-3 py-1 bg-indigo-600/20 text-indigo-300 rounded-xl text-xs font-semibold flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Add Volunteer
            </button>
          </div>
          {volunteer.map((v) => (
            <div key={v.id} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  value={v.role}
                  onChange={(e) => onUpdateVolunteer(volunteer.map(item => item.id === v.id ? { ...item, role: e.target.value } : item))}
                  placeholder="Role (e.g. UX Educator)"
                  className="glass-input flex-1 rounded-xl px-3 py-1 text-xs font-bold"
                />
                <button type="button" onClick={() => onUpdateVolunteer(volunteer.filter(item => item.id !== v.id))} className="p-1 hover:text-rose-400 ml-2">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <input
                type="text"
                value={v.organization}
                onChange={(e) => onUpdateVolunteer(volunteer.map(item => item.id === v.id ? { ...item, organization: e.target.value } : item))}
                placeholder="Organization (e.g. Code for America)"
                className="glass-input w-full rounded-xl px-3 py-1 text-xs"
              />
            </div>
          ))}
        </div>
      )}

      {/* References */}
      {activeSubTab === 'refs' && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Professional References</span>
            <button type="button" onClick={handleAddRef} className="px-3 py-1 bg-indigo-600/20 text-indigo-300 rounded-xl text-xs font-semibold flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Add Reference
            </button>
          </div>
          {references.map((r) => (
            <div key={r.id} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  value={r.name}
                  onChange={(e) => onUpdateReferences(references.map(item => item.id === r.id ? { ...item, name: e.target.value } : item))}
                  placeholder="Reference Name (e.g. Sarah Jenkins)"
                  className="glass-input flex-1 rounded-xl px-3 py-1 text-xs font-bold"
                />
                <button type="button" onClick={() => onUpdateReferences(references.filter(item => item.id !== r.id))} className="p-1 hover:text-rose-400 ml-2">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={r.position}
                  onChange={(e) => onUpdateReferences(references.map(item => item.id === r.id ? { ...item, position: e.target.value } : item))}
                  placeholder="Job Title / Position"
                  className="glass-input rounded-xl px-3 py-1 text-xs"
                />
                <input
                  type="text"
                  value={r.company}
                  onChange={(e) => onUpdateReferences(references.map(item => item.id === r.id ? { ...item, company: e.target.value } : item))}
                  placeholder="Company"
                  className="glass-input rounded-xl px-3 py-1 text-xs"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
