export interface Project {
  id: string
  name: string
  client: string
  type: string
  status: string
  priority: string
  progress: number
  startDate: string
  estimatedCompletion: string
  technician: string
  location: string
  description: string
}

const PROJECTS_STORAGE_KEY = "ecoEnergy_projects"

// Mock projects data as default
const defaultProjects: Project[] = [
  {
    id: "PRJ-001",
    name: "Installation solaire - Maison Dubois",
    client: "Marie Dubois",
    type: "Installation solaire",
    status: "in-progress",
    priority: "high",
    progress: 65,
    startDate: "2024-01-05",
    estimatedCompletion: "2024-01-25",
    technician: "Jean Martin",
    location: "15 rue des Lilas, Paris 15e",
    description:
      "Installation de 12 panneaux solaires photovoltaïques sur toiture résidentielle avec onduleur et système de monitoring.",
  },
  {
    id: "PRJ-002",
    name: "Maintenance éolienne - Entreprise Tech",
    client: "TechCorp SARL",
    type: "Maintenance",
    status: "planning",
    priority: "medium",
    progress: 0,
    startDate: "2024-02-01",
    estimatedCompletion: "2024-02-15",
    technician: "Sophie Laurent",
    location: "Zone industrielle, Meaux",
    description: "Maintenance préventive des éoliennes avec contrôle des pales et du système électrique.",
  },
  {
    id: "PRJ-003",
    name: "Audit énergétique - Résidence Les Pins",
    client: "Syndic Les Pins",
    type: "Audit énergétique",
    status: "completed",
    priority: "low",
    progress: 100,
    startDate: "2023-12-10",
    estimatedCompletion: "2023-12-20",
    technician: "Pierre Durand",
    location: "Résidence Les Pins, Boulogne",
    description: "Audit énergétique complet avec recommandations d'amélioration et rapport détaillé.",
  },
  {
    id: "PRJ-004",
    name: "Réparation onduleur - Villa Martin",
    client: "Jean Martin",
    type: "Réparation",
    status: "on-hold",
    priority: "urgent",
    progress: 25,
    startDate: "2024-01-15",
    estimatedCompletion: "2024-01-20",
    technician: "Marie Rousseau",
    location: "Villa Martin, Versailles",
    description: "Réparation d'urgence de l'onduleur principal suite à une panne électrique.",
  },
]

export function getProjects(): Project[] {
  if (typeof window === "undefined") return defaultProjects

  try {
    const stored = localStorage.getItem(PROJECTS_STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
    // Initialize with default projects if none exist
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(defaultProjects))
    return defaultProjects
  } catch (error) {
    console.error("Error loading projects:", error)
    return defaultProjects
  }
}

export function saveProject(project: Omit<Project, "id">): Project {
  const projects = getProjects()

  // Generate new ID
  const newId = `PRJ-${String(projects.length + 1).padStart(3, "0")}`

  const newProject: Project = {
    ...project,
    id: newId,
    progress: 0, // New projects start at 0% progress
  }

  const updatedProjects = [...projects, newProject]

  try {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updatedProjects))
  } catch (error) {
    console.error("Error saving project:", error)
    throw new Error("Failed to save project")
  }

  return newProject
}

export function updateProject(id: string, updates: Partial<Project>): Project | null {
  const projects = getProjects()
  const index = projects.findIndex((p) => p.id === id)

  if (index === -1) return null

  const updatedProject = { ...projects[index], ...updates }
  projects[index] = updatedProject

  try {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects))
  } catch (error) {
    console.error("Error updating project:", error)
    throw new Error("Failed to update project")
  }

  return updatedProject
}

export function deleteProject(id: string): boolean {
  const projects = getProjects()
  const filteredProjects = projects.filter((p) => p.id !== id)

  if (filteredProjects.length === projects.length) return false

  try {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(filteredProjects))
  } catch (error) {
    console.error("Error deleting project:", error)
    throw new Error("Failed to delete project")
  }

  return true
}
