
export enum ViewState {
  HOME = 'HOME',
  JOURNAL = 'JOURNAL',
  ARTICLE = 'ARTICLE',
  LIBRARY = 'LIBRARY',
  BOOK_DETAIL = 'BOOK_DETAIL',
  REACTIONS = 'REACTIONS',
  REACTION_DETAIL = 'REACTION_DETAIL',
  PORTFOLIO = 'PORTFOLIO',
  PORTFOLIO_DETAIL = 'PORTFOLIO_DETAIL',
  INSPIRATION = 'INSPIRATION',
  INSPIRATION_DETAIL = 'INSPIRATION_DETAIL',
  FRAGMENTS = 'FRAGMENTS',
  DIRECTORY = 'DIRECTORY',
  ABOUT = 'ABOUT'
}

export type Language = 'en' | 'zh-CN' | 'zh-TW' | 'ja' | 'ko';

export type LocalizedText = string | { [key in Language]?: string };

// --- Taxonomy Definitions ---

export type JournalCategory = 'Reflection' | 'Philosophy' | 'Daily Notes' | 'Experiments' | 'Personal Essays';
export type LibraryCategory = 'Fiction' | 'Non-Fiction' | 'Classics' | 'Philosophy' | 'Art & Aesthetics' | 'Psychology' | 'Culture & Society';
export type ReactionCategory = 'Film' | 'Exhibition' | 'Performance' | 'Installation' | 'Visual Art';
export type PortfolioCategory = 'Writing' | 'Visual Work' | 'Conceptual Work' | 'Design' | 'Photography';
export type InspirationCategory = 'Imagery' | 'Quotes' | 'Objects' | 'Textures' | 'Scenes';
export type FragmentCategory = 'Ideas' | 'Lines' | 'Thoughts' | 'Drafts';

// --- Interfaces ---

export interface BlogPost {
  id: string;
  title: LocalizedText;
  date: string; // ISO string or base date
  sortDate: string;
  excerpt: LocalizedText;
  content: LocalizedText;
  tags: string[];
  category: JournalCategory;
}

export interface Book {
  id: string;
  title: string; // Titles often stay original
  author: LocalizedText;
  coverUrl: string;
  dateFinished: string;
  sortDate: string;
  tags: string[];
  category: LibraryCategory;
  reflection: LocalizedText;
  quotes: LocalizedText[];
}

export interface Reaction {
  id: string;
  title: string;
  creator: LocalizedText; 
  type: 'Film' | 'Art' | 'Music' | 'Experience'; 
  category: ReactionCategory;
  dateExperienced: string;
  sortDate: string;
  imageUrl: string;
  summary: LocalizedText;
  reflection: LocalizedText;
  rating?: string;
}

export interface PortfolioItem {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  year: string;
  sortDate: string;
  category: PortfolioCategory;
  tools: string[];
  thumbnailUrl: string;
  processImages?: string[];
  reflection: LocalizedText;
}

export interface InspirationItem {
  id: string;
  type: 'Image' | 'Quote' | 'Color' | 'Note';
  category: InspirationCategory;
  content: string; 
  source?: string;
  notes?: LocalizedText;
  why?: LocalizedText;
  sortDate: string;
  tags?: string[];
}

export interface Fragment {
  id: string;
  content: LocalizedText;
  date?: string;
  sortDate: string;
  category: FragmentCategory;
  tags?: string[];
}

export interface UnifiedContentItem {
  id: string;
  type: 'Journal' | 'Library' | 'Reaction' | 'Portfolio' | 'Inspiration' | 'Fragment';
  title: string; // Resolved string
  category: string;
  sortDate: string;
  displayDate?: string;
  tags?: string[];
  originalItem: BlogPost | Book | Reaction | PortfolioItem | InspirationItem | Fragment;
}
