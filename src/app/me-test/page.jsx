// frontend/src/app/me-test/page.jsx
import { serverFetch } from '@/lib/core/server';

const MeTestPage = async () => {
  const res = await serverFetch('/users/me'); // backend: GET /api/me (protect middleware)
  return <pre className='p-4 text-xs'>{JSON.stringify(res, null, 2)}</pre>;
};

export default MeTestPage;
