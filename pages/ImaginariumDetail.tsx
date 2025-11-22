
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { WandIcon } from '../components/Icons';
import { CategoryLabel } from '../components/ui/CategoryLabel';
import { TagPill } from '../components/ui/TagPill';
import { INITIAL_INSPIRATION_ITEMS } from '../data/index';

export const ImaginariumDetailView = ({ itemId, onBack, onEdit }: { itemId: string | null, onBack: () => void, onEdit: (url: string) => void }) => {
  const item = INITIAL_INSPIRATION_ITEMS.find(i => i.id === itemId);
  const { t, resolveText } = useLanguage();
  if (!item) return <div>Item not found</div>;
  
  return (
    <div className="max-w-4xl mx-auto pt-12 md:pt-24 pb-32 text-center">
       <button onClick={onBack} className="mb-16 md:mb-24 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)]">
        &larr; {t('btn.return')}
      </button>
      <div className="bg-[var(--bg-card)] p-6 md:p-20 border border-[var(--border-main)] relative group shadow-[5px_5px_0px_rgba(0,0,0,0.02)]">
         {item.type === 'Image' && (
            <button 
              onClick={() => onEdit(item.content)}
              className="absolute top-6 right-6 bg-[var(--text-main)] text-[var(--bg-main)] p-3 opacity-0 group-hover:opacity-100"
              title="Edit"
            >
               <WandIcon className="w-5 h-5" />
            </button>
         )}
         <div className="mb-10 md:mb-16">
           {item.type === 'Image' && <img src={item.content} alt="Inspiration" className="w-full h-auto border border-[var(--border-main)] p-4" style={{ filter: 'var(--img-filter)', opacity: 'var(--img-opacity)' }} />}
           {item.type === 'Color' && <div className="w-full h-60 md:h-80 border border-[var(--border-main)]" style={{ backgroundColor: item.content }}></div>}
           {item.type === 'Quote' && <h2 className="text-2xl md:text-4xl font-serif italic text-[var(--text-main)] leading-relaxed">"{item.content}"</h2>}
           {item.type === 'Note' && <p className="text-xl md:text-3xl font-serif text-[var(--text-main)] leading-relaxed">{item.content}</p>}
         </div>
         <div className="space-y-8 md:space-y-10 text-left border-t border-[var(--border-main)] pt-8 md:pt-12">
            <div className="flex items-center gap-4 mb-4">
              <CategoryLabel label={item.category} />
              {item.tags && item.tags.map(t => <TagPill key={t} label={t} />)}
            </div>
            {item.source && <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)]">{t('label.source')}: {item.source}</p>}
            <div className="bg-[var(--bg-secondary)] p-6 md:p-8 border border-[var(--border-main)]">
                 <p className="font-serif text-[var(--text-body)] italic text-lg md:text-xl mb-4">"{resolveText(item.notes)}"</p>
                 <p className="font-serif text-[var(--text-main)] text-base md:text-lg">{t('label.why')}: {resolveText(item.why)}</p>
            </div>
         </div>
      </div>
    </div>
  );
};
