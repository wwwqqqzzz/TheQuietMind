
import React from 'react';
import { ViewState, BlogPost, Book } from '../types/index';
import { useLanguage } from '../contexts/LanguageContext';
import { StaticContainer } from '../components/ui/StaticContainer';
import { LotusIcon } from '../components/Icons';
import { ShelfBook } from '../components/ui/ShelfBook';

const HomeView = ({ setView, latestPost, libraryBooks }: { setView: (v: ViewState) => void, latestPost: BlogPost, libraryBooks: Book[] }) => {
    const { t, resolveText, formatDate } = useLanguage();

    return (
    <div className="space-y-16 md:space-y-32 lg:space-y-48 max-w-4xl mx-auto">
        <section className="text-center pt-12 md:pt-32 lg:pt-48 space-y-8 md:space-y-16">
        <div>
            <LotusIcon className="w-12 h-12 md:w-16 md:h-16 mx-auto text-[var(--text-faint)] mb-6 md:mb-10" />
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif text-[var(--text-main)] tracking-tight leading-none px-4">{t('app.title')}</h1>
        <div className="w-16 h-px bg-[var(--border-strong)] mx-auto"></div>
        </section>

        <section className="grid grid-cols-1 gap-12 md:gap-24 lg:gap-32">
        <StaticContainer>
            <div className="flex items-center justify-between mb-8 md:mb-16 border-b border-[var(--border-main)] pb-4">
                <h2 className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-muted)] font-bold">{t('section.latest_reflection')}</h2>
                <button onClick={() => setView(ViewState.JOURNAL)} className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)]">{t('nav.index')}</button>
            </div>
            {latestPost ? (
            <div className="space-y-6 md:space-y-8 cursor-pointer group" onClick={() => setView(ViewState.JOURNAL)}>
                <h3 className="text-3xl md:text-5xl font-serif text-[var(--text-main)] leading-tight group-hover:opacity-80">{resolveText(latestPost.title)}</h3>
                <p className="text-[var(--text-body)] font-serif text-xl md:text-2xl leading-loose opacity-80 group-hover:opacity-100">{resolveText(latestPost.excerpt)}</p>
                <div className="flex items-center gap-6 pt-4 md:pt-8">
                    <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-[0.2em]">{formatDate(latestPost.date)}</span>
                </div>
            </div>
            ) : (
                <div>Loading...</div>
            )}
        </StaticContainer>
        </section>

        <section>
            <StaticContainer>
            <div className="flex items-center justify-between mb-12 md:mb-20 border-b border-[var(--border-main)] pb-4">
                <h2 className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-muted)] font-bold">{t('section.recent_reading')}</h2>
                <button onClick={() => setView(ViewState.LIBRARY)} className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)]">{t('nav.library')}</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
                {libraryBooks.slice(0, 4).map((book, idx) => (
                    <ShelfBook 
                        key={book.id} 
                        book={book} 
                        onClick={() => setView(ViewState.LIBRARY)} 
                    />
                ))}
            </div>
            </StaticContainer>
        </section>

        <StaticContainer>
        <section className="bg-[var(--bg-secondary)] border border-[var(--border-main)] p-8 md:p-16 lg:p-24 text-center space-y-8 md:space-y-10 mx-0 hover:shadow-[0px_10px_30px_rgba(0,0,0,0.03)]">
            <h2 className="text-2xl md:text-3xl font-serif text-[var(--text-main)]">{t('section.archives')}</h2>
            <p className="text-[var(--text-muted)] max-w-prose mx-auto font-serif text-lg md:text-xl leading-relaxed">
            {t('section.archives_desc')}
            </p>
            <button onClick={() => setView(ViewState.DIRECTORY)} className="border border-[var(--border-main)] text-[var(--text-body)] px-8 md:px-10 py-3 uppercase text-[10px] tracking-[0.2em] hover:border-[var(--border-strong)] hover:text-[var(--text-main)]">
            {t('btn.open_directory')}
            </button>
        </section>
        </StaticContainer>
    </div>
    );
};

export default HomeView;
