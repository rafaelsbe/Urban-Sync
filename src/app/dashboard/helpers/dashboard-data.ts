export type DashboardCompany = {
  id: string
  name: string
  slug: string
  plan: "Start" | "Pro" | "Elite"
  status: "Ativa" | "Implantacao" | "Atencao"
  city: string
  state: string
  leadsMonth: number
  salesMonth: number
  monthlyRevenue: number
  responsible: string
}

export type DashboardSale = {
  id: string
  company: string
  plan: "Start" | "Pro" | "Elite"
  amount: number
  date: string
  status: "Pago" | "Pendente" | "Atrasado"
  channel: "WhatsApp" | "Site" | "Upgrade"
}

export const dashboardSummary = {
  monthlyRevenue: 18470,
  activeCompanies: 12,
  salesThisMonth: 27,
  qualifiedLeads: 316,
  conversionRate: 18.4,
  averageTicket: 684,
}

export const monthlyRevenueSeries = [
  { month: "Nov", revenue: 6200, sales: 8 },
  { month: "Dez", revenue: 8100, sales: 11 },
  { month: "Jan", revenue: 9200, sales: 13 },
  { month: "Fev", revenue: 11050, sales: 16 },
  { month: "Mar", revenue: 14600, sales: 21 },
  { month: "Abr", revenue: 18470, sales: 27 },
]

export const salesByChannel = [
  { name: "WhatsApp", value: 58, fill: "var(--color-whatsapp)", color: "#54B4CE" },
  { name: "Site", value: 27, fill: "var(--color-site)", color: "#2A5FA8" },
  { name: "Upgrade", value: 15, fill: "var(--color-upgrade)", color: "#7CC9DB" },
]

export const pipelineStages = [
  { label: "Novos leads", value: 316, percentage: 100 },
  { label: "Qualificados", value: 174, percentage: 55 },
  { label: "Reunioes", value: 63, percentage: 20 },
  { label: "Fechamentos", value: 27, percentage: 9 },
]

export const dashboardCompanies: DashboardCompany[] = [
  {
    id: "cmp-01",
    name: "Horizonte Imoveis",
    slug: "horizonte-imoveis",
    plan: "Elite",
    status: "Ativa",
    city: "Aracaju",
    state: "SE",
    leadsMonth: 54,
    salesMonth: 7,
    monthlyRevenue: 2500,
    responsible: "Amanda Cruz",
  },
  {
    id: "cmp-02",
    name: "Atlas Urbanismo",
    slug: "atlas-urbanismo",
    plan: "Pro",
    status: "Ativa",
    city: "Salvador",
    state: "BA",
    leadsMonth: 39,
    salesMonth: 5,
    monthlyRevenue: 1490,
    responsible: "Carlos Menezes",
  },
  {
    id: "cmp-03",
    name: "Nexus Realty",
    slug: "nexus-realty",
    plan: "Pro",
    status: "Atencao",
    city: "Recife",
    state: "PE",
    leadsMonth: 26,
    salesMonth: 3,
    monthlyRevenue: 1490,
    responsible: "Bianca Torres",
  },
  {
    id: "cmp-04",
    name: "Pilar Negocios",
    slug: "pilar-negocios",
    plan: "Start",
    status: "Implantacao",
    city: "Maceio",
    state: "AL",
    leadsMonth: 18,
    salesMonth: 2,
    monthlyRevenue: 890,
    responsible: "Rafael Nunes",
  },
  {
    id: "cmp-05",
    name: "Porto Residence",
    slug: "porto-residence",
    plan: "Elite",
    status: "Ativa",
    city: "Joao Pessoa",
    state: "PB",
    leadsMonth: 61,
    salesMonth: 6,
    monthlyRevenue: 2500,
    responsible: "Camila Prado",
  },
]

export const recentSales: DashboardSale[] = [
  {
    id: "sale-01",
    company: "Horizonte Imoveis",
    plan: "Elite",
    amount: 2500,
    date: "2026-04-18",
    status: "Pago",
    channel: "Upgrade",
  },
  {
    id: "sale-02",
    company: "Atlas Urbanismo",
    plan: "Pro",
    amount: 1490,
    date: "2026-04-15",
    status: "Pago",
    channel: "WhatsApp",
  },
  {
    id: "sale-03",
    company: "Nexus Realty",
    plan: "Pro",
    amount: 1490,
    date: "2026-04-13",
    status: "Pendente",
    channel: "Site",
  },
  {
    id: "sale-04",
    company: "Pilar Negocios",
    plan: "Start",
    amount: 890,
    date: "2026-04-10",
    status: "Pago",
    channel: "WhatsApp",
  },
  {
    id: "sale-05",
    company: "Porto Residence",
    plan: "Elite",
    amount: 2500,
    date: "2026-04-09",
    status: "Atrasado",
    channel: "Site",
  },
]

export const companyStatusDistribution = [
  { label: "Ativas", value: 9 },
  { label: "Implantacao", value: 2 },
  { label: "Atencao", value: 1 },
]
