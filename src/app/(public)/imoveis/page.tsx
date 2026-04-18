
// TAGS DE CARACTERÍSTICAS DOS IMÓVEIS NOS CARDS
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { properties, Property } from "@/lib/data";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Maximize, MapPin } from "lucide-react";
import { PropertyCard } from "@/components/PropertyCard";
import { Metadata } from "next";
import { properties as mockProperties } from "@/app/(public)/imoveis/lib/data"; 






export default function ImoveisPage() {
  return (
    <div className="container py-10">    
      <h1 className="text-3xl font-bold mb-8">Imóveis para alugar e vender</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>

                    
    
  );
}
    
