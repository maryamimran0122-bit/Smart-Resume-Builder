import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Send, CheckCircle2, MessageSquare, User } from 'lucide-react';

interface ContactPageProps {
  onToast: (msg: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onToast }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      onToast('Please fill out all fields');
      return;
    }
    setSubmitted(true);
    onToast('Thank you! Your message has been sent successfully.');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto px-6 py-10 space-y-8 text-slate-200"
    >
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-semibold">
          <Mail className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">We'd Love to Hear From You</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Have feedback, template requests, or questions? Send us a message!
        </p>
      </div>

      {submitted ? (
        <div className="p-8 rounded-3xl bg-emerald-950/30 border border-emerald-500/30 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white">Message Sent Successfully!</h2>
          <p className="text-xs text-slate-300">Our support team will respond to {email} within 24 hours.</p>
          <button
            onClick={() => { setSubmitted(false); setMessage(''); }}
            className="px-5 py-2 bg-white/10 hover:bg-white/20 text-xs font-semibold rounded-xl text-white"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl glass-panel space-y-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <User className="w-3 h-3 text-indigo-400" /> Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Sterling"
              className="glass-input w-full rounded-xl px-3 py-2 text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Mail className="w-3 h-3 text-indigo-400" /> Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              className="glass-input w-full rounded-xl px-3 py-2 text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <MessageSquare className="w-3 h-3 text-indigo-400" /> Message
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we improve VITA.AI for you?"
              className="glass-input w-full rounded-xl px-3 py-2 text-xs resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xl transition-all"
          >
            <Send className="w-4 h-4" /> Send Message
          </button>
        </form>
      )}
    </motion.div>
  );
};
