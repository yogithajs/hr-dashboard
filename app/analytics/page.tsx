'use client';

import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { User } from '../../types/User';

ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

export default function AnalyticsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const stored = localStorage.getItem('bookmarks');
    if (stored) {
      setUsers(JSON.parse(stored));
    }
  }, [mounted]);

  if (!mounted) return null;

  // === Department-wise Average Ratings ===
  const departmentData: { [key: string]: number[] } = {};
  users.forEach((user) => {
    if (!departmentData[user.department]) {
      departmentData[user.department] = [];
    }
    departmentData[user.department].push(user.performance);
  });

  const departments = Object.keys(departmentData);
  const avgRatings = departments.map((dept) => {
    const ratings = departmentData[dept];
    const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length || 0;
    return parseFloat(avg.toFixed(2));
  });

  const barChartData = {
    labels: departments,
    datasets: [
      {
        label: 'Avg Performance Rating',
        data: avgRatings,
        backgroundColor: 'rgba(59, 130, 246, 0.7)', // blue-500
        borderRadius: 5,
      },
    ],
  };

  // === Mock Bookmark Trends ===
  const lineChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Bookmarks Added',
        data: [2, 5, 7, 4], // mocked trend
        borderColor: 'rgba(34,197,94,1)', // green-500
        backgroundColor: 'rgba(34,197,94,0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>

      {departments.length === 0 ? (
        <p>No data to display. Bookmark employees first.</p>
      ) : (
        <>
          <div className="max-w-2xl mb-12">
            <h2 className="text-xl font-semibold mb-2">Department-wise Avg Ratings</h2>
            <Bar data={barChartData} />
          </div>

          <div className="max-w-2xl">
            <h2 className="text-xl font-semibold mb-2">Bookmark Trends</h2>
            <Line data={lineChartData} />
          </div>
        </>
      )}
    </main>
  );
}
