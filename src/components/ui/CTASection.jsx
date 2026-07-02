// frontend - components/ui/CTASection.jsx
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

export default function CTASection() {
  return (
    <section className='relative px-4 pb-28'>
      <div className='pointer-events-none absolute inset-0 -z-10 mx-auto max-w-4xl'>
        <div className='absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/10 blur-[100px]' />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className='mx-auto max-w-4xl rounded-4xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl'
      >
        <h2 className='text-2xl font-bold sm:text-3xl'>
          Have a property to list?
        </h2>
        <p className='mt-3 text-white/60'>
          Join Rentify as a property owner and start earning today.
        </p>
        <Link
          href='/sign-up'
          className='mt-6 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-purple-500 to-pink-500 px-8 py-3 font-semibold transition hover:opacity-90'
        >
          List Your Property <FiArrowRight />
        </Link>
      </motion.div>
    </section>
  );
}
