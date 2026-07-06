// frontend/src/lib/auth-client.js
import { jwtClient } from 'better-auth/client/plugins';
import { inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL:
    process.env.NEXT_PUBLIC_AUTH_BASE_URL || 'http://localhost:8000/api/auth',
  plugins: [
    jwtClient(),
    inferAdditionalFields({
      user: {
        role: {
          type: 'string',
        },
      },
    }),
  ],
});

export const { signIn, signUp, signOut, useSession } = authClient;
