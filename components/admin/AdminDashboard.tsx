
import React, { useState } from 'react';
import { CheckIcon, XIcon } from '../Icons';
import { BlogPost, Book, Reaction, PortfolioItem, InspirationItem, Fragment } from '../../types/index';
import { useAuth } from '../../hooks/useAuth';

interface AdminDashboardProps {
  onSavePost: (post: BlogPost) => void;
  onSaveBook: (book: Book) => void;
  onSaveReaction: (reaction: Reaction) => void;
  // In a real app, these would also save to state
  onSavePortfolio?: (item: PortfolioItem) => void;
  onSaveInspiration?: (item: InspirationItem) => void;
  onSaveFragment?: (item: Fragment) => void;
}

export const AdminDashboard = ({ onSavePost, onSaveBook, onSaveReaction }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState<'Journal' | 'Library' | 'Reactions' | 'Portfolio' | 'Imaginarium' | 'Fragments'>('Journal');
  const { logout } = useAuth();
  
  // Common State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [additional, setAdditional] = useState(''); // Generic field for author, creator, etc.

  const handlePublish = () => {
    const date = new Date().toISOString().split('T')[0];
    const id = `local-${Date.now()}`;

    if (activeTab === 'Journal') {
        if (!title || !content) return;
        onSavePost({
            id,
            title,
            date,
            sortDate: date,
            category: (category || 'Reflection') as any,
            excerpt: content.substring(0, 100) + '...',
            content,
            tags: []
        });
    } else if (activeTab === 'Library') {
        if (!title || !additional) return;
        onSaveBook({
            id,
            title,
            author: additional,
            coverUrl: imageUrl || `https://placehold.co/300x450/e5e5e5/0F0F0F?text=${encodeURIComponent(title)}`,
            dateFinished: 'Recently',
            sortDate: date,
            category: (category || 'Non-Fiction') as any,
            tags: [],
            reflection: content,
            quotes: []
        });
    } else if (activeTab === 'Reactions') {
        if (!title) return;
        onSaveReaction({
            id,
            title,
            creator: additional,
            type: 'Film',
            category: (category || 'Film') as any,
            dateExperienced: date,
            sortDate: date,
            imageUrl: imageUrl || `https://placehold.co/600x340/e5e5e5/57534e?text=${encodeURIComponent(title)}`,
            summary: 'Admin Entry',
            reflection: content
        });
    }
    
    // Clear form
    setTitle('');
    setContent('');
    setCategory('');
    setImageUrl('');
    setAdditional('');
    alert('Item Published Locally.');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)]">
      <nav className="bg-[var(--bg-main)] border-b border-[var(--border-main)] px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--text-main)]">Control Panel</span>
        <button onClick={logout} className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)]">Logout</button>
      </nav>

      <div className="flex h-[calc(100vh-60px)]">
        <aside className="w-48 border-r border-[var(--border-main)] bg-[var(--bg-main)] flex flex-col">
            {['Journal', 'Library', 'Reactions', 'Portfolio', 'Imaginarium', 'Fragments'].map(tab => (
                <button 
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`text-left px-6 py-4 text-[10px] uppercase tracking-[0.2em] hover:bg-[var(--bg-hover)] ${activeTab === tab ? 'bg-[var(--bg-secondary)] text-[var(--text-main)] font-bold' : 'text-[var(--text-muted)]'}`}
                >
                    {tab}
                </button>
            ))}
        </aside>

        <main className="flex-grow p-12 overflow-y-auto">
            <div className="max-w-4xl mx-auto space-y-8">
                <h2 className="text-3xl font-serif text-[var(--text-main)] mb-8">Add to {activeTab}</h2>

                {/* Dynamic Form Fields based on activeTab */}
                <div className="grid grid-cols-1 gap-8">
                    <input 
                        type="text" 
                        placeholder="Title / Main Content" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="w-full bg-transparent border-b border-[var(--border-main)] py-3 text-xl font-serif focus:outline-none focus:border-[var(--border-strong)]"
                    />
                    
                    {(activeTab === 'Library' || activeTab === 'Reactions' || activeTab === 'Portfolio') && (
                         <input 
                            type="text" 
                            placeholder={activeTab === 'Library' ? "Author" : "Creator / Director"}
                            value={additional}
                            onChange={e => setAdditional(e.target.value)}
                            className="w-full bg-transparent border-b border-[var(--border-main)] py-3 text-lg font-serif focus:outline-none focus:border-[var(--border-strong)]"
                        />
                    )}

                    {(activeTab !== 'Fragments') && (
                        <input 
                            type="text" 
                            placeholder="Category" 
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            className="w-full bg-transparent border-b border-[var(--border-main)] py-3 text-lg font-serif focus:outline-none focus:border-[var(--border-strong)]"
                        />
                    )}

                    {(activeTab === 'Library' || activeTab === 'Reactions' || activeTab === 'Portfolio' || activeTab === 'Imaginarium') && (
                        <input 
                            type="text" 
                            placeholder="Image URL" 
                            value={imageUrl}
                            onChange={e => setImageUrl(e.target.value)}
                            className="w-full bg-transparent border-b border-[var(--border-main)] py-3 text-lg font-serif focus:outline-none focus:border-[var(--border-strong)]"
                        />
                    )}

                    <textarea 
                        placeholder="Reflection / Content / Notes" 
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        className="w-full h-96 bg-[var(--bg-main)] border border-[var(--border-main)] p-6 font-serif text-lg leading-relaxed focus:outline-none focus:border-[var(--border-strong)] resize-none"
                    />
                </div>

                <div className="flex justify-end pt-8">
                    <button 
                        onClick={handlePublish}
                        className="bg-[var(--text-main)] text-[var(--bg-main)] px-10 py-4 text-[10px] uppercase tracking-[0.2em] hover:opacity-90 flex items-center gap-3"
                    >
                        <CheckIcon className="w-4 h-4" />
                        Publish Item
                    </button>
                </div>
            </div>
        </main>
      </div>
    </div>
  );
};
