import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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
          // This will be connected to real API
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          })
          
          if (!response.ok) {
            throw new Error('Login failed')
          }

          const data = await response.json()
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
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name }),
          })

          if (!response.ok) {
            throw new Error('Registration failed')
          }

          const data = await response.json()
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
