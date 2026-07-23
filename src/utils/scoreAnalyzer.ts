import { ResumeData, ResumeScore } from '../types/resume';

export function calculateResumeScore(resume: ResumeData): ResumeScore {
  let personalScore = 0;
  let summaryScore = 0;
  let experienceScore = 0;
  let educationScore = 0;
  let skillsScore = 0;
  let formattingScore = 0;

  const suggestions: ResumeScore['suggestions'] = [];

  // Personal Info (max 20)
  if (resume.personal.fullName.trim()) personalScore += 5;
  if (resume.personal.email.trim() && resume.personal.email.includes('@')) personalScore += 5;
  if (resume.personal.phone.trim()) personalScore += 4;
  if (resume.personal.jobTitle.trim()) personalScore += 4;
  if (resume.personal.linkedin.trim() || resume.personal.github.trim()) personalScore += 2;

  if (!resume.personal.linkedin && !resume.personal.github) {
    suggestions.push({
      type: 'tip',
      message: 'Add a LinkedIn or GitHub link to build trust with recruiters.',
      section: 'Personal Information'
    });
  }

  // Summary (max 15)
  const summaryLength = resume.personal.summary.trim().length;
  if (summaryLength > 50) summaryScore += 8;
  if (summaryLength >= 120 && summaryLength <= 400) summaryScore += 7;
  else if (summaryLength < 50) {
    suggestions.push({
      type: 'warning',
      message: 'Professional summary is too short. Aim for 2-4 sentences highlighting key achievements.',
      section: 'Summary'
    });
  }

  // Experience (max 25)
  if (resume.experience.length > 0) {
    experienceScore += 10;
    let hasActionVerbs = false;
    let hasQuantifiable = false;

    resume.experience.forEach(exp => {
      const desc = exp.description.toLowerCase();
      if (/\b(led|pioneered|architected|developed|created|managed|designed|reduced|increased|delivered)\b/.test(desc)) {
        hasActionVerbs = true;
      }
      if (/\d+%|\$\d+|\b\d+\b/.test(desc)) {
        hasQuantifiable = true;
      }
    });

    if (hasActionVerbs) experienceScore += 8;
    else {
      suggestions.push({
        type: 'tip',
        message: 'Use strong action verbs (e.g. Led, Architected, Spearheaded) in experience bullet points.',
        section: 'Experience'
      });
    }

    if (hasQuantifiable) experienceScore += 7;
    else {
      suggestions.push({
        type: 'warning',
        message: 'Add quantifiable metrics (e.g. "Increased sales by 25%", "Managed $50k budget") to experience.',
        section: 'Experience'
      });
    }
  } else {
    suggestions.push({
      type: 'warning',
      message: 'No experience entries found. Add at least one relevant work or internship experience.',
      section: 'Experience'
    });
  }

  // Education (max 15)
  if (resume.education.length > 0) {
    educationScore += 15;
  } else {
    suggestions.push({
      type: 'warning',
      message: 'Add your education history (degree, institution, graduation year).',
      section: 'Education'
    });
  }

  // Skills (max 15)
  if (resume.skills.length >= 5) skillsScore += 15;
  else if (resume.skills.length > 0) skillsScore += 8;
  else {
    suggestions.push({
      type: 'warning',
      message: 'Add at least 5 key technical and soft skills to pass ATS filters.',
      section: 'Skills'
    });
  }

  // Formatting & Completeness (max 10)
  if (resume.projects.length > 0) formattingScore += 4;
  if (resume.certifications.length > 0 || resume.awards.length > 0) formattingScore += 3;
  if (resume.customization.fontFamily) formattingScore += 3;

  const totalScore = Math.min(100, Math.round(
    personalScore + summaryScore + experienceScore + educationScore + skillsScore + formattingScore
  ));

  let grade: ResumeScore['grade'] = 'Needs Improvement';
  if (totalScore >= 90) grade = 'A+';
  else if (totalScore >= 80) grade = 'A';
  else if (totalScore >= 70) grade = 'B';
  else if (totalScore >= 55) grade = 'C';

  if (suggestions.length === 0) {
    suggestions.push({
      type: 'success',
      message: 'Your resume is in top shape! Ready for submission.',
    });
  }

  return {
    totalScore,
    grade,
    breakdown: {
      personal: personalScore,
      summary: summaryScore,
      experience: experienceScore,
      education: educationScore,
      skills: skillsScore,
      formatting: formattingScore
    },
    suggestions
  };
}

export function getWordAndCharCount(data: string | ResumeData) {
  let text = '';
  if (typeof data === 'string') {
    text = data;
  } else if (data) {
    text = JSON.stringify(data);
  }
  const clean = text.trim();
  const chars = clean.length;
  const words = clean ? clean.split(/\s+/).filter(Boolean).length : 0;
  return { chars, words, charCount: chars, wordCount: words };
}
