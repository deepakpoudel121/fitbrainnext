'use client'

import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { useAuthStore } from '@/lib/stores/authStore'
import { Button } from '@/components/ui/button-custom'
import { TrendingUp, Activity, Zap, Target, Clock, Flame } from 'lucide-react'
import Link from 'next/link'

// Sample data
const weeklyData = [
  { day: 'Mon', workouts: 1, duration: 45 },
  { day: 'Tue', workouts: 2, duration: 60 },
  { day: 'Wed', workouts: 1, duration: 30 },
  { day: 'Thu', workouts: 2, duration: 75 },
  { day: 'Fri', workouts: 0, duration: 0 },
  { day: 'Sat', workouts: 3, duration: 90 },
  { day: 'Sun', workouts: 1, duration: 45 },
]

const progressData = [
  { week: 'Week 1', weight: 75, reps: 8 },
  { week: 'Week 2', weight: 75, reps: 10 },
  { week: 'Week 3', weight: 80, reps: 8 },
  { week: 'Week 4', weight: 80, reps: 12 },
]

const stats = [
  { label: 'Workouts This Week', value: '10', icon: Activity, color: 'text-primary' },
  { label: 'Total Duration', value: '7.5h', icon: Clock, color: 'text-accent' },
  { label: 'Calories Burned', value: '2,450', icon: Flame, color: 'text-accent' },
  { label: 'Streak Days', value: '12', icon: TrendingUp, color: 'text-primary' },
]

export default function DashboardPage() {
  const { user } = useAuthStore()

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground mb-1">
          Welcome back, {user?.name}! 💪
        </h1>
        <p className="text-muted">Here&apos;s your fitness progress</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-xl p-5 flex items-start justify-between hover:border-primary/50 transition"
            >
              <div>
                <p className="text-sm text-muted mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
              <Icon className={`h-8 w-8 ${stat.color} opacity-20`} />
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-display text-xl font-bold text-foreground mb-4">Weekly Activity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="day" stroke="var(--color-muted)" />
              <YAxis stroke="var(--color-muted)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="workouts" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Progress Tracking */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-display text-xl font-bold text-foreground mb-4">Progress Tracking</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="week" stroke="var(--color-muted)" />
              <YAxis stroke="var(--color-muted)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="var(--color-primary)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="reps"
                stroke="var(--color-accent)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/workout" className="block">
          <Button variant="secondary" size="lg" className="w-full">
            <Zap className="h-5 w-5 mr-2" />
            Start Workout
          </Button>
        </Link>
        <Link href="/log" className="block">
          <Button variant="secondary" size="lg" className="w-full">
            <Target className="h-5 w-5 mr-2" />
            Log Session
          </Button>
        </Link>
        <Link href="/history" className="block">
          <Button variant="secondary" size="lg" className="w-full">
            <Activity className="h-5 w-5 mr-2" />
            View History
          </Button>
        </Link>
      </div>

      {/* Recent Sessions */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="font-display text-xl font-bold text-foreground mb-4">Recent Sessions</h2>
        <div className="space-y-3">
          {[
            { name: 'Chest & Triceps', duration: '45min', calories: '320', date: 'Today' },
            { name: 'Leg Day', duration: '60min', calories: '450', date: 'Yesterday' },
            { name: 'Back & Biceps', duration: '50min', calories: '380', date: '2 days ago' },
          ].map((session, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-background rounded-lg border border-border hover:border-primary/50 transition cursor-pointer"
            >
              <div>
                <p className="font-medium text-foreground">{session.name}</p>
                <p className="text-xs text-muted">{session.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{session.duration}</p>
                <p className="text-xs text-accent">{session.calories} cal</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
