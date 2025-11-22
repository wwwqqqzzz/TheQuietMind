
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface ResponsiveFilterProps {
  categories: string[];
  years: string[];
  activeFilter: { type: 'category' | 'year' | 'tag' | 'all', value: string };
  onSelect: (type: 'category' | 'year' | 'tag' | 'all', value: string) => void;
}

export const ResponsiveFilter: React.FC<ResponsiveFilterProps> = ({ categories, years, activeFilter, onSelect }) => {
  const { t } = useLanguage();
  return (
    <aside className="w-full lg:w-56 flex-shrink-0 lg:pr-12 mb-12 lg:mb-0 sticky top-20 z-10 bg-[var(--bg-main)] lg:bg-transparent border-b lg:border-b-0 lg:border-r border-[var(--border-main)] py-4 lg:py-0 transition-none">
      <div className="flex lg:block overflow-x-auto gap-8 lg:gap-16 items-center lg:items-start lg:space-y-16 no-scrollbar pb-2 lg:pb-0">
          <div className="flex-shrink-0">
            <h3 className="hidden lg:block text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--text-main)] mb-6 border-b border-[var(--border-main)] pb-2">{t('nav.index')}</h3>
            <ul className="flex lg:block gap-6 lg:gap-4">
              <li>
                <button 
                  onClick={() => onSelect('all', 'All')}
                  className={`text-sm font-serif whitespace-nowrap lg:whitespace-normal text-left w-full ${activeFilter.type === 'all' ? 'text-[var(--text-main)] italic border-b border-[var(--text-main)] lg:border-none' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
                >
                  {t('filter.all')}
                </button>
              </li>
              {categories.map(cat => (
                <li key={cat}>
                  <button 
                    onClick={() => onSelect('category', cat)}
                    className={`text-sm font-serif whitespace-nowrap lg:whitespace-normal text-left w-full ${activeFilter.type === 'category' && activeFilter.value === cat ? 'text-[var(--text-main)] italic border-b border-[var(--text-main)] lg:border-none' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {years.length > 0 && (
            <div className="flex-shrink-0 pl-8 lg:pl-0 border-l lg:border-l-0 border-[var(--border-main)]">
              <h3 className="hidden lg:block text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--text-main)] mb-6 border-b border-[var(--border-main)] pb-2">{t('filter.timeline')}</h3>
              <ul className="flex lg:block gap-6 lg:gap-4">
                 {years.map(year => (
                   <li key={year}>
                     <button 
                        onClick={() => onSelect('year', year)}
                        className={`text-sm font-serif whitespace-nowrap lg:whitespace-normal text-left w-full ${activeFilter.type === 'year' && activeFilter.value === year ? 'text-[var(--text-main)] italic border-b border-[var(--text-main)] lg:border-none' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
                     >
                       {year}
                     </button>
                   </li>
                 ))}
              </ul>
            </div>
          )}
      </div>
    </aside>
  );
};
