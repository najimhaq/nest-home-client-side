// frontend - components/layouts/DashboardSidebar.jsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FiUser, FiLogOut, FiHome } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import { sidebarMenu } from '../config/sidebarMenu.js';



export default function DashboardSidebar() {
  const pathname = usePathname();
  const { user, logout, isLoading } = useAuth();

  const role = user?.role || 'TENANT';
  const menuItems = sidebarMenu[role] || sidebarMenu.TENANT;

  const isActive = (href) =>
    pathname === href || (href !== '/dashboard' && pathname?.startsWith(href));

  if (isLoading) {
    return (
      <aside className='hidden md:flex w-64 flex-col border-r border-white/10 bg-slate-900 p-4'>
        <div className='h-8 w-32 animate-pulse rounded bg-white/10 mb-6' />
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className='h-9 w-full animate-pulse rounded-lg bg-white/5 mb-2'
          />
        ))}
      </aside>
    );
  }

  return (
    <aside className='hidden md:flex w-64 flex-col justify-between border-r border-white/10 bg-slate-900 min-h-screen p-4'>
      <div>
        <Link href='/' className='flex items-center gap-2 mb-8 px-2'>
          <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-r from-purple-400 via-pink-400 to-sky-400 text-white'>
            <FiHome className='text-white' size={18} />
          </div>
          <span className='text-lg font-bold text-white'>
            Stay
            <span className='bg-linear-to-r from-purple-400 via-pink-400 to-sky-400 bg-clip-text text-transparent'>
              Nest
            </span>
          </span>
        </Link>

        <span className='mb-4 inline-block rounded-full bg-primary-500/20 px-3 py-1 text-xs font-medium text-primary-400'>
          {role} DASHBOARD
        </span>

        <nav className='flex flex-col gap-1 mt-4'>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive(item.href)
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className='border-t border-white/10 pt-4'>
        <div className='flex items-center gap-3 px-2 mb-3'>
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={36}
              height={36}
              className='h-9 w-9 rounded-full object-cover'
            />
          ) : (
            <div className='flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-r from-primary-500 to-accent-500 text-sm font-bold text-white'>
              {user?.name?.charAt(0)?.toUpperCase() || <FiUser size={16} />}
            </div>
          )}
          <div className='min-w-0'>
            <p className='truncate text-sm font-medium text-white'>
              {user?.name}
            </p>
            <p className='truncate text-xs text-white/50'>{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className='flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-error-400 transition hover:bg-error-500/10'
        >
          <FiLogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
