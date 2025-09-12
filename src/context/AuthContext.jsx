import React, { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/mockAuthService'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        try {
          const userData = await authService.getProfile()
          setUser(userData)
        } catch (error) {
          console.error('Failed to load user profile:', error)
          localStorage.removeItem('token')
          setToken(null)
        }
      }
      setLoading(false)
    }

    initializeAuth()
  }, [token])

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials)
      const { token: newToken, user: userData } = response
      
      localStorage.setItem('token', newToken)
      setToken(newToken)
      setUser(userData)
      
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const register = async (userData) => {
    try {
      const response = await authService.register(userData)
      return { success: true, data: response }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  const hasRole = (requiredRole) => {
    if (!user) return false
    if (user.role === 'admin') return true
    return user.role === requiredRole
  }

  const hasAnyRole = (roles) => {
    if (!user) return false
    if (user.role === 'admin') return true
    return roles.includes(user.role)
  }

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    hasRole,
    hasAnyRole,
    isAuthenticated: !!token
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
