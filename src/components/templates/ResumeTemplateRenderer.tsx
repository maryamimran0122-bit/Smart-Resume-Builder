import React from 'react';
import { ResumeData, Skill } from '../../types/resume';
import { 
  Mail, Phone, MapPin, Linkedin, Github, Globe, 
  Briefcase, GraduationCap, Award as AwardIcon, CheckCircle2,
  Code2, Heart, UserCheck, Sparkles, Terminal
} from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  scale?: number;
}

export const ResumeTemplateRenderer: React.FC<TemplateProps> = ({ data }) => {
  const { customization, personal, experience, education, skills, projects, certifications, awards, volunteer, references, customSections } = data;
  const { templateId, primaryColor, fontFamily, photoShape, showIcons } = customization;

  // Custom styling dynamically injected based on user colors and fonts
  const fontStyle = {
    fontFamily: fontFamily === 'Playfair Display' ? `'Playfair Display', serif` :
               fontFamily === 'Fira Code' ? `'Fira Code', monospace` :
               fontFamily === 'Inter' ? `'Inter', sans-serif` :
               fontFamily === 'Plus Jakarta Sans' ? `'Plus Jakarta Sans', sans-serif` :
               fontFamily === 'Outfit' ? `'Outfit', sans-serif` : `'Poppins', sans-serif`
  };

  const getPhotoShapeClass = () => {
    if (photoShape === 'circular') return 'rounded-full';
    if (photoShape === 'square') return 'rounded-none';
    return 'rounded-xl';
  };

  // Group skills by category
  const technicalSkills = skills.filter(s => s.category === 'technical' || !s.category);
  const softSkills = skills.filter(s => s.category === 'soft');
  const languages = skills.filter(s => s.category === 'language');

  // Helper renderers for contact links
  const renderContactInfo = (layout: 'row' | 'column' | 'wrap' = 'row', className = '') => (
    <div className={`flex ${layout === 'column' ? 'flex-col gap-1.5' : 'flex-wrap gap-x-4 gap-y-1'} text-xs text-slate-600 ${className}`}>
      {personal.email && (
        <span className="flex items-center gap-1">
          {showIcons && <Mail className="w-3 h-3 text-slate-400" />}
          <a href={`mailto:${personal.email}`} className="hover:underline">{personal.email}</a>
        </span>
      )}
      {personal.phone && (
        <span className="flex items-center gap-1">
          {showIcons && <Phone className="w-3 h-3 text-slate-400" />}
          <span>{personal.phone}</span>
        </span>
      )}
      {personal.address && (
        <span className="flex items-center gap-1">
          {showIcons && <MapPin className="w-3 h-3 text-slate-400" />}
          <span>{personal.address}</span>
        </span>
      )}
      {personal.linkedin && (
        <span className="flex items-center gap-1">
          {showIcons && <Linkedin className="w-3 h-3 text-slate-400" />}
          <a href={`https://${personal.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="hover:underline">{personal.linkedin}</a>
        </span>
      )}
      {personal.github && (
        <span className="flex items-center gap-1">
          {showIcons && <Github className="w-3 h-3 text-slate-400" />}
          <a href={`https://${personal.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="hover:underline">{personal.github}</a>
        </span>
      )}
      {personal.portfolio && (
        <span className="flex items-center gap-1">
          {showIcons && <Globe className="w-3 h-3 text-slate-400" />}
          <a href={`https://${personal.portfolio.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="hover:underline">{personal.portfolio}</a>
        </span>
      )}
    </div>
  );

  // -------------------------------------------------------------
  // TEMPLATE 1: MINIMAL
  // -------------------------------------------------------------
  if (templateId === 'minimal') {
    return (
      <div style={fontStyle} className="w-full bg-white text-slate-900 p-8 sm:p-10 shadow-xl resume-paper">
        {/* Header */}
        <div className="border-b-2 border-slate-900 pb-5 mb-6 flex justify-between items-start">
          <div className="flex-1 pr-4">
            <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900 mb-1">{personal.fullName}</h1>
            <p className="font-semibold text-sm tracking-wider uppercase" style={{ color: primaryColor }}>{personal.jobTitle}</p>
            {personal.summary && <p className="text-xs text-slate-600 mt-3 leading-relaxed max-w-2xl">{personal.summary}</p>}
          </div>
          {personal.photoUrl && photoShape !== 'none' && (
            <img src={personal.photoUrl} alt={personal.fullName} className={`w-20 h-20 object-cover border-2 border-slate-200 ${getPhotoShapeClass()}`} />
          )}
        </div>

        {renderContactInfo('wrap', 'mb-6 pb-3 border-b border-slate-200')}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-black uppercase tracking-widest mb-3 flex items-center gap-2 border-b border-slate-200 pb-1">
              <span className="w-3 h-0.5" style={{ backgroundColor: primaryColor }}></span>
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-xs font-bold text-slate-900">{exp.position} <span className="font-medium text-slate-500">· {exp.company}</span></h3>
                    <span className="text-[10px] text-slate-400 italic">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education & Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {education.length > 0 && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-widest mb-3 border-b border-slate-200 pb-1">Education</h2>
              <div className="space-y-3">
                {education.map(edu => (
                  <div key={edu.id}>
                    <h3 className="text-xs font-bold text-slate-900">{edu.degree}</h3>
                    <p className="text-[11px] text-slate-600">{edu.institution} {edu.location ? `· ${edu.location}` : ''}</p>
                    <p className="text-[10px] text-slate-400">{edu.startDate} — {edu.endDate} {edu.gpa ? `· GPA: ${edu.gpa}` : ''}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-widest mb-3 border-b border-slate-200 pb-1">Skills & Tools</h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map(s => (
                  <span key={s.id} className="px-2 py-0.5 bg-slate-100 text-slate-800 text-[10px] font-semibold rounded-md border border-slate-200">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-black uppercase tracking-widest mb-3 border-b border-slate-200 pb-1">Key Projects</h2>
            <div className="space-y-3">
              {projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs font-bold text-slate-900">{proj.title} <span className="text-[10px] font-normal text-slate-500">{proj.subtitle}</span></h3>
                    {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="text-[10px] text-indigo-600 underline">{proj.link}</a>}
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{proj.description}</p>
                  {proj.technologies && <p className="text-[10px] text-slate-400 mt-0.5">Tech: {proj.technologies}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // TEMPLATE 2: CORPORATE
  // -------------------------------------------------------------
  if (templateId === 'corporate') {
    return (
      <div style={fontStyle} className="w-full bg-white text-slate-800 shadow-2xl resume-paper overflow-hidden">
        {/* Banner */}
        <div className="px-8 py-6 text-white flex justify-between items-center" style={{ backgroundColor: primaryColor }}>
          <div>
            <h1 className="text-2xl font-extrabold uppercase tracking-tight">{personal.fullName}</h1>
            <p className="text-xs font-medium uppercase tracking-widest opacity-90 mt-0.5">{personal.jobTitle}</p>
          </div>
          {personal.photoUrl && photoShape !== 'none' && (
            <img src={personal.photoUrl} alt={personal.fullName} className={`w-16 h-16 object-cover border-2 border-white/50 ${getPhotoShapeClass()}`} />
          )}
        </div>

        {/* Contact Strip */}
        <div className="bg-slate-100 px-8 py-2.5 border-b border-slate-200">
          {renderContactInfo('wrap', 'text-slate-700 text-[11px]')}
        </div>

        <div className="p-8 space-y-6">
          {personal.summary && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 pb-1 mb-2" style={{ borderColor: primaryColor }}>
                Professional Overview
              </h2>
              <p className="text-xs leading-relaxed text-slate-600">{personal.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 pb-1 mb-3" style={{ borderColor: primaryColor }}>
                Work Experience
              </h2>
              <div className="space-y-4">
                {experience.map(exp => (
                  <div key={exp.id} className="relative pl-4 border-l-2 border-slate-200">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-xs font-bold text-slate-900">{exp.position} — <span className="text-slate-600 font-semibold">{exp.company}</span></h3>
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-6">
            {education.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 pb-1 mb-2" style={{ borderColor: primaryColor }}>
                  Education
                </h2>
                <div className="space-y-3">
                  {education.map(edu => (
                    <div key={edu.id}>
                      <h3 className="text-xs font-bold text-slate-800">{edu.degree}</h3>
                      <p className="text-[11px] text-slate-600">{edu.institution}</p>
                      <p className="text-[10px] text-slate-400">{edu.startDate} – {edu.endDate} {edu.gpa ? `(GPA: ${edu.gpa})` : ''}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {skills.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 pb-1 mb-2" style={{ borderColor: primaryColor }}>
                  Skills & Expertise
                </h2>
                <div className="flex flex-wrap gap-1">
                  {skills.map(s => (
                    <span key={s.id} className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-800 rounded border border-slate-200">
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // TEMPLATE 3: CREATIVE
  // -------------------------------------------------------------
  if (templateId === 'creative') {
    return (
      <div style={fontStyle} className="w-full bg-white text-slate-900 p-8 shadow-2xl resume-paper">
        {/* Header card with gradient border */}
        <div className="relative p-6 rounded-2xl bg-slate-900 text-white mb-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-30" style={{ backgroundColor: primaryColor }} />
          <div className="flex items-center gap-5 relative z-10">
            {personal.photoUrl && photoShape !== 'none' && (
              <img src={personal.photoUrl} alt={personal.fullName} className={`w-20 h-20 object-cover border-2 border-white/20 shadow-lg ${getPhotoShapeClass()}`} />
            )}
            <div className="flex-1">
              <h1 className="text-3xl font-black tracking-tight">{personal.fullName}</h1>
              <p className="text-xs font-bold tracking-widest uppercase text-indigo-400 mt-1">{personal.jobTitle}</p>
              {renderContactInfo('wrap', 'text-slate-300 text-[10px] mt-3')}
            </div>
          </div>
        </div>

        {personal.summary && (
          <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <p className="text-xs text-slate-700 leading-relaxed italic">"{personal.summary}"</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="md:col-span-2 space-y-6">
            {experience.length > 0 && (
              <div>
                <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: primaryColor }} />
                  Experience
                </h2>
                <div className="space-y-4">
                  {experience.map(exp => (
                    <div key={exp.id} className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="text-xs font-bold text-slate-900">{exp.position}</h3>
                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{exp.startDate} - {exp.current ? 'Now' : exp.endDate}</span>
                      </div>
                      <p className="text-[11px] font-semibold text-slate-500 mb-2">{exp.company}</p>
                      <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projects.length > 0 && (
              <div>
                <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: primaryColor }} />
                  Featured Works
                </h2>
                <div className="space-y-3">
                  {projects.map(proj => (
                    <div key={proj.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-xs font-bold text-slate-900">{proj.title}</h3>
                        {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="text-[10px] text-indigo-600 hover:underline">Link ↗</a>}
                      </div>
                      <p className="text-[11px] text-slate-600">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {skills.length > 0 && (
              <div>
                <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 mb-3">Skills</h2>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map(s => (
                    <span key={s.id} className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white shadow-sm" style={{ backgroundColor: primaryColor }}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {education.length > 0 && (
              <div>
                <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 mb-3">Education</h2>
                <div className="space-y-3">
                  {education.map(edu => (
                    <div key={edu.id} className="text-xs">
                      <p className="font-bold text-slate-900">{edu.degree}</p>
                      <p className="text-[11px] text-slate-600">{edu.institution}</p>
                      <p className="text-[10px] text-slate-400">{edu.startDate} – {edu.endDate}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // TEMPLATE 4: MODERN (Side-by-side Layout)
  // -------------------------------------------------------------
  if (templateId === 'modern') {
    return (
      <div style={fontStyle} className="w-full bg-white text-slate-800 shadow-2xl resume-paper flex flex-col md:flex-row min-h-[750px]">
        {/* Left Sidebar */}
        <div className="w-full md:w-1/3 text-white p-6 space-y-6" style={{ backgroundColor: primaryColor }}>
          {personal.photoUrl && photoShape !== 'none' && (
            <div className="flex justify-center mb-4">
              <img src={personal.photoUrl} alt={personal.fullName} className={`w-24 h-24 object-cover border-2 border-white/40 shadow-md ${getPhotoShapeClass()}`} />
            </div>
          )}

          <div>
            <h1 className="text-2xl font-black tracking-tight leading-tight">{personal.fullName}</h1>
            <p className="text-xs uppercase font-semibold tracking-widest opacity-80 mt-1">{personal.jobTitle}</p>
          </div>

          <div className="pt-3 border-t border-white/20">
            <h2 className="text-[10px] font-bold uppercase tracking-widest opacity-75 mb-2">Contact</h2>
            {renderContactInfo('column', 'text-white text-[10px] opacity-90')}
          </div>

          {skills.length > 0 && (
            <div className="pt-3 border-t border-white/20">
              <h2 className="text-[10px] font-bold uppercase tracking-widest opacity-75 mb-3">Skills</h2>
              <div className="space-y-2">
                {skills.map(s => (
                  <div key={s.id} className="text-[10px]">
                    <div className="flex justify-between font-semibold mb-0.5">
                      <span>{s.name}</span>
                      <span className="opacity-75">{s.level}</span>
                    </div>
                    <div className="w-full bg-black/20 h-1 rounded-full overflow-hidden">
                      <div className="bg-white h-full rounded-full" style={{ width: s.level === 'Expert' ? '95%' : s.level === 'Advanced' ? '80%' : '65%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="pt-3 border-t border-white/20">
              <h2 className="text-[10px] font-bold uppercase tracking-widest opacity-75 mb-3">Education</h2>
              <div className="space-y-3">
                {education.map(edu => (
                  <div key={edu.id} className="text-[11px]">
                    <p className="font-bold">{edu.degree}</p>
                    <p className="opacity-80 text-[10px]">{edu.institution}</p>
                    <p className="opacity-60 text-[9px]">{edu.startDate} – {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="flex-1 p-6 space-y-6">
          {personal.summary && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-2 pb-1 border-b border-slate-200">About Me</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{personal.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-3 pb-1 border-b border-slate-200">Experience</h2>
              <div className="space-y-4">
                {experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className="text-xs font-bold text-slate-900">{exp.position}</h3>
                      <span className="text-[10px] text-slate-400 font-medium">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <p className="text-[11px] font-semibold text-slate-500 mb-1">{exp.company}</p>
                    <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {projects.length > 0 && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-3 pb-1 border-b border-slate-200">Projects</h2>
              <div className="space-y-3">
                {projects.map(proj => (
                  <div key={proj.id}>
                    <h3 className="text-xs font-bold text-slate-900">{proj.title}</h3>
                    <p className="text-xs text-slate-600 mt-0.5">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // TEMPLATE 5: EXECUTIVE
  // -------------------------------------------------------------
  if (templateId === 'executive') {
    return (
      <div style={fontStyle} className="w-full bg-white text-slate-900 p-8 sm:p-10 shadow-2xl resume-paper">
        {/* Centered Executive Header */}
        <div className="text-center border-b-2 border-double border-slate-900 pb-6 mb-6">
          <h1 className="text-3xl font-black uppercase tracking-widest text-slate-900">{personal.fullName}</h1>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-600 mt-1" style={{ color: primaryColor }}>{personal.jobTitle}</p>
          <div className="mt-3 flex justify-center">
            {renderContactInfo('wrap', 'justify-center text-slate-600 text-xs')}
          </div>
        </div>

        {personal.summary && (
          <div className="mb-6">
            <h2 className="text-center text-xs font-black uppercase tracking-widest text-slate-900 mb-2">Executive Summary</h2>
            <p className="text-xs leading-relaxed text-slate-700 text-center max-w-3xl mx-auto italic">{personal.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-4">Leadership & Career Achievements</h2>
            <div className="space-y-5">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-xs font-bold text-slate-900">{exp.position} <span className="font-normal text-slate-600">| {exp.company}</span></h3>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">{exp.startDate} – {exp.current ? 'PRESENT' : exp.endDate}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-8">
          {education.length > 0 && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-3">Education</h2>
              {education.map(edu => (
                <div key={edu.id} className="mb-2">
                  <p className="text-xs font-bold text-slate-900">{edu.degree}</p>
                  <p className="text-[11px] text-slate-600">{edu.institution}, {edu.startDate} – {edu.endDate}</p>
                </div>
              ))}
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-3">Core Competencies</h2>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-800">
                {skills.map(s => (
                  <span key={s.id} className="font-medium">
                    • {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // TEMPLATE 6: ATS FRIENDLY
  // -------------------------------------------------------------
  if (templateId === 'ats') {
    return (
      <div style={{ fontFamily: `'Inter', sans-serif` }} className="w-full bg-white text-black p-8 shadow-md resume-paper">
        {/* Simple Plain Text Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold uppercase tracking-tight text-black">{personal.fullName}</h1>
          <p className="text-sm font-semibold text-slate-800 mb-2">{personal.jobTitle}</p>
          <p className="text-xs text-slate-700">
            {[personal.phone, personal.email, personal.address, personal.linkedin, personal.portfolio].filter(Boolean).join(' | ')}
          </p>
        </div>

        {personal.summary && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5">SUMMARY</h2>
            <p className="text-xs leading-relaxed text-slate-900">{personal.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-2">EXPERIENCE</h2>
            <div className="space-y-3">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between text-xs font-bold">
                    <span>{exp.position} — {exp.company}</span>
                    <span>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p className="text-xs text-slate-900 leading-relaxed mt-1 whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-2">EDUCATION</h2>
            {education.map(edu => (
              <div key={edu.id} className="flex justify-between text-xs mb-1">
                <span className="font-bold">{edu.degree}, {edu.institution}</span>
                <span>{edu.startDate} - {edu.endDate}</span>
              </div>
            ))}
          </div>
        )}

        {skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5">SKILLS</h2>
            <p className="text-xs text-slate-900 leading-relaxed">
              {skills.map(s => s.name).join(', ')}
            </p>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // TEMPLATE 7: STUDENT
  // -------------------------------------------------------------
  if (templateId === 'student') {
    return (
      <div style={fontStyle} className="w-full bg-white text-slate-900 p-8 shadow-2xl resume-paper">
        <div className="border-l-4 pl-4 pb-2 mb-6" style={{ borderColor: primaryColor }}>
          <h1 className="text-2xl font-black">{personal.fullName}</h1>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{personal.jobTitle || 'Student / Recent Graduate'}</p>
          {renderContactInfo('wrap', 'mt-2 text-xs text-slate-600')}
        </div>

        {/* Education at Top for Students */}
        {education.length > 0 && (
          <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h2 className="text-xs font-black uppercase tracking-widest mb-3 text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              Education & Academic Honors
            </h2>
            <div className="space-y-3">
              {education.map(edu => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline font-bold text-xs">
                    <span>{edu.degree} in {edu.fieldOfStudy}</span>
                    <span className="text-slate-500">{edu.startDate} – {edu.endDate}</span>
                  </div>
                  <p className="text-[11px] text-slate-600">{edu.institution} {edu.gpa ? `· GPA: ${edu.gpa}` : ''}</p>
                  {edu.description && <p className="text-xs text-slate-600 mt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-black uppercase tracking-widest mb-3 text-slate-900">Internship & Leadership Experience</h2>
            <div className="space-y-4">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between text-xs font-bold">
                    <span>{exp.position} · {exp.company}</span>
                    <span className="text-slate-400 font-normal">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {skills.length > 0 && (
          <div>
            <h2 className="text-xs font-black uppercase tracking-widest mb-2 text-slate-900">Technical Skills & Interests</h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map(s => (
                <span key={s.id} className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // TEMPLATE 8: DEVELOPER
  // -------------------------------------------------------------
  return (
    <div style={{ fontFamily: `'Fira Code', monospace` }} className="w-full bg-[#0f172a] text-slate-100 p-8 shadow-2xl resume-paper rounded-lg border border-slate-800">
      {/* Dev Header */}
      <div className="border-b border-slate-800 pb-5 mb-6 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 text-xs text-indigo-400 font-bold mb-1">
            <Terminal className="w-4 h-4" />
            <span>developer_profile.ts</span>
          </div>
          <h1 className="text-2xl font-black text-white">{personal.fullName}</h1>
          <p className="text-xs text-emerald-400 font-medium">$ {personal.jobTitle}</p>
        </div>
        {personal.photoUrl && photoShape !== 'none' && (
          <img src={personal.photoUrl} alt={personal.fullName} className={`w-16 h-16 object-cover border border-slate-700 ${getPhotoShapeClass()}`} />
        )}
      </div>

      <div className="text-[11px] text-slate-400 mb-6 flex flex-wrap gap-x-4 gap-y-1 bg-slate-900/60 p-3 rounded border border-slate-800">
        {personal.email && <span>email: "{personal.email}"</span>}
        {personal.github && <span>github: "https://{personal.github}"</span>}
        {personal.linkedin && <span>linkedin: "{personal.linkedin}"</span>}
      </div>

      {personal.summary && (
        <div className="mb-6">
          <p className="text-[10px] text-slate-500 font-bold">// ABOUT_ME</p>
          <p className="text-xs text-slate-300 leading-relaxed">{personal.summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-6">
          <p className="text-[10px] text-slate-500 font-bold mb-2">// WORK_LOG</p>
          <div className="space-y-4">
            {experience.map(exp => (
              <div key={exp.id} className="border-l-2 border-indigo-500 pl-3">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="font-bold text-white">{exp.position} @ {exp.company}</span>
                  <span className="text-[10px] text-slate-500">[{exp.startDate} ~ {exp.current ? 'NOW' : exp.endDate}]</span>
                </div>
                <p className="text-xs text-slate-400 mt-1 whitespace-pre-line font-sans">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length > 0 && (
        <div>
          <p className="text-[10px] text-slate-500 font-bold mb-2">// TECH_STACK</p>
          <div className="flex flex-wrap gap-1.5">
            {skills.map(s => (
              <span key={s.id} className="text-[10px] font-mono px-2 py-0.5 bg-indigo-950 text-indigo-300 border border-indigo-800/50 rounded">
                {s.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
