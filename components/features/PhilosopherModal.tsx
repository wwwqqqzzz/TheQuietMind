
import React, { useState } from 'react';
import { BrainIcon } from '../Icons';
import { useLanguage } from '../../contexts/LanguageContext';
import { askPhilosopher } from '../../services/geminiService';

export const PhilosopherModal = ({ onClose }: { onClose: () => void }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [thinking, setThinking] = useState(false);
  const { t } = useLanguage();

  const ask = async () => {
    if(!query) return;
    setThinking(true);
    try {
      const text = await askPhilosopher(query);
      setResponse(text);
    } catch(e) {
      setResponse("The silence remains unbroken.");
    } finally {
      setThinking(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[var(--bg-main)] bg-opacity-95 backdrop-blur-sm z-50 flex items-center justify-center p-6 md:p-8">
      <div className="max-w-2xl w-full space-y-8 md:space-y-12 text-center">
        <BrainIcon className="w-6 h-6 text-[var(--border-main)] mx-auto" />
        <h2 className="text-xl font-serif text-[var(--text-main)] tracking-widest uppercase">{t('label.ask_sage')}</h2>
        {!response ? (
          <div className="space-y-6 md:space-y-10">
            <textarea 
              className="w-full bg-transparent border-b border-[var(--border-main)] text-[var(--text-main)] p-4 font-serif focus:outline-none focus:border-[var(--border-strong)] h-32 md:h-40 resize-none text-xl md:text-2xl placeholder-[var(--text-faint)] text-center leading-relaxed"
              placeholder={t('label.sage_placeholder')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="flex justify-center gap-8 md:gap-12">
              <button onClick={onClose} className="text-[var(--text-muted)] hover:text-[var(--text-main)] uppercase text-[10px] tracking-[0.2em]">{t('btn.return')}</button>
              <button 
                onClick={ask}
                disabled={thinking || !query}
                className="text-[var(--text-main)] border border-[var(--border-strong)] px-6 md:px-8 py-3 uppercase text-[10px] tracking-[0.2em] hover:bg-[var(--text-main)] hover:text-[var(--bg-main)] disabled:opacity-50"
              >
                {thinking ? '[ ... ]' : t('btn.inquire')}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8 md:space-y-12">
            <div className="font-serif leading-[2.2] text-[var(--text-body)] text-left text-lg md:text-xl max-h-[50vh] md:max-h-[60vh] overflow-y-auto pr-6 custom-scrollbar">
              {response}
            </div>
            <div className="flex justify-center gap-8 md:gap-12 border-t border-[var(--border-main)] pt-10">
                <button onClick={() => { setResponse(null); setQuery(''); }} className="text-[var(--text-muted)] hover:text-[var(--text-main)] uppercase text-[10px] tracking-[0.2em]">{t('label.ask_sage')}</button>
                <button onClick={onClose} className="text-[var(--text-muted)] hover:text-[var(--text-main)] uppercase text-[10px] tracking-[0.2em]">{t('btn.close')}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
