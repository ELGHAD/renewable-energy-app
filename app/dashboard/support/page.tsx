"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { SupportTicketCard } from "@/components/admin/support-ticket-card"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Search, Filter } from "lucide-react"

// Mock support tickets data
const mockTickets = [
  {
    id: "TICK-001",
    subject: "Problème de production solaire",
    category: "technical",
    priority: "high" as const,
    status: "open" as const,
    clientName: "Marie Dubois",
    createdAt: "2024-01-15",
    lastUpdate: "2024-01-16",
    description:
      "Les panneaux solaires ne produisent que 60% de leur capacité habituelle depuis hier. Pas de nuages, conditions météo normales.",
    messagesCount: 3,
  },
  {
    id: "TICK-002",
    subject: "Question sur facture",
    category: "billing",
    priority: "medium" as const,
    status: "in-progress" as const,
    clientName: "TechCorp SARL",
    createdAt: "2024-01-14",
    lastUpdate: "2024-01-15",
    description: "Demande d'explication sur les frais de maintenance facturés le mois dernier.",
    messagesCount: 5,
  },
  {
    id: "TICK-003",
    subject: "Planification maintenance",
    category: "maintenance",
    priority: "low" as const,
    status: "resolved" as const,
    clientName: "Syndic Les Pins",
    createdAt: "2024-01-10",
    lastUpdate: "2024-01-12",
    description: "Demande de planification de la maintenance annuelle des installations.",
    messagesCount: 2,
  },
]

export default function SupportPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [tickets, setTickets] = useState(mockTickets)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  if (!user || user.role !== "admin") {
    router.push("/dashboard")
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleViewTicket = (ticketId: string) => {
    toast({
      title: "Ouverture du ticket",
      description: `Redirection vers les détails du ticket ${ticketId}`,
    })
  }

  const handleRespondTicket = (ticketId: string) => {
    toast({
      title: "Réponse au ticket",
      description: `Interface de réponse pour le ticket ${ticketId}`,
    })
  }

  const handleCloseTicket = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((ticket) => (ticket.id === ticketId ? { ...ticket, status: "closed" as const } : ticket)),
    )
    toast({
      title: "Ticket fermé",
      description: `Le ticket ${ticketId} a été fermé.`,
    })
  }

  // Filter tickets
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || ticket.category === categoryFilter
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter

    return matchesSearch && matchesCategory && matchesPriority
  })

  const openTickets = filteredTickets.filter((t) => t.status === "open")
  const inProgressTickets = filteredTickets.filter((t) => t.status === "in-progress")
  const resolvedTickets = filteredTickets.filter((t) => t.status === "resolved" || t.status === "closed")

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />

      <div className="flex-1">
        {/* Header */}
        <header className="border-b border-border bg-background/95 backdrop-blur">
          <div className="px-6 h-16 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-foreground">Support client</h1>
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
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un ticket ou client..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-80"
                />
              </div>

              <div className="flex gap-2">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes catégories</SelectItem>
                    <SelectItem value="technical">Technique</SelectItem>
                    <SelectItem value="billing">Facturation</SelectItem>
                    <SelectItem value="project">Projet</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Priorité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes priorités</SelectItem>
                    <SelectItem value="urgent">Urgente</SelectItem>
                    <SelectItem value="high">Élevée</SelectItem>
                    <SelectItem value="medium">Normale</SelectItem>
                    <SelectItem value="low">Faible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Support Tickets Tabs */}
            <Tabs defaultValue="open" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="open">Nouveaux ({openTickets.length})</TabsTrigger>
                <TabsTrigger value="in-progress">En cours ({inProgressTickets.length})</TabsTrigger>
                <TabsTrigger value="resolved">Résolus ({resolvedTickets.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="open" className="space-y-4">
                {openTickets.length > 0 ? (
                  <div className="grid gap-4 lg:grid-cols-2">
                    {openTickets.map((ticket) => (
                      <SupportTicketCard
                        key={ticket.id}
                        ticket={ticket}
                        onView={handleViewTicket}
                        onRespond={handleRespondTicket}
                        onClose={handleCloseTicket}
                      />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex items-center justify-center py-8">
                      <p className="text-muted-foreground">Aucun nouveau ticket trouvé</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="in-progress" className="space-y-4">
                {inProgressTickets.length > 0 ? (
                  <div className="grid gap-4 lg:grid-cols-2">
                    {inProgressTickets.map((ticket) => (
                      <SupportTicketCard
                        key={ticket.id}
                        ticket={ticket}
                        onView={handleViewTicket}
                        onRespond={handleRespondTicket}
                        onClose={handleCloseTicket}
                      />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex items-center justify-center py-8">
                      <p className="text-muted-foreground">Aucun ticket en cours trouvé</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="resolved" className="space-y-4">
                {resolvedTickets.length > 0 ? (
                  <div className="grid gap-4 lg:grid-cols-2">
                    {resolvedTickets.map((ticket) => (
                      <SupportTicketCard
                        key={ticket.id}
                        ticket={ticket}
                        onView={handleViewTicket}
                        onRespond={handleRespondTicket}
                        onClose={handleCloseTicket}
                      />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex items-center justify-center py-8">
                      <p className="text-muted-foreground">Aucun ticket résolu trouvé</p>
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
