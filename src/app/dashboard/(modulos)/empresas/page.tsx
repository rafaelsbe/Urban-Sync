import Link from "next/link"
import { Building2, MapPin, Plus, Users } from "lucide-react"

import { SectionHeader } from "@/app/dashboard/components/ui/section-header"
import { dashboardCompanies } from "@/app/dashboard/helpers/dashboard-data"
import { formatCurrency } from "@/app/dashboard/helpers/format"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function DashboardCompaniesPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Gestao de contas"
        title="Empresas cadastradas"
        description="Controle operacional das empresas clientes, responsaveis, planos contratados e receita recorrente mensal."
        action={
          <Link href="/dashboard/empresas/nova">
            <Button className="bg-accent font-semibold text-accent-foreground hover:bg-accent/80">
              <Plus className="mr-2 h-4 w-4" />
              Nova empresa
            </Button>
          </Link>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {dashboardCompanies.slice(0, 3).map((company) => (
          <Card key={company.id} className="border-white/10 bg-card/80">
            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-accent/15 p-2">
                  <Building2 className="h-5 w-5 text-accent" />
                </div>
                <Badge
                  className={
                    company.status === "Ativa"
                      ? "bg-emerald-500/10 text-emerald-300"
                      : company.status === "Implantacao"
                        ? "bg-amber-500/10 text-amber-300"
                        : "bg-red-500/10 text-red-300"
                  }
                >
                  {company.status}
                </Badge>
              </div>
              <div>
                <CardTitle className="text-xl text-white">{company.name}</CardTitle>
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-accent" />
                  {company.city}/{company.state}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-background/60 p-3">
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Plano</div>
                  <div className="mt-1 font-semibold text-white">{company.plan}</div>
                </div>
                <div className="rounded-xl bg-background/60 p-3">
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">MRR</div>
                  <div className="mt-1 font-semibold text-white">{formatCurrency(company.monthlyRevenue)}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-background/40 px-4 py-3 text-sm">
                <Users className="h-4 w-4 text-accent" />
                <div>
                  <div className="font-medium text-white">{company.responsible}</div>
                  <div className="text-muted-foreground">
                    {company.leadsMonth} leads e {company.salesMonth} vendas neste mes
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-white/10 bg-card/80">
        <CardHeader>
          <CardTitle className="text-xl text-white">Base completa de empresas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead>Empresa</TableHead>
                <TableHead>Responsavel</TableHead>
                <TableHead>Plano</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Leads</TableHead>
                <TableHead>Vendas</TableHead>
                <TableHead className="text-right">Receita mensal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dashboardCompanies.map((company) => (
                <TableRow key={company.id} className="border-white/10">
                  <TableCell>
                    <div className="font-medium text-white">{company.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {company.city}/{company.state}
                    </div>
                  </TableCell>
                  <TableCell>{company.responsible}</TableCell>
                  <TableCell>{company.plan}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        company.status === "Ativa"
                          ? "bg-emerald-500/10 text-emerald-300"
                          : company.status === "Implantacao"
                            ? "bg-amber-500/10 text-amber-300"
                            : "bg-red-500/10 text-red-300"
                      }
                    >
                      {company.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{company.leadsMonth}</TableCell>
                  <TableCell>{company.salesMonth}</TableCell>
                  <TableCell className="text-right font-semibold text-white">
                    {formatCurrency(company.monthlyRevenue)}
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
