import { getServerSession } from '@/lib/getServerSession';

const TenantProfilePage = () => {
  const session = getServerSession();
  console.log('inside TenantProfilePage', session);
  return (
    <div>
      <h1>Tenant Profile</h1>
    </div>
  );
};

export default TenantProfilePage;
