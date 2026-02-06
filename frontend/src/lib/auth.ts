const TOKEN_KEY = 'faatere_access_token';
const REFRESH_KEY = 'faatere_refresh_token';

/**
 * Get the stored access token
 */
export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Store the access token
 */
export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Get the stored refresh token
 */
export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_KEY);
};

/**
 * Store the refresh token
 */
export const setRefreshToken = (token: string): void => {
  localStorage.setItem(REFRESH_KEY, token);
};

/**
 * Clear all stored tokens
 */
export const clearTokens = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
};

/**
 * Check if user is authenticated (has a token)
 */
export const isAuthenticated = (): boolean => {
  return !!getToken();
};
