import React from 'react';
import { CustomSection, CustomSectionItem } from '../../../types/resume';
import { Plus, Trash2, Layers } from 'lucide-react';

interface CustomSectionsFormProps {
  customSections: CustomSection[];
  onChange: (sections: CustomSection[]) => void;
}

export const CustomSectionsForm: React.FC<CustomSectionsFormProps> = ({
  customSections,
  onChange
}) => {
  const handleAddSection = () => {
    const newSec: CustomSection = {
      id: `cust-${Date.now()}`,
      title: 'Publications & Speaking',
      items: [
        {
          id: `cust-item-${Date.now()}`,
          title: 'Title / Subject',
          subtitle: 'Publisher / Organization',
          date: '2025',
          description: 'Description of key takeaways...'
        }
      ]
    };
    onChange([...customSections, newSec]);
  };

  const handleRemoveSection = (id: string) => {
    onChange(customSections.filter(s => s.id !== id));
  };

  const handleAddItem = (sectionId: string) => {
    onChange(customSections.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          items: [
            ...s.items,
            {
              id: `cust-item-${Date.now()}`,
              title: '',
              subtitle: '',
              date: '',
              description: ''
            }
          ]
        };
      }
      return s;
    }));
  };

  const handleRemoveItem = (sectionId: string, itemId: string) => {
    onChange(customSections.map(s => {
      if (s.id === sectionId) {
        return { ...s, items: s.items.filter(i => i.id !== itemId) };
      }
      return s;
    }));
  };

  const handleUpdateItem = (sectionId: string, itemId: string, field: keyof CustomSectionItem, val: string) => {
    onChange(customSections.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          items: s.items.map(i => i.id === itemId ? { ...i, [field]: val } : i)
        };
      }
      return s;
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Custom Resume Sections ({customSections.length})
        </span>
        <button
          type="button"
          onClick={handleAddSection}
          className="px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Custom Section
        </button>
      </div>

      <div className="space-y-4">
        {customSections.map((sec) => (
          <div key={sec.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-white/5 gap-2">
              <input
                type="text"
                value={sec.title}
                onChange={(e) => onChange(customSections.map(s => s.id === sec.id ? { ...s, title: e.target.value } : s))}
                placeholder="Custom Section Title (e.g. Speaking, Patents, Hobbies)"
                className="glass-input flex-1 rounded-xl px-3 py-1.5 text-xs font-bold text-indigo-300"
              />
              <button
                type="button"
                onClick={() => handleRemoveSection(sec.id)}
                className="p-1.5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded-lg transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2">
              {sec.items.map((item) => (
                <div key={item.id} className="p-3 rounded-xl bg-black/30 border border-white/5 space-y-2">
                  <div className="flex justify-between items-center gap-2">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleUpdateItem(sec.id, item.id, 'title', e.target.value)}
                      placeholder="Entry Title"
                      className="glass-input flex-1 rounded-xl px-2.5 py-1 text-xs font-semibold"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(sec.id, item.id)}
                      className="p-1 text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={item.subtitle || ''}
                      onChange={(e) => handleUpdateItem(sec.id, item.id, 'subtitle', e.target.value)}
                      placeholder="Subtitle / Organization"
                      className="glass-input rounded-xl px-2.5 py-1 text-xs"
                    />
                    <input
                      type="text"
                      value={item.date || ''}
                      onChange={(e) => handleUpdateItem(sec.id, item.id, 'date', e.target.value)}
                      placeholder="Date / Year"
                      className="glass-input rounded-xl px-2.5 py-1 text-xs"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={item.description || ''}
                    onChange={(e) => handleUpdateItem(sec.id, item.id, 'description', e.target.value)}
                    placeholder="Brief description..."
                    className="glass-input w-full rounded-xl px-2.5 py-1 text-xs"
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => handleAddItem(sec.id)}
              className="w-full py-1.5 bg-white/5 hover:bg-white/10 text-xs text-slate-300 font-semibold rounded-xl border border-white/5 flex items-center justify-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Item to {sec.title || 'Section'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
