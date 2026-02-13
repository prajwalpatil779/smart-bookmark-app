'use client'

import { useEffect, useState } from 'react'
import { createClient, type Bookmark } from '../lib/supabase'

interface Props {
  initialBookmarks: Bookmark[]
  userId: string
}

export default function BookmarkList({ initialBookmarks, userId }: Props) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const channel = supabase
      .channel('bookmarks-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookmarks',
          filter: `user_id=eq.${userId}`,
        },
        (payload: any) => {
          if (payload.eventType === 'INSERT') {
            setBookmarks((prev) => [payload.new as Bookmark, ...prev])
          }
          if (payload.eventType === 'DELETE') {
            setBookmarks((prev) =>
              prev.filter((b) => b.id !== (payload.old as Bookmark).id)
            )
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, userId])

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    await supabase.from('bookmarks').delete().eq('id', id)
    setDeletingId(null)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Your Bookmarks</h2>
        <span className="text-sm text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
          {bookmarks.length} saved
        </span>
      </div>

      {bookmarks.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <div className="text-5xl mb-3">🔖</div>
          <p className="text-sm">No bookmarks yet.</p>
          <p className="text-xs mt-1">Add your first one above!</p>
        </div>
      )}

      <ul className="space-y-3">
        {bookmarks.map((bookmark) => (
          <li
            key={bookmark.id}
            className="flex items-start justify-between gap-4 p-4 bg-gray-50 hover:bg-blue-50 rounded-xl border border-gray-100 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gray-800 hover:text-blue-600 transition-colors block truncate"
              >
                {bookmark.title}
              </a>
              <p className="text-xs text-gray-400 truncate mt-0.5">{bookmark.url}</p>
              <p className="text-xs text-gray-300 mt-1">
                {new Date(bookmark.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>

            <button
              onClick={() => handleDelete(bookmark.id)}
              disabled={deletingId === bookmark.id}
              className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0 p-1 rounded disabled:opacity-50"
              title="Delete bookmark"
            >
              {deletingId === bookmark.id ? (
                <span className="text-xs">…</span>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
