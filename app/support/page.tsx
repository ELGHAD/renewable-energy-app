import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, MessageCircle, FileText, Wrench } from "lucide-react"
import { Header } from "@/components/header"

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">Support & Contact</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Notre équipe d'experts est là pour vous accompagner dans tous vos projets d'énergie renouvelable
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card>
              <CardHeader className="text-center">
                <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Téléphone</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-2xl font-bold text-primary mb-2">01 23 45 67 89</p>
                <p className="text-muted-foreground">Lun-Ven: 8h-18h</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg font-semibold text-primary mb-2">contact@ecoenergy.fr</p>
                <p className="text-muted-foreground">Réponse sous 24h</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Adresse</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-primary mb-2">123 Avenue Verte</p>
                <p className="text-muted-foreground">75001 Paris, France</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Support Types */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Types de Support</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <MessageCircle className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Support Technique</CardTitle>
                <CardDescription>Assistance pour vos installations</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Dépannage d'urgence</li>
                  <li>• Maintenance préventive</li>
                  <li>• Optimisation des performances</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Support Commercial</CardTitle>
                <CardDescription>Devis et informations produits</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Études personnalisées</li>
                  <li>• Devis gratuits</li>
                  <li>• Conseils en financement</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Wrench className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Support Client</CardTitle>
                <CardDescription>Suivi de vos projets</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Suivi d'installation</li>
                  <li>• Facturation</li>
                  <li>• Formation utilisateur</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Contactez-nous</h2>
            <Card>
              <CardHeader>
                <CardTitle>Envoyez-nous un message</CardTitle>
                <CardDescription>
                  Remplissez le formulaire ci-dessous et nous vous répondrons rapidement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input id="firstName" placeholder="Votre prénom" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input id="lastName" placeholder="Votre nom" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="votre.email@exemple.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" type="tel" placeholder="01 23 45 67 89" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Type de demande</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez le type de demande" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="commercial">Demande commerciale</SelectItem>
                      <SelectItem value="technique">Support technique</SelectItem>
                      <SelectItem value="facturation">Facturation</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Décrivez votre demande en détail..." className="min-h-[120px]" />
                </div>

                <Button className="w-full" size="lg">
                  Envoyer le message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Questions Fréquentes</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Combien de temps prend une installation ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Une installation résidentielle standard prend généralement 1 à 3 jours, selon la complexité du projet
                  et les conditions météorologiques.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quelle est la garantie sur les installations ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nous offrons une garantie de 10 ans sur l'installation et jusqu'à 25 ans sur les panneaux solaires
                  selon les fabricants.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Proposez-vous des solutions de financement ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Oui, nous proposons plusieurs options de financement incluant des prêts à taux préférentiels et des
                  solutions de location avec option d'achat.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Besoin d'une Assistance Immédiate ?</h2>
          <p className="text-xl mb-8 opacity-90">Notre équipe technique est disponible 24h/24 pour les urgences</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="tel:0123456789">Appeler Maintenant</Link>
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
