import { create } from 'zustand';
import { User } from '../types/User';

type BookmarkState = {
  bookmarks: User[];
  addBookmark: (user: User) => void;
  removeBookmark: (id: number) => void;
};

export const useBookmarkStore = create<BookmarkState>((set) => ({
  bookmarks: [],
  addBookmark: (user) =>
    set((state) => {
      if (state.bookmarks.find((b) => b.id === user.id)) return state;
      return { bookmarks: [...state.bookmarks, user] };
    }),
  removeBookmark: (id) =>
    set((state) => ({
      bookmarks: state.bookmarks.filter((b) => b.id !== id),
    })),
}));
