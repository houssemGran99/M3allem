import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as creditsApi from '../api/credits';
import { useAuth } from './AuthContext';

type CreditsContextValue = {
  balance: number | null;
  loading: boolean;
  refresh: () => Promise<void>;
  purchase: (packId: string) => Promise<void>;
};

const CreditsContext = createContext<CreditsContextValue | undefined>(undefined);

export function CreditsProvider({ children }: { children: React.ReactNode }) {
  const { status, user } = useAuth();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (status !== 'authenticated' || user?.role !== 'worker') return;
    setLoading(true);
    try {
      const { creditBalance } = await creditsApi.getBalance();
      setBalance(creditBalance);
    } finally {
      setLoading(false);
    }
  }, [status, user?.role]);

  useEffect(() => {
    if (status === 'authenticated' && user?.role === 'worker') {
      refresh();
    } else {
      setBalance(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, user?.role]);

  const purchase = useCallback(async (packId: string) => {
    const { creditBalance } = await creditsApi.purchase(packId);
    setBalance(creditBalance);
  }, []);

  const value = useMemo<CreditsContextValue>(() => ({ balance, loading, refresh, purchase }), [balance, loading, refresh, purchase]);

  return <CreditsContext.Provider value={value}>{children}</CreditsContext.Provider>;
}

export function useCredits() {
  const ctx = useContext(CreditsContext);
  if (!ctx) throw new Error('useCredits must be used within CreditsProvider');
  return ctx;
}
