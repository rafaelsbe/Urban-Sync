"use client";

import { Search, MapPin, Home, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SearchFilters() {
  return (
    <div className="w-full max-w-6xl mx-auto -mt-16 relative z-10 px-4">
      <div className="bg-card/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">O que busca?</label>
          <div className="relative">
            <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Select>
              <SelectTrigger className="bg-secondary/50 border-white/10 pl-10 focus:ring-accent">
                <SelectValue placeholder="Tipo de Imóvel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ap">Apartamento</SelectItem>
                <SelectItem value="casa">Casa</SelectItem>
                <SelectItem value="terreno">Terreno</SelectItem>
                <SelectItem value="comercial">Comercial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Onde?</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Cidade ou Bairro" 
              className="bg-secondary/50 border-white/10 pl-10 focus:ring-accent"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Valor máximo</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              type="number" 
              placeholder="Até R$..." 
              className="bg-secondary/50 border-white/10 pl-10 focus:ring-accent"
            />
          </div>
        </div>

        <Button className="w-full bg-accent hover:bg-accent/80 text-accent-foreground font-bold h-10 group">
          <Search className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
          BUSCAR AGORA
        </Button>
      </div>
    </div>
  );
}
