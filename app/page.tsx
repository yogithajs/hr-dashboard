'use client';

import { useEffect, useState } from 'react';
import useBookmarks from '../hooks/useBookmarks';
import UserCard from '../components/UserCard';
import { User } from '../types/User';
import SearchFilterBar from '../components/SearchFilterBar';
import CreateUserModal from '../components/CreateUserModal';
export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const { addBookmark, removeBookmark, bookmarks } = useBookmarks();
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const getRandomDept = () => {
    const departments = ['HR', 'Engineering', 'Design', 'Sales'];
    return departments[Math.floor(Math.random() * departments.length)];
  };

  useEffect(() => {
    if (!mounted) return;

    const names = [
      { firstName: 'Yogitha', lastName: 'J S', email: 'yogithajs@dummyjson.com' },
      { firstName: 'Keerthana', lastName: 'P G', email: 'keerthanapg@dummyjson.com' },
      { firstName: 'Yashaswini', lastName: 'Jay', email: 'yashaswinijay@dummyjson.com' },
      { firstName: 'Meghana', lastName: 'Sharu', email: 'meghanasharu@dummyjson.com' },
      { firstName: 'Kavya', lastName: 'Rajesh', email: 'kavyarajesh@dummyjson.com' },
      { firstName: 'Nirmay', lastName: 'Busepalli', email: 'nirmay@dummyjson.com' },
      { firstName: 'Abhijith', lastName: 'Satya', email: 'abhijithsatya@dummyjson.com' },
      { firstName: 'Arpitha', lastName: 'Divya', email: 'arpithadivya@dummyjson.com' },
      { firstName: 'Venkat', lastName: 'Lakshmi', email: 'venkatlakshmi@dummyjson.com' },
      { firstName: 'Deva', lastName: 'Nandu', email: 'devanandu@dummyjson.com' },
      { firstName: 'Ramanji', lastName: 'Naveen', email: 'ramanjinaveen@dummyjson.com' },
      { firstName: 'Anu', lastName: 'Radha', email: 'anuradha@dummyjson.com' },
      { firstName: 'Pavan', lastName: 'Kumar', email: 'pavankumar@dummyjson.com' },
      { firstName: 'Sankeerthana', lastName: 'G D', email: 'sankeerthanagd@dummyjson.com' },
      { firstName: 'Sonam', lastName: 'G S', email: 'sonamgs@dummyjson.com' },
      { firstName: 'Hemachandra', lastName: 'Bheemraj', email: 'bheemraj@dummyjson.com' },
      { firstName: 'Harshal', lastName: 'Bheemraj', email: 'harshalbheemraj@dummyjson.com' },
      { firstName: 'Bindhu', lastName: 'Ram', email: 'bindhuram@dummyjson.com' },
      { firstName: 'Puneeth', lastName: 'Raj', email: 'puneethraj@dummyjson.com' },
      { firstName: 'Neha', lastName: 'Shree', email: 'nehashree@dummyjson.com' },
    ];

    fetch('https://dummyjson.com/users?limit=20')
      .then((res) => res.json())
      .then((data) => {
        const updated = data.users.map((user: any, index: number) => ({
          ...user,
          firstName: names[index % names.length].firstName,
          lastName: names[index % names.length].lastName,
          email: names[index % names.length].email,
          department: getRandomDept(),
          performance: Math.ceil(Math.random() * 5),
          bio: 'A passionate team player with strong communication and leadership skills.',
          pastPerformance: [3, 4, 5, 4],
        }));
        setUsers(updated);
        setFilteredUsers(updated);
      });
  }, [mounted]);

  const handleAddUser = (newUser: User) => {
    const updated = [newUser, ...users];
    setUsers(updated);
    setFilteredUsers(updated);
  };

  if (!mounted) return null;

  return (
    <main className="p-6 bg-white rounded-xl shadow-lg max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <SearchFilterBar data={users} onChange={setFilteredUsers} />
        <button
          onClick={() => setShowModal(true)}
          className="ml-4 px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
        >
          + Create User
        </button>
      </div>

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

      {showModal && (
        <CreateUserModal
          onClose={() => setShowModal(false)}
          onAddUser={handleAddUser}
        />
      )}
    </main>
  );
}




