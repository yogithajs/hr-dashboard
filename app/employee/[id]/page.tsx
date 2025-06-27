'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from '../../../types/User';

export default function EmployeeDetailPage() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'feedback'>('overview');

  const customNames = [
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
  { firstName: 'Neha', lastName: 'Shree', email: 'nehashree@dummyjson.com' }
];

useEffect(() => {
  if (id) {
    const userIndex = parseInt(id as string) - 1;

    fetch(`https://dummyjson.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser({
          ...data,
          firstName: customNames[userIndex]?.firstName || data.firstName,
          lastName: customNames[userIndex]?.lastName || data.lastName,
          email: customNames[userIndex]?.email || data.email,
          department: 'HR',
          performance: Math.ceil(Math.random() * 5),
          bio: 'A passionate team player with strong communication and leadership skills.',
          pastPerformance: [3, 4, 5, 4],
        });
      });
  }
}, [id]);
  if (!user) return <div className="p-6">Loading...</div>;

  const renderStars = (count: number) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < count ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      ))}
    </div>
  );

  const performanceBadge = (score: number) => {
    if (score >= 4)
      return <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Excellent</span>;
    if (score >= 3)
      return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Good</span>;
    return <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Needs Improvement</span>;
  };

  const tabContent = {
    overview: (
      <div className="mt-4 space-y-3">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Address:</strong> {user.address.address}, {user.address.city}</p>
        <p><strong>Department:</strong> {user.department}</p>
        <p><strong>Bio:</strong> {user.bio}</p>
        <div className="flex items-center gap-2">
          <span><strong>Performance:</strong></span>
          {renderStars(user.performance)}
          {performanceBadge(user.performance)}
        </div>
        <div>
          <p className="font-semibold mt-3">Past Performance Ratings:</p>
          <ul className="list-disc list-inside ml-2 text-sm text-gray-600">
            {user.pastPerformance.map((p: number, index: number) => (
              <li key={index}>Quarter {index + 1}: {p} ★</li>
            ))}
          </ul>
        </div>
      </div>
    ),
    projects: (
      <div className="mt-4 space-y-2 text-sm">
        <ul className="list-disc list-inside">
          <li>Team Collaboration Platform</li>
          <li>Internal Training Portal</li>
          <li>Annual Review System</li>
        </ul>
      </div>
    ),
    feedback: (
      <div className="mt-4 space-y-2 text-sm">
        <p>“Excellent attention to detail and teamwork.”</p>
        <p>“Can improve technical documentation skills.”</p>
      </div>
    ),
  };

  return (
    <main className="min-h-screen p-6 bg-gradient-to-b from-white via-blue-50 to-blue-100">
      <h1 className="text-4xl font-bold mb-6 text-blue-800">
        {user.firstName} {user.lastName}
      </h1>

      {/* Animated Tabs */}
      <div className="flex gap-4 border-b pb-2 relative">
        {(['overview', 'projects', 'feedback'] as const).map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative capitalize px-4 py-2 rounded-md transition-all duration-200 ${
  activeTab === tab
    ? 'bg-blue-100 text-blue-600 font-semibold'
    : 'text-gray-600 hover:bg-gray-100'
}`}

          >
            {tab}

            {activeTab === tab && (
              <motion.div
                layoutId="underline"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 rounded"
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Animated Tab Content */}
      <AnimatePresence mode="wait">
  <motion.div
    key={activeTab}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="mt-6 p-6 bg-white rounded-xl shadow-lg border border-blue-100"
  >
    {tabContent[activeTab]}
  </motion.div>
</AnimatePresence>
    </main>
  );
}