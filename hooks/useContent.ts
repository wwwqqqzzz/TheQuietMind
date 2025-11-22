
import { useState, useEffect, useMemo } from 'react';
import { BlogPost, Book, Reaction } from '../types/index';
import { INITIAL_BLOG_POSTS, INITIAL_LIBRARY_BOOKS, INITIAL_REACTIONS } from '../data/index';

export const useContent = () => {
  const [localPosts, setLocalPosts] = useState<BlogPost[]>([]);
  const [localBooks, setLocalBooks] = useState<Book[]>([]);
  const [localReactions, setLocalReactions] = useState<Reaction[]>([]);

  useEffect(() => {
    const savedPosts = localStorage.getItem('local_posts');
    const savedBooks = localStorage.getItem('local_books');
    const savedReactions = localStorage.getItem('local_reactions');

    if (savedPosts) setLocalPosts(JSON.parse(savedPosts));
    if (savedBooks) setLocalBooks(JSON.parse(savedBooks));
    if (savedReactions) setLocalReactions(JSON.parse(savedReactions));
  }, []);

  const allPosts = useMemo(() => [...localPosts, ...INITIAL_BLOG_POSTS].sort((a, b) => new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime()), [localPosts]);
  const allBooks = useMemo(() => [...localBooks, ...INITIAL_LIBRARY_BOOKS].sort((a, b) => new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime()), [localBooks]);
  const allReactions = useMemo(() => [...localReactions, ...INITIAL_REACTIONS].sort((a, b) => new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime()), [localReactions]);

  const addPost = (post: BlogPost) => {
    const updated = [post, ...localPosts];
    setLocalPosts(updated);
    localStorage.setItem('local_posts', JSON.stringify(updated));
  };

  const addBook = (book: Book) => {
    const updated = [book, ...localBooks];
    setLocalBooks(updated);
    localStorage.setItem('local_books', JSON.stringify(updated));
  };

  const addReaction = (reaction: Reaction) => {
    const updated = [reaction, ...localReactions];
    setLocalReactions(updated);
    localStorage.setItem('local_reactions', JSON.stringify(updated));
  };

  return {
    allPosts,
    allBooks,
    allReactions,
    addPost,
    addBook,
    addReaction
  };
};
