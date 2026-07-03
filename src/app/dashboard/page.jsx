'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';


export default function DashboardRedirect() {
  const {user, isPending} = useAuth();
  console.log('dashboard page', user);
  const router = useRouter();

  useEffect(() => {
    if (isPending) return;
    const role = user?.role;
    if (role === 'TENANT') router.replace('/dashboard/tenant');
    else if (role === 'OWNER') router.replace('/dashboard/owner');
    else if (role === 'ADMIN') router.replace('/dashboard/admin');
    else router.replace('/signin');
  }, [user, isPending, router]);

  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <p className='text-lg font-semibold text-gray-300'>Redirecting...</p>
    </div>
  );
}
