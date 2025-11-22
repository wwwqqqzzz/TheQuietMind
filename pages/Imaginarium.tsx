
import React, { useState, useMemo } from 'react';
import { ViewState } from '../types/index';
import { useLanguage } from '../contexts/LanguageContext';
import { ResponsiveFilter } from '../components/features/ResponsiveFilter';
import { InspirationCard } from '../components/ui/InspirationCard';
import { getUniqueValues } from '../utils/helpers';
import { INITIAL_INSPIRATION_ITEMS } from '../data/index';

export const ImaginariumView = ({ setView, setItemId }: { setView: (v: ViewState) => void, setItemId: (id: string) => void }) => {
  const [filter, setFilter] = useState<{ type: 'category' | 'year' | 'tag' | 'all', value: string }>({ type: 'all', value: 'All' });
  const { t } = useLanguage();

  const filteredItems = useMemo(() => {
    let items = INITIAL_INSPIRATION_ITEMS;
    if (filter.type === 'category') items = items.filter(i => i.category === filter.value);
    if (filter.type === 'year') items = items.filter(i => i.sortDate.startsWith(filter.value));
    if (filter.type === 'tag') items = items.filter(i => i.tags?.includes(filter.value));
    return items;
  }, [filter]);

  const categories = getUniqueValues(INITIAL_INSPIRATION_ITEMS, 'category');
  const years = getUniqueValues(INITIAL_INSPIRATION_ITEMS, 'year');

  return (
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-32">
        <ResponsiveFilter 
            categories={categories} 
            years={years} 
            activeFilter={filter}
            onSelect={(type, value) => setFilter({ type, value })}
        />
        <div className="flex-grow w-full">
            <header className="mb-12 md:mb-16 lg:mb-32 pt-4 lg:pt-16">
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-[var(--text-main)] mb-8">{t('nav.imaginarium')}</h2>
                <div className="h-px w-20 bg-[var(--border-strong)]"></div>
            </header>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 md:gap-12 space-y-8 md:space-y-12">
            {filteredItems.map((item, idx) => (
                    <InspirationCard key={item.id} item={item} onClick={() => { setItemId(item.id); setView(ViewState.INSPIRATION_DETAIL); }} />
            ))}
            </div>
        </div>
    </div>
  );
};
