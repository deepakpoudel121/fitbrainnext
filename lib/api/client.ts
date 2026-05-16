import axios, { AxiosInstance, AxiosError } from 'axios'
import { useAuthStore } from '@/lib/stores/authStore'

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired, logout user
      useAuthStore.getState().logout()
      window.location.href = '/auth/login'
    }
    return Promise.reject(error)
  }
)

// API endpoints
export const apiClient = {
  // Auth endpoints
  auth: {
    login: (email: string, password: string) =>
      axiosInstance.post('/api/auth/login', { email, password }),
    register: (email: string, password: string, name: string) =>
      axiosInstance.post('/api/auth/register', { email, password, name }),
    logout: () => axiosInstance.post('/api/auth/logout'),
    verify: () => axiosInstance.get('/api/auth/verify'),
  },

  // Workout endpoints
  workouts: {
    list: (params?: any) => axiosInstance.get('/api/workouts', { params }),
    get: (id: string) => axiosInstance.get(`/api/workouts/${id}`),
    create: (data: any) => axiosInstance.post('/api/workouts', data),
    update: (id: string, data: any) => axiosInstance.put(`/api/workouts/${id}`, data),
    delete: (id: string) => axiosInstance.delete(`/api/workouts/${id}`),
  },

  // Exercise endpoints
  exercises: {
    list: (params?: any) => axiosInstance.get('/api/exercises', { params }),
    get: (id: string) => axiosInstance.get(`/api/exercises/${id}`),
    create: (data: any) => axiosInstance.post('/api/exercises', data),
    update: (id: string, data: any) => axiosInstance.put(`/api/exercises/${id}`, data),
    delete: (id: string) => axiosInstance.delete(`/api/exercises/${id}`),
  },

  // Session endpoints
  sessions: {
    list: (params?: any) => axiosInstance.get('/api/sessions', { params }),
    get: (id: string) => axiosInstance.get(`/api/sessions/${id}`),
    create: (data: any) => axiosInstance.post('/api/sessions', data),
    update: (id: string, data: any) => axiosInstance.put(`/api/sessions/${id}`, data),
    complete: (id: string, data: any) => axiosInstance.post(`/api/sessions/${id}/complete`, data),
  },

  // User endpoints
  user: {
    profile: () => axiosInstance.get('/api/user/profile'),
    updateProfile: (data: any) => axiosInstance.put('/api/user/profile', data),
    stats: () => axiosInstance.get('/api/user/stats'),
    preferences: () => axiosInstance.get('/api/user/preferences'),
    updatePreferences: (data: any) => axiosInstance.put('/api/user/preferences', data),
  },

  // Analytics endpoints
  analytics: {
    dashboard: () => axiosInstance.get('/api/analytics/dashboard'),
    progress: (params?: any) => axiosInstance.get('/api/analytics/progress', { params }),
    performance: (params?: any) => axiosInstance.get('/api/analytics/performance', { params }),
  },
}

export default axiosInstance
