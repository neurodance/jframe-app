'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [email, setEmail] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-jott-blue">JFrame</h1>
              <span className="ml-2 text-sm text-gray-600">Beta</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-700 hover:text-jott-blue">
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-jott-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Start Jotting
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Think it. Jott it. Share it.
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your ideas into beautiful, shareable Jotts in seconds.
            Powered by AI, designed for impact.
          </p>

          {/* Email Capture */}
          <div className="max-w-md mx-auto">
            <form className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-jott-blue"
              />
              <button
                type="submit"
                className="bg-jott-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Get Started Free
              </button>
            </form>
            <p className="text-sm text-gray-500 mt-2">
              20 free Jotts per month • No credit card required
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-jott-blue">30s</div>
              <div className="text-gray-600">Average read time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-jott-blue">65%</div>
              <div className="text-gray-600">Better retention</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-jott-blue">10x</div>
              <div className="text-gray-600">More engagement</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Creators Choose Jott
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-semibold mb-2">Create in Minutes</h3>
              <p className="text-gray-600">
                AI helps you transform ideas into polished Jotts instantly
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="font-semibold mb-2">Monetize Your Knowledge</h3>
              <p className="text-gray-600">
                Build a subscriber base and earn from your Jotts
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold mb-2">Track Everything</h3>
              <p className="text-gray-600">
                Analytics show you what resonates with your audience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Jott Types */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Jott Anything
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              '📊 Data Dashboards',
              '📰 News Summaries',
              '🍽️ Restaurant Menus',
              '📝 Registration Forms',
              '🖼️ Photo Galleries',
              '📈 Sales Reports',
              '👤 Team Profiles',
              '📅 Event Invites',
            ].map((type) => (
              <div
                key={type}
                className="bg-white p-4 rounded-lg text-center hover:shadow-lg transition cursor-pointer"
              >
                {type}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4">
            Ready to revolutionize your content?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of Jotters creating impact in 30 seconds or less
          </p>
          <Link
            href="/signup"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition"
          >
            Start Creating Free Jotts
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/features" className="hover:text-white">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/templates" className="hover:text-white">Templates</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/docs" className="hover:text-white">Documentation</Link></li>
                <li><Link href="/api" className="hover:text-white">API</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="https://twitter.com/jframe" className="hover:text-white">Twitter</a></li>
                <li><a href="https://github.com/neurodance/jframe" className="hover:text-white">GitHub</a></li>
                <li><a href="https://discord.gg/jframe" className="hover:text-white">Discord</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p>&copy; 2024 JFrame. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}