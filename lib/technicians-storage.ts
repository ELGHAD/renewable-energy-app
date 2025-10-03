export interface Technician {
  id: number
  name: string
  email: string
  phone: string
  speciality: string
  location: string
  rating: number
  activeProjects: number
  completedProjects: number
  joinDate: string
  status: "available" | "busy"
  avatar?: string
}

const STORAGE_KEY = "ecoenergy_technicians"

// Default technicians data
const defaultTechnicians: Technician[] = [
  {
    id: 1,
    name: "Jean Dupont",
    email: "jean.dupont@ecoenergy.fr",
    phone: "+33 6 12 34 56 78",
    speciality: "Panneaux solaires",
    location: "Paris",
    rating: 4.8,
    activeProjects: 3,
    completedProjects: 24,
    joinDate: "2023-01-15",
    status: "available",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Marie Martin",
    email: "marie.martin@ecoenergy.fr",
    phone: "+33 6 98 76 54 32",
    speciality: "Éolien",
    location: "Lyon",
    rating: 4.9,
    activeProjects: 2,
    completedProjects: 31,
    joinDate: "2022-08-20",
    status: "busy",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Pierre Leroy",
    email: "pierre.leroy@ecoenergy.fr",
    phone: "+33 6 45 67 89 12",
    speciality: "Pompes à chaleur",
    location: "Marseille",
    rating: 4.7,
    activeProjects: 4,
    completedProjects: 18,
    joinDate: "2023-03-10",
    status: "available",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export const loadTechnicians = (): Technician[] => {
  if (typeof window === "undefined") return defaultTechnicians

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
    // Initialize with default data if nothing stored
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTechnicians))
    return defaultTechnicians
  } catch (error) {
    console.error("Error loading technicians:", error)
    return defaultTechnicians
  }
}

export const saveTechnician = (technician: Omit<Technician, "id">): Technician => {
  const technicians = loadTechnicians()
  const newId = Math.max(...technicians.map((t) => t.id), 0) + 1

  const newTechnician: Technician = {
    ...technician,
    id: newId,
    rating: 5.0,
    activeProjects: 0,
    completedProjects: 0,
    joinDate: new Date().toISOString().split("T")[0],
    status: "available",
  }

  const updatedTechnicians = [...technicians, newTechnician]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTechnicians))

  return newTechnician
}

export const updateTechnician = (id: number, updates: Partial<Technician>): void => {
  const technicians = loadTechnicians()
  const updatedTechnicians = technicians.map((tech) => (tech.id === id ? { ...tech, ...updates } : tech))
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTechnicians))
}

export const deleteTechnician = (id: number): void => {
  const technicians = loadTechnicians()
  const updatedTechnicians = technicians.filter((tech) => tech.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTechnicians))
}
