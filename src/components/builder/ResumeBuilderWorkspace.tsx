import React, { useState, useRef, useEffect } from 'react';
import { ResumeData, PhotoShape } from '../../types/resume';
import { 
  User, Briefcase, GraduationCap, Code2, FolderKanban, 
  Layers, Palette, Search, Sparkles, ZoomIn, ZoomOut, 
  RotateCcw, Download, Eye, Maximize2, Minimize2
} from 'lucide-react';
import { PersonalForm } from './forms/PersonalForm';
import { ExperienceForm } from './forms/ExperienceForm';
import { EducationForm } from './forms/EducationForm';
import { SkillsForm } from './forms/SkillsForm';
import { ProjectsForm } from './forms/ProjectsForm';
import { CustomSectionsForm } from './forms/CustomSectionsForm';
import { CustomizationForm } from './forms/CustomizationForm';
import { ScoreCard } from './ScoreCard';
import { PhotoUploaderModal } from './PhotoUploaderModal';
import { ResumeTemplateRenderer } from '../templates/ResumeTemplateRenderer';
import { calculateResumeScore, getWordAndCharCount } from '../../utils/scoreAnalyzer';
import { generateAIEnhancement } from '../../services/aiService';

interface WorkspaceProps {
  resume: ResumeData;
  onUpdateResume: (updated: ResumeData) => void;
  onToast: (msg: string) => void;
  onExportPDF: () => void;
}

