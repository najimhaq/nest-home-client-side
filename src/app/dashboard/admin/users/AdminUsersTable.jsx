// app/dashboard/admin/users/AdminUsersTable.jsx
'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiEdit2, FiTrash2, FiCheck, FiX, FiClock } from 'react-icons/fi';
import { clientFetch } from '@/lib/core/clientFetch';
import EditUserModal from './EditUserModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const statusStyles = {
  PENDING: 'bg-amber-500/15 text-amber-300',
  APPROVED: 'bg-emerald-500/15 text-emerald-300',
  REJECTED: 'bg-rose-500/15 text-rose-300',
};

const formatJoinedAt = (dateStr) => {
  const date = new Date(dateStr);
  const diffMs = Date.now() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
};

export default function AdminUsersTable({ initialUsers, fetchError }) {
  const [users, setUsers] = useState(initialUsers);
  const [loadingId, setLoadingId] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleStatusChange = async (id, status) => {
    setLoadingId(id);
    try {
      const res = await clientFetch(`/admin/users/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });

      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, status: res.data.status } : u))
      );
      toast.success(`User ${status.toLowerCase()}`);
    } catch (err) {
      toast.error(err.message || 'Failed to update status');
    } finally {
      setLoadingId(null);
    }
  };

  const handleUpdateUser = async (id, updates) => {
    try {
      const res = await clientFetch(`/admin/users/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
      });

      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, ...res.data } : u))
      );
      toast.success('User updated successfully');
      setEditUser(null);
    } catch (err) {
      toast.error(err.message || 'Failed to update user');
    }
  };

  const handleDelete = async (id) => {
    try {
      await clientFetch(`/admin/users/${id}`, { method: 'DELETE' });
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast.success('User deleted');
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err.message || 'Failed to delete user');
    }
  };

  if (fetchError) {
    return (
      <div className='rounded-2xl border border-rose-800/40 bg-rose-950/20 p-6 text-center text-sm text-rose-400'>
        Failed to load users: {fetchError}
      </div>
    );
  }

  return (
    <div className='overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/90 shadow-lg shadow-black/40'>
      <table className='min-w-full text-left text-xs'>
        <thead className='border-b border-slate-800/80 bg-slate-950/95'>
          <tr>
            <th className='px-4 py-3 font-medium text-slate-400'>User</th>
            <th className='px-4 py-3 font-medium text-slate-400'>Role</th>
            <th className='px-4 py-3 font-medium text-slate-400'>Status</th>
            <th className='px-4 py-3 font-medium text-slate-400'>Verified</th>
            <th className='px-4 py-3 font-medium text-slate-400'>Joined</th>
            <th className='px-4 py-3 font-medium text-slate-400 text-right'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-slate-800/80'>
          {users.length === 0 && (
            <tr>
              <td colSpan={6} className='px-4 py-6 text-center text-slate-500'>
                No users found.
              </td>
            </tr>
          )}

          {users.map((user) => (
            <tr key={user.id} className='hover:bg-slate-900/70'>
              <td className='px-4 py-3'>
                <div className='flex flex-col'>
                  <span className='text-xs font-medium text-slate-100'>
                    {user.name}
                  </span>
                  <span className='text-[11px] text-slate-400'>
                    {user.email}
                  </span>
                </div>
              </td>

              <td className='px-4 py-3'>
                <span className='inline-flex items-center rounded-full bg-slate-900 px-2 py-1 text-[11px] font-medium text-slate-200'>
                  {user.role}
                </span>
              </td>

              <td className='px-4 py-3'>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-[11px] font-medium ${
                    statusStyles[user.status] || statusStyles.PENDING
                  }`}
                >
                  {user.status}
                </span>
              </td>

              <td className='px-4 py-3'>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-[11px] font-medium ${
                    user.emailVerified
                      ? 'bg-emerald-500/15 text-emerald-300'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {user.emailVerified ? 'VERIFIED' : 'UNVERIFIED'}
                </span>
              </td>

              <td className='px-4 py-3 text-[11px] text-slate-400'>
                {formatJoinedAt(user.createdAt)}
              </td>

              <td className='px-4 py-3'>
                <div className='flex items-center justify-end gap-1.5'>
                  {user.status !== 'APPROVED' && (
                    <button
                      disabled={loadingId === user.id}
                      onClick={() => handleStatusChange(user.id, 'APPROVED')}
                      title='Approve'
                      className='flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 disabled:opacity-40'
                    >
                      <FiCheck size={14} />
                    </button>
                  )}

                  {user.status !== 'REJECTED' && (
                    <button
                      disabled={loadingId === user.id}
                      onClick={() => handleStatusChange(user.id, 'REJECTED')}
                      title='Reject'
                      className='flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 disabled:opacity-40'
                    >
                      <FiX size={14} />
                    </button>
                  )}

                  {user.status !== 'PENDING' && (
                    <button
                      disabled={loadingId === user.id}
                      onClick={() => handleStatusChange(user.id, 'PENDING')}
                      title='Mark as pending'
                      className='flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 disabled:opacity-40'
                    >
                      <FiClock size={14} />
                    </button>
                  )}

                  <button
                    onClick={() => setEditUser(user)}
                    title='Edit user'
                    className='flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700'
                  >
                    <FiEdit2 size={14} />
                  </button>

                  <button
                    onClick={() => setDeleteTarget(user)}
                    title='Delete user'
                    className='flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-rose-400 hover:bg-rose-900/40'
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editUser && (
        <EditUserModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onSave={(updates) => handleUpdateUser(editUser.id, updates)}
        />
      )}

      {deleteTarget && (
        <ConfirmDeleteModal
          user={deleteTarget}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={() => handleDelete(deleteTarget.id)}
        />
      )}
    </div>
  );
}
