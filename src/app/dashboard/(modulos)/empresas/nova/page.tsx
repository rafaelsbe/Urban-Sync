import { CheckCircle2, FolderCog, Globe, MessageSquareText, Shield } from "lucide-react"

import { SectionHeader } from "@/app/dashboard/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NewCompanyPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Expansao comercial"
        title="Cadastrar nova empresa"
        description="Fluxo inicial para registrar uma nova conta no ecossistema UrbanSync. Neste MVP o formulario e visual e serve para validar a operacao interna."
      />

      <div className="w-full">
        <Card className="border-white/10 bg-card/80">
          <CardHeader>
            <CardTitle className="text-xl text-white">Dados da empresa</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="company-name">Nome da empresa</Label>
              <Input id="company-name" placeholder="Ex.: Horizonte Imoveis" className="border-white/10 bg-background/60" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="segment">Segmento</Label>
              <Select>
                <SelectTrigger id="segment" className="border-white/10 bg-background/60">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="imobiliaria">Imobiliaria</SelectItem>
                  <SelectItem value="construtora">Construtora</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Plano</Label>
              <Select>
                <SelectTrigger id="plan" className="border-white/10 bg-background/60">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="start">Start</SelectItem>
                  <SelectItem value="pro">Pro</SelectItem>
                  <SelectItem value="elite">Elite</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Cidade</Label>
              <Input id="city" placeholder="Aracaju" className="border-white/10 bg-background/60" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">Estado</Label>
              <Input id="state" placeholder="SE" className="border-white/10 bg-background/60" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="responsible">Responsavel</Label>
              <Input id="responsible" placeholder="Nome do gestor" className="border-white/10 bg-background/60" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email operacional</Label>
              <Input id="email" type="email" placeholder="operacao@empresa.com.br" className="border-white/10 bg-background/60" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="domain">Slug</Label>
              <Input id="domain" placeholder="empresa-exemplo" className="border-white/10 bg-background/60" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="whatsapp">Numero principal do WhatsApp</Label>
              <Input id="whatsapp" placeholder="(79) 99999-9999" className="border-white/10 bg-background/60" />
            </div>

            <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
              <Button className="bg-accent font-semibold text-accent-foreground hover:bg-accent/80">
                Salvar cadastro
              </Button>
              <Button variant="outline" className="border-white/10 bg-background/60 hover:bg-background">
                Salvar como rascunho
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
