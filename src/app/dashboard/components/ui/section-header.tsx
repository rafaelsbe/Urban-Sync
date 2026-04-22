import { cn } from "@/lib/utils"

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-4 md:flex-row md:items-end md:justify-between", className)}>
      <div className="space-y-2">
        {eyebrow ? (
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {eyebrow}
          </div>
        ) : null}
        <div>
          <h2 className="text-3xl font-bold text-white">{title}</h2>
          {description ? (
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
      </div>
      {action}
    </div>
  )
}
