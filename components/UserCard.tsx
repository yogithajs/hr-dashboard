'use client';

import { useRouter } from 'next/navigation';
import { User } from '../types/User';
import React from 'react';


interface UserCardProps {
  user: User;
  onBookmark?: () => void;
  isBookmarked?: boolean;
  showActions?: boolean;
}

export default function UserCard({
  user,
  onBookmark,
  isBookmarked = false,
  showActions = false,
}: UserCardProps) {
  const router = useRouter();

  return (
    <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-transform hover:scale-[1.02] duration-300">
      <h3 className="text-xl font-bold text-gray-800">{user.firstName} {user.lastName}</h3>
      <p className="text-sm text-gray-600">{user.email}</p>
      <p className="text-sm">Age: {user.age}</p>
      <p className="text-sm">Department: <span className="font-medium">{user.department}</span></p>

      <div className="flex items-center mt-2 text-yellow-500">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < user.performance ? '' : 'text-gray-300'}>
            ★
          </span>
        ))}
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => router.push(`/employee/${user.id}`)}
          className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
        >
          View
        </button>

        {onBookmark && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBookmark();
            }}
            className={`px-4 py-1.5 ${
              isBookmarked
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white rounded-lg transition`}
          >
            {isBookmarked ? 'Remove' : 'Bookmark'}
          </button>
        )}
      </div>

      {showActions && (
        <div className="flex gap-2 mt-3">
          <button className="px-3 py-1 bg-purple-500 text-white rounded">Promote</button>
          <button className="px-3 py-1 bg-yellow-500 text-white rounded">Assign</button>
        </div>
      )}
    </div>
  );
}