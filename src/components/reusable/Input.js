'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const Input = forwardRef(function Input(
  { label, error, icon: Icon, className = '', ...props },
  ref
) {
  return (
    <div className='w-full'>
      {label && (
        <label className='block text-sm font-semibold text-gray-700 mb-2'>
          {label}
        </label>
      )}
      <div className='relative'>
        {Icon && (
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <Icon className='h-5 w-5 text-gray-400' />
          </div>
        )}
        <motion.input
          ref={ref}
          whileFocus={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={`
            w-full px-4 py-3
            ${Icon ? 'pl-10' : ''}
            bg-white border-2 rounded-xl
            text-gray-900 placeholder-gray-400
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 hover:border-gray-300'}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className='mt-2 text-sm text-red-600 flex items-center gap-1'
        >
          <span>⚠️</span> {error}
        </motion.p>
      )}
    </div>
  );
});

export default Input;
