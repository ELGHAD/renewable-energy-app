"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, TrendingDown, Download, Calendar, DollarSign, Users, FolderKanban } from "lucide-react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

// Mock data for reports
const mockReports = {
  overview: {
    totalRevenue: 245000,
    revenueGrowth: 12.5,
    activeProjects: 18,
    projectsGrowth: -2.1,
    totalTechnicians: 12,
    techniciansGrowth: 8.3,
    completedProjects: 156,
    completedGrowth: 15.2,
  },
  monthlyData: [
    { month: "Jan", revenue: 18000, projects: 12, completion: 85 },
    { month: "Fév", revenue: 22000, projects: 15, completion: 92 },
    { month: "Mar", revenue: 25000, projects: 18, completion: 88 },
    { month: "Avr", revenue: 21000, projects: 14, completion: 90 },
    { month: "Mai", revenue: 28000, projects: 20, completion: 94 },
    { month: "Jun", revenue: 31000, projects: 22, completion: 89 },
  ],
  topTechnicians: [
    { name: "Marie Martin", projects: 8, rating: 4.9, revenue: 45000 },
    { name: "Jean Dupont", projects: 6, rating: 4.8, revenue: 38000 },
    { name: "Pierre Leroy", projects: 5, rating: 4.7, revenue: 32000 },
  ],
}

export default function ReportsPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [selectedPeriod, setSelectedPeriod] = useState("6months")
  const [selectedReport, setSelectedReport] = useState("overview")

  useEffect(() => {
    if (!user) {
      router.push("/login")
    } else if (user.role !== "admin") {
      router.push(`/dashboard/${user.role}`)
    }
  }, [user, router])

  if (!user || user.role !== "admin") {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(amount)
  }

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    )
  }

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? "text-green-600" : "text-red-600"
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
              <h1 className="text-xl font-semibold text-foreground">Rapports et Analyses</h1>
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
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Rapports</h2>
                <p className="text-muted-foreground">Analyse des performances et statistiques</p>
              </div>
              <div className="flex gap-2">
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">1 mois</SelectItem>
                    <SelectItem value="3months">3 mois</SelectItem>
                    <SelectItem value="6months">6 mois</SelectItem>
                    <SelectItem value="1year">1 an</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Exporter
                </Button>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Chiffre d'affaires</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(mockReports.overview.totalRevenue)}</div>
                  <div className="flex items-center space-x-1 text-xs">
                    {getGrowthIcon(mockReports.overview.revenueGrowth)}
                    <span className={getGrowthColor(mockReports.overview.revenueGrowth)}>
                      {Math.abs(mockReports.overview.revenueGrowth)}% vs mois dernier
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Projets actifs</CardTitle>
                  <FolderKanban className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockReports.overview.activeProjects}</div>
                  <div className="flex items-center space-x-1 text-xs">
                    {getGrowthIcon(mockReports.overview.projectsGrowth)}
                    <span className={getGrowthColor(mockReports.overview.projectsGrowth)}>
                      {Math.abs(mockReports.overview.projectsGrowth)}% vs mois dernier
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Techniciens</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockReports.overview.totalTechnicians}</div>
                  <div className="flex items-center space-x-1 text-xs">
                    {getGrowthIcon(mockReports.overview.techniciansGrowth)}
                    <span className={getGrowthColor(mockReports.overview.techniciansGrowth)}>
                      {Math.abs(mockReports.overview.techniciansGrowth)}% vs mois dernier
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Projets terminés</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockReports.overview.completedProjects}</div>
                  <div className="flex items-center space-x-1 text-xs">
                    {getGrowthIcon(mockReports.overview.completedGrowth)}
                    <span className={getGrowthColor(mockReports.overview.completedGrowth)}>
                      {Math.abs(mockReports.overview.completedGrowth)}% vs mois dernier
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Monthly Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance mensuelle</CardTitle>
                  <CardDescription>Évolution du chiffre d'affaires et des projets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockReports.monthlyData.map((data, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{data.month}</div>
                            <div className="text-sm text-muted-foreground">{data.projects} projets</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{formatCurrency(data.revenue)}</div>
                          <div className="text-sm text-muted-foreground">{data.completion}% terminés</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Technicians */}
              <Card>
                <CardHeader>
                  <CardTitle>Top techniciens</CardTitle>
                  <CardDescription>Performances des meilleurs techniciens</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockReports.topTechnicians.map((tech, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{tech.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {tech.projects} projets • ⭐ {tech.rating}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{formatCurrency(tech.revenue)}</div>
                          <Badge variant="secondary" className="text-xs">
                            Top performer
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
