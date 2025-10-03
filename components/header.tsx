import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">E</span>
          </div>
          <span className="font-bold text-xl text-foreground">EcoEnergy</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors">
            Services
          </Link>
          <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
            À propos
          </Link>
          <Link href="/support" className="text-muted-foreground hover:text-foreground transition-colors">
            Support
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button asChild>
            <Link href="/login">Se connecter</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
