// app/admin/page.js
import prisma from '@/lib/db/prisma';

export default async function AdminDashboard() {
  // Stats fetch koro
  const [totalUsers, totalProperties, totalBookings, totalRevenue] =
    await prisma.$transaction([
      prisma.user.count(),
      prisma.property.count(),
      prisma.booking.count(),
      prisma.payment.aggregate({
        where: { status: 'COMPLETED' },
        _sum: { amount: true },
      }),
    ]);

  const stats = [
    { label: 'Total Users', value: totalUsers, color: 'bg-blue-500' },
    {
      label: 'Total Properties',
      value: totalProperties,
      color: 'bg-green-500',
    },
    { label: 'Total Bookings', value: totalBookings, color: 'bg-purple-500' },
    {
      label: 'Total Revenue',
      value: `৳${totalRevenue._sum.amount || 0}`,
      color: 'bg-amber-500',
    },
  ];

  return (
    <div>
      <h1 className='text-2xl font-bold text-slate-900 mb-6'>
        Admin Dashboard
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {stats.map((stat) => (
          <div
            key={stat.label}
            className='bg-white p-6 rounded-2xl shadow-sm border border-slate-100'
          >
            <div
              className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}
            >
              <span className='text-white text-xl font-bold'>
                {stat.label[0]}
              </span>
            </div>
            <p className='text-slate-500 text-sm'>{stat.label}</p>
            <p className='text-2xl font-bold text-slate-900 mt-1'>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
