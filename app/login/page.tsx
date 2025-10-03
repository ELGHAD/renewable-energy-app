"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth, type UserRole } from "@/contexts/auth-context"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login, isLoading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Veuillez remplir tous les champs")
      return
    }

    const success = await login(email, password)
    if (success) {
      router.push("/dashboard")
    } else {
      setError("Email ou mot de passe incorrect")
    }
  }

  const handleDemoLogin = async (role: UserRole) => {
    setError("")
    const success = await login("", "", role)
    if (success) {
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-card to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold">E</span>
            </div>
            <span className="font-bold text-2xl text-foreground">EcoEnergy</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Connexion</h1>
          <p className="text-muted-foreground mt-2">Accédez à votre espace personnel</p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle>Se connecter</CardTitle>
            <CardDescription>Entrez vos identifiants pour accéder à votre compte</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connexion en cours...
                  </>
                ) : (
                  "Se connecter"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Buttons */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Démonstration</CardTitle>
            <CardDescription>Accès rapide pour tester l'application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => handleDemoLogin("admin")}
              disabled={isLoading}
            >
              Se connecter en tant qu'Administrateur
            </Button>
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => handleDemoLogin("technician")}
              disabled={isLoading}
            >
              Se connecter en tant que Technicien
            </Button>
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => handleDemoLogin("client")}
              disabled={isLoading}
            >
              Se connecter en tant que Client
            </Button>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  )
}
