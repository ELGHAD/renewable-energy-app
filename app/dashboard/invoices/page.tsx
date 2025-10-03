"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminInvoiceCard } from "@/components/admin/admin-invoice-card"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Plus, Search, Filter } from "lucide-react"
import Link from "next/link"
import { loadInvoices, deleteInvoice, type Invoice } from "@/lib/invoices-storage"

export default function InvoicesPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    setInvoices(loadInvoices())
  }, [])

  if (!user || user.role !== "admin") {
    router.push("/dashboard")
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleEditInvoice = (invoiceId: string) => {
    router.push(`/dashboard/invoices/${invoiceId}/edit`)
  }

  const handleDeleteInvoice = (invoiceId: string) => {
    const numericId = Number.parseInt(invoiceId.replace(/\D/g, ""))
    deleteInvoice(numericId)
    setInvoices(loadInvoices())
    toast({
      title: "Facture supprimée",
      description: "La facture a été supprimée avec succès.",
    })
  }

  const handleSendInvoice = (invoiceId: string) => {
    toast({
      title: "Facture envoyée",
      description: `La facture ${invoiceId} a été envoyée au client par email.`,
    })
  }

  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Téléchargement en cours",
      description: `Le PDF de la facture ${invoiceId} va être téléchargé.`,
    })
  }

  // Filter invoices
  const filteredInvoices = invoices.filter((invoice) => {
    const invoiceId = `INV-${invoice.id.toString().padStart(3, "0")}`
    const matchesSearch =
      invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const pendingInvoices = filteredInvoices.filter((inv) => inv.status === "pending")
  const paidInvoices = filteredInvoices.filter((inv) => inv.status === "paid")
  const overdueInvoices = filteredInvoices.filter((inv) => inv.status === "overdue")

  const formatInvoiceForCard = (invoice: Invoice) => ({
    id: `INV-${invoice.id.toString().padStart(3, "0")}`,
    projectName: invoice.projectName,
    clientName: invoice.clientName,
    amount: invoice.amount,
    status: invoice.status,
    dueDate: invoice.dueDate,
    issueDate: invoice.createdDate,
    description: invoice.description,
  })

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />

      <div className="flex-1">
        {/* Header */}
        <header className="border-b border-border bg-background/95 backdrop-blur">
          <div className="px-6 h-16 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-foreground">Gestion des factures</h1>
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
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher une facture ou client..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-80"
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="paid">Payées</SelectItem>
                    <SelectItem value="overdue">En retard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button asChild>
                <Link href="/dashboard/invoices/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvelle facture
                </Link>
              </Button>
            </div>

            {/* Invoices Tabs */}
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pending">En attente ({pendingInvoices.length})</TabsTrigger>
                <TabsTrigger value="paid">Payées ({paidInvoices.length})</TabsTrigger>
                <TabsTrigger value="overdue">En retard ({overdueInvoices.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="space-y-4">
                {pendingInvoices.length > 0 ? (
                  <div className="grid gap-4 lg:grid-cols-2">
                    {pendingInvoices.map((invoice) => (
                      <AdminInvoiceCard
                        key={invoice.id}
                        invoice={formatInvoiceForCard(invoice)}
                        onEdit={handleEditInvoice}
                        onDelete={handleDeleteInvoice}
                        onSend={handleSendInvoice}
                        onDownload={handleDownloadInvoice}
                      />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex items-center justify-center py-8">
                      <p className="text-muted-foreground">Aucune facture en attente trouvée</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="paid" className="space-y-4">
                {paidInvoices.length > 0 ? (
                  <div className="grid gap-4 lg:grid-cols-2">
                    {paidInvoices.map((invoice) => (
                      <AdminInvoiceCard
                        key={invoice.id}
                        invoice={formatInvoiceForCard(invoice)}
                        onEdit={handleEditInvoice}
                        onDelete={handleDeleteInvoice}
                        onSend={handleSendInvoice}
                        onDownload={handleDownloadInvoice}
                      />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex items-center justify-center py-8">
                      <p className="text-muted-foreground">Aucune facture payée trouvée</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="overdue" className="space-y-4">
                {overdueInvoices.length > 0 ? (
                  <div className="grid gap-4 lg:grid-cols-2">
                    {overdueInvoices.map((invoice) => (
                      <AdminInvoiceCard
                        key={invoice.id}
                        invoice={formatInvoiceForCard(invoice)}
                        onEdit={handleEditInvoice}
                        onDelete={handleDeleteInvoice}
                        onSend={handleSendInvoice}
                        onDownload={handleDownloadInvoice}
                      />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex items-center justify-center py-8">
                      <p className="text-muted-foreground">Aucune facture en retard trouvée</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
