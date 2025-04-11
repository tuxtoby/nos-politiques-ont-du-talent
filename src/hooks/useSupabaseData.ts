import { useState, useEffect } from 'react';
import { Politician } from '../entities/Politician';
import { fetchPoliticians } from '../services/supabaseService';

export function useSupabaseData() {
  const [politicians, setPoliticians] = useState<Politician[]>([]);
  const [supabaseLoading, setSupabaseLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchData() {
    try {
      setSupabaseLoading(true);
      const politicians = await fetchPoliticians();
      setPoliticians(politicians);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data from Supabase');
      console.error('Error fetching data:', err);
    } finally {
      setSupabaseLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return {
    politicians,
    supabaseLoading,
    error,
    refetch: fetchData
  };
}
