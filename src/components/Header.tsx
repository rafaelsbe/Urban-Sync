// NAV BAR DA LANDIGN PAGE

"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, User, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent py-6"
      }`}>
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="group-hover:rotate-6 transition-transform">
            <img src="/favicon.ico" alt="Logo" width={30} height={30} />
          </div>
          <span className="font-headline text-lg sm:text-2xl font-bold tracking-tighter">
            Urbarn<span className="text-accent">Sync</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
          <Link href="#imoveis" className="hover:text-accent transition-colors">Imóveis</Link>
          <Link href="#sobre" className="hover:text-accent transition-colors">Sobre Nós</Link>
          <Link href="#empresas" className="hover:text-accent transition-colors">Parceiros</Link>
          <Link href="#planos" className="hover:text-accent transition-colors">Planos</Link>
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Button variant="ghost" className="group text-sm font-bold gap-2">
            <Phone className="w-4 h-4 text-accent transition-colors group-hover:text-accent-foreground" />
            (79) 99999-9999
          </Button>
          <Link href='/login'>
            <Button className="bg-primary hover:bg-primary/80 border border-white/10 font-bold gap-2">
              <User className="w-4 h-4" />
              ÁREA DE LOGIN
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          className="lg:hidden p-2 text-foreground hover:bg-white/10 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6 sm:w-8 sm:h-8" /> : <Menu className="w-6 h-6 sm:w-8 sm:h-8" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-20 left-0 w-full bg-background/95 backdrop-blur-md border-b border-white/5 p-6 z-40 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-4 text-base font-medium max-h-[calc(100vh-120px)] overflow-y-auto">
            <Link href="#imoveis" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent py-2 border-b border-white/5 transition-colors">Imóveis</Link>
            <Link href="#sobre" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent py-2 border-b border-white/5 transition-colors">Sobre Nós</Link>
            <Link href="#empresas" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent py-2 border-b border-white/5 transition-colors">Parceiros</Link>
            <Link href="#planos" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent py-2 border-b border-white/5 transition-colors">Planos</Link>
            <Link href="/contato" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent py-2 border-b border-white/5 transition-colors">Contato</Link>
            <div className="flex flex-col gap-2 pt-4">
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                <Button className="w-full bg-accent text-accent-foreground font-bold">FAZER LOGIN</Button>
              </Link>
              <Link href="/contato" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                <Button variant="outline" className="w-full border-white/10 font-bold">FALE CONOSCO</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
