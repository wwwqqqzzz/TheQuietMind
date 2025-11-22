
import React, { useState } from 'react';
import { CheckIcon } from '../Icons';
import { BlogPost, Book, Reaction } from '../../types/index';

export const CreatorStudio = ({ onSavePost, onSaveBook, onSaveReaction, onCancel }: { 
  onSavePost: (post: BlogPost) => void, 
  onSaveBook: (book: Book) => void,
  onSaveReaction: (reaction: Reaction) => void,
  onCancel: () => void 
}) => {
  const [mode, setMode] = useState<'Journal' | 'Book' | 'Reaction'>('Journal');
  
  // Journal State
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState('Reflection');
  
  // Book State
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookCover, setBookCover] = useState('');
  const [bookReflection, setBookReflection] = useState('');
  
  // Reaction State
  const [reactionTitle, setReactionTitle] = useState('');
  const [reactionCreator, setReactionCreator] = useState('');
  const [reactionImage, setReactionImage] = useState('');
  const [reactionReflection, setReactionReflection] = useState('');

  const handlePublish = () => {
    const date = new Date().toISOString().split('T')[0];
    
    if (mode === 'Journal') {
      if (!postTitle || !postContent) return;
      const newPost: BlogPost = {
        id: 'local-' + Date.now(),
        title: postTitle,
        date: date,
        sortDate: date,
        category: postCategory as any,
        excerpt: postContent.substring(0, 100) + '...',
        content: postContent,
        tags: ['personal']
      };
      onSavePost(newPost);
    } else if (mode === 'Book') {
      if (!bookTitle || !bookAuthor) return;
      const newBook: Book = {
        id: 'local-b-' + Date.now(),
        title: bookTitle,
        author: bookAuthor,
        coverUrl: bookCover || `https://placehold.co/300x450/e5e5e5/0F0F0F?text=${encodeURIComponent(bookTitle)}`,
        dateFinished: 'Recently',
        sortDate: date,
        category: 'Non-Fiction',
        tags: [],
        reflection: bookReflection,
        quotes: []
      };
      onSaveBook(newBook);
    } else if (mode === 'Reaction') {
      if (!reactionTitle) return;
      const newReaction: Reaction = {
        id: 'local-r-' + Date.now(),
        title: reactionTitle,
        creator: reactionCreator,
        type: 'Film',
        category: 'Film',
        dateExperienced: date,
        sortDate: date,
        imageUrl: reactionImage || `https://placehold.co/600x340/e5e5e5/57534e?text=${encodeURIComponent(reactionTitle)}`,
        summary: 'User Entry',
        reflection: reactionReflection
      };
      onSaveReaction(newReaction);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 md:py-24">
      <header className="mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-8">Creator Studio</h2>
        <div className="flex justify-center gap-8 border-b border-[var(--border-main)] pb-1">
          {['Journal', 'Book', 'Reaction'].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m as any)}
              className={`text-[10px] uppercase tracking-[0.2em] pb-4 ${mode === m ? 'text-[var(--text-main)] border-b border-[var(--text-main)] -mb-px' : 'text-[var(--text-muted)]'}`}
            >
              {m}
            </button>
          ))}
        </div>
      </header>

      <div className="space-y-12">
        {mode === 'Journal' && (
          <>
            <input 
              type="text" 
              placeholder="Title of Reflection" 
              value={postTitle}
              onChange={e => setPostTitle(e.target.value)}
              className="w-full bg-transparent border-b border-[var(--border-main)] py-4 text-3xl font-serif focus:outline-none focus:border-[var(--border-strong)] placeholder-[var(--text-faint)]"
            />
            <textarea 
              placeholder="Write your thoughts..." 
              value={postContent}
              onChange={e => setPostContent(e.target.value)}
              className="w-full h-96 bg-transparent border border-[var(--border-main)] p-6 font-serif text-lg leading-relaxed focus:outline-none focus:border-[var(--border-strong)] resize-none placeholder-[var(--text-faint)]"
            />
          </>
        )}

        {mode === 'Book' && (
          <>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <input 
                type="text" 
                placeholder="Book Title" 
                value={bookTitle}
                onChange={e => setBookTitle(e.target.value)}
                className="w-full bg-transparent border-b border-[var(--border-main)] py-4 text-2xl font-serif focus:outline-none focus:border-[var(--border-strong)]"
              />
              <input 
                type="text" 
                placeholder="Author" 
                value={bookAuthor}
                onChange={e => setBookAuthor(e.target.value)}
                className="w-full bg-transparent border-b border-[var(--border-main)] py-4 text-2xl font-serif focus:outline-none focus:border-[var(--border-strong)]"
              />
             </div>
             <input 
                type="text" 
                placeholder="Cover Image URL (Optional)" 
                value={bookCover}
                onChange={e => setBookCover(e.target.value)}
                className="w-full bg-transparent border-b border-[var(--border-main)] py-4 text-lg font-serif focus:outline-none focus:border-[var(--border-strong)] placeholder-[var(--text-faint)]"
              />
             <textarea 
              placeholder="Reflection on this book..." 
              value={bookReflection}
              onChange={e => setBookReflection(e.target.value)}
              className="w-full h-64 bg-transparent border border-[var(--border-main)] p-6 font-serif text-lg leading-relaxed focus:outline-none focus:border-[var(--border-strong)] resize-none"
            />
          </>
        )}

        {mode === 'Reaction' && (
          <>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <input 
                type="text" 
                placeholder="Work Title" 
                value={reactionTitle}
                onChange={e => setReactionTitle(e.target.value)}
                className="w-full bg-transparent border-b border-[var(--border-main)] py-4 text-2xl font-serif focus:outline-none focus:border-[var(--border-strong)]"
              />
              <input 
                type="text" 
                placeholder="Creator / Director" 
                value={reactionCreator}
                onChange={e => setReactionCreator(e.target.value)}
                className="w-full bg-transparent border-b border-[var(--border-main)] py-4 text-2xl font-serif focus:outline-none focus:border-[var(--border-strong)]"
              />
             </div>
             <input 
                type="text" 
                placeholder="Image URL (Optional)" 
                value={reactionImage}
                onChange={e => setReactionImage(e.target.value)}
                className="w-full bg-transparent border-b border-[var(--border-main)] py-4 text-lg font-serif focus:outline-none focus:border-[var(--border-strong)] placeholder-[var(--text-faint)]"
              />
             <textarea 
              placeholder="Your reaction..." 
              value={reactionReflection}
              onChange={e => setReactionReflection(e.target.value)}
              className="w-full h-64 bg-transparent border border-[var(--border-main)] p-6 font-serif text-lg leading-relaxed focus:outline-none focus:border-[var(--border-strong)] resize-none"
            />
          </>
        )}

        <div className="flex justify-end gap-8 pt-8 border-t border-[var(--border-main)]">
          <button onClick={onCancel} className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)]">Cancel</button>
          <button 
            onClick={handlePublish}
            className="bg-[var(--text-main)] text-[var(--bg-main)] px-8 py-3 text-[10px] uppercase tracking-[0.2em] hover:opacity-90 flex items-center gap-3"
          >
            <CheckIcon className="w-4 h-4" />
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};
