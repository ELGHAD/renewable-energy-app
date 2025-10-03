"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, FolderKanban, Users, FileText, Settings, BarChart3, HelpCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Vue d'ensemble", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projets", href: "/dashboard/projects", icon: FolderKanban },
  { name: "Techniciens", href: "/dashboard/technicians", icon: Users },
  { name: "Factures", href: "/dashboard/invoices", icon: FileText },
  { name: "Support", href: "/dashboard/support", icon: HelpCircle },
  { name: "Rapports", href: "/dashboard/reports", icon: BarChart3 },
  { name: "Paramètres", href: "/dashboard/settings", icon: Settings },
]

interface AdminSidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

function AdminSidebar({ isOpen = true, onClose }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-sidebar-primary rounded-full flex items-center justify-center">
              <span className="text-sidebar-primary-foreground font-bold text-sm">E</span>
            </div>
            <span className="font-bold text-xl text-sidebar-foreground">EcoEnergy</span>
          </div>
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="px-4 pb-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    )}
                    onClick={() => onClose?.()}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </>
  )
}

export default AdminSidebar
export { AdminSidebar }
