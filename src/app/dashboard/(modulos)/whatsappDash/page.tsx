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
  Play,
  QrCode, // Adicionado para o ícone do QR
  AlertCircle
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

import { io, Socket } from 'socket.io-client'

// URL do back-end socket.io
const backEnd = 'http://localhost:3000'

type statusBot = 'connecting' | 'scan_me' | 'ready' | 'disconnected';

interface Lead {
  id: string;
  phone: string;
  name: string | null;
  service: string | null;
  current_step: string | null;
  status: string;
  created_at: string;
}

const currentCompanyId = "id_da_empresa_logada";

export default function WhatsAppDashPage() {
  const [status, setStatus] = useState<statusBot>('connecting')
  const [qrCode, setQrCodeUrl] = useState('')

  const [leads, setLeads] = useState<Lead[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  // 1. Conexão em tempo real com o Bot do WhatsApp via WebSockets
  useEffect(() => {
    const socket: Socket = io(backEnd, {
      query: {
        companyId: currentCompanyId
      }
    });

    socket.on('status', (botStatus: statusBot) => {
      setStatus(botStatus);
    });

    socket.on('qr_code', (url: string) => {
      setQrCodeUrl(url);
    });

    return () => {
      socket.disconnect();
    };
  }, [currentCompanyId]); // CORRIGIDO: Adicionado o array de dependências vazio para evitar conexões infinitas

  // 2. Busca inicial de dados + Realtime Supabase
  useEffect(() => {
    async function fetchLeads() {
      try {
        const { data, error } = await supabase
          .from("leads")
          .select("*")
          .eq("company_id", currentCompanyId) //Traz apenas leads dessa empresa
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
      .channel(`realtime-company-${currentCompanyId}`)
      .on(
        "postgres_changes",
        { 
          event: "*", 
          schema: "public", 
          table: "leads",
          filter: `company_id=eq.${currentCompanyId}`
        },
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
  }, [currentCompanyId]) // CORRIGIDO: Adicionado o array de dependências vazio para evitar múltiplas assinaturas

  // 3. Filtro dinâmico da tabela
  const filteredLeads = leads.filter((lead) => {
    const term = searchTerm.toLowerCase()
    return (
      (lead.name?.toLowerCase().includes(term) ?? false) ||
      lead.phone.includes(term) ||
      (lead.service?.toLowerCase().includes(term) ?? false)
    );
  })

  // Métricas rápidas
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

      {/* SEÇÃO INJETADA: Interface de Autenticação do WhatsApp */}
      {status !== 'ready' ? (
        <Card className="border-white/10 bg-card/40 backdrop-blur-md p-12 text-center flex flex-col items-center justify-center min-h-[450px]">
          <div className="max-w-md space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <h3 className="text-xl font-bold text-white">Conecte o WhatsApp para Acessar</h3>
                {status === 'scan_me' && <Badge className="bg-amber-500/10 text-amber-400 border-none animate-pulse">Aguardando Leitura</Badge>}
                {status === 'connecting' && <Badge className="bg-white/5 text-muted-foreground border-none">Sincronizando...</Badge>}
                {status === 'disconnected' && <Badge className="bg-rose-500/10 text-rose-400 border-none">Desconectado</Badge>}
              </div>
              <p className="text-sm text-muted-foreground">
                {status === 'scan_me' && "Para visualizar a base completa de leads e métricas em tempo real, realize o pareamento do aparelho utilizando o código abaixo."}
                {status === 'connecting' && "Estabelecendo comunicação com o servidor local do WhatsApp. Aguarde um instante..."}
                {status === 'disconnected' && "O bot está offline ou o aparelho foi desconectado. Inicialize o servidor no terminal para gerar um novo acesso."}
              </p>
            </div>

            {/* Container do QR Code Centralizado */}
            <div className="w-[240px] h-[240px] bg-background/80 border border-white/5 rounded-2xl flex items-center justify-center p-3 mx-auto shadow-inner overflow-hidden">
              {status === 'scan_me' && qrCode ? (
                <img src={qrCode} alt="WhatsApp Web QR Code" className="w-full h-full object-contain rounded-xl" />
              ) : (
                <div className="text-center space-y-2 text-muted-foreground p-4">
                  <QrCode className="h-10 w-10 mx-auto stroke-[1.5] opacity-30 animate-pulse" />
                  <span className="text-xs block text-muted-foreground/70">Aguardando sinal do servidor...</span>
                </div>
              )}
            </div>

            {status === 'scan_me' && (
              <p className="text-xs text-muted-foreground/80 bg-background/30 px-4 py-2.5 rounded-lg border border-white/5 max-w-sm mx-auto">
                Abra o WhatsApp no celular &gt; Configurações &gt; Aparelhos Conectados &gt; Escanear QR Code.
              </p>
            )}
          </div>
        </Card>
      ) : (
        /* Se o WhatsApp ESTIVER pronto (ready), renderiza todo o restante do Dashboard */
        <>
          {/* Banner discreto de sucesso no topo (opcional para feedback visual) */}
          <Card className="border-emerald-500/10 bg-emerald-500/5 backdrop-blur-sm px-6 py-4 flex items-center justify-between rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <p className="text-sm text-emerald-400 font-medium">Servidor conectado com sucesso à conta corporativa.</p>
            </div>
            <Badge className="bg-emerald-500/10 text-emerald-400 border-none">Sessão Ativa</Badge>
          </Card>

          {/* Barra de Pesquisa */}
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
                          <TableCell className="font-semibold text-white py-4">
                            <div className="flex items-center gap-2">
                              <User className="h-3.5 w-3.5 text-accent/70" />
                              {lead.name || <span className="text-muted-foreground/60 font-normal italic">Aguardando preenchimento...</span>}
                            </div>
                          </TableCell>

                          <TableCell className="text-white/80 font-mono">
                            <div className="flex items-center gap-1.5">
                              <Phone className="h-3 w-3 text-muted-foreground" />
                              +{lead.phone}
                            </div>
                          </TableCell>

                          <TableCell>
                            <Badge variant="outline" className="border-white/10 bg-background/50 text-white/70 capitalize px-2 py-0.5 text-[11px]">
                              <Layers className="h-2.5 w-2.5 mr-1 text-muted-foreground" />
                              {lead.current_step?.replace("_", " ") || "Início"}
                            </Badge>
                          </TableCell>

                          <TableCell>
                            <Badge
                              className={`border-none font-semibold text-[11px] px-2.5 py-0.5 rounded-full ${lead.status === "concluido"
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

                          <TableCell className="text-muted-foreground text-sm max-w-[200px] truncate">
                            {lead.service || <span className="text-muted-foreground/40 italic">Nenhum informado</span>}
                          </TableCell>

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
        </>
      )}
    </div>
  )
}