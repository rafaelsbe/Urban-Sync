// PÁGINA PRINCIPAL / HOME DA LANDING PAGE

import Image from "next/image";
import Link  from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchFilters } from "@/components/SearchFilters";
import { CompaniesSection } from "@/components/CompaniesSection";
import { AIAssistant } from "@/components/AIAssistant";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, CheckCircle2 } from "lucide-react";
import { PriceCard } from "@/components/PriceCard";
import { BuildingsSection } from "@/components/BuildingsSection";

export default function Home() {

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
      includes: ["Tudo do plano START", "Agendamento Automático feito pela IA", "Registro Automático no CRM: O lead entra no funil de vendas da empresa", "Lembretes automáticos para leads qualificados"],
      setupValue: 2900,
      monthValue: 1490,
    },
    {
      id: 3,
      name: "ELITE",
      purpose: "Inteligência de Dados e Lançamentos (Alta Performance).",
      includes: ["Tudo do Plano PRO", "IA Narrativa Personalizada: A IA é treinada com o roteiro comercial da empresa", "Relatório Mensal de BI: Análise de dados para antecipar tendências do mercado.", "Treinamento da Equipe: Consultoria mensal de 1h para uso da plataforma."],
      setupValue: 4500,
      monthValue: 2500,
    }
  ];

  return (
    <div className="flex flex-col min-h-screen font-body">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-background">
        <Image
          src="https://picsum.photos/seed/modern-buildings/1920/1080"
          alt="Modern urban buildings"
          fill
          priority
          className="object-cover brightness-[0.3]"
          data-ai-hint="modern city skyline"
        />
        
        {/* Gradient Overlay */}
        <div className="gradient-overlay" />
        
        <div className="container mx-auto px-4 relative z-10 text-center space-y-8">
          <div className="hero-badge">
            <Badge className="bg-accent/20 text-accent border-accent/40 font-bold tracking-[0.2em] uppercase px-6 py-2 backdrop-blur-sm hover:bg-accent/30 transition-colors duration-300">
              Intermediação & Empresas
            </Badge>
          </div>
          
          <div className="hero-title">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-bold leading-tight max-w-5xl mx-auto">
              Solidez que <span className="text-accent italic">conecta</span> pessoas às empresas certas.
            </h1>
          </div>
          
          <div className="hero-subtitle">
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A UrbanSync conecta clientes a empresas com atendimento estratégico, orientação e direcionamento assertivo. Encontre a empresa ideal e saiba como falar com ela rapidamente.
            </p>
          </div>
          
          <div className="hero-buttons flex flex-wrap justify-center gap-4">
            <Link href="/empresas">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/80 text-accent-foreground font-bold h-14 px-10 text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/50 active:scale-95"
              >
                VER EMPRESAS
                <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 hover:bg-white/10 font-bold h-14 px-10 text-lg rounded-full transition-all duration-300 hover:scale-105 hover:border-white/40 active:scale-95"
            >
              FALAR COM NOSSAS EQUIPES
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-1 h-12 bg-gradient-to-b from-accent to-transparent rounded-full mx-auto hover:h-16 transition-all duration-300" />
        </div>
      </section>

      {/* Search Filters */}
      <SearchFilters />

      {/* Featured Properties */}
      <section id="imoveis" className="py-24 container mx-auto px-4">



        <BuildingsSection id="imoveis" />

      </section>


      {/* Engineering Value Proposition */}
      <section id="sobre" className="py-24 bg-card relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl group">
            <Image
              src="https://picsum.photos/seed/urban-office/800/800"
              alt="Urban office skyline"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              data-ai-hint="modern city office"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
            <div className="absolute bottom-8 left-8 right-8 bg-background/80 backdrop-blur-xl p-8 rounded-2xl border border-white/5 animate-in slide-in-from-bottom-4 duration-700">
              <div className="text-4xl font-headline font-bold text-accent mb-1">15+ Anos</div>
              <div className="text-sm font-bold tracking-widest uppercase opacity-70">De experiência conectando empresas</div>
            </div>
          </div>
          <div className="space-y-8">
            <Badge className="bg-primary/50 text-accent border-accent/20 font-bold px-4 py-1 animate-in fade-in slide-in-from-top duration-700">POR QUE A UrbanSync?</Badge>
            <h2 className="text-4xl md:text-5xl font-headline font-bold leading-tight animate-in fade-in slide-in-from-left-4 duration-700 delay-100">Conexões que geram <span className="text-accent italic">resultado</span>.</h2>
            <p className="text-muted-foreground text-lg leading-relaxed animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
              Diferente de plataformas tradicionais, a UrbanSync nasce para conectar clientes e empresas com inteligência comercial, atendimento qualificado e acompanhamento estratégico.
            </p>
            <ul className="space-y-4">
              {[
                "Qualificação automática de leads e demandas",
                "Encaminhamento seguro para a empresa certa",
                "Atendimento via WhatsApp com respostas rápidas",
                "Orientação clara para o próximo passo do contato"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 animate-in fade-in slide-in-from-left-4 duration-700 group hover:pl-2 transition-all" style={{ animationDelay: `${i * 100 + 300}ms` }}>
                  <CheckCircle2 className="w-6 h-6 text-accent shrink-0 group-hover:animate-glow" />
                  <span className="font-medium group-hover:text-accent transition-colors">{item}</span>
                </li>
              ))}
            </ul>
            <Button size="lg" className="bg-accent hover:bg-accent/80 text-accent-foreground font-bold px-8 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/50 active:scale-95">
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
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-accent/5 opacity-50 pointer-events-none" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: '1s' }} />
        
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-headline font-bold mb-8 italic animate-in fade-in slide-in-from-top duration-700">Pronto para dar o próximo passo?</h2>
          <p className="text-xl text-muted-foreground mb-12 animate-in fade-in slide-in-from-top duration-700 delay-100">
            Se você quer encontrar a empresa certa, qualificar o contato ou ser direcionado à empresa adequada, estamos aqui para conectar você.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <div className="bg-card p-8 rounded-2xl border border-white/5 flex flex-col items-center gap-4 flex-1 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 group hover:border-accent/30 hover:bg-card/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
              <h3 className="text-2xl font-bold group-hover:text-accent transition-colors">Encontrar uma Empresa</h3>
              <p className="text-sm text-muted-foreground text-center">Veja nossas parcerias e saiba como contatar cada empresa.</p>
              <Button className="w-full bg-accent text-accent-foreground font-bold hover:scale-105 transition-transform duration-300">VER EMPRESAS</Button>
            </div>
            <div className="bg-card p-8 rounded-2xl border border-white/5 flex flex-col items-center gap-4 flex-1 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 group hover:border-accent/30 hover:bg-card/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
              <h3 className="text-2xl font-bold group-hover:text-accent transition-colors">Solicitar Apoio</h3>
              <p className="text-sm text-muted-foreground text-center">Fale com nossa equipe para receber a orientação certa.</p>
              <Button className="w-full bg-white text-black font-bold hover:scale-105 transition-transform duration-300">SOLICITAR CONTATO</Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <AIAssistant />
    </div>
  );
}
