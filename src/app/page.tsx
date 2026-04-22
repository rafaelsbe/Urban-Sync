// PÁGINA PRINCIPAL / HOME DA LANDING PAGE

import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchFilters } from "@/components/SearchFilters";
import { PropertyCard } from "@/components/PropertyCard";
import { CompaniesSection } from "@/components/CompaniesSection";
import { AIAssistant } from "@/components/AIAssistant";
import { properties } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react";
import { PriceCard } from "@/components/PriceCard";

export default function Home() {
  const featuredProperties = properties.filter(p => p.featured);

  const plans = [
    {
      id: 1,
      name: "START",
      purpose: "Automação inteligente de conversas via WhatsApp.",
      includes: ["Atendimento instantâneo 24h/7", "Qualificação básica (Nome, Telefone, O que busca, Faixa de preço).", "Triagem de 'Curiosos' vs. 'Interessados'.", "Encaminhamento do lead qualificado para o WhatsApp"],
      setupValue: 1500,
      monthValue: 890,
    },
    {
      id: 2,
      name: "PRO",
      purpose: "Automação completa + Organização de Processos (CRM).",
      includes: ["Tudo do plano START", "Agendamento Automático feito pela IA", "Registro Automático no CRM: O lead entra no funil de vendas da imobiliária", "Lembretes de Visita: Disparo automático de mensagem 2h antes de visitas agendadas"],
      setupValue: 2900,
      monthValue: 1490,
    },
    {
      id: 3,
      name: "ELITE",
      purpose: "Inteligência de Dados e Lançamentos (Alta Performance).",
      includes: ["Tudo do Plano PRO", "IA Narrativa Personalizada: A IA é treinada com o 'Manual de Vendas' da imobiliária", "Relatório Mensal de BI: Análise de dados para antecipar tendências do mercado.", "Treinamento da Equipe: Consultoria mensal de 1h para ensinar uso da plataforma."],
      setupValue: 4500,
      monthValue: 2500,
    }
  ];

  return (
    <div className="flex flex-col min-h-screen font-body">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="https://picsum.photos/seed/12/1920/1080"
          alt="Luxury Architecture"
          fill
          priority
          className="object-cover brightness-[0.3]"
          data-ai-hint="modern architecture"
        />
        <div className="container mx-auto px-4 relative z-10 text-center space-y-8 animate-in fade-in zoom-in duration-1000">
          <Badge className="bg-accent/20 text-accent border-accent/40 font-bold tracking-[0.2em] uppercase px-6 py-2 backdrop-blur-sm">
            Engenharia & Real Estate
          </Badge>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-bold leading-tight max-w-5xl mx-auto">
            Solidez que <span className="text-accent italic">Transforma</span> Espaços.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Especialistas em projetos de alta complexidade e consultoria imobiliária personalizada. Encontre seu próximo investimento ou construa seu legado conosco.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-accent hover:bg-accent/80 text-accent-foreground font-bold h-14 px-10 text-lg rounded-full">
              VER IMÓVEIS
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 font-bold h-14 px-10 text-lg rounded-full">
              FALAR COM ENGENHEIRO
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-1 h-12 bg-gradient-to-b from-accent to-transparent rounded-full mx-auto" />
        </div>
      </section>

      {/* Search Filters */}
      <SearchFilters />

      {/* Featured Properties */}
      <section id="imoveis" className="py-24 container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-2">
            <h2 className="text-4xl font-headline font-bold">Imóveis em <span className="text-accent">Destaque</span></h2>
            <p className="text-muted-foreground">Seleção exclusiva de propriedades de alto padrão.</p>
          </div>
          <Button variant="ghost" className="hidden md:flex items-center gap-2 group text-accent font-bold">
            VER TODA A LISTAGEM
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
          {/* Add more properties or placeholders */}
          <PropertyCard property={properties[2]} />
        </div>
      </section>

      {/* Engineering Value Proposition */}
      <section id="sobre" className="py-24 bg-card">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="https://picsum.photos/seed/engineer-val/800/800"
              alt="Professional Engineering"
              fill
              className="object-cover"
              data-ai-hint="construction site engineer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
            <div className="absolute bottom-8 left-8 right-8 bg-background/80 backdrop-blur-xl p-8 rounded-2xl border border-white/5">
              <div className="text-4xl font-headline font-bold text-accent mb-1">15+ Anos</div>
              <div className="text-sm font-bold tracking-widest uppercase opacity-70">De Excelência Técnica</div>
            </div>
          </div>
          <div className="space-y-8">
            <Badge className="bg-primary/50 text-accent border-accent/20 font-bold px-4 py-1">POR QUE A UrbanSync?</Badge>
            <h2 className="text-4xl md:text-5xl font-headline font-bold leading-tight">Expertise que garante a <span className="text-accent italic">sua segurança</span>.</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Diferente de imobiliárias convencionais, a UrbanSync nasceu no canteiro de obras. Analisamos cada imóvel com olhos de engenheiro, garantindo que seu investimento seja estruturalmente sólido e esteticamente impecável.
            </p>
            <ul className="space-y-4">
              {[
                "Vistoria técnica detalhada em todas as unidades",
                "Gestão completa de documentação e engenharia legal",
                "Projetos personalizados de reforma pós-compra",
                "Consultoria em investimentos imobiliários estruturados"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4">
                  <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <Button size="lg" className="bg-accent hover:bg-accent/80 text-accent-foreground font-bold px-8">
              SAIBA MAIS SOBRE NOSSOS SERVIÇOS
            </Button>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <CompaniesSection id="empresas" />

      {/* PRICE CARDS */}
      <section id="planos" className="relative overflow-hidden bg-card py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-4xl md:text-5xl font-headline font-bold leading-tight">
              Escolha plano de acordo com <span className="text-accent italic">sua necessidade</span>
            </h2>
            <p className="text-lg text-slate-400">
              Planos pensandos para atender qualquer tipo de empresa  que queira automatizar seu atendimento via WhatsApp e aumentar suas vendas.
            </p>
          </div>

          <PriceCard plans={plans} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-background py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-headline font-bold mb-8 italic">Pronto para dar o próximo passo?</h2>
          <p className="text-xl text-muted-foreground mb-12">
            Seja para comprar, vender ou construir, nossa equipe está pronta para oferecer a melhor consultoria técnica do mercado.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <div className="bg-card p-8 rounded-2xl border border-white/5 flex flex-col items-center gap-4 flex-1">
              <h3 className="text-2xl font-bold">Quero um Imóvel</h3>
              <p className="text-sm text-muted-foreground text-center">Fale com nossos consultores especialistas.</p>
              <Button className="w-full bg-accent text-accent-foreground font-bold">VER CATÁLOGO</Button>
            </div>
            <div className="bg-card p-8 rounded-2xl border border-white/5 flex flex-col items-center gap-4 flex-1">
              <h3 className="text-2xl font-bold">Quero Construir</h3>
              <p className="text-sm text-muted-foreground text-center">Inicie seu projeto com nossos engenheiros seniores.</p>
              <Button className="w-full bg-white text-black font-bold">SOLICITAR ORÇAMENTO</Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <AIAssistant />
    </div>
  );
}
