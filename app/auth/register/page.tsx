'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/stores/authStore'
import { Button } from '@/components/ui/button-custom'
import { AlertCircle, UserPlus } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const { register, isLoading, error } = useAuthStore()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [localError, setLocalError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError('')

    if (!name || !email || !password || !confirmPassword) {
      setLocalError('Please fill in all fields')
      return
    }

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match')
      return
    }

    if (password.length < 8) {
      setLocalError('Password must be at least 8 characters')
      return
    }

    try {
      await register(email, password, name)
      router.push('/dashboard')
    } catch (err) {
      setLocalError('Registration failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold text-primary mb-2">FitBrain</h1>
          <p className="text-card-foreground">Create Your Account</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isLoading}
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            <UserPlus className="h-5 w-5 mr-2" />
            Create Account
          </Button>

          <p className="text-center text-sm text-muted">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary hover:underline font-medium">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
