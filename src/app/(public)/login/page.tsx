import Image from "next/image"
import Link from "next/link"
import { Building2, User, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Footer } from "@/components/Footer"

export default function LoginChoicePage() {
    return (
        <main className="min-h-screen bg-background">
            <div className="grid min-h-screen lg:grid-cols-[520px_1fr]">
                {/* Left Side */}
                <section className="flex items-center justify-center bg-background/80 px-6 py-10 backdrop-blur-md border-b border-white/5">
                    <div className="w-full max-w-[360px]">
                        {/* Logo */}
                        <div className="mb-12">
                            <Link href="/" className="flex items-center gap-2 group w-fit">
                                <div className="rounded-lg bg-accent p-2 transition-transform group-hover:rotate-6">
                                    <Building2 className="h-6 w-6 text-accent-foreground" />
                                </div>
                                <span className="font-headline text-2xl font-bold tracking-tighter text-white">
                                    Urbarn<span className="text-accent">Sync</span>
                                </span>
                            </Link>
                        </div>

                        {/* Heading */}
                        <div className="mb-8 space-y-3">
                            <h1 className="text-4xl font-extrabold tracking-tight text-white">
                                Como deseja entrar?
                            </h1>
                            <p className="text-white/80">
                                Escolha o tipo de acesso para continuar na plataforma.
                            </p>
                        </div>

                        {/* Options */}
                        <div className="space-y-4">
                            <Link href="/login/empresa" className="block">
                                <Card className="border-white/10 bg-white/5 transition-all hover:bg-white/10 hover:border-accent/40">
                                    <CardContent className="flex items-center justify-between p-5">
                                        <div className="flex items-center gap-4">
                                            <div className="rounded-xl bg-accent/15 p-3">
                                                <Building2 className="h-6 w-6 text-accent" />
                                            </div>
                                            <div>
                                                <h2 className="font-bold text-white">Sou empresa</h2>
                                                <p className="text-sm text-white/70">
                                                    Acesse o painel administrativo da sua organização.
                                                </p>
                                            </div>
                                        </div>

                                        <ArrowRight className="h-5 w-5 text-white/60" />
                                    </CardContent>
                                </Card>
                            </Link>

                            <Link href="/login/cliente" className="block">
                                <Card className="border-white/10 bg-white/5 transition-all hover:bg-white/10 hover:border-accent/40">
                                    <CardContent className="flex items-center justify-between p-5">
                                        <div className="flex items-center gap-4">
                                            <div className="rounded-xl bg-accent/15 p-3">
                                                <User className="h-6 w-6 text-accent" />
                                            </div>
                                            <div>
                                                <h2 className="font-bold text-white">Sou cliente</h2>
                                                <p className="text-sm text-white/70">
                                                    Entre para acompanhar seus dados e serviços.
                                                </p>
                                            </div>
                                        </div>

                                        <ArrowRight className="h-5 w-5 text-white/60" />
                                    </CardContent>
                                </Card>
                            </Link>
                        </div>

                        {/* Bottom CTA */}
                        <div className="mt-8">
                            <p className="text-sm text-white/70">
                                Ainda não conhece a UrbanSync?
                            </p>
                            <Button className="mt-3 w-full bg-accent font-bold text-accent-foreground hover:bg-accent/80">
                                Conheça nosso serviço
                            </Button>
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
                        data-ai-hint="modern architecture"
                    />

                    <div className="absolute inset-0 bg-blue-950/60" />

                    <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
                        <div className="mb-6">
                            <h2 className="text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-white xl:text-7xl">
                                Gestão urbana
                                <br />
                                mais inteligente
                            </h2>
                        </div>

                        <p className="max-w-[620px] text-lg text-white/85 xl:text-xl">
                            Escolha seu tipo de acesso e continue para uma experiência feita
                            para empresas e clientes.
                        </p>

                        <Button className="mt-10 h-14 rounded-xl bg-emerald-400 px-8 text-lg font-bold text-slate-950 shadow-lg hover:bg-emerald-500">
                            Começar agora
                        </Button>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    )
}