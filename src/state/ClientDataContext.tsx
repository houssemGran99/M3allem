import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as requestsApi from '../api/requests';
import { CreateRequestPayload } from '../api/requests';
import { ApiServiceRequest } from '../api/types';
import { useAuth } from './AuthContext';

type ClientDataContextValue = {
  myRequests: ApiServiceRequest[];
  loading: boolean;
  refresh: () => Promise<void>;
  createRequest: (payload: CreateRequestPayload) => Promise<ApiServiceRequest>;
  activeRequest: ApiServiceRequest | null;
};

const ClientDataContext = createContext<ClientDataContextValue | undefined>(undefined);

export function ClientDataProvider({ children }: { children: React.ReactNode }) {
  const { status, user } = useAuth();
  const isClient = status === 'authenticated' && user?.role === 'client';

  const [myRequests, setMyRequests] = useState<ApiServiceRequest[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!isClient) return;
    setLoading(true);
    try {
      const { requests } = await requestsApi.listMyRequests();
      setMyRequests(requests);
    } finally {
      setLoading(false);
    }
  }, [isClient]);

  useEffect(() => {
    if (isClient) {
      refresh();
    } else {
      setMyRequests([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient]);

  const createRequest = useCallback(async (payload: CreateRequestPayload) => {
    const { request } = await requestsApi.createRequest(payload);
    setMyRequests((prev) => [request, ...prev]);
    return request;
  }, []);

  const activeRequest = useMemo(
    () => myRequests.find((r) => r.status === 'open' || r.status === 'accepted') ?? null,
    [myRequests]
  );

  const value = useMemo<ClientDataContextValue>(
    () => ({ myRequests, loading, refresh, createRequest, activeRequest }),
    [myRequests, loading, refresh, createRequest, activeRequest]
  );

  return <ClientDataContext.Provider value={value}>{children}</ClientDataContext.Provider>;
}

export function useClientData() {
  const ctx = useContext(ClientDataContext);
  if (!ctx) throw new Error('useClientData must be used within ClientDataProvider');
  return ctx;
}
