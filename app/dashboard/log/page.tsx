'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button-custom'
import { Save, Plus, X } from 'lucide-react'

export default function LogPage() {
  const [workoutType, setWorkoutType] = useState('strength')
  const [duration, setDuration] = useState('')
  const [calories, setCalories] = useState('')
  const [notes, setNotes] = useState('')
  const [exercises, setExercises] = useState<Array<{ name: string; sets: string; reps: string; weight: string }>>([])
  const [isAddingExercise, setIsAddingExercise] = useState(false)
  const [newExercise, setNewExercise] = useState({ name: '', sets: '3', reps: '8', weight: '' })

  const handleAddExercise = () => {
    if (newExercise.name) {
      setExercises([...exercises, { ...newExercise }])
      setNewExercise({ name: '', sets: '3', reps: '8', weight: '' })
      setIsAddingExercise(false)
    }
  }

  const handleRemoveExercise = (idx: number) => {
    setExercises(exercises.filter((_, i) => i !== idx))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle submission
    console.log('[v0] Logging session:', {
      workoutType,
      duration,
      calories,
      exercises,
      notes,
    })
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground mb-1">Log Workout Session</h1>
        <p className="text-muted">Record your completed workout</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 space-y-6">
        {/* Workout Type */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">Workout Type</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {['strength', 'cardio', 'flexibility', 'sports'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setWorkoutType(type)}
                className={`p-3 rounded-lg border-2 transition font-medium capitalize ${
                  workoutType === type
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-background text-foreground hover:border-primary/50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Duration & Calories */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Duration (minutes)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="45"
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Calories Burned</label>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="320"
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Exercises */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-foreground">Exercises</label>
            <button
              type="button"
              onClick={() => setIsAddingExercise(!isAddingExercise)}
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              Add Exercise
            </button>
          </div>

          {isAddingExercise && (
            <div className="bg-background border border-border rounded-lg p-4 mb-4 space-y-3">
              <input
                type="text"
                value={newExercise.name}
                onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                placeholder="Exercise name"
                className="w-full px-3 py-2 bg-card border border-border rounded text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  value={newExercise.sets}
                  onChange={(e) => setNewExercise({ ...newExercise, sets: e.target.value })}
                  placeholder="Sets"
                  className="px-3 py-2 bg-card border border-border rounded text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="number"
                  value={newExercise.reps}
                  onChange={(e) => setNewExercise({ ...newExercise, reps: e.target.value })}
                  placeholder="Reps"
                  className="px-3 py-2 bg-card border border-border rounded text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  value={newExercise.weight}
                  onChange={(e) => setNewExercise({ ...newExercise, weight: e.target.value })}
                  placeholder="Weight"
                  className="px-3 py-2 bg-card border border-border rounded text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="default" size="sm" className="flex-1" onClick={handleAddExercise}>
                  Add
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => setIsAddingExercise(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {exercises.length === 0 ? (
              <p className="text-sm text-muted italic">No exercises added yet</p>
            ) : (
              exercises.map((ex, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-background border border-border rounded-lg"
                >
                  <div>
                    <p className="font-medium text-foreground">{ex.name}</p>
                    <p className="text-xs text-muted">
                      {ex.sets}x{ex.reps}
                      {ex.weight && ` @ ${ex.weight}`}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveExercise(idx)}
                    className="p-1 hover:bg-secondary rounded transition"
                  >
                    <X className="h-4 w-4 text-destructive" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How did you feel? Any personal records?"
            rows={4}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        <Button type="submit" variant="default" size="lg" className="w-full">
          <Save className="h-5 w-5 mr-2" />
          Save Session
        </Button>
      </form>
    </div>
  )
}
