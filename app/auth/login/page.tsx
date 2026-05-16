'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/stores/authStore'
import { Button } from '@/components/ui/button-custom'
import { AlertCircle, LogIn } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoading, error } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError('')

    if (!email || !password) {
      setLocalError('Please fill in all fields')
      return
    }

    try {
      await login(email, password)
      router.push('/dashboard')
    } catch (err) {
      setLocalError('Invalid email or password')
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold text-primary mb-2">FitBrain</h1>
          <p className="text-card-foreground">AI-Powered Fitness Tracking</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isLoading}
            />
          </div>

          {(error || localError) && (
            <div className="flex items-start gap-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error || localError}</p>
            </div>
          )}

          <Button
            type="submit"
            variant="default"
            size="lg"
            className="w-full"
            isLoading={isLoading}
          >
            <LogIn className="h-5 w-5 mr-2" />
            Sign In
          </Button>

          <p className="text-center text-sm text-muted">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="text-primary hover:underline font-medium">
              Register
            </Link>
          </p>
        </form>

        <div className="mt-8 p-4 bg-secondary/50 rounded-lg border border-border">
          <p className="text-xs text-muted mb-2">Demo Credentials:</p>
          <p className="text-xs text-card-foreground">Email: demo@fitbrain.com</p>
          <p className="text-xs text-card-foreground">Password: demo123456</p>
        </div>
      </div>
    </div>
  )
}
