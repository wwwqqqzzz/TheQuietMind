
import React, { useState } from 'react';
import { BlogPost } from '../types/index';
import { useLanguage } from '../contexts/LanguageContext';
import { CategoryLabel } from '../components/ui/CategoryLabel';
import { AudioIcon, LotusIcon } from '../components/Icons';
import { speakText } from '../services/geminiService';

const ArticleView = ({ postId, onBack, posts }: { postId: string | null, onBack: () => void, posts: BlogPost[] }) => {
  const post = posts.find(p => p.id === postId);
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

export default ArticleView;
