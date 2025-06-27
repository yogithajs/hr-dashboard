'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function withAuth(Component: React.FC) {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();

    useEffect(() => {
      const isAuthenticated = localStorage.getItem('auth') === 'true';
      if (!isAuthenticated) {
        router.push('/login');
      }
    }, []);

    return <Component {...props} />;
  };
}
