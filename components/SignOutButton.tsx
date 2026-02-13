"use client"

import { createClient } from '../lib/supabase'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function SignOutButton() {
  const supabase = createClient()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <button
      onClick={handleSignOut}
      className="text-sm text-gray-500 hover:text-red-500 border border-gray-200 hover:border-red-200 px-3 py-1.5 rounded-lg transition-colors"
    >
      Sign out
    </button>
  )
}
