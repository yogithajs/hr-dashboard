'use client';

import { useState, useEffect } from 'react';
import { User } from '../types/User';

interface Props {
  data: User[];
  onChange: (filtered: User[]) => void;
}

export default function SearchFilterBar({ data, onChange }: Props) {
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => {
    let filtered = data;

    // Search
    if (search.trim() !== '') {
      const query = search.toLowerCase();
      filtered = filtered.filter(
        user =>
          user.firstName.toLowerCase().includes(query) ||
          user.lastName.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.department.toLowerCase().includes(query)
      );
    }

    // Department Filter
    if (selectedDept) {
      filtered = filtered.filter(user => user.department === selectedDept);
    }

    // Rating Filter
    if (rating) {
      filtered = filtered.filter(user => String(user.performance) === rating);
    }

    onChange(filtered);
  }, [search, selectedDept, rating, data, onChange]);

  const departments = ['HR', 'Engineering', 'Design', 'Sales'];

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-white rounded shadow mb-4">
      <input
        type="text"
        placeholder="Search by name, email, department"
        className="border px-3 py-2 rounded w-full md:w-1/3"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <select
        className="border px-3 py-2 rounded"
        value={selectedDept}
        onChange={e => setSelectedDept(e.target.value)}
      >
        <option value="">All Departments</option>
        {departments.map(dep => (
          <option key={dep} value={dep}>
            {dep}
          </option>
        ))}
      </select>

      <select
        className="border px-3 py-2 rounded"
        value={rating}
        onChange={e => setRating(e.target.value)}
      >
        <option value="">All Ratings</option>
        {[1, 2, 3, 4, 5].map(r => (
          <option key={r} value={r}>
            {r} ★
          </option>
        ))}
      </select>
    </div>
  );
}
