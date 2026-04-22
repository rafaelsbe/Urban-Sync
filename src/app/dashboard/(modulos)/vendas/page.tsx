import { CircleDollarSign, ReceiptText, Wallet } from "lucide-react"

import { SectionHeader } from "@/app/dashboard/components/ui/section-header"
import { StatCard } from "@/app/dashboard/components/ui/stat-card"
import { recentSales } from "@/app/dashboard/helpers/dashboard-data"
import { formatCurrency, formatDate } from "@/app/dashboard/helpers/format"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function DashboardSalesPage() {
  const paidRevenue = recentSales
    .filter((sale) => sale.status === "Pago")
    .reduce((total, sale) => total + sale.amount, 0)

  const pendingRevenue = recentSales
    .filter((sale) => sale.status !== "Pago")
    .reduce((total, sale) => total + sale.amount, 0)

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Financeiro"
        title="Vendas e faturamento"
        description="Resumo operacional das ultimas cobrancas, upgrades e novas vendas da UrbanSync."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Recebido"
          value={formatCurrency(paidRevenue)}
          icon={Wallet}
          delta="+21% no ciclo"
          hint="pagamentos confirmados"
        />
        <StatCard
          title="A receber"
          value={formatCurrency(pendingRevenue)}
          icon={ReceiptText}
          delta="2 contas abertas"
          hint="pendencias do periodo"
        />
        <StatCard
          title="Ticket medio"
          value={formatCurrency(1774)}
          icon={CircleDollarSign}
          delta="+12% em upsell"
          hint="considerando upgrades e novos contratos"
        />
      </div>

      <Card className="border-white/10 bg-card/80">
        <CardHeader>
          <CardTitle className="text-xl text-white">Lancamentos recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead>Empresa</TableHead>
                <TableHead>Plano</TableHead>
                <TableHead>Canal</TableHead>
                <TableHead>Data</TableHead>
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
                  <TableCell>{formatDate(sale.date)}</TableCell>
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
