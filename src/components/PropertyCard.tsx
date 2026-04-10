
import Image from "next/image";
import { Property } from "@/lib/data";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Maximize, MapPin } from "lucide-react";

export function PropertyCard({ property }: { property: Property }) {
  return (
    <Card className="overflow-hidden group cursor-pointer transition-all hover:border-accent/40 bg-secondary/30 border-white/5">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={property.imageUrl}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          data-ai-hint="luxury property"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className="bg-primary/90 text-white border-none">{property.status}</Badge>
          {property.featured && <Badge className="bg-accent text-accent-foreground border-none">Destaque</Badge>}
        </div>
        <div className="absolute bottom-4 right-4">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-md text-white font-bold text-lg px-3 py-1 border-none">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(property.price)}
            {property.status === 'Aluguel' && <span className="text-xs font-normal">/mês</span>}
          </Badge>
        </div>
      </div>
      <CardContent className="p-5">
        <div className="flex items-center gap-1 text-accent mb-2">
          <MapPin className="w-4 h-4" />
          <span className="text-xs font-medium uppercase tracking-wider">{property.location}</span>
        </div>
        <h3 className="font-headline text-xl mb-4 group-hover:text-accent transition-colors line-clamp-1">
          {property.title}
        </h3>
        <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-4">
          <div className="flex flex-col items-center gap-1">
            <Bed className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-medium">{property.bedrooms} Quartos</span>
          </div>
          <div className="flex flex-col items-center gap-1 border-x border-white/5 px-2">
            <Bath className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-medium">{property.bathrooms} Suítes</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Maximize className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-medium">{property.area}m²</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
