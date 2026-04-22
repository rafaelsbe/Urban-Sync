import { LucideIcon, TrendingUp } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function StatCard({
  title,
  value,
  icon: Icon,
  delta,
  hint,
}: {
  title: string
  value: string
  icon: LucideIcon
  delta: string
  hint: string
}) {
  return (
    <Card className="border-white/10 bg-card/80">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="rounded-xl bg-accent/15 p-2">
          <Icon className="h-4 w-4 text-accent" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-white">{value}</div>
        <div className="mt-3 flex items-center gap-3">
          <Badge className="gap-1 bg-emerald-500/10 text-emerald-300">
            <TrendingUp className="h-3 w-3" />
            {delta}
          </Badge>
          <span className="text-xs text-muted-foreground">{hint}</span>
        </div>
      </CardContent>
    </Card>
  )
}
