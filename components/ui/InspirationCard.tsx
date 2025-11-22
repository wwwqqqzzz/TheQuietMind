
import React from 'react';
import { InspirationItem } from '../../types/index';

export const InspirationCard = ({ item, onClick }: { item: InspirationItem, onClick: () => void }) => {
    const renderContent = () => {
        switch(item.type) {
        case 'Image':
            return (
              <img 
                src={item.content} 
                alt="Inspiration" 
                className="w-full h-auto border border-[var(--border-main)] p-3 bg-[var(--bg-card)]" 
                style={{ filter: 'var(--img-filter)', opacity: 'var(--img-opacity)' }}
              />
            );
        case 'Color':
            return <div className="w-full h-40 border border-[var(--border-main)]" style={{ backgroundColor: item.content }}></div>;
        case 'Quote':
            return <div className="p-6 md:p-8 border border-[var(--border-main)] bg-[var(--bg-card)] italic font-serif text-[var(--text-main)] text-center leading-loose text-base md:text-lg group-hover:border-[var(--border-strong)]">"{item.content}"</div>;
        case 'Note':
            return <div className="p-6 md:p-8 border border-[var(--border-main)] bg-[var(--bg-card)] font-serif text-[var(--text-body)] text-sm md:text-md leading-loose group-hover:bg-[var(--bg-hover)]">{item.content}</div>;
        default: return null;
        }
    };

    return (
        <div onClick={onClick} className="cursor-pointer break-inside-avoid mb-8 md:mb-12 opacity-90 hover:opacity-100 group">
        {renderContent()}
        </div>
    );
};
