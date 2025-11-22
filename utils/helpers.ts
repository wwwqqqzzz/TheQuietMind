
import { BlogPost, Book, Reaction, PortfolioItem, InspirationItem, Fragment, UnifiedContentItem, LocalizedText } from '../types/index';

export const getAllContent = (
  posts: BlogPost[], 
  books: Book[], 
  reactions: Reaction[], 
  portfolio: PortfolioItem[], 
  inspiration: InspirationItem[], 
  fragments: Fragment[], 
  resolveText: (t: LocalizedText) => string
): UnifiedContentItem[] => {
  const items: UnifiedContentItem[] = [];
  const r = resolveText;

  posts.forEach(p => items.push({ id: p.id, type: 'Journal', title: r(p.title), category: p.category, sortDate: p.sortDate, displayDate: p.date, tags: p.tags, originalItem: p }));
  books.forEach(b => items.push({ id: b.id, type: 'Library', title: b.title, category: b.category, sortDate: b.sortDate, displayDate: b.dateFinished, tags: b.tags, originalItem: b }));
  reactions.forEach(rItem => items.push({ id: rItem.id, type: 'Reaction', title: rItem.title, category: rItem.category, sortDate: rItem.sortDate, displayDate: rItem.dateExperienced, tags: [], originalItem: rItem }));
  portfolio.forEach(p => items.push({ id: p.id, type: 'Portfolio', title: r(p.title), category: p.category, sortDate: p.sortDate, displayDate: p.year, tags: [], originalItem: p }));
  inspiration.forEach(i => items.push({ id: i.id, type: 'Inspiration', title: i.type + ': ' + i.content.substring(0, 20) + '...', category: i.category, sortDate: i.sortDate, tags: i.tags, originalItem: i }));
  fragments.forEach(f => items.push({ id: f.id, type: 'Fragment', title: r(f.content), category: f.category, sortDate: f.sortDate, displayDate: f.date, tags: f.tags, originalItem: f }));
  return items.sort((a, b) => new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime());
};

export const getUniqueValues = (items: any[], key: string): string[] => {
  const values = new Set<string>();
  items.forEach(item => {
    if (key === 'year') {
      if (item.sortDate) values.add(item.sortDate.split('-')[0]);
    } else if (key === 'tags' && item.tags) {
      item.tags.forEach((t: string) => values.add(t));
    } else if (item[key]) {
      values.add(item[key]);
    }
  });
  return Array.from(values).sort();
};

export const getMonthName = (dateStr: string, lang: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString(lang, { month: 'long' });
};
