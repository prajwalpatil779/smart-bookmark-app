'use client'

import { createClient } from '@/lib/supabase'
import { useState } from 'react'

export default function LoginButton() {
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleLogin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      console.error('Login error:', error.message)
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleLogin}
      disabled={loading}
      className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-gray-300 hover:shadow-md text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
        <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" fill="#FFC107"/>
        <path d="M6.3 14.7l7 5.1C15.1 16 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.3 2 9.7 7.4 6.3 14.7z" fill="#FF3D00"/>
        <path d="M24 46c5.5 0 10.5-1.9 14.3-5.1l-6.6-5.6C29.7 36.6 27 37.5 24 37.5c-6.1 0-11.2-4.1-13-9.7L3.9 33c3.3 7.1 10.4 12 20.1 13z" fill="#4CAF50"/>
        <path d="M44.5 20H24v8.5h11.8c-1 2.9-2.9 5.3-5.4 6.9l6.6 5.6C41.5 37.3 45 31 45 24c0-1.3-.2-2.7-.5-4z" fill="#1976D2"/>
      </svg>
      {loading ? 'Redirecting to Google…' : 'Continue with Google'}
    </button>
  )
}