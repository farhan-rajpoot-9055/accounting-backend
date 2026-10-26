import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import api from '@/lib/axios'

interface User {
  id: number
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, password_confirmation: string) => Promise<void>
  logout: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/user').then(res => {
      setUser(res.data)
    }).catch(() => {
      setUser(null)
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  const login = async (email: string, password: string) => {
    await api.get('/sanctum/csrf-cookie')
    await api.post('/login', { email, password })
    const res = await api.get('/user')
    setUser(res.data)
  }

  const register = async (name: string, email: string, password: string, password_confirmation: string) => {
    await api.get('/sanctum/csrf-cookie')
    await api.post('/register', { name, email, password, password_confirmation })
    const res = await api.get('/user')
    setUser(res.data)
  }

  const logout = async () => {
    await api.post('/logout')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
