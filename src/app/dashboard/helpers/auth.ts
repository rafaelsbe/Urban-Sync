export const DASHBOARD_SESSION_KEY = "urbansync_dashboard_session"

export function setDashboardSession() {
  if (typeof window === "undefined") return

  window.localStorage.setItem(DASHBOARD_SESSION_KEY, "active")
  document.cookie = `${DASHBOARD_SESSION_KEY}=active; path=/; max-age=28800`
}

export function clearDashboardSession() {
  if (typeof window === "undefined") return

  window.localStorage.removeItem(DASHBOARD_SESSION_KEY)
  document.cookie = `${DASHBOARD_SESSION_KEY}=; path=/; max-age=0`
}

export function hasDashboardSession() {
  if (typeof window === "undefined") return false

  const localValue = window.localStorage.getItem(DASHBOARD_SESSION_KEY)
  const cookieValue = document.cookie.includes(`${DASHBOARD_SESSION_KEY}=active`)
  return localValue === "active" || cookieValue
}
