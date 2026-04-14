// NAV BAR DA LANDIGN PAGE

"use client";

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
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-accent p-2 rounded-lg group-hover:rotate-6 transition-transform">
            <Building2 className="w-6 h-6 text-accent-foreground" />
          </div>
          <span className="font-headline text-2xl font-bold tracking-tighter">
            Urbarn<span className="text-accent">Sync</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
          <Link href="#" className="hover:text-accent transition-colors">Venda</Link>
          <Link href="#" className="hover:text-accent transition-colors">Aluguel</Link>
          <Link href="#" className="hover:text-accent transition-colors">Engenharia</Link>
          <Link href="#" className="hover:text-accent transition-colors">Projetos</Link>
          <Link href="#" className="hover:text-accent transition-colors">Sobre Nós</Link>
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Button variant="ghost" className="text-sm font-bold gap-2">
            <Phone className="w-4 h-4 text-accent" />
            (11) 9999-9999
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
          className="lg:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-background border-b border-white/5 p-6 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-4 text-lg font-medium">
            <Link href="#" className="hover:text-accent py-2 border-b border-white/5">Venda</Link>
            <Link href="#" className="hover:text-accent py-2 border-b border-white/5">Aluguel</Link>
            <Link href="#" className="hover:text-accent py-2 border-b border-white/5">Engenharia</Link>
            <Link href="#" className="hover:text-accent py-2 border-b border-white/5">Projetos</Link>
            <Link href="#" className="hover:text-accent py-2">Contato</Link>
            <div className="flex flex-col gap-2 pt-4">
              <Button className="w-full bg-accent text-accent-foreground font-bold">FAZER LOGIN</Button>
              <Button variant="outline" className="w-full border-white/10 font-bold">FALE CONOSCO</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
