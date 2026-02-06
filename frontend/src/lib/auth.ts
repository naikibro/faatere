const TOKEN_KEY = 'faatere_access_token';
const REFRESH_KEY = 'faatere_refresh_token';

/**
 * Cookie name used by middleware for server-side auth check
 */
export const AUTH_COOKIE_NAME = 'faatere_auth';

/**
 * Get the stored access token
 */
export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Store the access token (localStorage + cookie for middleware)
 */
export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
  document.cookie = `${AUTH_COOKIE_NAME}=true; path=/; max-age=${60 * 60 * 24}; SameSite=Lax`;
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
 * Clear all stored tokens (localStorage + cookie)
 */
export const clearTokens = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  if (typeof document !== 'undefined') {
    document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
  }
};

/**
 * Check if user is authenticated (has a token)
 */
export const isAuthenticated = (): boolean => {
  return !!getToken();
};
