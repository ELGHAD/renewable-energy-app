"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { HelpCircle, MessageSquare, Clock, User } from "lucide-react"

interface SupportTicketCardProps {
  ticket: {
    id: string
    subject: string
    category: string
    priority: "low" | "medium" | "high" | "urgent"
    status: "open" | "in-progress" | "resolved" | "closed"
    clientName: string
    createdAt: string
    lastUpdate: string
    description: string
    messagesCount: number
  }
  onView: (ticketId: string) => void
  onRespond: (ticketId: string) => void
  onClose: (ticketId: string) => void
}

export function SupportTicketCard({ ticket, onView, onRespond, onClose }: SupportTicketCardProps) {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-chart-2 text-white"
      case "in-progress":
        return "bg-chart-1 text-white"
      case "resolved":
        return "bg-chart-3 text-white"
      case "closed":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
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

  const getStatusText = (status: string) => {
    switch (status) {
      case "open":
        return "Ouvert"
      case "in-progress":
        return "En cours"
      case "resolved":
        return "Résolu"
      case "closed":
        return "Fermé"
      default:
        return status
    }
  }

  const getCategoryText = (category: string) => {
    switch (category) {
      case "technical":
        return "Technique"
      case "billing":
        return "Facturation"
      case "project":
        return "Projet"
      case "maintenance":
        return "Maintenance"
      case "other":
        return "Autre"
      default:
        return category
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center">
              <HelpCircle className="h-5 w-5 mr-2" />
              {ticket.subject}
            </CardTitle>
            <CardDescription className="mt-1">
              Ticket #{ticket.id} • {getCategoryText(ticket.category)} • {ticket.clientName}
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2">
            <Badge className={getStatusColor(ticket.status)}>{getStatusText(ticket.status)}</Badge>
            <Badge className={getPriorityColor(ticket.priority)}>{getPriorityText(ticket.priority)}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            <span>Créé le: {ticket.createdAt}</span>
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            <span>Dernière mise à jour: {ticket.lastUpdate}</span>
          </div>
          <div className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            <span>{ticket.messagesCount} message(s)</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3">{ticket.description}</p>

        <div className="flex gap-2 pt-2">
          <Button size="sm" onClick={() => onView(ticket.id)}>
            Voir détails
          </Button>
          {ticket.status !== "closed" && ticket.status !== "resolved" && (
            <Button size="sm" variant="outline" onClick={() => onRespond(ticket.id)}>
              <MessageSquare className="h-4 w-4 mr-1" />
              Répondre
            </Button>
          )}
          {ticket.status !== "closed" && (
            <Button size="sm" variant="outline" onClick={() => onClose(ticket.id)}>
              Fermer
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
