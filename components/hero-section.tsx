import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-card to-background">
      <div className="container mx-auto text-center max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
          L'avenir énergétique commence <span className="text-primary">aujourd'hui</span>
        </h1>
        <p className="text-xl text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto leading-relaxed">
          Spécialistes en énergies renouvelables, nous accompagnons votre transition vers un avenir durable avec des
          solutions d'installation et de maintenance de haute qualité.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/login">Accéder à votre espace</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="#services">Découvrir nos services</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
