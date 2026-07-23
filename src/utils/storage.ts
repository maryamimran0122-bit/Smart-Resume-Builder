import { DEFAULT_RESUME, ResumeData } from '../types/resume';

const STORAGE_KEY = 'vita_ai_resumes_v1';
const ACTIVE_ID_KEY = 'vita_ai_active_resume_id_v1';

export function getAllResumes(): ResumeData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = [DEFAULT_RESUME];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      localStorage.setItem(ACTIVE_ID_KEY, DEFAULT_RESUME.id);
      return initial;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [DEFAULT_RESUME];
  } catch (err) {
    console.error('Error loading resumes from localStorage:', err);
    return [DEFAULT_RESUME];
  }
}

export function saveAllResumes(resumes: ResumeData[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
  } catch (err) {
    console.error('Error saving resumes to localStorage:', err);
  }
}

export function getActiveResumeId(): string {
  return localStorage.getItem(ACTIVE_ID_KEY) || DEFAULT_RESUME.id;
}

export function setActiveResumeId(id: string): void {
  localStorage.setItem(ACTIVE_ID_KEY, id);
}

export function saveResume(resume: ResumeData): ResumeData[] {
  const resumes = getAllResumes();
  const updatedResume = { ...resume, updatedAt: new Date().toISOString() };
  const index = resumes.findIndex(r => r.id === resume.id);
  if (index >= 0) {
    resumes[index] = updatedResume;
  } else {
    resumes.push(updatedResume);
  }
  saveAllResumes(resumes);
  return resumes;
}

export function createNewResume(title = 'New Professional Resume'): ResumeData {
  const newResume: ResumeData = {
    ...DEFAULT_RESUME,
    id: `resume-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    title,
    updatedAt: new Date().toISOString()
  };
  const resumes = getAllResumes();
  resumes.push(newResume);
  saveAllResumes(resumes);
  setActiveResumeId(newResume.id);
  return newResume;
}

export function duplicateResume(id: string): ResumeData | null {
  const resumes = getAllResumes();
  const target = resumes.find(r => r.id === id);
  if (!target) return null;

  const duplicated: ResumeData = {
    ...JSON.parse(JSON.stringify(target)),
    id: `resume-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    title: `${target.title} (Copy)`,
    updatedAt: new Date().toISOString()
  };

  resumes.push(duplicated);
  saveAllResumes(resumes);
  setActiveResumeId(duplicated.id);
  return duplicated;
}

export function deleteResume(id: string): ResumeData[] {
  let resumes = getAllResumes();
  if (resumes.length <= 1) {
    // Re-initialize with default if last one deleted
    resumes = [DEFAULT_RESUME];
    saveAllResumes(resumes);
    setActiveResumeId(DEFAULT_RESUME.id);
    return resumes;
  }

  resumes = resumes.filter(r => r.id !== id);
  saveAllResumes(resumes);
  if (getActiveResumeId() === id) {
    setActiveResumeId(resumes[0].id);
  }
  return resumes;
}

export function exportResumeJSON(resume: ResumeData): void {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resume, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `${resume.title.replace(/\s+/g, '_')}_resume.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function importResumeJSON(jsonText: string): ResumeData | null {
  try {
    const parsed = JSON.parse(jsonText);
    if (!parsed.personal || !parsed.customization) {
      throw new Error("Invalid resume format");
    }
    const importedResume: ResumeData = {
      ...DEFAULT_RESUME,
      ...parsed,
      id: `resume-imported-${Date.now()}`,
      updatedAt: new Date().toISOString()
    };
    saveResume(importedResume);
    setActiveResumeId(importedResume.id);
    return importedResume;
  } catch (err) {
    console.error("JSON Import failed:", err);
    return null;
  }
}
