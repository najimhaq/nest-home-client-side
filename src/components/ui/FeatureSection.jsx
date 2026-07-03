// frontend - components/ui/FeatureSection.jsx
'use client';
import { motion } from 'framer-motion';
import { FiShield, FiTrendingUp, FiSearch } from 'react-icons/fi';

const features = [
  {
    icon: FiShield,
    title: 'Secure Payments',
    desc: 'Stripe-powered secure checkout for every booking, protecting both tenants and owners.',
    color: 'from-purple-500/20 to-purple-500/5',
  },
  {
    icon: FiTrendingUp,
    title: 'Verified Listings',
    desc: 'Every property goes through admin moderation before it goes live on the platform.',
    color: 'from-pink-500/20 to-pink-500/5',
  },
  {
    icon: FiSearch,
    title: 'Easy Discovery',
    desc: 'Filter by location, price, and amenities to find your ideal stay in seconds.',
    color: 'from-sky-500/20 to-sky-500/5',
  },
];

export default function FeatureSection() {
  return (
    <section className='relative mx-auto max-w-6xl px-4 py-24'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className='mb-12 text-center'
      >
        <h2 className='text-3xl font-bold sm:text-4xl'>
          Why Choose{' '}
          <span className='bg-linear-to-r from-purple-400 via-pink-400 to-sky-400 bg-clip-text text-transparent'>
            StayNest
          </span>
        </h2>
        <p className='mt-3 text-white/50'>
          Everything you need for a seamless rental experience.
        </p>
      </motion.div>

      <div className='grid gap-6 md:grid-cols-3'>
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className={`rounded-3xl border border-white/10 bg-linear-to-br ${f.color} p-6 backdrop-blur-xl transition-shadow hover:shadow-xl hover:shadow-purple-500/10`}
          >
            <div className='mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10'>
              <f.icon className='text-xl text-white' />
            </div>
            <h3 className='mb-2 text-lg font-semibold'>{f.title}</h3>
            <p className='text-sm text-white/60'>{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
