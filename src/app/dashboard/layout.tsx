import { DashboardShell } from "@/app/dashboard/components/layout/dashboard-shell"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <DashboardShell>{children}</DashboardShell>
}
