import React, { useState, useMemo, useEffect, useRef, createContext, useContext } from 'react';
import { 
  ViewState, 
  BlogPost, 
  Book, 
  Reaction, 
  PortfolioItem, 
  InspirationItem, 
  Fragment,
  UnifiedContentItem,
  Language,
  LocalizedText
} from './types';
import { 
  LotusIcon, 
  FeatherIcon, 
  BookIcon, 
  AudioIcon, 
  FilmIcon, 
  ArchiveIcon, 
  LayersIcon, 
  SparkIcon, 
  ShardIcon,
  BrainIcon,
  WandIcon,
  TeaIcon,
  GlobeIcon,
  MoonIcon,
  SunIcon,
  MenuIcon,
  XIcon
} from './components/Icons';
import { searchLibrary, speakText, askPhilosopher, editImage } from './services/geminiService';
import { translations } from './translations';

// --- Theme Context ---

type Theme = 'light' | 'dark';

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: 'light',
  toggleTheme: () => {}
});

const useTheme = () => useContext(ThemeContext);

// --- I18n System ---

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  resolveText: (text: LocalizedText) => string;
  formatDate: (dateStr: string) => string;
}>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
  resolveText: (text) => typeof text === 'string' ? text : text['en'] || '',
  formatDate: (d) => d
});

const useLanguage = () => useContext(LanguageContext);

// --- Mock Data with Multilingual Support ---

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: {
      en: 'The Architecture of Silence',
      'zh-CN': '寂静的建筑学',
      'zh-TW': '寂靜的建築學',
      ja: '沈黙の建築',
      ko: '침묵의 건축'
    },
    date: '2024-10-30',
    sortDate: '2024-10-30',
    category: 'Reflection',
    excerpt: {
      en: 'We build walls not to keep the world out, but to keep the quiet in.',
      'zh-CN': '我们砌墙，不是为了将世界拒之门外，而是为了将宁静留在心间。',
      'zh-TW': '我們砌牆，不是為了將世界拒之門外，而是為了將寧靜留在心間。',
      ja: '壁を作るのは、世界を遮断するためではなく、静寂を守るためだ。',
      ko: '우리는 세상을 막기 위해서가 아니라, 고요함을 지키기 위해 벽을 쌓는다.'
    },
    tags: ['architecture', 'silence', 'zen', 'memory'],
    content: {
      en: `In the empty spaces between our thoughts, there lies a structure more rigid than steel. We build walls not to keep the world out, but to keep the quiet in. The wooden arch is not merely a support for the roof; it is hands clasped in prayer. Today I walked through the tea garden, observing how moss claims the stone. It is a gentle conquest. Moss does not break; it covers. Roots do not shatter; they embrace until the stone yields.`,
      'zh-CN': `在思绪的空隙中，存在着一种比钢铁更坚固的结构。我们砌墙，不是为了将世界拒之门外，而是为了将宁静留在心间。木拱不仅仅是屋顶的支撑；它是合十祈祷的双手。今天我走过茶园，观察苔藓如何占据石头。那是一种温柔的征服。苔藓不会破碎；它覆盖。根须不会粉碎；它们拥抱，直到石头屈服。`,
      'zh-TW': `在思緒的空隙中，存在著一種比鋼鐵更堅固的結構。我們砌牆，不是為了將世界拒之門外，而是為了將寧靜留在心間。木拱不僅僅是屋頂的支撐；它是合十祈禱的雙手。今天我走過茶園，觀察苔蘚如何佔據石頭。那是一種溫柔的征服。苔蘚不會破碎；它覆蓋。根鬚不會粉碎；它們擁抱，直到石頭屈服。`,
      ja: `思考の隙間には、鋼鉄よりも強固な構造が存在する。壁を作るのは、世界を遮断するためではなく、静寂を守るためだ。木製のアーチは単なる屋根の支えではない。それは祈りのために組まれた手だ。今日、茶庭を歩きながら、苔がどのように石を覆うかを観察した。それは穏やかな征服だ。苔は壊さず、包み込む。根は砕かず、石が降参するまで抱擁する。`,
      ko: `생각의 틈새에는 강철보다 더 단단한 구조가 존재한다. 우리는 세상을 막기 위해서가 아니라, 고요함을 지키기 위해 벽을 쌓는다. 나무 아치는 단지 지붕을 지탱하는 것이 아니라, 기도하듯 맞잡은 손이다. 오늘 나는 차 정원을 거닐며 이끼가 어떻게 돌을 덮는지 관찰했다. 그것은 부드러운 정복이다. 이끼는 깨뜨리지 않고 덮는다. 뿌리는 부수지 않고 돌이 굴복할 때까지 감싸 안는다.`
    },
  },
  {
    id: '2',
    title: 'Simplicity and Ink',
    date: '2024-10-15',
    sortDate: '2024-10-15',
    category: 'Philosophy',
    excerpt: 'Every word written is an attempt to capture the fleeting moment.',
    tags: ['writing', 'simplicity', 'time', 'flow'],
    content: `To write is to flow with the river of time. The ink dries, the paper holds the memory. We persist not out of rebellion, but out of harmony. A sentence is order. A paragraph is a garden path.`,
  },
  {
    id: '3',
    title: 'Notes on "The Book of Tea"',
    date: '2024-09-22',
    sortDate: '2024-09-22',
    category: 'Personal Essays',
    excerpt: 'Okakura understood that tea is a religion of the art of life.',
    tags: ['reading notes', 'tea', 'aesthetics', 'culture'],
    content: `The tea room is an oasis in the dreary waste of existence here in the city. It is a sanctuary where one can find comfort in the appreciation of the imperfect. We are all guests in this life, sipping from the cup of the present.`,
  }
];

const LIBRARY_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Stranger',
    author: 'Albert Camus',
    coverUrl: 'https://placehold.co/300x450/e5e5e5/0F0F0F?text=The+Stranger',
    dateFinished: 'Winter 2023',
    sortDate: '2025-01-15',
    category: 'Fiction',
    tags: ['absurdism', 'existentialism', 'classics', 'sun'],
    reflection: {
        en: "A haunting portrayal of detachment. Meursault is not a monster because he kills, but because he refuses to weep at his mother's funeral.",
        'zh-CN': "一幅令人难忘的疏离画像。默尔索之所以被视为怪物，不是因为他杀了人，而是因为他在母亲的葬礼上拒绝哭泣。",
        'zh-TW': "一幅令人難忘的疏離畫像。默爾索之所以被視為怪物，不是因為他殺了人，而是因為他在母親的葬禮上拒絕哭泣。",
        ja: "剥離の心に残る描写。ムルソーが怪物であるのは、彼が人を殺したからではなく、母親の葬儀で泣くことを拒否したからだ。",
        ko: "소외에 대한 잊혀지지 않는 묘사. 뫼르소가 괴물인 이유는 살인을 해서가 아니라, 어머니의 장례식에서 울기를 거부했기 때문이다."
    },
    quotes: [
        { en: "Maman died today. Or maybe yesterday, I don't know.", 'zh-CN': "今天，妈妈死了。也许是昨天，我不知道。" },
        { en: "I opened myself to the gentle indifference of the world.", 'zh-CN': "我向这个世界温柔的冷漠敞开了心扉。" }
    ]
  },
  {
    id: '2',
    title: 'Snow Country',
    author: 'Yasunari Kawabata',
    coverUrl: 'https://placehold.co/300x450/d6d3d1/0F0F0F?text=Snow+Country',
    dateFinished: 'Autumn 2023',
    sortDate: '2025-01-10',
    category: 'Fiction',
    tags: ['beauty', 'loneliness', 'nature', 'japan'],
    reflection: "A wasted effort, perhaps, but a beautiful one. The snow covers everything in a blanket of silence.",
    quotes: ["The train came out of the long tunnel into the snow country.", "Everything is a symbol of the passage of time."]
  },
  {
    id: '3',
    title: 'Meditations',
    author: 'Marcus Aurelius',
    coverUrl: 'https://placehold.co/300x450/f5f5f4/0F0F0F?text=Meditations',
    dateFinished: 'Spring 2024',
    sortDate: '2025-02-01',
    category: 'Philosophy',
    tags: ['stoicism', 'discipline', 'nature', 'impermanence'],
    reflection: "The private notes of an emperor trying to be a good man in a chaotic world. It is a reminder that the only thing we truly possess is the present moment.",
    quotes: ["You have power over your mind - not outside events.", "The soul becomes dyed with the color of its thoughts."]
  },
  {
    id: '4',
    title: 'In Praise of Shadows',
    author: 'Junichiro Tanizaki',
    coverUrl: 'https://placehold.co/300x450/292524/FAFAF7?text=Shadows',
    dateFinished: 'Summer 2023',
    sortDate: '2025-02-15',
    category: 'Art & Aesthetics',
    tags: ['architecture', 'aesthetics', 'shadows', 'light'],
    reflection: "An essay on Japanese aesthetics, finding beauty not in the thing itself but in the patterns of shadows, the light and the darkness, that one thing against another creates.",
    quotes: ["Were it not for shadows, there would be no beauty.", "We find beauty not in the thing itself but in the patterns of shadows."]
  },
];

