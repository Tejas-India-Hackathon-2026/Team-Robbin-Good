import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/api'
import { ROLES } from '../utils/constants'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const normalizeUser = (body) => {
    const { token: _, ...rest } = body
    return { ...rest, id: rest.userId || rest.id }
  }

  const login = async (email, password) => {
    const res = await authService.login(email, password)
    const body = res.data.data || res.data
    const newToken = body.token
    const newUser = normalizeUser(body)
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(newUser))
    setToken(newToken)
    setUser(newUser)
    return newUser
  }

  const register = async (data) => {
    const res = await authService.register(data)
    const body = res.data.data || res.data
    const newToken = body.token
    const newUser = normalizeUser(body)
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(newUser))
    setToken(newToken)
    setUser(newUser)
    return newUser
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  const getDashboardPath = (role) => {
    switch (role) {
      case ROLES.BUSINESS_SELLER:
      case ROLES.BUSINESS_BUYER:
        return '/dashboard/business'
      case ROLES.HOUSEHOLD_USER:
        return '/dashboard/household'
      case ROLES.COLLECTION_AGENT:
        return '/dashboard/agent'
      case ROLES.ADMIN:
        return '/dashboard/admin'
      default:
        return '/dashboard'
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout, getDashboardPath }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
