'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100 px-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-2">Something went wrong!</h2>
        <p className="text-gray-700 mb-6">{error.message || 'An unexpected error occurred.'}</p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
