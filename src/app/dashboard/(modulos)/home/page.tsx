"use client"

import { useEffect, useState } from "react"
import {
  Activity,
  BadgeDollarSign,
  Building2,
  Target,
  User,
  CheckCircle2,
  Clock,
  MessageSquare
} from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
} from "recharts"

import { supabase } from "@/lib/supabase" // ⬅️ IMPORTANTE: Ajuste o caminho para o seu cliente do Supabase
import { SectionHeader } from "@/app/dashboard/components/ui/section-header"
import { StatCard } from "@/app/dashboard/components/ui/stat-card"
import {
  dashboardCompanies,
  dashboardSummary,
  monthlyRevenueSeries,
  pipelineStages,
  recentSales,
  salesByChannel,
} from "@/app/dashboard/helpers/dashboard-data"
import { formatCurrency } from "@/app/dashboard/helpers/format"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"

const lineChartConfig = {
  revenue: { label: "Receita", color: "#54B4CE" },
}

const barChartConfig = {
  sales: { label: "Vendas", color: "#283766" },
}

const pieChartConfig = {
  whatsapp: { label: "WhatsApp", color: "#54B4CE" },
  site: { label: "Site", color: "#2A5FA8" },
  upgrade: { label: "Upgrade", color: "#7CC9DB" },
}

