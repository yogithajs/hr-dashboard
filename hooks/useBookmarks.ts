'use client';

import { useEffect, useState } from 'react';
import { User } from '../types/User';

export default function useBookmarks(): {
  bookmarks: User[];
  addBookmark: (user: User) => void;
  removeBookmark: (id: number) => void;
} {
  const [bookmarks, setBookmarks] = useState<User[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('bookmarks');
      if (stored) {
        try {
          setBookmarks(JSON.parse(stored));
        } catch (e) {
          console.error('Failed to parse bookmarks:', e);
          localStorage.removeItem('bookmarks');
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
  }, [bookmarks]);

  const addBookmark = (user: User) => {
    if (!bookmarks.find(b => b.id === user.id)) {
      setBookmarks(prev => [...prev, user]);
    }
  };

  const removeBookmark = (id: number) => {
    setBookmarks(prev => prev.filter(user => user.id !== id));
  };

  return { bookmarks, addBookmark, removeBookmark };
}
