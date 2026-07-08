'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Building2,
  CalendarCheck,
  DollarSign,
  Star,
  PlusCircle,
  Settings,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';

const OwnerMainPage = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const stats = [
    {
      label: 'Total Properties',
      value: '0',
      icon: Building2,
      linear: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
    },
    {
      label: 'Active Bookings',
      value: '0',
      icon: CalendarCheck,
      linear: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
    },
    {
      label: 'Total Earnings',
      value: '৳0',
      icon: DollarSign,
      linear: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
    },
    {
      label: 'Average Rating',
      value: 'N/A',
      icon: Star,
      linear: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
    },
  ];

  const quickActions = [
    {
      label: 'Add New Property',
      href: '/owner/properties/new',
      icon: PlusCircle,
      linear: 'from-blue-600 to-cyan-600',
    },
    {
      label: 'Manage Properties',
      href: '/dashboard/owner/properties',
      icon: Building2,
      linear: 'from-purple-600 to-pink-600',
    },
    {
      label: 'View Bookings',
      href: '/dashboard/owner/bookings',
      icon: CalendarCheck,
      linear: 'from-green-600 to-emerald-600',
    },
    {
      label: 'Account Settings',
      href: '/dashboard/owner/settings',
      icon: Settings,
      linear: 'from-amber-600 to-orange-600',
    },
  ];

  return (
    <div className='min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-8 sm:px-6 lg:px-8'>
      {/* Animated Background Elements */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000'></div>
        <div className='absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000'></div>
      </div>

      <div className='mx-auto max-w-6xl relative z-10'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='mb-8'
        >
          <h1 className='text-3xl font-bold bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent sm:text-4xl'>
            Welcome back, Owner 👋
          </h1>
          <p className='mt-2 text-gray-400'>
            Here's what's happening with your properties today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                }}
                className='group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl transition-all duration-300 hover:border-white/20'
              >
                {/* linear Background on Hover */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${stat.linear} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>

                <div className='relative flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors'>
                      {stat.label}
                    </p>
                    <p className='mt-2 text-3xl font-bold text-white'>
                      {stat.value}
                    </p>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`rounded-xl p-3 ${stat.bgColor} border ${stat.borderColor}`}
                  >
                    <Icon
                      className={`h-6 w-6 bg-linear-to-br ${stat.linear} bg-clip-text`}
                      style={{ color: 'currentColor' }}
                    />
                  </motion.div>
                </div>

                {/* Bottom linear Line */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${stat.linear} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Grid: Quick Actions + Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className='grid grid-cols-1 gap-6 lg:grid-cols-3'
        >
          {/* Quick Actions */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className='rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl lg:col-span-1'
          >
            <h2 className='mb-6 text-xl font-bold text-white flex items-center gap-2'>
              <TrendingUp className='h-5 w-5 text-blue-400' />
              Quick Actions
            </h2>
            <div className='flex flex-col gap-3'>
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.div
                    key={action.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Link
                      href={action.href}
                      className='group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-gray-300 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg'
                    >
                      <div className='flex items-center gap-3'>
                        <div
                          className={`rounded-lg bg-linear-to-br ${action.linear} p-2`}
                        >
                          <Icon className='h-4 w-4 text-white' />
                        </div>
                        <span>{action.label}</span>
                      </div>
                      <ArrowRight className='h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity' />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Recent Activity / Properties Overview */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className='rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl lg:col-span-2'
          >
            <div className='mb-6 flex items-center justify-between'>
              <h2 className='text-xl font-bold text-white flex items-center gap-2'>
                <Building2 className='h-5 w-5 text-purple-400' />
                Your Properties
              </h2>
              <Link
                href='/dashboard/owner/properties'
                className='group flex items-center gap-1 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors'
              >
                View all
                <ArrowRight className='h-4 w-4 group-hover:translate-x-1 transition-transform' />
              </Link>
            </div>

            {/* Empty state */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className='flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/10 bg-white/5 py-16 text-center'
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Building2 className='mb-4 h-16 w-16 text-gray-600' />
              </motion.div>
              <p className='text-lg font-semibold text-gray-300'>
                No properties added yet
              </p>
              <p className='mt-2 text-sm text-gray-500'>
                Start by adding your first property to StayNest
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href='/dashboard/owner/properties/new'
                  className='mt-6 inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/70'
                >
                  <PlusCircle className='h-5 w-5' />
                  Add Property
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default OwnerMainPage;
