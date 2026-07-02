// frontend - components/ui/Navbar.jsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { href: '/properties', label: 'Explore' },
  { href: '/how-it-works', label: 'How it Works' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className='sticky top-4 z-50 mx-4 md:mx-8'>
      <div className='mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl'>
        <Link href='/' className='text-xl font-bold'>
          Rent
          <span className='bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
            ify
          </span>
        </Link>

        <nav className='hidden items-center gap-8 text-sm text-white/70 md:flex'>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className='transition hover:text-white'
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className='hidden items-center gap-3 md:flex'>
          <Link
            href='/sign-in'
            className='text-sm font-medium text-white/80 transition hover:text-white'
          >
            Sign In
          </Link>
          <Link
            href='/sign-up'
            className='rounded-full bg-linear-to-r from-purple-500 to-pink-500 px-5 py-2 text-sm font-semibold transition hover:opacity-90'
          >
            Get Started
          </Link>
        </div>

        <button className='text-white md:hidden' onClick={() => setOpen(!open)}>
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className='mt-2 flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl md:hidden'
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='py-2 text-white/70 hover:text-white'
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className='my-2 border-white/10' />
            <Link
              href='/sign-in'
              className='py-2 text-white/80'
              onClick={() => setOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href='/sign-up'
              className='rounded-full bg-linear-to-r from-purple-500 to-pink-500 px-5 py-2 text-center font-semibold'
              onClick={() => setOpen(false)}
            >
              Get Started
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
