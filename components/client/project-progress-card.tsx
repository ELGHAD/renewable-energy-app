import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, MapPin, User } from "lucide-react"

interface ProjectProgressCardProps {
  project: {
    id: string
    name: string
    type: string
    status: "planning" | "in-progress" | "completed" | "on-hold"
    progress: number
    startDate: string
    estimatedCompletion: string
    technician: string
    location: string
    description: string
  }
}

export function ProjectProgressCard({ project }: ProjectProgressCardProps) {
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

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{project.name}</CardTitle>
            <CardDescription className="mt-1">{project.type}</CardDescription>
          </div>
          <Badge className={getStatusColor(project.status)}>{getStatusText(project.status)}</Badge>
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

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Début: {project.startDate}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Fin prévue: {project.estimatedCompletion}</span>
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            <span>Technicien: {project.technician}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{project.location}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">{project.description}</p>
      </CardContent>
    </Card>
  )
}
