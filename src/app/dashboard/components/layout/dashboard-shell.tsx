"use client"

import { usePathname } from "next/navigation"

import { DashboardAuthGate } from "@/app/dashboard/components/layout/dashboard-auth-gate"
import { DashboardHeader } from "@/app/dashboard/components/layout/dashboard-header"
import { DashboardSidebar } from "@/app/dashboard/components/layout/dashboard-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/dashboard/login"

  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <DashboardAuthGate>
      <SidebarProvider defaultOpen>
        <DashboardSidebar />
        <SidebarInset className="bg-[radial-gradient(circle_at_top,_rgba(84,180,206,0.07),_transparent_35%),linear-gradient(180deg,rgba(10,12,17,0.9),rgba(10,12,17,1))]">
          <DashboardHeader />
          <div className="flex-1 px-4 py-6 md:px-6">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </DashboardAuthGate>
  )
}
