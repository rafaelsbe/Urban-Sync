import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MapPin } from "lucide-react"
import { companies1 } from "@/lib/data"
import Link from "next/link";

type CompaniesSectionProps = {
  id: string
};

export function CompaniesSection1({ id }: CompaniesSectionProps) {
  return (
    <section id={id} className="bg-primary/5 py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Badge className="mb-4 border-accent/30 px-4 py-1 font-bold uppercase tracking-widest text-accent" variant="outline">
              imóveis 
            </Badge>

            <h2 className="mb-6 text-4xl font-headline font-bold md:text-5xl">
              imoveis <span className="italic text-accent">para todos os publicos</span>
            </h2>

            <p className="text-lg text-muted-foreground">
             
            </p>
          </div>
          <Link href={'/imoveis'}>
            <Button variant="ghost" className="hidden md:flex items-center gap-2 group text-accent font-bold">
              VER IMOVEIS
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* GRID ALTERADO PARA 3 COLUNAS */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
          {companies1.map((company1) => (
            <div
              key={company1.id}
              className="group relative overflow-hidden rounded-3xl border border-white/5 bg-secondary/20"
            >
              <div className="flex h-full flex-col">

                {/* LOGO */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={company1.logo}
                    alt={company1.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute left-4 top-4">
                    <Badge className="border-none bg-accent/90 font-bold text-accent-foreground">
                      {company1.segment}
                    </Badge>
                  </div>
                </div>

                {/* INFO */}
                <div className="flex flex-col justify-between p-8">
                  <div>
                    <div className="mb-4 flex items-center gap-4 text-sm font-medium text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-accent" />
                        {company1.city}/{company1.state}
                      </div>
                    </div>

                    <h3 className="mb-4 text-2xl font-headline font-bold">
                      {company1.name}
                    </h3>

                    <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                      {company1.miniDescription}
                    </p>
                  </div>
                  <Link href={`/imoveis/${company1.slug}`}>
                    <Button
                      variant="outline"
                      className="w-fit border-accent/20 font-bold transition-all hover:bg-accent hover:text-accent-foreground"
                    >
                      VER IMOVEL
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