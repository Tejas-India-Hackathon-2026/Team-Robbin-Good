import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import BusinessDashboard from './pages/BusinessDashboard'
import HouseholdDashboard from './pages/HouseholdDashboard'
import AgentDashboard from './pages/AgentDashboard'
import AdminDashboard from './pages/AdminDashboard'

function DashboardRouter() {
  const { user } = useAuth()
  const role = user?.role

  if (role === 'BUSINESS_SELLER' || role === 'BUSINESS_BUYER') {
    return <BusinessDashboard />
  }
  if (role === 'HOUSEHOLD_USER') return <HouseholdDashboard />
  if (role === 'COLLECTION_AGENT') return <AgentDashboard />
  if (role === 'ADMIN') return <AdminDashboard />
  return <Navigate to="/login" replace />
}

function Navbar() {
  const { user, logout } = useAuth()
  if (!user) return null

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <a
          href="/"
          className="text-xl font-bold text-green-700 no-underline"
        >
          ResourceLoop
        </a>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {user.name || user.email}
          </span>
          <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-full font-medium">
            {user.role?.replace(/_/g, ' ')}
          </span>
          <button
            onClick={logout}
            className="text-sm text-red-600 hover:text-red-800 font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardRouter />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
