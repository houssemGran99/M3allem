import React, { createContext, useContext, useMemo, useState } from 'react';
import { MyQuoteEntry, WorkerLead } from '../types';
import { myQuotes as initialQuotes, workerLeads as initialLeads } from '../data/mock';

type WorkerDataContextValue = {
  leads: WorkerLead[];
  unlockLead: (id: string) => void;
  quotesSent: MyQuoteEntry[];
  submitQuote: (entry: MyQuoteEntry) => void;
};

const WorkerDataContext = createContext<WorkerDataContextValue | undefined>(undefined);

export function WorkerDataProvider({ children }: { children: React.ReactNode }) {
  const [leads, setLeads] = useState<WorkerLead[]>(initialLeads);
  const [quotesSent, setQuotesSent] = useState<MyQuoteEntry[]>(initialQuotes);

  const value = useMemo<WorkerDataContextValue>(
    () => ({
      leads,
      unlockLead: (id) => setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, unlocked: true } : l))),
      quotesSent,
      submitQuote: (entry) => setQuotesSent((prev) => [entry, ...prev]),
    }),
    [leads, quotesSent]
  );

  return <WorkerDataContext.Provider value={value}>{children}</WorkerDataContext.Provider>;
}

export function useWorkerData() {
  const ctx = useContext(WorkerDataContext);
  if (!ctx) throw new Error('useWorkerData must be used within WorkerDataProvider');
  return ctx;
}
