import { Check } from "lucide-react"
import { Button } from "./ui/button"

type Plan = {
  id: number
  name: string
  purpose: string
  setupValue: number
  monthValue: number
  includes: string[]
}

type PriceCardProps = {
  plans: Plan[]
}

export function PriceCard({ plans }: PriceCardProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className="group flex h-full min-h-[620px] flex-col rounded-2xl border border-slate-700 bg-slate-800/80 p-6 text-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)]"
        >
          <div>
            <h3 className="mb-3 text-center text-2xl font-bold">
              {plan.name}
            </h3>

            <p className="mb-4 min-h-[48px] text-center text-sm text-slate-400">
              {plan.purpose}
            </p>

            <div className="mb-4 flex items-end justify-center gap-2">
              <span className="text-2xl font-extrabold">
                {plan.setupValue.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
              <span className="text-sm text-slate-400">uma vez</span>
            </div>

            <div className="mb-6 flex items-end justify-center gap-2">
              <span className="text-xl font-extrabold">
                {plan.monthValue.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
              <span className="text-sm text-slate-400">/mês</span>
            </div>
          </div>

          <ul className="mb-6 flex-1 space-y-3 text-left">
            {plan.includes.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                <span className="text-sm leading-6">{item}</span>
              </li>
            ))}
          </ul>

          <Button size="lg" className="bg-accent hover:bg-accent/80 text-accent-foreground font-bold px-8">
              Mais detalhes
            </Button>
        </div>
      ))}
    </div>
  )
}