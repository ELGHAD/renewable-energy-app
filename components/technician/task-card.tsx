"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { MapPin, Clock, AlertTriangle } from "lucide-react"

interface TaskCardProps {
  task: {
    id: string
    title: string
    client: string
    location: string
    priority: "high" | "medium" | "low"
    status: "assigned" | "in-progress" | "completed"
    progress: number
    dueDate: string
    description: string
  }
  onUpdateProgress: (taskId: string) => void
  onReportProblem: (taskId: string) => void
}

export function TaskCard({ task, onUpdateProgress, onReportProblem }: TaskCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive text-destructive-foreground"
      case "medium":
        return "bg-chart-2 text-white"
      case "low":
        return "bg-chart-4 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "assigned":
        return "bg-muted text-muted-foreground"
      case "in-progress":
        return "bg-chart-2 text-white"
      case "completed":
        return "bg-chart-3 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{task.title}</CardTitle>
            <CardDescription className="mt-1">Client: {task.client}</CardDescription>
          </div>
          <div className="flex flex-col gap-2">
            <Badge className={getPriorityColor(task.priority)}>
              {task.priority === "high" ? "Urgent" : task.priority === "medium" ? "Normal" : "Faible"}
            </Badge>
            <Badge className={getStatusColor(task.status)}>
              {task.status === "assigned" ? "Assigné" : task.status === "in-progress" ? "En cours" : "Terminé"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            {task.location}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            Échéance: {task.dueDate}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Progression</span>
            <span>{task.progress}%</span>
          </div>
          <Progress value={task.progress} className="h-2" />
        </div>

        <p className="text-sm text-muted-foreground">{task.description}</p>

        <div className="flex gap-2 pt-2">
          <Button size="sm" onClick={() => onUpdateProgress(task.id)} disabled={task.status === "completed"}>
            Mettre à jour
          </Button>
          <Button size="sm" variant="outline" onClick={() => onReportProblem(task.id)}>
            <AlertTriangle className="h-4 w-4 mr-1" />
            Signaler
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
