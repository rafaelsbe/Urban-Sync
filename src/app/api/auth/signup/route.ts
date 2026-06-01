import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password, name, type, phone } = body;

        // Validações
        if (!email || !password || !name || !type) {
            return NextResponse.json(
                { error: "Campos obrigatórios faltando" },
                { status: 400 }
            );
        }

        const cookieStore = await cookies();
        const supabase = createClient(cookieStore);

        // 1. Criar usuário no Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name,
                    type,
                }
            }
        });

        if (authError) {
            return NextResponse.json(
                { error: authError.message },
                { status: 400 }
            );
        }

        if (!authData.user) {
            return NextResponse.json(
                { error: "Erro ao criar usuário" },
                { status: 400 }
            );
        }

        // 2. Criar empresa e profile
        if (type === "empresa") {
            // Gerar slug
            const slug = name
                .toLowerCase()
                .trim()
                .replace(/\s+/g, '-')
                .replace(/[^\w-]/g, '')
                .substring(0, 50);

            // Criar empresa
            const { data: companyData, error: companyError } = await supabase
                .from("companies")
                .insert({
                    name,
                    slug,
                    email,
                    is_active: true,
                })
                .select()
                .single();

            if (companyError) {
                console.error("Erro ao criar empresa:", companyError);
                return NextResponse.json(
                    { error: `Erro ao criar empresa: ${companyError.message}` },
                    { status: 400 }
                );
            }

            // Criar profile
            const { error: profileError } = await supabase
                .from("profiles")
                .insert({
                    id: authData.user.id,
                    company_id: companyData.id,
                    email,
                    full_name: name,
                    role: "company_admin",
                    is_active: true,
                });

            if (profileError) {
                console.error("Erro ao criar profile:", profileError);
                return NextResponse.json(
                    { error: `Erro ao criar perfil: ${profileError.message}` },
                    { status: 400 }
                );
            }
        } else if (type === "cliente") {
            // Para cliente, criar uma "empresa pessoal" para vincular os leads
            const slug = name
                .toLowerCase()
                .trim()
                .replace(/\s+/g, '-')
                .replace(/[^\w-]/g, '')
                .substring(0, 50);

            // Criar empresa pessoal do cliente
            const { data: companyData, error: companyError } = await supabase
                .from("companies")
                .insert({
                    name: `${name} - Pessoal`,
                    slug: `${slug}-pessoal`,
                    email,
                    is_active: true,
                })
                .select()
                .single();

            if (companyError) {
                console.error("Erro ao criar empresa pessoal:", companyError);
                return NextResponse.json(
                    { error: `Erro ao criar conta: ${companyError.message}` },
                    { status: 400 }
                );
            }

            // Criar profile como broker (cliente que pode fazer leads)
            const { error: profileError } = await supabase
                .from("profiles")
                .insert({
                    id: authData.user.id,
                    company_id: companyData.id,
                    email,
                    full_name: name,
                    phone: phone || null,
                    role: "broker",
                    is_active: true,
                });

            if (profileError) {
                console.error("Erro ao criar profile do cliente:", profileError);
                return NextResponse.json(
                    { error: `Erro ao criar perfil: ${profileError.message}` },
                    { status: 400 }
                );
            }
        }

        return NextResponse.json(
            { 
                success: true, 
                message: "Cadastro realizado com sucesso!",
                user_id: authData.user.id 
            },
            { status: 201 }
        );

    } catch (error: any) {
        console.error("Erro no servidor:", error);
        return NextResponse.json(
            { error: error.message || "Erro ao processar cadastro" },
            { status: 500 }
        );
    }
}
