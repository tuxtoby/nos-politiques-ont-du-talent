import { useState, useEffect } from 'react';
import { initializeAuth } from '../../utils/authInitializer';

interface AuthInitializationState {
  authInitialized: boolean;
  loading: boolean;
}

export function useAuthInitialization(): AuthInitializationState {
  const [authInitialized, setAuthInitialized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initialize();
  }, []);

  return { authInitialized, loading };

  async function initialize() {
    const success = await initializeAuth();
    setAuthInitialized(success);
    setLoading(false);
  }
}
