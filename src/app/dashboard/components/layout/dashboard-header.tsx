"use client"

import { useMemo } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Bell, LogOut, Search } from "lucide-react"

import { clearDashboardSession } from "@/app/dashboard/helpers/auth"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"

const titles: Record<string, { title: string; description: string }> = {
  "/dashboard/home": {
    title: "Visao geral",
    description: "Acompanhe receita, operacao comercial e desempenho das empresas.",
  },
  "/dashboard/empresas": {
    title: "Empresas",
    description: "Gerencie as contas ativas, implantacoes e responsaveis.",
  },
  "/dashboard/empresas/nova": {
    title: "Nova empresa",
    description: "Cadastre uma nova operacao para entrar no ecossistema UrbanSync.",
  },
  "/dashboard/vendas": {
    title: "Vendas",
    description: "Visualize faturamento, canais de conversao e cobrancas.",
  },
  "/dashboard/configuracoes": {
    title: "Configuracoes",
    description: "Defina preferencias internas e parametros operacionais.",
  },
}

export function DashboardHeader() {
  const pathname = usePathname()
  const router = useRouter()

  const pageMeta = useMemo(() => {
    return (
      titles[pathname] ?? {
        title: "Dashboard",
        description: "Painel administrativo da UrbanSync.",
      }
    )
  }, [pathname])

  function handleLogout() {
    clearDashboardSession()
    router.replace("/dashboard/login")
  }

  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="flex flex-col gap-4 px-4 py-4 md:px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="border border-white/10 bg-card hover:bg-card/80" />
            <div>
              <h1 className="text-xl font-semibold text-white">{pageMeta.title}</h1>
              <p className="text-sm text-muted-foreground">{pageMeta.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-10 gap-3 rounded-full border border-white/10 bg-card px-2 hover:bg-card/80">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-accent/20 text-accent">US</AvatarFallback>
                  </Avatar>
                  <div className="hidden text-left md:block">
                    <div className="text-sm font-medium text-white">UrbanSync</div>
                    <div className="text-xs text-muted-foreground">Administrador</div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 border-white/10 bg-card">
                <DropdownMenuLabel>Conta interna</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/dashboard/configuracoes")}>
                  Configuracoes
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-300 focus:text-red-200">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar empresas, vendas ou responsaveis..."
            className="border-white/10 bg-card pl-10 text-sm"
          />
        </div>
      </div>
    </header>
  )
}
