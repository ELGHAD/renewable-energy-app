import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">E</span>
              </div>
              <span className="font-bold text-xl">EcoEnergy</span>
            </div>
            <p className="text-secondary-foreground/80 leading-relaxed">
              Votre partenaire de confiance pour la transition énergétique durable.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li>
                <Link href="#" className="hover:text-secondary-foreground transition-colors">
                  Installation solaire
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-secondary-foreground transition-colors">
                  Maintenance
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-secondary-foreground transition-colors">
                  Suivi énergétique
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li>
                <Link href="#" className="hover:text-secondary-foreground transition-colors">
                  Centre d'aide
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-secondary-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-secondary-foreground transition-colors">
                  Espace client
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-secondary-foreground/80">
              <p>📧 contact@ecoenergy.fr</p>
              <p>📞 01 23 45 67 89</p>
              <p>📍 Paris, France</p>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-secondary-foreground/60">
          <p>&copy; 2024 EcoEnergy. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
