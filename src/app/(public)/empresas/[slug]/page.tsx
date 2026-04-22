import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Badge,
} from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { companies } from "@/lib/data"
import {
  MapPin,
  Instagram,
  Linkedin,
  Facebook,
  ArrowLeft,
} from "lucide-react"

type CompanyPageProps = {
  params: {
    slug: string
  }
}

export default function CompanyPage({ params }: CompanyPageProps) {
  const company = companies.find((item) => item.slug === params.slug)

  if (!company) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="bg-primary/5 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link href="/empresas">
              <Button
                variant="outline"
                className="border-accent/20 font-bold transition-all hover:bg-accent hover:text-accent-foreground"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para imoveis
              </Button>
            </Link>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            {/* Imagem */}
            <div className="relative min-h-[320px] overflow-hidden rounded-3xl border border-white/5 bg-secondary/20 md:min-h-[500px]">
              <Image
                src={company.coverImage}
                alt={company.name}
                fill
                className="object-cover"
                priority
              />

              <div className="absolute left-5 top-5">
                <Badge className="border-none bg-accent/90 font-bold text-accent-foreground">
                  {company.segment}
                </Badge>
              </div>
            </div>

            {/* Informações */}
            <div className="flex flex-col justify-center rounded-3xl border border-white/5 bg-secondary/20 p-8 md:p-10">
              <div className="mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <MapPin className="h-4 w-4 text-accent" />
                <span>
                  {company.city}/{company.state}
                </span>
              </div>

              <h1 className="mb-4 text-4xl font-headline font-bold md:text-5xl">
                {company.name}
              </h1>

              <p className="mb-6 text-base leading-relaxed text-muted-foreground">
                {company.description}
              </p>

              <div className="mb-8">
                <h2 className="mb-3 text-xl font-bold">História da empresa</h2>
                <p className="text-sm leading-7 text-muted-foreground md:text-base">
                  {company.history}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href={company.social.instagram} target="_blank">
                  <Button
                    variant="outline"
                    className="border-accent/20 font-bold transition-all hover:bg-accent hover:text-accent-foreground"
                  >
                    <Instagram className="mr-2 h-4 w-4" />
                    Instagram
                  </Button>
                </Link>

                <Link href={company.social.linkedin} target="_blank">
                  <Button
                    variant="outline"
                    className="border-accent/20 font-bold transition-all hover:bg-accent hover:text-accent-foreground"
                  >
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </Button>
                </Link>

                <Link href={company.social.facebook} target="_blank">
                  <Button
                    variant="outline"
                    className="border-accent/20 font-bold transition-all hover:bg-accent hover:text-accent-foreground"
                  >
                    <Facebook className="mr-2 h-4 w-4" />
                    Facebook
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Imóveis */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge
                variant="outline"
                className="mb-4 border-accent/30 px-4 py-1 font-bold uppercase tracking-widest text-accent"
              >
                Imóveis da empresa
              </Badge>

              <h2 className="text-3xl font-headline font-bold md:text-4xl">
                Conheça os imóveis da <span className="text-accent">{company.name}</span>
              </h2>
            </div>
          </div>

          {company.properties.length === 0 ? (
            <div className="rounded-3xl border border-white/5 bg-secondary/20 p-10 text-center text-muted-foreground">
              Nenhum imóvel cadastrado para esta empresa no momento.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {company.properties.map((property) => (
                <div
                  key={property.id}
                  className="group overflow-hidden rounded-3xl border border-white/5 bg-secondary/20 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute left-4 top-4">
                      <Badge className="border-none bg-accent/90 font-bold text-accent-foreground">
                        {property.type}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 text-accent" />
                      <span>
                        {property.city}/{property.state}
                      </span>
                    </div>

                    <h3 className="mb-3 text-xl font-bold">{property.title}</h3>

                    <p className="mb-5 text-lg font-extrabold text-accent">
                      {property.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>

                    <Button
                      variant="outline"
                      className="w-full border-accent/20 font-bold transition-all hover:bg-accent hover:text-accent-foreground"
                    >
                      Ver imóvel
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}