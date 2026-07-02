// frontend - components/SignUpForm.jsx
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import toast from 'react-hot-toast';
import { signUpSchema } from '@/app/schemas/authSchema';

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: { role: 'TENANT' },
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch('http://localhost:5050/api/auth/sign-up/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Sign up failed');
      toast.success('Account created successfully!');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='max-w-md mx-auto space-y-4 p-6 bg-white rounded-xl shadow'
    >
      <h2 className='text-2xl font-bold text-charcoal'>Create Account</h2>

      <div>
        <input
          {...register('name')}
          placeholder='Full Name'
          className='w-full border rounded-lg px-4 py-2'
        />
        {errors.name && (
          <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>
        )}
      </div>

      <div>
        <input
          {...register('email')}
          placeholder='Email'
          className='w-full border rounded-lg px-4 py-2'
        />
        {errors.email && (
          <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          {...register('password')}
          type='password'
          placeholder='Password'
          className='w-full border rounded-lg px-4 py-2'
        />
        {errors.password && (
          <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>
        )}
      </div>

      <select
        {...register('role')}
        className='w-full border rounded-lg px-4 py-2'
      >
        <option value='TENANT'>I want to rent</option>
        <option value='OWNER'>I want to list my property</option>
      </select>

      <button
        type='submit'
        disabled={isSubmitting}
        className='w-full bg-primary text-white py-2 rounded-lg hover:opacity-90 disabled:opacity-50'
      >
        {isSubmitting ? 'Creating...' : 'Sign Up'}
      </button>
    </form>
  );
}
