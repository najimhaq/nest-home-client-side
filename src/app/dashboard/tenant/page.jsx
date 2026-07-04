
import { getUser } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import TenantDashboard from './TenantDashboard';


const TenantMainPage = async () => {
  const user = await getUser()
  console.log('inside TenantMainPage', user);
  if (!user) redirect('/');
  if (user.role !== 'TENANT') redirect('/unauthorized');
  return (
    <TenantDashboard user={user} />
  );
};

export default TenantMainPage;
