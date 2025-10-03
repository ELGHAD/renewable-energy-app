import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderKanban, Users, CheckCircle, AlertTriangle } from "lucide-react"

const stats = [
  {
    title: "Projets actifs",
    value: "12",
    change: "+2 ce mois",
    icon: FolderKanban,
    color: "text-chart-1",
  },
  {
    title: "Techniciens disponibles",
    value: "8",
    change: "3 en mission",
    icon: Users,
    color: "text-chart-2",
  },
  {
    title: "Projets terminés",
    value: "45",
    change: "+5 ce mois",
    icon: CheckCircle,
    color: "text-chart-3",
  },
  {
    title: "Alertes",
    value: "3",
    change: "Nécessitent attention",
    icon: AlertTriangle,
    color: "text-destructive",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
