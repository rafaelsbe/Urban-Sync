"use client"

import { FormEvent, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Building2, ShieldCheck } from "lucide-react"

import { hasDashboardSession, setDashboardSession } from "@/app/dashboard/helpers/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function DashboardLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (hasDashboardSession()) {
      router.replace("/dashboard/home")
    }
  }, [router])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    window.setTimeout(() => {
      setDashboardSession()
      router.replace("/dashboard/home")
    }, 400)
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-[520px_1fr]">
        <section className="flex items-center justify-center border-b border-white/5 bg-background/80 px-6 py-10 backdrop-blur-md">
          <div className="w-full max-w-[360px]">
            <div className="mb-12">
              <Link href="/" className="flex items-center gap-2 group w-fit">
                <div className="rounded-lg bg-accent p-2 transition-transform group-hover:rotate-6">
                  <Building2 className="h-6 w-6 text-accent-foreground" />
                </div>
                <span className="font-headline text-2xl font-bold tracking-tighter text-white">
                  Urban<span className="text-accent">Sync</span>
                </span>
              </Link>
            </div>

            <div className="mb-8 space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                <ShieldCheck className="h-4 w-4" />
                Acesso interno
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white">
                Login do dashboard geral
              </h1>
              <p className="text-white/75">
                Area exclusiva da equipe UrbanSync para operar empresas, vendas e configuracoes do ecossistema.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-white">
                  Email interno
                </label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="admin@urbansync.com.br"
                  className="h-12 border-white/10 bg-card/70"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-white">
                  Senha
                </label>
                <Input
                  id="password"
                  type="password"
                  defaultValue="urbansync"
                  className="h-12 border-white/10 bg-card/70"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="h-12 w-full bg-accent font-semibold text-accent-foreground hover:bg-accent/80"
              >
                {isLoading ? "Entrando..." : "Entrar no dashboard"}
              </Button>
            </form>
          </div>
        </section>

        <section className="relative hidden overflow-hidden lg:block">
          <Image
            src="https://picsum.photos/seed/urbansync-admin/1920/1200"
            alt="Painel UrbanSync"
            fill
            priority
            className="object-cover brightness-[0.3]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(18,21,29,0.72),rgba(40,55,102,0.48),rgba(84,180,206,0.18))]" />

          <div className="relative flex h-full items-end p-10">
            <div className="max-w-2xl">
              <div className="mb-4 text-sm uppercase tracking-[0.2em] text-accent">UrbanSync Admin</div>
              <h2 className="text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-white xl:text-7xl">
                dashboard
                <br />
                interno da operacao
              </h2>
              <p className="mt-6 max-w-xl text-lg text-white/80">
                A base para a equipe acompanhar crescimento, vendas, implantacoes e expansao do negocio.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
