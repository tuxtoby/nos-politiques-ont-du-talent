import { useState, useEffect } from 'react';
import { PoliticalFigure } from '../entities/PoliticalFigure';
import { getPoliticalFigures } from '../services/supabaseService';

export function useSupabaseData() {
  const [politicalFigures, setPoliticalFigures] = useState<PoliticalFigure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchData() {
    try {
      setLoading(true);
      const figures = await getPoliticalFigures();
      setPoliticalFigures(figures);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data from Supabase');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return {
    politicalFigures,
    loading,
    error,
    refetch: fetchData
  };
}
