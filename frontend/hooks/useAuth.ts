import { useAuthContext } from '@/contexts/AuthContext'

/**
 * useAuth Hook
 *
 * Architecture Reference: HW3 Class Diagram - useAuth
 * - Custom React Hook for authentication
 * - Encapsulates auth state access logic
 * - Provides login/logout operations
 *
 * Methods:
 * - login(credentials): Promise<void>
 * - logout(): void
 * - getUser(): User
 */

export function useAuth() {
  const { user, token, isAuthenticated, login, logout, isLoading } = useAuthContext()

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login: async (username: string, password: string) => {
      const success = await login(username, password)
      if (!success) {
        throw new Error('Login failed')
      }
    },
    logout,
    getUser: () => user,
  }
}