const REACTIONS: Reaction[] = [
  {
    id: '1',
    title: 'Stalker',
    creator: 'Andrei Tarkovsky',
    type: 'Film',
    category: 'Film',
    dateExperienced: '2024-11-01',
    sortDate: '2024-11-01',
    imageUrl: 'https://placehold.co/600x340/e5e5e5/57534e?text=Stalker',
    summary: 'A guide leads two men through an area known as the Zone to find a room that grants wishes.',
    reflection: 'The dampness of the Zone seeps through the screen. Tarkovsky captures the texture of decay like no other.',
  },
  {
    id: '2',
    title: 'Water Lilies',
    creator: 'Claude Monet',
    type: 'Art',
    category: 'Visual Art',
    dateExperienced: '2024-10-20',
    sortDate: '2024-10-20',
    imageUrl: 'https://placehold.co/600x340/e5e5e5/57534e?text=Water+Lilies',
    summary: 'A series of approximately 250 oil paintings by French Impressionist Claude Monet.',
    reflection: 'The reflection of the sky in the water. There is no horizon, only the depth of the pond and the light playing on the surface.',
  },
];

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: '1',
    title: 'Void Construct',
    description: 'A generative art series exploring negative space and digital decay.',
    year: '2024',
    sortDate: '2024-05-01',
    category: 'Visual Work',
    tools: ['Processing', 'GLSL', 'Audio'],
    thumbnailUrl: 'https://placehold.co/500x500/e5e5e5/57534e?text=Void+Construct',
    reflection: 'This project began as an attempt to visualize silence. By removing pixels iteratively based on noise algorithms, I created structures that seem to be dissolving in real-time.',
  }
];

const INSPIRATION_ITEMS: InspirationItem[] = [
  {
    id: '1',
    type: 'Quote',
    category: 'Quotes',
    content: 'In the midst of winter, I found there was, within me, an invincible summer.',
    source: 'Albert Camus',
    notes: 'Resilience as an inherent trait, not an acquired skill.',
    why: 'Reminds me that the cold is external.',
    sortDate: '2024-01-10',
    tags: ['resilience', 'camus', 'winter']
  }
];

const FRAGMENTS: Fragment[] = [
  { id: '1', content: 'The shadow is not the absence of light, but the presence of an obstacle.', date: '2024-11-12', sortDate: '2024-11-12', category: 'Thoughts', tags: ['shadow', 'physics'] },
  { id: '2', content: 'We are ghosts driving meat-skeletons made of stardust.', date: '2024-11-10', sortDate: '2024-11-10', category: 'Thoughts', tags: ['humanity', 'absurd'] },
];

// --- Utilities ---

const getAllContent = (resolveText: (t: LocalizedText) => string): UnifiedContentItem[] => {
  const items: UnifiedContentItem[] = [];
  const r = resolveText;

  BLOG_POSTS.forEach(p => items.push({ id: p.id, type: 'Journal', title: r(p.title), category: p.category, sortDate: p.sortDate, displayDate: p.date, tags: p.tags, originalItem: p }));
  LIBRARY_BOOKS.forEach(b => items.push({ id: b.id, type: 'Library', title: b.title, category: b.category, sortDate: b.sortDate, displayDate: b.dateFinished, tags: b.tags, originalItem: b }));
  REACTIONS.forEach(rItem => items.push({ id: rItem.id, type: 'Reaction', title: rItem.title, category: rItem.category, sortDate: rItem.sortDate, displayDate: rItem.dateExperienced, tags: [], originalItem: rItem }));
  PORTFOLIO_ITEMS.forEach(p => items.push({ id: p.id, type: 'Portfolio', title: r(p.title), category: p.category, sortDate: p.sortDate, displayDate: p.year, tags: [], originalItem: p }));
  INSPIRATION_ITEMS.forEach(i => items.push({ id: i.id, type: 'Inspiration', title: i.type + ': ' + i.content.substring(0, 20) + '...', category: i.category, sortDate: i.sortDate, tags: i.tags, originalItem: i }));
  FRAGMENTS.forEach(f => items.push({ id: f.id, type: 'Fragment', title: r(f.content), category: f.category, sortDate: f.sortDate, displayDate: f.date, tags: f.tags, originalItem: f }));
  return items.sort((a, b) => new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime());
};

