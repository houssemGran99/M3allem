import React, { createContext, useContext, useMemo, useState } from 'react';

type CreditsContextValue = {
  balance: number;
  spendCredit: (amount: number) => void;
  addCredits: (amount: number) => void;
};

const CreditsContext = createContext<CreditsContextValue | undefined>(undefined);

export function CreditsProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState(12);

  const value = useMemo<CreditsContextValue>(
    () => ({
      balance,
      spendCredit: (amount) => setBalance((b) => Math.max(0, b - amount)),
      addCredits: (amount) => setBalance((b) => b + amount),
    }),
    [balance]
  );

  return <CreditsContext.Provider value={value}>{children}</CreditsContext.Provider>;
}

export function useCredits() {
  const ctx = useContext(CreditsContext);
  if (!ctx) throw new Error('useCredits must be used within CreditsProvider');
  return ctx;
}
