"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SignUpFormProps {
    type: "cliente" | "empresa"
}

export function SignUpForm({ type }: SignUpFormProps) {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        ...(type === "empresa" && { companyName: "" }),
        ...(type === "cliente" && { phone: "" }),
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(null)

        // Validações básicas
        if (!formData.name || !formData.email || !formData.password) {
            setError("Por favor, preencha todos os campos obrigatórios")
            setLoading(false)
            return
        }

        if (formData.password !== formData.confirmPassword) {
            setError("As senhas não correspondem")
            setLoading(false)
            return
        }

        if (formData.password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres")
            setLoading(false)
            return
        }

        try {
            // Chamar API de signup no servidor
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    name: formData.name,
                    type: type,
                    phone: (formData as any).phone || null,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Erro ao realizar cadastro")
                setLoading(false)
                return
            }

            setSuccess("Cadastro realizado com sucesso! Verifique seu email para confirmar.")
            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                ...(type === "empresa" && { companyName: "" }),
                ...(type === "cliente" && { phone: "" }),
            })

            // Redirecionar após 2 segundos
            setTimeout(() => {
                router.push(`/login/${type}`)
            }, 2000)
        } catch (error: any) {
            console.error("Erro ao cadastrar:", error)
            setError(error.message || "Erro ao cadastrar. Tente novamente.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Mensagens de erro */}
            {error && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-4 text-sm text-red-400">
                    {error}
                </div>
            )}

            {/* Mensagens de sucesso */}
            {success && (
                <div className="rounded-lg bg-green-500/10 border border-green-500/30 p-4 text-sm text-green-400">
                    {success}
                </div>
            )}
            {/* Nome / Nome da Empresa */}
            <div className="space-y-2">
                <label
                    htmlFor="name"
                    className="text-base font-medium text-white"
                >
                    {type === "empresa" ? "Nome da Empresa" : "Nome Completo"}
                </label>
                <div className="flex items-center rounded-xl bg-slate-100 px-4 py-3 ring-1 ring-transparent transition focus-within:ring-2 focus-within:ring-blue-500">
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder={type === "empresa" ? "Sua Empresa Ltda" : "João Silva"}
                        value={formData.name}
                        onChange={handleChange}
                        className="h-auto border-0 bg-transparent p-0 text-black shadow-none focus-visible:ring-0"
                        required
                    />
                </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
                <label
                    htmlFor="email"
                    className="text-base font-medium text-white"
                >
                    Email
                </label>
                <div className="flex items-center rounded-xl bg-slate-100 px-4 py-3 ring-1 ring-transparent transition focus-within:ring-2 focus-within:ring-blue-500">
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="h-auto border-0 bg-transparent p-0 text-black shadow-none focus-visible:ring-0"
                        required
                    />
                </div>
            </div>

            {/* Telefone (apenas para cliente) */}
            {type === "cliente" && (
                <div className="space-y-2">
                    <label
                        htmlFor="phone"
                        className="text-base font-medium text-white"
                    >
                        Telefone
                    </label>
                    <div className="flex items-center rounded-xl bg-slate-100 px-4 py-3 ring-1 ring-transparent transition focus-within:ring-2 focus-within:ring-blue-500">
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="(11) 99999-9999"
                            value={(formData as any).phone || ""}
                            onChange={handleChange}
                            className="h-auto border-0 bg-transparent p-0 text-black shadow-none focus-visible:ring-0"
                        />
                    </div>
                </div>
            )}

            {/* Senha */}
            <div className="space-y-2">
                <label
                    htmlFor="password"
                    className="text-base font-medium text-white"
                >
                    Senha
                </label>
                <div className="flex items-center rounded-xl bg-slate-100 px-4 py-3 ring-1 ring-transparent transition focus-within:ring-2 focus-within:ring-blue-500">
                    <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        className="h-auto border-0 bg-transparent p-0 text-black shadow-none focus-visible:ring-0"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="ml-2 text-gray-600 hover:text-gray-900"
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                        ) : (
                            <Eye className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </div>

            {/* Confirmar Senha */}
            <div className="space-y-2">
                <label
                    htmlFor="confirmPassword"
                    className="text-base font-medium text-white"
                >
                    Confirmar Senha
                </label>
                <div className="flex items-center rounded-xl bg-slate-100 px-4 py-3 ring-1 ring-transparent transition focus-within:ring-2 focus-within:ring-blue-500">
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="h-auto border-0 bg-transparent p-0 text-black shadow-none focus-visible:ring-0"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="ml-2 text-gray-600 hover:text-gray-900"
                    >
                        {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5" />
                        ) : (
                            <Eye className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </div>

            {/* Checkbox de aceitar termos */}
            <div className="flex items-start gap-3">
                <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
                />
                <label htmlFor="terms" className="text-sm text-white/80">
                    Eu concordo com os{" "}
                    <a href="#" className="font-semibold text-accent hover:underline">
                        Termos de Serviço
                    </a>{" "}
                    e a{" "}
                    <a href="#" className="font-semibold text-accent hover:underline">
                        Política de Privacidade
                    </a>
                </label>
            </div>

            <Button
                type="submit"
                disabled={loading}
                className="w-full bg-accent hover:bg-accent/80 text-accent-foreground font-bold h-10"
            >
                {loading ? "Cadastrando..." : "Criar Conta"}
            </Button>
        </form>
    )
}
