import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import WasteBackground from '../components/WasteBackground'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, getDashboardPath } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const user = await login(email, password)
      navigate(getDashboardPath(user.role))
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <WasteBackground>
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L14 8H10L12 2Z" />
              <path d="M12 22L10 16H14L12 22Z" />
              <path d="M2 12L8 10V14L2 12Z" />
              <path d="M22 12L16 14V10L22 12Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-green-700">ResourceLoop</h1>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-green-600 hover:underline font-medium">
            Register
          </Link>
        </p>
      </div>
    </WasteBackground>
  )
}
