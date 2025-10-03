"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface InvoiceFormProps {
  invoice?: {
    id?: string
    projectName: string
    clientName: string
    amount: number
    dueDate: string
    description: string
    status: string
  }
  onSubmit: (invoiceData: any) => void
  onCancel: () => void
}

const mockProjects = [
  { id: "PRJ-001", name: "Installation solaire - Maison Dubois", client: "Marie Dubois" },
  { id: "PRJ-002", name: "Maintenance éolienne - Entreprise Tech", client: "TechCorp SARL" },
  { id: "PRJ-003", name: "Audit énergétique - Résidence Les Pins", client: "Syndic Les Pins" },
]

export function InvoiceForm({ invoice, onSubmit, onCancel }: InvoiceFormProps) {
  const [formData, setFormData] = useState({
    projectId: invoice?.projectName || "",
    clientName: invoice?.clientName || "",
    amount: invoice?.amount || 0,
    dueDate: invoice?.dueDate ? new Date(invoice.dueDate) : undefined,
    description: invoice?.description || "",
    status: invoice?.status || "pending",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const selectedProject = mockProjects.find((p) => p.id === formData.projectId)
    onSubmit({
      ...formData,
      projectName: selectedProject?.name || "",
      clientName: selectedProject?.client || formData.clientName,
      dueDate: formData.dueDate ? format(formData.dueDate, "yyyy-MM-dd") : "",
    })
  }

  const handleProjectChange = (projectId: string) => {
    const selectedProject = mockProjects.find((p) => p.id === projectId)
    setFormData({
      ...formData,
      projectId,
      clientName: selectedProject?.client || "",
    })
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{invoice ? "Modifier la facture" : "Nouvelle facture"}</CardTitle>
        <CardDescription>
          {invoice ? "Modifiez les informations de la facture" : "Créez une nouvelle facture pour votre client"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Projet associé *</Label>
              <Select value={formData.projectId} onValueChange={handleProjectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un projet" />
                </SelectTrigger>
                <SelectContent>
                  {mockProjects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientName">Client</Label>
              <Input
                id="clientName"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                placeholder="Nom du client"
                disabled={!!formData.projectId}
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="amount">Montant (€) *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: Number.parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Date d'échéance *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dueDate ? format(formData.dueDate, "PPP", { locale: fr }) : "Sélectionner une date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.dueDate}
                    onSelect={(date) => setFormData({ ...formData, dueDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Statut</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Statut de la facture" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="paid">Payée</SelectItem>
                <SelectItem value="overdue">En retard</SelectItem>
                <SelectItem value="cancelled">Annulée</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Description des services facturés..."
              rows={4}
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">
              {invoice ? "Mettre à jour" : "Créer la facture"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
              Annuler
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
