'use client'

import React from 'react'
import Link from 'next/link'
import { useAuthStore } from '@/lib/stores/authStore'
import { useUIStore } from '@/lib/stores/uiStore'
import { Button } from '@/components/ui/button-custom'
import { Menu, LogOut, User, Settings } from 'lucide-react'

export function Header() {
  const { user, logout } = useAuthStore()
  const { toggleMobileMenu, mobileMenuOpen } = useUIStore()

  const handleLogout = () => {
    logout()
    window.location.href = '/auth/login'
  }

  if (!user) return null

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 hover:bg-secondary rounded-lg transition"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/dashboard" className="font-display text-xl font-bold text-primary">
            FitBrain
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2 text-sm">
            <span className="text-card-foreground">{user.name}</span>
          </div>
          <button className="p-2 hover:bg-secondary rounded-lg transition">
            <Settings className="h-5 w-5 text-card-foreground" />
          </button>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-secondary rounded-lg transition"
            title="Logout"
          >
            <LogOut className="h-5 w-5 text-card-foreground" />
          </button>
        </div>
      </div>
    </header>
  )
}
