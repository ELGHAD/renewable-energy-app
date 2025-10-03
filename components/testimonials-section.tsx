import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"

const testimonials = [
  {
    name: "Marie Dubois",
    role: "Propriétaire résidentiel",
    content: "Installation parfaite et suivi exemplaire. Notre facture d'électricité a diminué de 70%.",
    rating: 5,
  },
  {
    name: "Jean Martin",
    role: "Directeur d'entreprise",
    content: "Service professionnel et plateforme de suivi très intuitive. Je recommande vivement.",
    rating: 5,
  },
  {
    name: "Sophie Laurent",
    role: "Gestionnaire immobilier",
    content: "Équipe réactive et compétente. Le dashboard client est un vrai plus pour nos locataires.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Témoignages</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Ce que disent nos clients satisfaits
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-primary text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <CardDescription className="text-base leading-relaxed italic">"{testimonial.content}"</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
