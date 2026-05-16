'use client'

import React, { ReactNode } from 'react'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { useAuthStore } from '@/lib/stores/authStore'
import { redirect } from 'next/navigation'

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const { user } = useAuthStore()

  // Redirect to login if not authenticated
  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
