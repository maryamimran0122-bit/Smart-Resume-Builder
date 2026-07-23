# VITA.AI Pro - Next-Gen AI-Powered Resume Builder & Studio 🚀

[![Live Website](https://img.shields.io/badge/Live_Website-resumestudio--one.vercel.app-6366f1?style=for-the-badge&logo=vercel&logoColor=white)](https://resumestudio-one.vercel.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React 18](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini API](https://img.shields.io/badge/Google_Gemini_2.5-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

---

## 🌐 Live Website URL

- **Deployed Application:**  
  👉 **[https://resumestudio-one.vercel.app/](https://resumestudio-one.vercel.app/)**

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
  - [1. Google Gemini AI Engine](#1-google-gemini-ai-engine)
  - [2. Real-Time Split-Screen Studio](#2-real-time-split-screen-studio)
  - [3. 8 ATS-Compliant Templates](#3-8-ats-compliant-templates)
  - [4. Vector PDF & Print Engine](#4-vector-pdf--print-engine)
  - [5. Multi-Resume & State Management](#5-multi-resume--state-management)
  - [6. Adaptive Glassmorphism & Light/Dark Theme](#6-adaptive-glassmorphism--lightdark-theme)
- [System Architecture](#-system-architecture)
- [File & Directory Breakdown](#-file--directory-breakdown)
- [API Routes & Server Operations](#-api-routes--server-operations)
- [Local Setup & Installation](#-local-setup--installation)
- [Deployment Guide](#-deployment-guide)
- [License](#-license)

---

## 📖 Overview

**VITA.AI Pro** is a full-stack, enterprise-grade resume builder engineered for job seekers, software engineers, product designers, and senior executives. It bridges modern AI content generation with precision typography and layout customization.

Designed with a **desktop-first split-screen workspace**, VITA.AI allows users to craft, polish, and export ATS-tested resumes in minutes. Every aspect of the application is client-persisted for total user privacy, backed by Google Gemini 2.5 server-side endpoints for bullet point enhancement, professional summary generation, and real-time resume strength analysis.

---

## ✨ Key Features

### 1. Google Gemini AI Engine
- **AI Bullet Point Enhancer**: Converts basic job duty descriptions into high-impact, metric-driven statements using Google's `@google/genai` SDK.  
  *Example:* `"Fixed bugs on website"` ➔ *"Engineered critical performance patches across 14 microservices, reducing frontend latency by 42% and raising uptime to 99.98%"*.
- **AI Summary Writer**: Analyzes target job titles and industry domain parameters to draft concise, 2-3 sentence executive summaries.
- **ATS Score & Strength Analyzer**: Calculates a real-time resume score (0–100) based on action verb frequency, word counts, section completeness, contact clarity, and ATS parser readability. Offers actionable suggestions to boost score.

### 2. Real-Time Split-Screen Studio
- **Instant Preview**: Live rendering of every keystroke, color accent change, and layout adjustment side-by-side with the editor form.
- **Drag-and-Drop Reordering**: Rearrange major sections (Experience, Education, Skills, Projects, Certifications) effortlessly.
- **Custom Section Additions**: Add arbitrary custom sections with custom title tags and bulleted lists.

### 3. 8 ATS-Compliant Templates
1. **Minimalist Clean** – Ultra-clean layout emphasizing typography, generous margins, and crisp whitespace.
2. **Corporate Executive** – Structured top banner accent engineered for corporate leadership & finance positions.
3. **Creative Portfolio** – Vibrant header card with rounded skill pill tags and modern accent highlights.
4. **Modern Split Sidebar** – Side-by-side two column layout highlighting technical skills and key metrics.
5. **Executive Luxury** – Centered luxury typography with double rule styling for senior managers & executives.
6. **ATS Optimized Plain** – Zero complex grid or graphics for 100% ATS parser accuracy across all enterprise HR systems.
7. **Academic Student** – Education, GPA, coursework, and honors featured prominently right at the top.
8. **Tech & Developer IDE** – Dark IDE theme with monospaced code fonts, repo links, and tech stack badges for engineers.

### 4. Vector PDF & Print Engine
- **OKLCH Sanitization**: Tailwind CSS v4 utilizes `oklch(...)` color definitions which standard canvas engines fail to parse. VITA.AI includes a custom DOM compute parser that normalizes all `oklch` declarations into clean RGB/RGBA equivalents prior to export.
- **Multi-Page Handling**: Automatic page height tracking prevents clipped text and maintains standard A4 dimensions (210mm x 297mm).

### 5. Multi-Resume & State Management
- **Multiple Saved Resumes**: Create and switch between distinct target resumes (e.g., *Frontend Lead Resume*, *Product Manager Resume*).
- **Client-Side Privacy**: All state is saved to `localStorage` with auto-save indicators. No database lock-in or mandatory user authentication required.
- **JSON Import/Export**: Backup entire resume states as JSON files to import on other devices.
- **Undo / Redo System**: Built-in state stack with keyboard shortcut support (`Ctrl+Z`, `Ctrl+Y`).

### 6. Adaptive Glassmorphism & Light/Dark Theme
- High-contrast, polished dark UI featuring glowing backdrop blurs and subtle glass panels.
- Full Light Mode support with custom CSS overrides ensuring crisp legibility across both light and dark display settings.

---

## 🛠️ System Architecture

```text
                     +----------------------------------+
                     |        React 18 Frontend         |
                     |  (Vite + Tailwind v4 + Motion)   |
                     +----------------------------------+
                                      |
              +-----------------------+-----------------------+
              |                                               |
     [Local Storage]                                   [Express Server]
     - Multi-Resume State                             - Port 3000 Ingress
     - Undo/Redo Stacks                               - Gemini 2.5 API
     - Customization Prefs                            - Static Asset Route
              |                                               |
              v                                               v
     [Client PDF Engine]                            [Google Gemini API]
     - html2canvas                                  - @google/genai SDK
     - jsPDF                                        - Server-side Secret Key
     - OKLCH Sanitizer
```

---

## 📁 File & Directory Breakdown

```text
.
├── server.ts                             # Custom Express backend with Gemini API proxy & Vite middleware
├── package.json                          # Build scripts, dependencies, and project metadata
├── metadata.json                         # Platform capabilities & frame permissions
├── src/
│   ├── main.tsx                          # App mount entrypoint
│   ├── App.tsx                           # Root component, routing, tab state & toast notifications
│   ├── index.css                         # Global CSS, scrollbars, glassmorphism & light/dark rules
│   ├── types/
│   │   └── resume.ts                     # TypeScript data models, Template IDs & default sample data
│   ├── utils/
│   │   ├── pdfExport.ts                  # PDF export engine with OKLCH sanitization & A4 multi-page
│   │   ├── resumeStorage.ts              # LocalStorage helper functions for multi-resume handling
│   │   └── scoreAnalyzer.ts              # Rule-based resume scoring & ATS feedback engine
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.tsx                # Navigation header, resume switcher, theme toggle & export menu
│   │   │   ├── Footer.tsx                # Brand footer with links
│   │   │   ├── ToastContainer.tsx        # Floating alert toasts
│   │   │   └── KeyboardShortcutsModal.tsx# Hotkey reference modal
│   │   ├── builder/
│   │   │   ├── ResumeBuilderWorkspace.tsx# Split-screen form & canvas workspace
│   │   │   └── forms/                    # Form components for Personal, Work, Edu, Skills, Projects, etc.
│   │   └── templates/
│   │       ├── ResumeTemplateRenderer.tsx# Dynamic template loader
│   │       └── styles/                   # 8 specialized template component layouts
│   └── pages/
│       ├── HomePage.tsx                  # Hero landing page with stats & FAQ accordion
│       ├── TemplatesGalleryPage.tsx      # Interactive template gallery & live preview inspector
│       ├── TipsPage.tsx                  # ATS optimization guide & action verb cheat sheet
│       ├── AboutPage.tsx                 # Technology overview & privacy commitment
│       └── ContactPage.tsx               # Interactive feedback contact form
└── README.md                             # Comprehensive project documentation
```

---

## ⚡ API Routes & Server Operations

The application runs a secure server-side proxy layer in `server.ts` to protect the Gemini API key from exposure to the client browser:

| Endpoint | Method | Description |
|---|---|---|
| `/api/ai/enhance-bullet` | `POST` | Takes a plain experience bullet point and returns an improved metric-focused statement via Gemini 2.5. |
| `/api/ai/generate-summary` | `POST` | Accepts job title and current skills to generate a tailored professional summary. |
| `/api/ai/analyze-score` | `POST` | Evaluates complete resume JSON structure and returns qualitative ATS suggestions. |

---

## 🚀 Local Setup & Installation

### Prerequisites
- Node.js version 18.x or higher
- npm or yarn package manager

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/vita-ai-resume-builder.git
   cd vita-ai-resume-builder
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:3000` in your web browser.

5. **Build for Production:**
   ```bash
   npm run build
   npm start
   ```

---

## 🌐 Deployment Guide

### Deploying to Vercel
1. Push your repository to GitHub / GitLab.
2. Import the repository into your **Vercel Dashboard**.
3. Add the `GEMINI_API_KEY` environment variable in Vercel project settings.
4. Set Build Command: `npm run build` and Output Directory: `dist`.
5. Deploy! Live URL: **[https://resumestudio-one.vercel.app/](https://resumestudio-one.vercel.app/)**

---

## 📄 License

Distributed under the **MIT License**. Free for commercial and non-commercial use.

---

<p align="center">
Crafted with ❤️ for global professionals seeking their dream career.
</p>