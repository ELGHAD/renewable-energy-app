"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Edit, Trash2, Download, Send } from "lucide-react"

interface AdminInvoiceCardProps {
  invoice: {
    id: string
    projectName: string
    clientName: string
    amount: number
    status: "pending" | "paid" | "overdue" | "cancelled"
    dueDate: string
    issueDate: string
    description: string
  }
  onEdit: (invoiceId: string) => void
  onDelete: (invoiceId: string) => void
  onSend: (invoiceId: string) => void
  onDownload: (invoiceId: string) => void
}

export function AdminInvoiceCard({ invoice, onEdit, onDelete, onSend, onDownload }: AdminInvoiceCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-chart-2 text-white"
      case "paid":
        return "bg-chart-3 text-white"
      case "overdue":
        return "bg-destructive text-destructive-foreground"
      case "cancelled":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "En attente"
      case "paid":
        return "Payée"
      case "overdue":
        return "En retard"
      case "cancelled":
        return "Annulée"
      default:
        return status
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Facture {invoice.id}
            </CardTitle>
            <CardDescription className="mt-1">
              {invoice.projectName} • {invoice.clientName}
            </CardDescription>
          </div>
          <Badge className={getStatusColor(invoice.status)}>{getStatusText(invoice.status)}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">{invoice.amount.toFixed(2)} €</span>
        </div>

        <div className="space-y-1 text-sm text-muted-foreground">
          <p>Émise le: {invoice.issueDate}</p>
          <p>Échéance: {invoice.dueDate}</p>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{invoice.description}</p>

        <div className="flex gap-2 pt-2 flex-wrap">
          <Button size="sm" variant="outline" onClick={() => onEdit(invoice.id)}>
            <Edit className="h-4 w-4 mr-1" />
            Modifier
          </Button>
          <Button size="sm" variant="outline" onClick={() => onDownload(invoice.id)}>
            <Download className="h-4 w-4 mr-1" />
            PDF
          </Button>
          {invoice.status === "pending" && (
            <Button size="sm" variant="outline" onClick={() => onSend(invoice.id)}>
              <Send className="h-4 w-4 mr-1" />
              Envoyer
            </Button>
          )}
          <Button size="sm" variant="outline" onClick={() => onDelete(invoice.id)}>
            <Trash2 className="h-4 w-4 mr-1" />
            Supprimer
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
