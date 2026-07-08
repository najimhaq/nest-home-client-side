import { getUser } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import OwnerProfileClient from './OwnerProfileClient';

const OwnerProfilePage = async () => {
  const owner = await getUser();

  if (!owner) redirect('/');
  if (owner.role !== 'OWNER') redirect('/unauthorized');

  return <OwnerProfileClient owner={owner} />;
};

export default OwnerProfilePage;
