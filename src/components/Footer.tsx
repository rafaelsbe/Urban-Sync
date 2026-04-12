// FOOTER DA LADING PAGE

import Link from "next/link";
import { Building2, Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0A0C11] border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-accent p-2 rounded-lg">
                <Building2 className="w-6 h-6 text-accent-foreground" />
              </div>
              <span className="font-headline text-2xl font-bold tracking-tighter">
                CONSTRU<span className="text-accent">PRIME</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Soluções integradas em engenharia civil e mercado imobiliário. Construindo o futuro com solidez, confiança e inovação tecnológica.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="p-2 bg-secondary rounded-full hover:bg-accent hover:text-accent-foreground transition-all">
                <Instagram className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 bg-secondary rounded-full hover:bg-accent hover:text-accent-foreground transition-all">
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 bg-secondary rounded-full hover:bg-accent hover:text-accent-foreground transition-all">
                <Facebook className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-headline font-bold text-lg mb-6 border-l-4 border-accent pl-3">Links Úteis</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-accent transition-colors">Imóveis à Venda</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Aluguel Residencial</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Nossos Projetos</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Financiamento</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Trabalhe Conosco</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold text-lg mb-6 border-l-4 border-accent pl-3">Engenharia</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-accent transition-colors">Construção Civil</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Reformas Estruturais</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Consultoria Técnica</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Laudos e Perícias</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Gerenciamento de Obras</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold text-lg mb-6 border-l-4 border-accent pl-3">Contato</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0" />
                <span>Av. Paulista, 1000 - Bela Vista, São Paulo - SP</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span>(11) 4002-8922</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span>contato@construprime.com.br</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-10 border-t border-white/5 text-center text-xs text-muted-foreground">
          <p>© 2024 ConstruPrime Engenharia e Imobiliária. Todos os direitos reservados. CRECI: 123456-J | CREA: 0987654321</p>
        </div>
      </div>
    </footer>
  );
}
