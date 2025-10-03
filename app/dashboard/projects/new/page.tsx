"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { ProjectForm } from "@/components/admin/project-form"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { saveProject } from "@/lib/projects-storage"

export default function NewProjectPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  if (!user || user.role !== "admin") {
    router.push("/dashboard")
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleSubmit = (projectData: any) => {
    try {
      const newProject = saveProject(projectData)
      console.log("Project created:", newProject)

      toast({
        title: "Projet créé",
        description: `Le projet "${newProject.name}" a été créé avec succès.`,
      })

      router.push("/dashboard/projects")
    } catch (error) {
      console.error("Error creating project:", error)
      toast({
        title: "Erreur",
        description: "Impossible de créer le projet. Veuillez réessayer.",
        variant: "destructive",
      })
    }
  }

  const handleCancel = () => {
    router.push("/dashboard/projects")
  }

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />

      <div className="flex-1">
        {/* Header */}
        <header className="border-b border-border bg-background/95 backdrop-blur">
          <div className="px-6 h-16 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-foreground">Nouveau projet</h1>
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
          <div className="max-w-4xl mx-auto">
            <ProjectForm onSubmit={handleSubmit} onCancel={handleCancel} />
          </div>
        </main>
      </div>
    </div>
  )
}
