'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { UserRole } from 'shared';
import { getToken, clearTokens, isAuthenticated as checkAuth } from '@/lib/auth';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  tomiteId: string | null;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for stored token on mount
    const hasToken = checkAuth();
    if (hasToken) {
      // Try to get user from stored data
      const storedUser = localStorage.getItem('faatere_user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          // Invalid stored user data
          clearTokens();
          localStorage.removeItem('faatere_user');
        }
      }
    }
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    clearTokens();
    localStorage.removeItem('faatere_user');
    setUser(null);
    router.push('/login');
  }, [router]);

  const handleSetUser = useCallback((newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem('faatere_user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('faatere_user');
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user && !!getToken(),
        logout,
        setUser: handleSetUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
