import { Card, CardContent } from "@/components/ui/card"

export function StatsSection() {
  const stats = [
    {
      number: "500+",
      label: "Projets Réalisés",
      description: "Installations solaires et éoliennes",
    },
    {
      number: "15+",
      label: "Années d'Expérience",
      description: "Dans les énergies renouvelables",
    },
    {
      number: "98%",
      label: "Satisfaction Client",
      description: "Taux de recommandation",
    },
    {
      number: "50MW",
      label: "Capacité Installée",
      description: "Puissance totale déployée",
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Réalisations en Chiffres</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Des résultats concrets qui témoignent de notre expertise et de notre engagement
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-amber-600 mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
