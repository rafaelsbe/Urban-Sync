import Image from "next/image"
import Link from "next/link"

import { Building2, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Footer } from "@/components/Footer"
import { GoogleSignInButton } from "@/components/GoogleSignInButton"

export default function EmpresaLoginPage() {
    return (
        <main className="min-h-screen bg-background">
            <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[520px_1fr]">
                {/* Left Side */}
                <section className="flex items-start justify-center mt-8 sm:mt-16 lg:mt-20 bg-background/80 backdrop-blur-md border-b border-white/5 px-4 py-8 sm:px-6 sm:py-10">
                    <div className="w-full max-w-[340px]">
                        {/* Logo */}
                        <div className="mb-12 flex items-center gap-[4rem]">
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
                            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold tracking-tight text-white">
                                Bem-vindo(a)!
                            </h2>

                            <div className="flex items-center gap-2 text-sm sm:text-base lg:text-lg text-white">
                                <span>Informe o  seu login e senha </span>
                            </div>
                        </div>

                        {/* Form */}
                        <form className="space-y-8">
                            <div className="space-y-2">
                                <label
                                    htmlFor="company-login"
                                    className="text-base font-medium text-white"
                                >
                                    Login
                                </label>

                                <div className="flex items-center rounded-xl bg-slate-100 px-4 py-3 ring-1 ring-transparent transition focus-within:ring-2 focus-within:ring-blue-500">
                                    <Input
                                        id="company-login"
                                        type="text"
                                        className="h-auto border-0 bg-transparent p-0 text-black shadow-none focus-visible:ring-0"
                                    />
                                </div>
                                <label
                                    htmlFor="company-password"
                                    className="text-base font-medium text-white"
                                >
                                    Senha
                                </label>

                                <div className="flex items-center rounded-xl bg-slate-100 px-4 py-3 ring-1 ring-transparent transition focus-within:ring-2 focus-within:ring-blue-500">
                                    <Input
                                        id="company-password"
                                        type="text"
                                        className="h-auto !border-0 !bg-transparent !p-0 !text-black !shadow-none !ring-0 !outline-none focus:!ring-0 focus:!outline-none focus-visible:!ring-0 focus-visible:!outline-none"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-accent hover:bg-accent/80 text-accent-foreground font-bold h-10 group">
                                Entrar
                            </Button>
                        </form>

                        {/* Divider */}
                        <div className="mt-8 flex items-center gap-4">
                            <div className="flex-1 h-[1px] bg-white/10"></div>
                            <span className="text-white/60 text-sm">Ou</span>
                            <div className="flex-1 h-[1px] bg-white/10"></div>
                        </div>

                        {/* Google Sign In */}
                        <div className="mt-6">
                            <GoogleSignInButton />
                        </div>

                        {/* Help link */}
                        <div className="mt-10 space-y-1">
                            <p className="text-white">Esqueceu seu login e senha?</p>
                            <a
                                href="#"
                                className="font-semibold text-accent underline underline-offset-2 hover:opacity-80 transition-opacity duration-300 ease"
                            >
                                Recupere aqui
                            </a>
                        </div>

                        {/* CTA options */}
                        <div className="mt-8 sm:mt-12 lg:mt-[10rem] flex flex-col items-center gap-2 text-center">
                            <p className="text-center text-xs sm:text-sm text-white/90">
                                Você quer administrar seus imóveis? <br />
                            </p>
                            <Link href="/login/cliente" className="block">
                                <Button
                                    className="w-full sm:w-[220px] bg-primary hover:bg-primary/80 border border-white/10 font-bold gap-2">
                                    Área de Empresas
                                    <ArrowUpRight />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Right Side */}
                <section className="relative hidden overflow-hidden lg:block">
                    <Image
                        src="https://picsum.photos/seed/12/1920/1080"
                        alt="Luxury Architecture"
                        fill
                        priority
                        className="object-cover brightness-[0.8]"
                        data-ai-hint="modern architecture"
                    />

                    {/* Blue overlay */}
                    <div className="absolute inset-0 bg-blue-950/60" />

                    {/* Centered content */}
                    <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
                        <div className="mb-10">
                            <h3 className="text-5xl font-bold tracking-tight text-white xl:text-6xl">
                                <span className="text-accent">10% off</span> na
                            </h3>
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-6xl font-extrabold uppercase leading-[0.95] tracking-tight text-white xl:text-8xl">
                                Primeira compra
                                <br />
                                pela Urban
                            </h2>
                        </div>

                        <Button
                            className="mt-10 w-[520px] rounded-xl bg-emerald-400 p-7 text-xl font-medium text-slate-950 shadow-lg hover:bg-emerald-500">
                            Garanta seu imóvel com condições exclusivas!
                        </Button>
                    </div>
                </section>
            </div >
            <Footer />
        </main >
    )
}