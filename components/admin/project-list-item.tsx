"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, MapPin, User, Edit, Trash2 } from "lucide-react"

interface ProjectListItemProps {
  project: {
    id: string
    name: string
    client: string
    type: string
    status: string
    priority: string
    progress: number
    startDate: string
    estimatedCompletion: string
    technician: string
    location: string
    description: string
  }
  onEdit: (projectId: string) => void
  onDelete: (projectId: string) => void
}

export function ProjectListItem({ project, onEdit, onDelete }: ProjectListItemProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning":
        return "bg-muted text-muted-foreground"
      case "in-progress":
        return "bg-chart-2 text-white"
      case "completed":
        return "bg-chart-3 text-white"
      case "on-hold":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-destructive text-destructive-foreground"
      case "high":
        return "bg-chart-1 text-white"
      case "medium":
        return "bg-chart-2 text-white"
      case "low":
        return "bg-chart-4 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "planning":
        return "Planification"
      case "in-progress":
        return "En cours"
      case "completed":
        return "Terminé"
      case "on-hold":
        return "En attente"
      default:
        return status
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "Urgente"
      case "high":
        return "Élevée"
      case "medium":
        return "Normale"
      case "low":
        return "Faible"
      default:
        return priority
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{project.name}</CardTitle>
            <CardDescription className="mt-1">
              Client: {project.client} • {project.type}
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2">
            <Badge className={getStatusColor(project.status)}>{getStatusText(project.status)}</Badge>
            {project.priority && (
              <Badge className={getPriorityColor(project.priority)}>{getPriorityText(project.priority)}</Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Progression</span>
            <span className="font-medium">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Début: {project.startDate}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Fin: {project.estimatedCompletion}</span>
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            <span>{project.technician || "Non assigné"}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{project.location}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>

        <div className="flex gap-2 pt-2">
          <Button size="sm" variant="outline" onClick={() => onEdit(project.id)}>
            <Edit className="h-4 w-4 mr-1" />
            Modifier
          </Button>
          <Button size="sm" variant="outline" onClick={() => onDelete(project.id)}>
            <Trash2 className="h-4 w-4 mr-1" />
            Supprimer
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
