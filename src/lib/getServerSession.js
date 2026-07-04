// frontend - lib/getServerSession.js
import { cookies } from 'next/headers';

export async function getServerSession() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/get-session`,
    {
      headers: {
        cookie: cookieHeader,
      },
      cache: 'no-store',
    }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data;
}
