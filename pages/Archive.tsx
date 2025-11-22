
import React, { useState, useMemo } from 'react';
import { ViewState, UnifiedContentItem } from '../types/index';
import { useLanguage } from '../contexts/LanguageContext';
import { BrainIcon } from '../components/Icons';
import { getAllContent, getMonthName } from '../utils/helpers';
import { INITIAL_FRAGMENTS, INITIAL_INSPIRATION_ITEMS, INITIAL_PORTFOLIO_ITEMS } from '../data/index';

const ArchiveView = ({ setView, setPostId, setBookId, setReactionId, setPortfolioId, setInspirationId, onOpenPhilosopher, contentData }: any) => {
    const [activeTab, setActiveTab] = useState<'Timeline' | 'Category' | 'Tags' | 'Modules'>('Timeline');
    const [searchQuery, setSearchQuery] = useState('');
    const { t, resolveText, language } = useLanguage();
    
    const allContent = useMemo(() => getAllContent(
      contentData.posts,
      contentData.books,
      contentData.reactions,
      contentData.portfolio,
      contentData.inspiration,
      contentData.fragments,
      resolveText
    ), [language, contentData]); 
    
    const displayedContent = useMemo(() => {
      if (!searchQuery) return allContent;
      const lowerQ = searchQuery.toLowerCase();
      return allContent.filter(item => 
        item.title.toLowerCase().includes(lowerQ) || 
        item.category.toLowerCase().includes(lowerQ) ||
        item.tags?.some(t => t.toLowerCase().includes(lowerQ))
      );
    }, [allContent, searchQuery]);

    const timelineGrouped = useMemo(() => {
      const groups: Record<string, Record<string, UnifiedContentItem[]>> = {};
      displayedContent.forEach(item => {
        const year = item.sortDate.split('-')[0];
        const month = getMonthName(item.sortDate, language);
        if (!groups[year]) groups[year] = {};
        if (!groups[year][month]) groups[year][month] = [];
        groups[year][month].push(item);
      });
      return groups;
    }, [displayedContent, language]);

    const categoryGrouped = useMemo(() => {
      const groups: Record<string, UnifiedContentItem[]> = {};
      displayedContent.forEach(item => {
        if (!groups[item.category]) groups[item.category] = [];
        groups[item.category].push(item);
      });
      return groups;
    }, [displayedContent]);

    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const uniqueTags = useMemo(() => {
      const tags = new Set<string>();
      allContent.forEach(item => item.tags?.forEach(t => tags.add(t)));
      return Array.from(tags).sort();
    }, [allContent]);

    const handleItemClick = (item: UnifiedContentItem) => {
      if (item.type === 'Journal') { setPostId(item.id); setView(ViewState.ARTICLE); }
      if (item.type === 'Library') { setBookId(item.id); setView(ViewState.BOOK_DETAIL); }
      if (item.type === 'Reaction') { setReactionId(item.id); setView(ViewState.REACTION_DETAIL); }
      if (item.type === 'Portfolio') { setPortfolioId(item.id); setView(ViewState.PORTFOLIO_DETAIL); }
      if (item.type === 'Inspiration') { setInspirationId(item.id); setView(ViewState.INSPIRATION_DETAIL); }
    };

    return (
        <div className="pb-32 max-w-7xl mx-auto">
            <header className="text-center py-16 md:py-32 space-y-6 mb-16 md:mb-24 relative border-b border-[var(--border-main)]">
                <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)]">{t('nav.archive')}</h2>
                <button 
                  onClick={onOpenPhilosopher} 
                  className="absolute right-0 top-16 md:top-32 flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)]"
                >
                  <BrainIcon className="w-5 h-5" />
                  <span className="hidden md:inline">{t('label.ask_sage')}</span>
                </button>
            </header>

            <div className="max-w-xl mx-auto mb-16 md:mb-32 px-6 md:px-0">
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b border-[var(--border-main)] py-3 text-center font-serif text-[var(--text-main)] focus:outline-none focus:border-[var(--border-strong)] placeholder-[var(--text-faint)] text-xl md:text-2xl"
              />
            </div>

            <div className="flex overflow-x-auto no-scrollbar justify-start md:justify-center gap-12 md:gap-20 mb-16 md:mb-32 border-b border-[var(--border-main)] pb-px max-w-4xl mx-auto px-6 md:px-0">
               {['Timeline', 'Category', 'Tags', 'Modules'].map(tab => (
                 <button
                   key={tab}
                   onClick={() => setActiveTab(tab as any)}
                   className={`text-[9px] uppercase tracking-[0.2em] pb-6 flex-shrink-0 ${activeTab === tab ? 'text-[var(--text-main)] border-b border-[var(--border-strong)] -mb-px' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
                 >
                   {t('filter.' + tab.toLowerCase())}
                 </button>
               ))}
            </div>

            <div className="max-w-6xl mx-auto px-0 md:px-6">
               {activeTab === 'Timeline' && (
                 <div className="space-y-24 md:space-y-32">
                    {Object.entries(timelineGrouped).sort((a, b) => Number(b[0]) - Number(a[0])).map(([year, months]) => (
                       <div key={year}>
                             <h3 className="text-6xl md:text-8xl font-serif text-[var(--text-faint)] mb-12 md:mb-20 text-center select-none">{year}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                             {Object.entries(months).map(([month, items]) => (
                               <div key={month} className="md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 mb-12 md:mb-16">
                                  <div className="md:col-span-2 text-left md:text-right pt-3">
                                      <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-main)] font-bold block border-t border-[var(--border-strong)] pt-3 inline-block">{month}</span>
                                  </div>
                                  <div className="md:col-span-10 space-y-6 md:space-y-8 border-l border-[var(--border-main)] pl-6 md:pl-12">
                                      {items.map((item, idx) => (
                                            <div key={item.type + item.id} className="group cursor-pointer flex flex-col md:flex-row justify-between items-baseline hover:pl-4" onClick={() => handleItemClick(item)}>
                                                <span className="text-xl md:text-2xl font-serif text-[var(--text-body)] group-hover:text-[var(--text-main)] mb-2 md:mb-0">{item.title}</span>
                                                <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-faint)] group-hover:text-[var(--text-muted)]">{item.type}</span>
                                            </div>
                                      ))}
                                  </div>
                               </div>
                             ))}
                          </div>
                       </div>
                    ))}
                 </div>
               )}

               {activeTab === 'Category' && (
                  <div className="columns-1 md:columns-2 gap-24 space-y-24">
                     {Object.entries(categoryGrouped).map(([cat, items]) => (
                        <div key={cat} className="break-inside-avoid mb-24">
                               <h3 className="text-2xl font-serif text-[var(--text-main)] border-b border-[var(--border-strong)] pb-4 mb-8 flex justify-between items-baseline">
                                 {cat} <span className="text-sm text-[var(--text-faint)] font-normal font-sans">{items.length}</span>
                               </h3>
                           <ul className="space-y-4">
                              {items.map((item, idx) => (
                                    <li key={item.type + item.id} onClick={() => handleItemClick(item)} className="cursor-pointer group flex justify-between items-baseline hover:pl-2">
                                       <span className="text-[var(--text-body)] group-hover:text-[var(--text-main)] font-serif text-lg md:text-xl truncate max-w-[70%]">{item.title}</span>
                                       <span className="text-[9px] text-[var(--text-faint)] uppercase tracking-[0.2em]">{item.type}</span>
                                    </li>
                              ))}
                           </ul>
                        </div>
                     ))}
                  </div>
               )}

               {activeTab === 'Tags' && (
                 <div>
                    {!selectedTag ? (
                      <div className="flex flex-wrap justify-center gap-x-8 md:gap-x-12 gap-y-4 md:gap-y-6">
                        {uniqueTags.map((tag, idx) => (
                              <button 
                                 key={tag}
                                 onClick={() => setSelectedTag(tag)}
                                 className="text-lg md:text-xl font-serif text-[var(--text-muted)] hover:text-[var(--text-main)]"
                              >
                                #{tag}
                              </button>
                        ))}
                      </div>
                    ) : (
                      <div>
                         <button onClick={() => setSelectedTag(null)} className="mb-16 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)]">
                            &larr; {t('filter.all')}
                         </button>
                         <h3 className="text-5xl md:text-6xl font-serif text-[var(--text-main)] mb-16 text-center italic">#{selectedTag}</h3>
                         <div className="space-y-8 max-w-3xl mx-auto">
                            {allContent.filter(i => i.tags?.includes(selectedTag)).map((item, idx) => (
                                   <div key={item.type + item.id} className="flex flex-col md:flex-row items-baseline justify-between border-b border-[var(--border-main)] pb-6 cursor-pointer group hover:pl-4" onClick={() => handleItemClick(item)}>
                                      <span className="text-xl md:text-2xl font-serif text-[var(--text-body)] group-hover:text-[var(--text-main)] mb-2 md:mb-0">{item.title}</span>
                                      <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-faint)]">{item.type}</span>
                                   </div>
                            ))}
                         </div>
                      </div>
                    )}
                 </div>
               )}

               {activeTab === 'Modules' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
                     {['Journal', 'Library', 'Reaction', 'Portfolio', 'Inspiration', 'Fragment'].map((module, modIdx) => {
                        const modItems = allContent.filter(i => i.type === module);
                        return (
                           <div key={module}>
                                  <h3 className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-main)] border-b border-[var(--border-strong)] pb-3 mb-8 font-bold">{module === 'Inspiration' ? t('nav.imaginarium') : module}</h3>
                              <ul className="space-y-4">
                                 {modItems.slice(0, 8).map((item, idx) => (
                                        <li key={item.id} onClick={() => handleItemClick(item)} className="text-[var(--text-body)] hover:text-[var(--text-main)] cursor-pointer font-serif truncate text-lg hover:translate-x-2">
                                           {item.title}
                                        </li>
                                 ))}
                              </ul>
                           </div>
                        );
                     })}
                  </div>
               )}
            </div>
        </div>
    );
};

export default ArchiveView;
