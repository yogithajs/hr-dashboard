'use client';

import { useEffect, useState } from 'react';
import useBookmarks from '../hooks/useBookmarks';
import UserCard from '../components/UserCard';
import { User } from '../types/User';
import SearchFilterBar from '../components/SearchFilterBar';

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const { addBookmark, removeBookmark, bookmarks } = useBookmarks();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    fetch('https://dummyjson.com/users?limit=20')
      .then(res => res.json())
      .then(data => {
        const updated = data.users.map((user: any) => ({
          ...user,
          department: getRandomDept(),
          performance: Math.ceil(Math.random() * 5),
          bio: 'A passionate team player with strong communication and leadership skills.',
          pastPerformance: [3, 4, 5, 4],
        }));
        setUsers(updated);
        setFilteredUsers(updated); // initialize filtered data
      });
  }, [mounted]);

  const getRandomDept = () => {
    const departments = ['HR', 'Engineering', 'Design', 'Sales'];
    return departments[Math.floor(Math.random() * departments.length)];
  };

  if (!mounted) return null;

  return (
    <main className="p-6">
      {/* 🔍 Search + Filter */}
      <SearchFilterBar data={users} onChange={setFilteredUsers} />

      {/* 🧑‍💼 User Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {filteredUsers.map((user) => {
          const isBookmarked = bookmarks.some((b) => b.id === user.id);
          return (
            <UserCard
              key={user.id}
              user={user}
              onBookmark={() =>
                isBookmarked ? removeBookmark(user.id) : addBookmark(user)
              }
              isBookmarked={isBookmarked}
            />
          );
        })}
      </div>
    </main>
  );
}