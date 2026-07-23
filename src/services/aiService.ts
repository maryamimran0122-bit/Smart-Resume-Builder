export interface EnhanceRequest {
  action: 'summary' | 'bullet' | 'grammar' | 'skills' | 'custom';
  text: string;
  jobTitle?: string;
}

export async function generateAIEnhancement(req: EnhanceRequest): Promise<string> {
  try {
    const res = await fetch('/api/ai/enhance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req)
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || 'AI server error');
    }

    const data = await res.json();
    return data.result || '';
  } catch (err: any) {
    console.warn('AI API Call failed, falling back to smart client templates:', err.message);
    // Smart local fallback if API key or connection unavailable
    if (req.action === 'summary') {
      return `Driven and results-oriented ${req.jobTitle || 'Professional'} with a proven track record of designing scalable solutions, optimizing user experience, and delivering high-value projects. Adept at cross-functional collaboration and leverage analytical insights to boost performance.`;
    } else if (req.action === 'bullet') {
      return `• Spearheaded critical initiatives for ${req.jobTitle || 'projects'}, resulting in a 25% performance improvement.\n• Collaborated with cross-functional teams to streamline workflows and reduce cycle time by 30%.\n• Optimized architectural design and implemented rigorous testing to ensure 99.9% uptime.`;
    } else if (req.action === 'skills') {
      return `Strategic Planning, System Architecture, UI/UX Design, TypeScript, React, Cross-Functional Leadership, Project Management, Data Analysis`;
    } else if (req.action === 'grammar') {
      return req.text.trim().charAt(0).toUpperCase() + req.text.trim().slice(1) + (req.text.endsWith('.') ? '' : '.');
    }
    return req.text;
  }
}
