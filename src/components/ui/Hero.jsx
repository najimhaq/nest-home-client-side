// frontend - components/ui/Hero.jsx
'use client';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';

export default function Hero() {
  return (
    <section className='relative overflow-hidden px-4 pt-24 pb-24 text-center'>
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute left-1/4 top-0 h-96 w-96 rounded-full bg-purple-600/30 blur-[120px]' />
        <div className='absolute right-1/4 top-40 h-96 w-96 rounded-full bg-pink-500/20 blur-[120px]' />
        <div className='absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-500/20 blur-[100px]' />
      </div>

      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70 backdrop-blur-xl'
      >
        🏡 Trusted by 10,000+ tenants worldwide
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className='mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl'
      >
        Find Your Perfect{' '}
        <span className='bg-linear-to-r from-purple-400 via-pink-400 to-sky-400 bg-clip-text text-transparent'>
          Nest
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className='mx-auto mt-5 max-w-xl text-white/60'
      >
        Discover verified rental properties, book securely, and settle in with
        complete peace of mind — anywhere in the world.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className='mx-auto mt-10 flex max-w-xl flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl sm:flex-row'
      >
        <input
          type='text'
          placeholder='Search by city or location...'
          className='flex-1 bg-transparent px-4 py-3 outline-none placeholder:text-white/40'
        />
        <button className='flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 px-6 py-3 font-semibold transition hover:opacity-90'>
          <FiSearch /> Search
        </button>
      </motion.div>
    </section>
  );
}
