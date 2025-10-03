"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TaskCard } from "@/components/technician/task-card"
import { ProgressDialog } from "@/components/technician/progress-dialog"
import { ProblemDialog } from "@/components/technician/problem-dialog"
import { StatsOverview } from "@/components/technician/stats-overview"
import { useToast } from "@/hooks/use-toast"

// Mock data for demonstration
const mockTasks = [
  {
    id: "TASK-001",
    title: "Installation panneaux solaires",
    client: "Marie Dubois",
    location: "15 rue des Lilas, Paris 15e",
    priority: "high" as const,
    status: "assigned" as const,
    progress: 0,
    dueDate: "2024-01-15",
    description:
      "Installation de 12 panneaux solaires sur toiture résidentielle. Vérifier l'état de la toiture avant installation.",
  },
  {
    id: "TASK-002",
    title: "Maintenance éolienne",
    client: "TechCorp SARL",
    location: "Zone industrielle, Meaux",
    priority: "medium" as const,
    status: "in-progress" as const,
    progress: 45,
    dueDate: "2024-01-20",
    description: "Maintenance préventive des éoliennes. Contrôle des pales et du système électrique.",
  },
  {
    id: "TASK-003",
    title: "Audit énergétique",
    client: "Syndic Les Pins",
    location: "Résidence Les Pins, Boulogne",
    priority: "low" as const,
    status: "completed" as const,
    progress: 100,
    dueDate: "2024-01-10",
    description: "Audit énergétique complet de la résidence. Rapport de recommandations à fournir.",
  },
]

export default function TechnicianDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [tasks, setTasks] = useState(mockTasks)
  const [progressDialog, setProgressDialog] = useState<{ isOpen: boolean; taskId: string; currentProgress: number }>({
    isOpen: false,
    taskId: "",
    currentProgress: 0,
  })
  const [problemDialog, setProblemDialog] = useState<{ isOpen: boolean; taskId: string }>({
    isOpen: false,
    taskId: "",
  })

  useEffect(() => {
    if (!user) {
      router.push("/login")
    } else if (user.role !== "technician") {
      router.push("/dashboard")
    }
  }, [user, router])

  if (!user || user.role !== "technician") {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleUpdateProgress = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId)
    if (task) {
      setProgressDialog({
        isOpen: true,
        taskId,
        currentProgress: task.progress,
      })
    }
  }

  const handleSaveProgress = (taskId: string, progress: number, notes: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              progress,
              status: progress === 100 ? ("completed" as const) : ("in-progress" as const),
            }
          : task,
      ),
    )

    toast({
      title: "Progression mise à jour",
      description: `La tâche a été mise à jour à ${progress}%`,
    })
  }

  const handleReportProblem = (taskId: string) => {
    setProblemDialog({
      isOpen: true,
      taskId,
    })
  }

  const handleSubmitProblem = (taskId: string, type: string, description: string) => {
    toast({
      title: "Problème signalé",
      description: "Votre signalement a été envoyé à l'équipe de supervision.",
    })
  }

  const stats = {
    tasksAssigned: tasks.length,
    tasksInProgress: tasks.filter((t) => t.status === "in-progress").length,
    tasksCompleted: tasks.filter((t) => t.status === "completed").length,
    problemsReported: 2, // Mock data
  }

  const activeTasks = tasks.filter((t) => t.status !== "completed")
  const completedTasks = tasks.filter((t) => t.status === "completed")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">E</span>
            </div>
            <span className="font-bold text-xl text-foreground">EcoEnergy</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Bonjour, {user.name}</span>
            <Button variant="outline" onClick={handleLogout}>
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Tableau de bord Technicien</h1>
            <p className="text-muted-foreground text-lg">Gérez vos tâches assignées et signalez les problèmes</p>
          </div>

          {/* Stats Overview */}
          <StatsOverview stats={stats} />

          {/* Tasks Section */}
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="active">Tâches actives ({activeTasks.length})</TabsTrigger>
              <TabsTrigger value="completed">Terminées ({completedTasks.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {activeTasks.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {activeTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onUpdateProgress={handleUpdateProgress}
                      onReportProblem={handleReportProblem}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex items-center justify-center py-8">
                    <p className="text-muted-foreground">Aucune tâche active pour le moment</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {completedTasks.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {completedTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onUpdateProgress={handleUpdateProgress}
                      onReportProblem={handleReportProblem}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex items-center justify-center py-8">
                    <p className="text-muted-foreground">Aucune tâche terminée</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Dialogs */}
      <ProgressDialog
        isOpen={progressDialog.isOpen}
        onClose={() => setProgressDialog({ isOpen: false, taskId: "", currentProgress: 0 })}
        taskId={progressDialog.taskId}
        currentProgress={progressDialog.currentProgress}
        onSave={handleSaveProgress}
      />

      <ProblemDialog
        isOpen={problemDialog.isOpen}
        onClose={() => setProblemDialog({ isOpen: false, taskId: "" })}
        taskId={problemDialog.taskId}
        onSubmit={handleSubmitProblem}
      />
    </div>
  )
}
