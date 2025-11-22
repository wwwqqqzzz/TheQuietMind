
import React, { useState } from 'react';
import { ViewState } from './types/index';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { useAppRouter } from './hooks/useAppRouter';
import { useContent } from './hooks/useContent';
import { useAuth } from './hooks/useAuth';
import { INITIAL_PORTFOLIO_ITEMS, INITIAL_INSPIRATION_ITEMS, INITIAL_FRAGMENTS } from './data/index';

// Layouts
import Navigation from './layouts/Navigation';
import { WashiPattern } from './components/ui/WashiPattern';
import { TeaIcon, FeatherIcon } from './components/Icons';

// Features
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLogin } from './components/admin/AdminLogin';
import { PhilosopherModal } from './components/features/PhilosopherModal';
import { ImageEditor } from './components/features/ImageEditor';

// Pages
import HomeView from './pages/Home';
import JournalView from './pages/Journal';
import ArticleView from './pages/Article';
import LibraryView from './pages/Library';
import ArchiveView from './pages/Archive';

import { BookDetailView } from './pages/BookDetail';
import { ReactionsView } from './pages/Reactions';
import { ReactionDetailView } from './pages/ReactionDetail';
import { PortfolioView } from './pages/Portfolio';
import { PortfolioDetailView } from './pages/PortfolioDetail';
import { ImaginariumView } from './pages/Imaginarium';
import { ImaginariumDetailView } from './pages/ImaginariumDetail';
import { FragmentsView } from './pages/Fragments';
import { AboutView } from './pages/About';


function AppContent() {
  const { 
    view, setView, 
    postId, setPostId, 
    bookId, setBookId, 
    reactionId, setReactionId,
    portfolioId, setPortfolioId,
    inspirationId, setInspirationId
  } = useAppRouter();

  const { allPosts, allBooks, allReactions, addPost, addBook, addReaction } = useContent();
  const { isAuthenticated } = useAuth();
  
  const [showPhilosopher, setShowPhilosopher] = useState(false);
  const [imageToEdit, setImageToEdit] = useState<string | null>(null);
  const { t } = useLanguage();

  const handleSavePost = (p: any) => { addPost(p); };
  const handleSaveBook = (b: any) => { addBook(b); };
  const handleSaveReaction = (r: any) => { addReaction(r); };

  // ADMIN ROUTE HANDLER
  if (view === ViewState.ADMIN) {
    if (!isAuthenticated) {
        return <AdminLogin />;
    }
    return <AdminDashboard 
        onSavePost={handleSavePost}
        onSaveBook={handleSaveBook}
        onSaveReaction={handleSaveReaction}
    />;
  }

  // PUBLIC ROUTES
  const renderView = () => {
    switch (view) {
      case ViewState.HOME:
        return <HomeView setView={setView} latestPost={allPosts[0]} libraryBooks={allBooks} />;
      case ViewState.JOURNAL:
        return <JournalView setView={setView} setPostId={setPostId} posts={allPosts} />;
      case ViewState.ARTICLE:
        return <ArticleView postId={postId} onBack={() => setView(ViewState.JOURNAL)} posts={allPosts} />;
      case ViewState.LIBRARY:
        return <LibraryView setView={setView} setBookId={setBookId} books={allBooks} />;
      case ViewState.BOOK_DETAIL:
        return <BookDetailView bookId={bookId} onBack={() => setView(ViewState.LIBRARY)} books={allBooks} />;
      case ViewState.REACTIONS:
        return <ReactionsView setView={setView} setReactionId={setReactionId} reactions={allReactions} />;
      case ViewState.REACTION_DETAIL:
        return <ReactionDetailView reactionId={reactionId} onBack={() => setView(ViewState.REACTIONS)} reactions={allReactions} />;
      case ViewState.PORTFOLIO:
        return <PortfolioView setView={setView} setPortfolioId={setPortfolioId} />;
      case ViewState.PORTFOLIO_DETAIL:
        return <PortfolioDetailView itemId={portfolioId} onBack={() => setView(ViewState.PORTFOLIO)} />;
      case ViewState.INSPIRATION:
        return <ImaginariumView setView={setView} setItemId={setInspirationId} />;
      case ViewState.INSPIRATION_DETAIL:
        return <ImaginariumDetailView itemId={inspirationId} onBack={() => setView(ViewState.INSPIRATION)} onEdit={setImageToEdit} />;
      case ViewState.FRAGMENTS:
        return <FragmentsView />;
      case ViewState.DIRECTORY:
        return <ArchiveView 
          setView={setView} 
          setPostId={setPostId} 
          setBookId={setBookId} 
          setReactionId={setReactionId} 
          setPortfolioId={setPortfolioId}
          setInspirationId={setInspirationId}
          onOpenPhilosopher={() => setShowPhilosopher(true)}
          contentData={{ posts: allPosts, books: allBooks, reactions: allReactions, portfolio: INITIAL_PORTFOLIO_ITEMS, inspiration: INITIAL_INSPIRATION_ITEMS, fragments: INITIAL_FRAGMENTS }}
        />;
      case ViewState.ABOUT:
        return <AboutView setView={setView} />;
      default:
        return <HomeView setView={setView} latestPost={allPosts[0]} libraryBooks={allBooks} />;
    }
  };

  return (
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

      {showPhilosopher && <PhilosopherModal onClose={() => setShowPhilosopher(false)} />}
      {imageToEdit && <ImageEditor imageUrl={imageToEdit} onClose={() => setImageToEdit(null)} />}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
