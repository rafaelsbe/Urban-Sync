// import { BellRing, Globe, LockKeyhole, Palette } from "lucide-react"
import { Globe } from "lucide-react"
import { SectionHeader } from "@/app/dashboard/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function DashboardSettingsPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Operacao interna"
        title="Configuracoes do dashboard"
        description="Area inicial para preferencias do time UrbanSync. Neste MVP, os campos funcionam como interface base para futuras integracoes."
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="border-white/10 bg-card/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-white">
              <Globe className="h-5 w-5 text-accent" />
              Dados da empresa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="operation-name">Nome interno</Label>
              <Input id="operation-name" defaultValue="UrbanSync Admin" className="border-white/10 bg-background/60" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="operation-email">Email principal</Label>
              <Input id="operation-email" defaultValue="admin@urbansync.com.br" className="border-white/10 bg-background/60" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="support-phone">Telefone de suporte</Label>
              <Input id="support-phone" defaultValue="(79) 99999-9999" className="border-white/10 bg-background/60" />
            </div>
            <Button className="bg-accent font-semibold text-accent-foreground hover:bg-accent/80">
              Salvar alteracoes
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
