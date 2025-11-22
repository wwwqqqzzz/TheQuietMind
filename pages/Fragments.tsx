
import React, { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ResponsiveFilter } from '../components/features/ResponsiveFilter';
import { CategoryLabel } from '../components/ui/CategoryLabel';
import { getUniqueValues } from '../utils/helpers';
import { INITIAL_FRAGMENTS } from '../data/index';

export const FragmentsView = () => {
  const [filter, setFilter] = useState<{ type: 'category' | 'year' | 'tag' | 'all', value: string }>({ type: 'all', value: 'All' });
  const { t, resolveText, formatDate } = useLanguage();

  const filteredFragments = useMemo(() => {
    let items = INITIAL_FRAGMENTS;
    if (filter.type === 'category') items = items.filter(f => f.category === filter.value);
    if (filter.type === 'year') items = items.filter(f => f.sortDate.startsWith(filter.value));
    return items;
  }, [filter]);

  const categories = getUniqueValues(INITIAL_FRAGMENTS, 'category');
  const years = getUniqueValues(INITIAL_FRAGMENTS, 'year');

  return (
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-32">
      <ResponsiveFilter 
        categories={categories} 
        years={years} 
        activeFilter={filter}
        onSelect={(type, value) => setFilter({ type, value })}
      />
      <div className="flex-grow max-w-3xl mx-auto lg:mx-0 w-full">
        <header className="mb-12 md:mb-16 lg:mb-32 pt-4 lg:pt-16">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-[var(--text-main)] mb-8">{t('nav.fragments')}</h2>
            <div className="h-px w-20 bg-[var(--border-strong)]"></div>
         </header>
        <div className="space-y-12 md:space-y-16">
        {filteredFragments.map((frag, idx) => (
              <div key={frag.id} className="group text-left pb-12 border-b border-[var(--border-main)] border-opacity-40 last:border-0 hover:pl-4">
                  <p className="text-2xl md:text-3xl lg:text-4xl font-serif text-[var(--text-main)] leading-relaxed">
                  {resolveText(frag.content)}
                  </p>
                  <div className="flex items-center gap-6 mt-6 opacity-60 group-hover:opacity-100">
                    <CategoryLabel label={frag.category} />
                    {frag.date && <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-faint)]">{formatDate(frag.date)}</p>}
                  </div>
              </div>
        ))}
        </div>
      </div>
    </div>
  );
};
