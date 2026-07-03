// frontend - components/layouts/Navbar.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiHome,
  FiHeart,
  FiCalendar,
  FiLayout,
} from 'react-icons/fi';

import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
  { href: '/properties', label: 'Properties' },
  { href: '/company', label: 'Company' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  // console.log('in navbar', user)

  // Don't show navbar on auth pages
  /* if (pathname?.startsWith('/signin') || pathname?.startsWith('/signup')) {
    return null;
  } */

 if (pathname.includes('dashboard')) {
   return null;
 }

  const isActive = (href) =>
    pathname === href || pathname?.startsWith(href + '/');

  return (
    <header className='sticky top-4 z-50 mx-4 md:mx-8'>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className='mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-slate-900/80 px-5 py-3 backdrop-blur-xl shadow-lg shadow-slate-900/20'
      >
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2 text-xl font-bold'>
          <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-r from-purple-400 via-pink-400 to-sky-400 text-white'>
            <FiHome className='text-white' size={18} />
          </div>
          <span className='text-white'>
            Stay
            <span className='bg-linear-to-r from-purple-400 via-pink-400 to-sky-400 bg-clip-text text-transparent'>
              Nest
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden items-center gap-1 md:flex'>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                isActive(link.href)
                  ? 'bg-white/10 text-white'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className='hidden items-center gap-3 md:flex'>
          {isLoading ? (
            <div className='h-8 w-8 animate-pulse rounded-full bg-white/10' />
          ) : isAuthenticated ? (
            <div className='relative'>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className='flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/80 transition hover:bg-white/10'
              >
                {user?.image ? (
                  <Image
                    src={user?.image}
                    alt={user?.name}
                    width={32}
                    height={32}
                    className='h-8 w-8 rounded-full object-cover'
                  />
                ) : (
                  <div className='flex h-7 w-7 items-center justify-center rounded-full bg-linear-to-r from-primary-500 to-accent-500 text-xs font-bold text-white'>
                    {user?.name?.charAt(0)?.toUpperCase() || (
                      <FiUser size={14} />
                    )}
                  </div>
                )}
                <span className='max-w-25 truncate'>
                  {user?.name || 'User'}
                </span>
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className='absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-slate-900/95 p-2 backdrop-blur-xl shadow-xl'
                  >
                    <div className='border-b border-white/10 px-3 py-2'>
                      <p className='text-sm font-medium text-white'>
                        {user?.name}
                      </p>
                      <p className='text-xs text-white/50'>{user?.email}</p>
                      <span className='mt-1 inline-block rounded-full bg-primary-500/20 px-2 py-0.5 text-xs font-medium text-primary-400'>
                        {user?.role}
                      </span>
                    </div>

                    <div className='py-1'>
                      <Link
                        href='/dashboard/tenant'
                        className='flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white'
                        onClick={() => setProfileOpen(false)}
                      >
                        <FiLayout size={16} />
                        Dashboard
                      </Link>
                      <Link
                        href='/bookings'
                        className='flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white'
                        onClick={() => setProfileOpen(false)}
                      >
                        <FiCalendar size={16} />
                        My Bookings
                      </Link>
                      <Link
                        href='/favorites'
                        className='flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white'
                        onClick={() => setProfileOpen(false)}
                      >
                        <FiHeart size={16} />
                        Favorites
                      </Link>
                    </div>

                    <div className='border-t border-white/10 py-1'>
                      <button
                        onClick={() => {
                          logout();
                          setProfileOpen(false);
                        }}
                        className='flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-error-400 transition hover:bg-error-500/10'
                      >
                        <FiLogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link
                href='/signin'
                className='rounded-lg px-4 py-2 text-sm font-medium text-white/70 transition hover:text-white'
              >
                Sign In
              </Link>
              <Link
                href='/signup'
                className='rounded-full bg-linear-to-r from-primary-500 to-accent-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition hover:shadow-primary-500/40 hover:scale-105 active:scale-95'
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className='flex h-9 w-9 items-center justify-center rounded-lg text-white/80 transition hover:bg-white/10 md:hidden'
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className='mt-2 flex flex-col gap-1 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 p-4 backdrop-blur-xl shadow-xl md:hidden'
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive(link.href)
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <hr className='my-2 border-white/10' />

            {isAuthenticated ? (
              <>
                <div className='flex items-center gap-3 px-3 py-2'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-primary-500 to-accent-500 text-sm font-bold text-white'>
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <p className='text-sm font-medium text-white'>
                      {user?.name}
                    </p>
                    <p className='text-xs text-white/50'>{user?.role}</p>
                  </div>
                </div>
                <Link
                  href='/dashboard'
                  className='flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white'
                  onClick={() => setOpen(false)}
                >
                  <FiLayout size={16} />
                  Dashboard
                </Link>
                <Link
                  href='/bookings'
                  className='flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white'
                  onClick={() => setOpen(false)}
                >
                  <FiCalendar size={16} />
                  My Bookings
                </Link>
                <Link
                  href='/favorites'
                  className='flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white'
                  onClick={() => setOpen(false)}
                >
                  <FiHeart size={16} />
                  Favorites
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className='flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-error-400 hover:bg-error-500/10'
                >
                  <FiLogOut size={16} />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href='/signin'
                  className='rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white'
                  onClick={() => setOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href='/signup'
                  className='rounded-full bg-linear-to-r from-primary-500 to-accent-500 px-5 py-2.5 text-center text-sm font-semibold text-white'
                  onClick={() => setOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
