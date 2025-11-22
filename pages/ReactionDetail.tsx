
import React from 'react';
import { Reaction } from '../types/index';
import { useLanguage } from '../contexts/LanguageContext';

export const ReactionDetailView = ({ reactionId, onBack, reactions }: { reactionId: string | null, onBack: () => void, reactions: Reaction[] }) => {
    const reaction = reactions.find(r => r.id === reactionId);
    const { t, resolveText, formatDate } = useLanguage();
    if (!reaction) return <div>Reaction not found.</div>;

    return (
        <div className="pb-24 md:pb-32 pt-6 md:pt-12 max-w-5xl mx-auto">
            <button onClick={onBack} className="mb-16 md:mb-32 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center gap-3">
                &larr; {t('nav.reactions')}
            </button>

            <div className="space-y-12 md:space-y-24">
                <div className="w-full bg-[var(--bg-hover)] p-4 md:p-6 border border-[var(--border-main)]">
                     <img src={reaction.imageUrl} alt={reaction.title} className="w-full h-auto object-cover" style={{ filter: 'var(--img-filter)', opacity: 'var(--img-opacity)' }} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
                    <div className="md:col-span-4 space-y-8 md:space-y-10 border-b md:border-b-0 md:border-r border-[var(--border-main)] pb-12 md:pb-0 md:pr-10">
                             <h1 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] leading-tight">{reaction.title}</h1>
                             <p className="text-[var(--text-muted)] font-serif italic text-xl md:text-2xl">{resolveText(reaction.creator)}</p>
                             <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-faint)]">{formatDate(reaction.dateExperienced)}</p>
                             <div className="pt-10 mt-10 border-t border-[var(--border-main)]">
                                <h4 className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4">{t('label.summary')}</h4>
                                <p className="text-base md:text-lg font-serif text-[var(--text-body)] leading-relaxed">{resolveText(reaction.summary)}</p>
                             </div>
                    </div>
                    <div className="md:col-span-8">
                            <div className="font-serif text-[var(--text-main)] text-xl md:text-2xl leading-[2.2]">
                                <p>{resolveText(reaction.reflection)}</p>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
