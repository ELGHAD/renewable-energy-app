"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type UserRole = "admin" | "technician" | "client"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role?: UserRole) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demo purposes
const mockUsers = {
  admin: { id: "1", email: "admin@ecoenergy.fr", name: "Admin EcoEnergy", role: "admin" as UserRole },
  technician: { id: "2", email: "tech@ecoenergy.fr", name: "Jean Technicien", role: "technician" as UserRole },
  client: { id: "3", email: "client@ecoenergy.fr", name: "Marie Client", role: "client" as UserRole },
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("ecoenergy_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role?: UserRole): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Demo login logic
    if (role) {
      // Demo button login
      const demoUser = mockUsers[role]
      setUser(demoUser)
      localStorage.setItem("ecoenergy_user", JSON.stringify(demoUser))
      setIsLoading(false)
      return true
    }

    // Regular form login - simple validation for demo
    if (email && password.length >= 6) {
      // Default to admin for demo
      const defaultUser = mockUsers.admin
      setUser(defaultUser)
      localStorage.setItem("ecoenergy_user", JSON.stringify(defaultUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("ecoenergy_user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
