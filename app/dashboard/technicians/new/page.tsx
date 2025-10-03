"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import AdminSidebar from "@/components/admin/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Menu } from "lucide-react"
import { saveTechnician } from "@/lib/technicians-storage"

export default function NewTechnicianPage() {
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    speciality: "",
    location: "",
    experience: "",
    certifications: "",
    notes: "",
  })

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "admin")) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  if (authLoading) {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>
  }

  if (!user || user.role !== "admin") {
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const technicianData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        speciality: getSpecialityLabel(formData.speciality),
        location: formData.location,
        avatar: "/placeholder.svg?height=40&width=40",
      }

      saveTechnician(technicianData)

      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/dashboard/technicians")
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getSpecialityLabel = (value: string) => {
    const specialities: Record<string, string> = {
      solar: "Panneaux solaires",
      wind: "Éolien",
      "heat-pump": "Pompes à chaleur",
      battery: "Batteries",
      maintenance: "Maintenance générale",
    }
    return specialities[value] || value
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-semibold text-gray-900">Nouveau technicien</h1>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/technicians">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour
                </Link>
              </Button>
              <div>
                <p className="text-muted-foreground">Ajouter un nouveau technicien à l'équipe</p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Informations du technicien</CardTitle>
                <CardDescription>Remplissez les informations du nouveau technicien</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="speciality">Spécialité *</Label>
                      <Select
                        value={formData.speciality}
                        onValueChange={(value) => handleInputChange("speciality", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une spécialité" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="solar">Panneaux solaires</SelectItem>
                          <SelectItem value="wind">Éolien</SelectItem>
                          <SelectItem value="heat-pump">Pompes à chaleur</SelectItem>
                          <SelectItem value="battery">Batteries</SelectItem>
                          <SelectItem value="maintenance">Maintenance générale</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Localisation *</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        placeholder="Ville, région"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Années d'expérience</Label>
                    <Input
                      id="experience"
                      type="number"
                      value={formData.experience}
                      onChange={(e) => handleInputChange("experience", e.target.value)}
                      placeholder="Nombre d'années"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="certifications">Certifications</Label>
                    <Textarea
                      id="certifications"
                      value={formData.certifications}
                      onChange={(e) => handleInputChange("certifications", e.target.value)}
                      placeholder="Listez les certifications et qualifications..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes additionnelles</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                      placeholder="Informations supplémentaires..."
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline" asChild>
                      <Link href="/dashboard/technicians">Annuler</Link>
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        "Enregistrement..."
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Enregistrer
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
