'use client'

import React, { useState } from 'react'
import { useAuthStore } from '@/lib/stores/authStore'
import { Button } from '@/components/ui/button-custom'
import { Save, Camera, Mail, User, MapPin, Dumbbell } from 'lucide-react'

export default function ProfilePage() {
  const { user, setUser } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    fitnessGoal: user?.fitnessGoal || 'weight-loss',
    level: user?.level || 'beginner',
    bio: 'Passionate about fitness and health',
    location: 'New York, NY',
    age: 28,
    height: "5'10\"",
    weight: 180,
    targetWeight: 170,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Update user
    setUser({
      ...user!,
      name: formData.name,
      email: formData.email,
      fitnessGoal: formData.fitnessGoal,
      level: formData.level as any,
    })
    setIsEditing(false)
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-1">Profile</h1>
          <p className="text-muted">Manage your account settings</p>
        </div>
        {!isEditing && (
          <Button variant="secondary" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
      </div>

      {!isEditing ? (
        <>
          {/* Profile Card */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="relative">
                <div className="h-24 w-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-display text-2xl font-bold">
                  {user?.name?.charAt(0)}
                </div>
                <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1">
                <h2 className="font-display text-2xl font-bold text-foreground mb-1">{formData.name}</h2>
                <p className="text-muted flex items-center gap-2 mb-4">
                  <Mail className="h-4 w-4" />
                  {formData.email}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {formData.level}
                  </span>
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                    {formData.fitnessGoal}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Age', value: formData.age, unit: 'years' },
              { label: 'Height', value: formData.height, unit: '' },
              { label: 'Weight', value: formData.weight, unit: 'lbs' },
              { label: 'Target Weight', value: formData.targetWeight, unit: 'lbs' },
            ].map((stat) => (
              <div key={stat.label} className="bg-card border border-border rounded-lg p-4 text-center">
                <p className="text-sm text-muted mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                  <span className="text-sm text-muted ml-1">{stat.unit}</span>
                </p>
              </div>
            ))}
          </div>

          {/* About Section */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-display text-lg font-bold text-foreground mb-4">About</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-muted mb-1">Location</label>
                <p className="text-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {formData.location}
                </p>
              </div>
              <div>
                <label className="block text-sm text-muted mb-1">Bio</label>
                <p className="text-foreground">{formData.bio}</p>
              </div>
            </div>
          </div>

          {/* Fitness Preferences */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Dumbbell className="h-5 w-5" />
              Fitness Preferences
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-muted mb-2">Fitness Goal</label>
                <p className="text-foreground font-medium capitalize">{formData.fitnessGoal.replace('-', ' ')}</p>
              </div>
              <div>
                <label className="block text-sm text-muted mb-2">Experience Level</label>
                <p className="text-foreground font-medium capitalize">{formData.level}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h2 className="font-display text-lg font-bold text-foreground mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Height</label>
                  <input
                    type="text"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
            </div>
          </div>

          {/* Fitness Information */}
          <div>
            <h2 className="font-display text-lg font-bold text-foreground mb-4">Fitness Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Current Weight (lbs)</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Target Weight (lbs)</label>
                  <input
                    type="number"
                    name="targetWeight"
                    value={formData.targetWeight}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Fitness Goal</label>
                  <select
                    name="fitnessGoal"
                    value={formData.fitnessGoal}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="weight-loss">Weight Loss</option>
                    <option value="muscle-gain">Muscle Gain</option>
                    <option value="strength">Strength</option>
                    <option value="endurance">Endurance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Experience Level</label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="submit" variant="default" size="lg" className="flex-1">
              <Save className="h-5 w-5 mr-2" />
              Save Changes
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
