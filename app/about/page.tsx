import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Award, Leaf, Zap } from "lucide-react"
import { Header } from "@/components/header"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">À propos d'EcoEnergy</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Pionniers de l'énergie renouvelable depuis 2015, nous transformons l'avenir énergétique avec des solutions
            durables et innovantes.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-6 w-6 text-primary" />
                  Notre Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Démocratiser l'accès aux énergies renouvelables en proposant des solutions personnalisées, durables et
                  économiquement viables pour tous nos clients.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-6 w-6 text-primary" />
                  Notre Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Devenir le leader européen de la transition énergétique en créant un monde où l'énergie propre est
                  accessible, fiable et abordable pour tous.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Réalisations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Projets Réalisés</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Techniciens Experts</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Satisfaction Client</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">10MW</div>
              <div className="text-muted-foreground">Énergie Installée</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Notre Équipe</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <CardTitle>Marie Dubois</CardTitle>
                <CardDescription>Directrice Générale</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">15 ans d'expérience dans les énergies renouvelables</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Award className="h-10 w-10 text-primary" />
                </div>
                <CardTitle>Pierre Martin</CardTitle>
                <CardDescription>Directeur Technique</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">Expert en installations photovoltaïques et éoliennes</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Leaf className="h-10 w-10 text-primary" />
                </div>
                <CardTitle>Sophie Leroy</CardTitle>
                <CardDescription>Responsable Développement Durable</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">Spécialiste en impact environnemental et certifications</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Rejoignez la Révolution Énergétique</h2>
          <p className="text-xl mb-8 opacity-90">
            Découvrez comment nous pouvons transformer votre consommation énergétique
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/support">Nous Contacter</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link href="/login">Espace Client</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
