'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

type Profile = {
  id: string
  username?: string
  full_name?: string
  bio?: string
  tier: string
  monthly_jott_limit: number
  jotts_created_this_month: number
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error && error.code !== 'PGRST116') throw error

      if (data) {
        setProfile(data)
        setFullName(data.full_name || '')
        setUsername(data.username || '')
        setBio(data.bio || '')
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async () => {
    if (!profile) return

    setSaving(true)
    setError(null)
    setSuccess(false)

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          username: username.toLowerCase().replace(/[^a-z0-9_]/g, ''),
          bio: bio,
          updated_at: new Date().toISOString()
        })
        .eq('id', profile.id)

      if (error) throw error

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-2xl font-bold text-jott-blue">
                JFrame
              </Link>
              <span className="ml-4 text-gray-600">Settings</span>
            </div>
            <div>
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-4">Account</h3>
              <nav className="space-y-2">
                <a href="#profile" className="block text-jott-blue hover:underline">
                  Profile
                </a>
                <a href="#subscription" className="block text-gray-600 hover:text-gray-900">
                  Subscription
                </a>
                <a href="#api" className="block text-gray-600 hover:text-gray-900">
                  API Keys
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-6">
            {/* Profile Settings */}
            <div id="profile" className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Profile Settings</h2>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm mb-4">
                  Profile updated successfully!
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jott-blue"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-lg">
                      @
                    </span>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-jott-blue"
                      placeholder="johndoe"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Only lowercase letters, numbers, and underscores
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jott-blue"
                    rows={4}
                    placeholder="Tell us about yourself..."
                    maxLength={200}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {bio.length}/200 characters
                  </p>
                </div>

                <button
                  onClick={updateProfile}
                  disabled={saving}
                  className="bg-jott-blue text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>

            {/* Subscription Settings */}
            <div id="subscription" className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Subscription</h2>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">Current Plan</h3>
                    <p className="text-2xl font-bold text-jott-blue capitalize">
                      {profile?.tier || 'Free'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Jotts this month</p>
                    <p className="text-2xl font-bold">
                      {profile?.jotts_created_this_month || 0} / {profile?.monthly_jott_limit || 20}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Free Plan Features:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ 20 Jotts per month</li>
                    <li>✓ Basic analytics</li>
                    <li>✓ Public sharing</li>
                    <li>✓ Standard templates</li>
                  </ul>
                </div>

                <button className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition">
                  Upgrade to Pro
                </button>
              </div>
            </div>

            {/* API Keys */}
            <div id="api" className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">API Keys</h2>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-yellow-700">
                  API access is available for Pro and Team plans. Upgrade your subscription to generate API keys.
                </p>
              </div>

              <button
                disabled
                className="bg-gray-300 text-gray-500 py-2 px-4 rounded-lg cursor-not-allowed"
              >
                Generate New API Key
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}