import { getUser } from '@/lib/core/session';
import OwnerDashboard from './OwnerDashboard';

const OwnerMainPage = async() => {
  const owner = await getUser();
//   console.log('OwnerMainPage', owner);
  if(!owner) redirect('/');
  if(owner.role !== 'OWNER') redirect('/unauthorized');
  return (
    <div>
      <OwnerDashboard owner={owner} />
    </div>
  );
};

export default OwnerMainPage;
