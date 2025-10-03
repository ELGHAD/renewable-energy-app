import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sun, Wind, Zap, Home, Building2, Factory, CheckCircle, ArrowRight, Clock, Shield, Award } from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      icon: Sun,
      title: "Installation Solaire",
      description: "Panneaux photovoltaïques haute performance pour particuliers et entreprises",
      features: [
        "Étude personnalisée gratuite",
        "Installation certifiée RGE",
        "Garantie 20 ans",
        "Maintenance incluse",
      ],
      types: ["Résidentiel", "Commercial", "Industriel"],
    },
    {
      icon: Wind,
      title: "Énergie Éolienne",
      description: "Solutions éoliennes adaptées à tous types de terrains et besoins",
      features: [
        "Analyse du potentiel éolien",
        "Éoliennes dernière génération",
        "Installation clé en main",
        "Suivi de production",
      ],
      types: ["Petit éolien", "Éolien domestique", "Parcs éoliens"],
    },
    {
      icon: Zap,
      title: "Stockage d'Énergie",
      description: "Batteries et systèmes de stockage pour optimiser votre autonomie",
      features: [
        "Batteries lithium haute capacité",
        "Gestion intelligente",
        "Intégration parfaite",
        "Monitoring en temps réel",
      ],
      types: ["Résidentiel", "Commercial", "Industriel"],
    },
  ]

  const sectors = [
    {
      icon: Home,
      title: "Particuliers",
      description: "Solutions sur mesure pour votre habitation",
      benefits: ["Réduction facture électrique", "Autonomie énergétique", "Valorisation immobilière"],
    },
    {
      icon: Building2,
      title: "Entreprises",
      description: "Optimisez vos coûts énergétiques",
      benefits: ["ROI attractif", "Image éco-responsable", "Indépendance énergétique"],
    },
    {
      icon: Factory,
      title: "Industrie",
      description: "Solutions haute puissance pour l'industrie",
      benefits: ["Réduction des coûts", "Stabilité énergétique", "Conformité environnementale"],
    },
  ]

  const process = [
    {
      step: "1",
      title: "Étude & Devis",
      description: "Analyse de vos besoins et étude de faisabilité gratuite",
    },
    {
      step: "2",
      title: "Conception",
      description: "Dimensionnement optimal et choix des équipements",
    },
    {
      step: "3",
      title: "Installation",
      description: "Mise en œuvre par nos équipes certifiées",
    },
    {
      step: "4",
      title: "Mise en Service",
      description: "Tests, formation et accompagnement",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Nos Services en Énergies Renouvelables
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Des solutions complètes et personnalisées pour votre transition énergétique, de l'étude à la maintenance
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="secondary" className="px-4 py-2">
                  <Award className="w-4 h-4 mr-2" />
                  Certifié RGE
                </Badge>
                <Badge variant="secondary" className="px-4 py-2">
                  <Shield className="w-4 h-4 mr-2" />
                  Garantie 20 ans
                </Badge>
                <Badge variant="secondary" className="px-4 py-2">
                  <Clock className="w-4 h-4 mr-2" />
                  Installation rapide
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Services détaillés */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Nos Solutions Énergétiques</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-amber-100 rounded-lg">
                        <service.icon className="h-6 w-6 text-amber-600" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </div>
                    <p className="text-gray-600">{service.description}</p>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Caractéristiques :</h4>
                        <ul className="space-y-1">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Types d'installation :</h4>
                        <div className="flex flex-wrap gap-2">
                          {service.types.map((type, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Secteurs d'activité */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Nos Secteurs d'Intervention</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {sectors.map((sector, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto p-4 bg-amber-100 rounded-full w-fit mb-4">
                      <sector.icon className="h-8 w-8 text-amber-600" />
                    </div>
                    <CardTitle className="text-xl">{sector.title}</CardTitle>
                    <p className="text-gray-600">{sector.description}</p>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-2">
                      {sector.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center justify-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Processus */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Notre Processus d'Installation</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="mx-auto w-16 h-16 bg-amber-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-amber-600 to-orange-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Prêt à Démarrer Votre Projet ?</h2>
            <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
              Contactez nos experts pour une étude personnalisée et un devis gratuit
            </p>

            <Button size="lg" className="bg-white text-amber-600 hover:bg-amber-50 font-semibold px-8 py-3" asChild>
              <Link href="/support">
                Demander un Devis Gratuit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
