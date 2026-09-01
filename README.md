# VITA.AI Pro - Next-Gen AI-Powered Resume Builder & Studio 🚀

[![Live Demo](https://img.shields.io/badge/Live_Demo-VITA.AI_Pro-6366f1?style=for-the-badge&logo=googlechrome&logoColor=white)](https://ais-pre-bczn7ilszlzkbxpic56n65-43961552720.asia-southeast1.run.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React 18](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini API](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

---

## 🌐 Live Website URLs

- **Live Application (Production / Share URL):**  
   https://resumestudio-one.vercel.app/

---

## ✨ Overview

**VITA.AI Pro** is a modern, high-converting AI-powered resume builder engineered for job seekers, software engineers, designers, and executives. It features a real-time split-screen canvas editor, integrated Google Gemini 2.5 AI for grammar and impact statement generation, 8 ATS-tested professional templates, drag-and-drop section reordering, and vector PDF exports.

---

## 🌟 Key Features

### 🤖 1. Integrated Google Gemini AI Assistant
- **AI Bullet Point Enhancer**: Transforms basic responsibility descriptions into high-impact metric statements.
- **AI Summary Generator**: Crafts tailored executive summaries based on your job title and target industry.
- **Real-Time Strength & ATS Score Analyzer**: Evaluates word choice, action verbs, section completeness, and ATS readability index on a 0–100 scale.

### 🎨 2. Professional Template Gallery
Includes **8 ATS-compliant templates**:
1. **Minimalist Clean** – Clean layout with crisp typography and generous margins.
2. **Corporate Executive** – Header accent band designed for leadership and finance roles.
3. **Creative Portfolio** – Vibrant header card with skill pill badges.
4. **Modern Split Sidebar** – Two-column layout with technical skill progress bars.
5. **Executive Luxury** – Serif display typography with double rule dividers.
6. **ATS Optimized Plain** – 100% ATS parser accuracy with zero complex graphics.
7. **Academic Student** – Highlights education, GPA, coursework, and honors.
8. **Tech & Developer IDE** – Terminal-themed monospace code styling for engineers.

### 📄 3. High-Resolution Vector PDF Export
- Engineered with custom `oklch` CSS sanitization and computed style resolution to produce crisp, print-ready A4/Letter PDF files without color parsing defects or clipped pagination.

### 🔄 4. Multi-Resume Management & Local Persistence
- **Multiple Saved Resumes**: Create, rename, duplicate, and switch between multiple resume versions.
- **100% Client-Side Privacy**: Data persists automatically in `localStorage`.
- **Undo / Redo & JSON Backup**: Full history stack for seamless editing with JSON export/import capabilities.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework:** React 18+ with Vite & TypeScript
- **Styling:** Tailwind CSS v4 with custom dark glassmorphic panels
- **Animations:** Motion (`motion/react`)
- **Icons:** Lucide React
- **AI Engine:** Google Gemini API (`@google/genai` SDK via Express proxy server)
- **PDF Generation:** `html2canvas` & `jspdf` with `oklch` color sanitization engine
- **Server Environment:** Express.js (Node.js) on Cloud Run

---

## 📂 Project Structure

```text
├── server.ts                    # Express backend with Gemini API proxy & Vite middleware
├── src/
│   ├── App.tsx                  # Primary application entry & global state manager
│   ├── index.css                # Global styles, Tailwind directives & dark/light overrides
│   ├── types/
│   │   └── resume.ts            # TypeScript interfaces for Resume data & templates
│   ├── utils/
│   │   ├── pdfExport.ts         # PDF generation utility with OKLCH sanitization
│   │   └── resumeStorage.ts     # LocalStorage state persistence engine
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.tsx       # Top navigation, multi-resume selector & export menu
│   │   │   ├── Footer.tsx       # Application footer
│   │   │   └── Toast.tsx        # Notification toast manager
│   │   ├── builder/
│   │   │   ├── ResumeBuilderWorkspace.tsx # Split-screen editor & live canvas
│   │   │   └── FormSections.tsx           # Form controls for personal, exp, edu, skills
│   │   └── templates/
│   │       └── ResumeTemplateRenderer.tsx # Dynamic template rendering engine
│   └── pages/
│       ├── HomePage.tsx         # Hero page with feature highlights & CTA
│       ├── TemplatesGalleryPage.tsx # Template marketplace & live inspector
│       ├── TipsPage.tsx         # ATS resume guide & action verbs cheat sheet
│       ├── AboutPage.tsx        # Technical overview & platform privacy details
│       └── ContactPage.tsx      # Interactive contact form
└── package.json                 # Dependencies & scripts