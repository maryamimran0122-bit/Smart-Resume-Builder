import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TemplateId, DEFAULT_RESUME, ResumeData } from '../types/resume';
import { 
  Check, Sparkles, LayoutGrid, Download, Eye, Edit3, 
  Star, Palette, Maximize2, X, ShieldCheck, Zap, ArrowRight,
  Sliders
} from 'lucide-react';
import { ResumeTemplateRenderer } from '../components/templates/ResumeTemplateRenderer';
import { exportResumeToPDF } from '../utils/pdfExport';

interface GalleryProps {
  currentTemplateId: TemplateId;
  activeResume?: ResumeData;
  onSelectTemplate: (templateId: TemplateId, primaryColor?: string) => void;
  onToast?: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export interface GalleryTemplateItem {
  id: TemplateId;
  name: string;
  category: 'Popular' | 'ATS Safe' | 'Modern' | 'Executive' | 'Creative' | 'Tech' | 'Academic' | 'Minimal';
  desc: string;
  badge: string;
  atsScore: number;
  rating: number;
  downloads: string;
  defaultColor: string;
  features: string[];
}

export const GALLERY_TEMPLATES: GalleryTemplateItem[] = [
  {
    id: 'minimal',
    name: 'Minimalist Clean',
    category: 'Minimal',
    badge: 'Editor Top Choice',
    desc: 'Ultra-clean layout emphasizing typography, generous margins, and crisp whitespace.',
    atsScore: 99,
    rating: 4.9,
    downloads: '24.2k',
    defaultColor: '#0f172a',
    features: ['High readability index', 'Subtle dividers', 'Fast ATS scanning']
  },
  {
    id: 'corporate',
    name: 'Corporate Executive',
    category: 'Executive',
    badge: 'Popular',
    desc: 'Structured top banner accent engineered for corporate leadership & finance positions.',
    atsScore: 98,
    rating: 4.9,
    downloads: '38.1k',
    defaultColor: '#1e3a8a',
    features: ['Professional header', 'Bold section bands', 'High impact hierarchy']
  },
  {
    id: 'creative',
    name: 'Creative Portfolio',
    category: 'Creative',
    badge: 'Design Favorite',
    desc: 'Vibrant header card with rounded skill pill tags and modern accent highlights.',
    atsScore: 96,
    rating: 4.8,
    downloads: '18.5k',
    defaultColor: '#7c3aed',
    features: ['Gradient card header', 'Pill skill badges', 'Hero summary box']
  },
  {
    id: 'modern',
    name: 'Modern Split Sidebar',
    category: 'Modern',
    badge: 'Best Seller',
    desc: 'Side-by-side two column layout highlighting technical skills and key metrics.',
    atsScore: 97,
    rating: 4.9,
    downloads: '42.9k',
    defaultColor: '#4f46e5',
    features: ['Left color panel', 'Skill progress bars', 'Compact vertical flow']
  },
  {
    id: 'executive',
    name: 'Executive Luxury',
    category: 'Executive',
    badge: 'Leadership',
    desc: 'Centered luxury typography with double rule styling for senior managers & executives.',
    atsScore: 98,
    rating: 5.0,
    downloads: '15.3k',
    defaultColor: '#0f172a',
    features: ['Serif display headers', 'Double rule dividers', 'Core competency matrix']
  },
  {
    id: 'ats',
    name: 'ATS Optimized Plain',
    category: 'ATS Safe',
    badge: '100% ATS Safe',
    desc: 'Zero complex grid or graphics for 100% ATS parser accuracy across all enterprise HR systems.',
    atsScore: 100,
    rating: 5.0,
    downloads: '51.0k',
    defaultColor: '#1e293b',
    features: ['Single column flow', 'Standard ATS headers', 'Plain bullet lists']
  },
  {
    id: 'student',
    name: 'Academic Student',
    category: 'Academic',
    badge: 'New Grad',
    desc: 'Education, GPA, coursework, and honors featured prominently right at the top.',
    atsScore: 98,
    rating: 4.8,
    downloads: '12.8k',
    defaultColor: '#059669',
    features: ['Top education focus', 'Leadership section', 'Internship highlights']
  },
  {
    id: 'developer',
    name: 'Tech & Developer IDE',
    category: 'Tech',
    badge: 'Terminal Theme',
    desc: 'Dark IDE theme with monospaced code fonts, repo links, and tech stack badges for engineers.',
    atsScore: 97,
    rating: 4.9,
    downloads: '29.4k',
    defaultColor: '#0284c7',
    features: ['Monospace code font', 'GitHub repo links', 'Tech stack tags']
  }
];

const PRESET_COLORS = [
  { name: 'Indigo', value: '#4f46e5' },
  { name: 'Navy', value: '#1e3a8a' },
  { name: 'Emerald', value: '#059669' },
  { name: 'Crimson', value: '#e11d48' },
  { name: 'Purple', value: '#7c3aed' },
  { name: 'Amber', value: '#d97706' },
  { name: 'Slate', value: '#334155' }
];

export const TemplatesGalleryPage: React.FC<GalleryProps> = ({ 
  currentTemplateId, 
  activeResume = DEFAULT_RESUME, 
  onSelectTemplate,
  onToast = () => {} 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [templateColors, setTemplateColors] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    GALLERY_TEMPLATES.forEach(t => { init[t.id] = t.defaultColor; });
    return init;
  });

