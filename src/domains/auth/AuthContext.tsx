import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../../utils/supabase';
import { getCurrentUser } from '../../services/authService';

const styles = {
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
};

interface AuthContextType {
  user: any | null;
  loading: boolean;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  async function checkAuth() {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser || null);
      return !!currentUser;
    } catch (error) {
      console.error('Error checking authentication:', error);
      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    loading,
    checkAuth,
  };

  if (loading) {
    return <div style={styles.loadingContainer}>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
