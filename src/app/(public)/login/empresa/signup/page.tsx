import Image from "next/image"
import Link from "next/link"

import { Building2 } from "lucide-react"
import { Footer } from "@/components/Footer"
import { SignUpForm } from "@/components/SignUpForm"

export default function EmpresaSignUpPage() {
    return (
        <main className="min-h-screen bg-background">
            <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[520px_1fr]">
                {/* Left Side */}
                <section className="flex items-start justify-center mt-8 sm:mt-12 lg:mt-16 bg-background/80 backdrop-blur-md border-b border-white/5 px-4 py-8 sm:px-6 sm:py-10">
                    <div className="w-full max-w-[340px]">
                        {/* Logo */}
                        <div className="mb-10 flex items-center gap-[4rem]">
                            <Link href="/" className="flex items-center gap-2 group">
                                <div className="bg-accent p-2 rounded-lg group-hover:rotate-6 transition-transform">
                                    <Building2 className="w-6 h-6 text-accent-foreground" />
                                </div>
                                <span className="font-headline text-2xl font-bold tracking-tighter">
                                    Urbarn<span className="text-accent">Sync</span>
                                </span>
                            </Link>
                        </div>

                        {/* Heading */}
                        <div className="mb-8 space-y-2">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                                Cadastre sua empresa
                            </h2>

                            <div className="text-sm sm:text-base text-white/80">
                                <span>Gerencie seus imóveis e venda com a UrbanSync</span>
                            </div>
                        </div>

                        {/* Form */}
                        <SignUpForm type="empresa" />

                        {/* Login link */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-white/80">
                                Já tem uma conta?{" "}
                                <Link
                                    href="/login/empresa"
                                    className="font-semibold text-accent hover:underline underline-offset-2"
                                >
                                    Entre aqui
                                </Link>
                            </p>
                        </div>
                    </div>
                </section>

                {/* Right Side */}
                <section className="relative hidden overflow-hidden lg:block">
                    <Image
                        src="https://picsum.photos/id/122/1920/1080"
                        alt="Luxury Architecture"
                        fill
                        priority
                        className="object-cover brightness-[0.3]"
                        data-ai-hint="luxury residential"
                    />

                    {/* Centered content */}
                    <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
                        <div className="space-y-8">
                            <h2 className="text-5xl font-bold tracking-tight text-white lg:text-6xl">
                                Cresça seu negócio imobiliário
                            </h2>
                            <p className="text-lg text-white/90 max-w-md">
                                Ferramentas completas para gerenciar suas propriedades e alcançar mais clientes
                            </p>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    )
}
