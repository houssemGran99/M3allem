import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as leadsApi from '../api/leads';
import * as quotesApi from '../api/quotes';
import { SubmitQuotePayload } from '../api/quotes';
import { ApiLead, ApiQuote } from '../api/types';
import { useAuth } from './AuthContext';
import { useCredits } from './CreditsContext';

type WorkerDataContextValue = {
  leads: ApiLead[];
  leadsLoading: boolean;
  refreshLeads: () => Promise<void>;
  unlockLead: (id: string) => Promise<ApiLead>;
  quotesSent: ApiQuote[];
  quotesLoading: boolean;
  refreshQuotes: () => Promise<void>;
  submitQuote: (requestId: string, payload: SubmitQuotePayload) => Promise<ApiQuote>;
};

const WorkerDataContext = createContext<WorkerDataContextValue | undefined>(undefined);

export function WorkerDataProvider({ children }: { children: React.ReactNode }) {
  const { status, user } = useAuth();
  const { refresh: refreshCredits } = useCredits();
  const isWorker = status === 'authenticated' && user?.role === 'worker';

  const [leads, setLeads] = useState<ApiLead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [quotesSent, setQuotesSent] = useState<ApiQuote[]>([]);
  const [quotesLoading, setQuotesLoading] = useState(false);

  const refreshLeads = useCallback(async () => {
    if (!isWorker) return;
    setLeadsLoading(true);
    try {
      const { leads: fetched } = await leadsApi.listLeads();
      setLeads(fetched);
    } finally {
      setLeadsLoading(false);
    }
  }, [isWorker]);

  const refreshQuotes = useCallback(async () => {
    if (!isWorker) return;
    setQuotesLoading(true);
    try {
      const { quotes } = await quotesApi.listMyQuotes();
      setQuotesSent(quotes);
    } finally {
      setQuotesLoading(false);
    }
  }, [isWorker]);

  useEffect(() => {
    if (isWorker) {
      refreshLeads();
      refreshQuotes();
    } else {
      setLeads([]);
      setQuotesSent([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWorker]);

  const unlockLead = useCallback(
    async (id: string) => {
      const { request } = await leadsApi.unlockLead(id);
      setLeads((prev) => prev.map((l) => (l._id === id ? request : l)));
      await refreshCredits();
      return request;
    },
    [refreshCredits]
  );

  const submitQuote = useCallback(async (requestId: string, payload: SubmitQuotePayload) => {
    const { quote } = await quotesApi.submitQuote(requestId, payload);
    setQuotesSent((prev) => [quote, ...prev]);
    return quote;
  }, []);

  const value = useMemo<WorkerDataContextValue>(
    () => ({ leads, leadsLoading, refreshLeads, unlockLead, quotesSent, quotesLoading, refreshQuotes, submitQuote }),
    [leads, leadsLoading, refreshLeads, unlockLead, quotesSent, quotesLoading, refreshQuotes, submitQuote]
  );

  return <WorkerDataContext.Provider value={value}>{children}</WorkerDataContext.Provider>;
}

export function useWorkerData() {
  const ctx = useContext(WorkerDataContext);
  if (!ctx) throw new Error('useWorkerData must be used within WorkerDataProvider');
  return ctx;
}
