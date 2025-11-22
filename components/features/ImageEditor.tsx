
import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { editImage } from '../../services/geminiService';

export const ImageEditor = ({ imageUrl, onClose }: { imageUrl: string, onClose: () => void }) => {
  const [prompt, setPrompt] = useState('');
  const [currentImage, setCurrentImage] = useState(imageUrl);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleEdit = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const mimeType = currentImage.split(';')[0].split(':')[1];
      const newImage = await editImage(currentImage, mimeType, prompt);
      setCurrentImage(newImage);
    } catch (e) {
      alert("The canvas resisted change.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[var(--bg-main)] bg-opacity-95 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6 md:p-8">
      <div className="w-full max-w-4xl h-full flex flex-col gap-6 md:gap-10 py-6 md:py-12">
        <div className="flex-grow relative flex items-center justify-center border border-[var(--border-main)] p-6 md:p-12 bg-[var(--bg-card)] shadow-lg">
          <img src={currentImage} alt="Editing" className="max-w-full max-h-full object-contain" style={{ filter: 'var(--img-filter)', opacity: 'var(--img-opacity)' }} />
          {loading && <div className="absolute inset-0 bg-[var(--bg-main)] bg-opacity-90 flex items-center justify-center z-10"><span className="text-[var(--text-main)] font-serif italic text-2xl tracking-wider">[ ... ]</span></div>}
        </div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center w-full border-t border-[var(--border-main)] pt-6 md:pt-10">
           <input 
             type="text"
             placeholder={t('label.image_prompt')}
             className="flex-grow bg-transparent text-[var(--text-main)] py-3 font-serif focus:outline-none border-b border-transparent focus:border-[var(--border-strong)] placeholder-[var(--text-faint)] text-lg md:text-xl w-full"
             value={prompt}
             onChange={(e) => setPrompt(e.target.value)}
           />
           <div className="flex gap-6 md:gap-8 shrink-0 w-full md:w-auto justify-center md:justify-end">
                <button 
                    onClick={handleEdit}
                    disabled={loading || !prompt}
                    className="text-[var(--text-main)] border border-[var(--border-strong)] px-6 md:px-8 py-3 uppercase text-[10px] tracking-[0.2em] hover:bg-[var(--text-main)] hover:text-[var(--bg-main)] disabled:opacity-50"
                >
                    {t('btn.transform')}
                </button>
                <button onClick={onClose} className="text-[var(--text-muted)] hover:text-[var(--text-main)] uppercase text-[10px] tracking-[0.2em] px-4">{t('btn.close')}</button>
           </div>
        </div>
      </div>
    </div>
  );
};
