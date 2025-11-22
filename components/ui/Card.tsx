
import React from 'react';
import { CategoryLabel } from './CategoryLabel';
import { useLanguage } from '../../contexts/LanguageContext';

export const Card: React.FC<{ title: string; date: string; excerpt: string; category: string; tags?: string[]; onClick: () => void }> = ({ title, date, excerpt, category, tags, onClick }) => {
    const { formatDate } = useLanguage();
    return (
        <div 
            onClick={onClick}
            className="cursor-pointer bg-transparent py-8 md:py-12 border-b border-[var(--border-main)] last:border-0 group"
        >
            <div className="flex justify-between items-start mb-4 md:mb-6">
            <CategoryLabel label={category} />
            <span className="text-[9px] text-[var(--text-faint)] uppercase tracking-[0.2em]">{formatDate(date)}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif text-[var(--text-main)] mb-4 md:mb-6 leading-tight group-hover:opacity-70">{title}</h3>
            <p className="text-[var(--text-body)] font-serif text-lg leading-relaxed mb-6 md:mb-8 opacity-80">{excerpt}</p>
            {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-3">
                {tags.map(t => <span key={t} className="text-[9px] text-[var(--text-muted)] italic tracking-wider">#{t}</span>)}
            </div>
            )}
        </div>
    );
};
