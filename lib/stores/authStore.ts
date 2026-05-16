import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { apiClient } from '@/lib/api/client'

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  fitnessGoal?: string
  level?: 'beginner' | 'intermediate' | 'advanced'
}

export interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  setError: (error: string | null) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null })
        try {
          const response = await apiClient.auth.login(email, password)
          const data = response.data
          set({ user: data.user, token: data.token, isLoading: false })
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Login failed'
          set({ error: message, isLoading: false })
          throw error
        }
      },

      register: async (email: string, password: string, name: string) => {
        set({ isLoading: true, error: null })
        try {
          const response = await apiClient.auth.register(email, password, name)
          const data = response.data
          set({ user: data.user, token: data.token, isLoading: false })
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Registration failed'
          set({ error: message, isLoading: false })
          throw error
        }
      },

      logout: () => {
        set({ user: null, token: null, error: null })
      },

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'auth-store',
    }
  )
)
