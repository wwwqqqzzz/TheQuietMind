
import React from 'react';
import { ViewState } from '../types/index';
import { useLanguage } from '../contexts/LanguageContext';
import { LotusIcon } from '../components/Icons';

export const AboutView = ({ setView }: { setView: (v: ViewState) => void }) => {
  const { t } = useLanguage();
  return (
    <div className="max-w-xl mx-auto py-24 md:py-48 text-center space-y-12 md:space-y-16">
        <div className="w-32 h-32 md:w-40 md:h-40 border border-[var(--border-main)] mx-auto flex items-center justify-center bg-[var(--bg-card)]">
            <LotusIcon className="w-10 h-10 md:w-12 md:h-12 text-[var(--text-muted)]" />
        </div>
        <div>
            <h1 className="text-3xl md:text-4xl font-serif text-[var(--text-main)] mb-4">{t('about.gardener')}</h1>
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--text-muted)]">2025</p>
        </div>
        <p className="font-serif text-[var(--text-body)] text-lg md:text-xl leading-[2.2]">
            {t('about.text')}
        </p>
        <div className="pt-16 md:pt-20 border-t border-[var(--border-main)]">
            <button onClick={() => setView(ViewState.HOME)} className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)]">
                {t('btn.return')}
            </button>
        </div>
    </div>
  );
};
