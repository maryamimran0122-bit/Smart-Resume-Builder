import React, { useState } from 'react';
import { Camera, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { PhotoShape } from '../../types/resume';

interface PhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  photoUrl: string;
  photoShape: PhotoShape;
  onUpdatePhoto: (url: string, shape: PhotoShape) => void;
}

export const PhotoUploaderModal: React.FC<PhotoModalProps> = ({
  isOpen,
  onClose,
  photoUrl,
  photoShape,
  onUpdatePhoto,
}) => {
  if (!isOpen) return null;

  const [inputUrl, setInputUrl] = useState(photoUrl);
  const [selectedShape, setSelectedShape] = useState<PhotoShape>(photoShape);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setInputUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onUpdatePhoto(inputUrl, selectedShape);
    onClose();
  };

  const handleRemove = () => {
    setInputUrl('');
    setSelectedShape('none');
    onUpdatePhoto('', 'none');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121218] border border-white/10 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 text-white">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 font-bold text-base">
            <Camera className="w-5 h-5 text-indigo-400" />
            <span>Profile Photo Settings</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Photo Preview */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-28 h-28 bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden group">
            {inputUrl ? (
              <img
                src={inputUrl}
                alt="Profile Preview"
                className={`w-full h-full object-cover ${
                  selectedShape === 'circular' ? 'rounded-full' : selectedShape === 'square' ? 'rounded-none' : 'rounded-2xl'
                }`}
              />
            ) : (
              <ImageIcon className="w-8 h-8 text-slate-500" />
            )}
          </div>

          <label className="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-semibold rounded-xl cursor-pointer transition-colors border border-white/10">
            Upload From Device
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        {/* Image URL fallback */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Or Image Web URL</label>
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="https://images.unsplash.com/photo-..."
            className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* Photo Shape options */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Photo Frame Shape</label>
          <div className="grid grid-cols-4 gap-2">
            {(['circular', 'rounded', 'square', 'none'] as PhotoShape[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSelectedShape(s)}
                className={`py-2 text-[11px] font-semibold capitalize rounded-xl border transition-all ${
                  selectedShape === s
                    ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300'
                    : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
          <button
            onClick={handleRemove}
            className="px-3 py-2 text-rose-400 hover:bg-rose-500/10 rounded-xl text-xs font-semibold flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" /> Remove Photo
          </button>

          <div className="flex gap-2">
            <button onClick={onClose} className="px-4 py-2 bg-white/5 hover:bg-white/10 text-xs font-semibold rounded-xl text-slate-300">
              Cancel
            </button>
            <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold rounded-xl text-white shadow-lg">
              Save Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
