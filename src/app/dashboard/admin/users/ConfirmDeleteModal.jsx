// app/dashboard/admin/users/ConfirmDeleteModal.jsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle } from 'react-icons/fi';

export default function ConfirmDeleteModal({ user, onCancel, onConfirm }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4'
        onClick={onCancel}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className='w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-950 p-6 text-center shadow-xl'
        >
          <div className='mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 text-rose-400'>
            <FiAlertTriangle size={22} />
          </div>
          <h2 className='text-sm font-semibold text-slate-50'>Delete user?</h2>
          <p className='mt-2 text-xs text-slate-400'>
            This will permanently delete <strong>{user.name}</strong> (
            {user.email}). This action cannot be undone.
          </p>

          <div className='mt-5 flex justify-center gap-2'>
            <button
              onClick={onCancel}
              className='rounded-lg px-4 py-2 text-xs font-medium text-slate-400 hover:bg-slate-900'
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className='rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-700'
            >
              Delete
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
