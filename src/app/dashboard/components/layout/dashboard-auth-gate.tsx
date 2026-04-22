"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Building2 } from "lucide-react"

import { hasDashboardSession } from "@/app/dashboard/helpers/auth"

export function DashboardAuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const authenticated = hasDashboardSession()

    if (!authenticated) {
      router.replace("/dashboard/login")
      return
    }

    setIsReady(true)
  }, [pathname, router])

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-card px-5 py-4 text-sm text-muted-foreground">
          <div className="rounded-xl bg-accent/15 p-2">
            <Building2 className="h-5 w-5 text-accent" />
          </div>
          Validando acesso ao painel UrbanSync...
        </div>
      </div>
    )
  }

  return <>{children}</>
}
