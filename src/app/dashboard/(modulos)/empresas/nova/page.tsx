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

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
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
                  <SelectItem value="incorporadora">Incorporadora</SelectItem>
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
              <Label htmlFor="domain">Dominio ou subdominio</Label>
              <Input id="domain" placeholder="painel.empresa.com.br" className="border-white/10 bg-background/60" />
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

        <div className="space-y-6">
          <Card className="border-white/10 bg-card/80">
            <CardHeader>
              <CardTitle className="text-xl text-white">Checklist de onboarding</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { icon: Globe, text: "Definir dominio ou subdominio da operacao." },
                { icon: MessageSquareText, text: "Conectar instancia principal do WhatsApp." },
                { icon: FolderCog, text: "Validar textos do site, branding e contatos." },
                { icon: Shield, text: "Preparar acessos internos da equipe da empresa." },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3 rounded-xl border border-white/10 bg-background/40 p-4">
                  <div className="rounded-lg bg-accent/15 p-2">
                    <item.icon className="h-4 w-4 text-accent" />
                  </div>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-card/80">
            <CardHeader>
              <CardTitle className="text-xl text-white">Fluxo esperado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                "Cadastro interno da empresa e plano contratado.",
                "Criacao do site da operacao com dados mockados ou reais.",
                "Configuracao do dashboard da empresa em etapa posterior.",
                "Ativacao do atendimento via WhatsApp e acompanhamento comercial.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-accent" />
                  <p className="text-sm text-muted-foreground">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
