import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { User } from '@supabase/supabase-js'
import type { Bookmark } from '../lib/supabase'
import BookmarkList from './BookmarkList'
import AddBookmarkForm from './AddBookmarkForm'
import SignOutButton from './SignOutButton'

interface Props {
  user: User
}

export default async function BookmarkDashboard({ user }: Props) {
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )

  const { data: bookmarks } = await supabase
    .from('bookmarks')
    .select('*')
    .order('created_at', { ascending: false })

  const initialBookmarks: Bookmark[] = (bookmarks as Bookmark[]) || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔖</span>
            <h1 className="text-xl font-bold text-gray-800">Smart Bookmarks</h1>
          </div>
          <div className="flex items-center gap-3">
            {user.user_metadata?.avatar_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.user_metadata.avatar_url}
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-gray-200"
              />
            )}
            <span className="text-sm text-gray-600 hidden sm:block">
              {user.user_metadata?.full_name || user.email}
            </span>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <AddBookmarkForm />
        <BookmarkList initialBookmarks={initialBookmarks} userId={user.id} />
      </main>
    </div>
  )
}
