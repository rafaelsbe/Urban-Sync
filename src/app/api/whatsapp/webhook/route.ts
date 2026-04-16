import { NextResponse } from 'next/server';
import { whatsappOrderFlow } from '@/ai/whatsappFlow/whatsappFlow';
import { createClient } from '@supabase/supabase-js';

// Inicialize o cliente do Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use Service Role para bypass de RLS no backend
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Extração de dados padrão da Evolution API
    // A Evolution envia o texto em message.conversation ou message.extendedTextMessage.text
    const messageText = body.data?.message?.conversation || body.data?.message?.extendedTextMessage?.text;
    const senderNumber = body.data?.key?.remoteJid;
    const instanceName = body.instance; // O nome que você deu à instância do cliente

    if (!messageText || body.event !== "messages.upsert") {
      return NextResponse.json({ skipped: true });
    }

    // 2. Processamento com o seu Flow do Genkit
    const aiResult = await whatsappOrderFlow({
      query: messageText,
      whatsappNumber: senderNumber,
      empresaId: instanceName,
    });

    // 3. Se a IA detectou um pedido, salvamos no Supabase
    if (aiResult.isOrder) {
      const { error } = await supabase.from('leads_imoveis').insert({
        empresa_id: instanceName,
        telefone: senderNumber,
        nome_cliente: aiResult.clientName,
        valor_estimado: aiResult.value,
        localizacao: aiResult.location,
        tipo_imovel: aiResult.propertyType,
        mensagem_original: messageText
      });

      if (error) throw error;
    }

    // 4. Responder ao cliente via Evolution API
    // Você fará um POST para a URL da sua Evolution API
    await fetch(`${process.env.EVOLUTION_API_URL}/message/sendText/${instanceName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.EVOLUTION_API_KEY!
      },
      body: JSON.stringify({
        number: senderNumber,
        options: { delay: 1200, presence: "composing" },
        textMessage: { text: aiResult.replyMessage }
      })
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Erro geral no webhook:', err);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}