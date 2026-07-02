'use client';

import { motion } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';


const variants = {
  primary:
    'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl',
  secondary:
    'bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-primary-600',
  danger: 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`
        relative inline-flex items-center justify-center
        font-semibold rounded-xl
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <FiLoader className='mr-2 h-5 w-5 animate-spin' />}
      {children}
    </motion.button>
  );
}
