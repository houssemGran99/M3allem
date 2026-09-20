import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as authApi from '../api/auth';
import { RegisterPayload } from '../api/auth';
import { ApiArtisanProfile, ApiUser } from '../api/types';
import { clearPersistedToken, loadPersistedToken, persistToken } from '../api/tokenStore';
import { ApiClientError } from '../api/client';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

type AuthContextValue = {
  status: AuthStatus;
  user: ApiUser | null;
  artisanProfile: ApiArtisanProfile | null;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [user, setUser] = useState<ApiUser | null>(null);
  const [artisanProfile, setArtisanProfile] = useState<ApiArtisanProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadCurrentUser = useCallback(async () => {
    const result = await authApi.me();
    setUser(result.user);
    setArtisanProfile(result.artisanProfile ?? null);
    setStatus('authenticated');
  }, []);

  useEffect(() => {
    (async () => {
      const token = await loadPersistedToken();
      if (!token) {
        setStatus('unauthenticated');
        return;
      }
      try {
        await loadCurrentUser();
      } catch {
        await clearPersistedToken();
        setStatus('unauthenticated');
      }
    })();
  }, [loadCurrentUser]);

  const login = useCallback(
    async (email: string, password: string) => {
      setError(null);
      try {
        const { token } = await authApi.login(email, password);
        await persistToken(token);
        await loadCurrentUser();
      } catch (e) {
        setError(e instanceof ApiClientError ? e.message : 'Login failed');
        throw e;
      }
    },
    [loadCurrentUser]
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      setError(null);
      try {
        const { token } = await authApi.register(payload);
        await persistToken(token);
        await loadCurrentUser();
      } catch (e) {
        setError(e instanceof ApiClientError ? e.message : 'Registration failed');
        throw e;
      }
    },
    [loadCurrentUser]
  );

  const logout = useCallback(async () => {
    await clearPersistedToken();
    setUser(null);
    setArtisanProfile(null);
    setStatus('unauthenticated');
  }, []);

  const refreshProfile = useCallback(async () => {
    if (status !== 'authenticated') return;
    await loadCurrentUser();
  }, [status, loadCurrentUser]);

  const value = useMemo<AuthContextValue>(
    () => ({ status, user, artisanProfile, error, login, register, logout, refreshProfile }),
    [status, user, artisanProfile, error, login, register, logout, refreshProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
