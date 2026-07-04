// app/admin/layout.js
import { getServerSession } from '@/lib/getServerSession';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }) {
  const session = await getServerSession();

  // No session = redirect to signin
  if (!session) {
    redirect('/signin');
  }

  // Not admin = redirect to home
  if (session.user.role !== 'ADMIN') {
    redirect('/');
  }

  return (
    <div className='min-h-screen bg-slate-50'>
      {/* Admin Sidebar */}
      <aside className='fixed left-0 top-0 h-full w-64 bg-slate-900 text-white'>
        <div className='p-6'>
          <h1 className='text-xl font-bold text-amber-500'>StayNest Admin</h1>
        </div>
        <nav className='px-4 space-y-2'>
          <a
            href='/admin'
            className='block px-4 py-2 rounded-lg hover:bg-slate-800'
          >
            Dashboard
          </a>
          <a
            href='/admin/users'
            className='block px-4 py-2 rounded-lg hover:bg-slate-800'
          >
            Users
          </a>
          <a
            href='/admin/properties'
            className='block px-4 py-2 rounded-lg hover:bg-slate-800'
          >
            Properties
          </a>
          <a
            href='/admin/bookings'
            className='block px-4 py-2 rounded-lg hover:bg-slate-800'
          >
            Bookings
          </a>
          <a
            href='/admin/reviews'
            className='block px-4 py-2 rounded-lg hover:bg-slate-800'
          >
            Reviews
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className='ml-64 p-8'>{children}</main>
    </div>
  );
}
