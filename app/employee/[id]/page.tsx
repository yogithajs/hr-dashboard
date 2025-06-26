'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User } from '../../../types/User';

export default function EmployeeDetailPage() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'feedback'>('overview');

  useEffect(() => {
    if (id) {
      fetch(`https://dummyjson.com/users/${id}`)
        .then(res => res.json())
        .then(data => {
          setUser({
            ...data,
            department: 'HR', // mock
            performance: Math.ceil(Math.random() * 5),
            bio: 'A passionate team player with strong communication and leadership skills.',
            pastPerformance: [3, 4, 5, 4], // mock history
          });
        });
    }
  }, [id]);

  if (!user) return <div className="p-6">Loading...</div>;

  const renderStars = (count: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < count ? 'text-yellow-400' : 'text-gray-300'}>
            ★
          </span>
        ))}
      </div>
    );
  };

  const performanceBadge = (score: number) => {
    if (score >= 4) return <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Excellent</span>;
    if (score >= 3) return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Good</span>;
    return <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Needs Improvement</span>;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
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
        );

      case 'projects':
        return (
          <div className="mt-4">
            <ul className="list-disc list-inside">
              <li>Team Collaboration Platform</li>
              <li>Internal Training Portal</li>
              <li>Annual Review System</li>
            </ul>
          </div>
        );

      case 'feedback':
        return (
          <div className="mt-4 space-y-2 text-sm">
            <p>“Excellent attention to detail and teamwork.”</p>
            <p>“Can improve technical documentation skills.”</p>
          </div>
        );
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        {user.firstName} {user.lastName}
      </h1>

      {/* Tabs */}
      <div className="flex gap-4 border-b pb-2">
        {['overview', 'projects', 'feedback'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`capitalize px-3 py-1 ${
              activeTab === tab ? 'border-b-2 border-blue-500 font-semibold' : 'text-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </main>
  );
}
