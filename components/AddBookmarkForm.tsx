'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function AddBookmarkForm() {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!title.trim() || !url.trim()) {
      setError('Please enter both a title and a URL.')
      return
    }

    let finalUrl = url.trim()
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl
    }

    setLoading(true)

    const { error: insertError } = await supabase
      .from('bookmarks')
      .insert({ title: title.trim(), url: finalUrl })

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    setTitle('')
    setUrl('')
    setLoading(false)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">＋ Add New Bookmark</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Next.js Documentation"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
            URL
          </label>
          <input
            id="url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="e.g. https://nextjs.org/docs"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">
            ⚠️ {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving…' : 'Save Bookmark'}
        </button>
      </form>
    </div>
  )
}