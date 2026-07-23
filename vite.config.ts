import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { GoogleGenAI } from '@google/genai';

function aiApiPlugin(): Plugin {
  return {
    name: 'ai-studio-api-handler',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/api/ai/enhance' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const { action, text, jobTitle } = JSON.parse(body || '{}');
              const apiKey = process.env.GEMINI_API_KEY;

              if (!apiKey) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'GEMINI_API_KEY is not configured.' }));
                return;
              }

              const ai = new GoogleGenAI({
                apiKey,
                httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
              });

              let prompt = '';
              if (action === 'summary') {
                prompt = `You are an executive resume writer. Write a concise, impactful 2-3 sentence professional summary for a ${jobTitle || 'professional'}. Context: ${text || 'Experienced practitioner focused on driving impact and quality.'}. Output ONLY the refined summary text without markdown formatting or introductory comments.`;
              } else if (action === 'bullet') {
                prompt = `You are a top career coach. Transform the following experience description into 2-3 high-impact, ATS-optimized bullet points with strong action verbs and metrics: "${text}". Format each bullet point on a new line starting with "• ". Do not add commentary.`;
              } else if (action === 'grammar') {
                prompt = `You are a professional editor. Fix all grammar, spelling, and phrasing errors in this text while preserving professional tone: "${text}". Output ONLY the corrected text.`;
              } else if (action === 'skills') {
                prompt = `Suggest 8-10 high-value technical and soft skills for a ${jobTitle || 'software & design professional'}. Context: "${text}". Return as a clean, comma-separated list.`;
              } else {
                prompt = `Improve and professionalize the following resume text for a ${jobTitle || 'professional'}: "${text}".`;
              }

              const response = await ai.models.generateContent({
                model: 'gemini-3.6-flash',
                contents: prompt,
              });

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ result: response.text || '' }));
            } catch (err: any) {
              console.error('Gemini API error:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message || 'Error processing AI request' }));
            }
          });
          return;
        }
        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), aiApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
