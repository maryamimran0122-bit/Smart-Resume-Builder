import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Download, Zap, Star, ChevronDown } from 'lucide-react';
import { TemplateId } from '../types/resume';

interface HomePageProps {
  onStartBuilding: (templateId?: TemplateId) => void;
  onSelectGallery: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onStartBuilding, onSelectGallery }) => {
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);

  const faqs = [
    {
      q: 'Is VITA.AI completely free to use?',
      a: 'Yes! VITA.AI is 100% client-persisted with instant PDF exports, unlimited resume creation, and zero paywalls.'
    },
    {
      q: 'Will my resume pass ATS (Applicant Tracking Systems)?',
      a: 'Absolutely. All 8 templates are engineered according to strict ATS parsing guidelines with standard font hierarchies and text structures.'
    },
    {
      q: 'How does the Gemini AI Optimizer work?',
      a: 'The built-in Gemini AI evaluates your resume content, converts bullet points into high-impact metric statements, fixes grammar, and provides a real-time strength score.'
    },
    {
      q: 'Is my personal data safe and private?',
      a: 'Your data never leaves your browser. All resume data is stored locally in your browser localStorage, ensuring total privacy.'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen text-slate-200 space-y-20 pb-20 overflow-x-hidden"
    >
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-12 px-6 max-w-6xl mx-auto text-center space-y-8">
        {/* Glow Effects */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[250px] bg-fuchsia-600/15 rounded-full blur-[120px] pointer-events-none" />

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-400 text-xs font-semibold backdrop-blur-md shadow-lg shadow-indigo-500/10"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Next-Gen Smart Resume Studio for 2026</span>
        </motion.div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.15]">
          Create Professional Resumes <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-fuchsia-400 bg-clip-text text-transparent">
            In Minutes with AI
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
          Craft ATS-tested, award-winning resumes with real-time preview, intelligent strength scoring, modern templates, and instant high-res PDF downloads.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onStartBuilding()}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl text-sm font-bold flex items-center gap-2 shadow-2xl shadow-indigo-500/30 transition-all"
          >
            <span>Build Resume Now</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSelectGallery}
            className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl text-sm font-bold backdrop-blur-md transition-all hover:border-white/30"
          >
            Explore Templates
          </motion.button>
        </div>

        {/* Feature Pill Stats */}
        <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-2xl glass-panel text-center">
            <span className="text-2xl font-black text-white block">100%</span>
            <span className="text-xs text-slate-400 font-medium">ATS Pass Guarantee</span>
          </div>
          <div className="p-4 rounded-2xl glass-panel text-center">
            <span className="text-2xl font-black text-indigo-400 block">8 Pro</span>
            <span className="text-xs text-slate-400 font-medium">Resume Templates</span>
          </div>
          <div className="p-4 rounded-2xl glass-panel text-center">
            <span className="text-2xl font-black text-purple-400 block">Gemini AI</span>
            <span className="text-xs text-slate-400 font-medium">Content Enhancer</span>
          </div>
          <div className="p-4 rounded-2xl glass-panel text-center">
            <span className="text-2xl font-black text-emerald-400 block">Vector PDF</span>
            <span className="text-xs text-slate-400 font-medium">High Res Downloader</span>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="px-6 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">Engineered for High-Converting Career Growth</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">Everything you need to beat automated resume filters and impress hiring managers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 rounded-3xl glass-panel glass-panel-hover space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Live Instant Preview</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Watch your resume transform in real-time as you type. Custom colors, typography, and section order reflect immediately.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 rounded-3xl glass-panel glass-panel-hover space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">AI Content Assistant</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Powered by Google Gemini to convert plain bullet points into metric-rich achievement statements in one click.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 rounded-3xl glass-panel glass-panel-hover space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Download className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Vector PDF Export</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generate crisp, print-ready PDF files formatted strictly for A4/Letter papers with complete typography preservation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Loved by Software Engineers & Designers</h2>
          <p className="text-xs text-slate-400">Join thousands of job seekers hired at top global tech companies.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl glass-panel space-y-3 text-xs">
            <div className="flex text-amber-400 gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
            </div>
            <p className="text-slate-300 italic">"The modern templates and AI bullet suggestions helped me land interviews at Google and Stripe within two weeks!"</p>
            <div>
              <span className="font-bold text-white block">Marcus Vance</span>
              <span className="text-[10px] text-slate-500">Senior Staff Engineer</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl glass-panel space-y-3 text-xs">
            <div className="flex text-amber-400 gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
            </div>
            <p className="text-slate-300 italic">"The drag and drop section ordering and local JSON export saved me hours of reformatting. Best builder on the web."</p>
            <div>
              <span className="font-bold text-white block">Elena Rostova</span>
              <span className="text-[10px] text-slate-500">Lead Product Designer</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl glass-panel space-y-3 text-xs">
            <div className="flex text-amber-400 gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
            </div>
            <p className="text-slate-300 italic">"No paywalls, zero lag, and instant PDF download. The ATS score analyzer gave me super clear tips."</p>
            <div>
              <span className="font-bold text-white block">David Chen</span>
              <span className="text-[10px] text-slate-500">Full Stack Developer</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="px-6 max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-2xl glass-panel overflow-hidden text-xs">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left font-semibold text-white flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="p-4 pt-0 text-slate-400 leading-relaxed border-t border-white/5 bg-black/20">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};
