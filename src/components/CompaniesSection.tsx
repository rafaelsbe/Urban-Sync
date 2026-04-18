import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MapPin } from "lucide-react"
import { companies } from "@/lib/data"
import Link from "next/link";

export function CompaniesSection() {
  return (
    <section className="bg-primary/5 py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Badge className="mb-4 border-accent/30 px-4 py-1 font-bold uppercase tracking-widest text-accent" variant="outline">
              Empresas Parceiras
            </Badge>

            <h2 className="mb-6 text-4xl font-headline font-bold md:text-5xl">
              Parcerias que <span className="italic text-accent">geram valor</span>
            </h2>

            <p className="text-lg text-muted-foreground">
              Trabalhamos com empresas que confiam na nossa tecnologia para
              transformar atendimento, vendas e relacionamento com clientes.
            </p>
          </div>
          <Link href={'/empresas'}>
            <Button variant="ghost" className="hidden md:flex items-center gap-2 group text-accent font-bold">
              VER TODA AS EMPRESAS
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* GRID ALTERADO PARA 3 COLUNAS */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
          {companies.map((company) => (
            <div
              key={company.id}
              className="group relative overflow-hidden rounded-3xl border border-white/5 bg-secondary/20"
            >
              <div className="flex h-full flex-col">

                {/* LOGO */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute left-4 top-4">
                    <Badge className="border-none bg-accent/90 font-bold text-accent-foreground">
                      {company.segment}
                    </Badge>
                  </div>
                </div>

                {/* INFO */}
                <div className="flex flex-col justify-between p-8">
                  <div>
                    <div className="mb-4 flex items-center gap-4 text-sm font-medium text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-accent" />
                        {company.city}/{company.state}
                      </div>
                    </div>

                    <h3 className="mb-4 text-2xl font-headline font-bold">
                      {company.name}
                    </h3>

                    <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                      {company.miniDescription}
                    </p>
                  </div>
                  <Link href={`/empresas/${company.slug}`}>
                    <Button
                      variant="outline"
                      className="w-fit border-accent/20 font-bold transition-all hover:bg-accent hover:text-accent-foreground"
                    >
                      VER EMPRESA
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}