import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MapPin } from "lucide-react"
import { buildings } from "@/lib/data"
import Link from "next/link";

type BuildingsSectionProps = {
  id: string
};

export function BuildingsSection({ id }: BuildingsSectionProps) {
  return (
    <section id={id} className="py-24">
      <div className="container mx-auto px-4 w-full">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Badge className="mb-4 border-accent/30 px-4 py-1 font-bold uppercase tracking-widest text-accent" variant="outline">
              Imóveis 
            </Badge>

            <h2 className="mb-6 text-4xl font-headline font-bold md:text-5xl">
              Imóveis <span className="italic text-accent">para todos os publicos</span>
            </h2>

            <p className="text-lg text-muted-foreground">
             
            </p>
          </div>
          <Link href={'/imoveis'}>
            <Button variant="ghost" className="hidden md:flex items-center gap-2 group text-accent font-bold">
              VER IMÓVEIS
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* GRID ALTERADO PARA 3 COLUNAS */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
          {buildings.map((building) => (
            <div
              key={building.id}
              className="group relative overflow-hidden rounded-3xl border border-white/5 bg-secondary/20"
            >
              <div className="flex h-full flex-col">

                {/* LOGO */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={building.coverImage}
                    alt={building.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* INFO */}
                <div className="flex flex-col justify-between p-8">
                  <div>
                    <div className="mb-4 flex items-center gap-4 text-sm font-medium text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-accent" />
                        {building.city}/{building.state}
                      </div>
                    </div>

                    <h3 className="mb-4 text-2xl font-headline font-bold">
                      {building.name}
                    </h3>

                    <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                      {building.miniDescription}
                    </p>
                  </div>
                  <Link href={`/imoveis/${building.slug}`}>
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