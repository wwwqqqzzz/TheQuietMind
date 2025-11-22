
import React, { useState, useMemo } from 'react';
import { ViewState } from '../types/index';
import { useLanguage } from '../contexts/LanguageContext';
import { ResponsiveFilter } from '../components/features/ResponsiveFilter';
import { PortfolioCard } from '../components/ui/PortfolioCard';
import { getUniqueValues } from '../utils/helpers';
import { INITIAL_PORTFOLIO_ITEMS } from '../data/index';

export const PortfolioView = ({ setView, setPortfolioId }: { setView: (v: ViewState) => void, setPortfolioId: (id: string) => void }) => {
  const [filter, setFilter] = useState<{ type: 'category' | 'year' | 'tag' | 'all', value: string }>({ type: 'all', value: 'All' });
  const { t } = useLanguage();

  const filteredItems = useMemo(() => {
    let items = INITIAL_PORTFOLIO_ITEMS;
    if (filter.type === 'category') items = items.filter(i => i.category === filter.value);
    if (filter.type === 'year') items = items.filter(i => i.year === filter.value);
    return items;
  }, [filter]);

  const categories = getUniqueValues(INITIAL_PORTFOLIO_ITEMS, 'category');
  const years = getUniqueValues(INITIAL_PORTFOLIO_ITEMS, 'year');

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
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-[var(--text-main)] mb-8">{t('nav.portfolio')}</h2>
                <div className="h-px w-20 bg-[var(--border-strong)]"></div>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-20">
                {filteredItems.map((item, idx) => (
                    <PortfolioCard key={item.id} item={item} onClick={() => { setPortfolioId(item.id); setView(ViewState.PORTFOLIO_DETAIL); }} />
                ))}
            </div>
        </div>
    </div>
  );
};
