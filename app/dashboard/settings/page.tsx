"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Bell, Shield, Building, Menu, LogOut } from "lucide-react"

export default function SettingsPage() {
  const { user, isLoading: authLoading, logout } = useAuth()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    // Company settings
    companyName: "EcoEnergy",
    companyEmail: "contact@ecoenergy.fr",
    companyPhone: "+33 1 23 45 67 89",
    companyAddress: "123 Rue de l'Énergie, 75001 Paris",
    companyDescription: "Spécialiste en énergies renouvelables",

    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    projectUpdates: true,
    invoiceReminders: true,

    // Security
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordPolicy: "medium",

    // System
    timezone: "Europe/Paris",
    language: "fr",
    currency: "EUR",
    dateFormat: "dd/mm/yyyy",
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

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Settings saved:", settings)
    setIsLoading(false)
  }

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)} className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
                <p className="text-gray-600">Configurez votre application et vos préférences</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Bonjour, {user?.name}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <Tabs defaultValue="company" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="company">Entreprise</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Sécurité</TabsTrigger>
                <TabsTrigger value="system">Système</TabsTrigger>
              </TabsList>

              <TabsContent value="company" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Building className="h-5 w-5" />
                      <CardTitle>Informations de l'entreprise</CardTitle>
                    </div>
                    <CardDescription>Gérez les informations de votre entreprise</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Nom de l'entreprise</Label>
                        <Input
                          id="companyName"
                          value={settings.companyName}
                          onChange={(e) => updateSetting("companyName", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="companyEmail">Email</Label>
                        <Input
                          id="companyEmail"
                          type="email"
                          value={settings.companyEmail}
                          onChange={(e) => updateSetting("companyEmail", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="companyPhone">Téléphone</Label>
                        <Input
                          id="companyPhone"
                          value={settings.companyPhone}
                          onChange={(e) => updateSetting("companyPhone", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="companyAddress">Adresse</Label>
                        <Input
                          id="companyAddress"
                          value={settings.companyAddress}
                          onChange={(e) => updateSetting("companyAddress", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="companyDescription">Description</Label>
                      <Textarea
                        id="companyDescription"
                        value={settings.companyDescription}
                        onChange={(e) => updateSetting("companyDescription", e.target.value)}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Bell className="h-5 w-5" />
                      <CardTitle>Préférences de notification</CardTitle>
                    </div>
                    <CardDescription>Configurez vos notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Notifications par email</Label>
                        <p className="text-sm text-muted-foreground">Recevoir les notifications par email</p>
                      </div>
                      <Switch
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Notifications SMS</Label>
                        <p className="text-sm text-muted-foreground">Recevoir les notifications par SMS</p>
                      </div>
                      <Switch
                        checked={settings.smsNotifications}
                        onCheckedChange={(checked) => updateSetting("smsNotifications", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Mises à jour de projets</Label>
                        <p className="text-sm text-muted-foreground">Notifications sur l'avancement des projets</p>
                      </div>
                      <Switch
                        checked={settings.projectUpdates}
                        onCheckedChange={(checked) => updateSetting("projectUpdates", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Rappels de factures</Label>
                        <p className="text-sm text-muted-foreground">Rappels pour les factures impayées</p>
                      </div>
                      <Switch
                        checked={settings.invoiceReminders}
                        onCheckedChange={(checked) => updateSetting("invoiceReminders", checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <CardTitle>Paramètres de sécurité</CardTitle>
                    </div>
                    <CardDescription>Configurez la sécurité de votre compte</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Authentification à deux facteurs</Label>
                        <p className="text-sm text-muted-foreground">Sécurité renforcée pour votre compte</p>
                      </div>
                      <Switch
                        checked={settings.twoFactorAuth}
                        onCheckedChange={(checked) => updateSetting("twoFactorAuth", checked)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout">Délai d'expiration de session (minutes)</Label>
                      <Select
                        value={settings.sessionTimeout}
                        onValueChange={(value) => updateSetting("sessionTimeout", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 heure</SelectItem>
                          <SelectItem value="120">2 heures</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="passwordPolicy">Politique de mot de passe</Label>
                      <Select
                        value={settings.passwordPolicy}
                        onValueChange={(value) => updateSetting("passwordPolicy", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Faible (8 caractères min)</SelectItem>
                          <SelectItem value="medium">Moyenne (8 car. + majuscule + chiffre)</SelectItem>
                          <SelectItem value="high">Élevée (12 car. + symboles)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="system" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Paramètres système</CardTitle>
                    <CardDescription>Configurez les paramètres régionaux et système</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Fuseau horaire</Label>
                        <Select value={settings.timezone} onValueChange={(value) => updateSetting("timezone", value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Europe/Paris">Europe/Paris (UTC+1)</SelectItem>
                            <SelectItem value="Europe/London">Europe/London (UTC+0)</SelectItem>
                            <SelectItem value="America/New_York">America/New_York (UTC-5)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="language">Langue</Label>
                        <Select value={settings.language} onValueChange={(value) => updateSetting("language", value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Español</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="currency">Devise</Label>
                        <Select value={settings.currency} onValueChange={(value) => updateSetting("currency", value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="EUR">Euro (€)</SelectItem>
                            <SelectItem value="USD">Dollar US ($)</SelectItem>
                            <SelectItem value="GBP">Livre Sterling (£)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dateFormat">Format de date</Label>
                        <Select
                          value={settings.dateFormat}
                          onValueChange={(value) => updateSetting("dateFormat", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                            <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                            <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end">
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? (
                  "Enregistrement..."
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Enregistrer les modifications
                  </>
                )}
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
