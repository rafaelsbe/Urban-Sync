
import Image from "next/image";
import { projects } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, MapPin } from "lucide-react";

export function ProjectSection() {
  return (
    <section className="py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-4 text-accent border-accent/30 font-bold tracking-widest uppercase px-4 py-1">Nossos Projetos</Badge>
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6">Excelência em <span className="text-accent italic">Engenharia Civil</span></h2>
            <p className="text-muted-foreground text-lg">
              De infraestrutura urbana a complexos corporativos, nossa equipe de engenharia entrega solidez, tecnologia e sustentabilidade em cada obra.
            </p>
          </div>
          <Button variant="link" className="text-accent font-bold group p-0">
            VER TODOS OS PROJETOS
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project) => (
            <div key={project.id} className="group relative overflow-hidden rounded-3xl bg-secondary/20 border border-white/5">
              <div className="grid grid-cols-1 xl:grid-cols-2 h-full">
                <div className="relative h-64 xl:h-auto overflow-hidden">
                  <Image 
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    data-ai-hint="construction project"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-accent/90 text-accent-foreground border-none font-bold">
                      {project.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-4 text-muted-foreground text-sm font-medium">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-accent" />
                        {project.year}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-accent" />
                        {project.location}
                      </div>
                    </div>
                    <h3 className="text-2xl font-headline font-bold mb-4">{project.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>
                  <Button variant="outline" className="w-fit border-accent/20 hover:bg-accent hover:text-accent-foreground font-bold transition-all">
                    DETALHES DO PROJETO
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
