"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, Phone, Mail, MapPin, Calendar, Star } from "lucide-react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { loadTechnicians, type Technician } from "@/lib/technicians-storage"

export default function TechniciansPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [technicians, setTechnicians] = useState<Technician[]>([])

  useEffect(() => {
    if (!user) {
      router.push("/login")
    } else if (user.role !== "admin") {
      router.push(`/dashboard/${user.role}`)
    }
  }, [user, router])

  useEffect(() => {
    setTechnicians(loadTechnicians())
  }, [])

  if (!user || user.role !== "admin") {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const filteredTechnicians = technicians.filter((tech) => {
    const matchesSearch =
      tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.speciality.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || tech.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Disponible
          </Badge>
        )
      case "busy":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            Occupé
          </Badge>
        )
      default:
        return <Badge variant="outline">Inconnu</Badge>
    }
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
              <h1 className="text-xl font-semibold text-foreground">Gestion des Techniciens</h1>
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
                <h2 className="text-3xl font-bold text-foreground">Techniciens</h2>
                <p className="text-muted-foreground">Gérez votre équipe de techniciens</p>
              </div>
              <Button asChild>
                <Link href="/dashboard/technicians/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau technicien
                </Link>
              </Button>
            </div>

            <div className="flex gap-4 items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Rechercher un technicien..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedStatus === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStatus("all")}
                >
                  Tous
                </Button>
                <Button
                  variant={selectedStatus === "available" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStatus("available")}
                >
                  Disponibles
                </Button>
                <Button
                  variant={selectedStatus === "busy" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStatus("busy")}
                >
                  Occupés
                </Button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTechnicians.map((technician) => (
                <Card key={technician.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={technician.avatar || "/placeholder.svg"} alt={technician.name} />
                          <AvatarFallback>
                            {technician.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{technician.name}</CardTitle>
                          <CardDescription>{technician.speciality}</CardDescription>
                        </div>
                      </div>
                      {getStatusBadge(technician.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{technician.rating}</span>
                      </div>
                      <div className="text-muted-foreground">{technician.completedProjects} projets terminés</div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>{technician.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{technician.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{technician.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Depuis {new Date(technician.joinDate).toLocaleDateString("fr-FR")}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t">
                      <div className="text-sm">
                        <span className="font-medium text-primary">{technician.activeProjects}</span>
                        <span className="text-muted-foreground"> projets actifs</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Voir détails
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTechnicians.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">Aucun technicien trouvé avec ces critères.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
