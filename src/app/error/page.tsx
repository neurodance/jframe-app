'use client'

import Link from 'next/link'

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <div className="mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold text-jott-blue">JFrame</h1>
          </Link>
        </div>

        {/* Error Message */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">
            We encountered an error while processing your request. This could be due to an invalid or expired link.
          </p>
          <div className="space-y-3">
            <Link
              href="/login"
              className="block w-full bg-jott-blue text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Back to Login
            </Link>
            <Link
              href="/"
              className="block w-full border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 transition"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}