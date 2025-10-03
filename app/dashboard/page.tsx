"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { StatsCards } from "@/components/admin/stats-cards"
import { RecentProjects } from "@/components/admin/recent-projects"
import { QuickActions } from "@/components/admin/quick-actions"

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (user.role !== "admin") {
    router.push(`/dashboard/${user.role}`)
    return null
  }

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="border-b border-border bg-background/95 backdrop-blur">
          <div className="px-6 h-16 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-foreground">Tableau de bord Administrateur</h1>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Bonjour, {user.name}</span>
              <Button variant="outline" onClick={handleLogout}>
                Déconnexion
              </Button>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats Overview */}
            <StatsCards />

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Recent Projects - Takes 2 columns */}
              <div className="lg:col-span-2">
                <RecentProjects />
              </div>

              {/* Quick Actions - Takes 1 column */}
              <div>
                <QuickActions />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
