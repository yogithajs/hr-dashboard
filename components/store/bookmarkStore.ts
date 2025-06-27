// hooks/useBookmarks.ts
import { User } from '@/types/User';
import { create } from 'zustand';


type BookmarkStore = {
  bookmarks: User[];
  addBookmark: (user: User) => void;
  removeBookmark: (id: number) => void;
};

const useBookmarks = create<BookmarkStore>((set) => ({
  bookmarks: [],
  addBookmark: (user) =>
    set((state) => ({
      bookmarks: [...state.bookmarks, user],
    })),
  removeBookmark: (id) =>
    set((state) => ({
      bookmarks: state.bookmarks.filter((u) => u.id !== id),
    })),
}));

export default useBookmarks;
