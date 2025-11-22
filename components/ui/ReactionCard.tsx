
import React from 'react';
import { Reaction } from '../../types/index';
import { CategoryLabel } from './CategoryLabel';
import { useLanguage } from '../../contexts/LanguageContext';

export const ReactionCard = ({ reaction, onClick }: { reaction: Reaction, onClick: () => void }) => {
    const { resolveText, formatDate } = useLanguage();
    return (
        <div onClick={onClick} className="cursor-pointer grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 py-12 md:py-16 border-b border-[var(--border-main)] last:border-0 group hover:bg-[var(--bg-hover)]">
            <div className="bg-[var(--bg-hover)] p-3 border border-[var(--border-main)] group-hover:border-[var(--border-strong)] overflow-hidden">
                <img 
                    src={reaction.imageUrl} 
                    alt={reaction.title} 
                    className="w-full h-full object-cover aspect-video"
                    style={{ filter: 'var(--img-filter)', opacity: 'var(--img-opacity)' }}
                />
            </div>
            <div className="flex flex-col justify-center space-y-6 md:space-y-8">
                <div className="space-y-3">
                    <CategoryLabel label={reaction.category} />
                    <h3 className="font-serif text-2xl md:text-3xl text-[var(--text-main)] leading-tight">{reaction.title}</h3>
                    <p className="text-sm text-[var(--text-muted)] font-serif italic">{resolveText(reaction.creator)} • {formatDate(reaction.dateExperienced)}</p>
                </div>
                <p className="text-[var(--text-body)] font-serif leading-loose text-base md:text-lg">{resolveText(reaction.summary)}</p>
            </div>
        </div>
    );
};
