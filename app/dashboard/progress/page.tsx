'use client'

import React, { useState } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, Target } from 'lucide-react'

const progressData = [
  { week: 'Week 1', weight: 75, strength: 8 },
  { week: 'Week 2', weight: 75, strength: 10 },
  { week: 'Week 3', weight: 80, strength: 8 },
  { week: 'Week 4', weight: 80, strength: 12 },
  { week: 'Week 5', weight: 85, strength: 10 },
  { week: 'Week 6', weight: 85, strength: 14 },
]

const workoutTypeData = [
  { name: 'Strength', value: 45, color: 'oklch(0.92 0.22 125)' },
  { name: 'Cardio', value: 30, color: 'oklch(0.65 0.24 25)' },
  { name: 'Flexibility', value: 15, color: 'oklch(0.7 0.18 200)' },
  { name: 'Sports', value: 10, color: 'oklch(0.75 0.18 60)' },
]

const goals = [
  { name: 'Run 5K', progress: 65, target: '100%', unit: 'mi' },
  { name: 'Bench Press', progress: 185, target: '225 lbs', unit: 'lbs' },
  { name: 'Squat', progress: 275, target: '315 lbs', unit: 'lbs' },
  { name: 'Lose Weight', progress: 180, target: '170 lbs', unit: 'lbs' },
]

export default function ProgressPage() {
  const [timeRange, setTimeRange] = useState('6weeks')

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground mb-1">Your Progress</h1>
        <p className="text-muted">Track your fitness improvements</p>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-2">
        {['1week', '4weeks', '6weeks', '3months'].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded-lg font-medium transition capitalize ${
              timeRange === range
                ? 'bg-primary text-white'
                : 'bg-card border border-border text-foreground hover:border-primary/50'
            }`}
          >
            {range.replace(/\d+/, (m) => m + ' ')}
          </button>
        ))}
      </div>

      {/* Progress Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weight & Strength Progress */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-display text-lg font-bold text-foreground mb-4">Strength Progress</h2>
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
                strokeWidth={3}
                dot={{ r: 4 }}
                name="Weight (lbs)"
              />
              <Line
                type="monotone"
                dataKey="strength"
                stroke="var(--color-accent)"
                strokeWidth={3}
                dot={{ r: 4 }}
                name="Reps (count)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Workout Type Distribution */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-display text-lg font-bold text-foreground mb-4">Workout Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={workoutTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {workoutTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {workoutTypeData.map((type) => (
              <div key={type.name} className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: type.color }} />
                <span className="text-sm text-foreground">
                  {type.name}: <span className="font-medium">{type.value}%</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Goals */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Fitness Goals
        </h2>
        <div className="space-y-4">
          {goals.map((goal) => {
            const percentage =
              goal.name === 'Lose Weight'
                ? ((goal.target as any).match(/\d+/) - goal.progress) / ((goal.target as any).match(/\d+/) - 170) * 100
                : (goal.progress / parseFloat(goal.target as any)) * 100

            return (
              <div key={goal.name} className="bg-background rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-foreground">{goal.name}</p>
                  <p className="text-sm text-primary font-bold">{Math.round(Math.min(100, percentage))}%</p>
                </div>
                <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary to-accent h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(100, percentage)}%`,
                    }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-muted">
                  <span>{goal.progress} {goal.unit}</span>
                  <span>Goal: {goal.target}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Workouts', value: '32', icon: '💪' },
          { label: 'Total Duration', value: '65h', icon: '⏱️' },
          { label: 'Calories Burned', value: '12.5K', icon: '🔥' },
          { label: 'Current Streak', value: '12 days', icon: '🔥' },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-lg p-4">
            <p className="text-2xl mb-2">{stat.icon}</p>
            <p className="text-sm text-muted mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
