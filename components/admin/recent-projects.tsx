import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const recentProjects = [
  {
    id: "PRJ-001",
    name: "Installation solaire - Maison Dubois",
    client: "Marie Dubois",
    technician: "Jean Martin",
    status: "En cours",
    progress: 65,
    statusColor: "bg-chart-2",
  },
  {
    id: "PRJ-002",
    name: "Maintenance éolienne - Entreprise Tech",
    client: "TechCorp SARL",
    technician: "Sophie Laurent",
    status: "Planifié",
    progress: 0,
    statusColor: "bg-muted",
  },
  {
    id: "PRJ-003",
    name: "Audit énergétique - Résidence Les Pins",
    client: "Syndic Les Pins",
    technician: "Pierre Durand",
    status: "Terminé",
    progress: 100,
    statusColor: "bg-chart-3",
  },
]

export function RecentProjects() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Projets récents</CardTitle>
            <CardDescription>Aperçu des derniers projets en cours</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/projects">Voir tout</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentProjects.map((project) => (
            <div key={project.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-sm">{project.name}</h4>
                  <Badge variant="secondary" className="text-xs">
                    {project.id}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Client: {project.client}</p>
                  <p>Technicien: {project.technician}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-medium">{project.progress}%</div>
                  <div className="w-16 h-2 bg-muted rounded-full mt-1">
                    <div
                      className={`h-full rounded-full ${project.statusColor}`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                <Badge variant={project.status === "Terminé" ? "default" : "secondary"}>{project.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
