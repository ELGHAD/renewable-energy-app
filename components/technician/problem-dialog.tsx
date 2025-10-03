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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProblemDialogProps {
  isOpen: boolean
  onClose: () => void
  taskId: string
  onSubmit: (taskId: string, type: string, description: string) => void
}

export function ProblemDialog({ isOpen, onClose, taskId, onSubmit }: ProblemDialogProps) {
  const [problemType, setProblemType] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = () => {
    if (problemType && description) {
      onSubmit(taskId, problemType, description)
      setProblemType("")
      setDescription("")
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Signaler un problème</DialogTitle>
          <DialogDescription>Décrivez le problème rencontré pour que l'équipe puisse vous aider.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Type de problème</Label>
            <Select value={problemType} onValueChange={setProblemType}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez le type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="material">Problème matériel</SelectItem>
                <SelectItem value="access">Problème d'accès</SelectItem>
                <SelectItem value="weather">Conditions météo</SelectItem>
                <SelectItem value="technical">Problème technique</SelectItem>
                <SelectItem value="safety">Problème de sécurité</SelectItem>
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description détaillée</Label>
            <Textarea
              id="description"
              placeholder="Décrivez le problème en détail..."
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
          <Button onClick={handleSubmit} disabled={!problemType || !description}>
            Signaler
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