export const ResumeBuilderWorkspace: React.FC<WorkspaceProps> = ({
  resume,
  onUpdateResume,
  onToast,
  onExportPDF
}) => {
  const [activeSection, setActiveSection] = useState<'personal' | 'experience' | 'education' | 'skills' | 'projects' | 'custom' | 'design'>('personal');
  const [searchQuery, setSearchQuery] = useState('');
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [previewScale, setPreviewScale] = useState(1);
  const [isFullscreenPreview, setIsFullscreenPreview] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  const score = calculateResumeScore(resume);
  const previewRef = useRef<HTMLDivElement>(null);

  // Section list
  const sections = [
    { id: 'personal', label: 'Personal Info', icon: User, count: 1 },
    { id: 'experience', label: 'Experience', icon: Briefcase, count: resume.experience.length },
    { id: 'education', label: 'Education', icon: GraduationCap, count: resume.education.length },
    { id: 'skills', label: 'Skills', icon: Code2, count: resume.skills.length },
    { id: 'projects', label: 'Projects & More', icon: FolderKanban, count: resume.projects.length + resume.certifications.length },
    { id: 'custom', label: 'Custom Sections', icon: Layers, count: resume.customSections.length },
    { id: 'design', label: 'Design & Colors', icon: Palette, count: 0 },
  ];

  const filteredSections = searchQuery.trim()
    ? sections.filter(s => s.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : sections;

  const handleGenerateAISummary = async () => {
    setIsAiGenerating(true);
    try {
      const summary = await generateAIEnhancement({
        action: 'summary',
        text: resume.personal.summary || `${resume.personal.fullName} - ${resume.personal.jobTitle}`,
        jobTitle: resume.personal.jobTitle
      });
      onUpdateResume({
        ...resume,
        personal: { ...resume.personal, summary }
      });
      onToast('AI Professional Summary generated!');
    } catch (err) {
      onToast('Failed to generate summary');
    } finally {
      setIsAiGenerating(false);
    }
  };

  return (
    <div className="relative z-10 flex flex-1 flex-col lg:flex-row overflow-hidden min-h-[calc(100vh-4rem)]">
      {/* Left Icon Rail Sidebar */}
      <aside className="no-print hidden sm:flex w-16 flex-col items-center py-6 gap-5 border-r border-white/5 bg-black/40 backdrop-blur-md shrink-0">
        {sections.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id as any)}
              title={sec.label}
              className={`p-2.5 rounded-2xl transition-all relative group ${
                isActive
                  ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 shadow-lg shadow-indigo-500/10'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="absolute left-full ml-3 px-2 py-1 bg-black/90 border border-white/10 rounded-lg text-[10px] font-bold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                {sec.label}
              </span>
            </button>
          );
        })}
      </aside>

      {/* Form Editor Panel */}
      <section className="no-print w-full lg:w-[460px] flex flex-col bg-white/5 backdrop-blur-md border-r border-white/5 shrink-0 overflow-hidden">
        {/* Search & Tabs Header */}
        <div className="p-4 sm:p-5 border-b border-white/5 space-y-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search editor sections..."
              className="glass-input w-full rounded-xl pl-9 pr-3 py-1.5 text-xs placeholder:text-slate-500"
            />
          </div>

          <div className="flex gap-1 overflow-x-auto pb-1 text-xs">
            {filteredSections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id as any)}
                className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeSection === sec.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <span>{sec.label}</span>
                {sec.count > 0 && (
                  <span className="text-[9px] px-1.5 rounded-full bg-black/40 text-slate-300">
                    {sec.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Form Body Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {activeSection === 'personal' && (
            <PersonalForm
              personal={resume.personal}
              onChange={(personal) => onUpdateResume({ ...resume, personal })}
              onOpenPhotoModal={() => setPhotoModalOpen(true)}
              onGenerateAISummary={handleGenerateAISummary}
              isAiLoading={isAiGenerating}
            />
          )}

          {activeSection === 'experience' && (
            <ExperienceForm
              experiences={resume.experience}
              onChange={(experience) => onUpdateResume({ ...resume, experience })}
              jobTitle={resume.personal.jobTitle}
              onToast={onToast}
            />
          )}

          {activeSection === 'education' && (
            <EducationForm
              education={resume.education}
              onChange={(education) => onUpdateResume({ ...resume, education })}
            />
          )}

          {activeSection === 'skills' && (
            <SkillsForm
              skills={resume.skills}
              onChange={(skills) => onUpdateResume({ ...resume, skills })}
              jobTitle={resume.personal.jobTitle}
              onToast={onToast}
            />
          )}

          {activeSection === 'projects' && (
            <ProjectsForm
              projects={resume.projects}
              certifications={resume.certifications}
              awards={resume.awards}
              volunteer={resume.volunteer}
              references={resume.references}
              onUpdateProjects={(projects) => onUpdateResume({ ...resume, projects })}
              onUpdateCertifications={(certifications) => onUpdateResume({ ...resume, certifications })}
              onUpdateAwards={(awards) => onUpdateResume({ ...resume, awards })}
              onUpdateVolunteer={(volunteer) => onUpdateResume({ ...resume, volunteer })}
              onUpdateReferences={(references) => onUpdateResume({ ...resume, references })}
            />
          )}

          {activeSection === 'custom' && (
            <CustomSectionsForm
              customSections={resume.customSections}
              onChange={(customSections) => onUpdateResume({ ...resume, customSections })}
            />
          )}

          {activeSection === 'design' && (
            <CustomizationForm
              customization={resume.customization}
              onChange={(customization) => onUpdateResume({ ...resume, customization })}
            />
          )}
        </div>

        {/* Bottom ATS Score Card */}
        <div className="p-4 border-t border-white/5">
          <ScoreCard
            score={score}
            onGenerateAISummary={handleGenerateAISummary}
          />
        </div>
      </section>

      {/* Right Live Preview Panel */}
      <section
        className={`flex-1 bg-[#121214] flex flex-col items-center justify-start relative p-4 sm:p-8 overflow-y-auto ${
          isFullscreenPreview ? 'fixed inset-0 z-50 bg-black/95 p-4' : ''
        }`}
      >
        {/* Preview Toolbar */}
        <div className="no-print sticky top-2 z-30 flex items-center gap-2 p-1.5 bg-black/60 border border-white/10 rounded-full backdrop-blur-xl mb-6 shadow-2xl">
          <div className="flex items-center gap-1 px-2">
            {(['corporate', 'minimal', 'creative', 'modern'] as const).map((tId) => (
              <button
                key={tId}
                onClick={() =>
                  onUpdateResume({
                    ...resume,
                    customization: { ...resume.customization, templateId: tId }
                  })
                }
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-all ${
                  resume.customization.templateId === tId
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tId}
              </button>
            ))}
          </div>

          <div className="w-px h-4 bg-white/10 mx-1" />

          {/* Zoom controls */}
          <button
            onClick={() => setPreviewScale(Math.max(0.6, previewScale - 0.1))}
            className="p-1.5 text-slate-400 hover:text-white"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] font-mono text-slate-400 font-bold">{Math.round(previewScale * 100)}%</span>
          <button
            onClick={() => setPreviewScale(Math.min(1.4, previewScale + 0.1))}
            className="p-1.5 text-slate-400 hover:text-white"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <div className="w-px h-4 bg-white/10 mx-1" />

          <button
            onClick={() => setIsFullscreenPreview(!isFullscreenPreview)}
            className="p-1.5 text-slate-400 hover:text-white"
            title="Fullscreen Preview"
          >
            {isFullscreenPreview ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Paper Container */}
        <div
          id="resume-preview-container"
          ref={previewRef}
          className="transition-transform duration-200 ease-out origin-top w-full max-w-[750px]"
          style={{ transform: `scale(${previewScale})` }}
        >
          <ResumeTemplateRenderer data={resume} />
        </div>

        {/* Floating AI Assistant Trigger */}
        <div className="no-print fixed bottom-14 right-8 z-40">
          <button
            onClick={handleGenerateAISummary}
            disabled={isAiGenerating}
            className="group relative focus:outline-none"
          >
            <div className="absolute -inset-2 bg-gradient-to-tr from-indigo-500 to-fuchsia-500 rounded-full blur opacity-40 group-hover:opacity-80 transition duration-500" />
            <div className="relative flex items-center gap-2.5 px-5 py-3 bg-black border border-white/15 rounded-full text-white shadow-2xl hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span className="text-xs font-bold">{isAiGenerating ? 'AI Enhancing...' : 'AI Assistant'}</span>
            </div>
          </button>
        </div>
      </section>

      {/* Photo Uploader Modal */}
      <PhotoUploaderModal
        isOpen={photoModalOpen}
        onClose={() => setPhotoModalOpen(false)}
        photoUrl={resume.personal.photoUrl}
        photoShape={resume.personal.photoShape}
        onUpdatePhoto={(photoUrl, photoShape) =>
          onUpdateResume({
            ...resume,
            personal: { ...resume.personal, photoUrl, photoShape },
            customization: { ...resume.customization, photoShape }
          })
        }
      />
    </div>
  );
};
