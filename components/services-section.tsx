import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    title: "Installation solaire",
    description: "Installation complète de panneaux solaires photovoltaïques avec suivi personnalisé",
    icon: "☀️",
  },
  {
    title: "Maintenance préventive",
    description: "Entretien régulier et optimisation de vos installations énergétiques",
    icon: "🔧",
  },
  {
    title: "Suivi en temps réel",
    description: "Monitoring 24/7 de vos installations avec rapports détaillés",
    icon: "📊",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Des solutions complètes pour votre transition énergétique
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-4">{service.icon}</div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
