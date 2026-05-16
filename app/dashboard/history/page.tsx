'use client'

import React, { useState } from 'react'
import { Calendar, Eye, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button-custom'

const mockSessions = [
  {
    id: 1,
    name: 'Chest & Triceps',
    date: '2024-12-20',
    duration: 45,
    calories: 320,
    exercises: 5,
    type: 'strength',
  },
  {
    id: 2,
    name: 'Leg Day',
    date: '2024-12-19',
    duration: 60,
    calories: 450,
    exercises: 6,
    type: 'strength',
  },
  {
    id: 3,
    name: 'Cardio Session',
    date: '2024-12-18',
    duration: 30,
    calories: 280,
    exercises: 1,
    type: 'cardio',
  },
  {
    id: 4,
    name: 'Back & Biceps',
    date: '2024-12-17',
    duration: 50,
    calories: 380,
    exercises: 5,
    type: 'strength',
  },
  {
    id: 5,
    name: 'Full Body',
    date: '2024-12-16',
    duration: 75,
    calories: 520,
    exercises: 8,
    type: 'strength',
  },
  {
    id: 6,
    name: 'Flexibility Training',
    date: '2024-12-15',
    duration: 20,
    calories: 80,
    exercises: 1,
    type: 'flexibility',
  },
]

export default function HistoryPage() {
  const [selectedSession, setSelectedSession] = useState<number | null>(null)
  const [filter, setFilter] = useState<'all' | 'strength' | 'cardio' | 'flexibility'>('all')

  const filteredSessions =
    filter === 'all' ? mockSessions : mockSessions.filter((s) => s.type === filter)

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      strength: 'text-primary',
      cardio: 'text-accent',
      flexibility: 'text-primary',
    }
    return colors[type] || 'text-muted-foreground'
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground mb-1">Workout History</h1>
        <p className="text-muted">View and manage your past workouts</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['all', 'strength', 'cardio', 'flexibility'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type as any)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition capitalize ${
              filter === type
                ? 'bg-primary text-white'
                : 'bg-card border border-border text-foreground hover:border-primary/50'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Sessions List */}
      <div className="space-y-3">
        {filteredSessions.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <p className="text-muted">No workouts found</p>
          </div>
        ) : (
          filteredSessions.map((session) => (
            <div
              key={session.id}
              className="bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-foreground">{session.name}</h3>
                        <span className={`text-xs font-medium capitalize ${getTypeColor(session.type)}`}>
                          {session.type}
                        </span>
                      </div>
                      <p className="text-sm text-muted flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(session.date)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-3 text-sm">
                    <span className="text-foreground">
                      <span className="font-medium">{session.duration}</span> min
                    </span>
                    <span className="text-accent">
                      <span className="font-medium">{session.calories}</span> cal
                    </span>
                    <span className="text-muted">
                      <span className="font-medium">{session.exercises}</span> exercises
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setSelectedSession(session.id)}
                    className="flex items-center gap-1"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="hidden sm:inline">View</span>
                  </Button>
                  <Button variant="outline" size="sm" className="p-2">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Session Detail Modal */}
      {selectedSession && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-xl p-6 max-w-2xl w-full max-h-96 overflow-y-auto">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              {filteredSessions.find((s) => s.id === selectedSession)?.name}
            </h2>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-background rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-primary">
                  {filteredSessions.find((s) => s.id === selectedSession)?.duration}
                </p>
                <p className="text-xs text-muted">minutes</p>
              </div>
              <div className="bg-background rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-accent">
                  {filteredSessions.find((s) => s.id === selectedSession)?.calories}
                </p>
                <p className="text-xs text-muted">calories</p>
              </div>
              <div className="bg-background rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-foreground">
                  {filteredSessions.find((s) => s.id === selectedSession)?.exercises}
                </p>
                <p className="text-xs text-muted">exercises</p>
              </div>
              <div className="bg-background rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-foreground">
                  {filteredSessions.find((s) => s.id === selectedSession)?.type === 'strength' ? 'S' : 'C'}
                </p>
                <p className="text-xs text-muted">type</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" size="lg" className="flex-1">
                Edit
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={() => setSelectedSession(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
