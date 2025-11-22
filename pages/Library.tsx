
import React from 'react';
import { ViewState, Book } from '../types/index';
import { useLanguage } from '../contexts/LanguageContext';
import { StaticContainer } from '../components/ui/StaticContainer';
import { ShelfBook } from '../components/ui/ShelfBook';

const LibraryView = ({ setView, setBookId, books }: { setView: (v: ViewState) => void, setBookId: (id: string) => void, books: Book[] }) => {
  const currentYearBooks = books.filter(b => b.sortDate.startsWith('2025'));
  const recommendedBooks = books.slice(0, 8); 
  const { t } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto pt-6 md:pt-12 pb-24 md:pb-32">
       <StaticContainer>
         <div className="flex flex-col md:flex-row justify-between items-baseline mb-8 md:mb-12 border-b border-[var(--border-main)] pb-4 gap-4">
            <div className="flex items-baseline gap-6">
               <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-[var(--text-main)]">2025</h2>
               <span className="hidden md:inline text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">{t('label.current_reading')}</span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">{t('label.total_reviews')} {currentYearBooks.length}</span>
         </div>
       </StaticContainer>
       
       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 md:gap-x-6 gap-y-8 md:gap-y-12 mb-16 md:mb-32">
          {currentYearBooks.map((book, idx) => (
                <ShelfBook 
                  key={book.id} 
                  book={book} 
                  onClick={() => { setBookId(book.id); setView(ViewState.BOOK_DETAIL); }} 
                  highlight={idx === 0} 
                />
          ))}
       </div>

       <StaticContainer>
         <div className="flex items-center gap-6 mb-16 md:mb-32">
            <button className="bg-[var(--bg-secondary)] px-6 md:px-8 py-3 md:py-4 text-[10px] uppercase tracking-[0.2em] text-[var(--text-body)] border border-[var(--border-main)] hover:border-[var(--border-strong)] hover:text-[var(--text-main)] flex items-center gap-3 group">
               {t('btn.view_full_year')} <span className="text-lg">→</span>
            </button>
            <span className="font-serif text-2xl md:text-3xl text-[var(--text-faint)]">2024</span>
         </div>
       </StaticContainer>

       <StaticContainer>
         <div className="flex justify-between items-baseline mb-8 md:mb-16 border-b border-[var(--border-main)] pb-4">
            <h2 className="text-3xl md:text-4xl font-serif text-[var(--text-main)]">{t('label.recommended')}</h2>
             <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">{recommendedBooks.length} {t('label.total_books')}</span>
         </div>
       </StaticContainer>
       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 md:gap-x-6 gap-y-8 md:gap-y-12">
          {recommendedBooks.map((book, idx) => (
                <ShelfBook 
                  key={`rec-${book.id}`} 
                  book={book} 
                  onClick={() => { setBookId(book.id); setView(ViewState.BOOK_DETAIL); }} 
                />
          ))}
       </div>
    </div>
  );
};

export default LibraryView;
