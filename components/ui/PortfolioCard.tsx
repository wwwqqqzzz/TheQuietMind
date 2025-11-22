
import React from 'react';
import { PortfolioItem } from '../../types/index';
import { useLanguage } from '../../contexts/LanguageContext';

export const PortfolioCard = ({ item, onClick }: { item: PortfolioItem, onClick: () => void }) => {
    const { resolveText } = useLanguage();
    return (
        <div onClick={onClick} className="cursor-pointer group">
            <div className="aspect-square w-full bg-[var(--bg-hover)] border border-[var(--border-main)] p-6 md:p-8 flex items-center justify-center mb-6 group-hover:border-[var(--border-strong)] overflow-hidden relative">
                <img 
                  src={item.thumbnailUrl} 
                  alt={resolveText(item.title)} 
                  className="w-full h-full object-cover"
                  style={{ filter: 'var(--img-filter)', opacity: 'var(--img-opacity)' }}
                />
            </div>
            <div className="flex justify-between items-baseline">
                <h3 className="text-[var(--text-main)] font-serif text-lg md:text-xl group-hover:text-[var(--text-main)] opacity-80 group-hover:opacity-100">{resolveText(item.title)}</h3>
                <span className="text-[9px] text-[var(--text-muted)] uppercase tracking-[0.2em]">{item.year}</span>
            </div>
        </div>
    );
};
