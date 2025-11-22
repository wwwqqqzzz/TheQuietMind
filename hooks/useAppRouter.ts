
import { useState, useEffect } from 'react';
import { ViewState } from '../types/index';

export const useAppRouter = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [postId, setPostId] = useState<string | null>(null);
  const [bookId, setBookId] = useState<string | null>(null);
  const [reactionId, setReactionId] = useState<string | null>(null);
  const [portfolioId, setPortfolioId] = useState<string | null>(null);
  const [inspirationId, setInspirationId] = useState<string | null>(null);

  useEffect(() => {
    // Simple check for /admin in URL to trigger admin view
    const path = window.location.pathname;
    if (path === '/admin') {
      setView(ViewState.ADMIN);
    }

    // Handle browser back/forward
    const handlePopState = () => {
      if (window.location.pathname === '/admin') {
        setView(ViewState.ADMIN);
      } else {
        // Basic fallback
        setView(ViewState.HOME);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return {
    view, setView,
    postId, setPostId,
    bookId, setBookId,
    reactionId, setReactionId,
    portfolioId, setPortfolioId,
    inspirationId, setInspirationId
  };
};
