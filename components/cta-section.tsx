import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"
import Link from "next/link"

export function CtaSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-amber-600 to-orange-600">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Prêt à Passer aux Énergies Renouvelables ?</h2>
          <p className="text-xl text-amber-100 mb-8">
            Obtenez un devis gratuit et personnalisé pour votre projet d'installation solaire ou éolienne
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-amber-600 hover:bg-amber-50 font-semibold px-8 py-3" asChild>
              <Link href="/support">
                Demander un Devis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-amber-600 font-semibold px-8 py-3 bg-transparent"
            >
              <Phone className="mr-2 h-5 w-5" />
              Appeler Maintenant
            </Button>
          </div>

          <div className="mt-8 text-amber-100">
            <p className="text-sm">✓ Consultation gratuite • ✓ Devis sous 24h • ✓ Installation certifiée</p>
          </div>
        </div>
      </div>
    </section>
  )
}
