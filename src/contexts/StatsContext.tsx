import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchStats } from '../services/stats';

interface StatsContextData {
  loading: boolean;
  stats: any;
  refreshStats: () => Promise<void>;
}

export const StatsContext = createContext<StatsContextData>({} as StatsContextData);

export function StatsProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  async function refreshStats() {
    setLoading(true);
    try {
      const data = await fetchStats();
      console.log('STATS DATA:', data);
      setStats(data);
    } catch (e) {
      console.error('STATS ERROR:', e);
      setStats(null);
    }
    setLoading(false);
  }

  useEffect(() => {
    refreshStats();
  }, []);

  return (
    <StatsContext.Provider value={{ loading, stats, refreshStats }}>
      {children}
    </StatsContext.Provider>
  );
}