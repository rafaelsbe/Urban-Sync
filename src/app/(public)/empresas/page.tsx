"use client" // Necessário para componentes interativos no Next.js App Router

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, ArrowRight, ArrowLeft } from "lucide-react"
import { companies } from "@/lib/data"

// Importações do novo componente de Carrossel do shadcn/ui
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// Importação do plugin para o carrossel passar sozinho
import Autoplay from "embla-carousel-autoplay"

export default function CompaniesPage() {
  return (
    <main className="min-h-screen bg-background text-white">
      <section className="bg-primary/5 py-12 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-4">
          
          {/* BOTÃO */}
          <div>
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
          {/* TOPO: Título e Link Alinhados igual à imagem image_fa9e26.jpg */}
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <Badge
                variant="outline"
                className="mb-3 border-accent/30 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent"
              >
                Empresas
              </Badge>

              <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-headline font-bold">
                Parcerias que <span className="italic text-accent">geram valor</span>
              </h1>

              <p className="text-sm md:text-base text-muted-foreground">
                Trabalhamos com empresas que confiam na nossa tecnologia para
                transformar atendimento, vendas e relacionamento com clientes.
              </p>
            </div>

            <Link href="/empresas" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent transition-colors hover:text-white sm:mb-2">
              Ver todas as empresas
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>


          {/* O CARROSSEL */}
          <Carousel
            opts={{
              align: "start",
              loop: true, // Faz o carrossel voltar para o começo infinitamente
            }}
            plugins={[
              Autoplay({
                delay: 4000, // Passa o slide a cada 4 segundos (4000ms)
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {companies.map((company) => (

                <CarouselItem key={company.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  
                  {/* CARD DA EMPRESA */}
                  <div className="group h-full overflow-hidden rounded-2xl border border-white/5 bg-secondary/20 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30">
                    <div className="flex h-full flex-col">
                      
                      {/* Imagem */}
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

                      {/* Conteúdo do Texto */}
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

                          <p className="mb-6 text-sm leading-relaxed text-muted-foreground min-h-[40px]">
                            {company.description}
                          </p>
                        </div>

                        {/* Botão Ver Empresa */}
                        <Link href={`/empresas/${company.slug}`}>
                          <Button
                            variant="outline"
                            className="w-fit border-accent/20 font-bold transition-all hover:bg-accent hover:text-accent-foreground"
                          >
                            Ver empresa
                          </Button>
                        </Link>
                      </div>

                    </div>
                  </div>
                  {/* FIM DO CARD */}

                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Setas de controle opcionais (aparecem se houver espaço nas laterais) */}
            <div className="hidden sm:block">
              <CarouselPrevious className="-left-12 border-accent/20 text-white hover:bg-accent" />
              <CarouselNext className="-right-12 border-accent/20 text-white hover:bg-accent" />
            </div>
          </Carousel>

        </div>
      </section>
    </main>
  )
}