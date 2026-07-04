// frontend - lib/getRoleDashboardPath.js
export function getRoleDashboardPath(role) {
  switch (role) {
    case 'ADMIN':
      return '/dashboard/admin';
    case 'OWNER':
      return '/dashboard/owner';
    case 'TENANT':
    default:
      return '/dashboard/tenant';
  }
}
