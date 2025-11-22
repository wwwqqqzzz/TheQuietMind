
import React from 'react';
import { Book } from '../../types/index';

export const ShelfBook = ({ book, onClick, highlight }: { book: Book, onClick: () => void, highlight?: boolean }) => {
    return (
        <div 
            onClick={onClick} 
            className="group cursor-pointer relative w-full aspect-[2/3] bg-[var(--bg-card)] p-1 hover:brightness-95"
        >
            <div className="w-full h-full relative overflow-hidden shadow-[2px_3px_5px_rgba(0,0,0,0.08)] border border-[var(--border-main)]">
            <img 
                src={book.coverUrl} 
                alt={book.title} 
                className="w-full h-full object-cover" 
                style={{ filter: 'var(--img-filter)', opacity: 'var(--img-opacity)' }}
            />
            </div>
            <div className="mt-3 text-center">
            <p className="text-[10px] uppercase text-[var(--text-muted)] truncate group-hover:text-[var(--text-main)]">{book.title}</p>
            </div>
        </div>
    );
};
