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
import { Slider } from "@/components/ui/slider"

interface ProgressDialogProps {
  isOpen: boolean
  onClose: () => void
  taskId: string
  currentProgress: number
  onSave: (taskId: string, progress: number, notes: string) => void
}

export function ProgressDialog({ isOpen, onClose, taskId, currentProgress, onSave }: ProgressDialogProps) {
  const [progress, setProgress] = useState([currentProgress])
  const [notes, setNotes] = useState("")

  const handleSave = () => {
    onSave(taskId, progress[0], notes)
    setNotes("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Mettre à jour la progression</DialogTitle>
          <DialogDescription>
            Ajustez le pourcentage de completion et ajoutez des notes si nécessaire.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Progression: {progress[0]}%</Label>
            <Slider value={progress} onValueChange={setProgress} max={100} step={5} className="w-full" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optionnel)</Label>
            <Textarea
              id="notes"
              placeholder="Décrivez l'avancement, les étapes réalisées..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSave}>Sauvegarder</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