const getUniqueValues = (items: any[], key: string): string[] => {
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

const getMonthName = (dateStr: string, lang: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString(lang, { month: 'long' });
};

// --- Components (Static, Zen) ---

const WashiPattern = () => (
  <div className="fixed inset-0 z-[-1] pointer-events-none" 
       style={{ 
         backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNiIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==')`,
         backgroundSize: '200px 200px',
         opacity: 'var(--pattern-opacity)',
         filter: 'var(--pattern-filter)',
         mixBlendMode: 'multiply'
       }}>
  </div>
);

const StaticContainer = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`${className} opacity-100 transform-none`}>
      {children}
    </div>
  );
};

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const NavButton = ({ label, isActive, onClick, hasDropdown }: { label: string, isActive: boolean, onClick: () => void, hasDropdown?: boolean }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-2 px-3 py-1 text-sm tracking-[0.2em] font-serif rounded-none
      ${isActive 
        ? 'text-[var(--text-main)] border-b border-[var(--border-strong)]' 
        : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:underline'}
    `}
  >
    <span className="uppercase text-[11px] font-medium">{label}</span>
    {hasDropdown && <ChevronDownIcon className="w-3 h-3 ml-1 opacity-50" />}
  </button>
);

const TagPill = ({ label, onClick, active }: { label: string, onClick?: () => void, active?: boolean }) => (
  <span 
    onClick={onClick}
    className={`
      text-[9px] uppercase tracking-[0.15em] px-3 py-1 border whitespace-nowrap
      ${onClick ? 'cursor-pointer' : ''}
      ${active 
        ? 'border-[var(--border-strong)] text-[var(--text-main)]' 
        : 'border-[var(--border-main)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text-main)]'}
    `}
  >
    {label}
  </span>
);

const CategoryLabel = ({ label }: { label: string }) => (
  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] block mb-2">
    {label}
  </span>
);

// --- Responsive Filter Sidebar / Bar ---

interface ResponsiveFilterProps {
  categories: string[];
  years: string[];
  activeFilter: { type: 'category' | 'year' | 'tag' | 'all', value: string };
  onSelect: (type: 'category' | 'year' | 'tag' | 'all', value: string) => void;
}

const ResponsiveFilter: React.FC<ResponsiveFilterProps> = ({ categories, years, activeFilter, onSelect }) => {
  const { t } = useLanguage();
  return (
    <aside className="w-full lg:w-56 flex-shrink-0 lg:pr-12 mb-12 lg:mb-0 sticky top-20 z-10 bg-[var(--bg-main)] lg:bg-transparent border-b lg:border-b-0 lg:border-r border-[var(--border-main)] py-4 lg:py-0 transition-none">
      {/* No-scrollbar horizontal list for mobile/tablet */}
      <div className="flex lg:block overflow-x-auto gap-8 lg:gap-16 items-center lg:items-start lg:space-y-16 no-scrollbar pb-2 lg:pb-0">
          {/* Categories */}
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

          {/* Years */}
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

const Card: React.FC<{ title: string; date: string; excerpt: string; category: string; tags?: string[]; onClick: () => void }> = ({ title, date, excerpt, category, tags, onClick }) => {
    const { formatDate } = useLanguage();
    return (
        <div 
            onClick={onClick}
            className="cursor-pointer bg-transparent py-8 md:py-12 border-b border-[var(--border-main)] last:border-0 group"
        >
            <div className="flex justify-between items-start mb-4 md:mb-6">
            <CategoryLabel label={category} />
            <span className="text-[9px] text-[var(--text-faint)] uppercase tracking-[0.2em]">{formatDate(date)}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif text-[var(--text-main)] mb-4 md:mb-6 leading-tight group-hover:opacity-70">{title}</h3>
            <p className="text-[var(--text-body)] font-serif text-lg leading-relaxed mb-6 md:mb-8 opacity-80">{excerpt}</p>
            {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-3">
                {tags.map(t => <span key={t} className="text-[9px] text-[var(--text-muted)] italic tracking-wider">#{t}</span>)}
            </div>
            )}
        </div>
    );
};

const ShelfBook = ({ book, onClick, highlight }: { book: Book, onClick: () => void, highlight?: boolean }) => {
    return (
        <div 
            onClick={onClick} 
            className="group cursor-pointer relative w-full aspect-[2/3] bg-[var(--bg-card)] p-1 hover:brightness-95"
        >
            <div className="w-full h-full relative overflow-hidden shadow-[2px_3px_5px_rgba(0,0,0,0.08)] border border-[var(--border-main)]">
            <img 
                src={book.coverUrl} 
                alt={book.title} 
                className="w-full h-full object-cover" 
                style={{ filter: 'var(--img-filter)', opacity: 'var(--img-opacity)' }}
            />
            </div>
            <div className="mt-3 text-center">
            <p className="text-[10px] uppercase text-[var(--text-muted)] truncate group-hover:text-[var(--text-main)]">{book.title}</p>
            </div>
        </div>
    );
};

const ReactionCard = ({ reaction, onClick }: { reaction: Reaction, onClick: () => void }) => {
    const { resolveText, formatDate } = useLanguage();
    return (
        <div onClick={onClick} className="cursor-pointer grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 py-12 md:py-16 border-b border-[var(--border-main)] last:border-0 group hover:bg-[var(--bg-hover)]">
            <div className="bg-[var(--bg-hover)] p-3 border border-[var(--border-main)] group-hover:border-[var(--border-strong)] overflow-hidden">
                <img 
                    src={reaction.imageUrl} 
                    alt={reaction.title} 
                    className="w-full h-full object-cover aspect-video"
                    style={{ filter: 'var(--img-filter)', opacity: 'var(--img-opacity)' }}
                />
            </div>
            <div className="flex flex-col justify-center space-y-6 md:space-y-8">
                <div className="space-y-3">
                    <CategoryLabel label={reaction.category} />
                    <h3 className="font-serif text-2xl md:text-3xl text-[var(--text-main)] leading-tight">{reaction.title}</h3>
                    <p className="text-sm text-[var(--text-muted)] font-serif italic">{resolveText(reaction.creator)} • {formatDate(reaction.dateExperienced)}</p>
                </div>
                <p className="text-[var(--text-body)] font-serif leading-loose text-base md:text-lg">{resolveText(reaction.summary)}</p>
            </div>
        </div>
    );
};

const PortfolioCard = ({ item, onClick }: { item: PortfolioItem, onClick: () => void }) => {
    const { resolveText } = useLanguage();
    return (
        <div onClick={onClick} className="cursor-pointer group">
            <div className="aspect-square w-full bg-[var(--bg-hover)] border border-[var(--border-main)] p-6 md:p-8 flex items-center justify-center mb-6 group-hover:border-[var(--border-strong)] overflow-hidden relative">
                <img 
                  src={item.thumbnailUrl} 
                  alt={resolveText(item.title)} 
                  className="w-full h-full object-cover"
                  style={{ filter: 'var(--img-filter)', opacity: 'var(--img-opacity)' }}
                />
            </div>
            <div className="flex justify-between items-baseline">
                <h3 className="text-[var(--text-main)] font-serif text-lg md:text-xl group-hover:text-[var(--text-main)] opacity-80 group-hover:opacity-100">{resolveText(item.title)}</h3>
                <span className="text-[9px] text-[var(--text-muted)] uppercase tracking-[0.2em]">{item.year}</span>
            </div>
        </div>
    );
};

const InspirationCard = ({ item, onClick }: { item: InspirationItem, onClick: () => void }) => {
    const renderContent = () => {
        switch(item.type) {
        case 'Image':
            return (
              <img 
                src={item.content} 
                alt="Inspiration" 
                className="w-full h-auto border border-[var(--border-main)] p-3 bg-[var(--bg-card)]" 
                style={{ filter: 'var(--img-filter)', opacity: 'var(--img-opacity)' }}
              />
            );
        case 'Color':
            return <div className="w-full h-40 border border-[var(--border-main)]" style={{ backgroundColor: item.content }}></div>;
        case 'Quote':
            return <div className="p-6 md:p-8 border border-[var(--border-main)] bg-[var(--bg-card)] italic font-serif text-[var(--text-main)] text-center leading-loose text-base md:text-lg group-hover:border-[var(--border-strong)]">"{item.content}"</div>;
        case 'Note':
            return <div className="p-6 md:p-8 border border-[var(--border-main)] bg-[var(--bg-card)] font-serif text-[var(--text-body)] text-sm md:text-md leading-loose group-hover:bg-[var(--bg-hover)]">{item.content}</div>;
        default: return null;
        }
    };

    return (
        <div onClick={onClick} className="cursor-pointer break-inside-avoid mb-8 md:mb-12 opacity-90 hover:opacity-100 group">
        {renderContent()}
        </div>
    );
};

// --- Feature Components ---

const PhilosopherModal = ({ onClose }: { onClose: () => void }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [thinking, setThinking] = useState(false);
  const { t } = useLanguage();

  const ask = async () => {
    if(!query) return;
    setThinking(true);
    try {
      const text = await askPhilosopher(query);
      setResponse(text);
    } catch(e) {
      setResponse("The silence remains unbroken.");
    } finally {
      setThinking(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[var(--bg-main)] bg-opacity-95 backdrop-blur-sm z-50 flex items-center justify-center p-6 md:p-8">
      <div className="max-w-2xl w-full space-y-8 md:space-y-12 text-center">
        <BrainIcon className="w-6 h-6 text-[var(--border-main)] mx-auto" />
        <h2 className="text-xl font-serif text-[var(--text-main)] tracking-widest uppercase">{t('label.ask_sage')}</h2>
        {!response ? (
          <div className="space-y-6 md:space-y-10">
            <textarea 
              className="w-full bg-transparent border-b border-[var(--border-main)] text-[var(--text-main)] p-4 font-serif focus:outline-none focus:border-[var(--border-strong)] h-32 md:h-40 resize-none text-xl md:text-2xl placeholder-[var(--text-faint)] text-center leading-relaxed"
              placeholder={t('label.sage_placeholder')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="flex justify-center gap-8 md:gap-12">
              <button onClick={onClose} className="text-[var(--text-muted)] hover:text-[var(--text-main)] uppercase text-[10px] tracking-[0.2em]">{t('btn.return')}</button>
              <button 
                onClick={ask}
                disabled={thinking || !query}
                className="text-[var(--text-main)] border border-[var(--border-strong)] px-6 md:px-8 py-3 uppercase text-[10px] tracking-[0.2em] hover:bg-[var(--text-main)] hover:text-[var(--bg-main)] disabled:opacity-50"
              >
                {thinking ? '[ ... ]' : t('btn.inquire')}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8 md:space-y-12">
            <div className="font-serif leading-[2.2] text-[var(--text-body)] text-left text-lg md:text-xl max-h-[50vh] md:max-h-[60vh] overflow-y-auto pr-6 custom-scrollbar">
              {response}
            </div>
            <div className="flex justify-center gap-8 md:gap-12 border-t border-[var(--border-main)] pt-10">
                <button onClick={() => { setResponse(null); setQuery(''); }} className="text-[var(--text-muted)] hover:text-[var(--text-main)] uppercase text-[10px] tracking-[0.2em]">{t('label.ask_sage')}</button>
                <button onClick={onClose} className="text-[var(--text-muted)] hover:text-[var(--text-main)] uppercase text-[10px] tracking-[0.2em]">{t('btn.close')}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ImageEditor = ({ imageUrl, onClose }: { imageUrl: string, onClose: () => void }) => {
  const [prompt, setPrompt] = useState('');
  const [currentImage, setCurrentImage] = useState(imageUrl);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleEdit = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const mimeType = currentImage.split(';')[0].split(':')[1];
      const newImage = await editImage(currentImage, mimeType, prompt);
      setCurrentImage(newImage);
    } catch (e) {
      alert("The canvas resisted change.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[var(--bg-main)] bg-opacity-95 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6 md:p-8">
      <div className="w-full max-w-4xl h-full flex flex-col gap-6 md:gap-10 py-6 md:py-12">
        <div className="flex-grow relative flex items-center justify-center border border-[var(--border-main)] p-6 md:p-12 bg-[var(--bg-card)] shadow-lg">
          <img src={currentImage} alt="Editing" className="max-w-full max-h-full object-contain" style={{ filter: 'var(--img-filter)', opacity: 'var(--img-opacity)' }} />
          {loading && <div className="absolute inset-0 bg-[var(--bg-main)] bg-opacity-90 flex items-center justify-center z-10"><span className="text-[var(--text-main)] font-serif italic text-2xl tracking-wider">[ ... ]</span></div>}
        </div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center w-full border-t border-[var(--border-main)] pt-6 md:pt-10">
           <input 
             type="text"
             placeholder={t('label.image_prompt')}
             className="flex-grow bg-transparent text-[var(--text-main)] py-3 font-serif focus:outline-none border-b border-transparent focus:border-[var(--border-strong)] placeholder-[var(--text-faint)] text-lg md:text-xl w-full"
             value={prompt}
             onChange={(e) => setPrompt(e.target.value)}
           />
           <div className="flex gap-6 md:gap-8 shrink-0 w-full md:w-auto justify-center md:justify-end">
                <button 
                    onClick={handleEdit}
                    disabled={loading || !prompt}
                    className="text-[var(--text-main)] border border-[var(--border-strong)] px-6 md:px-8 py-3 uppercase text-[10px] tracking-[0.2em] hover:bg-[var(--text-main)] hover:text-[var(--bg-main)] disabled:opacity-50"
                >
                    {t('btn.transform')}
                </button>
                <button onClick={onClose} className="text-[var(--text-muted)] hover:text-[var(--text-main)] uppercase text-[10px] tracking-[0.2em] px-4">{t('btn.close')}</button>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Views ---

const HomeView = ({ setView }: { setView: (v: ViewState) => void }) => {
    const { t, resolveText, formatDate } = useLanguage();
    const latestPost = BLOG_POSTS[0];

    return (
    <div className="space-y-16 md:space-y-32 lg:space-y-48 max-w-4xl mx-auto">
        <section className="text-center pt-12 md:pt-32 lg:pt-48 space-y-8 md:space-y-16">
        <div>
            <LotusIcon className="w-12 h-12 md:w-16 md:h-16 mx-auto text-[var(--text-faint)] mb-6 md:mb-10" />
        </div>
        {/* Fluid typography for Hero Title */}
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif text-[var(--text-main)] tracking-tight leading-none px-4">{t('app.title')}</h1>
        <div className="w-16 h-px bg-[var(--border-strong)] mx-auto"></div>
        </section>

        <section className="grid grid-cols-1 gap-12 md:gap-24 lg:gap-32">
        <StaticContainer>
            <div className="flex items-center justify-between mb-8 md:mb-16 border-b border-[var(--border-main)] pb-4">
                <h2 className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-muted)] font-bold">{t('section.latest_reflection')}</h2>
                <button onClick={() => setView(ViewState.JOURNAL)} className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)]">{t('nav.index')}</button>
            </div>
            <div className="space-y-6 md:space-y-8 cursor-pointer group" onClick={() => setView(ViewState.JOURNAL)}>
                <h3 className="text-3xl md:text-5xl font-serif text-[var(--text-main)] leading-tight group-hover:opacity-80">{resolveText(latestPost.title)}</h3>
                <p className="text-[var(--text-body)] font-serif text-xl md:text-2xl leading-loose opacity-80 group-hover:opacity-100">{resolveText(latestPost.excerpt)}</p>
                <div className="flex items-center gap-6 pt-4 md:pt-8">
                    <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-[0.2em]">{formatDate(latestPost.date)}</span>
                </div>
            </div>
        </StaticContainer>
        </section>

        <section>
            <StaticContainer>
            <div className="flex items-center justify-between mb-12 md:mb-20 border-b border-[var(--border-main)] pb-4">
                <h2 className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-muted)] font-bold">{t('section.recent_reading')}</h2>
                <button onClick={() => setView(ViewState.LIBRARY)} className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)]">{t('nav.library')}</button>
            </div>
            {/* Library Grid: Mobile 2, Tablet 3/4, Desktop 6 */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
                {LIBRARY_BOOKS.slice(0, 4).map((book, idx) => (
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

const ArticleView = ({ postId, onBack }: { postId: string | null, onBack: () => void }) => {
  const post = BLOG_POSTS.find(p => p.id === postId);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { t, resolveText, formatDate } = useLanguage();

  if (!post) return <div>Post not found.</div>;

  const handleReadAloud = async () => {
    if (isSpeaking) return;
    setIsSpeaking(true);
    try {
      await speakText(resolveText(post.content));
    } catch (e) {
      alert("The voice failed to manifest.");
    } finally {
      setIsSpeaking(false);
    }
  };

  const content = resolveText(post.content);

  return (
    <article className="max-w-2xl mx-auto pt-12 md:pt-24 pb-24 md:pb-48">
      <button onClick={onBack} className="mb-16 md:mb-32 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center gap-3">
        &larr; {t('btn.return')}
      </button>
      
      <header className="mb-16 md:mb-32 text-center space-y-6 md:space-y-12">
        <div className="flex justify-center items-center gap-6 mb-4 md:mb-8">
           <CategoryLabel label={post.category} />
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[var(--text-main)] leading-tight tracking-tight">{resolveText(post.title)}</h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 text-[var(--text-muted)] text-sm font-serif italic pt-6 md:pt-10">
          <span>{formatDate(post.date)}</span>
          <span className="hidden md:inline">•</span>
          <button 
            onClick={handleReadAloud}
            disabled={isSpeaking}
            className="flex items-center gap-3 hover:text-[var(--text-main)] disabled:opacity-50"
          >
            <AudioIcon className="w-4 h-4" />
            {isSpeaking ? `[ ${t('btn.speaking')} ]` : t('btn.listen')}
          </button>
        </div>
      </header>

      <div className="font-serif text-[var(--text-body)] text-lg md:text-xl lg:text-2xl leading-[2.2] space-y-8 md:space-y-12 px-2 md:px-0">
        {content.split('\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="mt-24 md:mt-48 pt-12 md:pt-24 border-t border-[var(--border-main)] flex justify-center">
        <LotusIcon className="w-8 h-8 text-[var(--text-faint)]" />
      </div>
    </article>
  );
};

const JournalView = ({ setView, setPostId }: { setView: (v: ViewState) => void, setPostId: (id: string) => void }) => {
  const [filter, setFilter] = useState<{ type: 'category' | 'year' | 'tag' | 'all', value: string }>({ type: 'all', value: 'All' });
  const { t, resolveText } = useLanguage();

  const filteredPosts = useMemo(() => {
    let posts = BLOG_POSTS;
    if (filter.type === 'category') posts = posts.filter(p => p.category === filter.value);
    if (filter.type === 'year') posts = posts.filter(p => p.sortDate.startsWith(filter.value));
    if (filter.type === 'tag') posts = posts.filter(p => p.tags.includes(filter.value));
    return posts;
  }, [filter]);

  const categories = getUniqueValues(BLOG_POSTS, 'category');
  const years = getUniqueValues(BLOG_POSTS, 'year');

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

const LibraryView = ({ setView, setBookId }: { setView: (v: ViewState) => void, setBookId: (id: string) => void }) => {
  const currentYearBooks = LIBRARY_BOOKS.filter(b => b.sortDate.startsWith('2025'));
  const recommendedBooks = LIBRARY_BOOKS.slice(0, 8); 
  const { t } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto pt-6 md:pt-12 pb-24 md:pb-32">
       {/* 2025 Section */}
       <StaticContainer>
         <div className="flex flex-col md:flex-row justify-between items-baseline mb-8 md:mb-12 border-b border-[var(--border-main)] pb-4 gap-4">
            <div className="flex items-baseline gap-6">
               <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-[var(--text-main)]">2025</h2>
               <span className="hidden md:inline text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">{t('label.current_reading')}</span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">{t('label.total_reviews')} {currentYearBooks.length}</span>
         </div>
       </StaticContainer>
       
       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 md:gap-x-6 gap-y-8 md:gap-y-12 mb-16 md:mb-32">
          {currentYearBooks.map((book, idx) => (
                <ShelfBook 
                  key={book.id} 
                  book={book} 
                  onClick={() => { setBookId(book.id); setView(ViewState.BOOK_DETAIL); }} 
                  highlight={idx === 0} 
                />
          ))}
       </div>

       {/* Year Link */}
       <StaticContainer>
         <div className="flex items-center gap-6 mb-16 md:mb-32">
            <button className="bg-[var(--bg-secondary)] px-6 md:px-8 py-3 md:py-4 text-[10px] uppercase tracking-[0.2em] text-[var(--text-body)] border border-[var(--border-main)] hover:border-[var(--border-strong)] hover:text-[var(--text-main)] flex items-center gap-3 group">
               {t('btn.view_full_year')} <span className="text-lg">→</span>
            </button>
            <span className="font-serif text-2xl md:text-3xl text-[var(--text-faint)]">2024</span>
         </div>
       </StaticContainer>

       {/* Recommended Section */}
       <StaticContainer>
         <div className="flex justify-between items-baseline mb-8 md:mb-16 border-b border-[var(--border-main)] pb-4">
            <h2 className="text-3xl md:text-4xl font-serif text-[var(--text-main)]">{t('label.recommended')}</h2>
             <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">{recommendedBooks.length} {t('label.total_books')}</span>
         </div>
       </StaticContainer>
       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 md:gap-x-6 gap-y-8 md:gap-y-12">
          {recommendedBooks.map((book, idx) => (
                <ShelfBook 
                  key={`rec-${book.id}`} 
                  book={book} 
                  onClick={() => { setBookId(book.id); setView(ViewState.BOOK_DETAIL); }} 
                />
          ))}
       </div>
    </div>
  );
};

const BookDetailView = ({ bookId, onBack }: { bookId: string | null, onBack: () => void }) => {
  const book = LIBRARY_BOOKS.find(b => b.id === bookId);
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

const ReactionsView = ({ setView, setReactionId }: { setView: (v: ViewState) => void, setReactionId: (id: string) => void }) => {
    const [filter, setFilter] = useState<{ type: 'category' | 'year' | 'tag' | 'all', value: string }>({ type: 'all', value: 'All' });
    const { t } = useLanguage();

    const filteredReactions = useMemo(() => {
        let items = REACTIONS;
        if (filter.type === 'category') items = items.filter(r => r.category === filter.value);
        if (filter.type === 'year') items = items.filter(r => r.sortDate.startsWith(filter.value));
        return items;
    }, [filter]);

    const categories = getUniqueValues(REACTIONS, 'category');
    const years = getUniqueValues(REACTIONS, 'year');

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

const PortfolioView = ({ setView, setPortfolioId }: { setView: (v: ViewState) => void, setPortfolioId: (id: string) => void }) => {
  const [filter, setFilter] = useState<{ type: 'category' | 'year' | 'tag' | 'all', value: string }>({ type: 'all', value: 'All' });
  const { t } = useLanguage();

  const filteredItems = useMemo(() => {
    let items = PORTFOLIO_ITEMS;
    if (filter.type === 'category') items = items.filter(i => i.category === filter.value);
    if (filter.type === 'year') items = items.filter(i => i.year === filter.value);
    return items;
  }, [filter]);

  const categories = getUniqueValues(PORTFOLIO_ITEMS, 'category');
  const years = getUniqueValues(PORTFOLIO_ITEMS, 'year');

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
            {/* Portfolio Grid: Mobile 1, Tablet 2, Desktop 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-20">
                {filteredItems.map((item, idx) => (
                    <PortfolioCard key={item.id} item={item} onClick={() => { setPortfolioId(item.id); setView(ViewState.PORTFOLIO_DETAIL); }} />
                ))}
            </div>
        </div>
    </div>
  );
};

const PortfolioDetailView = ({ itemId, onBack }: { itemId: string | null, onBack: () => void }) => {
  const item = PORTFOLIO_ITEMS.find(i => i.id === itemId);
  const { t, resolveText } = useLanguage();
  if (!item) return <div>Item not found.</div>;

  return (
    <div className="pb-24 md:pb-32 pt-6 md:pt-12">
       <button onClick={onBack} className="mb-16 md:mb-32 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center gap-3">
        &larr; {t('nav.portfolio')}
      </button>
      <div className="max-w-6xl mx-auto">
         <div className="w-full bg-[var(--bg-hover)] mb-12 md:mb-20 border border-[var(--border-main)] p-4 md:p-8">
            <img src={item.thumbnailUrl} alt={resolveText(item.title)} className="w-full h-auto object-cover" style={{ filter: 'var(--img-filter)', opacity: 'var(--img-opacity)' }} />
         </div>
         <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
            <div className="md:col-span-4 space-y-8 md:space-y-10">
                  <div>
                      <h4 className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3">{t('label.category')}</h4>
                      <p className="font-serif text-xl md:text-2xl text-[var(--text-main)]">{item.category}</p>
                  </div>
                  <div>
                      <h4 className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3">{t('label.year')}</h4>
                      <p className="font-serif text-xl md:text-2xl text-[var(--text-main)]">{item.year}</p>
                  </div>
                  <div>
                      <h4 className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4">{t('label.tools')}</h4>
                      <div className="flex flex-wrap gap-3">
                        {item.tools.map(t => <span key={t} className="text-xs border border-[var(--border-main)] px-3 py-1 text-[var(--text-muted)]">{t}</span>)}
                      </div>
                  </div>
            </div>
            <div className="md:col-span-8 space-y-10 md:space-y-16">
                 <h1 className="text-4xl md:text-6xl font-serif text-[var(--text-main)] leading-none">{resolveText(item.title)}</h1>
                 <p className="text-2xl md:text-3xl font-serif text-[var(--text-body)] italic leading-relaxed">{resolveText(item.description)}</p>
                 <div className="h-px bg-[var(--border-main)] w-20"></div>
                 <div className="font-serif text-[var(--text-body)] text-lg md:text-xl leading-loose">
                   <p>{resolveText(item.reflection)}</p>
                 </div>
            </div>
         </div>
      </div>
    </div>
  );
};

const ImaginariumView = ({ setView, setItemId }: { setView: (v: ViewState) => void, setItemId: (id: string) => void }) => {
  const [filter, setFilter] = useState<{ type: 'category' | 'year' | 'tag' | 'all', value: string }>({ type: 'all', value: 'All' });
  const { t } = useLanguage();

  const filteredItems = useMemo(() => {
    let items = INSPIRATION_ITEMS;
    if (filter.type === 'category') items = items.filter(i => i.category === filter.value);
    if (filter.type === 'year') items = items.filter(i => i.sortDate.startsWith(filter.value));
    if (filter.type === 'tag') items = items.filter(i => i.tags?.includes(filter.value));
    return items;
  }, [filter]);

  const categories = getUniqueValues(INSPIRATION_ITEMS, 'category');
  const years = getUniqueValues(INSPIRATION_ITEMS, 'year');

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
            {/* Imaginarium Masonry: Mobile 1, Tablet 2, Desktop 3 */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 md:gap-12 space-y-8 md:space-y-12">
            {filteredItems.map((item, idx) => (
                    <InspirationCard key={item.id} item={item} onClick={() => { setItemId(item.id); setView(ViewState.INSPIRATION_DETAIL); }} />
            ))}
            </div>
        </div>
    </div>
  );
};

const ImaginariumDetailView = ({ itemId, onBack, onEdit }: { itemId: string | null, onBack: () => void, onEdit: (url: string) => void }) => {
  const item = INSPIRATION_ITEMS.find(i => i.id === itemId);
  const { t, resolveText } = useLanguage();
  if (!item) return <div>Item not found</div>;
  
  return (
    <div className="max-w-4xl mx-auto pt-12 md:pt-24 pb-32 text-center">
       <button onClick={onBack} className="mb-16 md:mb-24 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)]">
        &larr; {t('btn.return')}
      </button>
      <div className="bg-[var(--bg-card)] p-6 md:p-20 border border-[var(--border-main)] relative group shadow-[5px_5px_0px_rgba(0,0,0,0.02)]">
         {item.type === 'Image' && (
            <button 
              onClick={() => onEdit(item.content)}
              className="absolute top-6 right-6 bg-[var(--text-main)] text-[var(--bg-main)] p-3 opacity-0 group-hover:opacity-100"
              title="Edit"
            >
               <WandIcon className="w-5 h-5" />
            </button>
         )}
         <div className="mb-10 md:mb-16">
           {item.type === 'Image' && <img src={item.content} alt="Inspiration" className="w-full h-auto border border-[var(--border-main)] p-4" style={{ filter: 'var(--img-filter)', opacity: 'var(--img-opacity)' }} />}
           {item.type === 'Color' && <div className="w-full h-60 md:h-80 border border-[var(--border-main)]" style={{ backgroundColor: item.content }}></div>}
           {item.type === 'Quote' && <h2 className="text-2xl md:text-4xl font-serif italic text-[var(--text-main)] leading-relaxed">"{item.content}"</h2>}
           {item.type === 'Note' && <p className="text-xl md:text-3xl font-serif text-[var(--text-main)] leading-relaxed">{item.content}</p>}
         </div>
         <div className="space-y-8 md:space-y-10 text-left border-t border-[var(--border-main)] pt-8 md:pt-12">
            <div className="flex items-center gap-4 mb-4">
              <CategoryLabel label={item.category} />
              {item.tags && item.tags.map(t => <TagPill key={t} label={t} />)}
            </div>
            {item.source && <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)]">{t('label.source')}: {item.source}</p>}
            <div className="bg-[var(--bg-secondary)] p-6 md:p-8 border border-[var(--border-main)]">
                 <p className="font-serif text-[var(--text-body)] italic text-lg md:text-xl mb-4">"{resolveText(item.notes)}"</p>
                 <p className="font-serif text-[var(--text-main)] text-base md:text-lg">{t('label.why')}: {resolveText(item.why)}</p>
            </div>
         </div>
      </div>
    </div>
  );
};

const FragmentsView = () => {
  const [filter, setFilter] = useState<{ type: 'category' | 'year' | 'tag' | 'all', value: string }>({ type: 'all', value: 'All' });
  const { t, resolveText, formatDate } = useLanguage();

  const filteredFragments = useMemo(() => {
    let items = FRAGMENTS;
    if (filter.type === 'category') items = items.filter(f => f.category === filter.value);
    if (filter.type === 'year') items = items.filter(f => f.sortDate.startsWith(filter.value));
    return items;
  }, [filter]);

  const categories = getUniqueValues(FRAGMENTS, 'category');
  const years = getUniqueValues(FRAGMENTS, 'year');

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

const ReactionDetailView = ({ reactionId, onBack }: { reactionId: string | null, onBack: () => void }) => {
    const reaction = REACTIONS.find(r => r.id === reactionId);
    const { t, resolveText, formatDate } = useLanguage();
    if (!reaction) return <div>Reaction not found.</div>;

    return (
        <div className="pb-24 md:pb-32 pt-6 md:pt-12 max-w-5xl mx-auto">
            <button onClick={onBack} className="mb-16 md:mb-32 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center gap-3">
                &larr; {t('nav.reactions')}
            </button>

            <div className="space-y-12 md:space-y-24">
                <div className="w-full bg-[var(--bg-hover)] p-4 md:p-6 border border-[var(--border-main)]">
                     <img src={reaction.imageUrl} alt={reaction.title} className="w-full h-auto object-cover" style={{ filter: 'var(--img-filter)', opacity: 'var(--img-opacity)' }} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
                    <div className="md:col-span-4 space-y-8 md:space-y-10 border-b md:border-b-0 md:border-r border-[var(--border-main)] pb-12 md:pb-0 md:pr-10">
                             <h1 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] leading-tight">{reaction.title}</h1>
                             <p className="text-[var(--text-muted)] font-serif italic text-xl md:text-2xl">{resolveText(reaction.creator)}</p>
                             <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-faint)]">{formatDate(reaction.dateExperienced)}</p>
                             <div className="pt-10 mt-10 border-t border-[var(--border-main)]">
                                <h4 className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4">{t('label.summary')}</h4>
                                <p className="text-base md:text-lg font-serif text-[var(--text-body)] leading-relaxed">{resolveText(reaction.summary)}</p>
                             </div>
                    </div>
                    <div className="md:col-span-8">
                            <div className="font-serif text-[var(--text-main)] text-xl md:text-2xl leading-[2.2]">
                                <p>{resolveText(reaction.reflection)}</p>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Archive / Directory View ---

const ArchiveView = ({ setView, setPostId, setBookId, setReactionId, setPortfolioId, setInspirationId, onOpenPhilosopher }: any) => {
    const [activeTab, setActiveTab] = useState<'Timeline' | 'Category' | 'Tags' | 'Modules'>('Timeline');
    const [searchQuery, setSearchQuery] = useState('');
    const { t, resolveText, language } = useLanguage();
    
    const allContent = useMemo(() => getAllContent(resolveText), [language]); // Re-fetch when language changes
    
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

// --- Navigation Component ---

const Navigation = ({ view, setView }: { view: ViewState, setView: (v: ViewState) => void }) => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (targetView: ViewState) => {
    setView(targetView);
    setIsMoreOpen(false);
    setIsMobileMenuOpen(false);
  };

  const isMoreActive = [
    ViewState.REACTIONS, ViewState.REACTION_DETAIL,
    ViewState.INSPIRATION, ViewState.INSPIRATION_DETAIL,
    ViewState.FRAGMENTS, ViewState.DIRECTORY, ViewState.ABOUT
  ].includes(view);

  // Compact Language Switcher
  const LanguageSwitcher = ({ mobile = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { language, setLanguage } = useLanguage();
    const switcherRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (switcherRef.current && !switcherRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const langs: {code: Language, label: string}[] = [
        {code: 'en', label: 'EN'},
        {code: 'zh-CN', label: '简'},
        {code: 'zh-TW', label: '繁'},
        {code: 'ja', label: 'JP'},
        {code: 'ko', label: 'KR'},
    ];
    
    return (
        <div className={`relative ${!mobile ? 'ml-6 pl-6 border-l border-[var(--border-main)]' : ''}`} ref={switcherRef}>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center gap-2"
              title="Select Language"
            >
               <GlobeIcon className="w-4 h-4" />
            </button>
            
            {isOpen && (
              <div className={`absolute ${mobile ? 'left-0 bottom-full mb-2' : 'right-0 top-full mt-4'} bg-[var(--bg-card)] border border-[var(--border-main)] shadow-none z-50 flex flex-col min-w-[80px]`}>
                 {langs.map(l => (
                   <button 
                      key={l.code} 
                      onClick={() => { setLanguage(l.code); setIsOpen(false); }}
                      className={`block w-full text-left px-4 py-3 text-[10px] uppercase tracking-widest hover:bg-[var(--bg-hover)] hover:text-[var(--text-main)] ${language === l.code ? 'text-[var(--text-main)] font-bold' : 'text-[var(--text-muted)]'}`}
                   >
                     {l.label}
                   </button>
                 ))}
              </div>
            )}
        </div>
    );
  }
  
  const ThemeToggle = ({ mobile = false }) => (
    <button 
      onClick={toggleTheme} 
      className={`${!mobile ? 'ml-6' : ''} text-[var(--text-muted)] hover:text-[var(--text-main)]`}
      title={theme === 'light' ? 'Ink Mode' : 'Light Mode'}
    >
      {theme === 'light' ? <MoonIcon className="w-4 h-4" /> : <SunIcon className="w-4 h-4" />}
    </button>
  );

  // Mobile Menu Overlay
  const MobileMenu = () => (
    <div className="fixed inset-0 bg-[var(--bg-main)] z-50 flex flex-col p-6 overflow-y-auto h-dvh">
      <div className="flex justify-end mb-8 flex-shrink-0">
        <button onClick={() => setIsMobileMenuOpen(false)} className="text-[var(--text-main)] p-2">
          <XIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="flex flex-col gap-6 items-start w-full flex-grow min-h-0">
          <button onClick={() => handleNavClick(ViewState.JOURNAL)} className="text-3xl font-serif text-[var(--text-main)] font-medium hover:opacity-70 text-left">{t('nav.journal')}</button>
          <button onClick={() => handleNavClick(ViewState.LIBRARY)} className="text-3xl font-serif text-[var(--text-main)] font-medium hover:opacity-70 text-left">{t('nav.library')}</button>
          <button onClick={() => handleNavClick(ViewState.PORTFOLIO)} className="text-3xl font-serif text-[var(--text-main)] font-medium hover:opacity-70 text-left">{t('nav.portfolio')}</button>
          
          <div className="h-px w-24 bg-[var(--border-main)] my-2"></div>
          
          <div className="flex flex-col gap-4 mt-2">
            <button onClick={() => handleNavClick(ViewState.REACTIONS)} className="text-lg font-serif text-[var(--text-muted)] hover:text-[var(--text-main)] text-left">{t('nav.reactions')}</button>
            <button onClick={() => handleNavClick(ViewState.INSPIRATION)} className="text-lg font-serif text-[var(--text-muted)] hover:text-[var(--text-main)] text-left">{t('nav.imaginarium')}</button>
            <button onClick={() => handleNavClick(ViewState.FRAGMENTS)} className="text-lg font-serif text-[var(--text-muted)] hover:text-[var(--text-main)] text-left">{t('nav.fragments')}</button>
            <button onClick={() => handleNavClick(ViewState.DIRECTORY)} className="text-lg font-serif text-[var(--text-muted)] hover:text-[var(--text-main)] text-left">{t('nav.archive')}</button>
            <button onClick={() => handleNavClick(ViewState.ABOUT)} className="text-lg font-serif text-[var(--text-muted)] hover:text-[var(--text-main)] text-left">{t('nav.about')}</button>
          </div>
          
          <div className="mt-auto w-full pt-8 pb-4 border-t border-[var(--border-main)] flex items-center gap-8">
            <LanguageSwitcher mobile={true} />
            <ThemeToggle mobile={true} />
          </div>
      </div>
    </div>
  );

  return (
    <nav className="sticky top-0 z-40 bg-[var(--bg-main)] bg-opacity-95 border-b border-[var(--border-main)] py-5 md:py-8">
      <div className="max-w-[1500px] mx-auto px-5 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="cursor-pointer group flex-shrink-0" 
          onClick={() => setView(ViewState.HOME)}
        >
          <span className="font-serif font-medium text-[var(--text-main)] tracking-[0.25em] text-xs md:text-sm group-hover:opacity-70">{t('app.title')}</span>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden">
           <button onClick={() => setIsMobileMenuOpen(true)} className="text-[var(--text-main)]">
             <MenuIcon className="w-6 h-6" />
           </button>
        </div>
        
        {/* Desktop Nav */}
        <div className="items-center gap-8 hidden lg:flex">
          <NavButton label={t('nav.journal')} isActive={view === ViewState.JOURNAL || view === ViewState.ARTICLE} onClick={() => handleNavClick(ViewState.JOURNAL)} />
          <NavButton label={t('nav.library')} isActive={view === ViewState.LIBRARY || view === ViewState.BOOK_DETAIL} onClick={() => handleNavClick(ViewState.LIBRARY)} />
          <NavButton label={t('nav.portfolio')} isActive={view === ViewState.PORTFOLIO || view === ViewState.PORTFOLIO_DETAIL} onClick={() => handleNavClick(ViewState.PORTFOLIO)} />
          
          {/* Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <NavButton 
              label={t('nav.more')} 
              isActive={isMoreActive} 
              onClick={() => setIsMoreOpen(!isMoreOpen)} 
              hasDropdown 
            />
            
            {isMoreOpen && (
              <div className="absolute right-0 mt-6 w-56 bg-[var(--bg-card)] border border-[var(--border-main)] py-4 z-50 shadow-lg">
                <button onClick={() => handleNavClick(ViewState.REACTIONS)} className="block w-full text-left px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)]">
                   {t('nav.reactions')}
                </button>
                <button onClick={() => handleNavClick(ViewState.INSPIRATION)} className="block w-full text-left px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)]">
                   {t('nav.imaginarium')}
                </button>
                <button onClick={() => handleNavClick(ViewState.FRAGMENTS)} className="block w-full text-left px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)]">
                   {t('nav.fragments')}
                </button>
                <div className="h-px bg-[var(--border-main)] my-2 mx-6"></div>
                <button onClick={() => handleNavClick(ViewState.DIRECTORY)} className="block w-full text-left px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)]">
                   {t('nav.archive')}
                </button>
                <button onClick={() => handleNavClick(ViewState.ABOUT)} className="block w-full text-left px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)]">
                   {t('nav.about')}
                </button>
              </div>
            )}
          </div>

          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && <MobileMenu />}
    </nav>
  );
};

// --- Main Layout ---

export default function App() {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [postId, setPostId] = useState<string | null>(null);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [selectedReactionId, setSelectedReactionId] = useState<string | null>(null);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(null);
  const [selectedInspirationId, setSelectedInspirationId] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const [showPhilosopher, setShowPhilosopher] = useState(false);
  const [imageToEdit, setImageToEdit] = useState<string | null>(null);

  // Translation Helper
  const t = (key: string) => translations[language][key] || key;

  // Content Resolver
  const resolveText = (text: LocalizedText): string => {
      if (typeof text === 'string') return text;
      return text[language] || text['en'] || '';
  };

  // Date Formatter
  const formatDate = (dateStr: string) => {
      try {
          const date = new Date(dateStr);
          return new Intl.DateTimeFormat(language, { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
      } catch (e) {
          return dateStr;
      }
  };

  const renderView = () => {
    switch (view) {
      case ViewState.HOME:
        return <HomeView setView={setView} />;
      case ViewState.JOURNAL:
        return <JournalView setView={setView} setPostId={setPostId} />;
      case ViewState.ARTICLE:
        return <ArticleView postId={postId} onBack={() => setView(ViewState.JOURNAL)} />;
      case ViewState.LIBRARY:
        return <LibraryView setView={setView} setBookId={setSelectedBookId} />;
      case ViewState.BOOK_DETAIL:
        return <BookDetailView bookId={selectedBookId} onBack={() => setView(ViewState.LIBRARY)} />;
      case ViewState.REACTIONS:
        return <ReactionsView setView={setView} setReactionId={setSelectedReactionId} />;
      case ViewState.REACTION_DETAIL:
        return <ReactionDetailView reactionId={selectedReactionId} onBack={() => setView(ViewState.REACTIONS)} />;
      case ViewState.PORTFOLIO:
        return <PortfolioView setView={setView} setPortfolioId={setSelectedPortfolioId} />;
      case ViewState.PORTFOLIO_DETAIL:
        return <PortfolioDetailView itemId={selectedPortfolioId} onBack={() => setView(ViewState.PORTFOLIO)} />;
      case ViewState.INSPIRATION:
        return <ImaginariumView setView={setView} setItemId={setSelectedInspirationId} />;
      case ViewState.INSPIRATION_DETAIL:
        return <ImaginariumDetailView itemId={selectedInspirationId} onBack={() => setView(ViewState.INSPIRATION)} onEdit={setImageToEdit} />;
      case ViewState.FRAGMENTS:
        return <FragmentsView />;
      case ViewState.DIRECTORY:
        return <ArchiveView 
          setView={setView} 
          setPostId={setPostId} 
          setBookId={setSelectedBookId} 
          setReactionId={setSelectedReactionId} 
          setPortfolioId={setSelectedPortfolioId}
          setInspirationId={setSelectedInspirationId}
          onOpenPhilosopher={() => setShowPhilosopher(true)}
        />;
      case ViewState.ABOUT:
        return (
          <div className="max-w-xl mx-auto py-24 md:py-48 text-center space-y-12 md:space-y-16">
             <div className="w-32 h-32 md:w-40 md:h-40 border border-[var(--border-main)] mx-auto flex items-center justify-center bg-[var(--bg-card)]">
               <LotusIcon className="w-10 h-10 md:w-12 md:h-12 text-[var(--text-muted)]" />
             </div>
             <div>
                <h1 className="text-3xl md:text-4xl font-serif text-[var(--text-main)] mb-4">{t('about.gardener')}</h1>
                <p className="text-sm uppercase tracking-[0.2em] text-[var(--text-muted)]">2025</p>
             </div>
             <p className="font-serif text-[var(--text-body)] text-lg md:text-xl leading-[2.2]">
                {t('about.text')}
             </p>
             <div className="pt-16 md:pt-20 border-t border-[var(--border-main)]">
                <button onClick={() => setView(ViewState.HOME)} className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)]">
                   {t('btn.return')}
                </button>
             </div>
          </div>
        );
      default:
        return <HomeView setView={setView} />;
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <LanguageContext.Provider value={{ language, setLanguage, t, resolveText, formatDate }}>
        <div className="min-h-screen relative bg-[var(--bg-main)] text-[var(--text-main)] selection:bg-[var(--text-muted)] selection:text-[var(--bg-main)]">
          <WashiPattern />
          <Navigation view={view} setView={setView} />
          
          <main className="px-5 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
            {renderView()}
          </main>
          
          <footer className="py-16 md:py-24 mt-24 md:mt-32 border-t border-[var(--border-main)] text-center">
             <div className="flex justify-center gap-8 mb-8">
               <TeaIcon className="w-5 h-5 text-[var(--text-faint)]" />
               <FeatherIcon className="w-5 h-5 text-[var(--text-faint)]" />
             </div>
             <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)]">{t('footer.rights')}</p>
          </footer>

          {/* Modals */}
          {showPhilosopher && <PhilosopherModal onClose={() => setShowPhilosopher(false)} />}
          {imageToEdit && <ImageEditor imageUrl={imageToEdit} onClose={() => setImageToEdit(null)} />}

        </div>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}