"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectProgressCard } from "@/components/client/project-progress-card"
import { InvoiceCard } from "@/components/client/invoice-card"
import { SupportTicketDialog } from "@/components/client/support-ticket-dialog"
import { PaymentDialog } from "@/components/client/payment-dialog"
import { useToast } from "@/hooks/use-toast"
import { HelpCircle } from "lucide-react"

// Mock data for demonstration
const mockProjects = [
  {
    id: "PRJ-001",
    name: "Installation solaire résidentielle",
    type: "Panneaux solaires",
    status: "in-progress" as const,
    progress: 65,
    startDate: "2024-01-05",
    estimatedCompletion: "2024-01-25",
    technician: "Jean Martin",
    location: "15 rue des Lilas, Paris 15e",
    description:
      "Installation de 12 panneaux solaires photovoltaïques sur toiture avec onduleur et système de monitoring.",
  },
  {
    id: "PRJ-002",
    name: "Audit énergétique",
    type: "Audit",
    status: "completed" as const,
    progress: 100,
    startDate: "2023-12-10",
    estimatedCompletion: "2023-12-20",
    technician: "Sophie Laurent",
    location: "15 rue des Lilas, Paris 15e",
    description: "Audit énergétique complet avec recommandations d'amélioration et rapport détaillé.",
  },
]

const mockInvoices = [
  {
    id: "INV-2024-001",
    projectName: "Installation solaire résidentielle",
    amount: 8500.0,
    status: "pending" as const,
    dueDate: "2024-02-15",
    issueDate: "2024-01-15",
    description: "Acompte installation panneaux solaires - 50% du montant total",
  },
  {
    id: "INV-2023-045",
    projectName: "Audit énergétique",
    amount: 450.0,
    status: "paid" as const,
    dueDate: "2023-12-30",
    issueDate: "2023-12-20",
    description: "Audit énergétique complet avec rapport de recommandations",
  },
]

export default function ClientDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [supportDialog, setSupportDialog] = useState(false)
  const [paymentDialog, setPaymentDialog] = useState<{
    isOpen: boolean
    invoice: { id: string; amount: number; projectName: string } | null
  }>({
    isOpen: false,
    invoice: null,
  })

  useEffect(() => {
    if (!user) {
      router.push("/login")
    } else if (user.role !== "client") {
      router.push("/dashboard")
    }
  }, [user, router])

  if (!user || user.role !== "client") {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handlePayInvoice = (invoiceId: string) => {
    const invoice = mockInvoices.find((inv) => inv.id === invoiceId)
    if (invoice) {
      setPaymentDialog({
        isOpen: true,
        invoice: {
          id: invoice.id,
          amount: invoice.amount,
          projectName: invoice.projectName,
        },
      })
    }
  }

  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Téléchargement en cours",
      description: `La facture ${invoiceId} va être téléchargée.`,
    })
  }

  const handleSubmitSupportTicket = (ticket: {
    subject: string
    category: string
    priority: string
    description: string
  }) => {
    toast({
      title: "Ticket créé",
      description: "Votre demande de support a été envoyée. Nous vous répondrons sous 24h.",
    })
  }

  const handlePayment = (invoiceId: string, paymentMethod: string) => {
    toast({
      title: "Paiement effectué",
      description: `Le paiement de la facture ${invoiceId} a été traité avec succès.`,
    })
  }

  const activeProjects = mockProjects.filter((p) => p.status !== "completed")
  const completedProjects = mockProjects.filter((p) => p.status === "completed")
  const pendingInvoices = mockInvoices.filter((inv) => inv.status === "pending")
  const paidInvoices = mockInvoices.filter((inv) => inv.status === "paid")

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
            <Button variant="outline" size="sm" onClick={() => setSupportDialog(true)}>
              <HelpCircle className="h-4 w-4 mr-1" />
              Support
            </Button>
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Espace Client</h1>
            <p className="text-muted-foreground text-lg">Suivez vos projets et gérez vos factures</p>
          </div>

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Projets actifs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeProjects.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Factures en attente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingInvoices.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Projets terminés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedProjects.length}</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="projects">Mes Projets</TabsTrigger>
              <TabsTrigger value="invoices">Mes Factures</TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="space-y-6">
              {/* Active Projects */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Projets en cours ({activeProjects.length})</h3>
                {activeProjects.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    {activeProjects.map((project) => (
                      <ProjectProgressCard key={project.id} project={project} />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex items-center justify-center py-8">
                      <p className="text-muted-foreground">Aucun projet en cours</p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Completed Projects */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Projets terminés ({completedProjects.length})</h3>
                {completedProjects.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    {completedProjects.map((project) => (
                      <ProjectProgressCard key={project.id} project={project} />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex items-center justify-center py-8">
                      <p className="text-muted-foreground">Aucun projet terminé</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="invoices" className="space-y-6">
              {/* Pending Invoices */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Factures à payer ({pendingInvoices.length})</h3>
                {pendingInvoices.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    {pendingInvoices.map((invoice) => (
                      <InvoiceCard
                        key={invoice.id}
                        invoice={invoice}
                        onPay={handlePayInvoice}
                        onDownload={handleDownloadInvoice}
                      />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex items-center justify-center py-8">
                      <p className="text-muted-foreground">Aucune facture en attente</p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Paid Invoices */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Factures payées ({paidInvoices.length})</h3>
                {paidInvoices.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    {paidInvoices.map((invoice) => (
                      <InvoiceCard
                        key={invoice.id}
                        invoice={invoice}
                        onPay={handlePayInvoice}
                        onDownload={handleDownloadInvoice}
                      />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex items-center justify-center py-8">
                      <p className="text-muted-foreground">Aucune facture payée</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Dialogs */}
      <SupportTicketDialog
        isOpen={supportDialog}
        onClose={() => setSupportDialog(false)}
        onSubmit={handleSubmitSupportTicket}
      />

      <PaymentDialog
        isOpen={paymentDialog.isOpen}
        onClose={() => setPaymentDialog({ isOpen: false, invoice: null })}
        invoice={paymentDialog.invoice}
        onPayment={handlePayment}
      />
    </div>
  )
}
