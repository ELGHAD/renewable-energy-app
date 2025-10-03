import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, AlertTriangle, Calendar } from "lucide-react"

interface StatsOverviewProps {
  stats: {
    tasksAssigned: number
    tasksInProgress: number
    tasksCompleted: number
    problemsReported: number
  }
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  const statItems = [
    {
      title: "Tâches assignées",
      value: stats.tasksAssigned,
      icon: Calendar,
      color: "text-chart-1",
    },
    {
      title: "En cours",
      value: stats.tasksInProgress,
      icon: Clock,
      color: "text-chart-2",
    },
    {
      title: "Terminées",
      value: stats.tasksCompleted,
      icon: CheckCircle,
      color: "text-chart-3",
    },
    {
      title: "Problèmes signalés",
      value: stats.problemsReported,
      icon: AlertTriangle,
      color: "text-destructive",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statItems.map((item, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{item.title}</CardTitle>
            <item.icon className={`h-4 w-4 ${item.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
