import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Esquema de saída estruturado para o Banco de Dados
const WhatsappOrderOutputSchema = z.object({
  isOrder: z.boolean().describe('Define se o texto é um pedido de imóvel'),
  value: z.number().nullable().describe('Valor numérico extraído'),
  location: z.string().nullable().describe('Localização ou bairro'),
  propertyType: z.string().nullable().describe('Tipo: casa, apto, etc'),
  clientName: z.string().nullable().describe('Nome do cliente se mencionado'),
  replyMessage: z.string().describe('Resposta curta para enviar de volta no WhatsApp')
});

export const whatsappOrderFlow = ai.defineFlow(
  {
    name: 'whatsappOrderFlow',
    inputSchema: z.object({
      query: z.string(),
      whatsappNumber: z.string(),
      empresaId: z.string()
    }),
    outputSchema: WhatsappOrderOutputSchema,
  },
  async (input) => {
    const prompt = `Você é o assistente da UrbanSync. 
    Analise a mensagem: "${input.query}". 
    Extraia dados do pedido imobiliário. Se for saudação, apenas responda cordialmente.
    Se for pedido, identifique valor e local.`;

    const { output } = await ai.generate({
      prompt,
      output: { schema: WhatsappOrderOutputSchema }
    });

    if (output?.isOrder) {
      // Exemplo de salvamento (Supabase/Prisma/Mongo)
      // await db.lead.create({
      //   data: {
      //     empresaId: input.empresaId,
      //     telefone: input.whatsappNumber,
      //     detalhes: output,
      //     status: 'NOVO'
      //   }
      // });
    }

    return output!;
  }
);