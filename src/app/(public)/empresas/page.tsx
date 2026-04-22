import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, ArrowRight, ArrowLeft } from "lucide-react"
import { companies } from "@/lib/data"

export default function CompaniesPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="bg-primary/5 py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

            {/* TEXTO */}
            <div className="max-w-3xl text-center md:text-left">
              <Badge
                variant="outline"
                className="mb-4 border-accent/30 px-4 py-1 font-bold uppercase tracking-widest text-accent"
              >
                Empresas Parceiras
              </Badge>

              <h1 className="mb-6 text-4xl font-headline font-bold md:text-5xl">
                Conheça todas as nossas{" "}
                <span className="italic text-accent">empresas parceiras</span>
              </h1>

              <p className="text-lg text-muted-foreground">
                Explore as empresas que fazem parte do nosso ecossistema e veja
                como elas utilizam nossa tecnologia para transformar processos,
                atendimento e resultados.
              </p>
            </div>

            {/* BOTÃO */}
            <Link href="/#empresas">
              <Button
                variant="outline"
                className="w-fit border-accent/20 font-bold transition-all hover:bg-accent hover:text-accent-foreground"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            </Link>

          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {companies.map((company) => (
              <div
                key={company.id}
                className="group overflow-hidden rounded-3xl border border-white/5 bg-secondary/20 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
              >
                <div className="flex h-full flex-col">
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

                  <div className="flex flex-1 flex-col justify-between p-8">
                    <div>
                      <div className="mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <MapPin className="h-4 w-4 text-accent" />
                        <span>
                          {company.city}/{company.state}
                        </span>
                      </div>

                      <h2 className="mb-4 text-2xl font-headline font-bold">
                        {company.name}
                      </h2>

                      <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                        {company.description}
                      </p>
                    </div>

                    <Link href={`/empresas/${company.slug}`}>
                      <Button
                        variant="outline"
                        className="group/btn w-fit border-accent/20 font-bold transition-all hover:bg-accent hover:text-accent-foreground"
                      >
                        Ver empresa
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}