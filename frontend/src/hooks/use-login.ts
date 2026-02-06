'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { setToken, setRefreshToken } from '@/lib/auth';
import { useAuth, type User } from './use-auth';
import type { LoginFormData } from '@/lib/schemas';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

/**
 * Hook for handling user login
 * Uses TanStack Query for mutation state management
 */
export function useLogin() {
  const router = useRouter();
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: async (data: LoginFormData): Promise<LoginResponse> => {
      const response = await api.post<LoginResponse>('/auth/login', data);
      return response.data;
    },
    onSuccess: (data) => {
      // Store tokens
      setToken(data.accessToken);
      setRefreshToken(data.refreshToken);

      // Update auth context
      setUser(data.user);

      // Redirect to dashboard
      router.push('/dashboard');
    },
  });
}
