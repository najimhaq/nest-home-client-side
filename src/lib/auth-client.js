import { jwtClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
  plugins: [jwtClient()],
});

// Export hooks for easy use
export const { signIn, signUp, signOut, useSession } = authClient;
