"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { ProjectListItem } from "@/components/admin/project-list-item"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Plus, Search, Filter } from "lucide-react"
import Link from "next/link"
import { getProjects, deleteProject, type Project } from "@/lib/projects-storage"

export default function ProjectsPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [projects, setProjects] = useState<Project[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  useEffect(() => {
    setProjects(getProjects())
  }, [])

  if (!user || user.role !== "admin") {
    router.push("/dashboard")
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleEditProject = (projectId: string) => {
    router.push(`/dashboard/projects/${projectId}/edit`)
  }

  const handleDeleteProject = (projectId: string) => {
    try {
      const success = deleteProject(projectId)
      if (success) {
        setProjects(getProjects()) // Refresh projects from storage
        toast({
          title: "Projet supprimé",
          description: "Le projet a été supprimé avec succès.",
        })
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le projet.",
        variant: "destructive",
      })
    }
  }

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    const matchesPriority = priorityFilter === "all" || project.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const activeProjects = filteredProjects.filter((p) => p.status === "in-progress" || p.status === "planning")
  const completedProjects = filteredProjects.filter((p) => p.status === "completed")
  const onHoldProjects = filteredProjects.filter((p) => p.status === "on-hold")

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />

      <div className="flex-1">
        {/* Header */}
        <header className="border-b border-border bg-background/95 backdrop-blur">
          <div className="px-6 h-16 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-foreground">Gestion des projets</h1>
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
            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un projet ou client..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-80"
                  />
                </div>

                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="planning">Planification</SelectItem>
                      <SelectItem value="in-progress">En cours</SelectItem>
                      <SelectItem value="completed">Terminé</SelectItem>
                      <SelectItem value="on-hold">En attente</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Priorité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes priorités</SelectItem>
                      <SelectItem value="urgent">Urgente</SelectItem>
                      <SelectItem value="high">Élevée</SelectItem>
                      <SelectItem value="medium">Normale</SelectItem>
                      <SelectItem value="low">Faible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button asChild>
                <Link href="/dashboard/projects/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau projet
                </Link>
              </Button>
            </div>

            {/* Projects Tabs */}
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="active">Actifs ({activeProjects.length})</TabsTrigger>
                <TabsTrigger value="completed">Terminés ({completedProjects.length})</TabsTrigger>
                <TabsTrigger value="on-hold">En attente ({onHoldProjects.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-4">
                {activeProjects.length > 0 ? (
                  <div className="grid gap-4 lg:grid-cols-2">
                    {activeProjects.map((project) => (
                      <ProjectListItem
                        key={project.id}
                        project={project}
                        onEdit={handleEditProject}
                        onDelete={handleDeleteProject}
                      />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex items-center justify-center py-8">
                      <p className="text-muted-foreground">Aucun projet actif trouvé</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                {completedProjects.length > 0 ? (
                  <div className="grid gap-4 lg:grid-cols-2">
                    {completedProjects.map((project) => (
                      <ProjectListItem
                        key={project.id}
                        project={project}
                        onEdit={handleEditProject}
                        onDelete={handleDeleteProject}
                      />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex items-center justify-center py-8">
                      <p className="text-muted-foreground">Aucun projet terminé trouvé</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="on-hold" className="space-y-4">
                {onHoldProjects.length > 0 ? (
                  <div className="grid gap-4 lg:grid-cols-2">
                    {onHoldProjects.map((project) => (
                      <ProjectListItem
                        key={project.id}
                        project={project}
                        onEdit={handleEditProject}
                        onDelete={handleDeleteProject}
                      />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex items-center justify-center py-8">
                      <p className="text-muted-foreground">Aucun projet en attente trouvé</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
