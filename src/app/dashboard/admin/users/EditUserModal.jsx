// app/dashboard/admin/users/EditUserModal.jsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const roles = ['TENANT', 'OWNER', 'ADMIN'];

export default function EditUserModal({ user, onClose, onSave }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await onSave({ name, email, role });
    setSaving(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4'
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className='w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-xl'
        >
          <div className='mb-4 flex items-center justify-between'>
            <h2 className='text-sm font-semibold text-slate-50'>Edit User</h2>
            <button
              onClick={onClose}
              className='text-slate-400 hover:text-white'
            >
              <FiX size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className='mb-1 block text-xs font-medium text-slate-400'>
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-primary-500'
                required
              />
            </div>

            <div>
              <label className='mb-1 block text-xs font-medium text-slate-400'>
                Email
              </label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-primary-500'
                required
              />
            </div>

            <div>
              <label className='mb-1 block text-xs font-medium text-slate-400'>
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className='w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-primary-500'
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className='flex justify-end gap-2 pt-2'>
              <button
                type='button'
                onClick={onClose}
                className='rounded-lg px-4 py-2 text-xs font-medium text-slate-400 hover:bg-slate-900'
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={saving}
                className='rounded-lg bg-primary-500 px-4 py-2 text-xs font-semibold text-white hover:bg-primary-600 disabled:opacity-50'
              >
                {saving ? 'Saving...' : 'Save changes'}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
