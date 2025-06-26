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
    <div className="p-4 bg-white rounded shadow border hover:shadow-md transition-all duration-200">
      <h3 className="text-lg font-bold">{user.firstName} {user.lastName}</h3>
      <p className="text-sm text-gray-600">{user.email}</p>
      <p className="text-sm">Age: {user.age}</p>
      <p className="text-sm">Department: {user.department}</p>

      <div className="flex items-center mt-2">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < (user.performance || 0) ? 'text-yellow-500' : 'text-gray-300'}>
            ★
          </span>
        ))}
      </div>

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => router.push(`/employee/${user.id}`)}
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          View
        </button>

        {onBookmark && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBookmark();
            }}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            {isBookmarked ? 'Remove' : 'Bookmark'}
          </button>
        )}
      </div>

      {showActions && (
        <div className="flex gap-2 mt-3">
          <button className="px-3 py-1 bg-purple-500 text-white rounded">Promote</button>
          <button className="px-3 py-1 bg-yellow-500 text-white rounded">Assign to Project</button>
        </div>
      )}
    </div>
  );
}
