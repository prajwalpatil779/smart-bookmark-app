import LoginButton from './LoginButton'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full mx-4 text-center">
        <div className="text-6xl mb-4">🔖</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Smart Bookmarks</h1>
        <p className="text-gray-500 mb-8">
          Save, organise, and access your favourite links — anywhere, any time.
        </p>
        <ul className="text-left space-y-2 mb-8 text-sm text-gray-600">
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span> Private bookmarks — only you can see yours
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span> Real-time sync across all your tabs
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span> One-click Google sign-in
          </li>
        </ul>
        <LoginButton />
        <p className="text-xs text-gray-400 mt-4">
          By signing in you agree to our terms. We never share your data.
        </p>
      </div>
    </div>
  )
}