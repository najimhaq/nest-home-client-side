// app/dashboard/admin/page.jsx
import { ArrowUpRight, Users, Home, CalendarCheck, Clock } from 'lucide-react';
import { serverFetch } from '@/lib/core/server';

const stats = [
  {
    label: 'Total Users',
    value: null,
    change: '+12.4%',
    icon: Users,
    color: 'from-violet-500/80 to-indigo-500/80',
  },
  {
    label: 'Active Listings',
    value: '342',
    change: '+3.1%',
    icon: Home,
    color: 'from-emerald-500/80 to-teal-500/80',
  },
  {
    label: 'Bookings (30d)',
    value: '928',
    change: '+18.9%',
    icon: CalendarCheck,
    color: 'from-amber-500/80 to-orange-500/80',
  },
  {
    label: 'Pending Approvals',
    value: '17',
    change: 'View queue',
    icon: Clock,
    color: 'from-rose-500/80 to-pink-500/80',
  },
];

const formatJoinedAt = (dateStr) => {
  const date = new Date(dateStr);
  const diffMs = Date.now() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
};

const AdminMainPage = async () => {
  let users = [];
  let fetchError = null;

  try {
    const res = await serverFetch('/admin/users'); // ✅ ফিক্স
    users = res?.data || []; // ✅ ফিক্স
  } catch (err) {
    fetchError = err.message;
  }

  const recentUsers = (users || []).slice(0, 6);
  const pendingCount = users.filter((u) => u.status === 'PENDING').length;

  stats[0].value = users?.length?.toLocaleString() ?? '0';
  stats[3].value = pendingCount.toString(); // 👈 bonus: real pending count

  return (
    <div className='space-y-8'>
      {/* Top header */}
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-2xl font-semibold tracking-tight text-slate-50'>
            Admin Overview
          </h1>
          <p className='mt-1 text-sm text-slate-400'>
            Monitor platform activity, user growth, and booking performance at a
            glance.
          </p>
        </div>

        <button className='inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/60 px-4 py-1.5 text-xs font-medium text-slate-100 shadow-sm shadow-slate-950/40 backdrop-blur hover:border-slate-500 hover:bg-slate-900/80 transition'>
          View reports
          <ArrowUpRight className='h-3.5 w-3.5' />
        </button>
      </div>

      {/* Stats grid */}
      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        {stats.map((item) => (
          <div
            key={item.label}
            className='relative overflow-hidden rounded-2xl border border-slate-800/80 bg-linear-to-br from-slate-950/90 to-slate-900/80 p-4 shadow-lg shadow-black/40'
          >
            <div
              className={`pointer-events-none absolute inset-p rounded-2xl bg-linear-to-tr ${item.color} opacity-10 blur-2xl`}
            />
            <div className='relative flex items-start justify-between gap-3'>
              <div>
                <p className='text-xs font-medium uppercase tracking-[0.12em] text-slate-400'>
                  {item.label}
                </p>
                <p className='mt-2 text-2xl font-semibold text-slate-50'>
                  {item.value}
                </p>
                <p className='mt-1 text-[11px] font-medium text-emerald-400'>
                  {item.change}
                </p>
              </div>
              <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900/80 text-slate-100 ring-1 ring-slate-700/80'>
                <item.icon className='h-5 w-5' />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom section */}
      <div className='grid gap-6 lg:grid-cols-3'>
        {/* Recent users */}
        <div className='lg:col-span-2 rounded-2xl border border-slate-800/80 bg-slate-950/90 p-5 shadow-lg shadow-black/40'>
          <div className='mb-4 flex items-center justify-between gap-2'>
            <div>
              <h2 className='text-sm font-semibold text-slate-50'>
                Recent users
              </h2>
              <p className='text-xs text-slate-400'>
                Latest signups across tenants, owners, and admins.
              </p>
            </div>
            <button className='text-xs font-medium text-amber-400 hover:text-amber-300'>
              View all
            </button>
          </div>

          <div className='overflow-hidden rounded-xl border border-slate-800/80 bg-slate-950/70'>
            <table className='min-w-full text-left text-xs'>
              <thead className='border-b border-slate-800/80 bg-slate-950/90'>
                <tr>
                  <th className='px-4 py-2 font-medium text-slate-400'>User</th>
                  <th className='px-4 py-2 font-medium text-slate-400'>Role</th>
                  <th className='px-4 py-2 font-medium text-slate-400'>
                    Status
                  </th>
                  <th className='px-4 py-2 font-medium text-slate-400'>
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-800/80'>
                {fetchError && (
                  <tr>
                    <td
                      colSpan={4}
                      className='px-4 py-6 text-center text-xs text-rose-400'
                    >
                      Failed to load users: {fetchError}
                    </td>
                  </tr>
                )}

                {!fetchError && recentUsers.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className='px-4 py-6 text-center text-xs text-slate-500'
                    >
                      No recent users.
                    </td>
                  </tr>
                )}

                {!fetchError &&
                  recentUsers.map((user) => (
                    <tr key={user.id} className='hover:bg-slate-900/70'>
                      <td className='px-4 py-2'>
                        <div className='flex flex-col'>
                          <span className='text-xs font-medium text-slate-100'>
                            {user.name}
                          </span>
                          <span className='text-[11px] text-slate-400'>
                            {user.email}
                          </span>
                        </div>
                      </td>
                      <td className='px-4 py-2'>
                        <span className='inline-flex items-center rounded-full bg-slate-900 px-2 py-1 text-[11px] font-medium text-slate-200'>
                          {user.role}
                        </span>
                      </td>
                      <td className='px-4 py-2'>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-[11px] font-medium ${
                            user.status === 'APPROVED'
                              ? 'bg-emerald-500/15 text-emerald-300'
                              : user.status === 'REJECTED'
                                ? 'bg-rose-500/15 text-rose-300'
                                : 'bg-amber-500/15 text-amber-300'
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className='px-4 py-2 text-[11px] text-slate-400'>
                        {formatJoinedAt(user.createdAt)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side panel */}
        <div className='rounded-2xl border border-slate-800/80 bg-slate-950/90 p-5 shadow-lg shadow-black/40'>
          <h2 className='text-sm font-semibold text-slate-50'>
            Moderation queue
          </h2>
          <p className='mt-1 text-xs text-slate-400'>
            Quickly review pending owners and suspicious activity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminMainPage;