  // Canva Preview Modal State
  const [previewTemplate, setPreviewTemplate] = useState<GalleryTemplateItem | null>(null);
  const [previewColor, setPreviewColor] = useState<string>('#4f46e5');

  const categories = ['All', 'Popular', 'ATS Safe', 'Modern', 'Executive', 'Creative', 'Tech', 'Academic', 'Minimal'];

  const filteredTemplates = selectedCategory === 'All'
    ? GALLERY_TEMPLATES
    : GALLERY_TEMPLATES.filter(t => t.category === selectedCategory);

  const handleColorChange = (templateId: string, color: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTemplateColors(prev => ({ ...prev, [templateId]: color }));
  };

  const handleQuickPDFDownload = async (templateItem: GalleryTemplateItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const customColor = templateColors[templateItem.id] || templateItem.defaultColor;
    const sampleResumeToExport: ResumeData = {
      ...activeResume,
      customization: {
        ...activeResume.customization,
        templateId: templateItem.id,
        primaryColor: customColor
      }
    };
    await exportResumeToPDF(sampleResumeToExport, onToast, 'canva-modal-preview-render');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10"
    >
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-semibold backdrop-blur-md shadow-lg shadow-indigo-500/10">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Professional Resume Studio & Templates</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
          Pick a Template & Customize <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-fuchsia-400 bg-clip-text text-transparent">
            Like a Real Graphic Editor
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
          Select any template below to customize colors live, test layouts in real-time, or download instantly as a high-resolution print PDF.
        </p>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 scale-105'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Canva Template Cards Marketplace Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTemplates.map((t) => {
          const isSelected = currentTemplateId === t.id;
          const activeColor = templateColors[t.id] || t.defaultColor;

          return (
            <motion.div
              key={t.id}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`group relative rounded-3xl border overflow-hidden flex flex-col justify-between transition-all glass-panel ${
                isSelected
                  ? 'border-indigo-500/80 shadow-2xl shadow-indigo-500/20 ring-1 ring-indigo-500/50'
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              {/* Canva Paper Miniature Wireframe Card Container */}
              <div className="relative bg-slate-900/80 p-4 aspect-[210/260] overflow-hidden flex flex-col justify-between border-b border-white/10 group-hover:brightness-105 transition-all">
                {/* Paper Representation Sheet */}
                <div 
                  className="w-full h-full bg-white rounded-xl shadow-2xl p-3 text-[8px] leading-tight text-slate-800 flex flex-col justify-between overflow-hidden relative select-none transform transition-transform group-hover:scale-[1.02]"
                >
                  {/* Top Banner / Header Accent based on template style */}
                  <div 
                    className="p-2 rounded-lg mb-2 text-white flex items-center justify-between"
                    style={{ backgroundColor: activeColor }}
                  >
                    <div>
                      <div className="font-extrabold text-[9px] tracking-wide">{activeResume.personal.fullName || 'Alex Sterling'}</div>
                      <div className="text-[7px] opacity-90">{activeResume.personal.jobTitle || 'Senior Software Engineer'}</div>
                    </div>
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center font-bold text-[8px]">
                      {activeResume.personal.fullName.charAt(0) || 'A'}
                    </div>
                  </div>

                  {/* Body Wireframe Mockup */}
                  <div className="grid grid-cols-3 gap-2 flex-1">
                    <div className="col-span-2 space-y-1.5">
                      <div className="h-1.5 w-16 bg-slate-200 rounded font-bold text-[6px] px-1 flex items-center text-slate-600">
                        SUMMARY
                      </div>
                      <div className="space-y-0.5">
                        <div className="h-1 w-full bg-slate-100 rounded" />
                        <div className="h-1 w-5/6 bg-slate-100 rounded" />
                        <div className="h-1 w-4/6 bg-slate-100 rounded" />
                      </div>

                      <div className="h-1.5 w-20 bg-slate-200 rounded font-bold text-[6px] px-1 flex items-center text-slate-600 mt-2">
                        EXPERIENCE
                      </div>
                      <div className="space-y-1">
                        <div className="h-1 w-3/4 bg-slate-300 rounded" />
                        <div className="h-0.5 w-full bg-slate-100 rounded" />
                        <div className="h-0.5 w-full bg-slate-100 rounded" />
                      </div>
                    </div>

                    <div className="col-span-1 space-y-1.5 border-l border-slate-100 pl-1.5">
                      <div className="h-1.5 w-10 bg-slate-200 rounded text-[5px] font-bold text-slate-600 px-0.5">
                        SKILLS
                      </div>
                      <div className="space-y-1">
                        <div className="h-1.5 w-full rounded-full" style={{ backgroundColor: `${activeColor}20` }}>
                          <div className="h-full w-4/5 rounded-full" style={{ backgroundColor: activeColor }} />
                        </div>
                        <div className="h-1.5 w-full rounded-full" style={{ backgroundColor: `${activeColor}20` }}>
                          <div className="h-full w-3/5 rounded-full" style={{ backgroundColor: activeColor }} />
                        </div>
                        <div className="h-1.5 w-full rounded-full" style={{ backgroundColor: `${activeColor}20` }}>
                          <div className="h-full w-full rounded-full" style={{ backgroundColor: activeColor }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Footer Accent */}
                  <div className="mt-2 pt-1 border-t border-slate-100 text-[6px] text-slate-400 flex justify-between">
                    <span>{activeResume.personal.email || 'alex@sterling.design'}</span>
                    <span>ATS Pass {t.atsScore}%</span>
                  </div>
                </div>

                {/* Canva Card Hover Action Overlay */}
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 p-4 flex flex-col justify-center items-center gap-3">
                  <button
                    onClick={() => onSelectTemplate(t.id, activeColor)}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 transition-transform hover:scale-105"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Use & Edit Template</span>
                  </button>
                </div>

                {/* Badge Pill */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded-full text-[10px] font-bold text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                  <span>{t.badge}</span>
                </div>

                {isSelected && (
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg">
                    <Check className="w-3 h-3" /> Active
                  </div>
                )}
              </div>

              {/* Template Card Info & Interactive Accent Palette Picker */}
              <div className="p-5 space-y-4">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {t.name}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md">
                      <Star className="w-3 h-3 fill-current" /> {t.rating}
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{t.desc}</p>
                </div>

                {/* Accent Color Palette Selector */}
                <div className="space-y-1.5 pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400">
                    <span className="flex items-center gap-1"><Palette className="w-3 h-3 text-indigo-400" /> Color Accent</span>
                    <span>{t.downloads} used</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {PRESET_COLORS.map((c) => (
                      <button
                        key={c.value}
                        onClick={(e) => handleColorChange(t.id, c.value, e)}
                        title={c.name}
                        className={`w-5 h-5 rounded-full transition-all border ${
                          activeColor === c.value
                            ? 'scale-125 border-white shadow-md ring-2 ring-indigo-500/50'
                            : 'border-transparent opacity-70 hover:opacity-100 hover:scale-110'
                        }`}
                        style={{ backgroundColor: c.value }}
                      />
                    ))}
                  </div>
                </div>

                {/* Primary Action Button */}
                <button
                  onClick={() => onSelectTemplate(t.id, activeColor)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-white/5 hover:bg-white/15 text-white border border-white/10'
                  }`}
                >
                  <span>{isSelected ? 'Currently Selected' : 'Customize & Use'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Hidden container used exclusively for quick background PDF generation */}
      <div className="fixed top-[-9999px] left-[-9999px] pointer-events-none opacity-0">
        <div id="canva-modal-preview-render" className="w-[800px] bg-white text-slate-900 p-8">
          {previewTemplate && (
            <ResumeTemplateRenderer
              resume={{
                ...activeResume,
                customization: {
                  ...activeResume.customization,
                  templateId: previewTemplate.id,
                  primaryColor: previewColor
                }
              }}
            />
          )}
        </div>
      </div>

      {/* Canva Interactive Fullscreen Inspector Modal */}
      <AnimatePresence>
        {previewTemplate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-5xl h-[90vh] bg-[#121217] border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      {previewTemplate.name}
                      <span className="text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                        {previewTemplate.badge}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400">{previewTemplate.desc}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      onSelectTemplate(previewTemplate.id, previewColor);
                      setPreviewTemplate(null);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit in Workspace</span>
                  </button>

                  <button
                    onClick={async () => {
                      const sampleResume: ResumeData = {
                        ...activeResume,
                        customization: {
                          ...activeResume.customization,
                          templateId: previewTemplate.id,
                          primaryColor: previewColor
                        }
                      };
                      await exportResumeToPDF(sampleResume, onToast, 'modal-full-preview-target');
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>

                  <button
                    onClick={() => setPreviewTemplate(null)}
                    className="p-2 text-slate-400 hover:text-white rounded-xl bg-white/5 hover:bg-white/10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body with Live Render and Controls */}
              <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-slate-950">
                {/* Side Customization Panel */}
                <div className="w-full lg:w-72 p-5 border-b lg:border-b-0 lg:border-r border-white/10 space-y-6 overflow-y-auto bg-black/40 text-xs">
                  <div>
                    <span className="font-bold text-slate-300 block mb-2">Accent Color Theme</span>
                    <div className="grid grid-cols-4 gap-2">
                      {PRESET_COLORS.map((c) => (
                        <button
                          key={c.value}
                          onClick={() => setPreviewColor(c.value)}
                          className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                            previewColor === c.value
                              ? 'bg-white/10 border-indigo-500 text-white font-bold'
                              : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                          }`}
                        >
                          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: c.value }} />
                          <span className="text-[9px]">{c.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-2">
                    <span className="font-bold text-indigo-300 flex items-center gap-1.5 text-xs">
                      <ShieldCheck className="w-4 h-4 text-indigo-400" />
                      ATS Compatibility
                    </span>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Scored {previewTemplate.atsScore}% ATS accuracy. All headers, fonts, and section margins follow enterprise HR criteria.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="font-bold text-slate-300 block">Key Layout Strengths</span>
                    {previewTemplate.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-slate-300 text-[11px]">
                        <Zap className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Center Paper Canvas Display */}
                <div className="flex-1 p-6 overflow-y-auto flex items-center justify-center bg-slate-900/60">
                  <div 
                    id="modal-full-preview-target"
                    className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl min-h-[700px] text-slate-900 overflow-hidden transform scale-95 origin-top"
                  >
                    <ResumeTemplateRenderer
                      resume={{
                        ...activeResume,
                        customization: {
                          ...activeResume.customization,
                          templateId: previewTemplate.id,
                          primaryColor: previewColor
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
