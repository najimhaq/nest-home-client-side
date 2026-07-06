// frontend/src/context/AuthContext.js
'use client';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

const AuthContext = createContext(null);

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const refreshSession = useCallback(async () => {
    try {
      const jwtRes = await fetch(`${API_BASE}/token/jwt`, {
        credentials: 'include',
        cache: 'no-store',
      });

      if (!jwtRes.ok) {
        setUser(null);
        return;
      }

      const { token } = await jwtRes.json();

      const meRes = await fetch(`${API_BASE}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      });

      if (!meRes.ok) {
        setUser(null);
        return;
      }

      const data = await meRes.json();
      // console.log('[AuthContext] user:', data.user);
      setUser(data?.user || null);
    } catch (err) {
      console.error('refreshSession error:', err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  const logout = async () => {
    await authClient.signOut();
    setUser(null);
    router.push('/');
    router.refresh();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        refreshSession,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