export default function DashboardHomePage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  interface Lead {
    id: string; // ou number, dependendo de como está no Supabase
    phone: string;
    name: string | null;
    service: string | null;
    current_step: string | null;
    status: string;
    created_at?: string;
  }

  // 1. CARREGA OS LEADS DO SUPABASE E ESCUTA EM TEMPO REAL (REALTIME)
  useEffect(() => {
    async function fetchLeads() {
      try {
        const { data, error } = await supabase
          .from("leads")
          .select("*")
          .order("created_at", { ascending: false })

        if (!error && data) setLeads(data)
      } catch (err) {
        console.error("Erro ao buscar leads no dashboard:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchLeads()

    // Inscreve no canal Realtime do Supabase para escutar inserções e atualizações automáticas do Bot
    const channel = supabase
      .channel("realtime-leads-dashboard")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "leads" },
        (payload) => {
          if (payload.eventType === "INSERT") {

            // Adicionado 'as Lead' para o TypeScript aceitar o novo registro na lista
            setLeads((prev) => [payload.new as Lead, ...prev])
          } else if (payload.eventType === "UPDATE") {
            setLeads((prev) =>

              // Adicionado 'as Lead' no payload.new
              prev.map((item) => (item.id === (payload.new as Lead).id ? (payload.new as Lead) : item))
            )
          } else if (payload.eventType === "DELETE") {
            setLeads((prev) =>
              
              // Adicionado 'as Lead' no payload.old para conseguir ler a propriedade .id sem erros
              prev.filter((item) => item.id !== (payload.old as Lead).id)
            )
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // 2. FUNÇÃO PARA ATUALIZAR STATUS PELO PAINEL (Ex: Mover para em atendimento ou concluído)
  const handleUpdateStatus = async (phone: string, nextStatus: string) => {
    try {
      await supabase
        .from("leads")
        .update({ status: nextStatus })
        .eq("phone", phone)
    } catch (err) {
      console.error("Erro ao atualizar status do lead:", err)
    }
  }

  // Filtra as listas locais para alimentar as colunas do CRM
  const leadsAbertos = leads.filter((l) => l.status === "aberto" || !l.status)
  const leadsEmAtendimento = leads.filter((l) => l.status === "em atendimento")
  const leadsConcluidos = leads.filter((l) => l.status === "concluido")

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Painel interno"
        title="Operacao comercial da UrbanSync"
        description="Esta area resume o desempenho do negocio, o crescimento das empresas ativas e a performance dos canais de venda do MVP."
        action={
          <Link href="/dashboard/empresas/nova">
            <Button className="bg-accent font-semibold text-accent-foreground hover:bg-accent/80">
              Cadastrar empresa
            </Button>
          </Link>
        }
      />

      {/* Indicadores Principais */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Receita mensal"
          value={formatCurrency(dashboardSummary.monthlyRevenue)}
          icon={BadgeDollarSign}
          delta="+26% no mes"
          hint="recorrencia ativa"
        />
        <StatCard
          title="Empresas ativas"
          value={dashboardSummary.activeCompanies.toString()}
          icon={Building2}
          delta="+3 novas contas"
          hint="base em expansao"
        />
        <StatCard
          title="Vendas do mes"
          value={dashboardSummary.salesThisMonth.toString()}
          icon={Target}
          delta="+18% em conversao"
          hint="comparado ao mes anterior"
        />
        <StatCard
          title="Leads qualificados"
          value={dashboardSummary.qualifiedLeads.toString()}
          icon={Activity}
          delta={`${dashboardSummary.conversionRate}% de taxa`}
          hint="vindos do site e WhatsApp"
        />
      </div>

      {/* --- SEÇÃO KANBAN DE ATENDIMENTOS DO BOT EM TEMPO REAL --- */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-accent" /> Gestão de clientes
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* COLUNA: ABERTO / COLETANDO DADOS */}
          <Card className="border-white/10 bg-card/40 backdrop-blur-sm">
            <CardHeader className="pb-3 border-b border-white/5 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-400" /> Coleta/Aberto
              </CardTitle>
              <Badge className="bg-amber-400/10 text-amber-300 border-none">{leadsAbertos.length}</Badge>
            </CardHeader>
            <CardContent className="pt-4 space-y-3 max-h-[400px] overflow-y-auto">
              {loading ? (
                <div className="text-sm text-muted-foreground text-center py-4">Carregando leads...</div>
              ) : leadsAbertos.length === 0 ? (
                <div className="text-sm text-muted-foreground text-center py-4">Nenhum lead nesta etapa.</div>
              ) : (
                leadsAbertos.map((lead) => (
                  <div key={lead.id} className="rounded-xl border border-white/10 bg-background/60 p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-muted-foreground">+{lead.phone}</span>
                      <Badge className="bg-white/5 text-white text-[10px] border-none capitalize">{lead.current_step?.replace('_', ' ')}</Badge>
                    </div>
                    <div className="text-sm font-medium text-white flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-accent" /> {lead.name || "Aguardando nome..."}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      <span className="font-medium text-white/70">Busca:</span> {lead.service || "Aguardando..."}
                    </div>
                    <Button
                      size="sm"
                      className="w-full text-xs h-7 bg-accent/20 text-accent hover:bg-accent/30 mt-1"
                      onClick={() => handleUpdateStatus(lead.phone, 'em atendimento')}
                    >
                      Assumir Atendimento
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* COLUNA: EM ATENDIMENTO */}
          <Card className="border-white/10 bg-card/40 backdrop-blur-sm">
            <CardHeader className="pb-3 border-b border-white/5 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
                <Activity className="h-4 w-4 text-accent" /> Em Atendimento
              </CardTitle>
              <Badge className="bg-accent/10 text-accent border-none">{leadsEmAtendimento.length}</Badge>
            </CardHeader>
            <CardContent className="pt-4 space-y-3 max-h-[400px] overflow-y-auto">
              {leadsEmAtendimento.length === 0 ? (
                <div className="text-sm text-muted-foreground text-center py-4">Nenhum operador atendendo.</div>
              ) : (
                leadsEmAtendimento.map((lead) => (
                  <div key={lead.id} className="rounded-xl border border-white/10 bg-background/60 p-3 space-y-2 border-l-2 border-l-accent">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-muted-foreground">+{lead.phone}</span>
                    </div>
                    <div className="text-sm font-semibold text-white">{lead.name}</div>
                    <div className="text-xs text-muted-foreground bg-white/5 p-1.5 rounded-md">
                      <span className="font-semibold text-accent">Serviço:</span> {lead.service}
                    </div>
                    <Button
                      size="sm"
                      className="w-full text-xs h-7 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 mt-1"
                      onClick={() => handleUpdateStatus(lead.phone, 'concluido')}
                    >
                      Marcar Concluído
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* COLUNA: CONCLUÍDO */}
          <Card className="border-white/10 bg-card/40 backdrop-blur-sm">
            <CardHeader className="pb-3 border-b border-white/5 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Concluído
              </CardTitle>
              <Badge className="bg-emerald-400/10 text-emerald-300 border-none">{leadsConcluidos.length}</Badge>
            </CardHeader>
            <CardContent className="pt-4 space-y-3 max-h-[400px] overflow-y-auto">
              {leadsConcluidos.length === 0 ? (
                <div className="text-sm text-muted-foreground text-center py-4">Nenhum lead finalizado hoje.</div>
              ) : (
                leadsConcluidos.map((lead) => (
                  <div key={lead.id} className="rounded-xl border border-white/5 bg-background/20 p-3 opacity-70">
                    <div className="text-xs font-mono text-muted-foreground">+{lead.phone}</div>
                    <div className="text-sm font-medium line-through text-muted-foreground">{lead.name}</div>
                    <div className="text-xs italic text-muted-foreground truncate">{lead.service}</div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      {/* --- FIM DA SEÇÃO KANBAN --- */}

      {/* Gráficos */}
      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card className="border-white/10 bg-card/80">
          <CardHeader>
            <CardTitle className="text-xl text-white">Receita e vendas por mes</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 lg:grid-cols-2">
            <ChartContainer config={lineChartConfig} className="h-[280px] w-full">
              <LineChart data={monthlyRevenueSeries}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-revenue)"
                  strokeWidth={3}
                  dot={{ fill: "var(--color-revenue)", r: 4 }}
                />
              </LineChart>
            </ChartContainer>

            <ChartContainer config={barChartConfig} className="h-[280px] w-full">
              <BarChart data={monthlyRevenueSeries}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="sales" fill="var(--color-sales)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-card/80">
          <CardHeader>
            <CardTitle className="text-xl text-white">Distribuicao dos canais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ChartContainer config={pieChartConfig} className="mx-auto h-[260px] max-w-[320px]">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={salesByChannel}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={62}
                  outerRadius={92}
                  paddingAngle={4}
                >
                  {salesByChannel.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>

            <div className="grid gap-3">
              {salesByChannel.map((entry) => (
                <div key={entry.name} className="flex items-center justify-between rounded-xl border border-white/10 bg-background/50 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm text-white">{entry.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-accent">{entry.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="border-white/10 bg-card/80">
          <CardHeader>
            <CardTitle className="text-xl text-white">Funil comercial</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {pipelineStages.map((stage) => (
              <div key={stage.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white">{stage.label}</span>
                  <span className="text-muted-foreground">
                    {stage.value} registros
                  </span>
                </div>
                <Progress value={stage.percentage} className="h-2 bg-white/5 [&>div]:bg-accent" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-card/80">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl text-white">Empresas com melhor tracao</CardTitle>
            <Link href="/dashboard/empresas">
              <Button variant="outline" className="border-white/10 bg-background/60 hover:bg-background">
                Ver empresas
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {dashboardCompanies.slice(0, 4).map((company) => (
              <div key={company.id} className="rounded-2xl border border-white/10 bg-background/40 p-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold text-white">{company.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {company.city}/{company.state} • {company.responsible}
                    </div>
                  </div>
                  <Badge className="bg-accent/20 text-accent">{company.plan}</Badge>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="rounded-xl bg-card px-3 py-2">
                    <div className="text-muted-foreground">Leads</div>
                    <div className="mt-1 font-semibold text-white">{company.leadsMonth}</div>
                  </div>
                  <div className="rounded-xl bg-card px-3 py-2">
                    <div className="text-muted-foreground">Vendas</div>
                    <div className="mt-1 font-semibold text-white">{company.salesMonth}</div>
                  </div>
                  <div className="rounded-xl bg-card px-3 py-2">
                    <div className="text-muted-foreground">MRR</div>
                    <div className="mt-1 font-semibold text-white">{formatCurrency(company.monthlyRevenue)}</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="border-white/10 bg-card/80">
        <CardHeader>
          <CardTitle className="text-xl text-white">Ultimas movimentacoes financeiras</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead>Empresa</TableHead>
                <TableHead>Plano</TableHead>
                <TableHead>Canal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentSales.map((sale) => (
                <TableRow key={sale.id} className="border-white/10">
                  <TableCell className="font-medium text-white">{sale.company}</TableCell>
                  <TableCell>{sale.plan}</TableCell>
                  <TableCell>{sale.channel}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        sale.status === "Pago"
                          ? "bg-emerald-500/10 text-emerald-300"
                          : sale.status === "Pendente"
                            ? "bg-amber-500/10 text-amber-300"
                            : "bg-red-500/10 text-red-300"
                      }
                    >
                      {sale.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-white">
                    {formatCurrency(sale.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}