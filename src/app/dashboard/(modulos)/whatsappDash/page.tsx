"use client"

import { useEffect, useState } from "react"
import { 
  MessageSquare, 
  Search, 
  User, 
  Phone, 
  Layers, 
  CheckCircle2, 
  Clock, 
  Play
} from "lucide-react"

import { supabase } from "@/lib/supabase" // Ajuste o caminho se necessário
import { SectionHeader } from "@/app/dashboard/components/ui/section-header"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// 1. Definição da interface para evitar erros de tipagem do TypeScript
interface Lead {
  id: string;
  phone: string;
  name: string | null;
  service: string | null;
  current_step: string | null;
  status: string;
  created_at: string;
}

export default function WhatsAppDashPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  // 2. Busca inicial de dados + Realtime
  useEffect(() => {
    async function fetchLeads() {
      try {
        const { data, error } = await supabase
          .from("leads")
          .select("*")
          .order("created_at", { ascending: false })

        if (!error && data) setLeads(data as Lead[])
      } catch (err) {
        console.error("Erro ao buscar contatos do WhatsApp:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchLeads()

    const channel = supabase
      .channel("realtime-whatsapp-dash")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "leads" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setLeads((prev) => [payload.new as Lead, ...prev])
          } else if (payload.eventType === "UPDATE") {
            setLeads((prev) =>
              prev.map((item) => (item.id === (payload.new as Lead).id ? (payload.new as Lead) : item))
            )
          } else if (payload.eventType === "DELETE") {
            setLeads((prev) => prev.filter((item) => item.id !== (payload.old as Lead).id))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // 3. Filtro dinâmico da tabela pela barra de busca (Nome, Telefone ou Serviço)
  const filteredLeads = leads.filter((lead) => {
    const term = searchTerm.toLowerCase()
    return (
      (lead.name?.toLowerCase().includes(term) ?? false) ||
      lead.phone.includes(term) ||
      (lead.service?.toLowerCase().includes(term) ?? false)
    );
  })

  // Métricas rápidas para os cards do topo (estilo imagem_b33d7e.png)
  const totalAbertos = leads.filter((l) => l.status === "aberto").length
  const totalAtendimento = leads.filter((l) => l.status === "em atendimento").length
  const totalConcluidos = leads.filter((l) => l.status === "concluido").length

  return (
    <div className="space-y-8">
      {/* Cabeçalho da Página */}
      <SectionHeader
        eyebrow="Operação interna"
        title="WhatsApp Painel"
        description="Gerencie todas as interações e cadastros automáticos coletados pelo robô do WhatsApp em tempo real."
      />

      {/* Barra de Pesquisa Estilizada igual à imagem_b33d7e.png */}
      <div className="relative max-w-xl">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar contatos, números ou serviços de interesse..."
          className="pl-10 pr-4 h-11 bg-card border-white/5 text-white placeholder:text-muted-foreground focus-visible:ring-accent rounded-xl"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Cards de Destaque / Resumo Rápido */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-white/10 bg-card/40 backdrop-blur-sm p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">Aguardando Nome / Início</div>
            <div className="text-2xl font-bold text-white mt-0.5">{totalAbertos} leads</div>
          </div>
        </Card>

        <Card className="border-white/10 bg-card/40 backdrop-blur-sm p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-accent/10 text-accent">
            <Play className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">Em Atendimento Humano</div>
            <div className="text-2xl font-bold text-white mt-0.5">{totalAtendimento} ativos</div>
          </div>
        </Card>

        <Card className="border-white/10 bg-card/40 backdrop-blur-sm p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">Atendimentos Concluídos</div>
            <div className="text-2xl font-bold text-white mt-0.5">{totalConcluidos} finalizados</div>
          </div>
        </Card>
      </div>

      {/* Tabela de Base Completa de Contatos */}
      <Card className="border-white/10 bg-card/80">
        <CardContent className="pt-6">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-white">Base completa de contatos</h3>
          </div>

          <div className="rounded-xl border border-white/5 overflow-hidden">
            <Table>
              <TableHeader className="bg-background/40">
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-muted-foreground font-medium">Nome do Lead</TableHead>
                  <TableHead className="text-muted-foreground font-medium">WhatsApp</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Etapa do Bot</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Status Comercial</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Interesse / Serviço</TableHead>
                  <TableHead className="text-muted-foreground font-medium text-right">Data de Entrada</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow className="border-white/5">
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Carregando dados da tabela...
                    </TableCell>
                  </TableRow>
                ) : filteredLeads.length === 0 ? (
                  <TableRow className="border-white/5">
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Nenhum contato encontrado na base de dados.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLeads.map((lead) => (
                    <TableRow key={lead.id} className="border-white/5 hover:bg-white/[0.02] transition-colors">
                      {/* Nome do Lead */}
                      <TableCell className="font-semibold text-white py-4">
                        <div className="flex items-center gap-2">
                          <User className="h-3.5 w-3.5 text-accent/70" />
                          {lead.name || <span className="text-muted-foreground/60 font-normal italic">Aguardando preenchimento...</span>}
                        </div>
                      </TableCell>

                      {/* WhatsApp */}
                      <TableCell className="text-white/80 font-mono">
                        <div className="flex items-center gap-1.5">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          +{lead.phone}
                        </div>
                      </TableCell>

                      {/* Etapa Atual do Bot */}
                      <TableCell>
                        <Badge variant="outline" className="border-white/10 bg-background/50 text-white/70 capitalize px-2 py-0.5 text-[11px]">
                          <Layers className="h-2.5 w-2.5 mr-1 text-muted-foreground" />
                          {lead.current_step?.replace("_", " ") || "Início"}
                        </Badge>
                      </TableCell>

                      {/* Status de Atendimento Estilizado */}
                      <TableCell>
                        <Badge
                          className={`border-none font-semibold text-[11px] px-2.5 py-0.5 rounded-full ${
                            lead.status === "concluido"
                              ? "bg-emerald-500/10 text-emerald-300"
                              : lead.status === "em atendimento"
                              ? "bg-accent/20 text-accent"
                              : "bg-amber-500/10 text-amber-300"
                          }`}
                        >
                          {lead.status === "concluido" && "Concluído"}
                          {lead.status === "em atendimento" && "Em Atendimento"}
                          {(lead.status === "aberto" || !lead.status) && "Aberto"}
                        </Badge>
                      </TableCell>

                      {/* Interesse / Serviço */}
                      <TableCell className="text-muted-foreground text-sm max-w-[200px] truncate">
                        {lead.service || <span className="text-muted-foreground/40 italic">Nenhum informado</span>}
                      </TableCell>

                      {/* Data de Entrada */}
                      <TableCell className="text-right text-muted-foreground text-sm font-medium">
                        {lead.created_at ? new Date(lead.created_at).toLocaleDateString("pt-BR") : "—"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}