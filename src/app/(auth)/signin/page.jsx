// app/(auth)/signin/page.js

import { SignInForm } from '@/components/features/auth/SignInForm';
import { getRoleDashboardPath } from '@/lib/getRoleDashboardPath';
import { getServerSession } from '@/lib/getServerSession';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Sign In - StayNest',
};

export default async function SignInPage() {
   const session = await getServerSession();

  if (session?.user) {
    redirect(getRoleDashboardPath(session.user.role));
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-black'>
      <div className='w-full max-w-md'>
        <SignInForm />
      </div>
    </div>
  );
}
