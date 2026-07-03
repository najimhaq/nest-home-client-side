// app/(auth)/signup/page.js

import { SignUpForm } from '@/components/features/auth/SignUpForm';

export const metadata = {
  title: 'Sign Up - StayNest',
};

export default function SignUpPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-black py-12'>
      <div className='w-full max-w-md'>
        <SignUpForm />
      </div>
    </div>
  );
}
