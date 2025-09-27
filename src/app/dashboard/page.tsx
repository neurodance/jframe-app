'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

type User = {
  id: string
  email?: string
  user_metadata?: {
    full_name?: string
  }
}

type Jott = {
  id: string
  title: string
  description?: string
  created_at: string
  is_published: boolean
  view_count: number
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [jotts, setJotts] = useState<Jott[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    checkUser()
    fetchJotts()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
    } else {
      setUser(user)
    }
  }

  const fetchJotts = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('jotts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (!error && data) {
        setJotts(data)
      }
    } catch (error) {
      console.error('Error fetching jotts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this Jott?')) {
      return
    }

    try {
      const { error } = await supabase
        .from('jotts')
        .delete()
        .eq('id', id)

      if (error) throw error

      // Refresh the jotts list
      fetchJotts()
    } catch (error) {
      console.error('Error deleting jott:', error)
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
              <h1 className="text-2xl font-bold text-jott-blue">JFrame</h1>
              <span className="ml-4 text-gray-600">Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/create"
                className="bg-jott-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Create Jott
              </Link>
              <Link
                href="/settings"
                className="text-gray-600 hover:text-gray-900"
              >
                Settings
              </Link>
              <button
                onClick={handleSignOut}
                className="text-gray-600 hover:text-gray-900"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.user_metadata?.full_name || 'Jotter'}!
          </h2>
          <p className="text-gray-600">
            You're on the Free plan. You have 20 Jotts remaining this month.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-3xl font-bold text-jott-blue">{jotts.length}</div>
            <div className="text-gray-600">Total Jotts</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-3xl font-bold text-green-600">
              {jotts.filter(j => j.is_published).length}
            </div>
            <div className="text-gray-600">Published</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-3xl font-bold text-purple-600">
              {jotts.reduce((sum, j) => sum + j.view_count, 0)}
            </div>
            <div className="text-gray-600">Total Views</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-3xl font-bold text-jott-yellow">0</div>
            <div className="text-gray-600">Subscribers</div>
          </div>
        </div>

        {/* Recent Jotts */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold">Your Recent Jotts</h3>
          </div>
          {jotts.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-gray-400 text-5xl mb-4">📝</div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                No Jotts yet
              </h4>
              <p className="text-gray-600 mb-4">
                Create your first Jott and start sharing your ideas
              </p>
              <Link
                href="/create"
                className="inline-block bg-jott-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Create Your First Jott
              </Link>
            </div>
          ) : (
            <div className="divide-y">
              {jotts.map((jott) => (
                <div key={jott.id} className="p-6 hover:bg-gray-50 transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {jott.title}
                      </h4>
                      {jott.description && (
                        <p className="text-gray-600 text-sm mt-1">
                          {jott.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>
                          {new Date(jott.created_at).toLocaleDateString()}
                        </span>
                        <span>{jott.view_count} views</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            jott.is_published
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {jott.is_published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/edit/${jott.id}`}
                        className="text-jott-blue hover:text-blue-700"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(jott.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}