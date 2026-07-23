import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';

import { ResumeData, TemplateId, DEFAULT_RESUME } from './types/resume';
import { 
  getAllResumes, saveResume, deleteResume, 
  exportResumeJSON, importResumeJSON, createNewResume
} from './utils/storage';
import { getWordAndCharCount } from './utils/scoreAnalyzer';
import { exportResumeToPDF } from './utils/pdfExport';

import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer, ToastMessage } from './components/common/ToastContainer';
import { KeyboardShortcutsModal } from './components/common/KeyboardShortcutsModal';

import { HomePage } from './pages/HomePage';
import { TemplatesGalleryPage } from './pages/TemplatesGalleryPage';
import { TipsPage } from './pages/TipsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { ResumeBuilderWorkspace } from './components/builder/ResumeBuilderWorkspace';

export function App() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<'home' | 'builder' | 'gallery' | 'tips' | 'about' | 'contact'>('home');

  // Resume state
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [activeResume, setActiveResume] = useState<ResumeData>(DEFAULT_RESUME);
  const [isSaving, setIsSaving] = useState(false);

  // Undo / Redo History Stack
  const [history, setHistory] = useState<ResumeData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // UI Modals & Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');

  // Helper Toast
  const addToast = useCallback((text: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync Theme Mode to document root element
  useEffect(() => {
    if (themeMode === 'light') {
      document.documentElement.classList.add('light');
      document.body.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.body.classList.remove('light');
    }
  }, [themeMode]);

  // Initial Load from LocalStorage
  useEffect(() => {
    const loaded = getAllResumes();
    setResumes(loaded);
    if (loaded.length > 0) {
      setActiveResume(loaded[0]);
      setHistory([loaded[0]]);
      setHistoryIndex(0);
    }
  }, []);

  // Sync / Autosave to LocalStorage
  const handleUpdateResume = (updated: ResumeData) => {
    setIsSaving(true);
    setActiveResume(updated);

    // Push history snapshot
    const newHistory = history.slice(0, historyIndex + 1);
    setHistory([...newHistory, updated]);
    setHistoryIndex(newHistory.length);

    // Save to LocalStorage
    saveResume(updated);
    setResumes(prev => prev.map(r => r.id === updated.id ? updated : r));

    setTimeout(() => setIsSaving(false), 500);
  };

  // Undo / Redo
  const handleUndo = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setActiveResume(prev);
      saveResume(prev);
      addToast('Undo performed', 'info');
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setActiveResume(next);
      saveResume(next);
      addToast('Redo performed', 'info');
    }
  };

  // Keyboard Hotkeys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        handleRedo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveResume(activeResume);
        addToast('Resume manually saved to browser storage!', 'success');
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        handleExportPDF();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeResume, historyIndex, history]);

  // Resume Management Actions
  const handleSelectResume = (id: string) => {
    const found = resumes.find(r => r.id === id);
    if (found) {
      setActiveResume(found);
      setHistory([found]);
      setHistoryIndex(0);
      addToast(`Switched to "${found.title}"`);
    }
  };

  const handleCreateNew = () => {
    const newRes = createNewResume(`Resume ${resumes.length + 1}`);
    const updatedList = [newRes, ...resumes];
    setResumes(updatedList);
    setActiveResume(newRes);
    setHistory([newRes]);
    setHistoryIndex(0);
    saveResume(newRes);
    setActiveTab('builder');
    addToast('Created new blank resume!', 'success');
  };

  const handleDuplicate = () => {
    const duplicated: ResumeData = {
      ...activeResume,
      id: `resume-${Date.now()}`,
      title: `${activeResume.title} (Copy)`,
      updatedAt: new Date().toISOString()
    };
    const updatedList = [duplicated, ...resumes];
    setResumes(updatedList);
    setActiveResume(duplicated);
    setHistory([duplicated]);
    setHistoryIndex(0);
    saveResume(duplicated);
    addToast(`Duplicated "${activeResume.title}"`, 'success');
  };

  const handleDelete = () => {
    if (resumes.length <= 1) {
      addToast('Cannot delete your only resume', 'error');
      return;
    }
    deleteResume(activeResume.id);
    const remaining = resumes.filter(r => r.id !== activeResume.id);
    setResumes(remaining);
    setActiveResume(remaining[0]);
    setHistory([remaining[0]]);
    setHistoryIndex(0);
    addToast('Resume deleted', 'info');
  };

  // PDF Export Generation
  const handleExportPDF = async () => {
    await exportResumeToPDF(activeResume, addToast);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          const imported = importResumeJSON(content);
          if (imported) {
            handleUpdateResume(imported);
            addToast(`Imported "${imported.title}"`, 'success');
          } else {
            addToast('Invalid JSON resume format', 'error');
          }
        }
      };
      reader.readAsText(file);
    }
  };

  const { wordCount, charCount } = getWordAndCharCount(activeResume);

  return (
    <div className={`min-h-screen flex flex-col font-['Poppins',sans-serif] ${themeMode === 'light' ? 'bg-slate-100 text-slate-900' : 'bg-[#0d0d10] text-slate-100'}`}>
      {/* Glassmorphic Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        resumes={resumes}
        activeResume={activeResume}
        onSelectResume={handleSelectResume}
        onCreateNew={handleCreateNew}
        onDuplicate={handleDuplicate}
        onDelete={handleDelete}
        onExportPDF={handleExportPDF}
        onExportJSON={() => exportResumeJSON(activeResume)}
        onImportJSON={handleImportJSON}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onUndo={handleUndo}
        onRedo={handleRedo}
        isSaving={isSaving}
        themeMode={themeMode}
        setThemeMode={setThemeMode}
      />

      {/* Main Pages Content Switcher */}
      <main className="flex-1 flex flex-col relative">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <HomePage
              key="home"
              onStartBuilding={(templateId) => {
                if (templateId) {
                  handleUpdateResume({
                    ...activeResume,
                    customization: { ...activeResume.customization, templateId }
                  });
                }
                setActiveTab('builder');
              }}
              onSelectGallery={() => setActiveTab('gallery')}
            />
          )}

          {activeTab === 'builder' && (
            <ResumeBuilderWorkspace
              key="builder"
              resume={activeResume}
              onUpdateResume={handleUpdateResume}
              onToast={addToast}
              onExportPDF={handleExportPDF}
            />
          )}

          {activeTab === 'gallery' && (
            <TemplatesGalleryPage
              key="gallery"
              currentTemplateId={activeResume.customization.templateId}
              activeResume={activeResume}
              onToast={addToast}
              onSelectTemplate={(templateId: TemplateId, primaryColor?: string) => {
                handleUpdateResume({
                  ...activeResume,
                  customization: { 
                    ...activeResume.customization, 
                    templateId,
                    ...(primaryColor ? { primaryColor } : {})
                  }
                });
                setActiveTab('builder');
                addToast(`Applied "${templateId}" template`, 'success');
              }}
            />
          )}

          {activeTab === 'tips' && <TipsPage key="tips" />}

          {activeTab === 'about' && <AboutPage key="about" />}

          {activeTab === 'contact' && <ContactPage key="contact" onToast={addToast} />}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer
        charCount={charCount}
        wordCount={wordCount}
        onOpenShortcuts={() => setShortcutsOpen(true)}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Keyboard Shortcuts Dialog */}
      <KeyboardShortcutsModal isOpen={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
    </div>
  );
}

export default App;
