"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SupportTicketDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (ticket: { subject: string; category: string; priority: string; description: string }) => void
}

export function SupportTicketDialog({ isOpen, onClose, onSubmit }: SupportTicketDialogProps) {
  const [subject, setSubject] = useState("")
  const [category, setCategory] = useState("")
  const [priority, setPriority] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = () => {
    if (subject && category && priority && description) {
      onSubmit({ subject, category, priority, description })
      setSubject("")
      setCategory("")
      setPriority("")
      setDescription("")
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nouveau ticket de support</DialogTitle>
          <DialogDescription>Décrivez votre demande et nous vous répondrons rapidement.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Sujet</Label>
            <Input
              id="subject"
              placeholder="Résumé de votre demande"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Catégorie</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technical">Problème technique</SelectItem>
                <SelectItem value="billing">Facturation</SelectItem>
                <SelectItem value="project">Question sur projet</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Priorité</Label>
            <Select value={priority} onValueChange={setPriority}>
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

          <div className="space-y-2">
            <Label htmlFor="description">Description détaillée</Label>
            <Textarea
              id="description"
              placeholder="Décrivez votre demande en détail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSubmit} disabled={!subject || !category || !priority || !description}>
            Envoyer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
