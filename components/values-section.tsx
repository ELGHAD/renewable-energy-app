import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const values = [
  {
    title: "Qualité garantie",
    description: "Matériaux premium et certifications internationales pour une durabilité maximale",
  },
  {
    title: "Durabilité",
    description: "Solutions écologiques conçues pour durer et respecter l'environnement",
  },
  {
    title: "Suivi transparent",
    description: "Monitoring en temps réel et rapports détaillés accessibles 24/7",
  },
]

export function ValuesSection() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Valeurs</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            L'excellence au service de votre transition énergétique
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-xl text-center">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-center">{value.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
