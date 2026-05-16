import { create } from 'zustand'

export interface UIState {
  sidebarOpen: boolean
  mobileMenuOpen: boolean
  theme: 'dark' | 'light'
  activeTab: string
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  setMobileMenuOpen: (open: boolean) => void
  toggleMobileMenu: () => void
  setTheme: (theme: 'dark' | 'light') => void
  setActiveTab: (tab: string) => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  mobileMenuOpen: false,
  theme: 'dark',
  activeTab: 'dashboard',

  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  setTheme: (theme) => set({ theme }),
  setActiveTab: (tab) => set({ activeTab: tab }),
}))
