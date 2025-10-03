import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, UserPlus, FileText, Settings } from "lucide-react"
import Link from "next/link"

const actions = [
  {
    title: "Nouveau projet",
    description: "Créer un nouveau projet client",
    icon: Plus,
    href: "/dashboard/projects/new",
    variant: "default" as const,
  },
  {
    title: "Ajouter technicien",
    description: "Enregistrer un nouveau technicien",
    icon: UserPlus,
    href: "/dashboard/technicians/new",
    variant: "outline" as const,
  },
  {
    title: "Générer facture",
    description: "Créer une nouvelle facture",
    icon: FileText,
    href: "/dashboard/invoices/new",
    variant: "outline" as const,
  },
  {
    title: "Paramètres",
    description: "Configurer l'application",
    icon: Settings,
    href: "/dashboard/settings",
    variant: "outline" as const,
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions rapides</CardTitle>
        <CardDescription>Accès direct aux fonctionnalités principales</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-2">
          {actions.map((action, index) => (
            <Button key={index} variant={action.variant} className="h-auto p-4 justify-start" asChild>
              <Link href={action.href}>
                <div className="flex items-center space-x-3">
                  <action.icon className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-xs text-muted-foreground">{action.description}</div>
                  </div>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
