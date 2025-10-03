"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { InvoiceForm } from "@/components/admin/invoice-form"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"

export default function NewInvoicePage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  if (!user || user.role !== "admin") {
    router.push("/dashboard")
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleSubmit = (invoiceData: any) => {
    // In a real app, this would make an API call
    console.log("Creating invoice:", invoiceData)

    toast({
      title: "Facture créée",
      description: "La nouvelle facture a été créée avec succès.",
    })

    router.push("/dashboard/invoices")
  }

  const handleCancel = () => {
    router.push("/dashboard/invoices")
  }

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />

      <div className="flex-1">
        {/* Header */}
        <header className="border-b border-border bg-background/95 backdrop-blur">
          <div className="px-6 h-16 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-foreground">Nouvelle facture</h1>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Bonjour, {user.name}</span>
              <Button variant="outline" onClick={handleLogout}>
                Déconnexion
              </Button>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="max-w-4xl mx-auto">
            <InvoiceForm onSubmit={handleSubmit} onCancel={handleCancel} />
          </div>
        </main>
      </div>
    </div>
  )
}
