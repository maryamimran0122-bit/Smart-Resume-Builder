import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, Undo2, Redo2, Plus, FileText, 
  Copy, Trash2, Check, ChevronDown, LayoutGrid, HelpCircle, 
  Info, Mail, Home, Sliders, Moon, Sun, Menu, X
} from 'lucide-react';
import { ResumeData } from '../../types/resume';

interface NavbarProps {
  activeTab: 'home' | 'builder' | 'gallery' | 'tips' | 'about' | 'contact';
  setActiveTab: (tab: 'home' | 'builder' | 'gallery' | 'tips' | 'about' | 'contact') => void;
  resumes: ResumeData[];
  activeResume: ResumeData;
  onSelectResume: (id: string) => void;
  onCreateNew: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onExportPDF: () => void;
  onExportJSON: () => void;
  onImportJSON: (e: React.ChangeEvent<HTMLInputElement>) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  isSaving: boolean;
  themeMode: 'dark' | 'light';
  setThemeMode: (mode: 'dark' | 'light') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  resumes,
  activeResume,
  onSelectResume,
  onCreateNew,
  onDuplicate,
  onDelete,
  onExportPDF,
  onExportJSON,
  onImportJSON,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  isSaving,
  themeMode,
  setThemeMode
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'builder', label: 'Builder', icon: Sliders },
    { id: 'gallery', label: 'Templates', icon: LayoutGrid },
    { id: 'tips', label: 'Tips & Guides', icon: HelpCircle },
    { id: 'about', label: 'About', icon: Info },
    { id: 'contact', label: 'Contact', icon: Mail },
  ] as const;

  return (
    <nav className="relative z-40 h-16 px-4 sm:px-6 flex items-center justify-between border-b border-white/10 bg-black/40 backdrop-blur-md">
      {/* Brand & Resume Selector */}
      <div className="flex items-center gap-3 sm:gap-6">
        <button 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2 group text-left focus:outline-none"
        >
          <div className="w-9 h-9 bg-gradient-to-tr from-indigo-500 via-purple-500 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <span className="text-white font-black text-lg tracking-wider">V</span>
          </div>
          <div className="hidden xs:block">
            <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1">
              VITA<span className="text-indigo-400">.AI</span>
              <span className="text-[9px] font-semibold px-1.5 py-0.2 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">PRO</span>
            </span>
          </div>
        </button>

        {/* Multi-Resume Dropdown */}
        {activeTab === 'builder' && (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-slate-200 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              <span className="max-w-[100px] sm:max-w-[180px] truncate">{activeResume.title}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-[#121217] border border-white/10 rounded-2xl shadow-2xl p-2 z-50 text-xs">
                <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold text-slate-500 border-b border-white/5">
                  Saved Resumes ({resumes.length})
                </div>
                <div className="max-h-48 overflow-y-auto space-y-1 my-1">
                  {resumes.map(r => (
                    <button
                      key={r.id}
                      onClick={() => {
                        onSelectResume(r.id);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors ${r.id === activeResume.id ? 'bg-indigo-600/20 text-indigo-300 font-bold border border-indigo-500/30' : 'text-slate-300 hover:bg-white/5'}`}
                    >
                      <span className="truncate">{r.title}</span>
                      {r.id === activeResume.id && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                    </button>
                  ))}
                </div>
                <div className="pt-1 border-t border-white/5 space-y-1">
                  <button
                    onClick={() => { onCreateNew(); setDropdownOpen(false); }}
                    className="w-full text-left px-3 py-1.5 text-indigo-400 hover:bg-indigo-500/10 rounded-xl flex items-center gap-2 font-medium"
                  >
                    <Plus className="w-3.5 h-3.5" /> Create New Resume
                  </button>
                  <button
                    onClick={() => { onDuplicate(); setDropdownOpen(false); }}
                    className="w-full text-left px-3 py-1.5 text-slate-300 hover:bg-white/5 rounded-xl flex items-center gap-2"
                  >
                    <Copy className="w-3.5 h-3.5 text-slate-400" /> Duplicate Current
                  </button>
                  {resumes.length > 1 && (
                    <button
                      onClick={() => { onDelete(); setDropdownOpen(false); }}
                      className="w-full text-left px-3 py-1.5 text-rose-400 hover:bg-rose-500/10 rounded-xl flex items-center gap-2"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete Resume
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Pages Nav Links (Desktop) */}
      <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-2xl p-1 text-xs font-semibold">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative px-3.5 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 ${
                isActive ? 'text-white font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNavTab"
                  className="absolute inset-0 bg-indigo-600 rounded-xl shadow-md"
                  transition={{ type: 'spring', duration: 0.35 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Undo/Redo */}
        {activeTab === 'builder' && (
          <div className="hidden sm:flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1">
            <button
              onClick={onUndo}
              disabled={!canUndo}
              title="Undo (Ctrl+Z)"
              className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 rounded-lg transition-colors"
            >
              <Undo2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onRedo}
              disabled={!canRedo}
              title="Redo (Ctrl+Y)"
              className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 rounded-lg transition-colors"
            >
              <Redo2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Autosave Status */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
          <div className={`w-2 h-2 bg-emerald-400 rounded-full ${isSaving ? 'animate-ping' : ''}`} />
          <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-400">
            {isSaving ? 'Saving...' : 'Auto-Saved'}
          </span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
          className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
          title="Toggle Dark / Light Mode"
        >
          {themeMode === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
        </button>

        {/* Export Dropdown */}
        <div className="relative">
          <button
            onClick={() => setExportOpen(!exportOpen)}
            className="px-3.5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-500/25 transition-all"
          >
            <Download className="w-4 h-4" />
            <span className="hidden xs:inline">Export</span>
            <ChevronDown className="w-3 h-3" />
          </button>

          {exportOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-[#121217] border border-white/10 rounded-2xl shadow-2xl p-2 z-50 text-xs">
              <button
                onClick={() => { onExportPDF(); setExportOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-xl text-slate-200 hover:bg-white/10 flex items-center gap-2.5 font-medium"
              >
                <Download className="w-4 h-4 text-indigo-400" /> Download PDF
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white bg-white/5 border border-white/10 rounded-xl"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-[#121217] border-b border-white/10 p-4 shadow-2xl md:hidden z-50 space-y-2 text-xs"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-colors ${
                    activeTab === item.id
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
