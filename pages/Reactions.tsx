
import React, { useState, useMemo } from 'react';
import { ViewState, Reaction } from '../types/index';
import { useLanguage } from '../contexts/LanguageContext';
import { ResponsiveFilter } from '../components/features/ResponsiveFilter';
import { ReactionCard } from '../components/ui/ReactionCard';
import { getUniqueValues } from '../utils/helpers';

export const ReactionsView = ({ setView, setReactionId, reactions }: { setView: (v: ViewState) => void, setReactionId: (id: string) => void, reactions: Reaction[] }) => {
    const [filter, setFilter] = useState<{ type: 'category' | 'year' | 'tag' | 'all', value: string }>({ type: 'all', value: 'All' });
    const { t } = useLanguage();

    const filteredReactions = useMemo(() => {
        let items = reactions;
        if (filter.type === 'category') items = items.filter(r => r.category === filter.value);
        if (filter.type === 'year') items = items.filter(r => r.sortDate.startsWith(filter.value));
        return items;
    }, [filter, reactions]);

    const categories = getUniqueValues(reactions, 'category');
    const years = getUniqueValues(reactions, 'year');

    return (
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-32">
            <ResponsiveFilter 
                categories={categories} 
                years={years} 
                activeFilter={filter}
                onSelect={(type, value) => setFilter({ type, value })}
            />
            <div className="flex-grow max-w-4xl w-full">
                <header className="mb-12 md:mb-16 lg:mb-32 pt-4 lg:pt-16">
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-[var(--text-main)] mb-8">{t('nav.reactions')}</h2>
                    <div className="h-px w-20 bg-[var(--border-strong)]"></div>
                </header>
                <div className="space-y-8">
                    {filteredReactions.map((reaction, idx) => (
                            <ReactionCard 
                                key={reaction.id}
                                reaction={reaction}
                                onClick={() => {
                                    setReactionId(reaction.id);
                                    setView(ViewState.REACTION_DETAIL);
                                }}
                            />
                    ))}
                </div>
            </div>
        </div>
    );
};
