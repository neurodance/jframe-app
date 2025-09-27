'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

type Jott = {
  id: string
  title: string
  description?: string
  content: any
  is_published: boolean
  is_public: boolean
  created_at: string
  view_count: number
}

export default function EditJottPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [jott, setJott] = useState<Jott | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [cardJson, setCardJson] = useState('')
  const [isPublished, setIsPublished] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchJott()
  }, [id])

  const fetchJott = async () => {
    try {
      const { data, error } = await supabase
        .from('jotts')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error

      if (data) {
        setJott(data)
        setTitle(data.title)
        setDescription(data.description || '')
        setCardJson(JSON.stringify(data.content, null, 2))
        setIsPublished(data.is_published)
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const updateJott = async () => {
    if (!title || !cardJson) {
      setError('Please provide a title and valid card JSON')
      return
    }

    setSaving(true)
    setError(null)

    try {
      // Validate JSON
      const parsedJson = JSON.parse(cardJson)

      const { error } = await supabase
        .from('jotts')
        .update({
          title,
          description,
          content: parsedJson,
          is_published: isPublished,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)

      if (error) throw error

      router.push('/dashboard')
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        setError('Invalid JSON format')
      } else {
        setError(error.message)
      }
    } finally {
      setSaving(false)
    }
  }

  const deleteJott = async () => {
    if (!confirm('Are you sure you want to delete this Jott?')) {
      return
    }

    setSaving(true)
    setError(null)

    try {
      const { error } = await supabase
        .from('jotts')
        .delete()
        .eq('id', id)

      if (error) throw error

      router.push('/dashboard')
    } catch (error: any) {
      setError(error.message)
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

  if (!jott) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Jott not found</h2>
          <Link href="/dashboard" className="text-jott-blue hover:underline">
            Back to Dashboard
          </Link>
        </div>
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
              <span className="ml-4 text-gray-600">Edit Jott</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={deleteJott}
                className="text-red-600 hover:text-red-700"
              >
                Delete Jott
              </button>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Edit Your Jott</h2>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jott-blue"
                    placeholder="Enter your Jott title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description (optional)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jott-blue"
                    rows={2}
                    placeholder="Brief description of your Jott"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card JSON
                  </label>
                  <textarea
                    value={cardJson}
                    onChange={(e) => setCardJson(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jott-blue font-mono text-sm"
                    rows={15}
                    placeholder="Adaptive Card JSON"
                  />
                </div>

                <div className="border-t pt-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isPublished}
                      onChange={(e) => setIsPublished(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">
                      Published
                    </span>
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={updateJott}
                    disabled={saving || !title || !cardJson}
                    className="flex-1 bg-jott-blue text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <Link
                    href="/dashboard"
                    className="flex-1 text-center border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Info */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Jott Information</h3>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600">Status:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    isPublished
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>

                <div>
                  <span className="text-gray-600">Created:</span>
                  <span className="ml-2 text-gray-900">
                    {new Date(jott.created_at).toLocaleDateString()}
                  </span>
                </div>

                <div>
                  <span className="text-gray-600">Views:</span>
                  <span className="ml-2 text-gray-900">{jott.view_count}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-700">
                  <strong>Tip:</strong> You can edit the JSON directly to customize your Adaptive Card. Make sure the JSON is valid before saving.
                </p>
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Preview:</strong> In production, a live preview of your Adaptive Card would appear here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}