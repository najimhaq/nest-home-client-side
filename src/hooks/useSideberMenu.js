import { sidebarMenu } from '@/components/config/sidebarMenu';
import { useAuth } from '@/context/AuthContext';

export default function useSidebarMenu() {
  const { user, isLoading, logout } = useAuth();
//   console.log('inside useSidebarMenu', user);
  const role = user?.role;
    // console.log('inside useSidebarMenu roleee', role);
  const menuItems = role ? sidebarMenu[role] || [] : [];
  return { role, menuItems, isLoading, logout };
}
