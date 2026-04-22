"use client"

import {
  Activity,
  BadgeDollarSign,
  Building2,
  Target,
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
  revenue: {
    label: "Receita",
    color: "#54B4CE",
  },
}

const barChartConfig = {
  sales: {
    label: "Vendas",
    color: "#283766",
  },
}

const pieChartConfig = {
  whatsapp: { label: "WhatsApp", color: "#54B4CE" },
  site: { label: "Site", color: "#2A5FA8" },
  upgrade: { label: "Upgrade", color: "#7CC9DB" },
}

export default function DashboardHomePage() {
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
