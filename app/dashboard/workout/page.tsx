'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button-custom'
import { Plus, Play, Pause, StopCircle, CheckCircle2 } from 'lucide-react'

const exercises = [
  { id: 1, name: 'Bench Press', sets: 4, reps: 8, weight: 185, category: 'Chest' },
  { id: 2, name: 'Incline Dumbbell Press', sets: 3, reps: 10, weight: 70, category: 'Chest' },
  { id: 3, name: 'Cable Flyes', sets: 3, reps: 12, weight: 80, category: 'Chest' },
  { id: 4, name: 'Tricep Dips', sets: 3, reps: 10, weight: 'BW', category: 'Triceps' },
  { id: 5, name: 'Rope Pushdowns', sets: 3, reps: 12, weight: 60, category: 'Triceps' },
]

export default function WorkoutPage() {
  const [activeExercise, setActiveExercise] = useState<number | null>(null)
  const [workoutStarted, setWorkoutStarted] = useState(false)
  const [currentSet, setCurrentSet] = useState(1)
  const [timer, setTimer] = useState(0)

  const handleStartWorkout = () => {
    setWorkoutStarted(true)
    setActiveExercise(exercises[0].id)
  }

  const handleCompleteExercise = () => {
    const currentIndex = exercises.findIndex(e => e.id === activeExercise)
    if (currentIndex < exercises.length - 1) {
      setActiveExercise(exercises[currentIndex + 1].id)
      setCurrentSet(1)
    } else {
      handleEndWorkout()
    }
  }

  const handleEndWorkout = () => {
    setWorkoutStarted(false)
    setActiveExercise(null)
    setCurrentSet(1)
    setTimer(0)
  }

  const currentExercise = exercises.find(e => e.id === activeExercise)

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground mb-1">Workout</h1>
        <p className="text-muted">Start a new workout session</p>
      </div>

      {!workoutStarted ? (
        <>
          {/* Workout Plan */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-display text-xl font-bold text-foreground mb-4">Today&apos;s Workout Plan</h2>
            <div className="space-y-2 mb-6">
              {exercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="flex items-center justify-between p-4 bg-background border border-border rounded-lg hover:border-primary/50 transition"
                >
                  <div>
                    <p className="font-medium text-foreground">{exercise.name}</p>
                    <p className="text-sm text-muted">{exercise.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">
                      {exercise.sets}x{exercise.reps}
                    </p>
                    <p className="text-xs text-accent">{exercise.weight} {typeof exercise.weight === 'number' ? 'lbs' : ''}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="default" size="lg" className="w-full" onClick={handleStartWorkout}>
              <Play className="h-5 w-5 mr-2" />
              Start Workout
            </Button>
          </div>

          {/* Other Workouts */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-display text-xl font-bold text-foreground mb-4">Available Workouts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Leg Day', 'Back & Biceps', 'Shoulder & Arms', 'Full Body'].map((workout) => (
                <button
                  key={workout}
                  className="p-4 bg-background border border-border rounded-lg hover:border-primary/50 hover:bg-secondary/50 transition text-left"
                >
                  <p className="font-medium text-foreground">{workout}</p>
                  <p className="text-xs text-muted mt-1">5 exercises • 60 min</p>
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Active Workout */}
          <div className="bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/50 rounded-xl p-6">
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                {currentExercise?.name}
              </h2>
              <p className="text-muted">Exercise {exercises.findIndex(e => e.id === activeExercise) + 1} of {exercises.length}</p>
            </div>

            {/* Exercise Details */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-card rounded-lg p-4 text-center border border-border">
                <p className="text-sm text-muted mb-1">Set</p>
                <p className="text-3xl font-bold text-primary">{currentSet}</p>
                <p className="text-xs text-muted mt-1">of {currentExercise?.sets}</p>
              </div>
              <div className="bg-card rounded-lg p-4 text-center border border-border">
                <p className="text-sm text-muted mb-1">Reps</p>
                <p className="text-3xl font-bold text-accent">{currentExercise?.reps}</p>
              </div>
              <div className="bg-card rounded-lg p-4 text-center border border-border">
                <p className="text-sm text-muted mb-1">Weight</p>
                <p className="text-3xl font-bold text-foreground">{currentExercise?.weight}</p>
                <p className="text-xs text-muted mt-1">{typeof currentExercise?.weight === 'number' ? 'lbs' : ''}</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-4 mb-4">
              <Button variant="secondary" size="lg" className="flex-1">
                <Pause className="h-5 w-5 mr-2" />
                Rest
              </Button>
              <Button
                variant="default"
                size="lg"
                className="flex-1"
                onClick={() => {
                  if (currentSet < (currentExercise?.sets || 0)) {
                    setCurrentSet(currentSet + 1)
                  } else {
                    handleCompleteExercise()
                  }
                }}
              >
                <CheckCircle2 className="h-5 w-5 mr-2" />
                Next
              </Button>
            </div>

            <Button variant="outline" size="lg" className="w-full" onClick={handleEndWorkout}>
              <StopCircle className="h-5 w-5 mr-2" />
              End Workout
            </Button>
          </div>

          {/* Remaining Exercises */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-display text-lg font-bold text-foreground mb-4">Remaining Exercises</h2>
            <div className="space-y-2">
              {exercises
                .slice(exercises.findIndex(e => e.id === activeExercise) + 1)
                .map((exercise) => (
                  <div
                    key={exercise.id}
                    className="flex items-center justify-between p-3 bg-background rounded-lg border border-border text-muted"
                  >
                    <p className="font-medium">{exercise.name}</p>
                    <p className="text-sm">{exercise.sets}x{exercise.reps}</p>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
