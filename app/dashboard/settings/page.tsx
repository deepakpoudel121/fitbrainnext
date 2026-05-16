'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button-custom'
import { Bell, Lock, Moon, Globe, Save, LogOut, AlertCircle } from 'lucide-react'
import { useAuthStore } from '@/lib/stores/authStore'
import { useRouter } from 'next/navigation'

export default function SettingsPage() {
  const router = useRouter()
  const { logout } = useAuthStore()
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    marketingEmails: false,
    darkMode: true,
    language: 'en',
  })

  const [showDangerZone, setShowDangerZone] = useState(false)

  const handleChange = (key: string, value: any) => {
    setSettings({ ...settings, [key]: value })
  }

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground mb-1">Settings</h1>
        <p className="text-muted">Manage your account preferences</p>
      </div>

      {/* Notification Settings */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
        </h2>
        <div className="space-y-4">
          {[
            {
              key: 'emailNotifications',
              label: 'Email Notifications',
              description: 'Receive email updates about your workouts',
            },
            {
              key: 'pushNotifications',
              label: 'Push Notifications',
              description: 'Get push notifications on your device',
            },
            {
              key: 'weeklyReports',
              label: 'Weekly Reports',
              description: 'Receive weekly fitness reports',
            },
            {
              key: 'marketingEmails',
              label: 'Marketing Emails',
              description: 'Receive promotional and marketing emails',
            },
          ].map((option) => (
            <div
              key={option.key}
              className="flex items-center justify-between p-4 bg-background rounded-lg border border-border"
            >
              <div>
                <p className="font-medium text-foreground">{option.label}</p>
                <p className="text-sm text-muted">{option.description}</p>
              </div>
              <label className="relative inline-flex items-center">
                <input
                  type="checkbox"
                  checked={(settings[option.key as keyof typeof settings] as boolean) || false}
                  onChange={(e) => handleChange(option.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-secondary peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Preferences
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Language</label>
            <select
              value={settings.language}
              onChange={(e) => handleChange('language', e.target.value)}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="ja">Japanese</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
            <div>
              <p className="font-medium text-foreground">Dark Mode</p>
              <p className="text-sm text-muted">Use dark theme for the interface</p>
            </div>
            <label className="relative inline-flex items-center">
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={(e) => handleChange('darkMode', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-secondary peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
            </label>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Security
        </h2>
        <div className="space-y-4">
          <Button variant="secondary" size="lg" className="w-full justify-start">
            <Lock className="h-5 w-5 mr-3" />
            Change Password
          </Button>
          <Button variant="secondary" size="lg" className="w-full justify-start">
            <Lock className="h-5 w-5 mr-3" />
            Two-Factor Authentication
          </Button>
        </div>
      </div>

      {/* Save Settings */}
      <Button variant="default" size="lg" className="w-full">
        <Save className="h-5 w-5 mr-2" />
        Save Settings
      </Button>

      {/* Danger Zone */}
      <div className="bg-card border-2 border-destructive/20 rounded-xl p-6">
        <h2 className="font-display text-lg font-bold text-destructive mb-4 flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          Danger Zone
        </h2>

        {!showDangerZone ? (
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => setShowDangerZone(true)}
          >
            Show Danger Zone Options
          </Button>
        ) : (
          <div className="space-y-3">
            <Button
              variant="destructive"
              size="lg"
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
            <Button
              variant="destructive"
              size="lg"
              className="w-full opacity-50 cursor-not-allowed"
              disabled
            >
              Delete Account
            </Button>
            <p className="text-xs text-muted">
              Deleting your account is permanent and cannot be undone.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => setShowDangerZone(false)}
            >
              Hide Options
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
