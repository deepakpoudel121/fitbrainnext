'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUIStore } from '@/lib/stores/uiStore'
import {
  BarChart3,
  ClipboardList,
  History,
  User,
  Settings,
  TrendingUp,
  Dumbbell,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Workout', href: '/workout', icon: Dumbbell },
  { name: 'Log Session', href: '/log', icon: ClipboardList },
  { name: 'History', href: '/history', icon: History },
  { name: 'Progress', href: '/progress', icon: TrendingUp },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { mobileMenuOpen, toggleMobileMenu } = useUIStore()

  return (
    <>
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-16 h-[calc(100vh-64px)] w-64 border-r border-border bg-card transition-all duration-300 ease-in-out overflow-y-auto z-40',
          'lg:translate-x-0 lg:relative lg:top-0',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <nav className="space-y-2 p-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-card-foreground hover:bg-secondary'
                )}
                onClick={() => {
                  if (mobileMenuOpen) toggleMobileMenu()
                }}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
