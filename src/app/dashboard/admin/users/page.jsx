// app/dashboard/admin/users/page.jsx
import { serverFetch } from '@/lib/core/server';
import AdminUsersTable from './AdminUsersTable';

const AdminUsersPage = async () => {
  let users = [];
  let fetchError = null;

  try {
    const res = await serverFetch('/admin/users');
    users = res?.data || [];
  } catch (err) {
    fetchError = err.message;
  }

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-semibold tracking-tight text-slate-50'>
          All Users
        </h1>
        <p className='mt-1 text-sm text-slate-400'>
          Manage user roles, approval status, and account details.
        </p>
      </div>

      <AdminUsersTable initialUsers={users} fetchError={fetchError} />
    </div>
  );
};

export default AdminUsersPage;
