export interface Invoice {
  id: number
  projectId: number
  projectName: string
  clientName: string
  clientEmail: string
  amount: number
  status: "pending" | "paid" | "overdue"
  dueDate: string
  createdDate: string
  description: string
  items: InvoiceItem[]
}

export interface InvoiceItem {
  description: string
  quantity: number
  unitPrice: number
  total: number
}

const STORAGE_KEY = "ecoenergy_invoices"

// Default invoices data
const defaultInvoices: Invoice[] = [
  {
    id: 1,
    projectId: 1,
    projectName: "Installation solaire résidentielle",
    clientName: "Sophie Dubois",
    clientEmail: "sophie.dubois@email.com",
    amount: 15000,
    status: "pending",
    dueDate: "2024-02-15",
    createdDate: "2024-01-15",
    description: "Installation de panneaux solaires 6kW",
    items: [
      { description: "Panneaux solaires 6kW", quantity: 1, unitPrice: 12000, total: 12000 },
      { description: "Installation et main d'œuvre", quantity: 1, unitPrice: 3000, total: 3000 },
    ],
  },
  {
    id: 2,
    projectId: 2,
    projectName: "Éolienne domestique",
    clientName: "Marc Lefevre",
    clientEmail: "marc.lefevre@email.com",
    amount: 8500,
    status: "paid",
    dueDate: "2024-01-30",
    createdDate: "2024-01-01",
    description: "Installation éolienne 3kW",
    items: [
      { description: "Éolienne 3kW", quantity: 1, unitPrice: 7000, total: 7000 },
      { description: "Installation", quantity: 1, unitPrice: 1500, total: 1500 },
    ],
  },
]

export const loadInvoices = (): Invoice[] => {
  if (typeof window === "undefined") return defaultInvoices

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
    // Initialize with default data if nothing stored
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultInvoices))
    return defaultInvoices
  } catch (error) {
    console.error("Error loading invoices:", error)
    return defaultInvoices
  }
}

export const saveInvoice = (invoice: Omit<Invoice, "id" | "createdDate">): Invoice => {
  const invoices = loadInvoices()
  const newId = Math.max(...invoices.map((i) => i.id), 0) + 1

  const newInvoice: Invoice = {
    ...invoice,
    id: newId,
    createdDate: new Date().toISOString().split("T")[0],
  }

  const updatedInvoices = [...invoices, newInvoice]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedInvoices))

  return newInvoice
}

export const updateInvoice = (id: number, updates: Partial<Invoice>): void => {
  const invoices = loadInvoices()
  const updatedInvoices = invoices.map((invoice) => (invoice.id === id ? { ...invoice, ...updates } : invoice))
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedInvoices))
}

export const deleteInvoice = (id: number): void => {
  const invoices = loadInvoices()
  const updatedInvoices = invoices.filter((invoice) => invoice.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedInvoices))
}
