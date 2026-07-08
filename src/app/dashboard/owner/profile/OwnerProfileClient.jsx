'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  CalendarCheck,
  DollarSign,
  Star,
  Edit3,
  Camera,
  Shield,
  Bell,
  LogOut,
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
} from 'lucide-react';

export default function OwnerProfileClient({ owner }) {
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
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
    },
    {
      label: 'Active Bookings',
      value: '0',
      icon: CalendarCheck,
      gradient: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
    },
    {
      label: 'Total Earnings',
      value: '৳0',
      icon: DollarSign,
      gradient: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
    },
    {
      label: 'Average Rating',
      value: 'N/A',
      icon: Star,
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'property_added',
      title: 'New property added',
      description: 'You added a new property to your portfolio',
      time: '2 hours ago',
      icon: Building2,
      color: 'text-blue-400',
    },
    {
      id: 2,
      type: 'booking_received',
      title: 'New booking received',
      description: 'Someone booked your property for 3 nights',
      time: '5 hours ago',
      icon: CalendarCheck,
      color: 'text-green-400',
    },
    {
      id: 3,
      type: 'review',
      title: 'New review received',
      description: 'A guest left a 5-star review',
      time: '1 day ago',
      icon: Star,
      color: 'text-amber-400',
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
      {/* Main Container with proper overflow */}
      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-x-hidden'>
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='mb-6'
        >
          <div className='rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 shadow-2xl'>
            <div className='flex flex-col sm:flex-row items-center sm:items-start gap-6'>
              {/* Avatar */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className='relative flex-shrink-0'
              >
                <div className='w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1'>
                  <div className='w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden'>
                    {owner.image ? (
                      <img
                        src={owner.image}
                        alt={owner.name}
                        className='w-full h-full object-cover'
                      />
                    ) : (
                      <User className='w-14 h-14 sm:w-16 sm:h-16 text-gray-400' />
                    )}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className='absolute bottom-0 right-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/50'
                >
                  <Camera className='w-4 h-4 sm:w-5 sm:h-5 text-white' />
                </motion.button>
              </motion.div>

              {/* Profile Info */}
              <div className='flex-1 text-center sm:text-left'>
                <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent'>
                  {owner.name || 'Owner'}
                </h1>
                <p className='mt-2 text-gray-400 flex items-center justify-center sm:justify-start gap-2 text-sm sm:text-base'>
                  <Mail className='w-4 h-4' />
                  {owner.email}
                </p>
                <div className='mt-4 flex flex-wrap gap-3 justify-center sm:justify-start'>
                  <span className='inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-medium'>
                    <Award className='w-3 h-3 sm:w-4 sm:h-4' />
                    Property Owner
                  </span>
                  <span className='inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs sm:text-sm font-medium'>
                    <CheckCircle className='w-3 h-3 sm:w-4 sm:h-4' />
                    Verified
                  </span>
                </div>
              </div>

              {/* Edit Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='flex-shrink-0'
              >
                <Link
                  href='/owner/profile/edit'
                  className='inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm sm:text-base font-semibold shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/70 transition-all duration-300'
                >
                  <Edit3 className='w-4 h-4 sm:w-5 sm:h-5' />
                  Edit Profile
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid - Responsive */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                }}
                className='group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-6 shadow-2xl transition-all duration-300 hover:border-white/20'
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>

                <div className='relative flex items-center justify-between'>
                  <div className='min-w-0 flex-1'>
                    <p className='text-xs sm:text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors truncate'>
                      {stat.label}
                    </p>
                    <p className='mt-1 sm:mt-2 text-2xl sm:text-3xl font-bold text-white'>
                      {stat.value}
                    </p>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`flex-shrink-0 rounded-xl p-2.5 sm:p-3 ${stat.bgColor} border ${stat.borderColor} ml-3`}
                  >
                    <Icon className='h-5 w-5 sm:h-6 sm:w-6 text-white' />
                  </motion.div>
                </div>

                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Grid - Better Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className='grid grid-cols-1 lg:grid-cols-3 gap-6'
        >
          {/* Profile Information */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className='rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl lg:col-span-1'
          >
            <h2 className='mb-6 text-lg sm:text-xl font-bold text-white flex items-center gap-2'>
              <User className='h-5 w-5 text-blue-400 flex-shrink-0' />
              Profile Information
            </h2>
            <div className='space-y-3 sm:space-y-4'>
              <div className='flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10'>
                <User className='w-5 h-5 text-gray-400 flex-shrink-0' />
                <div className='min-w-0 flex-1'>
                  <p className='text-xs text-gray-500'>Full Name</p>
                  <p className='text-sm font-medium text-white truncate'>
                    {owner.name || 'Not set'}
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10'>
                <Mail className='w-5 h-5 text-gray-400 flex-shrink-0' />
                <div className='min-w-0 flex-1'>
                  <p className='text-xs text-gray-500'>Email</p>
                  <p className='text-sm font-medium text-white truncate'>
                    {owner.email}
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10'>
                <Phone className='w-5 h-5 text-gray-400 flex-shrink-0' />
                <div className='min-w-0 flex-1'>
                  <p className='text-xs text-gray-500'>Phone</p>
                  <p className='text-sm font-medium text-white'>Not set</p>
                </div>
              </div>

              <div className='flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10'>
                <MapPin className='w-5 h-5 text-gray-400 flex-shrink-0' />
                <div className='min-w-0 flex-1'>
                  <p className='text-xs text-gray-500'>Location</p>
                  <p className='text-sm font-medium text-white'>Not set</p>
                </div>
              </div>

              <div className='flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10'>
                <Calendar className='w-5 h-5 text-gray-400 flex-shrink-0' />
                <div className='min-w-0 flex-1'>
                  <p className='text-xs text-gray-500'>Member Since</p>
                  <p className='text-sm font-medium text-white'>
                    {new Date(owner.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Activity - Scrollable */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className='rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl lg:col-span-2'
          >
            <div className='mb-6 flex items-center justify-between'>
              <h2 className='text-lg sm:text-xl font-bold text-white flex items-center gap-2'>
                <TrendingUp className='h-5 w-5 text-green-400 flex-shrink-0' />
                Recent Activity
              </h2>
              <Link
                href='/owner/activity'
                className='group flex items-center gap-1 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors flex-shrink-0'
              >
                View all
                <span className='group-hover:translate-x-1 transition-transform'>
                  →
                </span>
              </Link>
            </div>

            {/* Scrollable Activity List */}
            <div className='space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar'>
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className='group flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300'
                  >
                    <div
                      className={`rounded-lg bg-white/5 p-2 flex-shrink-0 ${activity.color}`}
                    >
                      <Icon className='w-5 h-5' />
                    </div>
                    <div className='min-w-0 flex-1'>
                      <p className='font-semibold text-white truncate'>
                        {activity.title}
                      </p>
                      <p className='text-sm text-gray-400 mt-1 line-clamp-2'>
                        {activity.description}
                      </p>
                      <p className='text-xs text-gray-500 mt-2 flex items-center gap-1'>
                        <Clock className='w-3 h-3' />
                        {activity.time}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {recentActivities.length === 0 && (
              <div className='flex flex-col items-center justify-center py-12 text-center'>
                <TrendingUp className='mb-4 h-12 w-12 text-gray-600' />
                <p className='text-gray-400'>No recent activity</p>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Quick Settings - Responsive Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className='mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
        >
          <Link
            href='/owner/settings/security'
            className='group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-6 shadow-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300'
          >
            <div className='rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 p-3 flex-shrink-0'>
              <Shield className='w-5 h-5 sm:w-6 sm:h-6 text-white' />
            </div>
            <div className='min-w-0 flex-1'>
              <p className='font-semibold text-white text-sm sm:text-base'>
                Security
              </p>
              <p className='text-xs sm:text-sm text-gray-400 truncate'>
                Password & 2FA
              </p>
            </div>
          </Link>

          <Link
            href='/owner/settings/notifications'
            className='group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-6 shadow-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300'
          >
            <div className='rounded-xl bg-gradient-to-br from-amber-600 to-orange-600 p-3 flex-shrink-0'>
              <Bell className='w-5 h-5 sm:w-6 sm:h-6 text-white' />
            </div>
            <div className='min-w-0 flex-1'>
              <p className='font-semibold text-white text-sm sm:text-base'>
                Notifications
              </p>
              <p className='text-xs sm:text-sm text-gray-400 truncate'>
                Email & Push
              </p>
            </div>
          </Link>

          <Link
            href='/auth/signout'
            className='group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-6 shadow-2xl hover:bg-red-500/10 hover:border-red-500/20 transition-all duration-300'
          >
            <div className='rounded-xl bg-gradient-to-br from-red-600 to-pink-600 p-3 flex-shrink-0'>
              <LogOut className='w-5 h-5 sm:w-6 sm:h-6 text-white' />
            </div>
            <div className='min-w-0 flex-1'>
              <p className='font-semibold text-white text-sm sm:text-base'>
                Sign Out
              </p>
              <p className='text-xs sm:text-sm text-gray-400 truncate'>
                End session
              </p>
            </div>
          </Link>
        </motion.div>
      </div>


    </div>
  );
}
