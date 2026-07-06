// frontend - config/sidebarMenu.js
import {
  FiHome,
  FiCalendar,
  FiHeart,
  FiUser,
  FiPlusCircle,
  FiList,
  FiDollarSign,
  FiUsers,
  FiSettings,
  FiBarChart2,
  FiFlag,
  FiLayout,
} from 'react-icons/fi';

export const sidebarMenu = {
  TENANT: [
    { label: 'Overview', href: '/dashboard', icon: FiLayout, exact: true },
    {
      label: 'My Bookings',
      href: '/dashboard/tenant/bookings',
      icon: FiCalendar,
    },
    { label: 'Favorites', href: '/dashboard/tenant/favorites', icon: FiHeart },
    { label: 'Profile', href: '/dashboard/tenant/profile', icon: FiUser },
  ],
  OWNER: [
    { label: 'Overview', href: '/dashboard', icon: FiLayout, exact: true },
    {
      label: 'My Properties',
      href: '/dashboard/owner/properties',
      icon: FiHome,
    },
    {
      label: 'Add Property',
      href: '/dashboard/owner/properties/new',
      icon: FiPlusCircle,
    },
    {
      label: 'Booking Requests',
      href: '/dashboard/owner/booking-requests',
      icon: FiList,
    },
    {
      label: 'Earnings',
      href: '/dashboard/owner/earnings',
      icon: FiDollarSign,
    },
    { label: 'Profile', href: '/dashboard/owner/profile', icon: FiUser },
  ],
  ADMIN: [
    {
      label: 'Overview',
      href: '/dashboard/admin',
      icon: FiLayout,
      exact: true,
    },
    { label: 'All Users', href: '/dashboard/admin/users', icon: FiUsers },
    {
      label: 'All Properties',
      href: '/dashboard/admin/properties',
      icon: FiHome,
    },
    {
      label: 'All Bookings',
      href: '/dashboard/admin/bookings',
      icon: FiCalendar,
    },
    { label: 'Reports', href: '/dashboard/admin/reports', icon: FiFlag },
    {
      label: 'Analytics',
      href: '/dashboard/admin/analytics',
      icon: FiBarChart2,
    },
    { label: 'Settings', href: '/dashboard/admin/settings', icon: FiSettings },
  ],
};
