
import React, { useState, useMemo } from 'react';
import { ViewState, BlogPost } from '../types/index';
import { useLanguage } from '../contexts/LanguageContext';
import { ResponsiveFilter } from '../components/features/ResponsiveFilter';
import { Card } from '../components/ui/Card';
import { getUniqueValues } from '../utils/helpers';

const JournalView = ({ setView, setPostId, posts }: { setView: (v: ViewState) => void, setPostId: (id: string) => void, posts: BlogPost[] }) => {
  const [filter, setFilter] = useState<{ type: 'category' | 'year' | 'tag' | 'all', value: string }>({ type: 'all', value: 'All' });
  const { t, resolveText } = useLanguage();

  const filteredPosts = useMemo(() => {
    let p = posts;
    if (filter.type === 'category') p = p.filter(post => post.category === filter.value);
    if (filter.type === 'year') p = p.filter(post => post.sortDate.startsWith(filter.value));
    if (filter.type === 'tag') p = p.filter(post => post.tags.includes(filter.value));
    return p;
  }, [filter, posts]);

  const categories = getUniqueValues(posts, 'category');
  const years = getUniqueValues(posts, 'year');

  return (
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-32">
      <ResponsiveFilter 
        categories={categories} 
        years={years} 
        activeFilter={filter}
        onSelect={(type, value) => setFilter({ type, value })}
      />
      <div className="flex-grow max-w-3xl w-full">
         <header className="mb-12 md:mb-16 lg:mb-32 pt-4 lg:pt-16">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-[var(--text-main)] mb-8">{t('nav.journal')}</h2>
            <div className="h-px w-20 bg-[var(--border-strong)]"></div>
         </header>
         <div className="space-y-8 md:space-y-16">
            {filteredPosts.map((post, idx) => (
                <Card 
                  key={post.id}
                  title={resolveText(post.title)}
                  date={post.date}
                  excerpt={resolveText(post.excerpt)}
                  category={post.category}
                  tags={post.tags}
                  onClick={() => {
                    setPostId(post.id);
                    setView(ViewState.ARTICLE);
                  }}
                />
            ))}
         </div>
      </div>
    </div>
  );
};

export default JournalView;
