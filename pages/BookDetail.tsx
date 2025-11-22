
import React from 'react';
import { Book } from '../types/index';
import { useLanguage } from '../contexts/LanguageContext';
import { StaticContainer } from '../components/ui/StaticContainer';
import { TagPill } from '../components/ui/TagPill';

export const BookDetailView = ({ bookId, onBack, books }: { bookId: string | null, onBack: () => void, books: Book[] }) => {
  const book = books.find(b => b.id === bookId);
  const { t, resolveText } = useLanguage();
  if (!book) return <div>Book not found.</div>;

  return (
    <div className="pb-24 md:pb-32 pt-6 md:pt-12 max-w-6xl mx-auto">
       <button onClick={onBack} className="mb-16 md:mb-32 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center gap-3">
        &larr; {t('nav.library')}
      </button>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-start">
        <div className="md:col-span-4 lg:col-span-3 space-y-6 md:space-y-10 md:sticky md:top-40">
           <div className="w-full border border-[var(--border-main)] p-4 bg-[var(--bg-card)] shadow-[5px_5px_15px_rgba(0,0,0,0.05)] max-w-xs mx-auto md:max-w-none">
              <img src={book.coverUrl} alt={book.title} className="w-full h-auto object-cover" style={{ filter: 'var(--img-filter)', opacity: 'var(--img-opacity)' }} />
           </div>
           <div className="space-y-4 md:space-y-6 pt-4 md:pt-6 text-center md:text-left">
              <div>
                <h4 className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-2">Author</h4>
                <p className="font-serif text-lg md:text-xl text-[var(--text-main)]">{resolveText(book.author)}</p>
              </div>
              <div>
                <h4 className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-2">Finished</h4>
                <p className="font-serif text-lg md:text-xl text-[var(--text-main)]">{book.dateFinished}</p>
              </div>
           </div>
        </div>

        <div className="md:col-span-8 lg:col-span-9 space-y-12 md:space-y-20">
           <StaticContainer>
             <div>
               <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[var(--text-main)] mb-8 md:mb-16 leading-none">{book.title}</h1>
               <div className="p-6 md:p-12 border-l border-[var(--border-main)]">
                  <p className="text-xl md:text-3xl font-serif text-[var(--text-body)] leading-relaxed italic">
                    {resolveText(book.reflection)}
                  </p>
               </div>
             </div>
           </StaticContainer>
           
            <div className="space-y-8 md:space-y-16">
              {book.quotes.map((quote, idx) => (
                  <blockquote key={idx} className="font-serif text-xl md:text-2xl text-[var(--text-main)] leading-relaxed pl-6 md:pl-12 hover:opacity-70">
                    “{resolveText(quote)}”
                  </blockquote>
              ))}
            </div>

            <div className="pt-12 md:pt-16 border-t border-[var(--border-main)]">
                 <h4 className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-6">{t('label.tags')}</h4>
                 <div className="flex flex-wrap gap-4">
                   {book.tags.map(t => <TagPill key={t} label={t} />)}
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};
