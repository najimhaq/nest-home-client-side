// app/(auth)/signin/page.js

import { SignInForm } from '@/components/features/auth/SignInForm';

export const metadata = {
  title: 'Sign In - StayNest',
};

export default function SignInPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-black'>
      <div className='w-full max-w-md'>
        <SignInForm />
      </div>
    </div>
  );
}
