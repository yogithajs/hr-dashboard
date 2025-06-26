'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Bookmarks', href: '/bookmarks' },
    { label: 'Analytics', href: '/analytics' },
  ];

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 shadow mb-6">
      <ul className="flex gap-6">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`hover:underline ${
                pathname === item.href ? 'font-bold text-blue-400' : ''
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
