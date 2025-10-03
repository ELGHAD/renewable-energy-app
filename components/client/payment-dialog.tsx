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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Lock } from "lucide-react"

interface PaymentDialogProps {
  isOpen: boolean
  onClose: () => void
  invoice: {
    id: string
    amount: number
    projectName: string
  } | null
  onPayment: (invoiceId: string, paymentMethod: string) => void
}

export function PaymentDialog({ isOpen, onClose, invoice, onPayment }: PaymentDialogProps) {
  const [paymentMethod, setPaymentMethod] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")

  const handlePayment = () => {
    if (invoice && paymentMethod) {
      onPayment(invoice.id, paymentMethod)
      setPaymentMethod("")
      setCardNumber("")
      setExpiryDate("")
      setCvv("")
      onClose()
    }
  }

  if (!invoice) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2" />
            Paiement sécurisé
          </DialogTitle>
          <DialogDescription>
            Facture {invoice.id} - {invoice.projectName}
            <br />
            <span className="text-lg font-semibold text-primary">{invoice.amount.toFixed(2)} €</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Méthode de paiement</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Choisissez votre méthode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="card">Carte bancaire</SelectItem>
                <SelectItem value="transfer">Virement bancaire</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {paymentMethod === "card" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Numéro de carte</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Date d'expiration</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/AA"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} />
                </div>
              </div>
            </>
          )}

          {paymentMethod === "transfer" && (
            <div className="p-4 bg-muted rounded-lg text-sm">
              <p className="font-medium mb-2">Informations de virement :</p>
              <p>IBAN : FR76 1234 5678 9012 3456 7890 123</p>
              <p>BIC : ABCDEFGH</p>
              <p>Référence : {invoice.id}</p>
            </div>
          )}

          <div className="flex items-center text-xs text-muted-foreground">
            <Lock className="h-3 w-3 mr-1" />
            Paiement sécurisé SSL 256 bits
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handlePayment} disabled={!paymentMethod}>
            Payer {invoice.amount.toFixed(2)} €
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
