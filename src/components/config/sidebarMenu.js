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
    { label: 'Overview', href: '/dashboard', icon: FiLayout },
    { label: 'My Bookings', href: '/dashboard/bookings', icon: FiCalendar },
    { label: 'Favorites', href: '/dashboard/favorites', icon: FiHeart },
    { label: 'Profile', href: '/dashboard/profile', icon: FiUser },
  ],
  OWNER: [
    { label: 'Overview', href: '/dashboard', icon: FiLayout },
    { label: 'My Properties', href: '/dashboard/properties', icon: FiHome },
    {
      label: 'Add Property',
      href: '/dashboard/properties/new',
      icon: FiPlusCircle,
    },
    { label: 'Bookings', href: '/dashboard/bookings', icon: FiList },
    { label: 'Earnings', href: '/dashboard/earnings', icon: FiDollarSign },
    { label: 'Profile', href: '/dashboard/profile', icon: FiUser },
  ],
  ADMIN: [
    { label: 'Overview', href: '/dashboard', icon: FiLayout },
    { label: 'All Users', href: '/dashboard/users', icon: FiUsers },
    { label: 'All Properties', href: '/dashboard/properties', icon: FiHome },
    { label: 'All Bookings', href: '/dashboard/bookings', icon: FiCalendar },
    { label: 'Reports', href: '/dashboard/reports', icon: FiFlag },
    { label: 'Analytics', href: '/dashboard/analytics', icon: FiBarChart2 },
    { label: 'Settings', href: '/dashboard/settings', icon: FiSettings },
  ],
};
