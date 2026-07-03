// frontend - components/layouts/DashboardSidebarMobile.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import { sidebarMenu } from '../config/sidebarMenu';


export default function DashboardSidebarMobile() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const role = user?.role || 'TENANT';
  const menuItems = sidebarMenu[role] || sidebarMenu.TENANT;

  const isActive = (href) =>
    pathname === href || (href !== '/dashboard' && pathname?.startsWith(href));

  return (
    <div className='md:hidden'>
      <button
        onClick={() => setOpen(true)}
        className='flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white'
      >
        <FiMenu size={20} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className='fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-white/10 p-4 flex flex-col justify-between'
          >
            <div>
              <div className='flex justify-between items-center mb-6'>
                <span className='text-lg font-bold text-white'>
                  Stay<span className='text-primary-400'>Nest</span>
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className='text-white/70'
                >
                  <FiX size={22} />
                </button>
              </div>

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
                      onClick={() => setOpen(false)}
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

            <button
              onClick={logout}
              className='flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-error-400 hover:bg-error-500/10'
            >
              <FiLogOut size={16} />
              Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
