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

interface ProjectFormProps {
  project?: {
    id?: string
    name: string
    client: string
    type: string
    priority: string
    status: string
    startDate: string
    estimatedCompletion: string
    technician: string
    location: string
    description: string
  }
  onSubmit: (projectData: any) => void
  onCancel: () => void
}

const mockTechnicians = [
  { id: "tech-1", name: "Jean Martin" },
  { id: "tech-2", name: "Sophie Laurent" },
  { id: "tech-3", name: "Pierre Durand" },
  { id: "tech-4", name: "Marie Rousseau" },
]

export function ProjectForm({ project, onSubmit, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    name: project?.name || "",
    client: project?.client || "",
    type: project?.type || "",
    priority: project?.priority || "",
    status: project?.status || "planning",
    startDate: project?.startDate ? new Date(project.startDate) : undefined,
    estimatedCompletion: project?.estimatedCompletion ? new Date(project.estimatedCompletion) : undefined,
    technician: project?.technician || "",
    location: project?.location || "",
    description: project?.description || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      startDate: formData.startDate ? format(formData.startDate, "yyyy-MM-dd") : "",
      estimatedCompletion: formData.estimatedCompletion ? format(formData.estimatedCompletion, "yyyy-MM-dd") : "",
    })
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{project ? "Modifier le projet" : "Nouveau projet"}</CardTitle>
        <CardDescription>
          {project ? "Modifiez les informations du projet" : "Créez un nouveau projet pour votre client"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du projet *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Installation solaire résidentielle"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="client">Client *</Label>
              <Input
                id="client"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                placeholder="Nom du client"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Type de projet *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solar-installation">Installation solaire</SelectItem>
                  <SelectItem value="wind-installation">Installation éolienne</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="audit">Audit énergétique</SelectItem>
                  <SelectItem value="repair">Réparation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Priorité</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez la priorité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Faible</SelectItem>
                  <SelectItem value="medium">Normale</SelectItem>
                  <SelectItem value="high">Élevée</SelectItem>
                  <SelectItem value="urgent">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Date de début</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.startDate ? format(formData.startDate, "PPP", { locale: fr }) : "Sélectionner une date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.startDate}
                    onSelect={(date) => setFormData({ ...formData, startDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Date de fin estimée</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.estimatedCompletion
                      ? format(formData.estimatedCompletion, "PPP", { locale: fr })
                      : "Sélectionner une date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.estimatedCompletion}
                    onSelect={(date) => setFormData({ ...formData, estimatedCompletion: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Technicien assigné</Label>
              <Select
                value={formData.technician}
                onValueChange={(value) => setFormData({ ...formData, technician: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Assigner un technicien" />
                </SelectTrigger>
                <SelectContent>
                  {mockTechnicians.map((tech) => (
                    <SelectItem key={tech.id} value={tech.name}>
                      {tech.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Statut</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Statut du projet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planning">Planification</SelectItem>
                  <SelectItem value="in-progress">En cours</SelectItem>
                  <SelectItem value="on-hold">En attente</SelectItem>
                  <SelectItem value="completed">Terminé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Adresse du projet *</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="15 rue des Lilas, 75015 Paris"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Décrivez les détails du projet..."
              rows={4}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">
              {project ? "Mettre à jour" : "Créer le projet"}
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
