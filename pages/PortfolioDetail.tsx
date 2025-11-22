
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { INITIAL_PORTFOLIO_ITEMS } from '../data/index';

export const PortfolioDetailView = ({ itemId, onBack }: { itemId: string | null, onBack: () => void }) => {
  const item = INITIAL_PORTFOLIO_ITEMS.find(i => i.id === itemId);
  const { t, resolveText } = useLanguage();
  if (!item) return <div>Item not found.</div>;

  return (
    <div className="pb-24 md:pb-32 pt-6 md:pt-12">
       <button onClick={onBack} className="mb-16 md:mb-32 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center gap-3">
        &larr; {t('nav.portfolio')}
      </button>
      <div className="max-w-6xl mx-auto">
         <div className="w-full bg-[var(--bg-hover)] mb-12 md:mb-20 border border-[var(--border-main)] p-4 md:p-8">
            <img src={item.thumbnailUrl} alt={resolveText(item.title)} className="w-full h-auto object-cover" style={{ filter: 'var(--img-filter)', opacity: 'var(--img-opacity)' }} />
         </div>
         <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
            <div className="md:col-span-4 space-y-8 md:space-y-10">
                  <div>
                      <h4 className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3">{t('label.category')}</h4>
                      <p className="font-serif text-xl md:text-2xl text-[var(--text-main)]">{item.category}</p>
                  </div>
                  <div>
                      <h4 className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3">{t('label.year')}</h4>
                      <p className="font-serif text-xl md:text-2xl text-[var(--text-main)]">{item.year}</p>
                  </div>
                  <div>
                      <h4 className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4">{t('label.tools')}</h4>
                      <div className="flex flex-wrap gap-3">
                        {item.tools.map(t => <span key={t} className="text-xs border border-[var(--border-main)] px-3 py-1 text-[var(--text-muted)]">{t}</span>)}
                      </div>
                  </div>
            </div>
            <div className="md:col-span-8 space-y-10 md:space-y-16">
                 <h1 className="text-4xl md:text-6xl font-serif text-[var(--text-main)] leading-none">{resolveText(item.title)}</h1>
                 <p className="text-2xl md:text-3xl font-serif text-[var(--text-body)] italic leading-relaxed">{resolveText(item.description)}</p>
                 <div className="h-px bg-[var(--border-main)] w-20"></div>
                 <div className="font-serif text-[var(--text-body)] text-lg md:text-xl leading-loose">
                   <p>{resolveText(item.reflection)}</p>
                 </div>
            </div>
         </div>
      </div>
    </div>
  );
};
