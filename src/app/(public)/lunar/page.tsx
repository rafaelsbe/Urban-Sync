
import { Metadata } from "next"
import { companies } from "@/lib/data"
import CompanyPage from "@/components/ui/lunar"
import { Company } from "@/lib/data"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"


import {
  Badge,
} from "@/components/ui/badge"
import { Button } from "@/components/ui/button"






export default function lunarpage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Lunar - Soluções de Iluminação</h1>
      <CompanyPage params={{ slug: 'lunar' }} />
    company={companies.find((item) => item.slug === 'lunar') as Company}

    
    </div>
  )
}

export const metadata: Metadata = {
  title: "Lunar - Soluções de Iluminação | UrbarnSync",
  description: "Conheça a Lunar, empresa especializada em soluções de iluminação para ambientes residenciais e comerciais. Descubra nossos produtos inovadores e eficientes para transformar seus espaços com estilo e funcionalidade.",    

}




      



 



